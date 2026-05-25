import { getXpTierLevel } from '@/config/gameConfig';

/** Stronger effects at higher XP tiers (tier 0 = 1.0, tier 8 ≈ 2.0). */
const INTENSITY_PER_TIER = 0.125;

const MIN_INTENSITY = 1;
const MAX_INTENSITY = 2.25;

export function getEventIntensityMultiplier(playerXp: number): number {
  const tier = getXpTierLevel(playerXp);
  return Math.min(MAX_INTENSITY, Math.max(MIN_INTENSITY, 1 + tier * INTENSITY_PER_TIER));
}

/** Shorter intervals at higher tiers (bounded). */
export function getXpTierEventIntervalBoundsMs(playerXp: number): {
  minMs: number;
  maxMs: number;
} {
  const tier = getXpTierLevel(playerXp);
  const baseMin = 3 * 60 * 60 * 1000;
  const baseMax = 6 * 60 * 60 * 1000;
  const reduction = tier * 12 * 60 * 1000;
  const minMs = Math.max(45 * 60 * 1000, baseMin - reduction);
  const maxMs = Math.max(90 * 60 * 1000, baseMax - reduction);
  return { minMs, maxMs };
}

export function scaleEventMagnitude(value: number, intensity: number, isNegative: boolean): number {
  if (value === 0) return 0;
  const scaled = Math.round(value * intensity);
  if (!isNegative) return Math.max(value > 0 ? 1 : 0, scaled);
  return scaled;
}
