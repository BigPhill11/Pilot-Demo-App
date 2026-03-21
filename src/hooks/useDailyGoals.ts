/**
 * Daily Goals Hook
 * 
 * Generates 3 personalized daily learning goals based on:
 * 1. Where the user last left off (most recent path activity)
 * 2. Quick wins in other paths
 * 3. Streak maintenance actions
 * 
 * Goals are tracked per day and reset at midnight.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDashboardProgress, DashboardPath } from '@/hooks/useDashboardProgress';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { PLATFORM_REWARDS } from '@/config/gameConfig';

export interface DailyGoal {
  id: string;
  title: string;
  description: string;
  targetTab: string;
  bambooReward: number;
  xpReward: number;
  completed: boolean;
  priority: 'primary' | 'secondary' | 'tertiary';
  icon: string;
}

interface DailyGoalProgress {
  date: string;
  completedGoalIds: string[];
}

const STORAGE_KEY = 'daily_goals_progress';

/**
 * Get today's date as YYYY-MM-DD string
 */
function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Read daily goal progress from localStorage
 */
function loadDailyGoalProgress(): DailyGoalProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Reset if different day
      if (parsed.date === getTodayDateString()) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading daily goal progress:', error);
  }
  return {
    date: getTodayDateString(),
    completedGoalIds: [],
  };
}

/**
 * Save daily goal progress to localStorage
 */
function saveDailyGoalProgress(progress: DailyGoalProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/**
 * Generate primary goal based on most recent/lowest progress path
 */
function generatePrimaryGoal(path: DashboardPath | undefined): DailyGoal {
  if (!path) {
    return {
      id: 'primary-start',
      title: 'Start Your Journey',
      description: 'Begin the Personal Finance module to unlock your potential',
      targetTab: 'personal-finance',
      bambooReward: PLATFORM_REWARDS.lessonCompletion * 2,
      xpReward: PLATFORM_REWARDS.lessonXp * 2,
      completed: false,
      priority: 'primary',
      icon: '🚀',
    };
  }

  return {
    id: `primary-${path.id}`,
    title: path.nextActionLabel,
    description: `Continue your progress in ${path.title}`,
    targetTab: path.targetTab,
    bambooReward: PLATFORM_REWARDS.lessonCompletion,
    xpReward: PLATFORM_REWARDS.lessonXp,
    completed: false,
    priority: 'primary',
    icon: path.icon,
  };
}

/**
 * Generate secondary goal - quick win in a different path
 */
function generateSecondaryGoal(paths: DashboardPath[], primaryPathId: string): DailyGoal {
  // Find a path different from primary that has room for progress
  const otherPaths = paths.filter(p => p.id !== primaryPathId && p.progressPct < 100);
  
  if (otherPaths.length === 0) {
    // Fallback if all paths are complete
    return {
      id: 'secondary-review',
      title: 'Review Past Lessons',
      description: 'Strengthen your knowledge with a quick review',
      targetTab: 'adaptive-flashcards',
      bambooReward: PLATFORM_REWARDS.smartReviewSession,
      xpReward: PLATFORM_REWARDS.smartReviewXp,
      completed: false,
      priority: 'secondary',
      icon: '📚',
    };
  }

  // Pick the path with lowest progress as a quick win opportunity
  const targetPath = otherPaths.sort((a, b) => a.progressPct - b.progressPct)[0];

  return {
    id: `secondary-${targetPath.id}`,
    title: `Explore ${targetPath.title}`,
    description: targetPath.description.substring(0, 50) + '...',
    targetTab: targetPath.targetTab,
    bambooReward: PLATFORM_REWARDS.gameCompletion,
    xpReward: PLATFORM_REWARDS.gameXp,
    completed: false,
    priority: 'secondary',
    icon: targetPath.icon,
  };
}

/**
 * Generate tertiary goal - streak maintenance / flashcard review
 */
function generateTertiaryGoal(todayActionCompleted: boolean): DailyGoal {
  if (!todayActionCompleted) {
    return {
      id: 'tertiary-streak',
      title: 'Maintain Your Streak',
      description: 'Complete any learning activity to keep your streak alive',
      targetTab: 'adaptive-flashcards',
      bambooReward: PLATFORM_REWARDS.dailyChallengeComplete,
      xpReward: PLATFORM_REWARDS.dailyChallengeXp,
      completed: false,
      priority: 'tertiary',
      icon: '🔥',
    };
  }

  return {
    id: 'tertiary-flashcards',
    title: 'Review 5 Flashcards',
    description: 'Quick review session to reinforce your learning',
    targetTab: 'adaptive-flashcards',
    bambooReward: PLATFORM_REWARDS.cardReviewed * 5,
    xpReward: PLATFORM_REWARDS.cardReviewedXp * 5,
    completed: false,
    priority: 'tertiary',
    icon: '🃏',
  };
}

/**
 * Hook for generating and tracking daily learning goals
 */
export function useDailyGoals() {
  const { paths, mostRecentPath, lowestProgressPath, loading: progressLoading } = useDashboardProgress();
  const { todayActionCompleted, currentStreak, recordActivity } = useUnifiedStreak();
  const [goalProgress, setGoalProgress] = useState<DailyGoalProgress>(loadDailyGoalProgress);

  // Reload goal progress when component mounts (in case day changed)
  useEffect(() => {
    const loaded = loadDailyGoalProgress();
    setGoalProgress(loaded);
  }, []);

  // Generate the 3 daily goals
  const goals: DailyGoal[] = useMemo(() => {
    if (progressLoading) return [];

    // Determine which path to prioritize:
    // - If user has touched a path recently, continue there
    // - Otherwise, pick the path with lowest non-zero progress
    // - If no progress anywhere, start with Personal Finance
    let primaryPath = mostRecentPath;
    if (mostRecentPath.lastTouchedAt === 0) {
      // No recent touch - use lowest progress path
      primaryPath = lowestProgressPath;
    }

    const primary = generatePrimaryGoal(primaryPath);
    const secondary = generateSecondaryGoal(paths, primaryPath?.id || 'personal-finance');
    const tertiary = generateTertiaryGoal(todayActionCompleted);

    // Mark goals as completed based on saved progress
    return [primary, secondary, tertiary].map(goal => ({
      ...goal,
      completed: goalProgress.completedGoalIds.includes(goal.id),
    }));
  }, [paths, mostRecentPath, lowestProgressPath, todayActionCompleted, goalProgress, progressLoading]);

  /**
   * Mark a goal as completed
   */
  const completeGoal = useCallback((goalId: string) => {
    setGoalProgress(prev => {
      const newProgress: DailyGoalProgress = {
        ...prev,
        date: getTodayDateString(),
        completedGoalIds: [...new Set([...prev.completedGoalIds, goalId])],
      };
      saveDailyGoalProgress(newProgress);
      return newProgress;
    });

    // Record activity for streak
    recordActivity();
  }, [recordActivity]);

  /**
   * Check if all goals are completed
   */
  const allGoalsCompleted = useMemo(() => {
    return goals.every(g => g.completed);
  }, [goals]);

  /**
   * Get count of completed goals
   */
  const completedCount = useMemo(() => {
    return goals.filter(g => g.completed).length;
  }, [goals]);

  return {
    goals,
    loading: progressLoading,
    completeGoal,
    allGoalsCompleted,
    completedCount,
    totalGoals: 3,
    currentStreak,
  };
}

export default useDailyGoals;



