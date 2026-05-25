import { getXpTierLevel } from '@/config/gameConfig';
import { BUILDING_DEFINITIONS, type BuildingType } from './BuildingTypes';

/** Per-level multiplier for construction/upgrade duration. */
const LEVEL_TIME_EXPONENT = 0.35;

/** Player XP tier contribution to build time. */
const PLAYER_XP_TIER_TIME_FACTOR = 0.08;

/** Building unlock XP tier contribution (higher-tier buildings take longer). */
const UNLOCK_XP_TIER_TIME_FACTOR = 0.05;

/** Upgrades take a fraction of placement time at the same target level. */
const UPGRADE_TIME_RATIO = 0.65;

const MIN_BUILD_SECONDS = 8;
const MAX_BUILD_SECONDS = 600;

/**
 * Target level for new placement is always 1; upgrades use fromLevel + 1.
 */
export function getBuildDurationSeconds(
  type: BuildingType,
  targetLevel: number,
  playerXp: number,
): number {
  const def = BUILDING_DEFINITIONS[type];
  const level = Math.max(1, Math.floor(targetLevel));
  const levelMultiplier = 1 + (level - 1) * LEVEL_TIME_EXPONENT;
  const playerTier = getXpTierLevel(playerXp);
  const unlockTier = getXpTierLevel(def.unlockXP);
  const xpMultiplier =
    1 + playerTier * PLAYER_XP_TIER_TIME_FACTOR + unlockTier * UNLOCK_XP_TIER_TIME_FACTOR;

  const seconds = Math.round(def.constructionTime * levelMultiplier * xpMultiplier);
  return Math.min(MAX_BUILD_SECONDS, Math.max(MIN_BUILD_SECONDS, seconds));
}

export function getBuildDurationMs(
  type: BuildingType,
  targetLevel: number,
  playerXp: number,
): number {
  return getBuildDurationSeconds(type, targetLevel, playerXp) * 1000;
}

export function getUpgradeDurationMs(
  type: BuildingType,
  fromLevel: number,
  playerXp: number,
): number {
  const targetLevel = Math.max(2, Math.floor(fromLevel) + 1);
  return Math.round(
    getBuildDurationMs(type, targetLevel, playerXp) * UPGRADE_TIME_RATIO,
  );
}

export function getUpgradeDurationSeconds(
  type: BuildingType,
  fromLevel: number,
  playerXp: number,
): number {
  return Math.round(getUpgradeDurationMs(type, fromLevel, playerXp) / 1000);
}

/** Progress 0–100 for constructing or upgrading buildings. */
export function getTimedWorkProgress(
  startTime: number | undefined,
  endTime: number | undefined,
  now: number = Date.now(),
): number {
  if (!startTime || !endTime || endTime <= startTime) return 0;
  return Math.min(100, ((now - startTime) / (endTime - startTime)) * 100);
}

export function isTimedWorkComplete(
  endTime: number | undefined,
  now: number = Date.now(),
): boolean {
  return typeof endTime === 'number' && now >= endTime;
}
