# Module Gap Analysis — 8-Week Curriculum vs. Shipped App Content

**Audited:** 2026-07-02 · Grounded in `src/data/personal-finance/modules.ts` (module registry), lesson files under `src/data/personal-finance/`, `src/data/personal-finance/boss-games/index.ts`, `src/data/career-readiness/modules.ts`, `src/data/market-intelligence/catalog.ts` + `headlines-lessons.ts`, and `src/data/teacher-curriculum-guide.md`.

## What the app has today

The app ships a **9-module Personal Finance track** (`modules.ts`), each with ~5 lessons (realityHook → microLesson → flashcards → simulatorGame), a 5–10 question test-out quiz, and an end-of-module boss game: Income, Financial Planning, Saving, Investing, Insurance, Taxes, Credit & Debt, Career Income, Wealth Fundamentals. Bamboo Empire integration exists at the engine level (`src/engine/simulate.ts`, `events.ts`, `credit.ts`; `src/hooks/useBambooEmpireProgress.ts`). A separate **Market Intelligence** catalog covers headlines/market-reading, and a **Career Readiness** track has 6 soft-skills modules.

## Week-by-week status

| Wk | Curriculum module | App status | Evidence |
|----|-------------------|-----------|----------|
| 1 | Active Income | **BUILT** | `personal-finance/income/lesson-1-active-income.ts` + 4 lessons in `personal-finance/lessons/` (controlling pay = gross vs net, negotiation, energy/burnout, launchpad); boss game *Panda's First Paycheck* (paycheck + tax decisions) |
| 2 | Financial Planning | **BUILT (partial)** | 5 lessons in `financial-planning/` (direction, time horizons, wants/needs, priority stacking, progress); boss game *Panda's Goal Compass*. **Gap:** no explicit budgeting lesson — needs/wants/goals are covered, but there is no "allocate this month's income across categories" budgeting mechanic tied to kingdom resources as the curriculum specifies |
| 3 | Savings | **BUILT** | 5 lessons in `saving/` (save-first, emergency funds, automation, opportunity cost, when to increase); boss game *Cash Flow Stress Test*. **Gap:** compound growth is deferred to Investing; kingdom-growth-tied-to-saving-consistency link not evidenced in lesson data |
| 4 | Credit | **BUILT (merged with W5)** | `credit-debt/` lessons 1, 3, 5 (understanding credit, credit scores, building credit); boss game *The Credit Architect* ("invisible to 780+"). The borrow-or-wait mechanic exists in spirit in `src/engine/credit.ts` |
| 5 | Debt | **BUILT (merged with W4)** | `credit-debt/` lessons 2 and 4 (types of debt incl. productive vs unproductive, paying down debt incl. avalanche/snowball). **Gap:** one combined module = one week of app content covering two curriculum weeks; no standalone debt boss experience |
| 6 | Insurance | **BUILT** | 5 lessons in `insurance/` (asset protection, risk transfer, fraud/scams, liability, digital security); boss game *The Shield Builder* simulates disaster events (accident, identity theft, lawsuit) — matches the curriculum's risk-transfer-via-disaster design |
| 7 | Investing | **BUILT** | 5 lessons in `investing/` (ownership/time/consistency, what you buy, risk/volatility, diversification, long-term strategy); boss game *The Long Game* (5-year market-cycle sim) |
| 8 | Market Literacy | **PARTIAL** | Content exists in `market-intelligence/` (Headline Decoder, Noise vs. Signal, The Earnings Call, Market Mood, event lessons like The Fed Speaks — see `catalog.ts`, `headlines-lessons.ts`) but it lives in a separate track outside the 9-module personal-finance progression, is investor/analyst-flavored (buy-side/sell-side roles), and is not packaged as a Week-8 module a facilitator can assign |
| — | Career Readiness (parallel track) | **BUILT (partial)** | 6 modules in `career-readiness/modules.ts` (interviewing, email etiquette, business etiquette, networking, professional habits, personal brand) + `resume.ts`, `interviewing.ts`. Career exploration exists via careers content/`company-profiles.ts`. **Gap:** no testimonial content from finance professionals; mock-interview/resume-review events are offline and not represented |

Beyond the curriculum, the app also ships **Taxes**, **Career Income**, and **Wealth Fundamentals** (3 lessons — the only module short of 5) — useful extension content but not part of the 8 weeks.

## Cross-cutting gaps (affect every week)

1. **No Georgia standards alignment anywhere in the app.** A repo-wide search for "Georgia"/standards codes returns only a CSS font stack (`src/index.css`). Neither lesson data nor `teacher-curriculum-guide.md` maps content to GA standards. The governing doc requires a standing standards-alignment artifact.
2. **No pre/post assessment instrumentation.** Modules have *test-out* quizzes (used to skip content at 85%), but there are no pre-tests, post-tests distinct from lesson quizzes, or confidence self-assessments in the data model — the Georgia Tech assessment framework has nothing to hook into.
3. **8-week packaging doesn't exist.** The app's 9-module sequential unlock chain (income → … → wealth-fundamentals, with Taxes wedged between Insurance and Credit) doesn't match the 8-week order (Credit/Debt in weeks 4–5, before Insurance). A facilitator cannot currently run "Week 4" as designed.
4. **Comic art direction exists but is unshipped groundwork:** `docs/comic-background-prompts-{active-income-lesson-1, credit-debt, investing, saving, wealth-fundamentals}.md` define teen-aimed comic panel prompts (backing `personal-finance/comicPanelBackgrounds.ts`); Financial Planning and Insurance have no comic docs yet.

## Build priorities

### P0 — blocks the pilot's stated success criteria
1. **Georgia standards-alignment record.** ✅ **STARTED 2026-07-05** — `agents/education/GA_STANDARDS_ALIGNMENT.md` now maps all 9 modules + planned Week-8 to GSE Personal Finance and Economics (Course 45.061) standards SSEPF1–10, with per-element coverage, a 10-item gap list, and a verification queue. Remaining: verify the "probable" mappings, surface the mapping in `teacher-curriculum-guide.md`, and add per-lesson `gaStandards` tags (metadata auto-apply; any `Lesson` type change is propose-only).
2. **Pre/post + confidence assessment instrumentation.** Add per-module pre-test and confidence check (before/after) to the lesson data model; without it the Georgia Tech measurement plan and "measurable gain" success criterion cannot be met. Time-per-lesson tracking should ride along.
3. **Week-8 Market Literacy module.** Repackage the four core headlines lessons (Headline Decoder, Noise vs. Signal, The Earnings Call, Market Mood) into the personal-finance track's module format with a boss game and teen framing. Highest content gap: 7 of 8 weeks have a module; this one doesn't.

### P1 — needed for curriculum fidelity
4. **Split Credit & Debt into two modules** (or add a debt-focused boss game + 2 lessons) so weeks 4 and 5 each have a full 30–45 min experience; wire the borrow-or-wait consequence explicitly (loan terms later depend on the earlier choice — engine support exists in `src/engine/credit.ts`).
5. **Budgeting lesson/mechanic in Financial Planning** — an "allocate the kingdom's resources this month" simulator (needs/wants/savings percentages) to match the Week-2 design.
6. **8-week facilitator sequencing** — a curriculum "playlist" view ordering modules W1–W8 (reordering around the Taxes module), with the reflection/discussion prompt for each week.

### P2 — polish and parallel track
7. **Kingdom-growth-tied-to-saving-consistency visual feedback** in the Saving module (curriculum W3 promise).
8. **Career Readiness additions:** finance-professional testimonial content; in-app artifacts for mock interviews/resume review events.
9. **Complete Wealth Fundamentals to 5 lessons**; comic background docs for Financial Planning and Insurance.
