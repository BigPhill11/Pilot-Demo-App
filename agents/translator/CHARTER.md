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

On-demand only. Phil asks for a run whenever he wants one (e.g. "run the
agents", "do a legal pass"). Nothing runs automatically in the background.

## Delivery

- **GitHub**: branch + PR per run, same as before. Requires GitHub push access
  from Phil's linked computer or a repo-scoped access token — see
  `agents/SETUP_API_KEY.md` for the superseded cloud-billing option, and ask
  Claude directly for the current one in use.
- **Email**: one short digest per run, sent via Gmail, format below.

## Digest email format

Subject: `Phil's Financials — <Legal|Education> pass, <date>`

Body:
1. **3-line plain-English digest** — what happened, in normal words, no
   jargon. No PC-numbers, no statute names in the headline (they can appear in
   a one-line "details" mention, not the summary).
2. **One clear ask** — the single highest-priority item awaiting Phil's
   `APPROVED` mark, phrased as a yes/no question with the PR link.
3. **One workflow suggestion** — see `SUGGESTIONS_LOG.md`; rotates each run,
   never repeats a suggestion Phil already acted on or dismissed.

## Files in this folder

| File | Purpose |
|---|---|
| `CHARTER.md` | This file. |
| `SUGGESTIONS_LOG.md` | Running list of workflow-improvement suggestions offered to Phil, with status (offered/accepted/dismissed). |
