/**
 * Market Intelligence Progress Hook
 * 
 * Manages progress tracking for Market Intelligence modules.
 * Uses LocalStorage for persistence with the same pattern as other progress hooks.
 */

import { useState, useEffect, useCallback } from 'react';
import { getAllModules, ModuleCardData } from '@/data/market-intelligence/catalog';

const STORAGE_KEY = 'market_intelligence_progress';

interface ModuleProgressData {
  completed: boolean;
  completedAt?: string;
  checkpoints?: number;
}

interface MarketIntelligenceProgressState {
  modules: Record<string, ModuleProgressData>;
  lastUpdated: string;
}

function getDefaultState(): MarketIntelligenceProgressState {
  return {
    modules: {},
    lastUpdated: new Date().toISOString(),
  };
}

function loadProgress(): MarketIntelligenceProgressState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load Market Intelligence progress:', e);
  }
  return getDefaultState();
}

function saveProgress(state: MarketIntelligenceProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      lastUpdated: new Date().toISOString(),
    }));
  } catch (e) {
    console.error('Failed to save Market Intelligence progress:', e);
  }
}

/**
 * Hook for managing Market Intelligence progress
 */
export function useMarketIntelligenceProgress() {
  const [progress, setProgress] = useState<MarketIntelligenceProgressState>(loadProgress);

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  /**
   * Get progress for a specific module
   */
  const getModuleProgress = useCallback((moduleId: string) => {
    const moduleProgress = progress.modules[moduleId];
    return {
      completed: moduleProgress?.completed ?? false,
      completedAt: moduleProgress?.completedAt,
      checkpoints: moduleProgress?.checkpoints ?? 0,
      totalCheckpoints: 1, // For now, each module has 1 checkpoint
    };
  }, [progress]);

  /**
   * Mark a module as complete
   */
  const completeModule = useCallback((moduleId: string) => {
    setProgress(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: {
          completed: true,
          completedAt: new Date().toISOString(),
          checkpoints: 1,
        },
      },
    }));
  }, []);

  /**
   * Get overall progress percentage
   */
  const overallProgress = (() => {
    const allModules = getAllModules();
    const completedCount = allModules.filter(
      m => progress.modules[m.id]?.completed
    ).length;
    return Math.round((completedCount / allModules.length) * 100);
  })();

  /**
   * Get section progress
   */
  const getSectionProgress = useCallback((sectionId: string) => {
    const allModules = getAllModules();
    const sectionModules = allModules.filter(m => m.sectionId === sectionId);
    const completedCount = sectionModules.filter(
      m => progress.modules[m.id]?.completed
    ).length;
    return {
      completed: completedCount,
      total: sectionModules.length,
      percentage: Math.round((completedCount / sectionModules.length) * 100),
    };
  }, [progress]);

  /**
   * Get next incomplete module (for "Continue" button)
   */
  const getNextIncompleteModule = useCallback((): ModuleCardData | null => {
    const allModules = getAllModules();
    
    // Sort by section order, then by module order
    const sortedModules = [...allModules].sort((a, b) => {
      const sectionOrder: Record<string, number> = {
        'business-economics': 1,
        'markets-headlines': 2,
        'ownership': 3,
        'language-finance': 4,
      };
      const sectionDiff = (sectionOrder[a.sectionId] ?? 99) - (sectionOrder[b.sectionId] ?? 99);
      if (sectionDiff !== 0) return sectionDiff;
      return a.order - b.order;
    });

    // Find first incomplete
    return sortedModules.find(m => !progress.modules[m.id]?.completed) ?? null;
  }, [progress]);

  /**
   * Get completed module count
   */
  const completedModuleCount = Object.values(progress.modules).filter(m => m.completed).length;

  /**
   * Reset all progress (for testing/dev)
   */
  const resetProgress = useCallback(() => {
    setProgress(getDefaultState());
  }, []);

  return {
    progress,
    getModuleProgress,
    completeModule,
    overallProgress,
    getSectionProgress,
    getNextIncompleteModule,
    completedModuleCount,
    resetProgress,
  };
}

export default useMarketIntelligenceProgress;



