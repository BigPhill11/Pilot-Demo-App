import { describe, expect, it } from 'vitest';
import { calculateCameraViewBox } from './useEmpireViewport';

const base = { x: -192, y: -224, width: 2432, height: 1312 };

describe('empire SVG camera', () => {
  it('uses the base view box at 1x zoom', () => {
    expect(calculateCameraViewBox(base, 390, 665, { x: 0, y: 0 }, 1)).toEqual(base);
  });

  it('renders a smaller vector view box at close zoom', () => {
    const camera = calculateCameraViewBox(base, 390, 665, { x: 0, y: 0 }, 6)!;
    expect(camera.width).toBeCloseTo(base.width / 6);
    expect(camera.height).toBeCloseTo(base.height / 6);
    expect(camera.x + camera.width / 2).toBeCloseTo(base.x + base.width / 2);
    expect(camera.y + camera.height / 2).toBeCloseTo(base.y + base.height / 2);
  });

  it('moves the camera opposite the screen-space pan', () => {
    const centered = calculateCameraViewBox(base, 390, 665, { x: 0, y: 0 }, 3)!;
    const panned = calculateCameraViewBox(base, 390, 665, { x: 120, y: 60 }, 3)!;
    expect(panned.x).toBeLessThan(centered.x);
    expect(panned.y).toBeLessThan(centered.y);
  });

  it('keeps an off-center pinch point anchored while zooming', () => {
    const viewportWidth = 390;
    const viewportHeight = 665;
    const point = { x: 300, y: 220 };
    const fittedScale = Math.min(viewportWidth / base.width, viewportHeight / base.height);
    const dx = point.x - viewportWidth / 2;
    const dy = point.y - viewportHeight / 2;
    const previousZoom = 2;
    const nextZoom = 4;
    const previousPan = { x: 40, y: -25 };
    const scale = nextZoom / previousZoom;
    const nextPan = {
      x: previousPan.x * scale + dx - dx * scale,
      y: previousPan.y * scale + dy - dy * scale,
    };
    const before = calculateCameraViewBox(
      base,
      viewportWidth,
      viewportHeight,
      previousPan,
      previousZoom,
    )!;
    const after = calculateCameraViewBox(
      base,
      viewportWidth,
      viewportHeight,
      nextPan,
      nextZoom,
    )!;

    const beforePoint = {
      x: before.x + before.width / 2 + dx / (fittedScale * previousZoom),
      y: before.y + before.height / 2 + dy / (fittedScale * previousZoom),
    };
    const afterPoint = {
      x: after.x + after.width / 2 + dx / (fittedScale * nextZoom),
      y: after.y + after.height / 2 + dy / (fittedScale * nextZoom),
    };
    expect(afterPoint.x).toBeCloseTo(beforePoint.x);
    expect(afterPoint.y).toBeCloseTo(beforePoint.y);
  });

  it('fails safely for invalid viewport measurements', () => {
    expect(calculateCameraViewBox(base, 0, 665, { x: 0, y: 0 }, 2)).toBeNull();
  });
});
