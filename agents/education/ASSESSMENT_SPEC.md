# Assessment Spec — Pre/Post Knowledge + Confidence Measurement (Georgia Tech partnership)

**Prepared:** 2026-07-05 (Education Agent) · **Updated:** 2026-09-26 (v0.2 — Week 1 item blueprint, §7) · **Status:** DRAFT v0.2 — design spec + first item blueprint drafted; instrumentation items in §5 are **PROPOSALS ONLY** (code/data-collection = high-risk under the 2026-07-05 autonomy policy; nothing here is applied to source).
**Goal:** make the curriculum's assessment framework (CURRICULUM.md §Assessment) real: per-module knowledge gain, confidence (self-efficacy) change, time-per-lesson engagement, and completion-rate reporting against the 70% target.

## 1. Design principles

1. **Measure without breaking the game.** Assessments must feel like part of Bamboo Empire (a "scouting report" before the week, a "kingdom census" after), not a bolted-on school test. Max 3–4 minutes per instrument.
2. **Pre and post must be comparable but not identical.** Same construct, same difficulty, different surface details (parallel forms) — otherwise post-test gain measures memory of the pre-test.
3. **Distinct from the existing test-out quiz.** Test-out (85% skip threshold in `modules.ts`) is a *placement* instrument with stakes; pre/post is a *measurement* instrument and must be no-stakes (no XP/coins for correctness — completion rewards only) so students don't grind or cheat it.
4. **Decision-based items, not recall items.** Per the GIMG lesson and Finding 3 in `WORDING_ENGAGEMENT_LOG.md`: items present a scenario and ask what to *do*, not what a term stands for. This also aligns with how the SSEPF elements are written ("evaluate," "analyze," "apply").
5. **Reading level grade 7–9**, scenario characters and stakes matching the Atlanta teen frame used in lesson copy.

## 2. Per-module pre/post knowledge instrument

- **Form:** 6 items per module (pre) + 6 parallel items (post). 4-option multiple choice, one best answer. Two anchor items (identical pre/post, buried mid-sequence) to check form equivalence.
- **Blueprint per module (maps to GA_STANDARDS_ALIGNMENT.md):** each item tagged with the SSEPF element it measures, e.g. Credit module: 2 items SSEPF6b (score components), 1 item SSEPF6a, 1 item SSEPF6d, 1 item SSEPF4b, 1 anchor. Blueprint tables per module to be drafted in v0.2 after the standards verification queue clears.
- **Item template:**
  - *Scenario stem* (2–3 sentences, second person, concrete): "Your first paycheck from your rec-center job is $118, not the $150 you expected."
  - *Decision question*: "What most likely explains the difference?" / "What should you check first?"
  - *Options*: 1 correct decision, 2 plausible misconceptions (drawn from real distractor patterns — e.g., "the employer made an error," "taxes only apply to adults"), 1 clearly-weaker option.
- **Timing:** pre at module unlock (before realityHook of lesson 1); post after boss game completion. Test-out students still take the pre (it doubles as a covariate for the skip decision's validity).
- **Scoring:** simple proportion correct; gain = post − pre; report per-element so Georgia Tech can localize which SSEPF elements the game moves.

## 3. Confidence self-assessment (self-efficacy)

- **Form:** 4 statements per module, 5-point scale (Not at all sure → Totally sure), administered with the pre and again with the post. Same statements both times (self-report needs identical wording to compare).
- **Statement template (can-do framing, module-specific):**
  - Income: "I can read a paystub and explain where the missing money went."
  - Saving: "I can build a plan that saves money before I get the chance to spend it."
  - Credit: "I can explain what makes a credit score go up or down."
  - Investing: "I can explain why someone shouldn't panic-sell when prices drop."
- **Scale anchors in student voice** (not "Strongly agree"): `Not yet / A little / Halfway / Mostly / I could teach it`.
- **Metric:** mean shift pre→post; flag the known "confidence up, knowledge flat" overconfidence pattern by crossing the two instruments.

## 4. Engagement and completion metrics (ride-along)

- Time-per-lesson (open → complete, idle-capped), time-per-simulator-scenario, boss-game attempts, module completion timestamps → weekly completion-rate vs. the 70% target, per cohort (First Tee / PAL / APS).
- Career-aspiration tracker (curriculum requirement): 1 open question + 1 categorical item at program start/end — belongs in program-level pre/post, not per-module.

## 5. Instrumentation hooks the app needs — ALL PROPOSE-ONLY (awaiting Phil's APPROVED)

| # | Proposal | Touches | Risk notes |
|---|---|---|---|
| P1 | Extend the `Lesson`/module data model with optional `preAssessment`, `postAssessment`, `confidenceItems` arrays (same shape as existing `quiz` items + a `ssepfTag` field) | `src/types/personal-finance.ts`, `src/data/personal-finance/modules.ts` | Type change; additive/optional so existing content compiles |
| P2 | Assessment runner component: no-stakes presentation (no correct-answer reveal on pre; debrief allowed on post), completion-only rewards | new `src/components/` | New component + reward logic |
| P3 | Response + timing event capture: `{studentId(pseudonymous), moduleId, instrument, itemId, ssepfTag, response, correct, msElapsed, timestamp}` persisted locally and/or synced | storage/analytics layer | **Data collection — explicitly high-risk; also needs a minors-privacy review (COPPA/FERPA/APS data agreements) before any sync off-device. Recommend pseudonymous IDs and no PII in the event schema.** |
| P4 | Gate module start on pre-instrument completion; surface post-instrument after boss game | module flow logic | Ordering/flow change |
| P5 | Facilitator/exporter view: per-cohort CSV export of gains, confidence shifts, time, completion for Georgia Tech | new view | Read-only over P3 data |

## 6. Open questions for Phil / Georgia Tech

1. Does Georgia Tech want validated item pools (e.g., adapting Council for Economic Education / NGPF item banks) or bespoke items reviewed by their team? (Affects §2 drafting.)
2. Consent + data governance: who is the data controller for minors' assessment data across First Tee / PAL / APS contexts?
3. Program-level (week 0 / week 8) instrument in addition to per-module? Recommended: yes — 20-item cross-module form + career-aspiration items.
4. Is offline-first capture required (rec-center Wi-Fi reality)?

## 7. Week 1 (Income) 6+6 item blueprint — v0.2 draft (2026-09-26)

Pilot pair for the pre/post instrument described in §2. Grounded in the actual Week-1
content: `income/lesson-1-active-income.ts` (hours vs. hourly-value levers, skill premium)
and `lessons/lesson-2-controlling-pay.ts` through `lesson-5-launchpad.ts` (gross vs. net
pay, negotiation timing, energy/burnout, using a paycheck as a launchpad). Tagged to
SSEPF2a (income types — hourly wages), SSEPF2c (paystub: gross/net/deductions), and
SSEPF8c (skills/education investment → future earnings) per `GA_STANDARDS_ALIGNMENT.md`.
Two anchor items (5 and 6) are worded identically pre/post to check form equivalence, per
§1 design principle 2.

Doc-only draft — item *text* is auto-apply eligible here in `agents/education/`; wiring
these into the app (the `preAssessment`/`postAssessment` data-model fields, the runner
component, and event capture) all remain PROPOSE-ONLY per proposals P1–P4 in §5, awaiting
Phil's APPROVED mark. No `src/` file is touched by this entry.

### Pre-instrument (administered before Lesson 1's realityHook)

| # | SSEPF tag | Scenario stem | Question | Correct | Distractors (plausible misconceptions) |
|---|---|---|---|---|---|
| 1 | SSEPF2a | You see a job posting for a rec-center shift paying "$12/hr" and another for a lawn-care gig paying "$60/lawn, about 3 lawns a day." | Which piece of information do you need before you can compare the two as hourly pay? | How long each lawn actually takes | Which job started hiring first | Which job has a nicer uniform | Which job is closer to the bus line |
| 2 | SSEPF2a | Your friend says he "makes more money" than you because he works 20 hours a week at $10/hr, while you work 10 hours a week at $18/hr. | Who actually earns more per hour, and why does that matter? | You do — hourly value, not just hours worked, drives what a raise or a better job is worth | Your friend does, because his paycheck total is bigger | They're equal because you both "work hard" | Neither — only total weekly pay matters, not the rate |
| 3 | SSEPF2c | Your offer letter says $12/hour, 15 hours a week. Your first paycheck for those 15 hours is less than $180. | What is the most likely reason the check is smaller than hours × rate? | Taxes and other payroll deductions were taken out before you got paid | The employer made a math error | Part-time workers are paid a lower rate than the offer letter states | Tips are supposed to make up the difference |
| 4 | SSEPF2c | Two students both worked 10 hours this week at the same $13/hr job. One says "I got paid $130," the other says "I only got $109." | What term describes the $130 number, and what term describes the $109 number? | $130 is gross pay; $109 is net (take-home) pay | Both numbers are gross pay, just rounded differently | $130 is net pay; $109 is gross pay | The difference means one of them worked overtime |
| 5 (anchor) | SSEPF8c | Two workers do the same job for the same number of hours, but one earns more per hour than the other. | What is the most likely reason for the pay difference, according to what you've learned? | The higher-paid worker's skills solve a more valuable or harder problem | The higher-paid worker has worked there longer, no matter what | Pay differences like this are always unfair and never explained by skill | It's random — pay rates don't actually depend on what you can do |
| 6 (anchor) | SSEPF2a | You want to increase your income next month without changing your hourly rate. | Which lever are you actually able to pull without a new skill or a raise? | Work more hours (with limits — energy, school, and burnout cap how much this helps) | Ask your employer to raise minimum wage | Wait for inflation to increase your pay automatically | Switch to a job with a lower hourly rate but a nicer schedule |

### Post-instrument (administered after the Week-1 boss game, "Panda's First Paycheck")

Same six constructs, parallel surface details (a different job/scenario, same underlying
concept and difficulty), items 5 and 6 unchanged from pre per the anchor design.

| # | SSEPF tag | Scenario stem | Question | Correct | Distractors |
|---|---|---|---|---|---|
| 1 | SSEPF2a | A tutoring gig pays "$20/session, about 45 minutes each" and a retail shift pays "$14/hr." | What do you need to know to compare these two as hourly pay? | How many sessions fit into an hour, and how long a session actually runs | Which job has better reviews online | Which job pays weekly instead of biweekly | Which job is indoors |
| 2 | SSEPF2a | Your cousin works 25 hours a week at $9/hr. You work 12 hours a week at $17/hr. | Who earns more per hour, and why does that matter for your future income? | You do — a higher hourly value means every hour you add is worth more, and it's the lever that grows without adding hours | Your cousin does, because 25 hours is more effort | You're equal since you both have jobs | Only the person with more total hours "really" earns more |
| 3 | SSEPF2c | Your offer letter says $14/hour, 10 hours this week. Your paycheck is under $140. | What's the most likely reason? | Payroll deductions (taxes, etc.) reduced gross pay down to your net (take-home) pay | The store shorted your hours on purpose | Part-time employees get a lower legal minimum than full-time | You must have clocked out early without realizing it |
| 4 | SSEPF2c | One paystub shows "$150" at the top and "$127" at the bottom, both for the same week. | Which number is take-home pay, and what's the general term for the difference between the two? | $127 is take-home (net) pay; the difference is deductions | $150 is take-home pay; the difference is a bonus | Both numbers represent the same amount, just before/after rounding | The difference means a shift was cancelled |
| 5 (anchor) | SSEPF8c | Two workers do the same job for the same number of hours, but one earns more per hour than the other. | What is the most likely reason for the pay difference, according to what you've learned? | The higher-paid worker's skills solve a more valuable or harder problem | The higher-paid worker has worked there longer, no matter what | Pay differences like this are always unfair and never explained by skill | It's random — pay rates don't actually depend on what you can do |
| 6 (anchor) | SSEPF2a | You want to increase your income next month without changing your hourly rate. | Which lever are you actually able to pull without a new skill or a raise? | Work more hours (with limits — energy, school, and burnout cap how much this helps) | Ask your employer to raise minimum wage | Wait for inflation to increase your pay automatically | Switch to a job with a lower hourly rate but a nicer schedule |

### Notes for the next run

- Voice matches the existing test-out quiz style (second person, concrete dollar amounts,
  plausible-misconception distractors) per design principle 4 and the reconciliation note
  below.
- Once P1 (data-model fields) is approved, these 12 items map directly onto the proposed
  `preAssessment` / `postAssessment` arrays with a `ssepfTag` field per item.
- **Next module up for a 6+6 draft:** Saving (Week 3) — has the next-clearest single-topic
  lessons (pay-yourself-first, emergency fund) to build parallel items from.

Reconciled with test-out quiz item style so the two instruments don't drift apart in
voice: both use second-person scenario stems, one best answer, and distractors drawn from
real misconception patterns rather than joke/throwaway options.
