# Comic background prompts - Wealth Fundamentals module

**Module:** Wealth Fundamentals  
**Sources:** `src/data/personal-finance/wealth-fundamentals/lesson-*.ts`

Use the **system brief** below when asking an AI to generate more panels. The panel prompts match the Saving, Investing, and Credit & Debt comic style.

---

## System brief (designer agent)

Create production-ready image-generation prompts for a teen-friendly financial literacy comic. Every panel should feel like the existing Phil's Financials comic strips: soft mint background, rounded green props, warm classroom-card lighting, simple visual metaphor, and a friendly green panda character based on the app logo.

**Rules:**

- Include the Phil-style green panda in every panel.
- One clear idea per image.
- Minimal readable text only when useful; the app's speech bubble carries the lesson.
- No humans, no non-panda animals, no real brands, no celebrity likenesses, no gambling imagery.
- Use generic assets, jars, gauges, paths, clocks, shields, roots, calendars, and checkmarks.

**Style lock:**

> 16:9 comic panel illustration only, matching the provided Phil's Financials screenshots: soft mint background, rounded black panel-safe composition, friendly green panda character based on the app logo, bright green body, dark green ears and eye patches, cream face, glossy eyes, simple financial mark on belly if possible, warm clean lighting, rounded green classroom props, no outer comic card, no speech bubble, no part label, no humans, no non-panda animals, no real brands, minimal readable text.

---

## Lesson 1 - What Wealth Actually Is

1. **Panel 1:** Phil stands beside two streams: one paycheck stream and one asset garden that keeps growing, showing income versus wealth.
2. **Panel 2:** Phil compares a flashy spending cart that drains coins with a quiet savings-and-investing jar that grows sprouts, showing high income does not guarantee wealth.
3. **Panel 3:** Phil builds a net-worth tower from rounded asset blocks while gently removing liability blocks from the other side.
4. **Panel 4:** Phil connects savings, investments, skills, and planning icons into a calm shield-shaped system, showing resilience and long-term freedom.

---

## Lesson 2 - Systems Thinking and Compounding Habits

1. **Panel 1:** Phil sets up a friendly routine machine with simple rule cards and arrows, showing systems guide behavior without constant decisions.
2. **Panel 2:** Phil waters tiny habit sprouts that grow into a bamboo-like forest of coins and checkmarks, showing compounding habits over time.
3. **Panel 3:** Phil lets automatic transfer arrows move coins into savings and investing jars while a fading motivation cloud floats away.
4. **Panel 4:** Phil watches a progress gauge and growing jar create a positive feedback loop, with small wins turning into forward momentum.

---

## Lesson 3 - Risk Across Life Stages

1. **Panel 1:** Phil studies a timeline where early bumps are small and recoverable, while later bumps sit closer to important goal flags.
2. **Panel 2:** Phil uses a big clock and young plant to show time helping investments recover and calculated risks grow.
3. **Panel 3:** Phil adjusts a portfolio balance board as icons for home, family, health, and responsibility appear, showing risk changes with life stage.
4. **Panel 4:** Phil compares a capacity backpack and an emotion meter, then chooses a balanced path that adjusts with age, goals, and responsibilities.

---

## After you generate images

1. Export consistent 16:9 PNGs to match [`ComicPanel`](src/components/comic/ComicPanel.tsx) in [`MicroLessonComic`](src/components/personal-finance/MicroLessonComic.tsx).
2. Save generated PNGs as **`public/comic/wealth-fundamentals/lesson-1/panel-1.png`** through **`public/comic/wealth-fundamentals/lesson-3/panel-4.png`**.
3. The app loads these URLs for `wealth-fundamentals-1` through `wealth-fundamentals-3` in [`src/data/personal-finance/comicPanelBackgrounds.ts`](src/data/personal-finance/comicPanelBackgrounds.ts).
