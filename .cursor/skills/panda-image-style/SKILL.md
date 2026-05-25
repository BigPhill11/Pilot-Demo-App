---
name: panda-image-style
description: >-
  Enforces the Phil's Financials green-panda visual style for all PNG and SVG
  image generation. Use when creating or editing illustrations, hero images,
  concept images, charts, diagrams, icons, or any PNG/SVG assets for this project.
---

# Panda Image Style

Apply these rules to **every** PNG and SVG created for Phil's Financials. Consistency across all assets is mandatory.

## Core principles

- **High school friendly**: warm, approachable, easy to read at a glance
- **Minimal information**: one clear idea per image — never cram multiple concepts in
- **Visual aid only**: the image supports the text below it; it is not a standalone lesson
- **Green pandas only**: every character is a green panda — no humans, no other animals
- **Reference format**: use the uploaded GDP classroom image as the house style — a large friendly green panda teacher beside a rounded green-framed whiteboard or classroom visual, with soft green background shapes and simple educational graphics.

## When to apply

Read this skill before generating or editing any of:

- Hero images (`hero.png`)
- Concept illustrations (`concept-*.png`)
- Connection images (`connect-career.png`, `connect-pf.png`)
- Economics/education SVGs (`public/economics/*.svg`)
- Market intelligence assets (`public/market-intelligence/**/*.png`)
- Any other PNG, SVG, or illustration in this project

---

## Color palette

Use only these brand colors. Match existing SVGs in `public/economics/`.

| Role | Hex | Usage |
|------|-----|-------|
| Background light | `#f0fdf4` | Flat backgrounds |
| Background gradient start | `#ecfdf5` | Gradient backgrounds |
| Gradient end | `#d1fae5` | Gradient backgrounds |
| Panda body | `#4ade80` | Main fur color |
| Panda body mid | `#22c55e` | Shading, secondary fills |
| Panda markings | `#16a34a` | Ears, limbs, patches |
| Panda markings dark | `#166534` | Eye patches, outlines |
| Chart lines / accents | `#059669`, `#047857`, `#0d9488` | Lines, bars, shapes |
| Title text | `#065f46` | Headings inside images |
| Label text | `#64748b` | Axis labels, captions |
| Face / belly | `#f0fdf4` | Panda face and belly |
| Highlight | `#f59e0b` | Single accent point only (e.g. equilibrium dot) |

Do not introduce new colors outside this palette unless the user explicitly requests it.

---

## Character system — green pandas only

All characters are **green pandas** matching the app logo (`/lovable-uploads/ae543fd6-94e8-4c76-a9aa-b6cb9460a647.png`).

### Shared anatomy (every panda)

- Round body, large head, short limbs
- Green body (`#4ade80`), dark-green eye patches (`#166534`)
- Cream/white face and belly (`#f0fdf4`)
- Large glossy eyes, rounded muzzle, small friendly smile
- Soft illustrated classroom style with gentle shadows, gradients, and board/prop details — not flat icon-only and not photorealistic

### Composition format

Default to the reference image layout for lesson assets:

- One large green panda teacher or guide on the left or foreground
- A rounded green-framed whiteboard, poster, tablet, or chart panel on the right/background
- Soft green gradient background with subtle abstract shapes
- The board contains the simple chart, formula, or visual metaphor
- Keep the image readable when small: big shapes, thick lines, short labels

### Allowed variations (accessories and proportions only)

| Variation | How to distinguish |
|-----------|-------------------|
| Boy | Baseball cap, energetic standing pose |
| Girl / female | Bow or ribbon on ear |
| Mother | Apron or floral accessory, gentle pose |
| Father | Necktie or collared shirt detail |
| Older person | Small round glasses, slightly shorter/stooped posture |
| Younger / child | Smaller body, proportionally larger eyes |

**Never** use human characters, realistic animals, emoji pandas, or non-green fur colors.

---

## Image types and content rules

### Hero images
- One panda (or small group of pandas) with a single symbolic prop related to the topic
- Short mood, no paragraphs of text in the image
- Generous whitespace, soft green gradient background

### Concept images
- Illustrate **one** concept only (e.g. "assets", "revenue", "compound interest")
- 1 panda + 1–2 simple visual metaphors (coin, chart snippet, building icon)
- No bullet lists, no multi-step flows

### Connection images (`connect-career`, `connect-pf`)
- Show a panda bridging two simple ideas (career ↔ finance topic, or personal finance ↔ lesson)
- Keep labels to 2–3 words max if text is needed at all

---

## Chart and diagram rules

Charts exist to **hint** at an idea — not to teach it fully.

### Keep it simple
- **Max 3–5** data points, labels, or segments
- **One** chart element per image (one bar chart OR one line OR one donut — not combined)
- Prefer direct labels on elements over a separate legend
- Title: 1–4 words only

### Allowed chart types
- Simple vertical/horizontal bar (2–4 bars)
- Single-line curve (supply, demand, growth)
- Donut or pie with 2–3 segments
- Stacked bar with labeled blocks (like GDP = C + I + G + NX)
- Icon grid (2–4 icons with short labels)

### Avoid
- Dual-axis charts, 3D effects, gridline clutter
- More than 5 tick marks on any axis
- Dense tables, footnotes, or paragraph captions inside the image
- Competing colors — stay in the green palette

### SVG technical defaults

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="[describe the visual]">
  <!-- soft green gradient background -->
  <!-- system-ui sans-serif fonts -->
  <!-- rounded stroke-linecap on lines -->
</svg>
```

- Font: `system-ui, sans-serif`
- Font sizes: title 14px, labels 11–12px
- Rounded corners on rects (`rx="6"`)
- Include `role="img"` and `aria-label` for accessibility

---

## Text in images

- **Minimal text** — the lesson text below the image carries the explanation
- If text is required: short labels only (1–3 words), never full sentences
- No instructions like "Step 1:", "First do this…"
- High contrast: dark green text on light green background

---

## PNG generation prompts

When using an image generation tool, prepend this style block to every prompt:

```
Phil's Financials educational illustration. Flat friendly cartoon style.
High school audience. Simple and uncluttered — one idea only.
All characters are green pandas only (bright green body #4ade80, dark green
markings #166534, cream face #f0fdf4). No humans, no other animals.
Soft green gradient background (#ecfdf5 to #d1fae5). Minimal text.
Visual aid only — not a standalone infographic.
[Then describe the specific scene.]
```

For panda character variants, append one line from the variation table above.

---

## Pre-delivery checklist

Before saving any PNG or SVG, confirm:

- [ ] Audience is high school friendly and easy to read
- [ ] Only one main idea — not overloaded with information
- [ ] All characters are green pandas (no exceptions)
- [ ] Colors are from the brand palette
- [ ] Image acts as a visual aid, not a text replacement
- [ ] Charts have ≤ 5 labels/points and no unnecessary complexity
- [ ] Text in image is minimal (labels only, no paragraphs)
- [ ] Style matches existing assets in `public/economics/` and `public/market-intelligence/`

---

## File naming conventions

Follow existing patterns:

| Type | Pattern | Example |
|------|---------|---------|
| Hero | `hero.png` | `ownership/own-a-piece/hero.png` |
| Concept | `concept-[slug].png` | `concept-assets.png` |
| Career link | `connect-career.png` | — |
| Personal finance link | `connect-pf.png` | — |
| Economics SVG | `[topic]-[detail].svg` | `supply-demand-equilibrium.svg` |

Store under `public/market-intelligence/[category]/[lesson-slug]/` or `public/economics/` as appropriate.
