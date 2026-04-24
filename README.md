# Stumbl — Trainee Technical Assessment

Welcome! This repository is your technical take-home for the **Stumbl App** trainee position.

You will build a vertical slice of Stumbl's **Active Signals** feature:

1. A local **PostgreSQL** store (via Docker)
2. A **Next.js** REST API with **Prisma** and **Zod**
3. An **OpenAPI / Swagger** reference generated from your code
4. A **swipeable card UI** that consumes the API end-to-end

> You are **expected and encouraged** to use AI tools throughout (Claude Code, Cursor, Copilot, ChatGPT — your choice). We evaluate how you **direct** them, not whether you used them.

**Scope:** ~2 working days (~16 hours).
**Full brief:** [`Docs/ASSESSMENT.md`](./Docs/ASSESSMENT.md) — **read this first.**

---

## 🚀 Quick Start

Prerequisites: **Node 20+**, **Docker Desktop** (or any Docker runtime), **git**.

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env

# 3. Start Postgres in Docker
npm run db:up

# 4. Design your Prisma schema (see prisma/README.md), then push it
npm run db:push

# 5. Write prisma/seed.ts, then run it
npm run db:seed

# 6. Start the dev server
npm run dev
```

> `src/lib/db.ts` exports a Prisma client singleton. Its typed model accessors (`db.signal.findMany()`) only become available **after** you write `prisma/schema.prisma` and run `npm run db:push` — that is what triggers `prisma generate`.

Then open:

| URL | What it is |
|---|---|
| http://localhost:3000/active-signals | The UI you are building |
| http://localhost:3000/api-docs | Swagger UI — the API reference you are writing |
| http://localhost:3000/api/docs | Raw OpenAPI 3.0 JSON spec |
| http://localhost:3000/api/health | Example documented endpoint (copy this pattern) |

---

## 📦 What's Pre-configured

| Area | Status |
|---|---|
| Next.js 16, App Router, Turbopack, TypeScript | ✅ |
| Tailwind CSS v4 + shadcn/ui (8 components) | ✅ |
| PostgreSQL 16 via `docker-compose.yml` | ✅ container ready |
| Prisma 6 installed + client singleton at `src/lib/db.ts` | ✅ — **you write `schema.prisma` + `seed.ts`** |
| Zod + next-swagger-doc + swagger-ui-react | ✅ installed |
| `/api-docs` UI wired to `/api/docs` | ✅ |
| Example documented endpoint `GET /api/health` | ✅ pattern to copy |
| Starter types in [`src/types/signal.ts`](./src/types/signal.ts) | ✅ (use Prisma types where possible) |
| Development Report template | [`Docs/DEVELOPMENT_REPORT.md`](./Docs/DEVELOPMENT_REPORT.md) |

---

## 🧰 npm Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:up` | Start Postgres container |
| `npm run db:down` | Stop Postgres container |
| `npm run db:push` | Push Prisma schema to the DB (no migrations) |
| `npm run db:migrate` | Create/apply a Prisma migration |
| `npm run db:seed` | Seed the DB with 14 signals + 8 contacts |
| `npm run db:reset` | Drop, recreate, re-seed |
| `npm run db:studio` | Open Prisma Studio GUI |

---

## 📂 Repository Layout

```
Stumbl-Assesment/
├── Docs/
│   ├── ASSESSMENT.md              # Full brief — read first
│   ├── DEVELOPMENT_REPORT.md      # Fill in at the end
│   └── screenshots/
├── prisma/
│   ├── README.md                  # What you must build here
│   ├── schema.prisma              # ← YOU write this
│   └── seed.ts                    # ← YOU write this (npm run db:seed)
├── src/
│   ├── app/
│   │   ├── active-signals/        # Your main UI work goes here
│   │   ├── api-docs/              # Swagger UI (don't need to edit)
│   │   └── api/
│   │       ├── docs/              # Serves OpenAPI JSON (don't edit)
│   │       └── health/            # Example — copy its pattern
│   ├── components/ui/             # shadcn primitives
│   ├── lib/
│   │   ├── db.ts                  # Prisma client singleton
│   │   ├── swagger.ts             # OpenAPI generator config
│   │   ├── data/signals.ts        # Starter in-memory fixtures (optional)
│   │   └── utils.ts               # cn() helper
│   └── types/signal.ts            # Frontend-facing types (mirror Prisma)
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

---

## ✅ Definition of Done (summary)

Full checklist in [`Docs/ASSESSMENT.md`](./Docs/ASSESSMENT.md). Headlines:

- [ ] `prisma/schema.prisma` designed and pushed
- [ ] `prisma/seed.ts` produces ≥ 14 signals + 14 authors + 8 referral contacts, idempotent
- [ ] All 6 API endpoints implemented, Zod-validated, Swagger-documented
- [ ] `/api-docs` renders every endpoint correctly
- [ ] `/active-signals` fetches from the API (no hard-coded data)
- [ ] Swipe + tap + keyboard all work
- [ ] Network / Refer modal works end-to-end
- [ ] Loading + error states everywhere
- [ ] `npm run build` passes
- [ ] At least **6 meaningful commits** on `submission/<your-name>`
- [ ] `Docs/DEVELOPMENT_REPORT.md` filled in

---

## 🧠 How We Evaluate

| Area | Weight |
|---|---|
| AI Collaboration (+ Development Report) | 30% |
| Backend Quality | 25% |
| Frontend Quality | 20% |
| Code Quality | 15% |
| Git Hygiene | 10% |

---

## 🙋 Stuck?

If something in the brief is ambiguous: **make a reasonable assumption, note it in this README under "Assumptions", and keep moving**. We want to see your judgement.

If the starter itself is broken on a clean clone, stop and flag it — that's a bug, not the assignment.

Good luck — have fun building.

---

## 📝 Candidate Notes

Replace this section with anything you want us to know. Common things to put here:

### Assumptions
- …

### Deviations from the brief
- …

### Known issues / incomplete
- …
