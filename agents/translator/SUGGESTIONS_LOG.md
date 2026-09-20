# Translator Suggestions Log — Phil's Financials

One rotating suggestion goes out with each digest email. Status values:
`offered`, `accepted`, `dismissed`, `superseded`.

---

## 2026-09-04 — Initial findings from the cloud-agent diagnosis

**#1 — Close out the 5 stale unmerged agent branches from July**
Status: **partially accepted** — as of 2026-09-07, PRs **#11 and #12 are
merged**; **#8, #9, and #10 are still open** as of 2026-09-20 (no change).
Reminder: #8 and #10 both touch `agents/legal/AUDIT_LOG.md` and may show
merge conflicts against current `main` now that later legal-agent PRs have
merged — expect to resolve a small append conflict when merging those two.

**#2 — Decide a real review cadence, not just "on demand"**
Status: **accepted** — a daily ~9am Cowork scheduled task is now running
this translator agent automatically (confirmed again: this is a scheduled
run, 2026-09-20). No further action needed unless Phil wants to change the
time.

**#3 — One merge decision per week beats reviewing every PC-number**
Status: offered (standing practice, not a one-time action)
The legal/education charters produce detailed item-by-item ledgers
(PC-numbers, item IDs) that are useful for audit trail but slow to read on a
phone. The digest keeps using the 3-line-summary-plus-one-ask format so Phil
never has to open the full AUDIT_LOG.md / WORDING_ENGAGEMENT_LOG.md just to
decide whether to merge a PR.

---

## 2026-09-07 — New suggestion

**#4 — Clear out old stale branches from Phil's Mac occasionally**
Status: **superseded by #6 below** — see 2026-09-20 update. Original note:
today's run had to work around some leftover "in-progress" git files on
Phil's computer inside the Pilot-Demo-App folder (harmless, but they made a
couple of steps trickier than usual).

---

## 2026-09-20 — Status check + two new suggestions

**Checked what Phil acted on since 2026-09-07:** PR #18 (this translator
agent's own setup, open since 2026-09-04) and PRs #19/#20 (education taxes
pass, legal Safe Harbor/NY CDPA research, both opened 2026-09-07) are all
**still open and unmerged** — 2 weeks with no action. That's the main reason
today's passes had to work from a stale July 6 baseline instead of building
on the newer research that's just sitting there.

**#5 — Merge (or explicitly close) old open PRs on a regular cadence**
Status: offered
There are now **11 open PRs** in the repo, several from July. Every week
they stay open, the next agent run risks re-doing research that's already
sitting on a branch (this happened today — the legal and education passes
had to build on July's log instead of September's, because #19/#20 are
unmerged). Suggestion: once a week, spend 5 minutes on GitHub's PR list
either tapping "Merge" or "Close" on each one — even "close, not doing this"
is useful so agents stop re-surfacing it.

**#6 — This time, the leftover files on Phil's Mac were real unfinished
work, not just harmless clutter**
Status: offered (upgraded from #4 — this is now urgent, not just tidy-up)
Suggestion #4 (2026-09-07) described small harmless leftover git files.
Today's run found something different: the main working folder was sitting
on an old branch (`translator-agent/2026-09-04-setup`) with **real,
unsaved feature work** in progress — edited career-page files and a new
"founders-journey" folder — none of it committed or backed up anywhere else.
This run did **not** touch, move, or discard any of it; it worked in a
separate, safe copy instead. But if that computer had a crash or the folder
got deleted, that work would be gone. **Recommended:** next time you're
working in that folder and stepping away for a while, either commit what
you have (even a rough "work in progress" commit) or ask your regular
Claude session to do it for you — either one creates a safety net.

---

## 2026-09-20 — Second run same day (no new digest sent)

This scheduled run fired again on 2026-09-20 at 13:16 UTC, about 8.5 hours
after the morning's run (04:44-04:49 UTC) already did a full legal + education
pass, opened PR #22 (legal) and PR #23 (education), and sent the daily digest
email. Nothing changed in that window — no merges, no new approvals from
Phil, no new commits to `main`. Re-running the research passes now would have
just produced near-duplicate findings on top of #22/#23, and a second digest
email the same day would be noise, so this run skipped both and only added
this note.

**#7 — Check for a duplicate same-day firing before starting a full pass**
Status: offered
If a future run finds a same-day commit already tagged with today's date at
the top of this log (or an already-sent digest email for today's date), skip
straight to verification (has anything changed since that run?) instead of
re-doing the legal/education passes and sending a second email. Only do a
second full pass same day if there's something genuinely new to work from
(e.g. Phil merged a PR or left new instructions).

---

*Next run: check whether Phil acted on offered suggestions above before
adding new ones. Mark accepted/dismissed based on what actually happened, not
what was recommended.*
