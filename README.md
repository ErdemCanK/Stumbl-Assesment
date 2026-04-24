# Stumbl — Trainee Technical Assessment

Welcome! This repository contains your technical assessment for the **Stumbl App** trainee position.

The goal of this assessment is twofold:

1. **Technical skills** — build a working Next.js feature with clean, typed, responsive code.
2. **AI collaboration skills** — show us how you work with AI coding assistants (Claude Code, Cursor, Copilot, ChatGPT — your choice).

> You are **expected and encouraged** to use AI tools during this assessment. We are not testing whether you can code without them; we are testing whether you can **direct them effectively**, verify their output, and ship working software.

---

## 📌 The Task

Build a simplified version of Stumbl's **`/active-signals`** page — the public feed where users browse signals posted by others.

You do **not** need real authentication, a real database, or a backend. Use **placeholder (mock) data**, but the page itself must be **fully functional end-to-end**: filters work, search works, navigation works, and nothing should be a dead button.

Full requirements, evaluation criteria, and data shape are in [`Docs/ASSESSMENT.md`](./Docs/ASSESSMENT.md) — **read this before you start coding.**

---

## ⏱ Time & Format

| Item | Detail |
|---|---|
| **Duration** | ~90 minutes (30 min have already been saved for you via this bootstrap) |
| **Format** | Live screen-share with the hiring team |
| **AI tools** | Allowed and encouraged (any tool you prefer) |
| **Stack** | Next.js 15+ App Router, TypeScript, Tailwind CSS v4, shadcn/ui |
| **Deliverable** | Push your code to a `submission/<your-name>` branch of this repo |

---

## 🚀 Getting Started

The project is pre-bootstrapped. You should not need to run `create-next-app`.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the starter page
#    http://localhost:3000/active-signals
#    (the root `/` route redirects here)
```

If anything fails on a clean clone, stop and flag it — the interviewer wants to know.

---

## 📦 What's Already Set Up

| Area | Status |
|---|---|
| Next.js 15+ with App Router, TypeScript, Turbopack | ✅ ready |
| Tailwind CSS v4 | ✅ configured |
| shadcn/ui initialised | ✅ done |
| shadcn components installed | `button`, `card`, `badge`, `input`, `tabs`, `avatar`, `separator`, `skeleton` |
| ESLint | ✅ wired |
| `Signal` type definition | [`src/types/signal.ts`](./src/types/signal.ts) |
| Seed mock data (3 signals) | [`src/lib/data/signals.ts`](./src/lib/data/signals.ts) — extend to **12+** |
| Placeholder `/active-signals` page | [`src/app/active-signals/page.tsx`](./src/app/active-signals/page.tsx) — replace with real feed |
| Root `/` redirect to `/active-signals` | ✅ done |

**Need another shadcn component?** Add it with:

```bash
npx shadcn@latest add <component-name>
```

---

## 📂 Repository Structure

```
Stumbl-Assesment/
├── Docs/
│   └── ASSESSMENT.md              # Full task brief — read first!
├── src/
│   ├── app/
│   │   ├── active-signals/
│   │   │   └── page.tsx           # Your main work goes here
│   │   ├── layout.tsx
│   │   └── page.tsx               # Redirects to /active-signals
│   ├── components/
│   │   └── ui/                    # shadcn primitives
│   ├── lib/
│   │   ├── data/
│   │   │   └── signals.ts         # Extend to 12+ signals
│   │   └── utils.ts               # cn() helper (shadcn)
│   └── types/
│       └── signal.ts              # Signal / SignalType / SignalAuthor
├── public/
├── README.md                      # This file
└── package.json
```

---

## ✅ Definition of Done

Before you say "I'm finished", the following must all be true:

- [ ] `npm install && npm run dev` works cleanly
- [ ] `/active-signals` loads without runtime or type errors
- [ ] Mock data extended to **at least 12 varied signals** (all 3 types, multiple locations, varied tags)
- [ ] Signal **type filter** works (`SUPPORT_NEEDED` / `SUPPORT_OFFERED` / `GENERAL` / All)
- [ ] **Search** works across title + description (debounced)
- [ ] Empty state shows when no signals match
- [ ] Layout works on **mobile and desktop** (tested at 375px, 768px, 1280px)
- [ ] At least **3 meaningful git commits** on a `submission/<your-name>` branch
- [ ] `README.md` updated with any assumptions you made or deviations from the brief
- [ ] No `any` types (or justified with a comment)
- [ ] `npm run build` passes with no TypeScript errors

---

## 🧠 How We Evaluate

We care about **how you work**, not just what you produce.

| Area | Weight | What we look for |
|---|---|---|
| AI Collaboration | 30% | Clear prompts, verification, ability to override bad AI suggestions |
| Code Quality | 25% | Type safety, component decomposition, naming, no dead code |
| Product Instinct | 20% | UX polish, empty/loading states, responsive design, a11y |
| Problem Solving | 15% | Reading errors and reasoning, not retrying blindly |
| Git Hygiene | 10% | Commit granularity and message quality |

Full breakdown, stretch goals, and live-interview signals are documented in [`Docs/ASSESSMENT.md`](./Docs/ASSESSMENT.md).

---

## 🙋 Questions?

If something in the brief is ambiguous, **make a reasonable assumption, note it in this README under "Assumptions", and move on**. We want to see your judgement, not a pixel-perfect clone of an imaginary spec.

Good luck — have fun building.
