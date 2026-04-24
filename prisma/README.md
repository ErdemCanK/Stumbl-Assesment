# Prisma — What You Design Here

This folder is **intentionally empty**. You design and write:

1. **`schema.prisma`** — the database schema
2. **`seed.ts`** — a script that populates the DB with at least 14 signals and 8 referral contacts

## Functional requirements the schema must support

Your schema must make every API endpoint in `Docs/ASSESSMENT.md` implementable without contortions. At minimum you will need to model:

- **Signals** — title, description, `SignalType`, `SignalCategory`, `SignalPriority`, `Visibility`, location, interests, timestamps
- **Authors** — display name, role (`SERVICE_USER` / `PRACTITIONER` / `STUDENT` / `SUPPORTER`), verified flag, optional organisation + avatar. Every signal has an author.
- **Decisions** — a swipe action (`PASS` / `MATCH` / `NETWORK_REFER`) on a signal, by a stub user id, with a timestamp
- **Referrals** — a signal referred to one or more contacts, with an optional note
- **Referral contacts** — a list of people the user can refer signals to (likely a subset of authors or a separate projection)

You decide:

- Which relations are one-to-many vs many-to-many
- Which fields are required vs optional
- Cascade behaviour on delete
- Which indexes to add for the list endpoints (`/api/signals` filters by type, category, priority, full-text on title + description)
- Whether to use Prisma `enum`s or plain strings

The canonical business types are in [`src/types/signal.ts`](../src/types/signal.ts). Use them as the contract, not as a copy-paste template.

## Seed data

Starter content (fixtures you can translate) lives in [`src/lib/data/signals.ts`](../src/lib/data/signals.ts). Feel free to reuse the text, or write your own — either way the seed must produce:

- ≥ **14 signals** — all three `SignalType`s, all three priorities, at least four categories, varied locations and authors
- ≥ **14 authors** with a mix of roles and a mix of verified/unverified
- ≥ **8 referral contacts** across practitioner and supporter roles
- At least one signal matching the **Francis Molloy / HMP Sudbury** example from the reference screenshot

The seed script should be idempotent — `npm run db:seed` must work whether the DB is empty or already seeded (either reset cleanly or upsert).

## Expected commands after you write the files

```bash
npm run db:up        # Postgres container
npm run db:push      # push your schema + runs prisma generate
npm run db:seed      # runs prisma/seed.ts via tsx
npm run db:studio    # optional: browse the DB
```

> **Delete this file when you're done** — or leave a one-line note pointing future readers to `schema.prisma` and `seed.ts`.
