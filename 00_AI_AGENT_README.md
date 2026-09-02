# medhaup AI — Agent Implementation Pack

## Purpose

This folder is the source of truth for implementing **medhaup AI** on the current `medhaup-web` repository.

The goal is not to build a generic ChatGPT clone. The goal is to add a focused AI layer that improves:

1. student learning,
2. discovery of medhaup content,
3. explanation of PYQs / educational content,
4. engagement and conversion,
5. support efficiency.

The initial release must be small, controlled, measurable, and safe enough to ship on a startup website.

---

## Current repository context

Repository: `https://github.com/JasonDebnath001/medhaup-web`

Current architecture:

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Supabase Postgres
- Supabase Auth for admin
- Supabase Storage
- GA4 through `@next/third-parties/google`
- 60-second revalidation on most content routes
- current public content is server-loaded from Supabase

Important current paths:

```text
app/
  (site)/
  admin/
  ...
components/
  campaign/
  layout/
  provider/
  sections/
  seo/
  ui/
lib/
  admin/
  supabase/
  analytics.ts
  attribution.ts
  data.ts
  seo.ts
  settings.ts
supabase/
docs/
```

The existing repository-level `AGENTS.md` contains an important rule:

> This project uses a newer Next.js version with breaking changes. Read the relevant guides under `node_modules/next/dist/docs/` before relying on remembered Next.js conventions.

Any coding agent MUST obey that instruction.

---

# Product decision

## Phase 1 MVP

Build these four capabilities:

### 1. Page-aware student assistant
The assistant receives the current page context but can answer student questions beyond that page and beyond ANM/GNM from general knowledge. It always represents medhaup, keeps medhaup-specific claims grounded in trusted data, and distinguishes exams that medhaup explains from courses that medhaup actually offers.

Examples:

- Biology article → biology doubt solving
- syllabus page → chapter/topic help
- current affairs page → explain the current item
- course page → explain course/batch details without inventing claims
- NEET question → provide a useful general answer and clarify that medhaup does not currently offer a NEET course
- current-information question → search the web, prefer an official primary source, and state when the information was current

### 2. medhaup content search
When a student asks for resources, the assistant should prefer medhaup's own published content and return useful internal links.

Examples:

- "Give me logarithm resources"
- "Where are Biology PYQs?"
- "Show me Round 3 counselling articles"
- "Find the syllabus PDF"

### 3. PYQ / educational explanation
On PYQ and educational content, allow:

- Explain simply
- Explain in Bengali
- Explain in English
- Why is this answer correct?
- Why are the other options wrong?
- Give me a similar practice question

### 4. Bengali / English response control
Support:

- Bengali
- English
- Mixed Bengali + English

Default to the user's message language where practical.

---

# Explicitly NOT in Phase 1

Do not add these in the first implementation unless the product owner explicitly expands scope:

- counselling seat prediction
- choice-filling recommendation engine
- rank-to-college probability prediction
- photo question solver
- personalized long-term study planner
- user performance history
- voice assistant
- image generation
- autonomous enrollment decisions
- automatic payments
- generic "ask anything" assistant

These may be future phases, but they create extra reliability, cost, or product complexity.

---

# Core architecture

The browser must NEVER call PR Labs / RapidAPI directly.

Use:

```text
Student browser
      ↓
medhaup UI
      ↓
POST /api/ai/chat
      ↓
validation + rate limiting + context
      ↓
medhaup content retrieval
      ↓
PR Labs API adapter
      ↓
normalized response
      ↓
medhaup UI
```

Recommended code organization:

```text
app/
  api/
    ai/
      chat/
        route.ts
      search/
        route.ts              # optional if separated

components/
  ai/
    MedhaupAI.tsx
    AITrigger.tsx
    AIPanel.tsx
    AIMessage.tsx
    AISuggestions.tsx
    AILanguageToggle.tsx
    AIErrorState.tsx

lib/
  ai/
    prlabs.ts
    types.ts
    prompts.ts
    context.ts
    retrieve.ts
    rate-limit.ts
    normalize.ts
    config.ts
```

Avoid scattering provider-specific logic throughout React components.

---

# Source-of-truth rule

The uploaded PR Labs documentation is an overview, not a complete endpoint contract.

It confirms:

- RapidAPI-style authentication
- API-key authentication
- subscription quotas
- rate-limit headers
- `429 Too Many Requests`
- 400 / 403 / 404 / 5XX error categories
- custom bot support through `bot_id`
- vision messages containing `role`, `content`, and `img_url`
- model options for the custom chatbot API

It does NOT fully specify the exact production request contract needed for this integration.

The coding agent MUST NOT invent:

- RapidAPI host
- endpoint path
- HTTP method
- required headers beyond what is confirmed in the actual RapidAPI endpoint
- request field names
- response shape
- streaming behavior
- token/context limit
- model field
- timeout semantics

Before implementing the provider adapter, copy the exact working request from the RapidAPI **Endpoints / Code Snippets** panel and encode that contract in `lib/ai/prlabs.ts`.

---

# Environment variable rules

Private provider credentials must be server-only.

Recommended variables:

```bash
PRLABS_RAPIDAPI_KEY=
PRLABS_RAPIDAPI_HOST=
PRLABS_CHAT_ENDPOINT=
PRLABS_BOT_ID=
PRLABS_MODEL=
AI_REQUEST_TIMEOUT_MS=30000
AI_MAX_MESSAGE_CHARS=2000
AI_FREE_DAILY_LIMIT=5
```

Do NOT use `NEXT_PUBLIC_` for any PR Labs / RapidAPI secret.

The repository already warns that `NEXT_PUBLIC_*` values are browser-visible.

---

# Agent operating rules

## Before coding

1. Read:
   - root `AGENTS.md`
   - current `README.md`
   - `package.json`
   - relevant `node_modules/next/dist/docs/`
   - `lib/data.ts`
   - `lib/analytics.ts`
   - `app/(site)/layout.tsx`
   - current page/component where the first AI entry point will be placed
2. Inspect existing UI patterns before creating new design primitives.
3. Confirm the exact PR Labs RapidAPI request in the endpoint playground.
4. Do not modify unrelated existing functionality.

## During coding

- Preserve strict TypeScript.
- Preserve server/client boundaries.
- Do not expose secrets.
- Use small provider-independent types.
- Normalize API errors.
- Add analytics events through the current analytics helper.
- Keep the UI usable without animation.
- Respect accessibility and mobile layouts.
- Do not allow AI failure to break page rendering.

## Before completing work

Run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Then manually verify:

- mobile
- desktop
- AI closed state
- AI first-open state
- successful response
- loading state
- 400
- 403
- 429
- timeout
- 5XX
- empty response
- Bengali rendering
- internal links
- keyboard navigation

---

# Definition of done

Phase 1 is complete only when:

- AI provider key is server-only.
- A user can open medhaup AI on approved public pages.
- The current page context is supplied to the backend.
- Responses are concise and ANM/GNM-focused.
- medhaup content is preferred where relevant.
- Bengali and English work correctly.
- the assistant refuses to invent counselling outcomes.
- internal content links are rendered safely.
- rate limits are enforced.
- provider errors are converted into calm user-facing states.
- AI interactions are measured in GA4.
- lint, type-check, and production build pass.

---

# Read the rest of this pack

1. `01_AI_PRODUCT_SPEC.md`
2. `02_AI_API_INTEGRATION.md`
3. `03_AI_IMPLEMENTATION_PLAN.md`
4. `04_AI_PROMPTS_AND_GUARDRAILS.md`
5. `05_AI_ANALYTICS_AND_QA.md`
6. `design.md`

Treat these files as implementation constraints, not brainstorming notes.
