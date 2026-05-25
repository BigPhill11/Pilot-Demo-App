/**
 * Personal Stats Hook
 * 
 * Aggregates user progress data from multiple sources for the personal dashboard.
 * Combines bamboo, XP, streaks, time spent, and generates study suggestions.
 */

import { useMemo, useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { useDashboardProgress, DashboardPath } from '@/hooks/useDashboardProgress';
import { useDailyGoals, DailyGoal } from '@/hooks/useDailyGoals';
import { calculateTotalTimeSpentMinutes } from '@/lib/dashboardProgressCalculations';
import { PROGRESS_UPDATED_EVENT } from '@/lib/userScopedStorage';

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  targetTab: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

export interface PersonalStats {
  totalBamboo: number;
  totalBambooEarned: number;
  totalXp: number;
  totalXpEarned: number;
  timeSpentMinutes: number;
  lessonsCompleted: number;
  overallProgress: number;
  currentStreak: number;
  longestStreak: number;
  streakMultiplier: number;
  dailyGoalsCompleted: number;
  dailyGoalsTotal: number;
  paths: DashboardPath[];
  suggestions: Suggestion[];
  loading: boolean;
}

/**
 * Generate study suggestions based on user progress
 */
function generateSuggestions(
  paths: DashboardPath[],
  goals: DailyGoal[],
  currentStreak: number
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  
  // 1. Incomplete daily goals (high priority)
  const incompleteGoals = goals.filter(g => !g.completed);
  if (incompleteGoals.length > 0) {
    const goal = incompleteGoals[0];
    suggestions.push({
      id: 'daily-goal',
      title: 'Complete your daily goal',
      description: goal.title,
      targetTab: goal.targetTab,
      priority: 'high',
      icon: '🎯',
    });
  }
  
  // 2. Continue where you left off (medium priority)
  const sortedByTouch = [...paths].sort((a, b) => b.lastTouchedAt - a.lastTouchedAt);
  const recentPath = sortedByTouch[0];
  if (recentPath && recentPath.progressPct > 0 && recentPath.progressPct < 100) {
    suggestions.push({
      id: 'continue-recent',
      title: 'Continue where you left off',
      description: recentPath.nextActionLabel || `Continue ${recentPath.title}`,
      targetTab: recentPath.targetTab,
      priority: 'medium',
      icon: '📚',
    });
  }
  
  // 3. Lowest progress path (medium priority)
  const lowestProgressPath = [...paths]
    .filter(p => p.progressPct < 100)
    .sort((a, b) => a.progressPct - b.progressPct)[0];
  if (lowestProgressPath && lowestProgressPath.id !== recentPath?.id) {
    suggestions.push({
      id: 'boost-progress',
      title: 'Boost your weakest area',
      description: `${lowestProgressPath.title} is at ${lowestProgressPath.progressPct}%`,
      targetTab: lowestProgressPath.targetTab,
      priority: 'medium',
      icon: '💪',
    });
  }
  
  // 4. Streak maintenance (if at risk)
  if (currentStreak > 0 && incompleteGoals.length === goals.length) {
    suggestions.push({
      id: 'maintain-streak',
      title: 'Keep your streak alive!',
      description: `Complete any lesson to maintain your ${currentStreak}-day streak`,
      targetTab: 'personal-finance',
      priority: 'high',
      icon: '🔥',
    });
  }
  
  // 5. Start a new path (low priority)
  const notStartedPath = paths.find(p => p.progressPct === 0);
  if (notStartedPath) {
    suggestions.push({
      id: 'start-new',
      title: 'Explore something new',
      description: `Start ${notStartedPath.title}`,
      targetTab: notStartedPath.targetTab,
      priority: 'low',
      icon: '🌱',
    });
  }
  
  return suggestions.slice(0, 4); // Max 4 suggestions
}

export function usePersonalStats(): PersonalStats {
  // Get data from various sources
  const bamboo = useGameStore(state => state.bamboo);
  const totalBambooEarned = useGameStore(state => state.totalBambooEarned);
  const xp = useGameStore(state => state.xp);
  const totalXpEarned = useGameStore(state => state.totalXpEarned);
  
  const { 
    currentStreak, 
    longestStreak, 
    streakMultiplier 
  } = useUnifiedStreak();
  
  const { 
    paths, 
    overallProgress, 
    totalLessonsCompleted, 
    loading: progressLoading 
  } = useDashboardProgress();
  
  const { 
    goals, 
    completedCount, 
    loading: goalsLoading 
  } = useDailyGoals();

  const [timeRevision, setTimeRevision] = useState(0);

  useEffect(() => {
    const bump = () => setTimeRevision((n) => n + 1);
    window.addEventListener(PROGRESS_UPDATED_EVENT, bump);
    window.addEventListener('storage', bump);
    return () => {
      window.removeEventListener(PROGRESS_UPDATED_EVENT, bump);
      window.removeEventListener('storage', bump);
    };
  }, []);
  
  const timeSpentMinutes = useMemo(
    () => calculateTotalTimeSpentMinutes(),
    [overallProgress, totalLessonsCompleted, timeRevision]
  );
  
  // Generate suggestions
  const suggestions = useMemo(
    () => generateSuggestions(paths, goals, currentStreak),
    [paths, goals, currentStreak]
  );
  
  return {
    totalBamboo: bamboo,
    totalBambooEarned: totalBambooEarned || 0,
    totalXp: xp,
    totalXpEarned: totalXpEarned || 0,
    timeSpentMinutes,
    lessonsCompleted: totalLessonsCompleted,
    overallProgress,
    currentStreak,
    longestStreak,
    streakMultiplier,
    dailyGoalsCompleted: completedCount,
    dailyGoalsTotal: goals.length,
    paths,
    suggestions,
    loading: progressLoading || goalsLoading,
  };
}
