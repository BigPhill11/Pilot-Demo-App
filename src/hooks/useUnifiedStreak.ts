/**
 * Unified Streak System
 * 
 * Single source of truth for platform-wide streak tracking.
 * Replaces all fragmented streak systems (flashcards, company tinder, etc.)
 * 
 * Streak rules:
 * - Increments when user logs in AND completes at least 1 learning action
 * - Resets if 24+ hours pass without an action
 * - Feeds multipliers into Bamboo Empire
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { STREAK_CONFIG } from '@/config/gameConfig';

const STORAGE_KEY = 'unified_streak';

interface UnifiedStreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  todayActionCompleted: boolean;
}

const getDefaultStreakData = (): UnifiedStreakData => ({
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  todayActionCompleted: false,
});

/**
 * Get today's date as YYYY-MM-DD string
 */
function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check if a date string is yesterday
 */
function isYesterday(dateStr: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateStr === yesterday.toISOString().split('T')[0];
}

/**
 * Check if a date string is today
 */
function isToday(dateStr: string): boolean {
  return dateStr === getTodayDateString();
}

/**
 * Calculate streak multiplier based on current streak
 * Base 1.0 + 0.1 per 7 days, max 2.0
 */
export function calculateStreakMultiplier(streak: number): number {
  const tiers = Math.floor(streak / STREAK_CONFIG.daysPerMultiplierTier);
  const bonus = tiers * STREAK_CONFIG.multiplierPerTier;
  return Math.min(1 + bonus, STREAK_CONFIG.maxMultiplier);
}

/**
 * Hook for unified platform-wide streak tracking
 */
export function useUnifiedStreak() {
  const { user, profile } = useAuth();
  const [streakData, setStreakData] = useState<UnifiedStreakData>(getDefaultStreakData);
  const [loading, setLoading] = useState(true);

  // Load streak data from localStorage and sync with Supabase
  const loadStreak = useCallback(async () => {
    try {
      // Load from localStorage first
      const stored = localStorage.getItem(STORAGE_KEY);
      let data: UnifiedStreakData = stored ? JSON.parse(stored) : getDefaultStreakData();

      // Check if we need to reset/update streak based on last activity date
      const today = getTodayDateString();
      
      if (data.lastActivityDate) {
        if (isToday(data.lastActivityDate)) {
          // Same day - keep everything as is
        } else if (isYesterday(data.lastActivityDate)) {
          // Yesterday - streak continues, but today hasn't been completed yet
          data.todayActionCompleted = false;
        } else {
          // More than 1 day gap - reset streak
          data.currentStreak = 0;
          data.todayActionCompleted = false;
        }
      }

      // Sync with Supabase profile if available
      if (profile) {
        const supabaseStreak = profile.current_streak || 0;
        const supabaseLongest = profile.longest_streak || 0;

        // Use the higher value between local and Supabase
        if (supabaseStreak > data.currentStreak) {
          data.currentStreak = supabaseStreak;
        }
        if (supabaseLongest > data.longestStreak) {
          data.longestStreak = supabaseLongest;
        }
      }

      setStreakData(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error loading streak:', error);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  // Save streak to localStorage and Supabase
  const saveStreak = useCallback(async (data: UnifiedStreakData) => {
    setStreakData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Sync to Supabase if user is logged in
    if (user) {
      try {
        await supabase
          .from('profiles')
          .update({
            current_streak: data.currentStreak,
            longest_streak: data.longestStreak,
          })
          .eq('id', user.id);
      } catch (error) {
        console.error('Error syncing streak to Supabase:', error);
      }
    }
  }, [user]);

  /**
   * Record a learning activity. This is called when user completes:
   * - A lesson
   * - A quiz
   * - A flashcard session
   * - A game
   * - Any other learning activity
   * 
   * If this is the first activity today, the streak increments.
   */
  const recordActivity = useCallback(() => {
    const today = getTodayDateString();
    
    // Already completed today - no change needed
    if (streakData.todayActionCompleted && streakData.lastActivityDate === today) {
      return { 
        streakIncremented: false, 
        newStreak: streakData.currentStreak,
        multiplier: calculateStreakMultiplier(streakData.currentStreak),
      };
    }

    let newStreak = streakData.currentStreak;
    const lastDate = streakData.lastActivityDate;

    if (!lastDate) {
      // First ever activity
      newStreak = 1;
    } else if (isToday(lastDate)) {
      // Already recorded today but todayActionCompleted was false
      // This shouldn't happen, but handle it gracefully
      newStreak = streakData.currentStreak;
    } else if (isYesterday(lastDate)) {
      // Continuing streak from yesterday
      newStreak = streakData.currentStreak + 1;
    } else {
      // Gap of more than 1 day - start new streak
      newStreak = 1;
    }

    const newLongest = Math.max(streakData.longestStreak, newStreak);

    const newData: UnifiedStreakData = {
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastActivityDate: today,
      todayActionCompleted: true,
    };

    saveStreak(newData);

    return {
      streakIncremented: newStreak > streakData.currentStreak,
      newStreak,
      multiplier: calculateStreakMultiplier(newStreak),
    };
  }, [streakData, saveStreak]);

  /**
   * Get the current streak multiplier for Bamboo Empire
   */
  const getStreakMultiplier = useCallback(() => {
    return calculateStreakMultiplier(streakData.currentStreak);
  }, [streakData.currentStreak]);

  /**
   * Get streak level/tier for display
   */
  const getStreakLevel = useCallback(() => {
    const streak = streakData.currentStreak;
    if (streak >= 30) return { level: 'Diamond', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (streak >= 21) return { level: 'Gold', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (streak >= 14) return { level: 'Silver', color: 'text-gray-600', bg: 'bg-gray-50' };
    if (streak >= 7) return { level: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { level: 'Starter', color: 'text-green-600', bg: 'bg-green-50' };
  }, [streakData.currentStreak]);

  /**
   * Get next milestone for display
   */
  const getNextMilestone = useCallback(() => {
    const streak = streakData.currentStreak;
    if (streak < 7) return 7;
    if (streak < 14) return 14;
    if (streak < 21) return 21;
    if (streak < 30) return 30;
    return Math.ceil((streak + 1) / 10) * 10;
  }, [streakData.currentStreak]);

  // Load streak on mount and when profile changes
  useEffect(() => {
    loadStreak();
  }, [loadStreak]);

  return {
    // State
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
    lastActivityDate: streakData.lastActivityDate,
    todayActionCompleted: streakData.todayActionCompleted,
    loading,

    // Actions
    recordActivity,

    // Computed values
    streakMultiplier: getStreakMultiplier(),
    streakLevel: getStreakLevel(),
    nextMilestone: getNextMilestone(),
  };
}

export default useUnifiedStreak;



