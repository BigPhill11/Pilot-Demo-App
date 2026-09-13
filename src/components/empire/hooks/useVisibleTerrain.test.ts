import { describe, expect, it } from 'vitest';
import { calculateVisibleTerrainBounds } from './useVisibleTerrain';

const viewBox = { x: -192, y: -224, width: 2432, height: 1312 };
describe('visible terrain bounds', () => {
  it('returns finite bounds for a valid SVG camera view box', () => {
    const bounds = calculateVisibleTerrainBounds(viewBox);
    expect(bounds).not.toBeNull();
    expect(Object.values(bounds!).every(Number.isFinite)).toBe(true);
    expect(bounds!.left).toBeLessThan(bounds!.right);
    expect(bounds!.top).toBeLessThan(bounds!.bottom);
  });

  it('shrinks the visible world instead of losing it when zooming in', () => {
    const normal = calculateVisibleTerrainBounds(viewBox)!;
    const close = calculateVisibleTerrainBounds({ x: 821.33, y: 322.67, width: 405.34, height: 218.66 })!;

    expect(close.right - close.left).toBeLessThan(normal.right - normal.left);
    expect(close.bottom - close.top).toBeLessThan(normal.bottom - normal.top);
    expect(close.left).toBeLessThan(1024);
    expect(close.right).toBeGreaterThan(1024);
  });

  it('moves the visible bounds with the SVG camera', () => {
    const centered = calculateVisibleTerrainBounds({ x: 618.67, y: 213.33, width: 810.66, height: 437.34 })!;
    const panned = calculateVisibleTerrainBounds({ x: 418.67, y: 113.33, width: 810.66, height: 437.34 })!;

    expect(panned.left).toBeLessThan(centered.left);
    expect(panned.top).toBeLessThan(centered.top);
  });

  it('fails open when browser measurements are invalid', () => {
    expect(calculateVisibleTerrainBounds({ x: 0, y: 0, width: 0, height: 665 })).toBeNull();
  });
});
