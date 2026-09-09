import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
function loadTs(path, imports = {}) {
  const source = ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), "utf8"),
    {
      fileName: path,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    },
  ).outputText;
  const loadedModule = { exports: {} };
  new Function("require", "module", "exports", source)(
    (name) => (Object.hasOwn(imports, name) ? imports[name] : require(name)),
    loadedModule,
    loadedModule.exports,
  );
  return loadedModule.exports;
}

const downloads = loadTs("../lib/downloads.ts");
const { validatePdfUpload, formatFileSize } = loadTs("../lib/admin/uploads.ts");
const { default: PreviousYearPapers } = loadTs(
  "../components/sections/PreviousYearPapers.tsx",
  {
    "@/lib/downloads": downloads,
  },
);
const paper = {
  id: "paper-2025",
  title: "ANM GNM 2025 — Set B",
  year: 2025,
  language: "Bengali + English",
  description: "Question paper",
  fileSize: "2.4 MB",
  paperUrl:
    "https://example.supabase.co/storage/v1/object/public/files/pyq/paper.pdf",
  answerKeyUrl:
    "https://example.supabase.co/storage/v1/object/public/files/pyq/key.pdf",
  isNew: false,
};

test("public storage PDFs request attachment downloads and preserve URL encoding", () => {
  const url = new URL(
    downloads.getFileDownloadUrl(`${paper.paperUrl}?version=2`),
  );
  assert.equal(url.searchParams.get("download"), "");
  assert.equal(url.searchParams.get("version"), "2");
  assert.equal(
    downloads.getFileDownloadUrl("/resources/paper.pdf"),
    "/resources/paper.pdf",
  );
  const external = "https://example.org/paper.pdf?signature=keep-me";
  assert.equal(downloads.getFileDownloadUrl(external), external);
  const encoded = paper.paperUrl.replace("paper.pdf", "paper%20one.pdf");
  assert.match(
    downloads.getFileDownloadUrl(encoded),
    /paper%20one\.pdf\?download=$/,
  );
});

test("PDF uploads accept real headers even when the browser omits MIME metadata", async () => {
  await validatePdfUpload(new File(["%PDF-1.7\nfixture"], "PAPER.PDF"));
  assert.equal(formatFileSize(2.4 * 1024 * 1024), "2.4 MB");
  assert.equal(formatFileSize(256 * 1024), "256 KB");
});

test("empty, renamed, and non-PDF uploads are rejected", async () => {
  await assert.rejects(
    validatePdfUpload(new File([], "empty.pdf")),
    /not a valid PDF/,
  );
  await assert.rejects(
    validatePdfUpload(
      new File(["<html>"], "renamed.pdf", { type: "application/pdf" }),
    ),
    /not a valid PDF/,
  );
  await assert.rejects(
    validatePdfUpload(new File(["%PDF-1.7"], "paper.txt")),
    /choose a PDF/,
  );
});

test("published records supply card titles, metadata, PDFs, and optional answer keys", () => {
  const html = renderToStaticMarkup(
    createElement(PreviousYearPapers, { papers: [paper] }),
  );
  assert.match(html, /ANM GNM 2025 — Set B/);
  assert.match(html, /2\.4 MB/);
  assert.match(html, /paper\.pdf\?download=/);
  assert.match(html, /key\.pdf\?download=/);
  assert.doesNotMatch(html, /PDF coming soon/);
  const withoutKey = renderToStaticMarkup(
    createElement(PreviousYearPapers, {
      papers: [{ ...paper, answerKeyUrl: null }],
    }),
  );
  assert.doesNotMatch(withoutKey, /Answer key/);
});

test("empty published data has no placeholder cards or broken download links", () => {
  const html = renderToStaticMarkup(
    createElement(PreviousYearPapers, { papers: [] }),
  );
  assert.match(html, /Question papers are on their way/);
  assert.doesNotMatch(html, /<article|2025|download=/);
});

test("the public paper query excludes drafts and orders by descending year", async () => {
  const calls = [];
  const query = {
    select(value) {
      calls.push(["select", value]);
      return this;
    },
    eq(...args) {
      calls.push(["eq", ...args]);
      return this;
    },
    order(...args) {
      calls.push(["order", ...args]);
      return Promise.resolve({
        data: [{ id: "published", paper_url: paper.paperUrl }],
        error: null,
      });
    },
  };
  const { getPYQs } = loadTs("../lib/data.ts", {
    "./batches": {},
    "./settings": {},
    "./supabase/server": {
      supabaseServer: () => ({
        from(table) {
          calls.push(["from", table]);
          return query;
        },
      }),
    },
  });
  const papers = await getPYQs();
  assert.deepEqual(calls, [
    ["from", "pyqs"],
    ["select", "*"],
    ["eq", "published", true],
    ["order", "year", { ascending: false }],
  ]);
  assert.equal(papers[0].paperUrl, paper.paperUrl);
});

test("homepage passes its fetched papers to the section immediately after the hero", async () => {
  const imports = Object.fromEntries(
    [
      "Hero",
      "OngoingBatch",
      "SubjectSyllabus",
      "WhyMedhaup",
      "Bloghighlights",
    ].map((name) => [`@/components/sections/${name}`, () => null]),
  );
  const { default: Home } = loadTs("../app/(site)/page.tsx", {
    ...imports,
    "@/components/sections/PreviousYearPapers": PreviousYearPapers,
    "@/lib/data": {
      getBatches: async () => [],
      getSubjects: async () => [],
      getSyllabusDownloads: async () => [],
      getPosts: async () => [],
      getPYQs: async () => [paper],
    },
  });
  const tree = await Home();
  const main = tree.props.children.find((child) => child.type === "main");
  const sectionIndex = main.props.children.findIndex(
    (child) => child?.type === PreviousYearPapers,
  );
  assert.equal(
    main.props.children[sectionIndex - 1].type,
    imports["@/components/sections/Hero"],
  );
  assert.deepEqual(main.props.children[sectionIndex].props.papers, [paper]);
});
