# AGENTS.md

## Cursor Cloud specific instructions

Phil's Financials is a single Vite + React + TypeScript app (web SPA, also wrapped
for iOS/Android via Capacitor) backed by a **hosted Supabase** project (Postgres +
Auth + Storage + Edge Functions). There is no local backend to run for normal
development — the app talks directly to the hosted Supabase project configured in
`.env` / `.env.production`.

### Services & standard commands

Commands are defined in `package.json` `scripts` — use those as the source of truth:

- Dev server: `npm run dev` → Vite on port **8080** (`vite.config.ts`, host `::`).
- Lint: `npm run lint` (ESLint). The codebase currently has many pre-existing
  lint errors/warnings; a non-zero exit is expected and is not caused by env setup.
- Tests: `npm test` (Vitest, jsdom). Fast unit tests under `src/**/*.test.ts(x)`.
- Build: `npm run build` (prod) / `npm run build:dev` (development mode).

### Non-obvious gotchas

- **Dev env vars:** Vite only auto-loads `.env.production` in production builds. For
  `npm run dev` to reach Supabase you need a `.env` file (gitignored) with
  `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. The startup/update script
  creates `.env` from the committed `.env.production` (public anon keys) if missing.
  Without it, `import.meta.env.VITE_SUPABASE_URL` is undefined and Supabase calls fail.
- **Everything is behind auth:** all routes except `/privacy` and `/terms` sit behind a
  full-screen onboarding auth gate (`OnboardingAuthGate`). To exercise any core feature
  you must sign in or sign up.
- **Sign-up needs an access code:** account creation requires a valid, admin-issued
  access code (table `public.access_codes`, validated by the `check_access_code` RPC and
  enforced server-side by the `handle_new_user` trigger). Codes live only in the hosted
  DB and are not in the repo. Completing an authenticated end-to-end flow requires either
  a valid access code or existing test-account credentials (provide via secrets).
- **Local Supabase does not reset cleanly:** `npx supabase start` / `db reset` fails
  applying migration `20250905045819_*` because it references `public.user_social_stats`
  before that table exists (the hosted schema was changed outside the migration chain).
  The stripped-down `supabase/config.toml` (no `[db]`/`[auth]`/`[api]`) confirms local
  Supabase is not the supported workflow — develop against the hosted project instead.
  Do not "fix" migrations as part of environment setup.
- **Edge Functions** (`supabase/functions/*`, e.g. AskPhil/TeachPhil market data) are
  optional and each need third-party API keys (Gemini, FMP, etc.) plus an authenticated
  Supabase session (`verify_jwt = true`). Not required for core web development.
