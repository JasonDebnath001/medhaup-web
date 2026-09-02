# medhaup AI — PR Labs / RapidAPI Integration Specification

## Provider

The supplied documentation describes a PR Labs AI API distributed through RapidAPI.

Confirmed by the supplied documentation:

- authentication uses an API key in request headers
- plans have quotas and request-rate limits
- rate-limit metadata is returned through headers
- `429 Too Many Requests` is a normal quota/rate-limit failure
- error categories include 400, 403, 404, 429, and 5XX
- custom chatbot usage includes a `bot_id`
- PR Labs provides custom bots through `prlabsapi.com`
- vision-style messages can contain:
  - `role`
  - `content`
  - `img_url`
- documentation lists these custom chatbot model values:
  - `gpt 3.5`
  - `mixtral8x7b`
  - `nous`
  - `llama3-70b`

The supplied document does NOT provide a complete, trustworthy production request/response contract for the specific chat endpoint.

---

# Non-negotiable integration rule

## Never call RapidAPI from a client component

Wrong:

```ts
fetch("https://provider...", {
  headers: {
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY
  }
})
```

This leaks the key.

Correct:

```text
Client component
    ↓
POST /api/ai/chat
    ↓
server-only provider adapter
    ↓
RapidAPI
```

---

# Required provider verification

Before implementation, open the subscribed endpoint in RapidAPI and copy the exact successful code snippet.

Record these values:

```text
HTTP method:
Base URL:
Endpoint path:
x-rapidapi-host:
Required request headers:
Required request JSON:
Optional request JSON:
Response JSON:
Response error JSON:
Does it support bot_id?
Does it support model?
Does it support messages?
Does it stream?
```

If any value is unclear, do not guess.

---

# Recommended server-only config

`lib/ai/config.ts`

```ts
export const aiConfig = {
  apiKey: process.env.PRLABS_RAPIDAPI_KEY,
  host: process.env.PRLABS_RAPIDAPI_HOST,
  endpoint: process.env.PRLABS_CHAT_ENDPOINT,
  botId: process.env.PRLABS_BOT_ID,
  model: process.env.PRLABS_MODEL,
  timeoutMs: Number(process.env.AI_REQUEST_TIMEOUT_MS ?? 30000),
  maxMessageChars: Number(process.env.AI_MAX_MESSAGE_CHARS ?? 2000),
};
```

Validate required variables at request time or with a server-only config helper.

Do not throw during static build merely because optional AI configuration is absent unless AI is intentionally required for deployment.

The site should remain functional when AI is disabled.

---

# Public medhaup API contract

Do not expose the provider's raw payload to the UI.

Recommended request:

```ts
type MedhaupAIRequest = {
  message: string;
  language: "auto" | "bn" | "en" | "mixed";
  mode:
    | "page_help"
    | "content_search"
    | "pyq_explain"
    | "course_help";
  page: {
    path: string;
    title?: string;
    contentType?: string;
    contentId?: string;
    slug?: string;
    subject?: string;
    topic?: string;
  };
  history?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
};
```

Recommended response:

```ts
type MedhaupAIResponse = {
  ok: true;
  answer: string;
  links?: Array<{
    title: string;
    href: string;
    type?: string;
  }>;
  suggestions?: string[];
  requestId?: string;
  meta?: {
    provider?: "prlabs";
    retrievalUsed?: boolean;
  };
};
```

Error response:

```ts
type MedhaupAIError = {
  ok: false;
  code:
    | "INVALID_REQUEST"
    | "NOT_CONFIGURED"
    | "RATE_LIMITED"
    | "PROVIDER_AUTH"
    | "PROVIDER_TIMEOUT"
    | "PROVIDER_ERROR"
    | "UNSAFE_REQUEST";
  message: string;
  retryAfterSeconds?: number;
};
```

The UI should only depend on this normalized medhaup contract.

---

# Provider adapter

Recommended file:

`lib/ai/prlabs.ts`

Responsibilities:

1. build the exact provider request
2. attach server-only credentials
3. enforce timeout with `AbortController`
4. parse provider JSON safely
5. capture response status
6. capture rate-limit headers
7. normalize provider response
8. never log secrets
9. never return raw provider headers to the browser unless explicitly safe

Pseudo-structure:

```ts
export async function callPRLabs(input: ProviderInput): Promise<ProviderOutput> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(config.endpoint, {
      method: "POST", // replace only with verified method
      headers: buildVerifiedHeaders(),
      body: JSON.stringify(buildVerifiedPayload(input)),
      signal: controller.signal,
      cache: "no-store",
    });

    const body = await safeJson(response);

    if (!response.ok) {
      throw normalizeProviderError(response, body);
    }

    return normalizeProviderSuccess(body);
  } finally {
    clearTimeout(timer);
  }
}
```

The actual request method/payload MUST be replaced with the verified RapidAPI contract.

---

# Request validation

At `/api/ai/chat` validate:

- body is JSON
- `message` is a string
- message is not empty
- message is under configured character limit
- language is allowed
- mode is allowed
- history length is capped
- each history message is capped
- page path is a local medhaup path
- user cannot inject arbitrary remote URLs as "page context"

Do not accept raw system prompts from the browser.

---

# Timeout

Use an explicit provider timeout.

Recommended starting point:

`30000 ms` when web access is enabled

Web-backed responses can take longer than model-only answers. Keep the client timeout above the server timeout, and measure timeout rates before increasing either further.

User-facing timeout message:

> medhaup AI is taking longer than expected. Please try again.

Do not expose provider implementation details.

---

# Rate limits

The supplied documentation says the provider returns:

- `x-ratelimit-requests-limit`
- `x-ratelimit-requests-remaining`
- `x-ratelimit-requests-reset`

and uses HTTP 429 for rate-limit failures.

## Two different limits must exist

### 1. medhaup-side limit
Protects cost and abuse before calling the provider.

### 2. provider-side limit
Protects the provider subscription quota.

Do not rely only on the provider's 429.

---

# Suggested startup rate-limit strategy

If there is no Redis/Upstash infrastructure yet, start simple.

Possible MVP:

- derive a privacy-conscious request key from IP + daily date bucket
- store counters in an existing suitable server-side data store
- enforce max requests/day
- never store raw IP longer than necessary
- make limit configurable

If adding a new external rate-limit service would substantially expand scope, ship a simpler server-side limit first and document the trade-off.

Do not build a complex distributed quota system before traffic justifies it.

---

# Retry policy

Do NOT automatically retry every error.

Recommended:

### 400
No retry.

### 403
No retry. This is configuration/subscription/auth.

### 404
No retry. Likely wrong endpoint.

### 429
No immediate automatic retry from the same UI action.
Return a friendly limit message.

### 500 / 502 / 503
At most one short server-side retry for idempotent chat requests if:
- provider behavior is understood,
- retry will not double bill unexpectedly,
- timeout budget allows it.

Otherwise fail gracefully.

---

# Logging

Log only operational metadata.

Allowed example:

```text
ai_request
status=provider_timeout
mode=pyq_explain
duration_ms=15120
retrieval_used=true
```

Do NOT log:

- RapidAPI key
- bot secret
- full student message by default
- email
- phone
- personal student data
- full provider raw body when it may contain user text

For debugging, use short-lived controlled logs only.

---

# Retrieval before generation

Provider calls should receive structured context, not the entire website.

Suggested pipeline:

```text
question
  ↓
classify intent
  ↓
retrieve relevant medhaup records
  ↓
format 1–5 short context chunks
  ↓
system instructions
  ↓
provider call
```

Use existing `lib/data.ts` functions where they already expose the required published content.

If needed, add dedicated AI retrieval functions in `lib/ai/retrieve.ts`.

Do not bypass existing publish filters.

---

# Internal link safety

The model must not be trusted to invent URLs.

Build links from retrieved medhaup records in application code.

Good:

```ts
links = records.map(record => ({
  title: record.title,
  href: `/blogs/${record.slug}`
}));
```

Bad:

```text
Model says: "Visit /blogs/best-biology-notes-2027"
```

unless that route was verified in retrieved data.

---

# Future vision API

The documentation shows vision messages with `img_url`.

Do not implement photo solving in Phase 1.

Before future implementation verify:

- exact upload flow
- allowed image hosts
- provider image size/type limits
- whether image URLs are public
- retention/privacy behavior
- upload endpoint
- cost per request

Do not upload student images to a provider without an explicit product/privacy decision.
