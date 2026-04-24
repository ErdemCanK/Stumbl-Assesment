# Stumbl Trainee Assessment — Full Brief

> **Read this document in full before you start coding.**
> Note any ambiguities and document the assumptions you make in your project README.

---

## 🎯 What You're Building

A working clone of Stumbl's **Active Signals** page.

In Stumbl, a *signal* is a short post where a user either asks for support, offers support, or shares a general update. The **Active Signals** page is the public feed where users browse signals from others.

You are building the **frontend only**. No authentication, no database, no backend API. Use a mock dataset, but the page should feel and behave like a real product — **no dead buttons, no broken filters, no "TODO" placeholders in the UI**.

---

## 📦 Required Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 15+** | App Router (not Pages Router) |
| Language | **TypeScript** | strict mode enabled |
| Styling | **Tailwind CSS** | v4 preferred |
| Components | **shadcn/ui** | install only what you need |
| Data | **Mock / in-memory** | JSON file or `.ts` array |
| Package Manager | npm / pnpm / bun | your choice |

You are **not allowed** to use a UI kit other than shadcn/ui (no MUI, Chakra, Ant, etc.). Tailwind utility classes + shadcn primitives only.

---

## 🧩 Data Model

Use this shape exactly. Do not simplify or rename fields.

```ts
export type SignalType = 'SUPPORT_NEEDED' | 'SUPPORT_OFFERED' | 'GENERAL'
export type Visibility = 'PUBLIC' | 'PRIVATE' | 'ORGANISATION_ONLY'

export interface SignalAuthor {
  id: string
  displayName: string
  avatarUrl?: string
  role: 'SERVICE_USER' | 'PRACTITIONER' | 'STUDENT' | 'SUPPORTER'
}

export interface Signal {
  id: string
  title: string
  description: string
  type: SignalType
  visibility: Visibility
  author: SignalAuthor
  location: string          // e.g. "Manchester, UK"
  interests: string[]       // e.g. ["housing", "mental-health"]
  createdAt: string         // ISO 8601
}
```

Create **at least 12 mock signals** with genuine variety:

- All three signal types represented
- Multiple locations (UK districts/cities)
- Varied interest tags (at least 8 unique tags across the dataset)
- A mix of author roles
- `createdAt` spread across the last 30 days

---

## ✅ Core Requirements (Must Have)

### 1. Route
- Path: `/active-signals`
- Renders a feed of signal cards
- Page title and meaningful `<meta>` description

### 2. Signal Card
Each card must display:
- Title (truncate to 2 lines if long)
- Description (truncate to 3 lines if long)
- Type badge with colour coded by `SignalType`
- Author display name + avatar (fallback to initials if no `avatarUrl`)
- Location
- Relative creation date (e.g. "2 days ago")
- Interest tags as chips (show max 4, with a `+N` overflow indicator)

### 3. Filtering
- Filter by signal type: All / `SUPPORT_NEEDED` / `SUPPORT_OFFERED` / `GENERAL`
- Use tabs or segmented control (shadcn `Tabs` is fine)
- URL should reflect the filter (e.g. `?type=SUPPORT_NEEDED`) so the state survives refresh

### 4. Search
- Free-text search input
- Searches across **title + description + interest tags**
- Debounced (300ms) so it doesn't thrash on every keystroke

### 5. Empty State
- When no signals match the current filter/search, show a friendly empty state with:
  - An icon or illustration
  - A helpful message
  - A "Clear filters" button that resets everything

### 6. Responsive Layout
- Mobile-first
- Test at 375px, 768px, and 1280px viewport widths
- No horizontal scroll on any breakpoint

### 7. Git Hygiene
- At least 3 meaningful commits
- Clear, imperative commit messages (e.g. `add signal card component`, not `stuff`)

---

## 🌟 Stretch Goals (Bonus)

Tackle these only after the core is complete and polished.

- **Location filter** — dropdown or free-text that narrows by `location`
- **Sort control** — newest first (default) / oldest first
- **Signal detail view** — clicking a card opens either a modal or `/signals/[id]` with the full signal
- **Loading skeleton** — shown on initial render (simulate a short delay)
- **Visibility UI** — hide `PRIVATE` signals from the feed; render a lock icon on `ORGANISATION_ONLY`
- **Accessibility pass**
  - Keyboard navigation through filters and cards
  - Proper ARIA labels on interactive elements
  - Focus-visible styles
  - Passes Lighthouse a11y check (95+)

---

## 🚫 Out of Scope

Do not spend time on these — we are not evaluating them:

- Real authentication or login flow
- Database, API, or server actions beyond what's needed for the page
- Pagination or infinite scroll
- Writing unit tests (integration/e2e neither)
- Deployment to Vercel/Netlify (nice if done, not required)
- Pixel-perfect design match to the real Stumbl app

---

## 🧠 Evaluation Rubric

| Area | Weight | What earns top marks |
|---|---|---|
| **AI Collaboration** | 30% | Specific prompts with context; verifies AI output against the brief; pushes back when AI is wrong; uses types to steer the AI |
| **Code Quality** | 25% | Strict types, small focused components, sensible file layout, no dead code, no `any` without justification |
| **Product Instinct** | 20% | Thoughtful empty/loading states, responsive on mobile, smooth interactions, reasonable a11y defaults |
| **Problem Solving** | 15% | Reads error messages, forms a hypothesis, tests the hypothesis — does not retry the same broken command |
| **Git Hygiene** | 10% | Commits tell a story; messages describe *why*, not just *what* |

---

## 👀 What the Interviewers Will Watch For

This is a live session. We will observe your process, not just the artefact.

### Green flags 🟢
- You read the brief carefully before starting
- You write **specific, self-contained prompts** to the AI (with file paths, types, exact requirements)
- You open the browser and verify each feature after building it
- You commit in small logical chunks with clear messages
- You question AI suggestions that don't fit the brief
- You say "I don't know, let me check" rather than guessing

### Red flags 🔴
- Pasting AI output without reading it
- Running the same failing command repeatedly with no change
- Never opening the browser to verify UI
- `any` types sprayed everywhere
- Cannot explain code the AI generated
- Ignoring TypeScript or lint errors
- Copying the same block three times instead of extracting a component

---

## 🗣 Debrief Questions (Asked at the End)

After you finish coding, expect to be asked:

1. *"Walk me through the prompt you used when you got stuck on X. Would you write it differently now?"*
2. *"Explain this block of code the AI generated — line by line."*
3. *"How would you decide between two different AI suggestions?"*
4. *"What would you add if you had another 2 hours?"*
5. *"Where would you put authentication and real data fetching if this were going to production?"*
6. *"What is one thing the AI got wrong during this session, and how did you catch it?"*

---

## 📏 Ground Rules

1. **Use AI freely.** Any tool. Any amount. We want to see you collaborate with it.
2. **But own your code.** If we point at any line and ask what it does, you should be able to answer.
3. **If the brief is ambiguous, decide and document.** Note your assumption in the project README.
4. **Ship something working.** A smaller, fully-working feature beats a half-built ambitious one.
5. **Keep commits small.** Commit when something works, not at the end.

---

## 📬 Submission

1. Push your final code to a branch in this repository (`submission/<your-name>`), **or** fork and push to your own repo and share the link.
2. Make sure `README.md` reflects what you actually built — any deviation from this brief should be documented there.
3. Ensure `npm install && npm run dev` works from a clean clone.
4. Tag your final commit `final` if you want to signal that you're done.

---

**Good luck. Enjoy the build. Talk to the AI like a teammate, not an oracle.**
