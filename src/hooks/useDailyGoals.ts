/**
 * Daily Goals Hook
 *
 * Generates 3 personalized, daily-rotating learning goals and tracks completion.
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { useDashboardProgress } from '@/hooks/useDashboardProgress';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { generateDailyGoals, getTodayDateString } from '@/lib/dailyGoalEngine';
import type { GoalCompletionType } from '@/lib/dailyGoalEngine';
import {
  subscribeDailyGoalEvents,
  type DailyGoalEvent,
} from '@/lib/dailyGoalEvents';
import { useGameStore } from '@/store/useGameStore';

export interface DailyGoal {
  id: string;
  title: string;
  description: string;
  targetTab: string;
  deepLink?: {
    sectionId?: string;
    moduleId?: string;
    unitId?: string;
    lessonIndex?: number;
  };
  completionType: GoalCompletionType;
  completionTarget?: {
    pathId?: string;
    moduleId?: string;
    lessonId?: string;
    challengeId?: string;
    count?: number;
  };
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
const WELCOME_KEY_PREFIX = 'daily_goals_welcome_';

function loadDailyGoalProgress(): DailyGoalProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as DailyGoalProgress;
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

function saveDailyGoalProgress(progress: DailyGoalProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function shouldShowWelcomeModal(): boolean {
  const key = `${WELCOME_KEY_PREFIX}${getTodayDateString()}`;
  return localStorage.getItem(key) !== '1';
}

export function markWelcomeModalShown(): void {
  localStorage.setItem(`${WELCOME_KEY_PREFIX}${getTodayDateString()}`, '1');
}

function goalMatchesEvent(goal: DailyGoal, event: DailyGoalEvent): boolean {
  if (goal.completed) return false;

  switch (goal.completionType) {
    case 'lesson':
      if (event.type !== 'lesson') return false;
      if (goal.completionTarget?.moduleId && event.moduleId) {
        return goal.completionTarget.moduleId === event.moduleId;
      }
      if (goal.completionTarget?.lessonId && event.lessonId) {
        return goal.completionTarget.lessonId === event.lessonId;
      }
      return goal.completionTarget?.pathId === event.pathId;
    case 'module':
      return event.type === 'module' && event.moduleId === goal.completionTarget?.moduleId;
    case 'flashcards':
      return event.type === 'flashcards' && event.count >= (goal.completionTarget?.count ?? 5);
    case 'tinder':
      return (
        event.type === 'tinder_challenge' &&
        event.challengeId === goal.completionTarget?.challengeId
      );
    case 'evaluation':
      return event.type === 'evaluation';
    case 'any_activity':
      return event.type === 'any_activity';
    default:
      return false;
  }
}

export function useDailyGoals() {
  const { paths, loading: progressLoading } = useDashboardProgress();
  const { todayActionCompleted, currentStreak, recordActivity } = useUnifiedStreak();
  const addBamboo = useGameStore((s) => s.addBamboo);
  const addXp = useGameStore((s) => s.addXp);
  const [goalProgress, setGoalProgress] = useState<DailyGoalProgress>(loadDailyGoalProgress);
  const goalsRef = useRef<DailyGoal[]>([]);

  useEffect(() => {
    setGoalProgress(loadDailyGoalProgress());
  }, []);

  const rawGoals = useMemo(() => {
    if (progressLoading) return [];
    return generateDailyGoals({
      paths,
      todayActionCompleted,
      currentStreak,
    });
  }, [paths, todayActionCompleted, currentStreak, progressLoading]);

  const goals: DailyGoal[] = useMemo(() => {
    return rawGoals.map((goal) => ({
      ...goal,
      completed: goalProgress.completedGoalIds.includes(goal.id),
    }));
  }, [rawGoals, goalProgress]);

  goalsRef.current = goals;

  const completeGoal = useCallback(
    (goalId: string, options?: { silent?: boolean }) => {
      const goal = goalsRef.current.find((g) => g.id === goalId);
      if (!goal || goal.completed) return;

      setGoalProgress((prev) => {
        if (prev.completedGoalIds.includes(goalId)) return prev;
        const newProgress: DailyGoalProgress = {
          ...prev,
          date: getTodayDateString(),
          completedGoalIds: [...new Set([...prev.completedGoalIds, goalId])],
        };
        saveDailyGoalProgress(newProgress);
        return newProgress;
      });

      addBamboo(goal.bambooReward);
      addXp(goal.xpReward);
      recordActivity();

      if (!options?.silent) {
        toast.success(`Trail goal complete! +${goal.bambooReward} 🎋 +${goal.xpReward} XP`);
      }
    },
    [addBamboo, addXp, recordActivity]
  );

  const checkAndCompleteGoals = useCallback(
    (event: DailyGoalEvent) => {
      goalsRef.current.forEach((goal) => {
        if (goalMatchesEvent(goal, event)) {
          completeGoal(goal.id);
        }
      });
    },
    [completeGoal]
  );

  useEffect(() => {
    return subscribeDailyGoalEvents(checkAndCompleteGoals);
  }, [checkAndCompleteGoals]);

  // Auto-complete streak goal when any activity recorded today
  useEffect(() => {
    if (todayActionCompleted) {
      goalsRef.current.forEach((goal) => {
        if (goal.completionType === 'any_activity' && !goal.completed) {
          completeGoal(goal.id, { silent: true });
        }
      });
    }
  }, [todayActionCompleted, completeGoal]);

  const allGoalsCompleted = useMemo(() => goals.every((g) => g.completed), [goals]);
  const completedCount = useMemo(() => goals.filter((g) => g.completed).length, [goals]);
  const primaryGoal = useMemo(
    () => goals.find((g) => g.priority === 'primary') ?? goals[0] ?? null,
    [goals]
  );

  return {
    goals,
    primaryGoal,
    loading: progressLoading,
    completeGoal,
    allGoalsCompleted,
    completedCount,
    totalGoals: 3,
    currentStreak,
  };
}

export default useDailyGoals;
