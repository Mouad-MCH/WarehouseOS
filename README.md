# WarehouseOS

A warehouse management app built with Next.js 14 (App Router), NextAuth, MongoDB/Mongoose, and Zod. Academic project delivered in two sprints.

- **Sprint 1 — done**: authentication (register/login via NextAuth Credentials Provider), JWT sessions, Middleware-protected `/dashboard`, Docker, Vitest, GitHub Actions CI.
- **Sprint 2 — active**: products, categories, and stock movements management, plus a richer dashboard with aggregated stats.

## Tech stack

- **Next.js 14.2.35** (exact, App Router) — do not upgrade to 15/16
- **next-auth 4.24.14** — Credentials Provider, JWT session strategy
- **MongoDB Atlas + Mongoose 9**
- **Zod** for request/form validation
- **bcryptjs** for password hashing
- **Tailwind CSS**
- **Vitest** + Testing Library for unit tests

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env.local` in the project root:

| Variable | Notes |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | generate via `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` in dev |

`.env.local` is only loaded by `next dev` / `next build`, not by plain `node`.

## Scripts

```bash
npm run dev          # start the dev server
npm run build         # production build (also type-checks)
npm run start         # run the production build
npm run lint          # next lint
npm run test          # vitest run
npm run test:watch    # vitest watch mode (local only)
npx tsc --noEmit      # standalone type-check
```

## Project structure

```
src/
  app/
    (auth)/login, (auth)/register        # no shared layout
    (protected)/dashboard                # stats + session info
    (protected)/products                 # list, create, [id], [id]/edit
    api/
      register, auth/[...nextauth]
      products, products/[id], products/[id]/archive
      categories
  components/                            # forms, tables, layout, ui primitives
  lib/                                   # dbConnect, auth config, Zod schemas
  models/                                # Mongoose schemas (server-only)
  types/                                 # client-safe TypeScript interfaces
  services/                              # client-side fetch wrappers around the API routes
  middleware.ts                          # route protection (matcher-based)
```

Route protection is enforced by `middleware.ts` (not client-side guards). Server-only code (`lib/dbConnect.ts`, `lib/auth.ts`, `models/*`) is never imported from a client component; `types/*` stays import-safe for the browser.

## Docker

```bash
docker compose up --build
```

Builds a multi-stage image (Node 20 alpine, standalone output) and runs the app on port 3000, reading env vars from `.env.local`. Uses your MongoDB Atlas instance — no local Mongo container needed.

## Testing

```bash
npm run test
```

Vitest with jsdom; component tests use `@testing-library/react`.

## Current status

Done: auth flow, products CRUD + archive, categories API.
In progress: categories UI, stock movements (record + history), dashboard stats aggregation, GitHub Actions CI.
