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

## 2026-07-06 — Standards verification pass (P0 #1); taxes analogy fixes; re-audit of 6 lessons

**Run scope:** No items were marked APPROVED in the logs, so nothing from the approval queue was applied this run. Verified the 2026-07-05 auto-applied edits are all present in source (they shipped in commit `89297a5`): saving `lesson-1` realityHook (Breeze card / "the money spent itself", line 18), credit-debt `lesson-3` teen on-ramp + 3 analogies, `modules.ts` Income/Saving descriptions + BATNA→concept test-out item. All intact.

### TypeScript check (step 2)
`npx tsc --noEmit -p tsconfig.app.json`: **73 pre-existing errors project-wide, 21 under `src/data/`, but 0 under `src/data/personal-finance/`.** All education-agent lesson content compiles clean, including this run's taxes edits (re-ran after editing: still 0 in `personal-finance/`). The pre-existing errors live in `economics-simulators/`, `economics-units/`, `market-intelligence/`, `flashcards/*.test.ts`, and three career-readiness *component* files — none are lesson copy and none were touched by any education-agent edit. Flagged for Phil/the app owner (out of education-agent scope — component/type logic is high-risk); see "Blocked on Phil."

### Deep item this run — cleared the GA_STANDARDS_ALIGNMENT.md verification queue (P0 #1)

Read all six queued lessons in full and updated the §3 mappings + §4 gap list + §5 queue in place. Net finding: **the 2026-07-05 "probable" grades were optimistic.** Five elements moved *down*, one *up*:

| Element | Was | Now (verified 2026-07-06) | Why |
|---|---|---|---|
| SSEPF2f (net worth) | probable | **STRONG** ↑ | `wealth-fundamentals/lesson-1`: net worth taught in microLesson, Asset/Liability flashcards, quiz item 1, powerMove |
| SSEPF5a (tax types) | probable-STRONG | **PARTIAL** ↓ | `taxes/lesson-1/2`: income/payroll/capital-gains only; sales/property/estate named once, never taught |
| SSEPF5b (progressivity) | probable | **GAP** ↓ | zero progressive/regressive/proportional/marginal/bracket matches across the whole taxes module |
| SSEPF6d (revolving vs. installment) | probable | **GAP** ↓ | `credit-debt/lesson-2` frames productive/consumptive + high/low-interest, not revolving/installment |
| SSEPF10d (investment scams) | probable-PARTIAL | **GAP** ↓ | `insurance/lesson-3` covers consumer/phishing scams richly, but no Ponzi/pump-and-dump/investment framing |
| SSEPF1e (generational wealth) | probable-STRONG | **PARTIAL** ↓ | `wealth-fundamentals/lesson-1` teaches ownership vs. income, no generational-transfer/inheritance content |
| SSEPF8b (social-media footprint) | PARTIAL-probable | **GAP** ↓ | `career-readiness/modules.ts` Personal Brand is a stub (learningPoints only), no footprint-as-liability content |

Gap list in `GA_STANDARDS_ALIGNMENT.md` §4 expanded with SSEPF5b, SSEPF6d, and SSEPF5a-completion as newly-confirmed gaps.

### Finding 8 — Taxes `philsAnalogy` fields are restated examples, not analogies — APPLIED (auto, 2026-07-06)

Same pattern Phil approved fixing in Finding 1 (credit-debt). In `src/data/personal-finance/taxes/lesson-1-understanding-taxes.ts` all five `philsAnalogy` values were bare restated examples ("Seeing federal and state taxes taken out of a paycheck."). Replaced with genuine analogies:

- **Tax** → cookout everyone chips in for (you pay in so the whole thing runs, even parts you don't touch).
- **Income Tax** → "a slice taken off the top of the money you earn before it ever reaches your hand" (accurate to withholding — deducted from earnings, not added at purchase).
- **Take Home Pay** → "the final score, not the halftime score" (gross = halftime; take-home = after taxes/deductions).
- **Public Services** → lights and Wi-Fi at the rec center (everyone chips in so they're on when any one person needs them).
- **Tax Planning** → knowing which routes have tolls before you leave (same destination, all legal, keep more money).

Voice matches the module's contraction-light style; string-literal only, no escapes; tsc re-checked clean.

### Re-audit findings on the six lessons read (reading level / cultural relevance / decision framing)

- **Finding 9 — Taxes module quizzes are recall-flavored (GIMG failure mode) — OPEN (proposal).** Both `taxes/lesson-1` and `lesson-2` quizzes test term recall via fill-in stems ("Taxes reduce income because:", "Income tax applies to:", "Capital gains apply when:") rather than a decision. Per Finding 3 and `ASSESSMENT_SPEC.md` §1.4, these should become short scenario/decision items (keeping option count + correctIndex shape). Rewriting quiz *copy* is auto-apply-eligible, but doing it well across two lessons is a focused pass — proposed as its own next-run task rather than rushed here. Note: the taxes *simulators* are good and decision-driven (lesson-1 "plan on net vs gross", lesson-2 "set aside 30%").
- **Finding 10 — Taxes module has zero Atlanta/teen texture — OPEN (proposal).** Unlike Saving/Credit (now carrying Breeze card, phone-plan, rec-center hooks), both taxes realityHooks default to a generic "a job or side hustle." Proposed: ground lesson-1's hook in a first rec-center/retail paycheck where take-home ≠ the offer-letter number, and lesson-2's in a concrete teen mix (W-2 shift + reselling sneakers/tutoring cash + a first brokerage app). Low-risk copy; deferred to the same taxes-focused pass as Finding 9.
- **Protect (do not "fix"):** `wealth-fundamentals/lesson-1` has the strongest `philsAnalogy` set in the app (bamboo forest / pond / seeds-into-trees) — genuine, memorable, on-theme. `credit-debt/lesson-2` and `insurance/lesson-3` simulators are model decision-driven design (real tradeoffs, non-shaming feedback) — hold them up as the template.

### Proposals awaiting Phil's APPROVED (high-risk)

- **STD-TAG-1 (PROPOSE-ONLY) — add `gaStandards?: string[]` to the `Lesson` (and `PersonalFinanceModule`) interface in `src/types/personal-finance.ts`** so per-lesson standards tags can be applied. Verified this run that the type has no such field and no index signature, so tagging lesson objects today would fail the type-check. The tag *values* are ready (from the verified §3 mapping); only the optional-field type change (high-risk, touches `src/types/`) blocks applying them. Additive/optional → existing content still compiles.
- **Finding 6** (microLesson-after-simulator ordering) — still OPEN from 2026-07-02; unchanged.

### Next sweep queue (2026-07-06)
1. Taxes-focused copy pass: apply Findings 9 (quiz→decision) and 10 (Atlanta/teen hooks) across `taxes/lesson-1/2` (auto-apply copy).
2. Read `wealth-fundamentals/lesson-3-risk-life-stages.ts` (SSEPF1e legacy check) and `taxes/lesson-3/4/5` + boss (residual SSEPF5 check) to close the two remaining §5 verification items.
3. Draft the Week-1 (Income) 6+6 pre/post item blueprint in `ASSESSMENT_SPEC.md` v0.2 (doc-only, auto-apply) — the next P0 #2 step.
