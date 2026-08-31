# medhaup AI — Agentic Implementation Plan

## Goal

Ship a stable Phase-1 AI assistant without disrupting the existing medhaup website.

This file is written as a coding-agent task sequence.

---

# Phase 0 — Repository inspection

## Task 0.1
Read repository instructions.

Required:

```text
AGENTS.md
README.md
package.json
tsconfig.json
app/(site)/layout.tsx
lib/data.ts
lib/analytics.ts
lib/settings.ts
```

Also read the relevant Next.js 16 guides in:

```text
node_modules/next/dist/docs/
```

Do this before creating route handlers or relying on remembered APIs.

### Acceptance
Agent can explain:
- server/client boundaries
- public site layout structure
- data access pattern
- analytics event helper
- current design tokens

---

# Phase 0.2 — Verify PR Labs endpoint

Using the subscribed RapidAPI endpoint, obtain one known-working request.

Create a temporary local note, not committed with secrets, containing:

```text
method
endpoint
host
headers
payload
successful response
429 response
5XX response if available
```

### Acceptance
A test request succeeds outside the medhaup UI.

### Stop condition
If the exact endpoint cannot be verified, do NOT invent an adapter. Build the UI/backend abstraction with a disabled provider and document what remains.

---

# Phase 1 — Core AI domain layer

Create:

```text
lib/ai/
  config.ts
  types.ts
  prompts.ts
  prlabs.ts
  normalize.ts
  retrieve.ts
  context.ts
  rate-limit.ts
```

## Task 1.1 — Types

Create provider-independent types for:

- UI request
- UI success response
- UI error response
- page context
- retrieved context
- internal links
- provider input
- provider output

Do not leak provider-specific field names into React components.

## Task 1.2 — Config

Add server-only config.

Do not add RapidAPI secrets to `NEXT_PUBLIC_*`.

Update:
- README environment table
- `.env.example` if the repository has one, otherwise add a safe example only if consistent with repo conventions

Never add real keys.

## Task 1.3 — Provider adapter

Implement the verified PR Labs request.

Normalize:
- 400
- 403
- 404
- 429
- timeout
- 5XX
- malformed JSON
- empty success response

## Task 1.4 — Prompt builder

Build the system prompt from trusted server-side instructions.

Client sends only:
- message
- language preference
- page metadata
- bounded history

Client must never send or replace the system prompt.

---

# Phase 2 — medhaup retrieval

## Task 2.1 — Identify searchable sources

Start with:

- blog posts
- PYQs
- resources
- syllabus data
- current affairs
- batches / course info where appropriate

Reuse `lib/data.ts` patterns.

Only retrieve published public content.

## Task 2.2 — Simple retrieval first

Do NOT introduce embeddings/vector search in MVP unless the current database already supports it cleanly.

Start with:
- normalized keyword matching
- title
- slug
- excerpt/description
- subject
- tags/category if available

Return 3–5 relevant records.

A simple working search is preferable to premature vector infrastructure.

## Task 2.3 — Context formatting

Transform records into compact text chunks.

Example:

```text
SOURCE 1
Type: Blog
Title: ANM/GNM Round 3 Counselling Guide
Path: /blogs/...
Summary: ...
```

Keep provider context small.

## Task 2.4 — Trusted links

Generate internal links in code.

The model may reference `SOURCE 1`, but the UI link comes from application data.

---

# Phase 3 — API route

Create:

```text
app/api/ai/chat/route.ts
```

Responsibilities:

1. parse request
2. validate
3. apply medhaup-side limit
4. determine trusted page context
5. retrieve medhaup content if relevant
6. construct prompt
7. call provider
8. normalize answer
9. emit analytics-safe operational result
10. return normalized JSON

Recommended:

```text
cache: no-store
```

for provider calls.

Do not return server stack traces.

---

# Phase 4 — UI foundation

Create:

```text
components/ai/
  MedhaupAI.tsx
  AITrigger.tsx
  AIPanel.tsx
  AIMessage.tsx
  AISuggestions.tsx
  AILanguageToggle.tsx
  AIErrorState.tsx
```

Follow `design.md`.

## Task 4.1 — Global shell

Mount the assistant shell at a public-site layer where appropriate.

Because `app/(site)/layout.tsx` currently only returns children, first inspect where the shared Navbar/Footer/providers are actually mounted before deciding where to insert the assistant.

Do not assume the route-group layout is the correct insertion point merely because it exists.

## Task 4.2 — Progressive rollout

Enable AI only on selected routes through page metadata or a route allowlist.

Initial allowlist:

```text
/blogs/*
/pyq
/syllabus
/current-affairs
/resources
/course
```

Homepage can be added after interaction quality is verified.

## Task 4.3 — Context provider

The component should receive or derive:

```ts
{
  path,
  title,
  contentType,
  contentId?,
  slug?,
  subject?,
  topic?
}
```

Do not scrape the entire rendered DOM and send it to the provider.

Use known page data whenever possible.

---

# Phase 5 — Contextual actions

## Blog pages

Suggestions:
- Explain this simply
- Give exam-important points
- Find related resources

## PYQ

Suggestions:
- Explain the answer
- Why are other options wrong?
- Similar question

If the current PYQ page does not expose answer data, do not pretend it does. Pass only what the page/source actually has.

## Syllabus

Suggestions:
- Explain this topic
- What should I study first?
- Find related PYQs

## Current affairs

Suggestions:
- Explain this simply
- Why is this exam-relevant?
- Quiz me

## Course

Suggestions:
- What does this batch include?
- Who is it for?
- How do I enroll?

Use current batch data, not hardcoded marketing claims.

---

# Phase 6 — Analytics

Extend the existing GA helper rather than creating a second analytics system.

Suggested events:

```text
ai_open
ai_prompt_submit
ai_response_success
ai_response_error
ai_suggestion_click
ai_internal_link_click
ai_language_change
ai_limit_reached
ai_admission_assist_click
```

Event metadata should be low-cardinality where possible:

```text
ai_mode
content_type
language
error_code
retrieval_used
```

Do not send full student prompts to GA4.

---

# Phase 7 — QA and release

Run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Manual verification matrix is in `05_AI_ANALYTICS_AND_QA.md`.

---

# Suggested pull-request structure

Avoid one massive PR if possible.

### PR 1
AI backend abstraction + provider adapter + env docs

### PR 2
Retrieval + `/api/ai/chat`

### PR 3
AI UI + contextual page integration

### PR 4
Analytics + polish + QA fixes

If one agent is doing all work in one branch, still implement in this order and keep commits logically separated.

---

# Future phase backlog

Only after Phase 1 metrics justify expansion:

## Phase 2
- AI-generated practice quiz
- current affairs quiz
- related-question generation
- better content retrieval

## Phase 3
- authenticated student history
- weak-topic tracking
- personalized practice
- study planner

## Separate high-risk project
- counselling recommendation engine

This should be data-driven and deterministic first:
database rules/calculations → AI explanation.

AI must not independently guess allotment outcomes.

## Separate multimodal project
- image question solver

Requires provider privacy + upload + cost review before implementation.
