# medhaup AI — UI / UX Design Specification

## Design goal

medhaup AI should feel like a **native learning tool inside medhaup**, not a third-party chat widget pasted onto the website.

The experience should be:

- calm
- academic
- modern
- trustworthy
- mobile-first
- fast
- useful before impressive

Avoid futuristic AI clichés.

No glowing neon orbs.
No purple AI gradients.
No robot mascot.
No glassmorphism-heavy floating windows.
No "magic" sparkle overload.
No generic ChatGPT copy.

---

# Current website design system

Do not silently redesign medhaup globally.

Use the current website's existing Tailwind theme tokens from `app/globals.css`:

```text
navy:        #1a0c70
navy-dark:   #130856
orange:      #fe7b30
orange-dark: #e5691f
cream:       #faf9f7
```

Current fonts:

```text
sans:    Inter
heading: Plus Jakarta Sans
```

Important:
The AI feature should consume the existing tokens (`bg-navy`, `text-orange`, etc.) rather than introducing another independent brand palette.

If the product owner later decides to migrate the whole website to different brand hex values, that should be a separate global design change.

---

# Visual concept

Think:

> "A teacher's help desk embedded into a premium exam-preparation website."

Not:

> "A sci-fi AI bot."

Primary visual language:

- white / cream surfaces
- navy hierarchy
- orange as selective action/accent
- subtle slate borders
- compact spacing
- rounded but not toy-like
- low-shadow cards
- strong text readability

---

# Component 1 — Floating AI trigger

## Desktop

Position:
- fixed bottom-right
- account for any existing WhatsApp/campaign sticky controls
- do not stack buttons blindly

Suggested shape:
- pill rather than round icon-only bubble

Example:

```text
[ small icon ]  Ask medhaup AI
```

Dimensions:
- height around 46–50 px
- horizontal padding 16–18 px
- border radius 9999px

Style:
- navy background
- white label
- small orange accent/icon detail
- restrained shadow

Hover:
- slight translateY or darker navy
- no dramatic scaling

Focus:
- clear keyboard ring

## Mobile

Use a compact pill:

```text
Ask AI
```

or

```text
medhaup AI
```

Do not take excessive horizontal space.

The trigger must not block:
- important bottom navigation
- WhatsApp CTA
- admission CTA
- browser safe-area controls

---

# Component 2 — Desktop panel

Recommended size:

```text
width: 390–430 px
max-height: min(720px, calc(100vh - 32px))
```

Position:
- fixed right
- bottom
- 16–24 px from viewport edges

Structure:

```text
┌───────────────────────────────────┐
│ medhaup AI                  [ × ] │
│ Help with this page              │
├───────────────────────────────────┤
│ Context chip                     │
│ Biology • Cell & Organelles      │
│                                   │
│ Welcome / messages               │
│                                   │
│ Suggested actions                │
│                                   │
├───────────────────────────────────┤
│ [BN | EN | Mixed]                │
│ Ask a question...           [→]  │
└───────────────────────────────────┘
```

Use one contained surface.

Avoid nested card-inside-card-inside-card styling.

---

# Component 3 — Mobile bottom sheet

Opening behavior:
- rises from bottom
- near full-screen, e.g. 88–94dvh
- rounded top corners only
- page remains behind with subtle overlay

Use dynamic viewport units where supported.

Header must stay visible.

Composer should stay reachable above the virtual keyboard.

The message area should scroll independently.

---

# Header

Content:

**medhaup AI**

Secondary line:
- contextual, short
- e.g. `Biology help`
- e.g. `Ask about this article`
- e.g. `Find study resources`

Header actions:
- close
- optional "new chat" only if conversation reset becomes necessary

Do not show:
- provider model
- "GPT"
- RapidAPI
- PR Labs

Students are using medhaup AI, not buying infrastructure.

---

# Context chip

Purpose:
make page-awareness visible and trustworthy.

Examples:

```text
Reading: Cell & Cell Organelles
```

```text
PYQ: Biology
```

```text
Current Affairs • 29 Aug 2026
```

Style:
- small cream/slate surface
- navy text
- subtle border
- optional tiny page/document icon

Avoid large banners.

---

# First-open state

Do not start with a blank chat.

Example:

```text
Ask about this page, find a medhaup resource,
or get a simple explanation.
```

Then 2–3 contextual quick actions.

### Blog

```text
[ Explain this simply ]
[ Key exam points ]
[ Related resources ]
```

### PYQ

```text
[ Explain the answer ]
[ Why other options are wrong ]
[ Similar question ]
```

### Syllabus

```text
[ Explain this topic ]
[ Where should I start? ]
[ Find related PYQs ]
```

### Current affairs

```text
[ Explain this news ]
[ Why it matters for exams ]
[ Quiz me ]
```

Avoid showing six or eight chips.

---

# Chat messages

## Student message

- right aligned
- navy background
- white text
- max width ~85%
- compact radius
- no avatar required

## AI message

- left aligned
- white or very light cream
- slate/navy text
- no giant bot avatar
- optional small medhaup mark/icon at start

AI response typography:
- 14–15 px mobile
- 14–16 px desktop
- line-height about 1.55–1.65
- generous enough for Bengali glyph readability

Lists:
- compact
- small spacing
- orange bullet/accent only if existing styles support it

Bold:
use for key exam terms, not every sentence.

---

# Source / resource links

When retrieval returns medhaup content, do not bury links inside a giant text answer.

Use a compact resource block under the answer:

```text
Related on medhaup

[ Biology Syllabus                  → ]
[ Cell PYQ 2025                     → ]
```

Each item:
- one-line/two-line title
- content-type micro label
- arrow
- full card clickable
- verified internal URL only

Do not show provider-style citation numbers to students unless the product later needs formal citations.

---

# Composer

Structure:

```text
┌─────────────────────────────────┐
│ Ask about this topic...         │
│                          [Send] │
└─────────────────────────────────┘
```

Requirements:

- textarea grows up to a sensible max
- Enter sends on desktop
- Shift+Enter newline
- on mobile, sending behavior should not fight the keyboard
- disable send if empty
- preserve prompt on request failure
- show character limit only near limit

No attachment button in Phase 1.

No microphone in Phase 1.

---

# Language control

Place near composer or just above it.

Options:

```text
Auto | বাংলা | English | Mixed
```

Default:
`Auto`

Keep it subtle.

A segmented control is appropriate.

Do not put language selection in a settings modal.

---

# Loading state

Do not use a fake "typing" animation that lasts arbitrarily.

Use a compact status:

```text
medhaup AI is thinking…
```

with 3 subtle dots or small progress motion.

If retrieval is happening, do not expose implementation details like:
- searching database
- calling GPT
- querying RapidAPI

Perceived latency matters. Keep the panel interactive while waiting.

---

# Error states

Errors must feel like product states, not developer errors.

## Temporary failure

```text
Couldn’t get an answer right now.
Your question is still here — try again.
```

Button:
`Try again`

## Rate limited

```text
AI usage is temporarily limited.
Please try again later.
```

Do not show:
- HTTP 429
- provider quota
- RapidAPI

## Misconfiguration

Generic user message:

```text
medhaup AI is temporarily unavailable.
```

Operational detail belongs in server logs.

---

# Counselling guardrail UI

If the assistant cannot provide a verified prediction:

```text
I can explain the counselling information available on medhaup,
but I shouldn’t guess a college or seat without verified cut-off data.
```

Then, if available:

```text
Relevant guides
[ Round 3 Counselling Guide → ]
[ Choice Filling Guide       → ]
```

This is better than a generic refusal.

---

# Conversion UI

Only show conversion actions when context supports them.

Example course-intent response:

```text
Ready to join?

[ Take Admission ]   [ WhatsApp ]
```

Do not insert an admission banner after academic doubts.

AI should build trust first.

---

# Motion

Use Framer Motion only where it improves clarity.

Allowed:
- panel/sheet enter
- message fade/slide of a few pixels
- suggestion chip hover
- trigger hover

Avoid:
- bouncing robot
- infinite glow
- large spring scaling
- flashy gradients
- typewriter effect for every answer

Respect reduced motion.

---

# Responsive rules

## < 640px
- bottom sheet
- near full width
- no side panel
- 2 quick actions per row only if labels fit; otherwise vertical
- composer fixed/sticky within sheet

## 640–1024px
- narrow side panel or bottom sheet depending layout
- ensure article column is not unusably compressed

## > 1024px
- floating right-side panel
- preserve reading context on the left

---

# Accessibility

Required:

- semantic dialog/sheet where appropriate
- title associated with panel
- icon buttons have labels
- keyboard support
- visible focus
- no focus trap bugs
- contrast AA where practical
- status text available to assistive technology
- loading state announced politely
- errors announced
- touch targets about 44px minimum
- Bengali text not clipped by line-height

---

# Empty / disabled state

If AI environment configuration is missing:

Preferred production behavior:
- do not render the trigger

Alternative for staging:
- render disabled only when intentionally testing

Never show users a broken button that always errors.

---

# Placement by page

## Blog detail
Best placement:
- global floating trigger
- optional inline "Ask AI about this article" entry after intro or near article actions

Do not insert the full chat UI in the article body.

## PYQ
Use:
- global trigger
- contextual inline `Explain with AI` action near question/answer controls if available

## Syllabus
Use:
- global trigger
- small `Ask about this topic` action on subject/topic sections only if it does not clutter the page

## Current affairs
Use:
- global trigger
- optional `Explain` action per item in future

## Course
Use:
- global trigger
- course-aware suggested questions

---

# Design quality bar

Before release, compare the feature against the existing website.

Reject the design if it looks like:
- a SaaS customer-support plugin
- an imported ChatGPT clone
- a generic purple AI template
- an oversized modal that hides the learning content
- a sales chatbot

Approve when it feels like:
- medhaup
- academic
- trustworthy
- useful in 5 seconds
- easy on a low-to-mid range Android phone
- readable in Bengali
