/**
 * Economics Progress Hook
 * 
 * Manages progress tracking for the Business Economics curriculum.
 * Supports two parallel tracks (Microeconomics and Macroeconomics)
 * with localStorage persistence.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  EconomicsProgress,
  UnitProgress,
  UnitStatus,
  EconomicsTrack,
  INITIAL_ECONOMICS_PROGRESS,
} from '@/types/economics-curriculum';

const STORAGE_KEY = 'economics_curriculum_progress';

function loadProgress(): EconomicsProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...INITIAL_ECONOMICS_PROGRESS,
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Failed to load Economics progress:', e);
  }
  return { ...INITIAL_ECONOMICS_PROGRESS };
}

function saveProgress(state: EconomicsProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      lastActivityAt: new Date().toISOString(),
    }));
  } catch (e) {
    console.error('Failed to save Economics progress:', e);
  }
}

export function useEconomicsProgress() {
  const [progress, setProgress] = useState<EconomicsProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  /**
   * Get progress for a specific unit
   */
  const getUnitProgress = useCallback((unitId: string, track: EconomicsTrack): UnitProgress | undefined => {
    const trackProgress = progress[track];
    return trackProgress.find(p => p.unitId === unitId);
  }, [progress]);

  /**
   * Get the status of a unit (considering unlock requirements)
   */
  const getUnitStatus = useCallback((unitId: string, track: EconomicsTrack, previousUnitId?: string): UnitStatus => {
    const unitProgress = getUnitProgress(unitId, track);
    
    if (unitProgress?.status) {
      return unitProgress.status;
    }

    if (!previousUnitId) {
      return 'unlocked';
    }

    const prevProgress = getUnitProgress(previousUnitId, track);
    if (prevProgress?.status === 'completed') {
      return 'unlocked';
    }

    return 'locked';
  }, [getUnitProgress]);

  /**
   * Initialize or update unit progress
   */
  const initializeUnitProgress = useCallback((unitId: string, track: EconomicsTrack): UnitProgress => {
    const existing = getUnitProgress(unitId, track);
    if (existing) return existing;

    return {
      unitId,
      status: 'unlocked',
      completedLessons: [],
      gamifiedActivityCompleted: false,
      xpEarned: 0,
      bambooEarned: 0,
    };
  }, [getUnitProgress]);

  /**
   * Start a unit (set to active)
   */
  const startUnit = useCallback((unitId: string, track: EconomicsTrack) => {
    setProgress(prev => {
      const trackProgress = [...prev[track]];
      const existingIndex = trackProgress.findIndex(p => p.unitId === unitId);
      
      const unitProgress: UnitProgress = existingIndex >= 0 
        ? { ...trackProgress[existingIndex], status: 'active' }
        : {
            unitId,
            status: 'active',
            completedLessons: [],
            gamifiedActivityCompleted: false,
            xpEarned: 0,
            bambooEarned: 0,
          };

      if (existingIndex >= 0) {
        trackProgress[existingIndex] = unitProgress;
      } else {
        trackProgress.push(unitProgress);
      }

      return {
        ...prev,
        [track]: trackProgress,
      };
    });
  }, []);

  /**
   * Complete a lesson within a unit
   */
  const completeLesson = useCallback((
    unitId: string,
    lessonId: string,
    track: EconomicsTrack,
    xp: number,
    bamboo: number,
    totalLessonsInUnit: number
  ) => {
    setProgress(prev => {
      const trackProgress = [...prev[track]];
      const existingIndex = trackProgress.findIndex(p => p.unitId === unitId);
      
      const current = existingIndex >= 0 
        ? trackProgress[existingIndex]
        : initializeUnitProgress(unitId, track);

      const completedLessons = [...new Set([...current.completedLessons, lessonId])];
      const allLessonsComplete = completedLessons.length >= totalLessonsInUnit;
      const isUnitComplete = allLessonsComplete && current.gamifiedActivityCompleted;

      const updatedProgress: UnitProgress = {
        ...current,
        status: isUnitComplete ? 'completed' : 'active',
        completedLessons,
        xpEarned: current.xpEarned + xp,
        bambooEarned: current.bambooEarned + bamboo,
        completedAt: isUnitComplete ? new Date().toISOString() : current.completedAt,
      };

      if (existingIndex >= 0) {
        trackProgress[existingIndex] = updatedProgress;
      } else {
        trackProgress.push(updatedProgress);
      }

      return {
        ...prev,
        [track]: trackProgress,
        totalXpEarned: prev.totalXpEarned + xp,
        totalBambooEarned: prev.totalBambooEarned + bamboo,
      };
    });
  }, [initializeUnitProgress]);

  /**
   * Complete the gamified activity for a unit
   */
  const completeGamifiedActivity = useCallback((
    unitId: string,
    track: EconomicsTrack,
    xp: number,
    bamboo: number,
    totalLessonsInUnit: number
  ) => {
    setProgress(prev => {
      const trackProgress = [...prev[track]];
      const existingIndex = trackProgress.findIndex(p => p.unitId === unitId);
      
      const current = existingIndex >= 0 
        ? trackProgress[existingIndex]
        : initializeUnitProgress(unitId, track);

      const allLessonsComplete = current.completedLessons.length >= totalLessonsInUnit;
      const isUnitComplete = allLessonsComplete;

      const updatedProgress: UnitProgress = {
        ...current,
        status: isUnitComplete ? 'completed' : current.status,
        gamifiedActivityCompleted: true,
        xpEarned: current.xpEarned + xp,
        bambooEarned: current.bambooEarned + bamboo,
        completedAt: isUnitComplete ? new Date().toISOString() : current.completedAt,
      };

      if (existingIndex >= 0) {
        trackProgress[existingIndex] = updatedProgress;
      } else {
        trackProgress.push(updatedProgress);
      }

      return {
        ...prev,
        [track]: trackProgress,
        totalXpEarned: prev.totalXpEarned + xp,
        totalBambooEarned: prev.totalBambooEarned + bamboo,
      };
    });
  }, [initializeUnitProgress]);

  /**
   * Get overall progress for a track
   */
  const getTrackProgress = useCallback((track: EconomicsTrack, totalUnits: number) => {
    const trackProgress = progress[track];
    const completedUnits = trackProgress.filter(p => p.status === 'completed').length;
    const percentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
    
    return {
      completedUnits,
      totalUnits,
      percentage,
    };
  }, [progress]);

  /**
   * Get the next incomplete unit in a track
   */
  const getNextIncompleteUnit = useCallback((track: EconomicsTrack, unitIds: string[]): string | null => {
    for (const unitId of unitIds) {
      const unitProgress = getUnitProgress(unitId, track);
      if (!unitProgress || unitProgress.status !== 'completed') {
        return unitId;
      }
    }
    return null;
  }, [getUnitProgress]);

  /**
   * Check if a unit is completed
   */
  const isUnitCompleted = useCallback((unitId: string, track: EconomicsTrack): boolean => {
    const unitProgress = getUnitProgress(unitId, track);
    return unitProgress?.status === 'completed';
  }, [getUnitProgress]);

  /**
   * Get lesson completion status
   */
  const isLessonCompleted = useCallback((unitId: string, lessonId: string, track: EconomicsTrack): boolean => {
    const unitProgress = getUnitProgress(unitId, track);
    return unitProgress?.completedLessons.includes(lessonId) ?? false;
  }, [getUnitProgress]);

  /**
   * Reset all progress (for testing/dev)
   */
  const resetProgress = useCallback(() => {
    setProgress({ ...INITIAL_ECONOMICS_PROGRESS });
  }, []);

  /**
   * Reset progress for a specific track
   */
  const resetTrackProgress = useCallback((track: EconomicsTrack) => {
    setProgress(prev => ({
      ...prev,
      [track]: [],
    }));
  }, []);

  const totalProgress = useMemo(() => {
    const microCompleted = progress.microeconomics.filter(p => p.status === 'completed').length;
    const macroCompleted = progress.macroeconomics.filter(p => p.status === 'completed').length;
    return {
      microeconomics: microCompleted,
      macroeconomics: macroCompleted,
      total: microCompleted + macroCompleted,
    };
  }, [progress]);

  return {
    progress,
    getUnitProgress,
    getUnitStatus,
    startUnit,
    completeLesson,
    completeGamifiedActivity,
    getTrackProgress,
    getNextIncompleteUnit,
    isUnitCompleted,
    isLessonCompleted,
    resetProgress,
    resetTrackProgress,
    totalProgress,
    totalXpEarned: progress.totalXpEarned,
    totalBambooEarned: progress.totalBambooEarned,
  };
}

export default useEconomicsProgress;
