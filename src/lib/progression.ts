// Centralized progression logic: dynamic XP curve (base 400, slight increase each level)

export const BASE_XP_PER_LEVEL = 400; // Level 1 -> 2
export const GROWTH_RATE = 1.06; // ~6% more XP required each level

// XP required to advance from a given level to the next
export function getXpForLevel(level: number): number {
  return Math.max(1, Math.round(BASE_XP_PER_LEVEL * Math.pow(GROWTH_RATE, Math.max(0, level - 1))));
}

// Total XP required to reach the start of a given level (Level 1 start = 0)
export function getTotalXpAtLevelStart(level: number): number {
  let total = 0;
  for (let l = 1; l < level; l++) {
    total += getXpForLevel(l);
  }
  return total;
}

// Determine the player's current level based on total accumulated XP
export function getLevelFromTotalXp(totalXp: number): number {
  if (!isFinite(totalXp) || totalXp <= 0) return 1;
  let level = 1;
  let accumulated = 0;
  while (true) {
    const needed = getXpForLevel(level);
    if (totalXp < accumulated + needed) break;
    accumulated += needed;
    level += 1;

    // Safety bound to prevent infinite loops in case of bad data
    if (level > 999) break;
  }
  return level;
}

// XP earned within the current level
export function getInLevelXp(totalXp: number): number {
  const level = getLevelFromTotalXp(totalXp);
  const start = getTotalXpAtLevelStart(level);
  return Math.max(0, totalXp - start);
}

// XP remaining to reach the next level
export function getXpToNextLevel(totalXp: number): number {
  const level = getLevelFromTotalXp(totalXp);
  const inLevel = getInLevelXp(totalXp);
  const needed = getXpForLevel(level);
  return Math.max(needed - inLevel, 0);
}

// Progress percentage within the current level
export function getProgressPercent(totalXp: number): number {
  const level = getLevelFromTotalXp(totalXp);
  const needed = getXpForLevel(level);
  const inLevel = getInLevelXp(totalXp);
  return Math.min((inLevel / Math.max(needed, 1)) * 100, 100);
}
