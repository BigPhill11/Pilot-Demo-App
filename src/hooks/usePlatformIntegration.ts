/**
 * Platform Integration Hook
 * 
 * Connects platform activities (lessons, quizzes, games) to the Bamboo Empire game.
 * All XP and bamboo awards flow through this hook to the game store.
 * 
 * Applies streak multiplier to bamboo rewards for engaged users.
 */

import { useCallback } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { PLATFORM_REWARDS } from '@/config/gameConfig';
import { toast } from 'sonner';
import { useUnifiedStreak, calculateStreakMultiplier } from '@/hooks/useUnifiedStreak';

export type PlatformActivitySource = 
  | 'lesson_completion'
  | 'quiz_correct'
  | 'quiz_incorrect'
  | 'module_completion'
  | 'game_completion'
  | 'story_completion'
  | 'market_prediction'
  | 'flashcard_mastery'
  | 'daily_login'
  | 'streak_bonus'
  | 'achievement';

interface PlatformReward {
  bamboo: number;
  xp: number;
}

/**
 * Get reward amounts for a specific activity type
 */
function getRewardForActivity(source: PlatformActivitySource): PlatformReward {
  switch (source) {
    case 'lesson_completion':
      return { bamboo: PLATFORM_REWARDS.lessonCompletion, xp: PLATFORM_REWARDS.lessonXp };
    
    case 'quiz_correct':
      return { bamboo: PLATFORM_REWARDS.quizCorrect, xp: PLATFORM_REWARDS.quizXp };
    
    case 'quiz_incorrect':
      return { bamboo: 2, xp: 0 }; // Small bamboo for participation
    
    case 'module_completion':
      return { bamboo: PLATFORM_REWARDS.moduleCompletion, xp: PLATFORM_REWARDS.moduleXp };
    
    case 'game_completion':
    case 'story_completion':
      return { bamboo: PLATFORM_REWARDS.gameCompletion, xp: PLATFORM_REWARDS.gameXp };
    
    case 'market_prediction':
      return { bamboo: 20, xp: 4 };
    
    case 'flashcard_mastery':
      return { bamboo: 15, xp: 3 };
    
    case 'daily_login':
      return { bamboo: 50, xp: 5 };
    
    case 'streak_bonus':
      return { bamboo: 25, xp: 5 };
    
    case 'achievement':
      return { bamboo: 100, xp: 25 };
    
    default:
      return { bamboo: 10, xp: 2 };
  }
}

/**
 * Format activity source for display
 */
function formatSource(source: PlatformActivitySource): string {
  return source.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Hook for integrating platform activities with Bamboo Empire
 */
export function usePlatformIntegration() {
  const addBamboo = useGameStore(state => state.addBamboo);
  const addXp = useGameStore(state => state.addXp);
  const initialized = useGameStore(state => state.initialized);
  const { recordActivity, streakMultiplier, currentStreak } = useUnifiedStreak();

  /**
   * Award resources for completing a platform activity
   * 
   * @param source - The type of activity completed
   * @param customReward - Optional custom reward amounts (overrides defaults)
   * @param showToast - Whether to show a toast notification (default: true)
   */
  const awardActivityCompletion = useCallback((
    source: PlatformActivitySource,
    customReward?: Partial<PlatformReward>,
    showToast: boolean = true
  ) => {
    if (!initialized) {
      console.warn('Game not initialized yet, cannot award resources');
      return { bamboo: 0, xp: 0 };
    }

    const defaultReward = getRewardForActivity(source);
    
    // Apply streak multiplier to bamboo rewards
    const baseBamboo = customReward?.bamboo ?? defaultReward.bamboo;
    const multipliedBamboo = Math.floor(baseBamboo * streakMultiplier);
    
    const reward: PlatformReward = {
      bamboo: multipliedBamboo,
      xp: customReward?.xp ?? defaultReward.xp,
    };

    // Add to game store
    if (reward.bamboo > 0) {
      addBamboo(reward.bamboo, source);
    }
    if (reward.xp > 0) {
      addXp(reward.xp, source);
    }

    // Record activity for streak tracking
    recordActivity();

    // Show toast notification
    if (showToast && (reward.bamboo > 0 || reward.xp > 0)) {
      const parts = [];
      if (reward.bamboo > 0) {
        const multiplierNote = streakMultiplier > 1 ? ` (${streakMultiplier.toFixed(1)}x)` : '';
        parts.push(`+${reward.bamboo} 🎋${multiplierNote}`);
      }
      if (reward.xp > 0) parts.push(`+${reward.xp} XP`);
      
      toast.success(`${formatSource(source)}!`, {
        description: parts.join(' | '),
        duration: 3000,
      });
    }

    return reward;
  }, [initialized, addBamboo, addXp, streakMultiplier, recordActivity]);

  /**
   * Award resources directly with custom amounts
   */
  const awardResources = useCallback((
    bamboo: number,
    xp: number,
    source: string,
    showToast: boolean = true
  ) => {
    if (!initialized) {
      console.warn('Game not initialized yet, cannot award resources');
      return;
    }

    // Apply streak multiplier to bamboo rewards
    const multipliedBamboo = Math.floor(bamboo * streakMultiplier);

    if (multipliedBamboo > 0) {
      addBamboo(multipliedBamboo, source);
    }
    if (xp > 0) {
      addXp(xp, source);
    }

    // Record activity for streak tracking
    recordActivity();

    if (showToast && (multipliedBamboo > 0 || xp > 0)) {
      const parts = [];
      if (multipliedBamboo > 0) {
        const multiplierNote = streakMultiplier > 1 ? ` (${streakMultiplier.toFixed(1)}x)` : '';
        parts.push(`+${multipliedBamboo} 🎋${multiplierNote}`);
      }
      if (xp > 0) parts.push(`+${xp} XP`);
      
      toast.success(`Reward Earned!`, {
        description: parts.join(' | '),
        duration: 3000,
      });
    }
  }, [initialized, addBamboo, addXp, streakMultiplier, recordActivity]);

  /**
   * Award for completing a lesson
   */
  const completeLesson = useCallback((lessonId: string, customReward?: Partial<PlatformReward>) => {
    return awardActivityCompletion('lesson_completion', customReward);
  }, [awardActivityCompletion]);

  /**
   * Award for answering a quiz question
   */
  const completeQuiz = useCallback((isCorrect: boolean, customReward?: Partial<PlatformReward>) => {
    return awardActivityCompletion(
      isCorrect ? 'quiz_correct' : 'quiz_incorrect',
      customReward
    );
  }, [awardActivityCompletion]);

  /**
   * Award for completing a module
   */
  const completeModule = useCallback((moduleId: string, customReward?: Partial<PlatformReward>) => {
    return awardActivityCompletion('module_completion', customReward);
  }, [awardActivityCompletion]);

  /**
   * Award for completing a game or interactive activity
   */
  const completeGame = useCallback((gameId: string, score?: number, customReward?: Partial<PlatformReward>) => {
    // Optionally scale reward based on score
    if (score !== undefined && !customReward) {
      const baseReward = getRewardForActivity('game_completion');
      const multiplier = Math.min(2, 0.5 + (score / 100));
      customReward = {
        bamboo: Math.floor(baseReward.bamboo * multiplier),
        xp: Math.floor(baseReward.xp * multiplier),
      };
    }
    return awardActivityCompletion('game_completion', customReward);
  }, [awardActivityCompletion]);

  /**
   * Award for daily login
   */
  const awardDailyLogin = useCallback((streak: number) => {
    const baseReward = getRewardForActivity('daily_login');
    // Bonus for streaks (up to 2x at 7 days)
    const streakMultiplier = Math.min(2, 1 + (streak * 0.14));
    
    return awardActivityCompletion('daily_login', {
      bamboo: Math.floor(baseReward.bamboo * streakMultiplier),
      xp: Math.floor(baseReward.xp * streakMultiplier),
    });
  }, [awardActivityCompletion]);

  /**
   * Award for unlocking an achievement
   */
  const awardAchievement = useCallback((achievementId: string, customReward?: Partial<PlatformReward>) => {
    return awardActivityCompletion('achievement', customReward);
  }, [awardActivityCompletion]);

  return {
    // Core methods
    awardActivityCompletion,
    awardResources,
    
    // Convenience methods
    completeLesson,
    completeQuiz,
    completeModule,
    completeGame,
    awardDailyLogin,
    awardAchievement,
    
    // State
    isInitialized: initialized,
    
    // Streak info
    currentStreak,
    streakMultiplier,
  };
}

/**
 * Standalone function to award resources without React context
 * Useful for services and non-component code
 * 
 * Note: This does not apply streak multiplier (no access to hook context).
 * Use usePlatformIntegration hook when possible.
 */
export function awardPlatformResources(
  source: PlatformActivitySource,
  customReward?: Partial<PlatformReward>
) {
  const state = useGameStore.getState();
  
  if (!state.initialized) {
    console.warn('Game not initialized yet');
    return { bamboo: 0, xp: 0 };
  }

  // Read streak from localStorage to apply multiplier
  let streakMultiplier = 1;
  try {
    const streakData = localStorage.getItem('unified_streak');
    if (streakData) {
      const parsed = JSON.parse(streakData);
      streakMultiplier = calculateStreakMultiplier(parsed.currentStreak || 0);
    }
  } catch {
    // Ignore errors, use default multiplier
  }

  const defaultReward = getRewardForActivity(source);
  const baseBamboo = customReward?.bamboo ?? defaultReward.bamboo;
  const reward: PlatformReward = {
    bamboo: Math.floor(baseBamboo * streakMultiplier),
    xp: customReward?.xp ?? defaultReward.xp,
  };

  if (reward.bamboo > 0) {
    state.addBamboo(reward.bamboo, source);
  }
  if (reward.xp > 0) {
    state.addXp(reward.xp, source);
  }

  return reward;
}

export default usePlatformIntegration;

