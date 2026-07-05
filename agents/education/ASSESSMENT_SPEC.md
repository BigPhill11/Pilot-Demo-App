# Assessment Spec — Pre/Post Knowledge + Confidence Measurement (Georgia Tech partnership)

**Prepared:** 2026-07-05 (Education Agent) · **Status:** DRAFT v0.1 — design spec started per session queue; instrumentation items in §5 are **PROPOSALS ONLY** (code/data-collection = high-risk under the 2026-07-05 autonomy policy; nothing here is applied to source).
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

## Next steps (v0.2)

- Draft the full 6+6 item blueprint for Week 1 (Income) as the pilot pair, tagged to SSEPF2a/2c/8c — item *drafting* is doc-only and auto-apply eligible here in `agents/education/`; nothing enters `src/` without P1–P4 approval.
- Reconcile with test-out quiz item style so the two instruments don't drift apart in voice.
