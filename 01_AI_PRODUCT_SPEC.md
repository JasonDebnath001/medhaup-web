# medhaup AI — Product Specification

## Product statement

**medhaup AI** is a bilingual student-support and content-discovery assistant embedded inside the medhaup website. It represents medhaup and can answer useful student questions beyond the current page and beyond ANM/GNM.

It should help a student answer the question:

> "What do I need to understand, and how can medhaup help me?"

It should be broadly helpful to students without inventing services, courses, or company facts. When asked about an exam medhaup does not serve, it answers the general question and clearly explains that medhaup currently offers only WBJEEB ANM(R)/GNM preparation.

---

# Primary users

## 1. ANM/GNM aspirant
Needs:

- concept explanation
- exam-level answers
- PYQ help
- chapter clarification
- simple Bengali
- fast access to study material

## 2. Counselling visitor
Needs:

- find current medhaup counselling content
- understand published instructions
- navigate documents / dates / articles

Important: in Phase 1 the AI may explain existing medhaup counselling content, but must not independently predict seats, cut-offs, or college chances.

## 3. Prospective paid student
Needs:

- understand the current course
- know what the batch contains
- find admission/app/WhatsApp paths

The assistant can explain actual published course information, but must not invent:
- discounts
- guarantees
- seats left
- teacher credentials
- dates
- pricing

---

# Product principles

## 1. Context before conversation

The assistant should know:

- current page URL
- page type
- page title
- relevant page text or content ID
- optional subject
- optional chapter/topic
- optional content slug

A Biology-page question should not be treated like a random general chat.

The current page is supporting context, not an answer boundary. A question about another page, subject, or entrance exam should still receive a useful answer.

For current or changing public information, the assistant should use web access, prioritize the responsible authority's official source, and make the as-of date clear. Web results must not override trusted medhaup facts or be used to invent medhaup services, prices, policies, or partnerships.

## 2. medhaup content before generic knowledge

When the query is about:

- medhaup resources
- batches
- counselling posts
- PYQs
- current affairs
- syllabus
- downloads
- store content

retrieve the current published medhaup data first.

Use the model to explain and organize retrieved information.

## 3. Small answers first

Default answer length:

- 2–5 short paragraphs, or
- concise structured bullets when useful

Offer deeper explanation as a follow-up suggestion.

Avoid wall-of-text responses on mobile.

## 4. Bilingual by design

Supported response modes:

- `auto`
- `bn`
- `en`
- `mixed`

`auto` should detect the user's language from the current message.

Bengali responses should remain readable and natural. Keep unavoidable exam terminology in English where students commonly use the English term.

## 5. Show the next useful action

A useful AI response often ends with one contextual action:

- "Practice a similar question"
- "Open Biology syllabus"
- "See the PYQ"
- "Read the full article"
- "View the current batch"
- "Ask a follow-up"

Do not add aggressive admission CTAs to every educational response.

---

# MVP user stories

## Story A — doubt solving

**As a student**
I want to ask a doubt from the page I am reading
so that I do not have to leave medhaup to understand it.

### Acceptance criteria

- Current page context is passed.
- Answer matches ANM/GNM level.
- User can change answer language.
- System does not require a login for first MVP unless product owner chooses otherwise.
- Error state does not erase the user's question.

---

## Story B — website search

**As a student**
I want to ask medhaup where a resource is
so that I can discover content without navigating menus manually.

### Example

User:

> Logarithm er practice ache?

Expected behavior:

- Search published medhaup content.
- Prefer exact/related content.
- Return at most 3–5 strong matches.
- Each match includes title + content type + internal link.
- If nothing useful exists, say so.

Do not fabricate pages.

---

## Story C — PYQ explanation

**As a student**
I want an explanation of a question
so that I understand the concept rather than only seeing the answer.

Possible actions:

- Explain simply
- Explain in Bengali
- Why this answer?
- Why not the other options?
- Similar question

The similar question may be generated, but it must be clearly identified as AI-generated practice unless it comes from the medhaup question bank.

---

## Story D — counselling-content explanation

**As a counselling visitor**
I want a confusing instruction explained simply
so that I understand the article I am reading.

Allowed:
- explain what a published article says
- summarize current medhaup instructions
- link to relevant medhaup article

Not allowed in Phase 1:
- "You will definitely get College X"
- invented cut-offs
- invented dates
- seat guarantees
- unsourced historical closing ranks

---

# Suggested first surfaces

Recommended order:

1. Blog detail pages
2. PYQ pages
3. Syllabus pages
4. Current affairs pages
5. Resources pages
6. Course page
7. Homepage

Do not immediately add the assistant everywhere if the first surfaces are not stable.

---

# Entry point behavior

## Desktop

Persistent floating trigger at bottom-right.

When opened:
- side panel / compact assistant panel
- no full-page navigation
- preserve the page behind it

## Mobile

Floating trigger above mobile browser safe area.

When opened:
- bottom sheet that expands to near full height
- input remains reachable when keyboard opens
- page position should not unexpectedly reset

---

# First-open state

Keep the first-open state calm and minimal.

Show:

**medhaup AI**
"Ask about exams, subjects, courses, or current updates."

Do not show pre-designed prompt buttons. Let the student type their own question immediately.

---

# Conversation scope

MVP should keep a short conversation window.

Recommended:
- last 6–10 messages maximum
- summarize or drop old context if needed

Do not keep unlimited history.

Do not store raw chat history in Supabase in Phase 1 unless there is a specific business requirement.

---

# Free usage strategy

Recommended starting rule:

### Anonymous visitor
5 AI requests / day / device-IP combination

### Future authenticated free user
15 requests / day

### Future paid student
higher fair-use limit

Do not build paid-tier logic until authentication and product entitlement data are ready.

For MVP, implement a simple configurable limit.

---

# Conversion behavior

AI should assist conversion only when intent is present.

Good:
User asks "How can I join?"
→ show actual admission/app/WhatsApp options.

Bad:
User asks "What is mitochondria?"
→ do not append a batch sales pitch.

Track conversion-assisting AI interactions separately.

---

# Success metrics

First 30 days:

- AI open rate
- first-question rate
- answer success rate
- follow-up rate
- internal-link click rate
- average questions per session
- AI-assisted admission click rate
- error rate
- 429 rate
- response latency
- top question categories

Most important qualitative metric:

> Are students using AI to go deeper into medhaup content rather than bouncing away?
