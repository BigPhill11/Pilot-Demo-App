/**
 * Dashboard Progress Hook
 * 
 * Computes real progress for all 3 learning paths:
 * - Personal Finance
 * - Company Discovery
 * - Careers in Finance
 * 
 * Reads from multiple localStorage keys and Supabase tables
 * to provide unified progress data for the dashboard.
 */

import { useState, useEffect, useMemo } from 'react';
import { usePersonalFinanceProgress } from '@/hooks/usePersonalFinanceProgress';
import { PERSONAL_FINANCE_MODULES, getModuleById } from '@/data/personal-finance/modules';

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

// LocalStorage keys for "last touched" tracking
const LAST_TOUCHED_KEYS = {
  personalFinance: 'lastTouched_pf',
  companyDiscovery: 'lastTouched_cd',
  careersFinance: 'lastTouched_cf',
};

/**
 * Read localStorage safely
 */
function safeReadStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
  }
  return fallback;
}

/**
 * Get last touched timestamp for a path
 */
function getLastTouchedAt(key: string): number {
  const stored = localStorage.getItem(key);
  return stored ? parseInt(stored, 10) : 0;
}

/**
 * Calculate Personal Finance progress
 */
function calculatePersonalFinanceProgress(
  moduleProgress: Record<string, { completedLessons: string[]; status: string }>
): { progressPct: number; lessonsCompleted: number; totalLessons: number; nextAction: string } {
  const modules = PERSONAL_FINANCE_MODULES;
  const totalModules = modules.length;
  const lessonsPerModule = 5;
  const totalLessons = totalModules * lessonsPerModule;

  let completedLessons = 0;
  let nextAction = 'Start Income module';

  for (const module of modules) {
    const progress = moduleProgress[module.id];
    if (progress) {
      completedLessons += progress.completedLessons?.length || 0;
      
      // Find first incomplete module for next action
      if (progress.status !== 'completed' && nextAction === 'Start Income module') {
        const moduleData = getModuleById(module.id);
        const completedCount = progress.completedLessons?.length || 0;
        if (moduleData && completedCount < lessonsPerModule) {
          nextAction = `Continue ${module.name} (Lesson ${completedCount + 1})`;
        }
      }
    }
  }

  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return { progressPct, lessonsCompleted: completedLessons, totalLessons, nextAction };
}

/**
 * Calculate Company Discovery progress
 */
function calculateCompanyDiscoveryProgress(): { progressPct: number; lessonsCompleted: number; totalLessons: number; nextAction: string } {
  // Read evaluation progress
  const evaluationProgress = safeReadStorage<Array<{ completed: boolean }>>('evaluation_progress', []);
  const completedEvaluations = evaluationProgress.filter(e => e.completed).length;
  const totalEvaluations = 9; // 3 lessons × 3 modules
  const evaluationPct = (completedEvaluations / totalEvaluations) * 100;

  // Read Company Tinder stats
  const tinderStats = safeReadStorage<{ swipeCount?: number }>('tinderGameStats', {});
  const swipeCount = tinderStats.swipeCount || 0;
  const tinderPct = Math.min((swipeCount / 50) * 100, 100); // Cap at 50 swipes = 100%

  // Weighted progress: 60% evaluation, 40% tinder
  const progressPct = Math.round(0.6 * evaluationPct + 0.4 * tinderPct);

  // Determine next action
  let nextAction = 'Start company evaluation';
  if (completedEvaluations > 0 && completedEvaluations < totalEvaluations) {
    nextAction = `Continue evaluation (${completedEvaluations}/${totalEvaluations} completed)`;
  } else if (completedEvaluations >= totalEvaluations && swipeCount < 50) {
    nextAction = 'Try Company Tinder';
  } else if (completedEvaluations >= totalEvaluations) {
    nextAction = 'Explore more companies';
  }

  return { 
    progressPct, 
    lessonsCompleted: completedEvaluations, 
    totalLessons: totalEvaluations, 
    nextAction 
  };
}

/**
 * Calculate Careers in Finance progress
 */
function calculateCareersProgress(): { progressPct: number; lessonsCompleted: number; totalLessons: number; nextAction: string } {
  // Read progress from various career journey localStorage keys
  const ibProgress = safeReadStorage<{ completedLevels?: number[] }>('investmentBanking-progress', {});
  const vcProgress = safeReadStorage<{ completedLevels?: number[] }>('vc-journey-progress', {});
  const cfProgress = safeReadStorage<{ completedLevels?: number[] }>('corporateFinance-progress', {});

  // Each journey has multiple levels
  const ibCompleted = ibProgress.completedLevels?.length || 0;
  const vcCompleted = vcProgress.completedLevels?.length || 0;
  const cfCompleted = cfProgress.completedLevels?.length || 0;

  const totalCompleted = ibCompleted + vcCompleted + cfCompleted;
  
  // Assume 5 levels per career path, 3 career paths = 15 total
  const totalLevels = 15;
  const progressPct = Math.round((totalCompleted / totalLevels) * 100);

  // Determine next action based on which has most progress (continue there)
  let nextAction = 'Explore Investment Banking';
  if (ibCompleted > 0 && ibCompleted < 5) {
    nextAction = `Continue IB Journey (Level ${ibCompleted + 1})`;
  } else if (vcCompleted > 0 && vcCompleted < 5) {
    nextAction = `Continue VC Journey (Level ${vcCompleted + 1})`;
  } else if (cfCompleted > 0 && cfCompleted < 5) {
    nextAction = `Continue Corp Finance (Level ${cfCompleted + 1})`;
  } else if (totalCompleted === 0) {
    nextAction = 'Start a career journey';
  }

  return { progressPct, lessonsCompleted: totalCompleted, totalLessons: totalLevels, nextAction };
}

/**
 * Hook for dashboard progress across all learning paths
 */
export function useDashboardProgress() {
  const { moduleProgress, loading: pfLoading } = usePersonalFinanceProgress();
  const [companyDiscoveryProgress, setCompanyDiscoveryProgress] = useState<ReturnType<typeof calculateCompanyDiscoveryProgress> | null>(null);
  const [careersProgress, setCareersProgress] = useState<ReturnType<typeof calculateCareersProgress> | null>(null);
  const [lastTouched, setLastTouched] = useState({
    personalFinance: 0,
    companyDiscovery: 0,
    careersFinance: 0,
  });

  // Load non-PF progress from localStorage
  useEffect(() => {
    setCompanyDiscoveryProgress(calculateCompanyDiscoveryProgress());
    setCareersProgress(calculateCareersProgress());
    setLastTouched({
      personalFinance: getLastTouchedAt(LAST_TOUCHED_KEYS.personalFinance),
      companyDiscovery: getLastTouchedAt(LAST_TOUCHED_KEYS.companyDiscovery),
      careersFinance: getLastTouchedAt(LAST_TOUCHED_KEYS.careersFinance),
    });
  }, []);

  // Calculate Personal Finance progress
  const pfProgress = useMemo(() => {
    return calculatePersonalFinanceProgress(moduleProgress);
  }, [moduleProgress]);

  // Build dashboard paths
  const paths: DashboardPath[] = useMemo(() => {
    return [
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
        progressPct: companyDiscoveryProgress?.progressPct || 0,
        lessonsCompleted: companyDiscoveryProgress?.lessonsCompleted || 0,
        totalLessons: companyDiscoveryProgress?.totalLessons || 9,
        estimatedTime: '4 hours',
        nextActionLabel: companyDiscoveryProgress?.nextAction || 'Start exploring',
        targetTab: 'companies',
        lastTouchedAt: lastTouched.companyDiscovery,
        icon: '📊',
      },
      {
        id: 'careers-finance',
        title: 'Careers in Finance',
        description: 'Explore career paths in investment banking, VC, and corporate finance',
        progressPct: careersProgress?.progressPct || 0,
        lessonsCompleted: careersProgress?.lessonsCompleted || 0,
        totalLessons: careersProgress?.totalLessons || 15,
        estimatedTime: '6 hours',
        nextActionLabel: careersProgress?.nextAction || 'Start exploring',
        targetTab: 'careers',
        lastTouchedAt: lastTouched.careersFinance,
        icon: '💼',
      },
    ];
  }, [pfProgress, companyDiscoveryProgress, careersProgress, lastTouched]);

  // Computed aggregates
  const overallProgress = useMemo(() => {
    const total = paths.reduce((sum, p) => sum + p.progressPct, 0);
    return Math.round(total / paths.length);
  }, [paths]);

  const totalLessonsCompleted = useMemo(() => {
    return paths.reduce((sum, p) => sum + p.lessonsCompleted, 0);
  }, [paths]);

  // Get the most recently touched path (for prioritization)
  const mostRecentPath = useMemo(() => {
    return [...paths].sort((a, b) => b.lastTouchedAt - a.lastTouchedAt)[0];
  }, [paths]);

  // Get path with lowest non-zero progress (for goals)
  const lowestProgressPath = useMemo(() => {
    const pathsWithProgress = paths.filter(p => p.progressPct > 0 && p.progressPct < 100);
    if (pathsWithProgress.length === 0) {
      return paths[0]; // Return first path if none started or all complete
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

/**
 * Record that a path was touched (for goal prioritization)
 */
export function recordPathTouched(pathId: 'personalFinance' | 'companyDiscovery' | 'careersFinance') {
  const key = LAST_TOUCHED_KEYS[pathId];
  localStorage.setItem(key, Date.now().toString());
}

export default useDashboardProgress;



