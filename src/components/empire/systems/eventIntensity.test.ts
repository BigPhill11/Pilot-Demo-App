import { describe, expect, it } from 'vitest';
import {
  getEventIntensityMultiplier,
  getXpTierEventIntervalBoundsMs,
  scaleEventMagnitude,
} from './eventIntensity';

describe('eventIntensity', () => {
  it('scales intensity higher at higher XP tiers', () => {
    expect(getEventIntensityMultiplier(0)).toBe(1);
    expect(getEventIntensityMultiplier(900)).toBeGreaterThan(getEventIntensityMultiplier(0));
  });

  it('tightens event intervals at higher XP tiers', () => {
    const low = getXpTierEventIntervalBoundsMs(0);
    const high = getXpTierEventIntervalBoundsMs(1300);
    expect(high.minMs).toBeLessThan(low.minMs);
    expect(high.maxMs).toBeLessThan(low.maxMs);
  });

  it('scales magnitudes for positive and negative effects', () => {
    expect(scaleEventMagnitude(100, 2, false)).toBe(200);
    expect(scaleEventMagnitude(-10, 2, true)).toBe(-20);
  });
});
