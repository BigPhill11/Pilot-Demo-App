/**
 * Centralized Gamification Service
 * 
 * This service provides a unified interface for:
 * - Awarding XP (experience points)
 * - Awarding Bamboo (game currency)
 * - Checking and unlocking achievements
 * - Managing user progress and rewards
 * 
 * All progress updates (games, modules, activities) flow through this service
 * AND into the Bamboo Empire game for unified tracking.
 */

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { XpSource } from '@/lib/coin-conversion';
import { useGameStore } from '@/store/useGameStore';
import { awardPlatformResources, PlatformActivitySource } from '@/hooks/usePlatformIntegration';

export enum GamificationSource {
  MODULE_COMPLETION = 'module_completion',
  QUIZ = 'quiz',
  ACTIVITY = 'activity',
  LESSON = 'lesson',
  STORY = 'story',
  MARKET_PREDICTION = 'market_prediction',
  ACHIEVEMENT = 'achievement',
  DAILY_LOGIN = 'daily_login',
  BAMBOO_EMPIRE = 'bamboo_empire',
  OTHER = 'other'
}

export interface GamificationReward {
  xpAwarded: number;
  bambooAwarded: number;
  achievementsUnlocked: string[];
  leveledUp: boolean;
  newLevel?: number;
}

/**
 * Map GamificationSource to PlatformActivitySource
 */
function mapToPlatformSource(source: GamificationSource): PlatformActivitySource {
  switch (source) {
    case GamificationSource.MODULE_COMPLETION:
      return 'module_completion';
    case GamificationSource.QUIZ:
      return 'quiz_correct';
    case GamificationSource.LESSON:
      return 'lesson_completion';
    case GamificationSource.STORY:
      return 'story_completion';
    case GamificationSource.MARKET_PREDICTION:
      return 'market_prediction';
    case GamificationSource.ACHIEVEMENT:
      return 'achievement';
    case GamificationSource.DAILY_LOGIN:
      return 'daily_login';
    case GamificationSource.BAMBOO_EMPIRE:
      return 'game_completion';
    case GamificationSource.ACTIVITY:
    case GamificationSource.OTHER:
    default:
      return 'game_completion';
  }
}

export class GamificationService {
  private userId: string | null = null;
  private currentTotalXp: number = 0;
  private streakMultiplier: number = 1.0;

  constructor(userId: string | null, currentStreak?: number) {
    this.userId = userId;
    if (currentStreak !== undefined) {
      // Apply streak multiplier: +5% per day, capped at +50%
      this.streakMultiplier = 1 + Math.min(currentStreak * 0.05, 0.5);
    }
  }

  /**
   * Award XP and trigger all related gamification rewards
   * This also feeds into the Bamboo Empire game
   */
  async awardXp(
    baseXp: number,
    source: GamificationSource,
    sourceDetails?: string
  ): Promise<GamificationReward> {
    if (baseXp <= 0) {
      return {
        xpAwarded: 0,
        bambooAwarded: 0,
        achievementsUnlocked: [],
        leveledUp: false
      };
    }

    try {
      // Apply streak multiplier
      const xpAwarded = Math.round(baseXp * this.streakMultiplier);
      
      // Calculate bamboo (1 bamboo per XP for game purposes)
      const bambooAwarded = xpAwarded;

      // Award to Bamboo Empire game (this is the primary tracking now)
      const gameState = useGameStore.getState();
      if (gameState.initialized) {
        const platformSource = mapToPlatformSource(source);
        awardPlatformResources(platformSource, {
          bamboo: bambooAwarded,
          xp: Math.floor(xpAwarded / 5), // Convert to game XP (smaller scale)
        });
      }

      // Also update database for persistence across devices (if user is logged in)
      if (this.userId) {
        await this.updateDatabaseProgress(xpAwarded, source, sourceDetails);
      }

      // Check for achievements
      const achievementsUnlocked = await this.checkAchievements();

      return {
        xpAwarded,
        bambooAwarded,
        achievementsUnlocked,
        leveledUp: false, // Level is now tracked in game
        newLevel: undefined
      };
    } catch (error) {
      console.error('Error in awardXp:', error);
      return {
        xpAwarded: 0,
        bambooAwarded: 0,
        achievementsUnlocked: [],
        leveledUp: false
      };
    }
  }

  /**
   * Update database progress for cross-device sync
   */
  private async updateDatabaseProgress(
    xpEarned: number,
    source: GamificationSource,
    sourceDetails?: string
  ): Promise<void> {
    if (!this.userId) return;

    try {
      // Fetch current progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('total_points')
        .eq('user_id', this.userId)
        .maybeSingle();

      const previousTotalXp = progressData?.total_points || 0;
      this.currentTotalXp = previousTotalXp + xpEarned;

      // Update user progress with new XP
      await supabase
        .from('user_progress')
        .upsert({
          user_id: this.userId,
          total_points: this.currentTotalXp,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      // Log transaction for history
      await supabase
        .from('xp_transactions' as any)
        .insert({
          user_id: this.userId,
          xp_amount: xpEarned,
          coins_awarded: Math.floor(xpEarned / 10),
          source: this.mapSourceToXpSource(source),
          source_details: sourceDetails
        });

    } catch (error) {
      console.error('Error updating database progress:', error);
    }
  }

  /**
   * Check and unlock new achievements
   */
  private async checkAchievements(): Promise<string[]> {
    // TODO: Implement achievement checking logic here
    return [];
  }

  /**
   * Map GamificationSource to XpSource for database logging
   */
  private mapSourceToXpSource(source: GamificationSource): XpSource {
    switch (source) {
      case GamificationSource.MODULE_COMPLETION:
        return XpSource.MODULE_COMPLETE;
      case GamificationSource.QUIZ:
        return XpSource.QUIZ_CORRECT;
      case GamificationSource.MARKET_PREDICTION:
        return XpSource.MARKET_PREDICTION;
      case GamificationSource.ACHIEVEMENT:
        return XpSource.ACHIEVEMENT;
      case GamificationSource.DAILY_LOGIN:
        return XpSource.DAILY_LOGIN;
      case GamificationSource.ACTIVITY:
      case GamificationSource.LESSON:
      case GamificationSource.STORY:
      case GamificationSource.OTHER:
      default:
        return XpSource.OTHER;
    }
  }
}

/**
 * Factory function to create a GamificationService instance
 */
export async function createGamificationService(userId: string | null): Promise<GamificationService> {
  if (!userId) {
    return new GamificationService(null);
  }

  try {
    // Fetch user's current streak for multiplier calculation
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_streak')
      .eq('id', userId)
      .maybeSingle();

    return new GamificationService(userId, profile?.current_streak || 0);
  } catch (error) {
    console.error('Error creating gamification service:', error);
    return new GamificationService(userId);
  }
}

/**
 * Quick helper to award XP without needing to create a service instance
 * This is useful for simple one-off awards
 */
export async function quickAwardXp(
  userId: string | null,
  xp: number,
  source: GamificationSource,
  sourceDetails?: string
): Promise<GamificationReward> {
  const service = await createGamificationService(userId);
  return service.awardXp(xp, source, sourceDetails);
}
