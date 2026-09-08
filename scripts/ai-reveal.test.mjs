import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../components/ai/reveal-words.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } },
).outputText;
const { rehypeRevealWords } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
const render = (markdown, visibleWords) => renderToStaticMarkup(
  createElement(ReactMarkdown, {
    skipHtml: true,
    rehypePlugins: [[rehypeRevealWords, { visibleWords }]],
  }, markdown),
);
const text = (html) => html.replace(/<[^>]*>/g, "").trim();

test("Bengali characters stay intact as whole words appear", () => {
  const markdown = "সালোকসংশ্লেষ হলো উদ্ভিদের খাদ্য তৈরির প্রক্রিয়া।";
  assert.equal(text(render(markdown, 1)), "সালোকসংশ্লেষ");
  assert.equal(text(render(markdown, 2)), "সালোকসংশ্লেষ হলো");
  assert.equal(text(render(markdown, 6)), markdown);
});

test("partially revealed emphasis and links keep complete Markdown structure", () => {
  const markdown = "Read **important exam updates** at [the official website](https://wbjeeb.nic.in/anm-gnm/).";
  const beginning = render(markdown, 2);
  assert.match(beginning, /<strong>/);
  assert.doesNotMatch(beginning, /updates|\*\*/);
  const linked = render(markdown, 6);
  assert.match(linked, /href="https:\/\/wbjeeb.nic.in\/anm-gnm\/"/);
  assert.match(linked, />the</);
  assert.doesNotMatch(text(linked), /https:|\]\(/);
});

test("future paragraphs and list items stay hidden without empty bullet markers", () => {
  const markdown = "First paragraph.\n\n- First item\n- Second item\n\nLast paragraph.";
  assert.equal((render(markdown, 2).match(/<li>/g) ?? []).length, 0);
  const partial = render(markdown, 4);
  assert.equal((partial.match(/<li>/g) ?? []).length, 1);
  assert.doesNotMatch(partial, /Second|Last/);
});

test("the cursor follows the last visible word and stays hidden from screen readers", () => {
  const html = render("One **two** three.", 2);
  assert.equal((html.match(/data-reveal-cursor/g) ?? []).length, 1);
  assert.match(html, /two<span data-reveal-cursor="" aria-hidden="true"><\/span>/);
  assert.doesNotMatch(html, /three/);
});

test("completed and reduced-motion answers render unchanged, with no cursor", () => {
  const markdown = "### Study plan\n\nRead **Life Science**.\n\n1. Practice\n2. Revise\n\n`H₂O` and বাংলা।";
  const normal = renderToStaticMarkup(createElement(ReactMarkdown, { skipHtml: true }, markdown));
  assert.equal(render(markdown, Infinity), normal);
  assert.equal(render(markdown, 0), "");
});
