# Founder Journey curriculum and classroom integration

The journey now contains three sections, six modules, and three lessons per module (18 lessons). Each lesson retains the five-panel comic → three-decision simulator → four-question check → Teach Phil → canvas → completion/reward sequence. A 75% knowledge-check score is required to proceed.

## Learning route

| Section | Module | Lessons |
| --- | --- | --- |
| Discover Real Demand | From Idea to MVP | From Idea to MVP; Find a Problem Worth Solving; Design Your First Experiment |
| Discover Real Demand | Validating Customers | Validating Customers; Run a Useful Customer Interview; Read Evidence and Choose a Pivot |
| Build a Viable Business | Money & Funding | Bootstrapping vs. Fundraising; Costs, Cash Flow, and Runway; Choose Funding Without Losing the Plan |
| Build a Viable Business | Pricing & First Sales | Price an Offer Customers Understand; Reach Buyers and Make a First Sale; Deliver Value and Earn Repeat Customers |
| Launch with Purpose | Building Your First Team | Building Your First Team; Agree on Roles and Expectations; Disagree, Learn, and Build Trust |
| Launch with Purpose | Launch & Learn | Plan a Small, Responsible Launch; Measure Results and Improve; Build Your Seven-Day Founder Plan |

Allow roughly 18 minutes per lesson, with additional discussion and practical work at the instructor’s discretion. The four original mission IDs remain unchanged and count as completed lessons when restoring existing saved progress. Previously completed lessons remain reviewable; newly added lessons require their own completion. Overall completion is recalculated against 18 lessons rather than four.

All lessons reuse the original 20 images. Every panel now includes an explanation, a worked example or application, and a takeaway beneath the image. Illustrations are not altered. New lessons have distinct decisions, checks, and Teach Phil rubrics; they do not reuse generic career content.

## Introduction and student plan

A four-step Phil introduction appears on first entry, explains the structure and learning flow, and is saved per account on the current browser. “Journey Intro” replays the guide. The guide is dismissible; it is separate from app onboarding.

The nine canvas blocks remain the same. Later lessons revisit and refine appropriate blocks. Lesson-specific prompts are displayed while working through that lesson. Answers save while typing to account-scoped browser storage. Completed lessons reopen at the comic, and reviewing does not issue another completion reward. Earned Teach Phil bonus data saves with the lesson so resuming at the canvas does not lose that bonus. Printing opens a dedicated nine-block plan rather than printing the full app dashboard.

Founder Teach Phil requests an explanation rather than allowing an optional skip. If the AI is unavailable, a student must write a minimum-length, ungraded reflection before proceeding. Such a reflection does not establish an AI-assessed pass or earn the Teach Phil bonus. Other learning tracks retain their existing optional Teach Phil behavior.

## Teacher connection

Student changes call the existing `sync_module_progress` RPC with `module_type = founder-journey`. Six rows represent the six modules. Each percentage aggregates its three lessons, including in-progress activity milestones. Reaching the reward screen alone does not mark a module 100%; every lesson must complete its final action. This reuses the existing classroom authorization and progress tables; no new database migration is required.

Teacher curriculum registration contains the same six module IDs. Founder activity appears in the classroom module matrix, roster aggregates, student-detail module progress, class insights, and report labels. Existing Teach Phil sessions use stable `founder-<lesson-id>` IDs and receive human-readable lesson names in report generation. Teacher preview fixtures include the Founder track for local verification and are sample data.

Queued progress records carry their account owner. A batch queued by one student is discarded if a different student has signed in before the flush; it is never attributed to the new student. The original account’s browser progress is retained and requeued when that account opens the journey again.

## Research and instructional choices

Reviewed October 12, 2026. The examples, calculations, scenarios, and student wording are original adaptations for this curriculum. Small-sample limits and honest delivery commitments accompany the examples.

- [The Lean Startup: Methodology](https://theleanstartup.com/principles): experimental learning, MVPs, measurement, and revising assumptions.
- [SBA: Market research and competitive analysis](https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis): demand, pricing, customer research, and competing alternatives.
- [SBA: Fund your business](https://www.sba.gov/business-guide/plan-your-business/fund-your-business): internal resources, loans, equity, and control/risk tradeoffs.
- [Y Combinator: Co-founder compatibility](https://www.ycombinator.com/blog/co-founder-matching/): testing working compatibility with a bounded project and clear expectations.

Examples distinguish revenue, contribution, operating profit, and cash timing. Dilution uses a simplified ownership model; investor rights depend on terms. Experiment thresholds are example decision rules, not universal benchmarks. The course provides practice rather than a promise of business success or instructions to take financial or legal commitments without appropriate support.

## Current limits

- Canvas answers and lesson resume state remain browser-local, per account. Teacher sync transmits module percentages and lesson-stage metadata, not the student’s canvas text.
- The current teacher RPCs do not expose Founder quiz answer selections or offline reflections. Founder progress and existing AI assessments are the available classroom signals. Individual quiz-answer reporting requires a separate backend feature; no unsupported report API is assumed here.
- Existing classroom tables and `sync_module_progress` must already be installed in the connected Supabase project, as required by the teacher dashboard before this change.
- `/learn-preview`, `/founders-preview`, and teacher preview fixtures remain gated to development builds. Production uses normal signed-in app routes.

## Verification

- All 85 automated tests passed; production build and targeted ESLint passed.
- Headless Chromium completed all 18 lesson flows at 390px, tested a failed 50% quiz and a passing 75% quiz, persisted/replayed the introduction, saved all nine canvas blocks, and reopened completed lessons for review.
- Desktop at 1440px and phone at 390px were checked for horizontal overflow. The teacher preview’s Founder matrix and student-detail progress were exercised. No runtime page errors were reported.
- The connected progress RPC exists and rejects unauthenticated requests as expected. Account ownership, payload IDs, and failure/retry behavior were tested without creating real classroom records.
- Production output excludes the development-only Learn and Founder preview routes.
- Repository-wide `tsc` still reports errors in existing career, game, and other unrelated files; none were reported in the changed Founder or teacher files. The production bundler and requested checks pass.
