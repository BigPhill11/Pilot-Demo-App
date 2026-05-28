import { describe, expect, it } from 'vitest';
import {
  BUILDING_DEFINITIONS,
  type BuildingType,
  getUpgradeCost,
  isBuildingUnlocked,
} from './BuildingTypes';

describe('getUpgradeCost', () => {
  it('increases strictly for each level tier before max', () => {
    const types = Object.keys(BUILDING_DEFINITIONS) as BuildingType[];
    for (const type of types) {
      const max = BUILDING_DEFINITIONS[type].maxLevel;
      for (let L = 1; L < max; L++) {
        expect(getUpgradeCost(type, L)).toBeLessThan(getUpgradeCost(type, L + 1));
      }
    }
  });

  it('is always positive for valid levels', () => {
    expect(getUpgradeCost('bamboo_farm', 1)).toBeGreaterThan(0);
    expect(getUpgradeCost('storage', 5)).toBeGreaterThan(0);
  });
});

describe('building unlocks', () => {
  it('unlocks the training dojo in the early expansion tier', () => {
    expect(BUILDING_DEFINITIONS.training_dojo.unlockXP).toBe(50);
    expect(isBuildingUnlocked('training_dojo', 49)).toBe(false);
    expect(isBuildingUnlocked('training_dojo', 50)).toBe(true);
  });
});
