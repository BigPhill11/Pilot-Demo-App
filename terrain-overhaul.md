# Bamboo Empire terrain and camera overhaul

## Changes

- Grid: 20 × 20 → 32 × 32 (400 → 1,024 tiles).
- Actually buildable grass within placement bounds: 216 → 657 tiles (54% → 64.16%). Existing two-tile placement bounds and collision rules are unchanged.
- Every formerly buildable tile stays grass. The old central cross is removed; the expansion contains winding, branching trails, a two-lobed pond, and uneven bamboo groves.
- Layout persistence version 5 preserves version-4 building records exactly. It does not relocate, discard, normalize, or finalize those records. Pre-v4 saves retain their earlier normalization path. IDs, positions, footprints, construction timestamps, collections, defenses, and levels survive the terrain migration.
- Zoom: 0.72×–6×. The existing pointer, pinch, wheel, and inertia hook is extended. Wheel deltas are normalized and eased; transforms are coalesced to animation frames. Pinches track their moving midpoint. Inertia no longer clears its own initial velocity. Resize-aware pan bounds derive from the SVG viewBox and fitted map size.
- Terrain culling subscribes independently to camera updates. SVG screen-coordinate inversion determines visible terrain, with quantized bounds and overscan. The building layer and ghost remain independent and unchanged.
- Building @2x art activates immediately on high-density screens, and at 1× zoom on other screens.
- EmpirePage's dynamic viewport height, existing safe-area offsets, HUD, Build control, and credit auto-enable behavior are preserved.
- Removed the unused TUTORIAL_PLACE_TILE export after a repository-wide reference search.

## Artwork

All runtime artwork lives in `public/empire/terrain/`:

- `grass_1.png` through `grass_3.png`
- `water_1.png` through `water_3.png`
- `pathway_1.png` through `pathway_3.png`
- `bamboo_forest_1.png` through `bamboo_forest_3.png`
- `grove_1.png` through `grove_3.png`

Each has an `@2x.png` counterpart: 30 files, about 1.2 MB combined. Ground dimensions are 128×64 / 256×128; grove dimensions are 96×156 / 192×312. Transparent diamonds and cutout groves use the existing PNG, @2x, and `?v1` convention, with helpers in `src/components/empire/lib/empire-terrain-assets.ts`. Small ground details are baked in; grove images have deterministic placement and size variation. Existing building artwork is not modified.

Generated with the built-in image generation tool. Prompt set: (1) 3-column, 4-row isometric atlas of grass, water, earth paths, and bamboo forest floor, warm upper-left light, painted village-builder style matched to `training_dojo.png`; (2) three isolated bamboo grove silhouettes matched to that reference, followed by white-background extraction; (3) uniform, seamless overhead lush short grass/clover material with no vignette or prominent objects. Production packaging extracts surfaces, projects them into exact 2:1 diamond alpha masks, removes the grove matte, and creates standard/@2x resolutions. Grass was regenerated after the first atlas showed visible lighting bands in the assembled map.

## Verification

- Production build passes.
- 28 focused tests pass across nine files: terrain, legacy compatibility, persistence migration, camera, culling, and existing Empire economy/event/timing tests.
- Camera tests use 390×732 CSS-pixel geometry in jsdom, including React StrictMode. They exercise wheel easing and anchoring, both zoom limits, pinch centering, four-way pan bounds, inertia, and frame cleanup.
- Culling test confirms that moving the viewport changes the mounted terrain set and reduces mounted tiles below 600 for the tested close-up view.
- Static SVG composition inspected for asset alignment, repeated seams, forest, pond, and paths. This is artwork inspection, not a browser screenshot or device performance measurement.
- Focused ESLint: no errors; existing component/export Fast Refresh warnings remain.
- Full TypeScript check reports the same 74 diagnostic headers as baseline commit `96c46eb`; no added diagnostics. Errors are outside the changed Empire files.

## Required before release

Live local browser access was blocked by the remote browser (`ERR_BLOCKED_BY_CLIENT`). No physical iPhone was available. Therefore Safari behavior, real frame rate, sharpness at the final zoom ceiling, safe-area tap reachability, and dynamic-address-bar behavior are NOT verified. Keep this PR in draft until physical portrait-iPhone checks pass. The source retains the existing safe-area and dynamic-height implementation; mocked geometry tests do not prove device behavior.

On an iPhone in portrait: test pinch, wheel/trackpad if available, drag momentum, each map edge at both zoom limits, Build and both zoom buttons, coin-counter controls, Safari toolbar collapse/expand, rotation back to portrait, and returning from background. Profile a populated base with terrain culling while panning; record model, OS, browser, and observed frame rate. Confirm a real v4 save loads unchanged before release.

## Findings left for the owner

`useBaseLayoutStore.buildings` is the active map model: placements and upgrades flow through it, and ProductionManager calculates production/storage from those exact buildings. `useGameStore.buildings` is a legacy per-type level map (despite the apparent count interpretation); its upgrade action increments a type's level. No active callers of that store's `tick` or `upgradeBuilding` were found. There is no synchronization that reconstructs this map from placed buildings.

The old representation is not wholly dead: GameStateInitializer and useGamePersistence still load/save it, and `getStorageCapacity()` falls back to legacy building levels when the layout has no buildings. The old offline simulation is defined, but no active caller of `calculateOfflineProgress` was found. Keep the two models unchanged here; decide separately how to retire legacy persistence and fallback behavior.

The credit auto-enable effect is retained exactly as requested. No stores were merged and no gameplay/economy behavior was intentionally changed.
