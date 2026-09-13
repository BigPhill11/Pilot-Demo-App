import { describe, expect, it } from 'vitest';
import { calculateVisibleTerrainBounds } from './useVisibleTerrain';

const viewBox = { x: -192, y: -224, width: 2432, height: 1312 };
const portrait = { viewportWidth: 390, viewportHeight: 665 };

describe('visible terrain bounds', () => {
  it('returns finite bounds for portrait phone geometry at every supported zoom', () => {
    for (const zoom of [0.72, 1, 2, 4, 6]) {
      const bounds = calculateVisibleTerrainBounds({
        viewBox,
        ...portrait,
        camera: { panX: 0, panY: 0, zoom },
      });
      expect(bounds).not.toBeNull();
      expect(Object.values(bounds!).every(Number.isFinite)).toBe(true);
      expect(bounds!.left).toBeLessThan(bounds!.right);
      expect(bounds!.top).toBeLessThan(bounds!.bottom);
    }
  });

  it('shrinks the visible world instead of losing it when zooming in', () => {
    const normal = calculateVisibleTerrainBounds({
      viewBox,
      ...portrait,
      camera: { panX: 0, panY: 0, zoom: 1 },
    })!;
    const close = calculateVisibleTerrainBounds({
      viewBox,
      ...portrait,
      camera: { panX: 0, panY: 0, zoom: 6 },
    })!;

    expect(close.right - close.left).toBeLessThan(normal.right - normal.left);
    expect(close.bottom - close.top).toBeLessThan(normal.bottom - normal.top);
    expect(close.left).toBeLessThan(1024);
    expect(close.right).toBeGreaterThan(1024);
  });

  it('moves the visible world opposite the camera pan', () => {
    const centered = calculateVisibleTerrainBounds({
      viewBox,
      ...portrait,
      camera: { panX: 0, panY: 0, zoom: 3 },
    })!;
    const panned = calculateVisibleTerrainBounds({
      viewBox,
      ...portrait,
      camera: { panX: 300, panY: 150, zoom: 3 },
    })!;

    expect(panned.left).toBeLessThan(centered.left);
    expect(panned.top).toBeLessThan(centered.top);
  });

  it('fails open when browser measurements are invalid', () => {
    expect(calculateVisibleTerrainBounds({
      viewBox,
      viewportWidth: 0,
      viewportHeight: 665,
      camera: { panX: 0, panY: 0, zoom: 2 },
    })).toBeNull();
  });
});
