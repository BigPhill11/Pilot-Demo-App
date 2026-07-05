# Module Spec — "Fund Your Next Chapter" (SSEPF1b/c: HOPE, FAFSA, paying for after high school)

**Prepared:** 2026-07-05 (Education Agent) · **Status:** DRAFT v0.1 — content spec, doc-only under `agents/education/` (auto-apply eligible). **No `src/` change is made by this spec.** Building the module into the app (registry wiring, new lesson files, boss game, unlock ordering) is **PROPOSE-ONLY / high-risk** and requires Phil's **APPROVED** mark — see §8.

**Why this module, and why first among the gaps.** `GA_STANDARDS_ALIGNMENT.md` §4 lists **SSEPF1b/c** (paying for post–high-school life: HOPE, FAFSA, work-study) as the **#1 uncovered element** — the highest-value gap for Phil's Financials' actual audience. Rationale:
- It is **Georgia-specific** (HOPE/Zell Miller are state programs almost no national curriculum teaches) — a real differentiator in the APS conversation.
- It is **life-critical and time-sensitive** for underserved Atlanta juniors and seniors: students routinely leave state money on the table by missing a GPA line, a FAFSA deadline, or a form they didn't know existed. This is the single lesson most likely to change a First Tee / PAL student's next 12 months.
- It fits the **decision-driven north star** cleanly — every element is a real choice with a visible consequence (which path, which deadline, which GPA threshold, how to close a funding gap).

This module maps to **SSEPF1** as a whole, whose standard text is *"Analyze major life decisions using economics-based decision-making skills (post-HS choices, paying for college/HOPE/FAFSA, major purchases, generational wealth)."* Primary elements: **SSEPF1b** (paying for post-secondary options) and **SSEPF1c** (HOPE/FAFSA/aid mechanics). It also reinforces **SSEPF8c** (education/training investment → future earnings) and **SSEPF1a/1d** (the rational decision model applied to a real life choice), giving the standards record a second STRONG anchor for SSEPF1.

---

## 1. ⚠️ Facts to verify before build (Georgia aid specifics change)

The lesson content below uses Georgia aid mechanics that are **directionally stable but numerically volatile** (award amounts, and occasionally GPA/test thresholds, are set annually). **Before any of this ships to students, verify every bolded figure against the authoritative source and have a counselor/Georgia Tech partner review it.**
- **Authoritative source:** GAfutures.org (Georgia Student Finance Commission) for HOPE / Zell Miller / HOPE Grant / Dual Enrollment; studentaid.gov for FAFSA and federal aid.
- **Figures to re-confirm each year:** HOPE Scholarship HS GPA threshold (currently **3.0**); Zell Miller Scholarship threshold (currently **3.7 GPA + a qualifying SAT/ACT score**); HOPE Grant (technical-college path, entry not GPA-gated but requires a **2.0** to keep); per-credit-hour award amounts; FAFSA opening date and Georgia priority deadlines; whether the SAT/ACT requirement for Zell Miller is active for the target cohort.
- **Design guardrail:** in-app copy should teach the **decision structure and where to check the live number** (GAfutures / a counselor), not hard-code a dollar amount that will be wrong next year. Where a number is essential (the 3.0 GPA line), render it once and pair it with "confirm your year's rules at GAfutures.org." This keeps the module correct-by-construction as programs change.

---

## 2. Module metadata (proposed)

| Field | Value | Notes |
|---|---|---|
| `id` | `fund-your-next-chapter` | |
| `name` | `Fund Your Next Chapter` | Student-facing; avoids the word "college" alone — the module covers technical college, trade paths, work, and 4-year equally |
| `pillar` | `Foundation` | It's a foundational life-decision module |
| `icon` | `🎓` | |
| `level` | `beginner` | Reading level grade 7–9; assumes no prior aid knowledge |
| `description` | `Two students, same grades, same neighborhood. One walks into their next chapter with it paid for — the other pays full price for the exact same thing. The difference is what they knew in time.` | Decision-stakes storefront voice, per WORDING_ENGAGEMENT_LOG Finding 4 |
| `xpReward` / `coinReward` | `600 / 60` | Matches intermediate-tier modules |

**Placement (PROPOSE-ONLY — structure change):** best home is **late in the Foundation arc, after Income and Financial Planning**, so students already understand gross-vs-net pay and goal-setting before they weigh an education-financing decision. It is **not** part of the fixed 8-week curriculum sequence (weeks 1–8 are defined in `CURRICULUM.md`); recommend shipping it as a **companion/"life decisions" module** a facilitator can assign to juniors/seniors, rather than reordering the 8 weeks. Final placement is Phil's call.

---

## 3. Design principles specific to this module

1. **Never shame the path.** Trade school, technical college, the military, apprenticeship, work-then-school, and 4-year are presented as **equally valid economic decisions with different cost/benefit shapes** — not a ladder with "college" on top. This matches SSEPF1's "analyze major life decisions" framing and respects students for whom a 4-year residential path isn't the goal.
2. **Free money before borrowed money.** The throughline: exhaust grants/scholarships you've *already earned* (HOPE via GPA, Pell via FAFSA) before taking on debt. This directly connects to the Credit & Debt module's "productive vs. unproductive debt" framing.
3. **Deadlines are decisions.** The most common way Atlanta students lose aid isn't ineligibility — it's a missed FAFSA window or an un-submitted form. Gameplay must make **"do the paperwork on time"** a visible, rewarded choice, not a footnote.
4. **The GPA is a bank account.** Reframe: every semester of grades is deposits toward the HOPE threshold. This makes an abstract 3.0 feel like a savings streak (ties to the Saving module's consistency mechanic).
5. **Reading level grade 7–9, Atlanta teen frame.** Characters, schools, and stakes drawn from the target students' world (see WORDING_ENGAGEMENT_LOG cultural-relevance findings).

---

## 4. Lesson blueprint (5 lessons, app `Lesson` shape)

Each lesson follows the shipped shape used across `src/data/personal-finance/*/lesson-*.ts`: `moduleOverview` (module intro on lesson 1 only), `realityHook`, `outcomePreview`, `microLesson` (2–4 short paragraphs), `flashcards[]` (term / definition / real teen analogy — NOT a restated example, per WORDING_ENGAGEMENT_LOG Finding 1), `simulatorGame` (decision scenarios with outcomes), `quiz[]` (decision items, not recall — per Finding 3), `powerMove`, `realLifeAction`.

### Lesson 1 — "What Comes After the Stage Walk" (the decision, and its cost shapes)
- **SSEPF:** 1a/1b/1d (decision model applied to post-HS options), reinforces 8c.
- **realityHook:** *"You just walked the stage. Monday, the question stops being 'what's the homework' and starts being 'what's the plan — and who's paying for it.' Four doors are open: a 4-year school, technical college, a trade apprenticeship, or work with school later. Every door costs something different. Some of that cost, you can erase before you ever pay it."*
- **microLesson (skeleton):** Each path has a **price tag** and a **payoff**, and they don't line up the way people assume. A trade apprenticeship can pay *you* while you learn; a 4-year degree costs more upfront but opens different doors; technical college is cheaper and faster for specific careers. The smart move isn't picking the "best" door — it's matching the door to where you want to be, then finding every dollar of aid that door qualifies for. (Ties SSEPF1's cost/benefit to SSEPF8c's education-earnings link without claiming one path is superior.)
- **flashcards:** Post-Secondary Options · Cost of Attendance (tuition + fees + living, not just tuition) · Return on Education (payoff vs. cost, per path) · Aid ("free money you don't repay" vs. loans) · Opportunity Cost of a Path (what you give up by choosing one door — reuses the Saving module's opportunity-cost concept).
  - *Analogy example (Cost of Attendance):* "Cost of attendance is the whole cart at checkout, not just the item on the shelf — tuition is the sticker, but fees, books, and rent all ring up too."
- **simulator ("Four Doors"):** Student is shown 4 paths with rough cost/payoff/time shapes; picks one for a made-up goal ("become an electrician," "become a nurse," "not sure yet"). Consequence feedback rewards **matching path to goal** and flags mismatches (e.g., "4-year debt for a career that a $X technical program trains for") without punishing any path chosen for a fitting reason.
- **quiz (decision items):** e.g., *"Two students both want to be electricians. One takes on 4-year-university debt; the other enrolls in a technical-college program. Who most likely made the stronger money decision, and why?"* (correct: technical path — the cheaper credential matches the career, not "4-year is always worse").
- **powerMove:** "Pick the door by where you're going, not by which one sounds most impressive at graduation."
- **realLifeAction:** "Name one path you're curious about. Write down one thing you'd need to find out about its real cost."

### Lesson 2 — "The 3.0 Bank Account" (HOPE, Zell Miller, and GPA as earned money)
- **SSEPF:** 1c (HOPE mechanics), reinforces 8c and the Saving consistency mechanic.
- **realityHook:** *"Every report card you've ever gotten was a deposit — you just didn't see the account. In Georgia, a **3.0** high-school GPA can unlock the **HOPE Scholarship**: the state helps pay for college. Push to a **3.7** with a qualifying test score and **Zell Miller** can cover even more. The catch nobody tells you: this account has a closing date, and it's your senior year."* *(⚠️ verify 3.0 / 3.7 / test-score rules for the cohort — §1.)*
- **microLesson (skeleton):** HOPE isn't a loan and it isn't need-based — it's **earned by grades**, and Georgia is one of the few states that does this. Treat GPA like a savings streak: a rough semester is a withdrawal, a strong one is a deposit, and the balance at graduation decides the award. Also cover: HOPE has a **college-side requirement** too (you have to keep a GPA in college to keep it) and the **HOPE Grant** path for **technical college** (different rules — generally not GPA-gated to start). Direct students to confirm their year's exact numbers at GAfutures.org.
- **flashcards:** HOPE Scholarship · Zell Miller Scholarship · HOPE Grant (technical-college path) · GPA Threshold · Renewal Requirement (keep-it-in-college).
  - *Analogy example (GPA Threshold):* "The GPA line is like the free-throw line for a bonus — cross it and the reward is automatic; miss it by a hair and you get nothing extra for the same effort. It pays to know exactly where the line is."
- **simulator ("Grade Streak"):** Multi-semester run. Each term, a choice (retake the class that dinged your GPA / take an easier load / push for the AP that weights higher) moves a visible GPA balance toward or past the HOPE/Zell lines, with an award unlocked at graduation. Mirrors the Saving module's streak/consistency feedback.
- **quiz (decision items):** e.g., *"It's the fall of junior year and your GPA is 2.8. What's the highest-value move for your future tuition?"* (correct: a concrete grade-recovery action now, because there's still time to cross 3.0 — teaches urgency + agency, not "you already failed").
- **powerMove:** "Your GPA is the one scholarship you're allowed to work overtime on."
- **realLifeAction:** "Find out your current GPA and how far it is from 3.0 and 3.7. Ask a counselor what would move it."

### Lesson 3 — "The Form That Unlocks the Money" (FAFSA, Pell, work-study, deadlines)
- **SSEPF:** 1c (FAFSA/federal aid + work-study).
- **realityHook:** *"There's one free form that decides whether you get grants you never have to pay back, work-study jobs, and low-cost loans. Miss it and you don't get 'less' — you get nothing, even if you qualified for thousands. It's called the FAFSA, and the students who lose out mostly aren't ineligible. They just didn't file in time."*
- **microLesson (skeleton):** The **FAFSA** is the master key: one application opens **Pell Grants** (free, need-based), **work-study** (a job that fits your class schedule), and federal loans (borrow last, and only what you need). It's **free** — never pay a site that charges to file. It needs a parent/guardian's income info, so start early. **Deadlines** are the whole game: federal, state, and each school can have different ones, and the earliest wins the most aid. (Teaches SSEPF1c's aid mechanics + reinforces the debt-order principle: grants → work-study → loans.)
- **flashcards:** FAFSA · Pell Grant (free, need-based) · Work-Study · Priority Deadline · Grant vs. Loan (don't-repay vs. must-repay).
  - *Analogy example (FAFSA):* "The FAFSA is the one key that opens every door in the money hallway — grants, campus jobs, low-cost loans. Skip cutting the key and every door stays locked, even the ones you had a right to walk through."
- **simulator ("Beat the Clock"):** A calendar-based decision loop — gather documents, file early vs. "I'll do it later," respond to a follow-up request. Filing early and completing steps unlocks more aid; procrastination visibly shrinks the award pool ("the grant money ran out — it's first-come"). Deadlines become the mechanic (design principle 3).
- **quiz (decision items):** e.g., *"A site pops up offering to 'file your FAFSA for a $60 fee, guaranteed fast.' What should you do?"* (correct: leave — FAFSA is always free at studentaid.gov; paying is a red flag). Ties to SSEPF10 scam-awareness.
- **powerMove:** "File the FAFSA the week it opens. Early money is real money; late money is often gone."
- **realLifeAction:** "Find this year's FAFSA opening date and write it on a calendar you'll actually see."

### Lesson 4 — "Closing the Gap" (stacking aid, and borrowing as a last, sized step)
- **SSEPF:** 1b/1c + bridges to SSEPF6 (credit/debt) and SSEPF4 (interest).
- **realityHook:** *"You added it up: HOPE covers part, a Pell Grant covers more, and there's still a gap between the aid and the bill. Now what? This is where good decisions and expensive ones split apart — and where a student loan is a tool, not a trap, if you size it right."*
- **microLesson (skeleton):** Real funding is **stacked**: scholarships + grants + work-study + savings, and only *then* borrowing to close what's left. Borrow the **gap, not the max offered** — the aid letter often dangles more loan than you need. Federal loans generally beat private ones. Connects forward: this is the exact "productive vs. unproductive debt" and interest-cost judgment taught in Credit & Debt and Investing.
- **flashcards:** Aid Stacking · Funding Gap · Federal vs. Private Loan · Borrowing the Gap (not the max) · Net Price (bill − aid).
  - *Analogy example (Borrowing the Gap):* "Borrowing the max offered is like super-sizing a meal you didn't finish — you pay for years for food you never ate. Borrow the gap, not the number they'll let you."
- **simulator ("Build the Package"):** Given a cost of attendance and a set of aid pieces, the student assembles a funding package. Optimal play maximizes free money first and minimizes the loan to exactly the gap; feedback shows the **10-year cost** of over-borrowing so the future weight is visible (reuses the compounding-against-you idea from Credit & Debt lesson 4).
- **quiz (decision items):** e.g., *"Your aid letter offers a $12,000 loan but your gap after grants is $4,000. What's the strongest move?"* (correct: accept only $4,000 — borrowing the gap, not the max).
- **powerMove:** "Free money first, work-study second, and borrow only the gap — never the max."
- **realLifeAction:** "For one school you're curious about, look up its cost of attendance and subtract the aid you might get. That number is the real question."

### Lesson 5 — "Your Money Map" (put it together: a personal plan)
- **SSEPF:** 1a/1b/1d synthesis (the full decision model), reinforces Financial Planning goal-setting.
- **realityHook:** *"You've got the pieces: a path, a GPA target, a form with a deadline, and a way to close the gap. A plan is just those four things written down in order — and it's the difference between hoping it works out and knowing what you're doing next."*
- **microLesson (skeleton):** Synthesize the module into a **4-step personal money map**: (1) pick the path that matches the goal, (2) hit the GPA line for what you've earned, (3) file the FAFSA early, (4) stack aid and borrow only the gap. Frame it as the SSEPF1 decision model applied to their real life. Point to the counselor and GAfutures as ongoing tools, not one-time steps.
- **flashcards:** (lighter — synthesis) Money Map · Priority Deadline (reinforced) · Aid Stack (reinforced) · Your Next Step.
- **simulator ("Your Next Chapter"):** Capstone — student builds their own map by making the four decisions in sequence for a chosen goal; the kingdom/Bamboo Empire shows the "funded next chapter" outcome. Feeds naturally into the boss game.
- **quiz:** short synthesis check, decision-framed.
- **powerMove:** "A plan you wrote down beats a wish you kept in your head."
- **realLifeAction:** "Write your own four-line money map. Show it to one adult who can help you check it."

---

## 5. Boss game — "The Funded Next Chapter" (concept)

A single multi-stage decision run standing in for a senior year, mirroring the shipped boss-game pattern (`src/data/personal-finance/boss-games/`, e.g. *The Credit Architect* "invisible to 780+"):
- **Stakes framing:** *"From 'I hope I can afford it' to 'it's handled.'"*
- **Stages:** (1) choose a path that matches a given goal; (2) survive a multi-semester GPA run to cross the HOPE line; (3) file the FAFSA before a shrinking-aid clock; (4) assemble a funding package that closes the gap with the least debt.
- **Win condition:** next chapter fully funded with minimal/zero unproductive debt; partial credit for a funded-but-over-borrowed outcome (teaches that "funded" isn't the only metric — *how* you funded it matters).
- **Loss/retry framing:** never "you failed" — always "here's the money you left on the table, and here's the move that gets it next run." Matches the non-shaming simulator tone the log flags as a pattern to protect.

---

## 6. Standards alignment this module closes

| Element | Before (per GA_STANDARDS_ALIGNMENT.md) | After this module ships |
|---|---|---|
| SSEPF1b (paying for post-secondary options) | **GAP (#1)** | **STRONG** (L1, L4, boss) |
| SSEPF1c (HOPE / FAFSA / work-study) | **GAP (#1)** | **STRONG** (L2, L3, L4) |
| SSEPF1a/1d (rational decision model for life choices) | PARTIAL (Financial Planning only) | **STRONG** second anchor (L1, L5) |
| SSEPF8c (education/training investment → earnings) | STRONG (Income/Career Income) | reinforced with a financing lens |
| SSEPF6 / SSEPF4 (debt & interest judgment) | STRONG (Credit & Debt) | reinforced (L4 borrow-the-gap) |

This upgrades the single highest-value uncovered element in the standards record and gives SSEPF1 a decision-based home it currently lacks.

## 7. Assessment hooks (for ASSESSMENT_SPEC.md, when instrumentation is approved)

Per-module pre/post blueprint (6+6, decision items, tagged): 2× SSEPF1c (FAFSA-is-free/deadline; grant-vs-loan), 2× SSEPF1b (match-path-to-goal; borrow-the-gap), 1× SSEPF1a (decision model), 1 anchor. Confidence statement (self-efficacy, can-do): *"I can name the steps to pay for what comes after high school without guessing."* Program-level career-aspiration items (ASSESSMENT_SPEC §4) are a natural companion to this module.

## 8. Build path & risk classification

- **Auto-apply (this spec):** this document; future additive `gaStandards: ['SSEPF1b','SSEPF1c',...]` tags once the tag convention lands.
- **PROPOSE-ONLY (needs Phil's APPROVED before any `src/` change):**
  1. New lesson files `src/data/personal-finance/fund-your-next-chapter/lesson-1..5.ts` + `index.ts`.
  2. Registry wiring in `src/data/personal-finance/modules.ts` (new module object, `getModuleById` case, unlock ordering) — **structure change**.
  3. New boss game in `src/data/personal-finance/boss-games/`.
  4. Any unlock-sequence / placement change (§2).
- **Blocked on external verification (must clear before student-facing ship):** all §1 Georgia aid figures verified at GAfutures.org + counselor/Georgia Tech review; confirm the module is positioned as *supplemental*, consistent with the APS positioning in GA_STANDARDS_ALIGNMENT.md §1.

## 9. Open questions for Phil / partners

1. **Placement:** companion "life decisions" module (recommended) vs. inserting into the numbered sequence? (Structure decision — yours.)
2. **Path neutrality:** confirm the trade/technical/military/work-then-school paths get equal weight with 4-year — important for this audience and for not alienating students or families.
3. **Fact-ownership:** who owns keeping the Georgia aid figures current each year (a counselor partner? a GAfutures data check in the facilitator guide)? A module that goes stale on award amounts is worse than none.
4. **First Tee / PAL fit:** should the capstone map connect to any existing First Tee/PAL college-access or mentorship programming so the in-app plan hands off to a real adult?
