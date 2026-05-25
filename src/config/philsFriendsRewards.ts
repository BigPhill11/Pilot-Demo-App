/**
 * Phil's Friends reel + quiz reward tuning (pilot: careers-in-finance first).
 */

export const PHILS_FRIENDS_REWARDS = {
  /** Awarded when user finishes watching (before quiz) */
  watchCompleteXp: 3,
  watchCompleteBamboo: 3,

  /** Primary reward after correct quiz answer */
  quizCorrectXp: 8,
  quizCorrectBamboo: 10,

  /** Small participation reward for wrong answer */
  quizIncorrectBamboo: 2,

  /** Minimum watch % to unlock quiz (0–100) */
  minWatchPercentForQuiz: 85,

  /** No full quiz reward again within this window (hours) */
  rewardCooldownHours: 24,

  /** Pilot category — expand after metrics baseline */
  pilotCategory: 'careers-in-finance' as const,
} as const;

export type PhilsFriendsRewardKey = keyof typeof PHILS_FRIENDS_REWARDS;
