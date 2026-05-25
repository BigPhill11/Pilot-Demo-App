---
name: Finish Market Intelligence
overview: "Significantly expand and complete the Market Intelligence module: unify all 5 narrative section UIs under one shared shell, ship ~140 production-ready Phil-voiced lessons across an expanded curriculum, build the 4 planned Boss Games, and add a master plan + per-lesson markdown file workflow so content can be authored incrementally without breaking the live app."
todos:
  - id: batch-a-foundations
    content: "Batch A — Foundations: ship companion plan files (_voice-guide, _design-system, _lesson-template, _boss-games, _sample-lesson), build unified MI shell components, refactor 5 section views onto them, patch progress + flashcard-unlock + lesson-resume systems, add headline-decoder + slider-budget Try types."
    status: pending
  - id: batch-b-headlines
    content: "Batch B — Markets & Headlines: write 8 lesson markdown files + visuals, materialize headlines-lessons.ts, convert MarketsHeadlinesView from 'Mark as Complete' stubs to full MILessonContainer, build Daily Headline Drill widget."
    status: pending
  - id: batch-c-lof
    content: "Batch C — Language of Finance: rewrite the 4 career-half stubs as full lessons, polish the 4 accounting lessons to spec, write the 6 new modules (lof-9 … lof-14), extend catalog + registry."
    status: pending
  - id: batch-d-ownership
    content: "Batch D — Ownership expansion: write the 6 new modules (own-5 … own-10) and ship Phil's 10-Year Challenge boss game first (highest-impact MI boss, also the most narrative)."
    status: pending
  - id: batch-e-business-foundations
    content: "Batch E — Business Foundations rebuild: replace 8 stub lessons with full lessons, add 3 new units (Branding, Digital, Ops/Org/Entrepreneurship = 12 lessons) under new business-foundations/ folder."
    status: pending
  - id: batch-f-biz-comp
    content: "Batch F — Businesses & Competition rebuild: replace the 1 stub unit with 4 full units (16 lessons) under new businesses-competition/ folder."
    status: pending
  - id: batch-g-econ-expansion
    content: "Batch G — Micro + Macro expansion: add 3 micro units (Production & Costs, Labor, Game Theory — 12 lessons) + 3 macro units (Business Cycles, Trade & FX, Money & Banking — 12 lessons); optionally extend economics-simulators."
    status: pending
  - id: batch-h-boss-games
    content: "Batch H — remaining Boss Games: build shared BossShell, then Weather Report (Business Economics), Boardroom (LoF), News Room (Headlines); wire unlock gates from useMarketIntelligenceProgress.getSectionProgress; emit boss daily-goal events."
    status: pending
  - id: batch-i-tinder-and-cross
    content: "Batch I — Company Tinder Boss Mode + cross-section systems: add 6th game-mode card, add 'Learn this' deep-link footer on Tinder cards, wire Phil chat lesson-context provider, extend careers tab deep-link from Connect step."
    status: pending
  - id: batch-j-image-assets
    content: Batch J — generate the ~360 panda-style PNGs (hero + 3 concept + 2 connect per new lesson) using .cursor/skills/panda-image-style/SKILL.md; until art lands, LessonVisualImage placeholders keep lessons shippable.
    status: pending
  - id: batch-k-qa-launch
    content: "Batch K — QA & launch: per-lesson script audit (voice, budget, factual checks), mobile + Capacitor sweep (drag fallback, safe areas), accessibility pass (alt text, focus order, color), pilot demo script, smoke test of all 4 boss-game unlocks."
    status: pending
isProject: false
---

# Finish Market Intelligence — Master Plan

A complete blueprint for taking [src/components/learn/MarketIntelligenceTab.tsx](src/components/learn/MarketIntelligenceTab.tsx) from a half-filled scaffold (4 fully written sections, 2 mostly stubbed, 4 "Planned" boss games) to a finished, cohesive, classroom-ready module.

> Companion files live in `.cursor/plans/market-intelligence/`:
> - `_lesson-template.md` — the production-ready content schema every lesson file follows
> - `_voice-guide.md` — Phil's tone, do/don't, age-appropriate banking of analogies
> - `_design-system.md` — the unified MI UI tokens, layouts, and components
> - `_boss-games.md` — full mechanics + UX for all 4 boss games
> - `_sample-lesson.md` — one fully written lesson (production depth) to anchor quality
> - `lessons/<section>/<lesson-id>.md` — one file per individual lesson (≈140 files)
>
> Those companion files are created in the first execution batch after this plan is approved.

---

## 1. Goal, Audience, and What "Done" Means

**Goal.** Deliver a Market Intelligence tab a high-school finance teacher could assign Monday morning: every section feels like the same product, every lesson follows the same 7-step rhythm, every concept ends with a real-world handle, and the boss games make all of it stick.

**Audience.** High-school and early-college teens. Reading level: ~9th grade. Sentences short. Examples drawn from things teens actually touch — sneakers, streaming, gas prices, sports, food delivery, summer jobs, college applications, first paychecks.

**Phil's voice (anchored in `_voice-guide.md`).**
- Warm, plain-English, lightly funny. Never sarcastic, never doomy.
- Bamboo Empire metaphors are sprinkled, not piled on. One bamboo analogy per concept max; default to a real teen-world example, then bamboo as the optional second beat.
- Always tells the learner what to *do* with the idea, never just defines it.
- Reads like a coach, not a professor. ("Here's the move." / "Watch this." / "Try it.")

**"Done" definition.**
- Every catalog module in `[src/data/market-intelligence/catalog.ts](src/data/market-intelligence/catalog.ts)` has a real `MILesson` (no `buildTierBLesson`, no `buildStubLesson`, no "Mark as Complete" dialog).
- Every Economics unit (micro, macro, businesses & competition, business foundations) has full lessons — no `Placeholder:` strings anywhere in `src/data/`.
- All 4 boss games are playable end-to-end and unlocked by section completion.
- All 5 narrative sections share the unified MI shell (header, progress, card grid, lesson chrome) — different color accents per section, identical structure.
- Flashcards, dashboard streaks, daily-goal events, careers tab, and Phil chat all see the new lessons automatically (no per-lesson registry chores).

---

## 2. Final Section Map (Top-Level UX)

The 6 sub-tabs in [MarketIntelligenceTab.tsx](src/components/learn/MarketIntelligenceTab.tsx) stay. Order, icons, and labels stay. Internally each of the 5 narrative sections snaps to the same shell:

```
[Section Hero]   one rounded card, gradient accent, section icon, blurb, progress chips
[Track Tabs]     only Business Economics, Business Foundations show inner tabs
[Module Grid]    md:grid-cols-2 (most) or grid-cols-3 (Headlines/Tinder), unified MICard
[Boss Game Card] always last, locked until section is 100% complete
```

Company Tinder stays as the practice arena (no lesson grid), but gains a "Boss Mode" entry and a small "What modules unlocked this?" footer linking back to lessons that taught the mechanics being tested.

---

## 3. Unified MI Design System

> Spec lives in `.cursor/plans/market-intelligence/_design-system.md`. Summary here.

### 3.1 Per-section color accents (one shared layout, 5 accent palettes)

- **Business Economics** — emerald/teal (current sage). Window-chrome dot row retained as a subtle accent.
- **Ownership** — emerald with warm gold tick marks (compounding/time motif).
- **Language of Finance** — emerald with deep navy "ledger" accents (book/serif accent for headings only).
- **Markets & Headlines** — emerald with newsprint cream `bg-[#faf8f0]` accent strip only (no full newspaper takeover — drops to a header band, keeps the rest in the unified shell).
- **Business Foundations** — emerald with violet accent (current violet retained as accent only, not whole section).

All 5 sections share the same header anatomy, the same card density, the same progress bar, and the same Boss Game card.

### 3.2 New / refactored components

Create under `src/components/learn/market-intelligence/shell/`:
- `MISectionHeader.tsx` — replaces the bespoke hero in each section view. Props: `icon`, `title`, `intro`, `accent`, `chips[]`, `optionalStripeContent` (e.g. newsprint masthead text).
- `MIModuleCard.tsx` — supersedes both [ModuleCard.tsx](src/components/learn/market-intelligence/ModuleCard.tsx) and the bespoke `OwnershipModuleCard.tsx` / `LanguageOfFinanceModuleCard.tsx`. One card, accent-aware, with: icon, title, 2-line description, minutes badge, difficulty pill, completion check, "What you'll learn" peek dialog. No more `theme` enum — accents come from CSS variable on the parent grid.
- `MIModuleGrid.tsx` — `grid-cols-1 md:grid-cols-2` default; `cols` override for Headlines.
- `MIBossGameCard.tsx` — locked state (progress %), unlocked state ("Play"), completed state ("Play again"). All 4 bosses share the same card.
- `MISectionProgressBar.tsx` — small horizontal pill with `n/total modules + xp + bamboo` (currently inlined in every section).
- `MISkillTrail.tsx` — replaces the "Today → 10 years → Financial Freedom" stripe in Ownership with a generic 3-stop trail that each section configures (Headlines: "Headline → Filter → Decision"; LoF: "Term → Sentence → Interview"; etc.).

Delete after migration: `OwnershipModuleCard.tsx`, `LanguageOfFinanceModuleCard.tsx`, the `theme` prop on `ModuleCard.tsx`.

### 3.3 Refactor [LessonStepShell.tsx](src/components/learn/market-intelligence/lesson/LessonStepShell.tsx)

- Already great. Two small upgrades:
  - Show step labels (`Hook · Learn · Try · Connect · Review · Check · Done`) under the progress bar on viewports ≥ md.
  - Add a "Pause & save" pill (right-aligned in the header) that exits without losing step position. Resumption stored in `localStorage` under `mi_lesson_resume_v1` keyed by `lesson.id`.

### 3.4 Mobile / Capacitor parity

- Every card-grid section uses `grid-cols-1` under 640px (already so) and the lesson shell keeps its `max-w-lg` column.
- Try-activities (line-item-sort especially) get a tap-then-tap UX as the primary interaction (drag as enhancement only) — important for iOS/Android Capacitor builds where drag is finicky.
- The exit button in the lesson shell gets `safe-area-inset-top` padding (already partly done).

### 3.5 Lovable badge / branding (defensive)

- Re-verify [index.html](index.html) and [capacitor.config.json](capacitor.config.json) do not reintroduce the Lovable preview iframe — the diff suggests this was cleaned up; the design system PR keeps it clean.

---

## 4. The Universal Lesson Format (Hook → Done)

Already implemented in [MILessonContainer.tsx](src/components/learn/market-intelligence/lesson/MILessonContainer.tsx) + [EconomicsLessonContainer.tsx](src/components/learn/economics/EconomicsLessonContainer.tsx). The plan does NOT change the 7 steps. It locks the **content budget** for each step so all 140 lessons feel like one product:

### 4.1 Content budget per step (word counts are targets, ±15%)

- **Hook (intro.hook)** — 1 paragraph, 45–75 words. Real teen-life concrete scenario with one specific number or product. No "imagine if…" — open mid-scene.
- **Phil's message (intro.philMessage)** — 2 sentences, 35–55 words. State the lesson's promise + the takeaway. Always second-person ("you").
- **3 Core Concepts** — each: `title` (≤6 words), `explanation` (45–70 words, 3 short sentences), `example` (1 sentence, ≤30 words, names a real-feeling brand/situation), `keyTerms` (1 term), `visual` (one PNG illustration per concept, panda-style, per the [.cursor/skills/panda-image-style/SKILL.md](.cursor/skills/panda-image-style/SKILL.md) skill).
- **Try Activity** — 1 of 5 types (see §4.2). Always 4–10 items / 2–3 rounds. Description ≤25 words. Completion is the only gate (no scoring).
- **Connect → Your money** — `description` 50–70 words, `scenario` 25–40 words, visual.
- **Connect → On the job** — `description` 40–60 words, `role` (real job title), `skills` (3 chips), visual.
- **Review** — exactly **4 flashcards**: `term`, `definition` (≤25 words), `philsAnalogy` (≤22 words, one beat, Bamboo Empire optional).
- **Check (quiz)** — exactly **4 questions**, 4 options each, `correctIndex`, `explanation` ≤25 words. Pass = 3/4 (75% — already enforced).
- **Done** — auto-rendered by `LessonCompleteStep`. Bonus +5 bamboo / +2 XP on perfect (already wired).

### 4.2 Try-activity type selection rules (locks consistency)

For every lesson, the Try type is chosen by what the concepts demand:
- **Definitional, "which bucket does this fit in"** → `line-item-sort`
- **"Who in finance owns this"** → `role-match`
- **"Is this X or Y"** → `term-classify`
- **"Headline drops — what do you do"** → `scenario-choice`
- **"Numbers change — see the effect"** → `compound-compare`

Some new lessons will need 2 additional Try types (added to [src/types/mi-lesson.ts](src/types/mi-lesson.ts) and a new try component each):
- **`headline-decoder`** — show a headline, learner picks "Signal" vs "Noise" then taps the one phrase in the headline that justified the call. Used 6× across Markets & Headlines.
- **`slider-budget`** — split 100 points across N categories (e.g., 4 P's of marketing) and see if mix matches scenario goal. Used 4× across Business Foundations.

### 4.3 Quiz writing rules

- Every quiz has 1 "definition recall" Q, 1 "spot the example" Q, 1 "predict the consequence" Q, 1 "synthesize across concepts" Q — in that order.
- Distractors are *plausible-wrong*, not silly. No "the moon" / "made up in 1800" gag distractors.
- `explanation` is what a teacher would say in 1 line after the answer is revealed.

---

## 5. Curriculum Taxonomy — Every Lesson, Every Section

Numbers below: `[lessons added net of today]`. Existing lessons that stay get a quality pass to align with the §4 budgets. New lessons get written from scratch.

### 5.1 Business Economics  → 11 units × 4 lessons = 44 lessons + 1 boss

Existing micro units stay; add 3 new units. Existing macro units stay; add 3 new units. Replace `businesses-competition` stub with 4 full units.

#### Microeconomics (8 units, 32 lessons) — adds Production & Costs, Labor Markets, Game Theory

(Existing 5 units retained from [economics-curriculum.ts](src/data/economics-curriculum.ts): Supply & Demand, Elasticity, Consumer Choice, Market Structures, Market Failures. Each gets a §4 quality pass, no new lessons.)

- **micro-6 Production & Costs** `[+4]`
  - `micro-6-lesson-1` Fixed vs. Variable Costs — Concepts: What stays constant / What flexes with output / Why teen-jobs are mostly variable. Try: line-item-sort. Connect role: Operations Analyst. Flashcards: Fixed cost, Variable cost, Total cost, Average cost.
  - `micro-6-lesson-2` Marginal Cost & Marginal Revenue — Concepts: Cost of one more / Revenue of one more / Where they meet. Try: compound-compare (Q vs. profit). Role: Production Manager. Cards: Marginal cost, Marginal revenue, Profit-max rule, Break-even.
  - `micro-6-lesson-3` Economies of Scale — Concepts: Why bigger is cheaper / Where it stops / Diseconomies. Try: scenario-choice. Role: COO. Cards: Economies of scale, Diseconomies of scale, Scale curve, Unit cost.
  - `micro-6-lesson-4` Productivity & Output — Concepts: Inputs vs. outputs / Diminishing returns / Tech as multiplier. Try: slider-budget (allocate workers vs. machines). Role: Industrial Engineer. Cards: Productivity, Diminishing returns, Capital, Output.

- **micro-7 Labor Markets & Wages** `[+4]`
  - `micro-7-lesson-1` How Wages Get Set — Concepts: Labor supply / Labor demand / Equilibrium wage. Try: line-item-sort (shifts labor supply/demand). Role: HR Compensation Analyst. Cards: Wage, Labor supply, Labor demand, Equilibrium wage.
  - `micro-7-lesson-2` Minimum Wage — Concepts: Floor above equilibrium / Who wins, who loses / Evidence is mixed. Try: scenario-choice. Role: Policy Analyst. Cards: Minimum wage, Price floor, Unemployment effect, Living wage.
  - `micro-7-lesson-3` Productivity → Pay — Concepts: Marginal product of labor / Skills premium / Why coders out-earn cashiers. Try: term-classify. Role: Workforce Strategist. Cards: MPL, Skills premium, Human capital, Real wage.
  - `micro-7-lesson-4` Unions, Gigs & Power — Concepts: Bargaining power / Gig economy trade-offs / Non-compete clauses. Try: role-match. Role: Labor Lawyer. Cards: Union, Bargaining, Gig worker, Non-compete.

- **micro-8 Game Theory & Strategy** `[+4]`
  - `micro-8-lesson-1` The Prisoner's Dilemma — Concepts: Cooperate vs. defect / Dominant strategy / Why both end worse. Try: scenario-choice. Role: Behavioral Economist. Cards: Game theory, Dominant strategy, Nash equilibrium, Defection.
  - `micro-8-lesson-2` Nash Equilibrium in Real Life — Concepts: No one improves by switching / Multiple equilibria / Coordination problems. Try: line-item-sort. Role: Strategy Consultant. Cards: Nash equilibrium, Best response, Coordination, Mixed strategy.
  - `micro-8-lesson-3` Price Wars & Oligopoly Games — Concepts: Why airlines match prices / Tit-for-tat / Tacit collusion. Try: compound-compare (price-cut sim). Role: Pricing Strategist. Cards: Price war, Tit-for-tat, Tacit collusion, Cartel.
  - `micro-8-lesson-4` Signaling & Reputation — Concepts: Costly signals / Brand as commitment / Why college degrees still matter. Try: term-classify. Role: Brand Strategist. Cards: Signal, Reputation, Credible commitment, Sunk cost.

#### Macroeconomics (8 units, 32 lessons) — adds Business Cycles, Trade & FX, Money & Banking

(Existing 5 units retained: GDP & Growth, Unemployment, Inflation, Monetary Policy, Fiscal Policy.)

- **macro-6 Business Cycles & Recessions** `[+4]`
  - `macro-6-lesson-1` The 4 Stages — Expansion, peak, contraction, trough. Try: line-item-sort (sort indicators by stage). Role: Macro Strategist. Cards: Expansion, Peak, Recession, Trough.
  - `macro-6-lesson-2` Leading vs. Lagging Indicators — Concepts: Jobless claims / Yield curve / Consumer confidence. Try: term-classify. Role: Economist. Cards: Leading indicator, Lagging indicator, Coincident indicator, Yield curve.
  - `macro-6-lesson-3` What Causes Recessions — Shocks, bubbles, policy errors. Try: scenario-choice. Role: Risk Analyst. Cards: Demand shock, Supply shock, Bubble, Policy error.
  - `macro-6-lesson-4` Investing Across the Cycle — What tends to win in each stage; humility about timing. Try: compound-compare (sector vs. stage). Role: Portfolio Strategist. Cards: Cyclical, Defensive, Rotation, Recession-proof.

- **macro-7 International Trade & FX** `[+4]`
  - `macro-7-lesson-1` Why Countries Trade — Comparative advantage, specialization. Try: line-item-sort. Role: Trade Economist. Cards: Comparative advantage, Specialization, Imports, Exports.
  - `macro-7-lesson-2` Exchange Rates 101 — Floating vs. fixed; weak vs. strong currency. Try: scenario-choice. Role: FX Trader. Cards: Exchange rate, Floating, Pegged, Appreciation.
  - `macro-7-lesson-3` Trade Deficits, Tariffs, Sanctions — Who really pays. Try: term-classify. Role: Trade Policy Advisor. Cards: Trade deficit, Tariff, Sanction, Protectionism.
  - `macro-7-lesson-4` Global Supply Chains — Just-in-time fragility, reshoring. Try: scenario-choice. Role: Supply Chain Analyst. Cards: Supply chain, JIT, Reshoring, Bottleneck.

- **macro-8 Money & Banking** `[+4]`
  - `macro-8-lesson-1` What Money Actually Is — Medium of exchange, unit of account, store of value. Try: term-classify. Role: Monetary Economist. Cards: Money, Medium of exchange, Store of value, Fiat.
  - `macro-8-lesson-2` How Banks Create Money — Fractional reserves, multiplier. Try: compound-compare (lending multiplier). Role: Bank Examiner. Cards: Reserves, Fractional reserve, Money multiplier, Deposit.
  - `macro-8-lesson-3` The Fed in Plain English — Dual mandate, tools, why it's independent. Try: scenario-choice. Role: Fed Economist. Cards: Federal Reserve, Dual mandate, FOMC, Open-market operations.
  - `macro-8-lesson-4` Crypto vs. Cash vs. Credit — Digital money realities. Try: line-item-sort. Role: Payments Product Manager. Cards: Cryptocurrency, Stablecoin, CBDC, Settlement.

#### Businesses & Competition (4 units, 16 lessons) — replaces the 1 stub unit

Replace `businesses-competition` 1 stub unit ([ap-business-curriculum.ts](src/data/market-intelligence/ap-business-curriculum.ts)) with 4 full units.

- **biz-1 Value Creation & Vision** `[+4]`
  - biz-1-1 Problem → Solution Fit · biz-1-2 Value Proposition · biz-1-3 Mission, Vision, Mandate · biz-1-4 Stakeholders & Trade-offs
- **biz-2 Competitive Strategy & Moats** `[+4]`
  - biz-2-1 Cost Leadership · biz-2-2 Differentiation · biz-2-3 Network Effects · biz-2-4 Switching Costs
- **biz-3 Industry Forces** `[+4]`
  - biz-3-1 PESTEL Walkthrough · biz-3-2 Porter's Five Forces · biz-3-3 Industry Lifecycle · biz-3-4 Disruption Patterns
- **biz-4 Innovation, Ethics & Stakeholders** `[+4]`
  - biz-4-1 From Idea to MVP · biz-4-2 Business Ethics in Action · biz-4-3 Org Forms (LLC, C-Corp, B-Corp) · biz-4-4 Supply-Chain Risk & ESG

### 5.2 Ownership  → 4 existing + 6 new = 10 modules + 1 boss

Existing 4 in [ownership-lessons.ts](src/data/market-intelligence/ownership-lessons.ts) stay (Own a Piece, Time is Your Ally, The Patience Game, Mistakes That Matter). Add:

- **own-5 Diversification by Design** `[+1]` — Concepts: All eggs / Correlation basics / Lazy-portfolio templates. Try: slider-budget (3 sleeves). Role: Multi-Asset Allocator. Cards: Diversification, Correlation, Concentration risk, Three-fund portfolio.
- **own-6 Risk vs. Reward** `[+1]` — Concepts: Volatility ≠ risk / Risk capacity vs. tolerance / Drawdown math. Try: scenario-choice. Role: Risk Profiler. Cards: Volatility, Drawdown, Risk capacity, Risk tolerance.
- **own-7 Index Funds vs. Active** `[+1]` — Concepts: What an index is / Fee drag over decades / Active hard, not impossible. Try: compound-compare (fees over 30 years). Role: Index Fund PM. Cards: Index, Expense ratio, Tracking error, Active management.
- **own-8 Dividends & Reinvestment** `[+1]` — Concepts: What a dividend is / DRIP magic / Growth vs. dividend stocks. Try: compound-compare (DRIP on/off). Role: Dividend Income Analyst. Cards: Dividend, Yield, DRIP, Payout ratio.
- **own-9 Tax-Smart Ownership** `[+1]` — Concepts: Roth IRA basics / 401(k) match = free money / Cap-gains short vs. long. Try: line-item-sort (which account holds what). Role: Tax-Aware Advisor. Cards: Roth IRA, Employer match, Capital gains, Tax-loss harvesting.
- **own-10 Reading Your Portfolio** `[+1]` — Concepts: Allocation pie / Rebalancing rules / When to act, when not to. Try: scenario-choice. Role: Wealth Operations Analyst. Cards: Allocation, Rebalance, Drift, Statement.

**Ownership Boss Game** — see §6.2.

### 5.3 Language of Finance  → 8 existing + 6 new = 14 modules + 1 boss

Career-half rewrite from `buildTierBLesson` stubs to full lessons:

- **lof-1 Who's at the Table** _(rewrite from stub)_
- **lof-2 The Network Effect** _(rewrite from stub)_
- **lof-3 Speaking the Language** _(rewrite from stub)_
- **lof-4 From Learner to Insider** _(rewrite from stub)_

Accounting-half already full (Income Statement Decoded, Balance Sheet Basics, Cash Flow Statement, Ethics in Accounting). Each gets a §4 polish pass.

Add 6 new modules:

- **lof-9 Margins & Ratios Decoded** `[+1]` — Gross / operating / net margin, current ratio, debt-to-equity. Try: line-item-sort. Role: Equity Analyst.
- **lof-10 Valuation Basics** `[+1]` — P/E, market cap, enterprise value, comp tables. Try: compound-compare (P/E for two co's). Role: M&A Analyst.
- **lof-11 Risk & Beta** `[+1]` — Beta = market sensitivity, alpha, Sharpe ratio (1-line). Try: term-classify (high-beta vs. low-beta). Role: Risk Quant.
- **lof-12 Debt & Credit Language** `[+1]` — Bond basics, coupon, yield, credit rating. Try: role-match. Role: Credit Analyst.
- **lof-13 Earnings Season Glossary** `[+1]` — Beat/miss/in-line, guidance, forward P/E. Try: headline-decoder. Role: Earnings Reporter.
- **lof-14 M&A and IPO Vocabulary** `[+1]` — IPO, SPAC (in 1 line), strategic vs. financial buyer, lock-up. Try: term-classify. Role: IB Associate.

**LoF Boss Game** — see §6.3.

### 5.4 Markets & Headlines  → 4 stubs rebuilt + 4 new = 8 modules + 1 boss + Daily Drill

Today: 4 modules in catalog, all `ModuleCard` "Mark as Complete" stubs ([MarketsHeadlinesView.tsx](src/components/learn/market-intelligence/MarketsHeadlinesView.tsx)). Rebuild them as full `MILesson`s and add 4 new modules:

- **mh-1 Headline Decoder** _(rebuild)_ — Concepts: Headline anatomy / Active verbs that mislead / Hidden context. Try: headline-decoder. Role: Financial Reporter.
- **mh-2 Noise vs. Signal** _(rebuild)_ — Concepts: Why most news doesn't move prices / The 5% that does / Building a filter. Try: term-classify. Role: Buy-Side Analyst.
- **mh-3 The Earnings Call** _(rebuild)_ — Concepts: Report structure / Numbers that matter / Reading guidance. Try: line-item-sort (slot Q3 earnings excerpts). Role: Sell-Side Analyst.
- **mh-4 Market Mood** _(rebuild)_ — Concepts: Fear & Greed / Why crashes overshoot / Contrarian basics. Try: scenario-choice. Role: Sentiment Trader.

New:
- **mh-5 Product Launch Hype** `[+1]` — Concepts: Pre-launch run-up / Sell-the-news / Real-vs-vapor demand. Try: headline-decoder. Role: Tech Equity Analyst.
- **mh-6 Regulation Shockwaves** `[+1]` — Concepts: FTC/SEC/EU moves / Sectors hit hardest / Long-tail vs. one-day reaction. Try: scenario-choice. Role: Policy Risk Analyst.
- **mh-7 PR & Reputation Crises** `[+1]` — Concepts: Brand damage timeline / Recoverable vs. lasting hits / How to spot real vs. manufactured outrage. Try: term-classify. Role: Crisis Comms Lead.
- **mh-8 The Fed Speaks** `[+1]` — Concepts: FOMC days / Powell's dot plot / Why "hawkish hold" is a thing. Try: headline-decoder. Role: Fed Watcher.

Plus a small recurring **Daily Headline Drill** widget on the Headlines section page (1 headline / day, signal-vs-noise, 30-sec snack — feeds dashboard streak).

**Headlines Boss Game** — see §6.4.

### 5.5 Business Foundations  → 8 stubs rebuilt + 12 new = 20 modules across 5 units

Today: 2 stub units in [ap-business-foundations.ts](src/data/market-intelligence/ap-business-foundations.ts) (Marketing, Management). Replace with 5 units × 4 lessons each:

#### Marketing track (3 units, 12 lessons)
- **bf-mkt** (rewrite the existing 4 from stubs): Customer Profiles & Segmentation · Market Research & Data · Product & Pricing Strategy · Channels, Promotion & CAC.
- **bf-brand** `[+4]` — Brand Identity · Positioning · Storytelling · Trust & Loyalty.
- **bf-digital** `[+4]` — Funnel Basics · Content & SEO · Paid Social & Search · Analytics & Attribution.

#### Management track (3 units, 12 lessons)
- **bf-mgmt** (rewrite the existing 4 from stubs): Leadership Styles & Teams · KPIs & Performance · Decision Making & Opportunity Cost · SWOT & Five Forces.
- **bf-ops** `[+4]` — Process Design · Quality & Six-Sigma-Lite · Supply Chain Ops · Capacity Planning.
- **bf-org** `[+4]` — Org Charts & Spans · Culture Building · Change Management · Hiring & Retention.

#### Entrepreneurship (new unit, 4 lessons)
- **bf-ent** `[+4]` — From Idea to MVP · Validating Customers · Bootstrapping vs. Fundraising · Building Your First Team.

(Each lesson follows the §4 schema. Full per-lesson specs live in `lessons/business-foundations/*.md`.)

### 5.6 Company Tinder  → add Boss Mode + cross-section signal

[CompanyTinderView.tsx](src/components/learn/market-intelligence/CompanyTinderView.tsx) stays. Two additions:
- **Boss Mode** — appears as a 6th game-mode card, unlocked when Markets & Headlines + Ownership + LoF are all 100%. 10 companies, mixed lifecycle, mixed macro backdrop. Single score 0–100, 3 tiers (Bronze / Silver / Gold panda).
- **"Why this card matters" footer** — when a lifecycle / sector / debt-level badge shows up, a tiny "Learn this" link opens the lesson that taught it (uses `consumeDashboardDeepLink`).

### 5.7 Grand totals

- **Business Economics:** 80 lessons (40 existing + 40 new), 1 boss
- **Ownership:** 10 lessons (4 existing + 6 new), 1 boss
- **Language of Finance:** 14 lessons (8 polished + 6 new), 1 boss
- **Markets & Headlines:** 8 lessons (4 rebuilt + 4 new), 1 boss + Daily Drill
- **Business Foundations:** 20 lessons (8 rewritten + 12 new), no boss (Tinder Boss Mode covers practice)
- **Company Tinder:** +1 Boss Mode

**~140 production-ready Phil-voiced lessons + 4 boss games + 1 daily-drill widget.**

---

## 6. Boss Game Designs (Full Mechanics)

> Full UX + state machine + reward matrix in `_boss-games.md`. Summary below.

All 4 boss games share:
- Same chrome as `LessonStepShell` (consistent exit, progress, safe-area).
- Unlocked when their section is 100% lessons complete (gate fires from existing `useMarketIntelligenceProgress.getSectionProgress`).
- Reward: +100 bamboo, +25 XP, "Boss panda" badge, dashboard event `daily_goal` type `boss`.
- Replayable; first clear awards the bonus.

### 6.1 Phil's Economic Weather Report (Business Economics)

Premise: Phil is a TV weather anchor delivering an economic forecast. The learner is the producer choosing what to put on screen.

Loop (6 "segments"):
1. A macro/micro headline drops ("Fed hikes 25bps" / "Oil supply shock" / "Major retailer raises prices").
2. Pick the **forecast graphic** (4 options: Sunny / Cloudy / Storm / Heatwave) that matches the impact.
3. Pick the **sector ticker** that "tends to win" (4 options).
4. Phil "goes live" — animated reaction; correct gets a Bronze/Silver/Gold sun.

Scoring: 6 segments × 2 picks = 12 calls. ≥9 = Gold, 7–8 = Silver, 5–6 = Bronze, <5 = retry.

UI cues: weather-map background, ticker tape at bottom, Phil avatar in TV frame.

### 6.2 Phil's 10-Year Challenge (Ownership)

Premise: Compress 10 years into 10 turns. Each turn = 1 year of headlines.

Loop:
- Start with $1,000 + $50/month auto-invest.
- Each year, see 2 headlines (1 macro + 1 portfolio).
- Choose: **Stay**, **Add Cash**, **Sell**, or **Rebalance**.
- After each choice, year ends — portfolio is recalculated using realistic-feeling annualized returns (random within historical bands).

Scoring: Final dollar value + 4 "Behavior" stars (Patience, Diversification, Cost-discipline, No-panic). Gold = both top quartile.

UI cues: Bamboo Empire bank-vault skin; the empire grows visually each year you don't bail out.

### 6.3 Phil's Boardroom (Language of Finance)

Premise: You're the junior analyst presenting a deal to the investment committee.

Loop (3 rounds):
1. Read a 1-paragraph deal brief.
2. The senior PM fires 3 questions ("What's the EBITDA margin?" "What's your case for FCF growth?" "Why this multiple?"). 4 multiple-choice options each.
3. Pick the closing recommendation: **Approve**, **Pass**, or **Defer for diligence**.

Scoring: 9 question picks + 3 closes = 12 calls. Bonus stars for using the right vocabulary (the chosen options that include the precise term get a "Sharp" tag).

UI cues: Wood-grain conference-table table-skin; Phil sits at head of table, other "analysts" are panda silhouettes.

### 6.4 Phil's News Room (Markets & Headlines)

Premise: You're the editor at the Bamboo City Financial Times. Headlines crash the wire — sort them before the broadcast.

Loop (3 minutes, rapid-fire):
- Headlines fly in (1 every 8 seconds).
- Swipe **Above the Fold** (signal), **Below the Fold** (noise), **Spike It** (clickbait/fake).
- Get instant micro-feedback ("Spike — that was a meme account") with a -/+ score.

Scoring: 20 headlines, weighted. Gold ≥85%, Silver ≥70%, Bronze ≥55%.

UI cues: newsprint conveyor belt, vintage typewriter sound effect (opt-in), Phil at editor's desk.

---

## 7. Cross-Cutting Systems

These are small but matter — without them new lessons don't show up in the surrounding app.

### 7.1 Module catalog stays the source of truth

- All new modules added to [src/data/market-intelligence/catalog.ts](src/data/market-intelligence/catalog.ts) with `order`, `difficulty`, `learningPoints`, `rewards`.
- `getNextIncompleteModule` in [useMarketIntelligenceProgress.ts](src/hooks/useMarketIntelligenceProgress.ts) — extend `sectionOrder` to include `business-foundations` (currently missing → falls to `99` → bad continue routing).

### 7.2 Lesson registries

- Ownership lesson registry: [ownership-lessons.ts](src/data/market-intelligence/ownership-lessons.ts) export already does `Map<moduleId, MILesson>`. New ownership lessons just push into `ownershipLessons[]`.
- LoF: same pattern in [language-of-finance-lessons.ts](src/data/market-intelligence/language-of-finance-lessons.ts) — replace stubs, push new lessons.
- Headlines: introduce a new `headlines-lessons.ts` mirroring the LoF pattern; wire `MarketsHeadlinesView` to use the lesson container instead of the placeholder `ModuleCard.onComplete` flow.
- Business Foundations + Businesses & Competition: continue using `EconomicsUnit` + `buildStubLesson` pattern, but replace `buildStubLesson(...)` calls with fully-typed `EconomicsLesson` literals (the `EconomicsLessonContainer` already auto-detects enriched vs. legacy lessons via `isEnrichedMicroLesson`).

### 7.3 Flashcards index

- [mi-flashcard-unlocks.ts](src/data/market-intelligence/mi-flashcard-unlocks.ts) already unlocks per-lesson. Extend `getFlashcardPrefix` / `getFlashcardCategory` so:
  - `language-finance` → `mi-lof` / `Language of Finance`
  - `ownership` → `mi-ownership` / `Ownership`
  - `markets-headlines` → `mi-headlines` / `Markets & Headlines` _(new)_
  - `business-foundations` → `mi-bf` / `Business Foundations` _(new)_
- Boss game completion unlocks a special "Boss Set" card category.

### 7.4 Dashboard / streak / careers tie-ins

- `recordPathTouched('companyDiscovery')` is already fired by [MarketIntelligenceTab.tsx](src/components/learn/MarketIntelligenceTab.tsx). No change.
- `emitDailyGoalEvent` is fired by `completeModule`. Boss games also call `emitDailyGoalEvent({ type: 'boss', pathId: 'company-discovery', bossId })`.
- [finance-careers.tsx](src/data/finance-careers.tsx) `levels` strings can deep-link from `Connect → On the job`. Add a `careerId` field to `MILessonConnect.career` so the chip can route into the Careers tab.

### 7.5 Phil chat hooks

- [PhilChatAssistant.tsx](src/components/ai/PhilChatAssistant.tsx) currently has no MI context. Add a small lesson-aware context provider: when the user is inside a lesson, Phil's system prompt includes the lesson title + current step so "what did this mean?" answers stay in-scope.

### 7.6 Image assets

- Every concept needs a PNG illustration; we have many already under `public/market-intelligence/`. Auditing: roughly 60 lessons × 4 visuals (hero + 3 concepts + connect-pf + connect-career = 6) = ~360 new images for the new lessons. Use the [.cursor/skills/panda-image-style/SKILL.md](.cursor/skills/panda-image-style/SKILL.md) skill for every generation to keep the green-panda look unified.
- Two safety nets already in place: [LessonVisualImage.tsx](src/components/learn/market-intelligence/lesson/LessonVisualImage.tsx) renders a styled placeholder if a PNG 404s, so we can ship lessons before all art is generated.

---

## 8. File / Folder Layout

```
.cursor/plans/market-intelligence/
  _lesson-template.md           # the master Markdown schema for every lesson script
  _voice-guide.md
  _design-system.md
  _boss-games.md
  _sample-lesson.md             # 1 fully-written sample (Production-ready depth)
  lessons/
    business-economics/
      micro/
        micro-6-lesson-1.md … micro-8-lesson-4.md      # 12 new micro lessons
      macro/
        macro-6-lesson-1.md … macro-8-lesson-4.md      # 12 new macro lessons
      businesses-competition/
        biz-1-1.md … biz-4-4.md                         # 16 lessons
    ownership/
      own-5-diversification.md … own-10-reading-your-portfolio.md  # 6 new
    language-finance/
      lof-1-whos-at-the-table.md … lof-14-ma-ipo-vocab.md          # 4 rewrites + 6 new
    markets-headlines/
      mh-1-headline-decoder.md … mh-8-fed-speaks.md                # 4 rebuilds + 4 new
    business-foundations/
      marketing/    bf-mkt-1.md … bf-digital-4.md                  # 12 lessons
      management/   bf-mgmt-1.md … bf-org-4.md                     # 12 lessons
      entrepreneurship/ bf-ent-1.md … bf-ent-4.md                  # 4 lessons
  boss-games/
    economic-weather-report.md
    ten-year-challenge.md
    boardroom.md
    news-room.md

src/data/market-intelligence/         # populated from the markdown files
  catalog.ts                          # extended with all new module entries
  ownership-lessons.ts                # 6 new MILesson literals appended
  language-of-finance-lessons.ts      # 4 rewrites + 6 new MILesson literals
  headlines-lessons.ts                # NEW — 8 MILesson literals
  business-foundations/               # NEW folder, 1 file per unit
    marketing.ts management.ts branding.ts digital.ts ops.ts org.ts entrepreneurship.ts
  businesses-competition/             # NEW folder, 1 file per unit
    biz-1.ts biz-2.ts biz-3.ts biz-4.ts
  microeconomics/                     # NEW folder for the 3 new micro units
    micro-6.ts micro-7.ts micro-8.ts
  macroeconomics/                     # NEW folder for the 3 new macro units
    macro-6.ts macro-7.ts macro-8.ts
  boss-games/
    weather-report.ts ten-year.ts boardroom.ts news-room.ts
src/components/learn/market-intelligence/
  shell/                              # the new unified shell components (§3.2)
  lesson/try/                         # add HeadlineDecoderTry.tsx, SliderBudgetTry.tsx
  boss/                               # 4 boss game components, share BossShell
```

The per-lesson markdown files in `.cursor/plans/market-intelligence/lessons/**/` are written **before** the TypeScript so each lesson can be reviewed/edited as plain prose (much faster than scanning TS literals). A small script `scripts/mi/build-lessons.ts` reads the markdown front-matter and concept blocks and emits the TS — but the TS files are also hand-editable; the script is just a starter.

---

## 9. Lesson File Template (every lesson follows this exactly)

The template (also in `_lesson-template.md`) is YAML front-matter + structured prose so it can be authored by hand and rendered or compiled later.

```markdown
---
id: lof-9-margins-ratios
moduleId: margins-ratios-decoded
section: language-finance
title: Margins & Ratios Decoded
estimatedMinutes: 10
difficulty: Intermediate
rewards: { bamboo: 20, xp: 4 }
heroImage: /market-intelligence/language-finance/margins-ratios-decoded/hero.png
connectCareerRole: Equity Analyst
careerId: corporate-finance
tryType: line-item-sort
flashcardTerms: [Gross margin, Operating margin, Current ratio, Debt-to-equity]
---

## Hook
<55-word real teen-life scene that sets up the lesson.>

## Phil's Message
<2-sentence promise + takeaway, second-person.>

## Concept 1 — <Title ≤ 6 words>
**Explanation.** <3 short sentences, 45–70 words.>
**Example.** <1 sentence, ≤30 words.>
**Visual.** /market-intelligence/<section>/<lesson-id>/concept-<slug>.png
**Visual alt.** <description for screen readers + image gen prompt seed>
**Key term.** Gross margin

## Concept 2 — …
## Concept 3 — …

## Try Activity — <Title>
**Description.** <≤25 words>
**Buckets / Categories / Roles / Rounds.** (depends on type)
- (full item list)

## Connect — Your money
<50–70 words>
**Scenario.** <25–40 words>
**Visual.** /…/connect-pf.png

## Connect — On the job
**Role.** Equity Analyst
**Skills.** Excel modeling, Ratio analysis, Margin trend reading
<40–60 words>
**Visual.** /…/connect-career.png

## Review — Flashcards
1. **Gross margin** — <def ≤25 words> · *Phil's analogy:* <≤22 words>
2. **Operating margin** — …
3. **Current ratio** — …
4. **Debt-to-equity** — …

## Check — Quiz
1. **Q:** <stem>
   - A) … B) … C) … D) …
   - **Correct.** <letter>  **Explanation.** <≤25 words>
2. <recall>  3. <example-spotting>  4. <synthesis>
```

A complete worked example of this template (a fully written lesson — `lof-9-margins-ratios.md`) ships as `_sample-lesson.md` in the same folder so reviewers can sanity-check tone, length, and depth before the rest are written.

---

## 10. Implementation Sequencing & Rollout

Logical batches. Each batch is independently shippable, no batch breaks existing lessons.

### Batch A — Foundations & sample (no curriculum content yet)
1. Create the `.cursor/plans/market-intelligence/` companion files (`_voice-guide`, `_design-system`, `_lesson-template`, `_boss-games`, `_sample-lesson`).
2. Build the unified shell components in `src/components/learn/market-intelligence/shell/` and refactor all 5 section views to use them. Delete deprecated `theme` enum + bespoke module cards.
3. Patch `useMarketIntelligenceProgress.sectionOrder` to include `business-foundations`. Patch `mi-flashcard-unlocks` to recognize all 5 sections. Add lesson-resume `localStorage`.
4. Add the 2 new Try-activity types (`headline-decoder`, `slider-budget`) and their renderers under `lesson/try/`.

### Batch B — Markets & Headlines (highest leverage: currently most broken)
5. Write the 8 lesson markdown files + render-art for hero + concept visuals.
6. Materialize `src/data/market-intelligence/headlines-lessons.ts` + extend `catalog.ts`.
7. Convert [MarketsHeadlinesView.tsx](src/components/learn/market-intelligence/MarketsHeadlinesView.tsx) from `ModuleCard` "Mark as Complete" to `MILessonContainer`.
8. Build the Daily Headline Drill widget on the Headlines section page.

### Batch C — Language of Finance polish + expansion
9. Rewrite the 4 career-half stubs to full `MILesson`s. Polish the 4 existing accounting lessons to §4 budgets.
10. Write the 6 new modules (lof-9 … lof-14). Extend catalog & registry.

### Batch D — Ownership expansion
11. Write the 6 new Ownership modules. Extend catalog & registry.
12. Land the **10-Year Challenge** boss game (Batch H ships all 4 boss games together; if we want to ship them sectionally, this is the most natural first one).

### Batch E — Business Foundations rebuild
13. Replace [ap-business-foundations.ts](src/data/market-intelligence/ap-business-foundations.ts) stubs with the 8 rewritten lessons.
14. Add the 3 new units (Branding, Digital, Ops, Org, Entrepreneurship = 12 lessons, split across 3 new files under `src/data/market-intelligence/business-foundations/`).

### Batch F — Businesses & Competition rebuild
15. Replace [ap-business-curriculum.ts](src/data/market-intelligence/ap-business-curriculum.ts) 1-stub-unit with 4 full units (16 lessons) under `src/data/market-intelligence/businesses-competition/`.

### Batch G — Microeconomics & Macroeconomics expansion
16. Add 3 micro units (12 lessons) and 3 macro units (12 lessons). Wire into existing `enrichMicroeconomicsUnits` / `enrichMacroeconomicsUnits` enrichment functions.
17. Optional: extend [economics-simulators](src/data/economics-simulators/index.ts) with sims for micro-6 (cost curves) and macro-6 (cycle dashboard) — nice-to-have, not blocking.

### Batch H — Boss Games
18. Build the shared `BossShell` component.
19. Build the 4 boss games (Weather Report, 10-Year Challenge, Boardroom, News Room). Each unlocks via `getSectionProgress`. Each fires `emitDailyGoalEvent`.

### Batch I — Tinder & cross-section systems
20. Add Tinder Boss Mode (6th game card; unlock = Headlines + Ownership + LoF all 100%).
21. Add the "Learn this" footer on Tinder cards (deep-link into the lesson that taught the badge).
22. Wire Phil chat lesson-context provider.

### Batch J — Image asset pass
23. Generate all hero + concept + connect PNGs in the panda-style for new lessons. Use the panda-image-style skill. (Lessons render with placeholder until art lands.)

### Batch K — QA & launch
24. Per-lesson script audit (voice, budgets, accuracy, factual-claim check on any specific historical/policy numbers).
25. Mobile + Capacitor pass (iOS notch, Android safe areas, drag fallback for Try activities).
26. Accessibility pass (image alt text, focus order in Try activities, color-blind-safe accent palettes).
27. Demo script for the pilot — show: header → unified card grid → pick lesson → 7-step flow → boss unlock animation.

---

## 11. Risks & Trade-offs (worth flagging up front)

- **Volume.** ~140 production-ready lesson scripts is a lot of writing. The per-lesson markdown approach lets us parallelize and review in small chunks, but expect this to be 8–10 multi-lesson batches after approval.
- **Tone drift.** Without a strict voice guide and the §4 word budgets, 140 lessons by 1 writer will start to ramble. `_voice-guide.md` + budgets are the guardrail.
- **Imagery throughput.** ~360 new illustrations is the long-pole on calendar time. The `LessonVisualImage` placeholder means we can ship lessons before art catches up; we just need a tracking checklist.
- **Boss-game scope.** The Weather Report and 10-Year Challenge are the heaviest; if calendar tightens, ship the Boardroom and News Room first (lower mechanic complexity).
- **Pilot vs. final.** If the Pilot needs to demo *less,* the natural cut is Batches A + B + D + H-partial (10-Year Challenge) — those alone make the tab feel finished for a pilot audience.

---

## 12. What changes about the user experience (the punch line)

Today, opening Market Intelligence shows 6 sub-tabs of varying polish — Ownership and the income statement lesson feel like a product; Headlines and Foundations feel like a sketch. After this plan:

- Every sub-tab opens to the same calm, sage/emerald section page (with a small accent that signals which section you're in).
- Every module card looks the same, hits the same rhythm, and tells you exactly what you'll learn and how long it takes.
- Every lesson runs the same 7-step beat: scene → 3 concepts → try → why it matters to your money and a real career → 4 flashcards → 4 questions → win screen. No surprises about structure; all the variety is in the content.
- Every section ends in a Boss Game with personality — Phil on TV, Phil in the boardroom, Phil at the editor's desk, Phil running your portfolio for a decade — turning quiz answers into stories the learner remembers.
- Company Tinder gains a Boss Mode that pulls vocabulary, sector reads, lifecycle judgment, and macro awareness all into one swipe deck — proving everything they learned in one place.
