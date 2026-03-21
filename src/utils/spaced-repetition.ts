/**
 * SM-2 Spaced Repetition Algorithm Implementation
 * Based on SuperMemo 2 algorithm for optimal learning intervals
 */

export interface SM2Progress {
  cardId: string;
  easinessFactor: number; // 1.3 to 2.5 (default 2.5)
  interval: number; // Days until next review
  repetitions: number; // Number of consecutive correct reviews
  nextReviewDate: string; // ISO date string
  lastReviewDate: string; // ISO date string
  totalReviews: number;
  lastQuality: number; // 0-5 quality rating
}

export interface SM2ReviewResult {
  updatedProgress: SM2Progress;
  shouldReview: boolean;
  daysUntilNext: number;
  message: string;
}

/**
 * Calculate the next review interval using SM-2 algorithm
 * @param quality - Rating from 0-5 (0=wrong, 5=perfect)
 * @param progress - Current SM2 progress for the card
 * @returns Updated SM2 progress
 */
export function calculateSM2(quality: number, progress: SM2Progress): SM2Progress {
  // Ensure quality is in valid range
  const q = Math.max(0, Math.min(5, quality));
  
  let { easinessFactor, interval, repetitions } = progress;

  // Calculate new easiness factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easinessFactor = easinessFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  
  // Keep easiness factor within bounds
  if (easinessFactor < 1.3) easinessFactor = 1.3;
  if (easinessFactor > 2.5) easinessFactor = 2.5;

  // Update repetitions based on quality
  if (q < 3) {
    // Wrong answer - reset repetitions
    repetitions = 0;
    interval = 1; // Review again tomorrow
  } else {
    // Correct answer - increase interval
    repetitions += 1;
    
    if (repetitions === 1) {
      interval = 1; // First time correct - review in 1 day
    } else if (repetitions === 2) {
      interval = 6; // Second time correct - review in 6 days
    } else {
      // Third time and beyond - multiply by easiness factor
      interval = Math.round(interval * easinessFactor);
    }
  }

  const now = new Date();
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    ...progress,
    easinessFactor,
    interval,
    repetitions,
    lastReviewDate: now.toISOString(),
    nextReviewDate: nextReview.toISOString(),
    totalReviews: progress.totalReviews + 1,
    lastQuality: q
  };
}

/**
 * Convert confidence rating (1-5 stars) to SM-2 quality (0-5)
 * @param isCorrect - Whether the answer was correct
 * @param confidence - Confidence rating from 1-5 stars
 * @returns Quality rating for SM-2 algorithm
 */
export function confidenceToQuality(isCorrect: boolean, confidence: number): number {
  if (!isCorrect) {
    // Wrong answers get 0-2 based on confidence
    // Even if confident but wrong, it's still low quality
    return Math.max(0, confidence - 3);
  }
  
  // Correct answers get 3-5 based on confidence
  // 1 star confident but correct = 3 (barely remembered)
  // 3 star confident and correct = 4 (remembered with effort)
  // 5 star confident and correct = 5 (perfect recall)
  return Math.min(5, confidence + 2);
}

/**
 * Check if a card is due for review
 * @param progress - SM2 progress for the card
 * @returns Whether the card should be reviewed now
 */
export function isDueForReview(progress: SM2Progress): boolean {
  const now = new Date();
  const nextReview = new Date(progress.nextReviewDate);
  return now >= nextReview;
}

/**
 * Get days until next review
 * @param progress - SM2 progress for the card
 * @returns Number of days until next review (negative if overdue)
 */
export function getDaysUntilReview(progress: SM2Progress): number {
  const now = new Date();
  const nextReview = new Date(progress.nextReviewDate);
  const diffTime = nextReview.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Initialize SM2 progress for a new card
 * @param cardId - Unique identifier for the card
 * @returns Initial SM2 progress
 */
export function initializeSM2Progress(cardId: string): SM2Progress {
  const now = new Date();
  return {
    cardId,
    easinessFactor: 2.5, // Default easiness
    interval: 0,
    repetitions: 0,
    nextReviewDate: now.toISOString(), // Available immediately
    lastReviewDate: now.toISOString(),
    totalReviews: 0,
    lastQuality: 0
  };
}

/**
 * Get all cards that are due for review
 * @param allProgress - Map of all card progress
 * @returns Array of card IDs that are due
 */
export function getDueCards(allProgress: Map<string, SM2Progress>): string[] {
  const dueCards: string[] = [];
  
  allProgress.forEach((progress, cardId) => {
    if (isDueForReview(progress)) {
      dueCards.push(cardId);
    }
  });
  
  return dueCards;
}

/**
 * Sort cards by priority for review
 * Priority: overdue cards first, then by interval (shorter first)
 * @param cards - Array of SM2 progress objects
 * @returns Sorted array with most important cards first
 */
export function sortCardsByPriority(cards: SM2Progress[]): SM2Progress[] {
  return cards.sort((a, b) => {
    const aDaysUntil = getDaysUntilReview(a);
    const bDaysUntil = getDaysUntilReview(b);
    
    // Overdue cards come first (negative days)
    if (aDaysUntil < 0 && bDaysUntil >= 0) return -1;
    if (bDaysUntil < 0 && aDaysUntil >= 0) return 1;
    
    // Both overdue - most overdue first
    if (aDaysUntil < 0 && bDaysUntil < 0) {
      return aDaysUntil - bDaysUntil;
    }
    
    // Both upcoming - soonest first
    return aDaysUntil - bDaysUntil;
  });
}

/**
 * Get review statistics for a collection of cards
 * @param allProgress - Map of all card progress
 * @returns Statistics object
 */
export function getReviewStats(allProgress: Map<string, SM2Progress>) {
  let dueNow = 0;
  let dueToday = 0;
  let dueThisWeek = 0;
  let mature = 0; // Cards with interval >= 21 days
  let learning = 0; // Cards with repetitions < 3
  let young = 0; // Cards with 3+ reps but interval < 21
  
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const endOfWeek = new Date(now);
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  
  allProgress.forEach((progress) => {
    const nextReview = new Date(progress.nextReviewDate);
    
    if (isDueForReview(progress)) {
      dueNow++;
    }
    
    if (nextReview <= endOfDay) {
      dueToday++;
    }
    
    if (nextReview <= endOfWeek) {
      dueThisWeek++;
    }
    
    if (progress.interval >= 21) {
      mature++;
    } else if (progress.repetitions < 3) {
      learning++;
    } else {
      young++;
    }
  });
  
  return {
    total: allProgress.size,
    dueNow,
    dueToday,
    dueThisWeek,
    mature,
    young,
    learning,
    averageEasiness: Array.from(allProgress.values())
      .reduce((sum, p) => sum + p.easinessFactor, 0) / allProgress.size || 2.5
  };
}

/**
 * Predict retention rate based on interval and easiness
 * @param progress - SM2 progress
 * @returns Estimated retention percentage (0-100)
 */
export function predictRetention(progress: SM2Progress): number {
  const daysUntil = getDaysUntilReview(progress);
  
  // If overdue, retention decreases
  if (daysUntil < 0) {
    const overdueBy = Math.abs(daysUntil);
    const retentionLoss = overdueBy * 5; // 5% loss per day overdue
    return Math.max(20, 90 - retentionLoss);
  }
  
  // For upcoming reviews, estimate based on easiness
  // Higher easiness = better retention
  const baseRetention = 90;
  const easinessBonus = (progress.easinessFactor - 1.3) * 10;
  
  return Math.min(99, baseRetention + easinessBonus);
}
