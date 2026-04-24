# Stumbl Trainee Assessment — Full Brief

> **Read this document in full before you start coding.**
> Note any ambiguities and document the assumptions you make in your project README.

This is a **take-home assessment**, scoped for roughly **two working days (~16 hours)**. You are free to split the time across calendar days.

---

## 🎯 What You're Building

A working vertical slice of Stumbl's **Active Signals** feature. Full stack:

1. **Local PostgreSQL** holding the data
2. **Next.js API routes** (Route Handlers) exposing typed, validated, documented endpoints
3. **OpenAPI / Swagger** reference generated from the code
4. **Swipeable card UI** at `/active-signals` that consumes the API end-to-end

A visual reference of the finished card is in [`Docs/screenshots/active-signal-card.png`](./screenshots/active-signal-card.png). Look at it before you start.

At the end of the two days you also write a short **Development Report** describing how you worked with AI, which models and tools you used, and where you got stuck — template in [`Docs/DEVELOPMENT_REPORT.md`](./DEVELOPMENT_REPORT.md).

---

## 📦 Stack (Pre-configured for You)

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 16** | App Router + Turbopack — already bootstrapped |
| Language | **TypeScript** | strict mode |
| Styling | **Tailwind CSS v4** | configured |
| Components | **shadcn/ui** | `button`, `card`, `badge`, `input`, `tabs`, `avatar`, `separator`, `skeleton` pre-installed |
| ORM / DB | **Prisma 6** + **PostgreSQL 16** | schema and seed script provided; DB runs in Docker |
| API Docs | **next-swagger-doc** + **swagger-ui-react** | spec at `/api/docs`, UI at `/api-docs` |
| Validation | **Zod** | installed; use it at every API boundary |
| Package Manager | **npm** | lockfile committed |

You are **not allowed** to swap out a core library (no Drizzle instead of Prisma, no MUI instead of shadcn, etc.). If you need an extra library, justify it in the Development Report.

Need another shadcn component (`dialog`, `select`, `textarea`, etc.)? Run:

```bash
npx shadcn@latest add <name>
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies (runs `prisma generate` automatically)
npm install

# 2. Copy env file
cp .env.example .env

# 3. Start Postgres in Docker
npm run db:up

# 4. Push the Prisma schema and seed fixtures
npm run db:push
npm run db:seed

# 5. Start the dev server
npm run dev
```

Open:
- http://localhost:3000/active-signals — the UI you are building
- http://localhost:3000/api-docs — Swagger UI for the API you are building
- http://localhost:3000/api/health — DB reachability check (example endpoint, already documented)

Handy extras:

| Script | What it does |
|---|---|
| `npm run db:studio` | Prisma Studio — GUI over your local DB |
| `npm run db:reset` | Drop schema, reapply, re-seed |
| `npm run db:down` | Stop the Postgres container |

---

## 🧩 Data Model

The Prisma schema at [`prisma/schema.prisma`](../prisma/schema.prisma) is your source of truth. Do **not** rename existing fields; you may add new ones if you need them (migrate properly).

Core models:

- `Author` — every signal and every referral contact belongs to an author
- `Signal` — the object shown on the card
- `Decision` — a user's `PASS` / `MATCH` / `NETWORK_REFER` action on a signal
- `ReferralContact` — contacts the user can refer a signal to
- `Referral` + `ReferralRecipient` — many-to-many record of who a signal was referred to, with an optional note

Seed data (via `npm run db:seed`):
- 14 authors
- 14 signals across all categories, types, and priorities
- 8 referral contacts

---

## 🛠 Backend Requirements (Day 1 focus)

Build and document the following endpoints. Every endpoint must:

1. Be typed at the boundary with **Zod** (input validation returning `400` with a readable error on failure)
2. Query Postgres through the **Prisma client** exported from `src/lib/db.ts`
3. Be documented with a `@swagger` JSDoc block (copy the pattern from `src/app/api/health/route.ts`)
4. Return JSON with a consistent error shape: `{ error: string, details?: unknown }`

| Method | Path | Behaviour |
|---|---|---|
| `GET` | `/api/signals` | List signals. Support query params `?type`, `?category`, `?priority`, `?q` (free-text over title + description). |
| `GET` | `/api/signals/:id` | Return a single signal with its author inlined. `404` if not found. |
| `POST` | `/api/signals/:id/decisions` | Record a decision. Body: `{ action: 'PASS' \| 'MATCH' \| 'NETWORK_REFER' }`. Uses `SEED_USER_ID` from env as `userId`. |
| `GET` | `/api/decisions` | List the authenticated-stub user's decisions, most recent first. |
| `GET` | `/api/referral-contacts` | List contacts, optional `?q` search filter. |
| `POST` | `/api/referrals` | Body: `{ signalId, contactIds: string[], note?: string }`. Creates a `Referral` + `ReferralRecipient` rows. |

Nice-to-haves inside the backend:
- **Pagination** on `/api/signals` (`?cursor`, `?limit`)
- **Rate-limit** on `/api/decisions` (simple in-memory is fine)
- Shared **Zod schemas** re-exported for client use (`src/lib/validations/`)

---

## 🃏 Frontend Requirements (Day 2 focus)

Refer to [`Docs/screenshots/active-signal-card.png`](./screenshots/active-signal-card.png) for the visual target.

### Card anatomy
- Header row: `SIGNAL {index+1} / {total}` counter + horizontal progress bar + reset icon button
- Author block: avatar (initials fallback), display name + verified tick, location row (pin icon), date row (clock icon), category badge top-right (colour-coded per `SignalCategory`)
- Priority badge under author (`HIGH` orange/warning, `MEDIUM` amber, `LOW` neutral)
- Full description (no truncation)
- Interest tag pills
- Action bar: **Pass** (red, thumbs-down), **Network / Refer** (purple, share), **Match** (green, thumbs-up) — each with an `aria-label` and visible focus ring
- Footer: `Swipe or tap buttons to take action` + keyboard hints (`← Pass • → Match • ↓ Network / Refer`)

### Interactions (all three must work)
- **Swipe**: left → PASS, right → MATCH, down → opens Refer modal. Card follows the pointer, tilts, tints directionally, and either flies off-screen past a threshold or snaps back.
- **Tap** the buttons produces the same state transitions.
- **Keyboard**: `ArrowLeft`, `ArrowRight`, `ArrowDown`.

Every `PASS` / `MATCH` must `POST /api/signals/:id/decisions` — reflect success/failure with a toast or inline state.

### Reset / End state
- Reset button returns to card 1 and clears local deck state (not DB decisions — those are a log)
- When the deck is exhausted, show a "You're all caught up" state with **Start over**

### Network / Refer modal
Use shadcn `Dialog`. Must have:
- Title + subtitle
- Debounced search input (200ms) filtering `/api/referral-contacts`
- Contact list with selectable rows (checkbox), avatar, name, role + organisation
- Selected count indicator
- Optional note textarea (max 280 chars, live counter)
- **Cancel** (no mutation) and **Send referral** (disabled if no contacts selected)
- On send: `POST /api/referrals`, close modal, advance the deck, show confirmation toast
- Focus trap + `Esc` to close

### UX hygiene
- Proper **loading** (skeleton) and **error** states for every fetch
- **Responsive** at 375px, 768px, 1280px
- Focus-visible styles, keyboard navigation, labelled controls

---

## 📝 Development Report (required)

Fill in [`Docs/DEVELOPMENT_REPORT.md`](./DEVELOPMENT_REPORT.md). It is short but we read it carefully — it's how we understand your process.

Sections include:
- Tools and AI models used (with why)
- The part you struggled with most
- The best prompt you wrote (copy-pasted) and why you were proud of it
- Where the AI was most wrong
- What you would do differently with more time

**We weight this heavily.** Half-hearted answers drop your score.

---

## ✅ Definition of Done

Two-day submission must tick **all** boxes:

### Backend
- [ ] Docker Postgres running, schema pushed, seed data loaded
- [ ] All 6 endpoints implemented, typed, validated, and documented
- [ ] `/api-docs` renders correctly and every endpoint has a description, parameters, request body (where applicable), and response schema
- [ ] Consistent error shape across endpoints
- [ ] `npm run build` passes

### Frontend
- [ ] `/active-signals` fetches from the API (no more hard-coded data)
- [ ] Swipe, tap, and keyboard interactions all work
- [ ] Network / Refer modal works end-to-end with search, selection, and note
- [ ] Loading + error states everywhere
- [ ] Responsive at 375 / 768 / 1280px
- [ ] No `any` types without a comment

### Process
- [ ] At least **6 meaningful git commits** on a `submission/<your-name>` branch
- [ ] `README.md` updated with any assumptions / deviations
- [ ] `Docs/DEVELOPMENT_REPORT.md` filled in

---

## 🧠 Evaluation Rubric

| Area | Weight | What earns top marks |
|---|---|---|
| **AI Collaboration** (incl. Development Report) | 30% | Specific prompts, verification habits, honest and specific report |
| **Backend Quality** | 25% | Clean API design, proper Zod validation, correct Prisma usage, accurate Swagger docs |
| **Frontend Quality** | 20% | Swipe feels good, modal works, loading/error states present, a11y considered |
| **Code Quality** | 15% | Strict types, small components, no dead code, sensible file layout |
| **Git Hygiene** | 10% | Commits tell a story; messages describe *why* |

---

## 🌟 Stretch Goals (only if core is solid)

- **Undo** last decision (button on caught-up state + keyboard `ArrowUp`)
- `/active-signals/history` page showing the decision log from `/api/decisions`
- **Optimistic UI** on decisions + rollback on failure
- Persist deck position to **localStorage**
- Category / priority **filter** before entering the deck
- Basic **request logging** middleware + error boundary
- Full **a11y** pass (Lighthouse ≥ 95)

---

## 🚫 Out of Scope

- Real authentication / login (use `SEED_USER_ID` from `.env` as a stub)
- Deployment to Vercel/Netlify
- Unit / e2e tests (we value working software + the report more)
- Pixel-perfect design match — approximate is fine

---

## 📏 Ground Rules

1. **Use AI freely.** Any model. Any tool.
2. **Own your code.** If we point at any line, you should explain it.
3. **Document assumptions** in the project README.
4. **Ship something working.** Smaller and working beats bigger and broken.
5. **Keep commits small.** Commit when something works, not at the end of each day.

---

## 📬 Submission

1. Push your final code to `submission/<your-name>`.
2. Ensure `npm install && npm run db:up && npm run db:push && npm run db:seed && npm run dev` works on a clean clone.
3. Fill in `Docs/DEVELOPMENT_REPORT.md`.
4. Tag your final commit `final` and let us know the branch is ready.

---

**Good luck. Enjoy the build. Talk to the AI like a teammate, not an oracle.**
