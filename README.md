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

Full requirements, evaluation criteria, and data shape are in [`Docs/ASSESSMENT.md`](./Docs/ASSESSMENT.md).

---

## ⏱ Time & Format

| Item | Detail |
|---|---|
| **Duration** | 90–120 minutes |
| **Format** | Live screen-share with the hiring team |
| **AI tools** | Allowed and encouraged (any tool you prefer) |
| **Stack** | Next.js 15+ App Router, TypeScript, Tailwind CSS, shadcn/ui |
| **Deliverable** | Push your code to your own fork / branch of this repo |

---

## 🚀 Getting Started

This repository is intentionally empty. You will bootstrap the project yourself — that is part of the assessment.

Suggested first steps:

```bash
# 1. Create the Next.js project in this directory
npx create-next-app@latest . --typescript --tailwind --app --eslint

# 2. Initialise shadcn/ui
npx shadcn@latest init

# 3. Install components as you need them
npx shadcn@latest add card badge input tabs

# 4. Start the dev server
npm run dev
```

Read [`Docs/ASSESSMENT.md`](./Docs/ASSESSMENT.md) **before** you start typing.

---

## 📂 Repository Structure (expected at the end)

```
Stumbl-Assesment/
├── Docs/
│   └── ASSESSMENT.md          # Full task brief (read first!)
├── src/
│   ├── app/
│   │   └── active-signals/
│   │       └── page.tsx       # Main feed page
│   ├── components/            # Your reusable UI pieces
│   ├── lib/                   # Utilities, types, mock data
│   └── types/                 # Shared TypeScript types
├── public/
├── README.md                  # This file
└── package.json
```

---

## ✅ Definition of Done

Before you say "I'm finished", the following must be true:

- [ ] `npm install && npm run dev` works on a clean clone
- [ ] `/active-signals` loads without runtime or type errors
- [ ] At least **12 varied mock signals** exist in your data set
- [ ] Signal **type filter** works (SUPPORT_NEEDED / SUPPORT_OFFERED / GENERAL)
- [ ] **Search** works across title + description
- [ ] Empty state shows when no signals match
- [ ] Layout works on **mobile and desktop**
- [ ] At least **3 meaningful git commits**
- [ ] `README.md` updated with setup and run instructions for your implementation
- [ ] No `any` types (unless clearly justified with a comment)

---

## 🧠 How We Evaluate

We care about **how you work**, not just what you produce.

| Area | Weight | What we look for |
|---|---|---|
| AI Collaboration | 30% | Clear prompts, verification, ability to override bad AI suggestions |
| Code Quality | 25% | Type safety, component decomposition, naming, no dead code |
| Product Instinct | 20% | UX polish, empty/loading states, responsive design, a11y |
| Problem Solving | 15% | How you debug; reading errors vs. retrying blindly |
| Git Hygiene | 10% | Commit granularity and message quality |

Full breakdown and live-interview signals are documented in [`Docs/ASSESSMENT.md`](./Docs/ASSESSMENT.md).

---

## 🙋 Questions?

If something in the brief is ambiguous, **make a reasonable assumption, note it in your README, and move on**. We want to see your judgement, not a pixel-perfect clone of an imaginary spec.

Good luck — have fun building.
