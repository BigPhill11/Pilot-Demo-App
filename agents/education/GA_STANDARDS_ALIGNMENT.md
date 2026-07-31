# Georgia Standards Alignment Record — Phil's Financials

**Prepared:** 2026-07-05 (Education Agent) · **Status:** Living document — the standing standards-alignment artifact required by the governing curriculum doc and expected in APS procurement conversations.
**Scope:** Maps every shipped app module (and the planned Week-8 Market Literacy module) to Georgia's high-school personal finance standards, with an honest per-element coverage assessment and a gap list.

---

## 1. The legal and standards context

- **Graduation requirement:** Georgia **SB 220** (signed April 2022) requires that, **beginning with the 2024–2025 school year**, every student complete **at least a half-credit course in financial literacy in 11th or 12th grade** as a condition of graduation. The course may count toward a mathematics, social studies, or elective credit.
- **Governing standards:** The State Board of Education adopted the **Social Studies Georgia Standards of Excellence (GSE) — Personal Finance and Economics** course (**Course Code 45.061**, effective 2022–23, GaDOE document dated December 9, 2021). The course's **Personal Finance domain is standards SSEPF1–SSEPF10**; the course also includes Fundamentals of Economic Decision-Making (SSEF1–4), Microeconomics (SSEMI1–3), Macroeconomics (SSEMA1–3), and International (SSEIN1–2). GaDOE states the standards/elements "may be taught in any order or sequence."
- **Sources (retrieved 2026-07-05):**
  - Official GSE course PDF (GaDOE-hosted): https://lor2.gadoe.org/gadoe/file/718cd76e-7ea7-44a8-95bf-fd4047eb9cea/1/Social-Studies-Personal%20Finance-and-Economics-Georgia-Standards.pdf — full SSEPF1–10 element text below is verbatim-sourced from this document.
  - Requirement background: https://www.ngpf.org/blog/professional-development/successfully-implementing-the-guaranteed-personal-finance-course-in-georgia-high-schools/ · https://www.cnbc.com/2022/04/28/georgia-is-now-the-latest-state-to-mandate-personal-finance-education.html
  - Note: **GeorgiaStandards.org has been sunset** (redirects to gadoe.org/georgiastandards-sunset); cite the gadoe.org-hosted PDF above, and re-verify the canonical URL before sending anything to APS.

**Positioning for APS:** Phil's Financials is a **supplemental, game-based delivery vehicle** for the SSEPF domain — not a claim to replace the full 45.061 course (which also includes micro/macro/international economics). The honest pitch: strong coverage of SSEPF2, 3d, 4d, 6, 7, 8, and 10 through decision-based gameplay, with a documented gap list (§4) and a roadmap.

## 2. The SSEPF standards (summary)

| Code | Standard |
|---|---|
| SSEPF1 | Analyze major life decisions using economics-based decision-making skills (post-HS choices, paying for college/HOPE/FAFSA, major purchases, generational wealth) |
| SSEPF2 | Analyze income as a scarce resource allocated through budgeting (income types, Form 1040, paystub components, budget components, checking reconciliation, net worth) |
| SSEPF3 | Explain how the financial system channels funds from savers to investors (functions of money, financial institutions incl. payday/title-pawn, payment methods, risk/return of savings & investment options + diversification, speculative investments) |
| SSEPF4 | Explain how interest rates affect consumer decisions (rate comparison across institutions, APR, amortization, simple vs. compound + fixed vs. variable interest, nominal/real returns & inflation) |
| SSEPF5 | Explain how taxation impacts spending and saving (income/sales/property/capital-gains/estate taxes; progressive/regressive/proportional) |
| SSEPF6 | Evaluate the costs and benefits of using credit (credit report vs. score, score components, loan-application creditworthiness, revolving vs. installment, bankruptcy) |
| SSEPF7 | Analyze how insurance and risk-management strategies protect against financial loss (why insure, insurance types, deductibles/premiums/limits, insurability) |
| SSEPF8 | Describe how workers' earnings are determined in the marketplace (workplace skills, social-media footprint, education/training investment vs. future earnings) |
| SSEPF9 | Explain ways consumers are protected by rules and regulations (agencies, complaint methods, consumer legislation) |
| SSEPF10 | Explain sources of and protection against identity theft (how it happens, prevention, victim response, investment scams) |

## 3. Module-by-module mapping

Legend — **STRONG**: element is directly taught and practiced in a decision/simulator; **PARTIAL**: element touched but incomplete or theory-only; **probable**: mapping inferred from lesson file/title and gap-analysis audit, content not yet re-read line-by-line this run (verification queue in §5). Evidence cites files under `src/data/`.

### Week 1 — Active Income (`personal-finance/income/`, `personal-finance/lessons/`, boss: *Panda's First Paycheck*)
| Element | Coverage | Evidence |
|---|---|---|
| SSEPF2a (income types — hourly wages) | **STRONG** (wages/hours); PARTIAL overall (tips, 1099, dividends, capital gains not here — dividends/capital gains land in Investing/Career Income) | `income/lesson-1-active-income.ts` (hours × hourly value levers) |
| SSEPF2c (paystub: gross, net, deductions) | **STRONG** | `lessons/lesson-2-controlling-pay.ts` (gross vs. net); boss game `boss-games/pandas-first-paycheck.ts` (paycheck + tax decisions) |
| SSEPF8c (skills/education investment → future earnings) | **STRONG** | `income/lesson-1-active-income.ts` (skills, not just shifts, raise pay); `lessons/lesson-5-launchpad.ts` (probable) |
| SSEPF1d (evaluate employment opportunities) | PARTIAL | end-of-week "how will you earn more next month?" decision |

### Week 2 — Financial Planning (`personal-finance/financial-planning/`, boss: *Panda's Goal Compass*)
| Element | Coverage | Evidence |
|---|---|---|
| SSEPF2d (budget components: income, fixed/variable expenses, short/long-term savings) | **PARTIAL** — wants/needs, priorities, time horizons yes; **no explicit allocate-income budgeting mechanic** (known P1 gap in `MODULE_GAP_ANALYSIS.md`) | `lesson-3-wants-needs.ts`, `lesson-4-priority-stacking.ts`, `lesson-2-time-horizons.ts` |
| SSEPF1a/d (rational decision-making model for life choices) | PARTIAL (model practiced in-game, not applied to post-HS choices) | `lesson-1-direction.ts`, `lesson-5-progress-measurement.ts` |
| SSEF2 (marginal benefit/cost, incentives) | PARTIAL (implicit in every simulator tradeoff) | simulator choice/outcome structures throughout |

### Week 3 — Savings (`personal-finance/saving/`, boss: *Cash Flow Stress Test*)
| Element | Coverage | Evidence |
|---|---|---|
| SSEPF2d (importance of short- and long-term savings) | **STRONG** | `lesson-1-why-saving-comes-before-spending.ts` (pay-yourself-first, emergency fund, fixed/variable expense flashcards — verified in full), `lesson-2-emergency-funds-and-targets.ts` |
| SSEF1d (opportunity cost applied to personal choices) | **STRONG** | `lesson-4-saving-tradeoffs-and-opportunity-cost.ts` |
| SSEPF3d (risk/return of savings options) | PARTIAL (liquidity taught; account types/CDs not evidenced) | `lesson-1` Liquidity flashcard |
| SSEPF4d (compound interest) | PARTIAL (deferred to Investing per gap analysis) | — |

### Weeks 4–5 — Credit & Debt (`personal-finance/credit-debt/`, boss: *The Credit Architect*)
| Element | Coverage | Evidence |
|---|---|---|
| SSEPF6b (credit-score components) | **STRONG** — payment history, utilization, inquiries, credit mix all taught + simulated; length of history lighter | `lesson-3-credit-scores.ts` (verified in full: flashcards + Build the Score simulator) |
| SSEPF6a (credit report vs. score, how to access) | PARTIAL — score yes; accessing one's **report** not evidenced | `lesson-3-credit-scores.ts` |
| SSEPF6c (loan application / creditworthiness → rates) | PARTIAL | boss game `the-credit-architect.ts` ("invisible to 780+"); engine `src/engine/credit.ts` (borrow-now-affects-terms-later) |
| SSEPF6d (revolving vs. installment credit) | probable | `lesson-2-types-of-debt.ts` (productive vs. unproductive verified via audit; revolving/installment framing to verify) |
| SSEPF4b (APR; rates affect payments) | probable-PARTIAL | `lesson-4-paying-down-debt.ts` (avalanche/snowball, minimum vs. payoff) |
| SSEPF6e (bankruptcy causes/consequences) | **GAP** | — |

### Week 6 — Insurance (`personal-finance/insurance/`, boss: *The Shield Builder*)
| Element | Coverage | Evidence |
|---|---|---|
| SSEPF7a (why people buy insurance) | **STRONG** | `lesson-2-insurance-basics-risk-transfer.ts`; Shield Builder disaster events |
| SSEPF7c (deductibles, premiums, coverage limits, asset protection) | **STRONG** (premiums/deductibles/asset protection); shared liability partial | `lesson-1-protecting-your-assets.ts`, `lesson-4-legal-basics-liability-protection.ts`, `boss-games/the-shield-builder.ts` |
| SSEPF7b (types: auto, health, life, disability, renters, flood, property) | PARTIAL — risk transfer generalized; type-by-type comparison not evidenced | — |
| SSEPF7d (insurability, why rates vary) | **GAP** (unverified) | — |
| SSEPF10a/b/c (identity theft: sources, prevention, victim steps) | **STRONG** | `lesson-3-fraud-scams-identity-protection.ts`, `lesson-5-digital-security-protection-habits.ts`; Shield Builder identity-theft event |
| SSEPF10d (investment scams: Ponzi, pump-and-dump, advance fee) | probable-PARTIAL | `lesson-3-fraud-scams-identity-protection.ts` (verify scam taxonomy) |

### Week 7 — Investing (`personal-finance/investing/`, boss: *The Long Game*)
| Element | Coverage | Evidence |
|---|---|---|
| SSEPF3d (risk/return of investment options; diversification) | **STRONG** | `lesson-2-what-you-buy-when-investing.ts`, `lesson-3-risk-volatility-price-movement.ts`, `lesson-4-diversification-risk-control.ts` |
| SSEPF4d (simple vs. compound interest) | **STRONG** on compounding; simple-vs-compound contrast and fixed-vs-variable to verify | `lesson-1-ownership-time-consistency.ts`; boss `the-long-game.ts` (5-year market cycle) |
| SSEPF3e (speculative investments) | PARTIAL — best future home is Week-8 Market Literacy | — |
| SSEPF4e (nominal/real returns, inflation) | **GAP** | — |

### Week 8 (planned) — Market Literacy (`market-intelligence/`, repackage per P0 #3)
| Element | Coverage | Evidence |
|---|---|---|
| SSEPF3e (speculative investments, hype cycles) | PARTIAL today → **STRONG** when repackaged | `market-intelligence/headlines-lessons.ts` (Headline Decoder, Noise vs. Signal, Market Mood) |
| SSEMA2 (Federal Reserve roles) | PARTIAL (bonus economics coverage — a differentiator for the 45.061 course) | `catalog.ts` (The Fed Speaks event lesson) |
| GSE Information Processing Skills 4/15/16 (fact vs. opinion; adequacy/relevancy/consistency of information) | **STRONG** fit | headline-credibility gameplay |

### Extension modules (beyond the 8 weeks)
| Module | Elements | Coverage |
|---|---|---|
| **Taxes** (`personal-finance/taxes/`, boss: *The Tax Strategist*) | SSEPF5a (tax types) — **PARTIAL** (verified 2026-07-05): income tax, payroll taxes (SS/Medicare), and capital gains taught in `lesson-1-understanding-taxes.ts` + `lesson-2-income-types-taxation.ts`; **sales, property, and estate taxes not evidenced** in lessons 1–2 → PARTIAL, not STRONG. SSEPF5b (progressive/regressive/proportional) — **GAP** (verified 2026-07-05): neither lesson 1 nor lesson 2 introduces progressive/regressive/proportional structure or bracket/marginal-rate framing; a rate-structure lesson (or an addition to lesson 1) would close it. SSEPF2b (complete a 1040) — **GAP** (no form-completion activity evidenced); SSEPF3d retirement accounts — PARTIAL (`lesson-4-tax-advantaged-accounts.ts`, not re-verified this run) |
| **Career Income** (`personal-finance/career-income/`, boss: *The Career Architect*) | SSEPF8c — **STRONG** (`lesson-1-career-investment.ts` human capital, `lesson-2-market-value.ts` supply/demand for skills, `lesson-3-skills-that-pay.ts`); SSEPF8a — PARTIAL (multiplier skills: leadership/communication); SSEPF2a — PARTIAL (`lesson-5-multiple-income-streams.ts`: dividends/passive income); SSEPF8b (social-media footprint) — **GAP** |
| **Wealth Fundamentals** (`personal-finance/wealth-fundamentals/`, boss: *The Wealth Builder*) | SSEPF1e (generational wealth) — probable-STRONG (`lesson-1-what-wealth-is.ts`); SSEPF2f (net worth) — probable (verify lesson-1); SSEPF4d reinforced (`lesson-2-systems-compounding.ts`) |
| **Career Readiness track** (`career-readiness/`) | SSEPF8a — **STRONG** (professional habits, etiquette, interviewing); SSEPF8b — PARTIAL-probable (personal-brand module; verify social-media treatment) |

## 4. Coverage summary and gap list

**Well covered (STRONG on core elements):** SSEPF2c, SSEPF2d(savings), SSEPF3d, SSEPF4d(compounding), SSEPF6b, SSEPF7a/c, SSEPF8a/c, SSEPF10a/b/c, SSEF1d, SSEF2.

**Elements with NO current coverage (roadmap candidates, roughly priority-ordered for the APS conversation):**
1. **SSEPF1b/c — paying for post-high-school life: HOPE scholarship, FAFSA, work-study.** Highest-value gap for this audience; Georgia-specific (HOPE) and life-critical for underserved juniors/seniors. **→ Full decision-driven module spec now drafted: `agents/education/SPEC_FUND_YOUR_NEXT_CHAPTER.md` (2026-07-05)** — 5 lessons + boss game, maps SSEPF1b/1c to STRONG and gives SSEPF1a/1d a second anchor. Build is PROPOSE-ONLY (awaiting Phil's APPROVED); Georgia aid figures need GAfutures.org + counselor verification before student-facing ship.
2. **SSEPF2b — review/complete a sample federal 1040.** Could extend the Taxes module (form-as-puzzle mini-game).
3. **SSEPF2e — reconcile a checking account / avoid overdraft fees.** Fits the Saving/Cash-Flow mechanics.
4. **SSEPF3a/b — functions of money; compare banks, credit unions, payday lenders, title-pawn lenders.** Payday/title-pawn comparison is high-relevance in Atlanta neighborhoods.
5. **SSEPF4a/c — rate shopping across institutions; amortization visual.** Engine `src/engine/credit.ts` could power an amortization visualization.
6. **SSEPF4e — inflation, nominal vs. real returns.**
7. **SSEPF6e — bankruptcy causes/consequences.**
8. **SSEPF7b/d — insurance type-by-type comparison; insurability/rate variation.**
9. **SSEPF9 (entire standard) — consumer protection agencies, complaint channels, key legislation.** Closest existing content is `insurance/lesson-4-legal-basics-liability-protection.ts`; a "Know Your Rights" lesson would close it.
10. **SSEPF8b — social-media footprint and career/finances** (quick add to Career Readiness personal-brand module).
11. **SSEPF5b — progressive / regressive / proportional tax structures** (surfaced by 2026-07-05 verification of Taxes lessons 1–2; not currently taught). Also **SSEPF5a is only PARTIAL** — sales, property, and estate taxes are absent from the Taxes module. A rate-structure/tax-types lesson (or additions to `taxes/lesson-1`) would close both.

**Non-SSEPF course domains (SSEF, SSEMI, SSEMA, SSEIN):** partially touched (opportunity cost, incentives, Fed content in Market Intelligence) — worth noting to APS as enrichment, but the app should not claim coverage of the full 45.061 economics scope.

## 5. Verification queue (upgrade "probable" → verified)

Next runs should read and confirm, then update this table in place (additive standards-tag metadata in lesson files is auto-apply under the 2026-07-05 policy):
1. ~~`taxes/lesson-1` + `lesson-2` — SSEPF5a/b tax-type and progressivity coverage.~~ **VERIFIED 2026-07-05:** SSEPF5a → PARTIAL (income/payroll/capital-gains taught; sales/property/estate absent); SSEPF5b → GAP (no progressive/regressive/proportional framing). See §3 Taxes row and §4 gap #11. Remaining Taxes verification: `lesson-3` deductions/credits, `lesson-4` tax-advantaged accounts (SSEPF3d).
2. `credit-debt/lesson-2` — revolving vs. installment framing (SSEPF6d).
3. `insurance/lesson-3` — scam taxonomy vs. SSEPF10d list.
4. `wealth-fundamentals/lesson-1` — net worth (SSEPF2f) and generational wealth (SSEPF1e).
5. `career-readiness` personal-brand module — SSEPF8b.
6. Surface this mapping in `src/data/teacher-curriculum-guide.md` (copy addition — auto-apply eligible) and consider per-lesson `gaStandards: ['SSEPF6b', ...]` metadata tags (additive metadata — auto-apply eligible; schema addition to the `Lesson` type would be PROPOSE-ONLY since it touches `src/types/`).
