import { describe, expect, it } from 'vitest';
import {
  getBuildDurationSeconds,
  getUpgradeDurationSeconds,
  getTimedWorkProgress,
  isTimedWorkComplete,
} from './buildingTiming';

describe('buildingTiming', () => {
  it('increases build time with level and player XP', () => {
    const lowXp = getBuildDurationSeconds('bamboo_farm', 1, 0);
    const highXp = getBuildDurationSeconds('bamboo_farm', 1, 900);
    expect(highXp).toBeGreaterThan(lowXp);
  });

  it('increases build time for higher unlock XP buildings', () => {
    const farm = getBuildDurationSeconds('bamboo_farm', 1, 100);
    const bank = getBuildDurationSeconds('bank', 1, 100);
    expect(bank).toBeGreaterThan(farm);
  });

  it('upgrade duration grows with current level', () => {
    const lvl1 = getUpgradeDurationSeconds('storage', 1, 50);
    const lvl4 = getUpgradeDurationSeconds('storage', 4, 50);
    expect(lvl4).toBeGreaterThan(lvl1);
  });

  it('computes timed work progress and completion', () => {
    const start = 1000;
    const end = 2000;
    expect(getTimedWorkProgress(start, end, 1500)).toBe(50);
    expect(isTimedWorkComplete(end, 2000)).toBe(true);
    expect(isTimedWorkComplete(end, 1999)).toBe(false);
  });
});
