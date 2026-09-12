# Phil's Financials

React, TypeScript, Vite, Capacitor, and Supabase application for financial
education. The repository includes the student curriculum, Bamboo Empire,
Ask/Teach Phil, career content, and the teacher classroom dashboard.

## Local setup

Requirements: Node.js 20+ and npm.

```bash
npm ci
cp .env.example .env
npm run dev
```

Fill the two public browser variables in `.env` with the Supabase project URL
and publishable key. Never use the Supabase service-role key in a `VITE_*`
variable; Vite exposes those values to browsers.

The app runs at <http://localhost:8080>. The teacher dashboard can be reviewed
with fixture data during development at
<http://localhost:8080/teach?preview=1>.

## Required checks

```bash
npx tsc --noEmit
npm run lint
npm test
npm run build
```

`package-lock.json` and npm are the canonical dependency source used by CI.

## Supabase

- Project configuration: `supabase/config.toml`
- Database changes: `supabase/migrations/`
- Edge Functions: `supabase/functions/`
- Teacher deployment guide: `docs/teacher-setup.md`

Edge Function credentials belong in Supabase project secrets, not in Git.
The frontend only needs the two values documented in `.env.example`.

## Mobile builds

Capacitor configuration is in `capacitor.config.json`; native projects live in
`ios/` and `android/`. Build web assets before syncing:

```bash
npm run build
npx cap sync
```

Xcode Cloud must define `VITE_SUPABASE_URL` and
`VITE_SUPABASE_PUBLISHABLE_KEY` as environment variables because production
environment files are intentionally not committed.

## Branch handoff

The repository default branch is `main`. Work that has not yet been merged must
be cloned or checked out by its explicit feature branch. Always run `git status`
and `git branch -vv` before beginning a new agent session.
