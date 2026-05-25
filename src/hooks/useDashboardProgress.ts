/**
 * Dashboard Progress Hook
 *
 * Computes real progress for all learning paths using live data sources.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePersonalFinanceProgress } from '@/hooks/usePersonalFinanceProgress';
import { useVillageLessonProgress } from '@/hooks/useVillageLessonProgress';
import { useCareerReadinessProgress } from '@/hooks/useCareerReadinessProgress';
import {
  calculatePersonalFinanceProgress,
  calculateMarketIntelligenceProgress,
  calculateCareerReadinessProgress,
  calculateOverallProgress,
} from '@/lib/dashboardProgressCalculations';
import {
  notifyProgressUpdated,
  PROGRESS_UPDATED_EVENT,
  scopedStorageKey,
} from '@/lib/userScopedStorage';

export interface DashboardPath {
  id: string;
  title: string;
  description: string;
  progressPct: number;
  lessonsCompleted: number;
  totalLessons: number;
  estimatedTime: string;
  nextActionLabel: string;
  targetTab: string;
  lastTouchedAt: number;
  icon: string;
}

const LAST_TOUCHED_KEYS = {
  personalFinance: 'lastTouched_pf',
  companyDiscovery: 'lastTouched_cd',
  careersFinance: 'lastTouched_cf',
} as const;

function getLastTouchedAt(key: string): number {
  try {
    const stored = localStorage.getItem(scopedStorageKey(key));
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

function readLastTouched() {
  return {
    personalFinance: getLastTouchedAt(LAST_TOUCHED_KEYS.personalFinance),
    companyDiscovery: getLastTouchedAt(LAST_TOUCHED_KEYS.companyDiscovery),
    careersFinance: getLastTouchedAt(LAST_TOUCHED_KEYS.careersFinance),
  };
}

export function useDashboardProgress() {
  const { moduleProgress, loading: pfLoading } = usePersonalFinanceProgress();
  const { completedLessons } = useVillageLessonProgress();
  const { moduleProgress: careerModuleProgress } = useCareerReadinessProgress();
  const [lastTouched, setLastTouched] = useState(readLastTouched);
  const [progressRevision, setProgressRevision] = useState(0);

  const refreshLastTouched = useCallback(() => {
    setLastTouched(readLastTouched());
    setProgressRevision((n) => n + 1);
  }, []);

  useEffect(() => {
    refreshLastTouched();

    const handleProgressUpdated = () => refreshLastTouched();
    window.addEventListener(PROGRESS_UPDATED_EVENT, handleProgressUpdated);
    window.addEventListener('storage', handleProgressUpdated);

    return () => {
      window.removeEventListener(PROGRESS_UPDATED_EVENT, handleProgressUpdated);
      window.removeEventListener('storage', handleProgressUpdated);
    };
  }, [refreshLastTouched]);

  // progressRevision is a manual cache-bust counter; it triggers recalculation on progress events
  const pfProgress = useMemo(
    () => calculatePersonalFinanceProgress(moduleProgress),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moduleProgress, progressRevision]
  );

  const miProgress = useMemo(
    () => calculateMarketIntelligenceProgress(completedLessons),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completedLessons, progressRevision]
  );

  const careersProgress = useMemo(
    () => calculateCareerReadinessProgress(careerModuleProgress),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [careerModuleProgress, progressRevision]
  );

  const paths: DashboardPath[] = useMemo(
    () => [
      {
        id: 'personal-finance',
        title: 'Personal Finance Pro',
        description: 'Master budgeting, saving, investing, and financial planning',
        progressPct: pfProgress.progressPct,
        lessonsCompleted: pfProgress.lessonsCompleted,
        totalLessons: pfProgress.totalLessons,
        estimatedTime: '8 hours',
        nextActionLabel: pfProgress.nextAction,
        targetTab: 'personal-finance',
        lastTouchedAt: lastTouched.personalFinance,
        icon: '💰',
      },
      {
        id: 'company-discovery',
        title: 'Market Intelligence',
        description: 'Learn to evaluate companies and discover investment opportunities',
        progressPct: miProgress.progressPct,
        lessonsCompleted: miProgress.lessonsCompleted,
        totalLessons: miProgress.totalLessons,
        estimatedTime: '4 hours',
        nextActionLabel: miProgress.nextAction,
        targetTab: 'companies',
        lastTouchedAt: lastTouched.companyDiscovery,
        icon: '📊',
      },
      {
        id: 'careers-finance',
        title: 'Careers in Finance',
        description: 'Build interview, resume, and professional skills for finance careers',
        progressPct: careersProgress.progressPct,
        lessonsCompleted: careersProgress.lessonsCompleted,
        totalLessons: careersProgress.totalLessons,
        estimatedTime: '3 hours',
        nextActionLabel: careersProgress.nextAction,
        targetTab: '/career',
        lastTouchedAt: lastTouched.careersFinance,
        icon: '🎯',
      },
    ],
    [pfProgress, miProgress, careersProgress, lastTouched]
  );

  const overallProgress = useMemo(
    () => calculateOverallProgress(paths.map((p) => p.progressPct)),
    [paths]
  );

  const totalLessonsCompleted = useMemo(
    () => paths.reduce((sum, p) => sum + p.lessonsCompleted, 0),
    [paths]
  );

  const mostRecentPath = useMemo(
    () => [...paths].sort((a, b) => b.lastTouchedAt - a.lastTouchedAt)[0],
    [paths]
  );

  const lowestProgressPath = useMemo(() => {
    const pathsWithProgress = paths.filter((p) => p.progressPct > 0 && p.progressPct < 100);
    if (pathsWithProgress.length === 0) {
      return paths[0];
    }
    return pathsWithProgress.sort((a, b) => a.progressPct - b.progressPct)[0];
  }, [paths]);

  return {
    paths,
    loading: pfLoading,
    overallProgress,
    totalLessonsCompleted,
    mostRecentPath,
    lowestProgressPath,
  };
}

export function recordPathTouched(pathId: keyof typeof LAST_TOUCHED_KEYS) {
  const key = LAST_TOUCHED_KEYS[pathId];
  localStorage.setItem(scopedStorageKey(key), Date.now().toString());
  notifyProgressUpdated();
}

export default useDashboardProgress;
