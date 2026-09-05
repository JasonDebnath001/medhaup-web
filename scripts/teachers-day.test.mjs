import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createRequire } from "node:module";
import { test } from "node:test";
import ts from "typescript";

// Compile the pure shared TypeScript modules in memory; no application server needed.
const require = createRequire(import.meta.url);
function load(relativePath, overrides = {}) {
  const filename = resolve(relativePath);
  const source = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const compiledModule = { exports: {} };
  const localRequire = (name) =>
    Object.hasOwn(overrides, name)
      ? overrides[name]
      : name.startsWith(".")
        ? load(resolve(dirname(filename), `${name}.ts`))
        : require(name);
  new Function("require", "module", "exports", source)(
    localRequire,
    compiledModule,
    compiledModule.exports,
  );
  return compiledModule.exports;
}

const campaign = load("lib/teachersDayCampaign.ts");
const seo = load("lib/campaignSeo.ts");
const pricing = load("lib/coursePricing.ts");
const start = Date.parse("2026-09-05T00:00:00+05:30");
const end = Date.parse("2026-09-07T00:00:00+05:30");

test("offer opens Saturday IST and covers every millisecond of Sunday", () => {
  assert.equal(campaign.getCampaignPhase(start - 1), "upcoming");
  assert.equal(campaign.getCampaignPhase(start), "live");
  assert.equal(
    campaign.getCampaignPhase(Date.parse("2026-09-06T23:59:00+05:30")),
    "live",
  );
  assert.equal(campaign.getCampaignPhase(end - 1), "live");
  assert.equal(campaign.getCampaignPhase(end), "expired");
  assert.equal(campaign.getCampaignPhase(end + 86400000), "expired");
});

test("countdown does not end early or become negative", () => {
  assert.deepEqual(campaign.getCampaignTimeRemaining(start, "live"), {
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  assert.equal(campaign.getCampaignTimeRemaining(end - 1, "live").seconds, 1);
  assert.deepEqual(campaign.getCampaignTimeRemaining(end, "expired"), {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
});

test("WhatsApp admission carries the correct price, number, and weekend", () => {
  const url = new URL(campaign.teachersDayWhatsAppUrl);
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/918910840928");
  assert.match(url.searchParams.get("text"), /₹1,300/);
  assert.match(url.searchParams.get("text"), /5–6 September 2026/);
  assert.doesNotMatch(url.searchParams.get("text"), /coupon/i);
});

test("SEO preserves canonical and restores evergreen content outside the weekend", () => {
  const base = {
    title: "Course",
    description: "Regular course",
    alternates: { canonical: "/course" },
    openGraph: { title: "Course" },
  };
  assert.equal(seo.withTeachersDayMetadata(base, start - 1), base);
  assert.equal(seo.withTeachersDayMetadata(base, end), base);
  const live = seo.withTeachersDayMetadata(base, start);
  assert.equal(live.alternates.canonical, "/course");
  assert.match(live.title.absolute, /₹1,300/);
  assert.match(live.description, /Sunday 11:59 p.m. IST/);
  assert.equal(live.twitter.title, live.openGraph.title);
});

test("structured offer disappears at the deadline and declares its validity", () => {
  assert.equal(seo.getTeachersDayOfferSchema(start - 1), null);
  assert.equal(seo.getTeachersDayOfferSchema(end), null);
  const offer = seo.getTeachersDayOfferSchema(start);
  assert.equal(offer.price, "1300");
  assert.equal(offer.priceCurrency, "INR");
  assert.equal(offer.priceValidUntil, "2026-09-06");
  assert.equal(Date.parse(offer.validThrough), end - 1);
  assert.equal(offer.itemOffered["@id"], "https://medhaup.com/course#course");
});

test("site assistant only gets the promotional price while it is live", () => {
  assert.match(pricing.getTrustedCoursePricingContext(start), /₹1,300/);
  assert.doesNotMatch(
    pricing.getTrustedCoursePricingContext(start - 1),
    /₹1,300/,
  );
  assert.doesNotMatch(pricing.getTrustedCoursePricingContext(end), /₹1,300/);
  assert.match(pricing.getTrustedCoursePricingContext(end), /₹1,800/);
});

test("social previews render valid PNGs both during and after the offer", async () => {
  for (const phase of ["live", "expired"]) {
    const image = load("app/opengraph-image.tsx", {
      "@/lib/teachersDayCampaign": {
        ...campaign,
        getCampaignPhase: () => phase,
      },
    });
    const response = image.default();
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(response.headers.get("content-type"), "image/png");
    assert.equal(bytes.subarray(1, 4).toString(), "PNG");
    assert.equal(bytes.readUInt32BE(16), 1200);
    assert.equal(bytes.readUInt32BE(20), 630);
  }
});
