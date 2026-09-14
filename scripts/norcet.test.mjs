import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createRequire } from "node:module";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);

// Same loader as ai-gemini.test.mjs: project compiler, no live providers.
function createLoader(overrides = {}) {
  const cache = new Map();
  function load(relativePath) {
    const filename = resolve(relativePath);
    if (cache.has(filename)) return cache.get(filename).exports;
    const compiled = { exports: {} };
    cache.set(filename, compiled);
    const source = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    const localRequire = (name) => {
      if (name === "server-only") return {};
      if (Object.hasOwn(overrides, name)) return overrides[name];
      if (name.startsWith(".") || name.startsWith("@/")) {
        const base = name.startsWith("@/")
          ? resolve(name.slice(2))
          : resolve(dirname(filename), name);
        return load(existsSync(`${base}.ts`) ? `${base}.ts` : `${base}.tsx`);
      }
      return require(name);
    };
    new Function("require", "module", "exports", source)(
      localRequire,
      compiled,
      compiled.exports,
    );
    return compiled.exports;
  }
  return load;
}

const norcet = createLoader()("lib/norcet.ts");

const sampleResource = {
  id: "r1",
  title: "NORCET Stage I syllabus checklist",
  category: "Syllabus",
  stage: "Stage I",
  subject: "",
  description: "Subject-wise checklist for the Prelims paper.",
  language: "English",
  fileUrl:
    "https://example.supabase.co/storage/v1/object/public/files/norcet-resources/syllabus.pdf",
  fileSize: "640 KB",
  isNew: true,
};

function dataOverrides(resources = []) {
  const empty = async () => [];
  return {
    "@/lib/data": {
      getBatches: empty,
      getDailyCA: empty,
      getMonthlyCA: empty,
      getNorcetResources: async () => resources,
      getPostBySlug: async () => null,
      getPosts: empty,
      getPYQs: empty,
      getResources: empty,
      getSubjects: empty,
      getSyllabusDownloads: empty,
    },
  };
}

test("NORCET exam data is internally consistent and safe to publish", () => {
  const {
    NORCET,
    NORCET_STAGES,
    NORCET_SUBJECTS,
    NORCET_NURSING_QUESTION_SHARE,
    NORCET_GENERAL_QUESTION_SHARE,
    NORCET_FAQS,
    NORCET_COURSE,
  } = norcet;

  assert.equal(NORCET_STAGES.length, 2);
  for (const stage of NORCET_STAGES) {
    assert.equal(stage.questions, 100);
    assert.equal(stage.minutes, 90);
    assert.equal(
      stage.sections.reduce((sum, section) => sum + section.questions, 0),
      stage.questions,
      `${stage.name} sections must add up to the paper`,
    );
    assert.match(stage.negativeMarking, /⅓/);
  }

  const ids = new Set(NORCET_SUBJECTS.map((subject) => subject.id));
  assert.equal(ids.size, NORCET_SUBJECTS.length, "subject ids are unique");
  for (const subject of NORCET_SUBJECTS) {
    assert.ok(subject.topics.length >= 4, `${subject.name} lists topics`);
    assert.ok(subject.approxQuestions[0] <= subject.approxQuestions[1]);
  }

  const nursing = NORCET_SUBJECTS.filter(
    (subject) => subject.group !== "General section",
  );
  const midpoint = nursing.reduce(
    (sum, subject) =>
      sum + (subject.approxQuestions[0] + subject.approxQuestions[1]) / 2,
    0,
  );
  assert.ok(
    Math.abs(midpoint - NORCET_NURSING_QUESTION_SHARE) <= 5,
    `nursing subject ranges (~${midpoint}) should centre on ${NORCET_NURSING_QUESTION_SHARE}`,
  );
  const general = NORCET_SUBJECTS.find(
    (subject) => subject.group === "General section",
  );
  assert.equal(general.approxQuestions[1], NORCET_GENERAL_QUESTION_SHARE);
  assert.equal(
    NORCET_NURSING_QUESTION_SHARE + NORCET_GENERAL_QUESTION_SHARE,
    100,
  );

  assert.ok(NORCET.officialUrl.startsWith("https://"));
  assert.ok(NORCET_FAQS.length >= 8);
  assert.equal(NORCET_COURSE.status, "live");
  // Do not invent an unpublished course price.
  const serialized = JSON.stringify(norcet);
  assert.doesNotMatch(serialized, /course fee is ₹|fee: ₹\d/i);
});

test("trusted course facts direct enquiries to current fee and batch details", () => {
  const status = norcet.getTrustedNorcetStatusFacts().join(" ");
  assert.match(status, /is offered at \/norcet/);
  assert.match(status, /Send a course enquiry/);
  assert.match(status, /never invent these details/);
  const exam = norcet.getTrustedNorcetExamFacts().join("\n");
  assert.match(exam, /Stage I \(Preliminary\): 100 MCQs/);
  assert.match(exam, /Stage II \(Mains\): 100 MCQs/);
  assert.match(exam, /English and Hindi only, not Bengali/);
  assert.match(exam, /Medical-Surgical Nursing/);
  assert.match(exam, /not AIIMS/);
});

test("medhaup AI treats /norcet as a trusted page with resources and course enquiry facts", async () => {
  const load = createLoader(dataOverrides([sampleResource]));
  const { buildTrustedPageContext, isAIPagePath } = load("lib/ai/context.ts");

  assert.equal(isAIPagePath("/norcet"), true);
  assert.equal(isAIPagePath("/norcet/anything"), false);

  const context = await buildTrustedPageContext("/norcet", 12_000);
  assert.equal(context.pageType, "norcet");
  assert.match(context.title, /NORCET/);
  assert.match(context.content, /is offered at \/norcet/);
  assert.match(context.content, /CURRENT NORCET PAGE CONTEXT/);
  assert.match(context.content, /NORCET Stage I \(Preliminary\)/);
  assert.match(context.content, /Published free NORCET resource: NORCET Stage I syllabus checklist/);
  assert.match(context.content, /Do not state any NORCET course fee/);

  // Every other page still learns the NORCET status through the essentials.
  const home = await buildTrustedPageContext("/", 6_500);
  assert.equal(home.pageType, "homepage");
  assert.match(home.content, /NORCET .*is offered at \/norcet/);

  const withoutResources = createLoader(dataOverrides([]))("lib/ai/context.ts");
  const empty = await withoutResources.buildTrustedPageContext("/norcet", 12_000);
  assert.match(empty.content, /No free NORCET study material has been published yet/);
});

test("prompt rules route course questions to enrolment without reusing another course fee", () => {
  const { buildProviderInput } = createLoader()("lib/ai/prompts.ts");
  const page = {
    path: "/norcet",
    pageType: "norcet",
    title: "NORCET Preparation",
    content: "NORCET preparation course.",
  };
  const input = buildProviderInput(
    "Is there a NORCET course on medhaup?",
    "en",
    [],
    page,
  );
  assert.equal(input.useWebSearch, false);
  assert.match(input.systemPrompt, /Use the medhaup course catalog in the trusted course facts/);
  assert.match(input.systemPrompt, /relevant course page and its enrolment enquiry/);
  assert.match(input.systemPrompt, /Page type: norcet/);
});

test("the floating assistant has a page descriptor for /norcet", () => {
  const { getAIPageDescriptor } = createLoader()("components/ai/page-config.ts");
  const descriptor = getAIPageDescriptor("/norcet/");
  assert.ok(descriptor);
  assert.equal(descriptor.path, "/norcet");
  assert.equal(descriptor.pageType, "norcet");
  assert.equal(descriptor.contentType, "norcet_page");
  assert.ok(descriptor.suggestions.length >= 3);
  assert.equal(getAIPageDescriptor("/norcet/extra"), null);
});

test("queries naming NORCET search only the official AIIMS domains", async (t) => {
  const { searchTavily } = createLoader()("lib/ai/tavily.ts");
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    assert.deepEqual(JSON.parse(options.body).include_domains, [
      "aiimsexams.ac.in",
      "aiims.edu",
    ]);
    return Response.json({ results: [] });
  });
  await searchTavily(
    "Latest NORCET notice",
    { tavilyApiKey: "test-search-secret-never-send" },
    new AbortController().signal,
  );
});

test("admin panel exposes a NORCET resources collection that feeds the public fetcher", () => {
  const { getCollection } = createLoader()("lib/admin/collections.ts");
  const collection = getCollection("norcet-resources");
  assert.ok(collection);
  assert.equal(collection.table, "norcet_resources");
  const names = collection.fields.map((field) => field.name);
  for (const required of [
    "title",
    "category",
    "stage",
    "subject",
    "description",
    "language",
    "file_url",
    "file_size",
    "is_new",
  ]) {
    assert.ok(names.includes(required), `collection has ${required}`);
  }
  const pdf = collection.fields.find((field) => field.name === "file_url");
  assert.equal(pdf.type, "file");
  assert.equal(pdf.bucket, "files");
  assert.equal(pdf.accept, "application/pdf");
  assert.equal(pdf.fileSizeField, "file_size");
  const migration = readFileSync(
    new URL(
      "../supabase/migrations/202609100001_create_norcet_resources.sql",
      import.meta.url,
    ),
    "utf8",
  );
  for (const column of names) {
    assert.match(migration, new RegExp(`\\b${column}\\b`), `migration has ${column}`);
  }
  assert.match(migration, /enable row level security/);
});

test("exam pattern and resources sections render both stages and the resource enquiry empty state", () => {
  const load = createLoader();
  const { default: NorcetPattern } = load(
    "components/sections/norcet/NorcetPattern.tsx",
  );
  const pattern = renderToStaticMarkup(createElement(NorcetPattern));
  assert.match(pattern, /Preliminary/);
  assert.match(pattern, /Mains/);
  assert.match(pattern, /⅓ mark deducted/);
  assert.match(pattern, /English · Hindi/);
  assert.match(pattern, /href="https:\/\/www\.aiimsexams\.ac\.in\/"/);

  const { default: NorcetResources } = load(
    "components/sections/norcet/NorcetResources.tsx",
  );
  const empty = renderToStaticMarkup(
    createElement(NorcetResources, { resources: [] }),
  );
  assert.match(empty, /and study support/);
  assert.match(empty, /href="#enrolment"/);
  assert.match(empty, /wa\.me\//);

  const listed = renderToStaticMarkup(
    createElement(NorcetResources, { resources: [sampleResource] }),
  );
  assert.match(listed, /NORCET Stage I syllabus checklist/);
  assert.match(listed, /download=""/);
  assert.match(listed, /download=/);
  assert.doesNotMatch(listed, /and study support/);
});
