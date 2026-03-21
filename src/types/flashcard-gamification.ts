export interface StreakData {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  streakFreezeTokens: number;
  weeklyStreak: number;
  monthlyStreak: number;
}

export interface MasteryProgress {
  cardId: string;
  correctCount: number;
  incorrectCount: number;
  tier: 'new' | 'bronze' | 'silver' | 'gold' | 'diamond';
  lastReviewed: string;
  confidenceRatings: number[];
  averageConfidence: number;
}

export interface SpeedChallengeScore {
  userId: string;
  score: number;
  accuracy: number;
  averageTime: number;
  cardsCompleted: number;
  xpEarned: number;
  date: string;
}

export interface DailyChallenge {
  id: string;
  date: string;
  cardIds: string[];
  completed: boolean;
  score?: number;
  accuracy?: number;
  xpEarned?: number;
}

export interface StudySession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  cardsReviewed: number;
  correctAnswers: number;
  averageConfidence: number;
  categoryIds: string[];
  subsectionIds: string[];
  xpEarned: number;
}

export interface FlashcardProgress {
  cardId: string;
  userId: string;
  mastery: MasteryProgress;
  lastConfidence: number;
  totalReviews: number;
  streakContributions: number;
  // Spaced repetition fields
  easinessFactor: number; // 1.3 to 2.5
  interval: number; // Days until next review
  repetitions: number;
  nextReviewDate: string;
  lastReviewDate: string;
}

export const MASTERY_TIERS = {
  new: { name: 'New', color: 'text-muted-foreground', minCorrect: 0, xpMultiplier: 1 },
  bronze: { name: 'Bronze', color: 'text-amber-600', minCorrect: 1, xpMultiplier: 1.2 },
  silver: { name: 'Silver', color: 'text-gray-400', minCorrect: 3, xpMultiplier: 1.5 },
  gold: { name: 'Gold', color: 'text-yellow-500', minCorrect: 5, xpMultiplier: 2 },
  diamond: { name: 'Diamond', color: 'text-cyan-400', minCorrect: 10, xpMultiplier: 3 }
} as const;

export const XP_REWARDS = {
  cardMastered: 5,
  cardReview: 2,
  dailyStreak: 10,
  deckCompleted: 50,
  sectionMastered: 100,
  speedChallengeWin: 25,
  dailyChallengeComplete: 30,
  perfectAccuracy: 20
} as const;

export const SPEED_CHALLENGE_CONFIG = {
  timePerCard: 30, // seconds
  minimumCards: 10,
  maximumCards: 20,
  perfectAccuracyBonus: 2.0,
  speedBonusThreshold: 15 // seconds
} as const;
