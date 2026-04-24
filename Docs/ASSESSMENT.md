# Stumbl Trainee Assessment — Full Brief

> **Read this document in full before you start coding.**
> Note any ambiguities and document the assumptions you make in your project README.

---

## 🎯 What You're Building

The **Active Signals** page of Stumbl — but not as a scrollable feed.

It is a **swipeable card deck**, one signal at a time, where the user decides what to do with each signal (**Pass**, **Match**, or **Network / Refer**). Think Tinder-style interaction, not Twitter-style feed.

A visual reference of the finished card is in [`Docs/screenshots/active-signal-card.png`](./screenshots/active-signal-card.png). Look at it before you start.

You are building the **frontend only**. No authentication, no backend, no persistence. Use the mock dataset, but every interaction should feel real — **no dead buttons, no broken swipes, no placeholder TODOs left in the UI**.

---

## 📦 Stack (Pre-configured for You)

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 16** | App Router + Turbopack — already bootstrapped |
| Language | **TypeScript** | strict mode enabled |
| Styling | **Tailwind CSS v4** | already configured |
| Components | **shadcn/ui** | initialised; `button`, `card`, `badge`, `input`, `tabs`, `avatar`, `separator`, `skeleton` pre-installed |
| Data | **Mock / in-memory** | starter file at `src/lib/data/signals.ts` — extend to 12+ |
| Package Manager | **npm** | lockfile committed |

You are **not allowed** to use a UI kit other than shadcn/ui (no MUI, Chakra, Ant, etc.). Tailwind utility classes + shadcn primitives only.

Need another shadcn component (`dialog`, `select`, `textarea`, etc.)? Run:

```bash
npx shadcn@latest add <name>
```

---

## 🧩 Data Model

Use the shape in [`src/types/signal.ts`](../src/types/signal.ts) exactly. Do not rename fields.

```ts
type SignalType     = 'SUPPORT_NEEDED' | 'SUPPORT_OFFERED' | 'GENERAL'
type Visibility     = 'PUBLIC' | 'PRIVATE' | 'ORGANISATION_ONLY'
type SignalCategory = 'Awareness' | 'Support' | 'Opportunity' | 'Alert' | 'Question'
type SignalPriority = 'HIGH' | 'MEDIUM' | 'LOW'
type AuthorRole     = 'SERVICE_USER' | 'PRACTITIONER' | 'STUDENT' | 'SUPPORTER'
type SwipeAction    = 'PASS' | 'MATCH' | 'NETWORK_REFER'
```

Starter data lives in [`src/lib/data/signals.ts`](../src/lib/data/signals.ts). Extend:

- `signals` → at least **12 varied signals** (all 3 `SignalType`s, all 3 priorities, at least 4 categories, varied locations, mix of verified/unverified authors)
- `referralContacts` → at least **8 contacts** across practitioner and supporter roles

---

## 🃏 The Signal Card (Must Match Screenshot)

Refer to [`Docs/screenshots/active-signal-card.png`](./screenshots/active-signal-card.png) for the visual target. The card contains, from top to bottom:

### 1. Header row
- `SIGNAL {currentIndex + 1} / {total}` counter (top-left, uppercase, small caps)
- **Reset** button (top-right icon button) — resets the deck to the first card and clears all recorded decisions
- Horizontal **progress bar** beneath the counter, filling left-to-right as the user progresses through the deck

### 2. Author section
- Circular **avatar** (fallback to initials if `avatarUrl` is missing)
- `author.displayName` + a small **verified tick** if `author.verified === true`
- **Location** row with a pin icon + `signal.location`
- **Date** row with a clock icon + `signal.createdAt` formatted as `DD/MM/YYYY`
- On the same row (top-right of the card, opposite the avatar): **Category badge**
  - Colour-coded per `SignalCategory`
  - Includes a small lead icon (megaphone for Awareness, hand for Support, etc.)

### 3. Priority badge
- Shown below the author block on the left side
- Colour-coded:
  - `HIGH` → orange/red with a warning triangle icon
  - `MEDIUM` → amber
  - `LOW` → neutral / grey
- Label is capitalised (`High`, not `HIGH`)

### 4. Description
- Full `signal.description` text
- No truncation on the card — readable at any length
- Preserve paragraph breaks if the source text has them

### 5. Interest tag pills
- Render `signal.interests` as rounded pills
- Use shadcn `Badge` variant="secondary" or similar

### 6. Action bar (three circular buttons, centred)
Left to right:

| Button | Icon | Colour | Action |
|---|---|---|---|
| **Pass** | thumbs-down | red/pink | Dismiss the signal |
| **Network / Refer** | share / people | purple | Open the referral modal (see below) |
| **Match** | thumbs-up | green | Record a match |

Each button has a text label under it. Buttons must have:
- Visible focus ring (keyboard-accessible)
- Hover state
- Proper `aria-label`

### 7. Footer hints (below the card)
- `Swipe or tap buttons to take action`
- Small line showing keyboard shortcuts:
  - `← Pass`
  - `→ Match`
  - `↓ Network / Refer`

---

## 🖐 Interactions (All Must Work)

### Swipe
- **Swipe left** → PASS
- **Swipe right** → MATCH
- **Swipe down** → opens the Network/Refer modal
- Use native pointer events, CSS transforms, or a library of your choice — pick something that works smoothly on both mouse and touch
- While dragging, the card should:
  - Follow the pointer
  - Tilt slightly based on direction
  - Show a directional hint colour overlay (green / red / purple tint)
- On release:
  - If passed the threshold → animate the card off-screen in that direction
  - Otherwise → snap back to centre

### Tap
- Each action button triggers the same state transition as the equivalent swipe
- Buttons must work on mobile (no hover-only UI)

### Keyboard
- `ArrowLeft` → PASS
- `ArrowRight` → MATCH
- `ArrowDown` → Network/Refer modal
- Focus behaviour: arrow keys work when the deck is focused; `Tab` cycles through the three buttons

### Reset
- The top-right reset button returns to `signal #1`, clears the decision log, and re-enables any consumed cards

### End state
- When all signals have been decided on, show a friendly "You're all caught up" state with a **Start over** button that calls the same reset handler

---

## 🔗 Network / Refer Modal

Tapping Network/Refer (or swiping down) opens a modal. Use shadcn `Dialog` (install it if missing). The modal must contain:

### Header
- Title: `Refer this signal`
- Subtitle: short line like `Send it to people in your network who can help.`

### Body
1. **Search input** — filters the contact list by `displayName` or `organisation` (debounced 200ms)
2. **Contact list** — each row shows:
   - Avatar / initials
   - Display name + verified tick where applicable
   - Role + organisation line
   - A checkbox or toggle to select the contact
3. **Selected count** visible somewhere (e.g., `3 selected`)
4. **Note textarea** — optional free-text the user can send with the referral (max 280 chars, with a visible counter)

### Footer
- **Cancel** button → closes the modal, no state change
- **Send referral** button (primary):
  - Disabled when no contacts are selected
  - On click: records the referral (`console.log` is fine — no real backend), closes the modal, advances the deck, and shows a toast / inline confirmation (e.g., `Referred to 3 people`)

### Accessibility
- Focus traps inside the modal
- `Esc` closes
- Labelled headings and form controls

---

## ✅ Core Requirements Checklist

- [ ] Only one card visible at a time, matching the screenshot anatomy
- [ ] All three actions work via **tap**, **swipe**, and **keyboard**
- [ ] Counter + progress bar update correctly
- [ ] Reset button works
- [ ] All-caught-up empty state appears after the last card
- [ ] Network/Refer modal works end-to-end (search, select, note, send)
- [ ] At least **12 varied signals** and **8 referral contacts**
- [ ] Fully responsive (test at 375px, 768px, 1280px)
- [ ] `npm run build` passes with no TypeScript or lint errors
- [ ] At least **3 meaningful git commits** on a `submission/<your-name>` branch

---

## 🌟 Stretch Goals

Tackle only after the core is solid.

- Record a **decision log** (in-memory) and show it on a `/active-signals/history` page
- **Undo** last decision (arrow-up keyboard / button on the caught-up screen)
- **Animations**: spring physics on the snap-back, subtle scale-in for the next card
- Persist decisions to **localStorage** so a refresh resumes where you left off
- Category / priority **filter** before entering the deck (e.g., only High priority)
- Full **a11y** pass: keyboard-only navigation through modal, Lighthouse a11y ≥ 95

---

## 🚫 Out of Scope

- Real authentication or login
- Real backend / API / database
- Pagination / infinite scroll (the deck is the whole interaction)
- Unit or e2e tests
- Production deployment
- Pixel-perfect match to the screenshot — approximate is fine as long as the structure and interactions are right

---

## 🧠 Evaluation Rubric

| Area | Weight | What earns top marks |
|---|---|---|
| **AI Collaboration** | 30% | Specific prompts with file paths and types; verifies AI output against the brief; pushes back when AI is wrong |
| **Code Quality** | 25% | Strict types, small focused components, sensible file layout, no `any` without reason |
| **Product Instinct** | 20% | Swipe feels good, modal works as a real user would expect, empty states, responsive |
| **Problem Solving** | 15% | Reads errors, forms a hypothesis, tests it — does not repeat the same broken command |
| **Git Hygiene** | 10% | Commits tell a story; messages describe *why* |

---

## 👀 What the Interviewers Will Watch For

### Green flags 🟢
- Reads the brief and studies the screenshot before coding
- Writes specific, self-contained prompts (file paths, types, exact requirements)
- Opens the browser and tests each swipe/button after building it
- Commits in small logical chunks
- Questions AI suggestions that don't fit the spec
- Says "I don't know, let me check" rather than guessing

### Red flags 🔴
- Pasting AI output without reading it
- Running the same failing command repeatedly
- Never opening the browser to verify UI
- `any` types everywhere
- Cannot explain code the AI generated
- Ignoring TypeScript / lint errors

---

## 🗣 Debrief Questions (After Coding)

1. *"Walk me through the prompt you used for the swipe animation. Would you write it differently now?"*
2. *"Explain how you wired up the keyboard shortcuts — line by line."*
3. *"What was the hardest thing the AI got wrong, and how did you catch it?"*
4. *"Where would you put the referral API call if this were production?"*
5. *"If you had another 2 hours, what would you add next?"*

---

## 📏 Ground Rules

1. **Use AI freely.** Any tool. Any amount.
2. **But own your code.** If we point at any line, you should be able to explain it.
3. **If ambiguous, decide and document** your assumption in the project README.
4. **Ship something working.** A smaller, fully-working feature beats a half-built ambitious one.
5. **Keep commits small.** Commit when something works, not at the end.

---

## 📬 Submission

1. Push your final code to `submission/<your-name>`, **or** fork and share the link.
2. Update `README.md` with any assumptions or deviations.
3. Ensure `npm install && npm run dev` works on a clean clone.
4. Tag your final commit `final` when you're done.

---

**Good luck. Enjoy the build. Talk to the AI like a teammate, not an oracle.**
