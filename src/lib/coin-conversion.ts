// Bamboo Coin Conversion System
// Formula: 10 XP = 1 Bamboo Coin

export const XP_TO_COIN_RATIO = 10;

/**
 * Convert XP to Bamboo Coins
 * @param xp - Amount of XP to convert
 * @returns Number of Bamboo Coins
 */
export function xpToCoins(xp: number): number {
  return Math.floor(xp / XP_TO_COIN_RATIO);
}

/**
 * Convert Bamboo Coins to XP equivalent
 * @param coins - Amount of coins
 * @returns XP equivalent
 */
export function coinsToXp(coins: number): number {
  return coins * XP_TO_COIN_RATIO;
}

/**
 * Calculate remaining XP needed for next coin
 * @param totalXp - Current total XP
 * @returns XP needed until next coin
 */
export function xpUntilNextCoin(totalXp: number): number {
  return XP_TO_COIN_RATIO - (totalXp % XP_TO_COIN_RATIO);
}

/**
 * Get coin award for XP earned
 * @param xpEarned - XP just earned
 * @param previousTotalXp - XP before earning
 * @returns Coins to award
 */
export function calculateCoinReward(xpEarned: number, previousTotalXp: number): number {
  const previousCoins = xpToCoins(previousTotalXp);
  const newCoins = xpToCoins(previousTotalXp + xpEarned);
  return newCoins - previousCoins;
}

// XP Source Categories for tracking
export enum XpSource {
  FLASHCARD_MASTERY = 'flashcard_mastery',
  COMPANY_SWIPE = 'company_swipe',
  COMPANY_MATCH = 'company_match',
  QUIZ_CORRECT = 'quiz_correct',
  MODULE_COMPLETE = 'module_complete',
  TUTORIAL_COMPLETE = 'tutorial_complete',
  DAILY_LOGIN = 'daily_login',
  STREAK_BONUS = 'streak_bonus',
  ACHIEVEMENT = 'achievement',
  GAME_LEVEL_UP = 'game_level_up',
  MARKET_PREDICTION = 'market_prediction',
  OTHER = 'other'
}

// XP Award amounts by source (for reference)
export const XP_AWARDS = {
  [XpSource.FLASHCARD_MASTERY]: 50,
  [XpSource.COMPANY_SWIPE]: 10,
  [XpSource.COMPANY_MATCH]: 25,
  [XpSource.QUIZ_CORRECT]: 20,
  [XpSource.MODULE_COMPLETE]: 100,
  [XpSource.TUTORIAL_COMPLETE]: 150,
  [XpSource.DAILY_LOGIN]: 50,
  [XpSource.STREAK_BONUS]: 100,
  [XpSource.ACHIEVEMENT]: 200,
  [XpSource.GAME_LEVEL_UP]: 75,
  [XpSource.MARKET_PREDICTION]: 30,
};
