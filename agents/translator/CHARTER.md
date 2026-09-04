# Translator Agent Charter — Phil's Financials

> Added 2026-09-04, replacing the 3x/day cloud-scheduled runs for the Legal and
> Education agents with an on-demand model run from Phil's own Claude session
> (no separate Anthropic API billing).

## Why this exists

From July–September 2026, the Legal and Education agents ran on a 3x/day GitHub
Actions schedule using a separate `ANTHROPIC_API_KEY` secret. That key was never
correctly billed/configured, so nearly every scheduled run (~360 total) failed
silently within 30-60 seconds, before doing any real work. Only two runs
(2026-07-05 and 2026-07-06) ever produced real output, and none of that output
was ever merged to `main` — it sat on unmerged branches. Phil does not want to
pay for a separate API key, so the cloud schedule is now turned off
(`.github/workflows/legal-agent.yml` / `education-agent.yml` keep
`workflow_dispatch` only).

## Mission

Phil talks to one agent (his regular Claude session). That agent is the
**translator**: on request, it runs the Legal agent's and/or Education agent's
standing charter itself (reading `agents/legal/` and `agents/education/`
exactly as the old cloud workflows did), then:

1. Does the actual work (research, drafting, low-risk auto-applies) the same
   way the original charters describe.
2. Commits to a `legal-agent/<date>-<slug>` or `education-agent/<date>-<slug>`
   branch and opens a PR, same format as before ("## Changed" / "## Needs
   approval" / "## Blocked on Phil").
3. Translates the run's own output into a short plain-English digest (no
   legal/education jargon) and emails it to Phil, with one clear yes/no ask.
4. Adds or updates one workflow-improvement suggestion in
   `SUGGESTIONS_LOG.md` below, and tracks whether Phil acted on the last one.
5. Verifies the branch and PR actually exist on GitHub (not just that the push
   command returned success) before telling Phil it's done.

## Autonomy

The translator does not change the Legal/Education autonomy policies in their
own charters (`agents/legal/CHARTER.md`, `agents/education/CHARTER.md`) — it
just runs them on a different schedule (on-demand instead of cron) and through
a different execution path (Phil's Claude session instead of a paid API key).

## Schedule

**Daily, ~9:00 AM America/New_York** (set by Phil, 2026-09-04), via a Cowork
scheduled task — not GitHub Actions, no separate billing. Phil can also
ask for an extra ad-hoc run any time ("run the agents now"). Each scheduled
firing is a brand-new session with no memory of prior runs, so it must:
1. Re-link to Phil's computer / request access to `~/Projects/Pilot-Demo-App`.
2. Read this charter plus `agents/legal/CHARTER.md` and
   `agents/education/CHARTER.md` fresh (they carry all standing context).
3. Do one pass per agent, push the branch/PR, verify it landed, send the
   digest email, update `SUGGESTIONS_LOG.md`.
Note: cron is UTC; 9:00 AM ET is 13:00 UTC on EDT (roughly Mar–Nov) and
14:00 UTC on EST — check the current offset when adjusting the trigger.

## Delivery

- **GitHub**: branch + PR per run, same as before. Push access comes from a
  repo-scoped GitHub token already saved in `git remote` config inside
  `~/Projects/Pilot-Demo-App` on Phil's linked Mac — no need to re-collect a
  token unless that config is gone. (The `agents/SETUP_API_KEY.md` doc
  describes the old, retired cloud-billing option — superseded.)
- **Email**: one HTML digest per day, sent via Gmail to phillipghead@gmail.com,
  format below.

## Digest email format (HTML, not plain text)

Subject: `Phil's Financials — daily digest, <date>`

Design goals Phil asked for directly: pleasant to read (not a wall of text),
and fast to act on — read the changes, then approve, in as few taps as
possible. Concretely:

1. **Header** — date, one-line status ("2 passes ran, 1 needs your OK").
2. **Per agent, a compact card** (not prose paragraphs):
   - 2-3 line plain-English summary of what changed. No PC-numbers, no
     statute names, no jargon in this part.
   - A bulleted list of the actual file/content changes in plain terms
     (e.g. "Rewrote the credit-score lesson's opening example" not "Finding
     5 applied to lesson-3-credit-scores.ts").
   - One prominent button/link: **"Review & Merge →"** linking straight to
     the PR's GitHub page (one more tap there merges it — Phil's phone
     already has GitHub app notifications set up).
3. **One workflow suggestion** at the bottom — see `SUGGESTIONS_LOG.md`;
   rotates each day, never repeats a suggestion Phil already acted on or
   dismissed.

Keep total length short enough to read in full on a phone without scrolling
past 1-2 screens. Use simple inline-styled HTML (tables/divs with inline
`style=`, no external CSS) so it renders consistently in Gmail's app.

## Files in this folder

| File | Purpose |
|---|---|
| `CHARTER.md` | This file. |
| `SUGGESTIONS_LOG.md` | Running list of workflow-improvement suggestions offered to Phil, with status (offered/accepted/dismissed). |
