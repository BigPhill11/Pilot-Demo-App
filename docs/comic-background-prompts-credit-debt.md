# Comic background prompts - Credit & Debt module

**Module:** Credit & Debt  
**Sources:** `src/data/personal-finance/credit-debt/lesson-*.ts`

Use the **system brief** below when asking an AI to generate more panels. The panel prompts match the Saving and Investing comic style.

---

## System brief (designer agent)

Create production-ready image-generation prompts for a teen-friendly financial literacy comic. Every panel should feel like the existing Phil's Financials comic strips: soft mint background, rounded green props, warm classroom-card lighting, simple visual metaphor, and a friendly green panda character based on the app logo.

**Rules:**

- Include the Phil-style green panda in every panel.
- One clear idea per image.
- Minimal readable text only when useful; the app's speech bubble carries the lesson.
- No humans, no non-panda animals, no real brands, no celebrity likenesses, no gambling imagery.
- Use generic cards, documents, score gauges, calendars, shields, jars, paths, and checkmarks.

**Style lock:**

> 16:9 comic panel illustration only, matching the provided Phil's Financials screenshots: soft mint background, rounded black panel-safe composition, friendly green panda character based on the app logo, bright green body, dark green ears and eye patches, cream face, glossy eyes, simple financial mark on belly if possible, warm clean lighting, rounded green classroom props, no outer comic card, no speech bubble, no part label, no humans, no non-panda animals, no real brands, minimal readable text.

---

## Lesson 1 - Managing Debt and Understanding Credit

1. **Panel 1:** Phil compares a borrowed-money agreement card with simple icons for interest, due date, and payment rules, showing debt has terms and obligations.
2. **Panel 2:** Phil builds a trust bridge made of on-time payment blocks, leading toward approval doors and lower-cost options.
3. **Panel 3:** Phil sorts two borrowing paths: one path grows a skill/tool plant, while the other path has a fading impulse purchase and heavier payment blocks.
4. **Panel 4:** Phil holds a simple rulebook and checklist beside a calm credit path, showing early understanding gives control and future access.

---

## Lesson 2 - Types of Debt and How to Use Them Wisely

1. **Panel 1:** Phil stands at a fork between productive debt, shown as a tool/school sprout, and consumptive debt, shown as a shrinking shiny item with payment tags.
2. **Panel 2:** Phil waters a training/tool investment that grows into future income arrows, while a small repayment calendar sits nearby.
3. **Panel 3:** Phil watches a convenience purchase fade while payment blocks remain stacked on the table, showing short-term spending with long-term pressure.
4. **Panel 4:** Phil uses a future-impact scale with icons for skills, stability, opportunity, and short-term feeling before choosing whether to borrow.

---

## Lesson 3 - How Credit Scores Work and Why They Matter

1. **Panel 1:** Phil points to a friendly credit score gauge connected to approval, cost, and access icons.
2. **Panel 2:** Phil stacks behavior blocks labeled by icons only: on-time payment, low balance, careful applications, forming a stronger score tower.
3. **Panel 3:** Phil walks through doors for housing, transportation, and insurance while a strong score key opens them smoothly.
4. **Panel 4:** Phil tends a slow-growing credit plant with repeated small checkmarks, showing scores improve through consistent habits over time.

---

## Lesson 4 - Paying Down Debt and Avoiding Traps

1. **Panel 1:** Phil shows a balance scale where payments must be bigger than the interest drops being added.
2. **Panel 2:** Phil compares two payoff maps: high-interest avalanche path and small-balance snowball path, both leading forward.
3. **Panel 3:** Phil points out a minimum-payment treadmill with fees and new borrowing blocks slowing progress.
4. **Panel 4:** Phil follows a written payoff plan with automatic payment arrows and clear goal flags, turning debt payoff into a structured path.

---

## Lesson 5 - Building Credit Responsibly Over Time

1. **Panel 1:** Phil builds a credit tower from repeated reliable behavior blocks: clock check, low balance, careful application.
2. **Panel 2:** Phil gently holds a small credit card next to a low utilization gauge and full-payment checkmark, showing control over spending.
3. **Panel 3:** Phil protects an older account tree with deep roots while new-account sprouts are added carefully, showing history matters.
4. **Panel 4:** Phil uses a strong credit key to open future doors for lower interest, easier approval, and more options, showing trust built before it is needed.

---

## After you generate images

1. Export consistent 16:9 PNGs to match [`ComicPanel`](src/components/comic/ComicPanel.tsx) in [`MicroLessonComic`](src/components/personal-finance/MicroLessonComic.tsx).
2. Save generated PNGs as **`public/comic/credit-debt/lesson-1/panel-1.png`** through **`public/comic/credit-debt/lesson-5/panel-4.png`**.
3. The app loads these URLs for `credit-debt-1` through `credit-debt-5` in [`src/data/personal-finance/comicPanelBackgrounds.ts`](src/data/personal-finance/comicPanelBackgrounds.ts).
