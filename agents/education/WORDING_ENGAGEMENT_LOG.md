# Wording & Engagement Log

Statuses: OPEN → APPROVED → APPLIED / DECLINED. Under the 2026-07-05 autonomy policy, low-risk copy edits may go straight to **APPLIED (auto)** with a dated diff summary. See `CHARTER.md` for process.

---

## 2026-07-02 — Initial sweep (Income, Saving, Credit & Debt lessons; module registry; career-income test-out)

### Overall reads

- **Reading level runs high for younger teens.** The microLesson blocks are well-written but sit around grade 10–11: long multi-clause sentences, abstract nouns ("friction," "withdrawal cycles," "goal dilution," "intentional spending"). Fine for 17-year-olds; heavy for 13-year-olds at the bottom of the 13–18 band. Target: shorter sentences, concrete subjects, one idea per sentence in the first two paragraphs of every microLesson.
- **Zero Atlanta/culturally-local texture.** A repo-wide search finds no Atlanta, MARTA, or locally grounded references in lesson content (only `company-profiles.ts` mentions Atlanta). Scenarios default to generic adult situations (apartment applications, lawsuits, brokerage accounts). For First Tee/PAL students, hooks grounded in their world — first job at a rec center or Chick-fil-A, MARTA Breeze card reloads, sneaker drops, phone plans, helping with a family bill — would raise relevance at no pedagogical cost.
- **Decision-density is good in simulators, low in lesson bodies.** Every lesson opens with 3–4 paragraphs of prose (moduleOverview + realityHook + microLesson) before the first choice. The realityHooks are the strongest asset — several already end in a decision ("You must decide how to earn more money next month" — exactly right). The weakest pattern is microLessons that lecture conclusions the simulator was about to let students discover.
- **Tone is respectful, non-shaming, optimistic** — consistent with the comic art direction rules in `docs/comic-background-prompts-*.md`. Keep this.

### Finding 1 — `philsAnalogy` fields are inconsistent: some aren't analogies — APPLIED (auto, 2026-07-05)

In the Income module the analogies are genuine and memorable (bike-pedaling metaphor throughout `income/lesson-1-active-income.ts`). In Credit & Debt they're just restated examples, which wastes the field's engagement value.

- **File:** `src/data/personal-finance/credit-debt/lesson-3-credit-scores.ts` (flashcards)
- **Current:** `philsAnalogy: 'A higher score leading to lower interest on a car loan.'` (Credit Score) · `'Always paying the minimum before the due date.'` (Payment History) · `'Applying for several cards within one month.'` (Credit Inquiry)
- **Proposed:** Credit Score → `'Your credit score is like your rep with teachers. Turn work in on time all semester and the sub who's never met you still trusts you — the score speaks before you do.'` · Payment History → `'Payment history is your attendance record. One skipped day gets noticed; showing up every single time is what builds the record.'` · Credit Inquiry → `'Every inquiry is like asking to borrow from several friends in the same week — each one starts wondering why you need it so badly.'`

### Finding 2 — Saving realityHook is abstract where it should be concrete — APPLIED (auto, 2026-07-05)

- **File:** `src/data/personal-finance/saving/lesson-1-why-saving-comes-before-spending.ts`
- **Current:** `Then something unexpected happens. A repair. A fee. A missed shift. You look at your account and realize the saving you planned never actually started. The money was already assigned without you noticing.`
- **Proposed:** `Then something happens. Your phone screen cracks. Your Breeze card needs reloading. Your manager cuts your Saturday shift. You check your account — the saving you planned never actually started. The money spent itself while you weren't looking.`
- **Why:** Same beat, but with objects a 15-year-old in Atlanta owns and rides. "The money spent itself" is also a stickier line than "was already assigned."

### Finding 3 — BATNA quizzed without being earned; adult-jargon test-out item — APPLIED (auto, 2026-07-05)

- **File:** `src/data/personal-finance/modules.ts` (careerIncomeModule testOutQuestions)
- **Current:** `question: 'BATNA stands for:'` with acronym-expansion answer options.
- **Proposed:** `question: 'Before asking for a raise, why does it help to have another real option (another offer, another path)?'` — options testing the *concept* (walk-away power strengthens your ask) rather than acronym recall.
- **Why:** Acronym recall is slide-program thinking — exactly the GIMG failure mode. Test the decision, not the vocabulary. (Same fix pattern applies wherever test-out items quiz terms over choices.)

### Finding 4 — Generic module descriptions undersell the game — APPLIED (auto, 2026-07-05)

- **File:** `src/data/personal-finance/modules.ts`
- **Current:** Income: `'Master the fundamentals of earning money through active and passive income streams.'` · Saving: `'Learn strategies to keep more of what you earn and build your financial cushion.'`
- **Proposed:** Income: `'Get your first paycheck — then find out where the missing money went, and how to earn more without burning out.'` · Saving: `'Build a cash cushion before the kingdom needs it. When trouble hits, you'll be the one who's ready.'`
- **Why:** "Master the fundamentals of…" is textbook voice. Descriptions are the storefront for each week; they should promise a decision or a stake, not a syllabus line.

### Finding 5 — Credit-score hook uses an adult scenario as the *only* frame — APPLIED (auto, 2026-07-05)

- **File:** `src/data/personal-finance/credit-debt/lesson-3-credit-scores.ts`
- **Current:** `Two people apply for the same apartment. One gets approved quickly with a low deposit. The other gets rejected or asked to pay much more upfront...`
- **Proposed (add a teen on-ramp before the apartment beat):** `Two friends turn 18 the same month. One gets approved for a phone plan with no deposit. The other gets told: $400 down. Same phone. Same plan. A year later it happens again with an apartment — approval and a low deposit for one, rejection or a bigger deposit for the other. The difference isn't personality or effort. It's credit history.`
- **Why:** Keeps the strong apartment consequence but lets students see the score touching their life *this year*, not at 25. Decision-driven check: the hook still sets up the simulator's borrow/behave choices.

### Finding 6 — microLesson prose front-loads conclusions the simulator should teach — OPEN (pattern, no single edit)

- **Files:** pattern across `saving/lesson-1-*.ts`, `income/lesson-1-active-income.ts`, `credit-debt/lesson-3-*.ts`
- **Observation:** microLessons state outcomes ("Saving works better when it happens first") that the Saving Order Simulator then demonstrates. For engagement, the stronger order is hook → choice → consequence → *then* the principle as a debrief. 
- **Proposed direction:** In lesson rendering (or a future content revision), move microLesson after the first simulator scenario, or trim microLessons to 2 short paragraphs framed as questions ("What usually kills the plan? Watch what happens to 'leftover' money."). Log kept open as a design decision for Phil rather than a copy edit.

### Finding 7 — Reading-level spot fixes — APPLIED (auto, 2026-07-05)

- **File:** `src/data/personal-finance/saving/lesson-1-why-saving-comes-before-spending.ts` (flashcards)
- **Current:** `Liquidity describes how quickly you can access money without losing value or paying penalties. Highly liquid money keeps problems small because it is available exactly when timing matters most.`
- **Proposed:** `Liquidity means how fast you can get your money when you need it — no penalties, no waiting. Cash you can grab today keeps small problems small.`
- **Why:** Same content, ~grade 7 instead of ~grade 11. Definitions should be the *easiest* text in a lesson, not the densest.

### Positive patterns to protect (do not "fix")

- realityHooks written in second person ending in a decision (`income/lesson-1-active-income.ts`: "You must decide how to earn more money next month.")
- Simulator feedback that respects tradeoffs instead of scolding ("Sometimes rest is valuable too, but the skill opportunity is gone.")
- Boss game stakes framing ("From invisible to 780+"), and the bamboo-flavored touches ("not putting all your bamboo in one basket" in `teacher-curriculum-guide.md`).

### Next sweep queue (2026-07-02)

1. Insurance + Taxes lessons (suspected most adult-skewed: lawsuits, tax-advantaged accounts).
2. Market Intelligence headlines lessons (buy-side/sell-side role framing vs. teen framing) ahead of the Week-8 repackage.
3. Career Readiness copy (email etiquette module: check tone examples land for students with no office exposure).

---

## 2026-07-05 — Autonomy policy adopted; 2026-07-02 low-risk proposals auto-applied

**Policy change:** Phil set a two-tier autonomy policy today (recorded in `CHARTER.md`): low-risk lesson-copy edits in `src/data/` are now AUTO-APPLY with a logged diff summary; component/logic/structure/scoring/auth/data-collection changes remain propose-only. Runs now scheduled 3x daily (~9:20am / ~1:20pm / ~5:20pm ET).

### Applied diffs (all verified in source after editing; TypeScript string syntax preserved, apostrophes escaped where inside single-quoted strings)

1. **Finding 1** — `src/data/personal-finance/credit-debt/lesson-3-credit-scores.ts` (flashcards): replaced 3 non-analogy `philsAnalogy` values (Credit Score, Payment History, Credit Inquiry) with the proposed teen analogies (teacher rep / attendance record / borrowing-from-friends), exactly as logged 2026-07-02. Credit Utilization and Credit Mix analogies left as-is (not in proposal; flagged for a future pass — they are also restated examples).
2. **Finding 2** — `src/data/personal-finance/saving/lesson-1-why-saving-comes-before-spending.ts` (realityHook, template literal): abstract "A repair. A fee. A missed shift." beat replaced with the concrete teen version (cracked phone screen, Breeze card reload, cut Saturday shift, "The money spent itself while you weren't looking."), as proposed.
3. **Finding 3** — `src/data/personal-finance/modules.ts` (careerIncomeModule testOutQuestions): BATNA acronym-recall item replaced with concept item: `'Before asking for a raise, why does it help to have another real option (another offer, another path)?'`; options now test walk-away power (correct: `'A real backup option gives you the confidence to ask and the power to walk away'`, correctIndex 1); distractors are plausible misconceptions (threaten to quit / guaranteed approval / proves loyalty). Question count and object shape unchanged; no scoring logic touched.
4. **Finding 4** — `src/data/personal-finance/modules.ts` (PERSONAL_FINANCE_MODULES): Income and Saving `description` fields replaced with the proposed decision-stakes versions ("Get your first paycheck — …" / "Build a cash cushion before the kingdom needs it. …").
5. **Finding 5** — `src/data/personal-finance/credit-debt/lesson-3-credit-scores.ts` (realityHook): teen on-ramp added ahead of the apartment beat (two friends, phone plan, $400 deposit), as proposed. Minor deviation from proposal text: closing lines rendered as "The difference is not personality or effort. It is credit history." (no contractions) to match the lesson's existing contraction-free voice and avoid escapes in a single-quoted string; meaning identical.
6. **Finding 7** — `src/data/personal-finance/saving/lesson-1-why-saving-comes-before-spending.ts` (Liquidity flashcard definition): grade-11 definition replaced with the proposed ~grade-7 version ("Liquidity means how fast you can get your money when you need it — …").

**Verification:** each edited section re-read after editing; quote characters, escapes, commas, and object shapes confirmed intact. Workspace shell was unavailable this run, so no `tsc` compile check — flagged for the next run to confirm the app builds clean (expected: yes; edits are string-literal-only).

### Still OPEN (high-risk under the new policy — awaiting Phil)

- **Finding 6** (microLesson-after-simulator ordering / trim-to-questions pattern): this is lesson *rendering/structure*, not copy — remains PROPOSE-ONLY. Needs Phil's APPROVED mark before any change.

### New artifacts created this run (auto-apply: new docs under agents/education/)

- **`GA_STANDARDS_ALIGNMENT.md`** (P0 #1) — full mapping of all modules to Georgia GSE Personal Finance and Economics (Course 45.061, SSEPF1–10; SB 220 graduation requirement effective 2024–25), sourced from the official GaDOE standards PDF. Includes coverage grades, 10-item gap list (top gap: SSEPF1b/c — HOPE scholarship/FAFSA content), and a verification queue.
- **`ASSESSMENT_SPEC.md`** (P0 #2, started) — pre/post + confidence assessment design for the Georgia Tech measurement plan; all instrumentation hooks written as PROPOSALS (code logic = high-risk, awaiting Phil).

---

## 2026-07-05 (run 2) — tsc verification of prior edits; Taxes analogy fixes; SSEPF5 verification; HOPE/FAFSA module spec (P0/gap #1)

**Approved items to apply this run:** none. Scanned all logs — no education item carries an **APPROVED** mark. Finding 6 (microLesson/simulator ordering) and every `ASSESSMENT_SPEC.md` instrumentation hook remain PROPOSE-ONLY awaiting Phil. Nothing high-risk applied.

**Build verification (closes the 2026-07-05 run-1 open item):** ran `npx tsc --noEmit --ignoreDeprecations 6.0` (plain `npx tsc --noEmit` errors on a pre-existing `tsconfig.json` `baseUrl` deprecation, TS5101 — unrelated to lesson content). Result: **clean, zero errors** — both before and after this run's edits. The run-1 auto-applied edits (credit-debt lesson-3, saving lesson-1, modules.ts) compile fine, as expected. *(Note for a future run/Phil: the `baseUrl` deprecation in `tsconfig.json` will hard-error under TypeScript 7.0; harmless today but worth a one-line `ignoreDeprecations` fix — flagged, not touched, as it's outside education scope.)*

### Re-audit — Taxes module lessons 1–2 (reading level → cultural relevance → decision framing)

Rotated the sweep to the Taxes module (next in the 2026-07-02 sweep queue; also standards-verification queue item 1). Files read in full: `taxes/lesson-1-understanding-taxes.ts`, `taxes/lesson-2-income-types-taxation.ts`.

- **Reading level:** GOOD. Both lessons already sit ~grade 7–8 — short sentences, concrete subjects, one idea per sentence. No reading-level fixes needed (contrast with the grade-10/11 microLessons flagged in the Income/Saving sweep).
- **Decision framing:** ADEQUATE. Both realityHooks are concrete and lead toward a planning decision; the simulators ("Where Did It Go", "Tax the Income") present real set-aside/plan-net choices with tradeoff feedback. No copy change made; kept as-is.
- **Cultural relevance:** THIN but not wrong — hooks use generic "job or side hustle" framing. Not edited this run (no clearly-better single-line fix that doesn't risk the meaning); logged as a candidate for a future concretize pass (e.g., first W-2 job, reselling/DJ side hustle — the same objects used in the new analogies below).

### Finding 8 — Taxes `philsAnalogy` fields were restated examples, not analogies — APPLIED (auto, 2026-07-05)

Same defect Finding 1 (2026-07-02) fixed in Credit & Debt, and which that entry predicted "applies wherever." All 10 `philsAnalogy` values across Taxes lessons 1–2 were bare restated examples (e.g., Tax → "Part of each paycheck going to support schools, roads, and emergency services."; Wages → "Receiving a paycheck with taxes already taken out."), wasting the field's engagement value.

- **File:** `src/data/personal-finance/taxes/lesson-1-understanding-taxes.ts` (5 flashcards) — replaced Tax / Income Tax / Take Home Pay / Public Services / Tax Planning analogies with real teen mappings (team chipping in for the field & lights; school taking a cut of every fundraiser; the pizza slice left after everyone grabs theirs; shared rec-center Wi-Fi; knowing the dress code before you get dressed).
- **File:** `src/data/personal-finance/taxes/lesson-2-income-types-taxation.ts` (5 flashcards) — replaced Wages / Payroll Taxes / Self Employment Income / Investment Income / Capital Gains analogies (paycheck that arrives pre-cut; paying into a team fund for players who get hurt or age out; getting paid in full with no cut taken → but you still owe it; fruit from a tree you planted, timing changes what you owe; reselling limited sneakers, only the profit is taxed).
- **Verification:** apostrophe in the Public Services analogy escaped (`everyone\'s`) inside its single-quoted string; `npx tsc --noEmit --ignoreDeprecations 6.0` re-run after edits — clean. Object shapes, commas, quotes intact.

### Standards verification — SSEPF5 (Taxes), verified against source

Read lessons 1–2 line-by-line against SSEPF5a/b (see `GA_STANDARDS_ALIGNMENT.md` §3 Taxes row, §4 gap #11, §5 queue item 1 — all updated):
- **SSEPF5a (tax types): downgraded probable-STRONG → PARTIAL.** Income tax, payroll (SS/Medicare), and capital gains are taught; **sales, property, and estate taxes are absent.**
- **SSEPF5b (progressive/regressive/proportional): verified GAP.** No rate-structure or marginal/bracket framing in lessons 1–2. Added to the gap list (#11). A rate-structure lesson or an addition to `taxes/lesson-1` would close both.

### New artifact — `SPEC_FUND_YOUR_NEXT_CHAPTER.md` (P0 deep item this run: standards gap #1, SSEPF1b/c)

Picked the single highest-value open gap — **SSEPF1b/c: HOPE / FAFSA / paying for after high school** (`GA_STANDARDS_ALIGNMENT.md` §4 #1) — and drafted a full decision-driven module spec (doc-only, auto-apply under `agents/education/`):
- 5-lesson blueprint in the shipped `Lesson` shape (realityHook → microLesson → flashcards with real analogies → decision-based simulator → decision-item quiz → powerMove → realLifeAction): (1) path cost/benefit shapes, (2) HOPE/Zell Miller as a "GPA bank account", (3) FAFSA/Pell/work-study/deadlines, (4) stacking aid + borrowing only the gap, (5) personal money-map synthesis; plus boss game "The Funded Next Chapter."
- Georgia-specific and audience-critical (HOPE is state-specific free money underserved Atlanta students routinely miss on a GPA line or a FAFSA deadline). Path-neutral by design (trade / technical / military / work-then-school weighted equally with 4-year).
- **All numeric Georgia aid figures are flagged for GAfutures.org + counselor/Georgia Tech verification before any student-facing ship** (award amounts and thresholds change yearly). Build (new lesson files, registry wiring, boss game, placement) is **PROPOSE-ONLY** — awaiting Phil's APPROVED. Closes SSEPF1b/1c → STRONG and gives SSEPF1a/1d a second anchor when built.

### Still OPEN / PROPOSE-ONLY (unchanged — awaiting Phil's APPROVED)

- **Finding 6** — microLesson-after-simulator ordering / trim-to-questions (rendering/structure).
- **`ASSESSMENT_SPEC.md` P1–P5** — all pre/post instrumentation (type/data-model/component/flow/data-collection changes; P3 also needs a minors-privacy review).
- **`SPEC_FUND_YOUR_NEXT_CHAPTER.md` build** — new module in `src/` (lesson files + `modules.ts` registry wiring + boss game + placement).

### Next sweep queue (2026-07-05, run 2)

1. Concretize the Taxes realityHooks with the teen frame (first W-2 job, reselling/DJ side hustle) — low-risk copy, deferred only for lack of a clean one-line edit this run.
2. Verify `taxes/lesson-3` (deductions/credits) and `taxes/lesson-4` (SSEPF3d tax-advantaged accounts) to finish the Taxes standards row.
3. Draft the SSEPF5b/SSEPF5a-completion lesson spec (progressive/regressive/proportional + sales/property/estate) — the newly-confirmed gap #11.
4. Continue the standards verification queue (credit-debt lesson-2 revolving/installment; insurance lesson-3 scam taxonomy; wealth-fundamentals lesson-1 net worth).
5. Remaining module descriptions in `modules.ts` still in textbook voice (Investing, Insurance, Taxes, Credit & Debt, Career Income) — candidate decision-stakes rewrites, same pattern as Finding 4.
