/**
 * Progress tracking for Business Foundations (Marketing + Management & Strategy).
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  UnitProgress,
  UnitStatus,
  EconomicsTrack,
} from '@/types/economics-curriculum';

const STORAGE_KEY = 'business_foundations_progress';
const TRACK: EconomicsTrack = 'business-foundations';

interface BusinessFoundationsProgressState {
  units: UnitProgress[];
  totalXpEarned: number;
  totalBambooEarned: number;
  lastActivityAt: string;
}

const INITIAL_STATE: BusinessFoundationsProgressState = {
  units: [],
  totalXpEarned: 0,
  totalBambooEarned: 0,
  lastActivityAt: new Date().toISOString(),
};

function loadProgress(): BusinessFoundationsProgressState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...INITIAL_STATE, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load Business Foundations progress:', e);
  }
  return { ...INITIAL_STATE };
}

function saveProgress(state: BusinessFoundationsProgressState): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, lastActivityAt: new Date().toISOString() })
    );
  } catch (e) {
    console.error('Failed to save Business Foundations progress:', e);
  }
}

export function useBusinessFoundationsProgress() {
  const [progress, setProgress] = useState<BusinessFoundationsProgressState>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const getUnitProgress = useCallback(
    (unitId: string): UnitProgress | undefined =>
      progress.units.find((p) => p.unitId === unitId),
    [progress.units]
  );

  const getUnitStatus = useCallback(
    (unitId: string, previousUnitId?: string): UnitStatus => {
      const unitProgress = getUnitProgress(unitId);
      if (unitProgress?.status) return unitProgress.status;
      if (!previousUnitId) return 'unlocked';
      const prev = getUnitProgress(previousUnitId);
      return prev?.status === 'completed' ? 'unlocked' : 'locked';
    },
    [getUnitProgress]
  );

  const initializeUnitProgress = useCallback(
    (unitId: string): UnitProgress => {
      const existing = getUnitProgress(unitId);
      if (existing) return existing;
      return {
        unitId,
        status: 'unlocked',
        completedLessons: [],
        gamifiedActivityCompleted: false,
        xpEarned: 0,
        bambooEarned: 0,
      };
    },
    [getUnitProgress]
  );

  const startUnit = useCallback((unitId: string) => {
    setProgress((prev) => {
      const units = [...prev.units];
      const idx = units.findIndex((p) => p.unitId === unitId);
      const unitProgress: UnitProgress =
        idx >= 0
          ? { ...units[idx], status: 'active' }
          : {
              unitId,
              status: 'active',
              completedLessons: [],
              gamifiedActivityCompleted: false,
              xpEarned: 0,
              bambooEarned: 0,
            };
      if (idx >= 0) units[idx] = unitProgress;
      else units.push(unitProgress);
      return { ...prev, units };
    });
  }, []);

  const completeLesson = useCallback(
    (unitId: string, lessonId: string, xp: number, bamboo: number, totalLessonsInUnit: number) => {
      setProgress((prev) => {
        const units = [...prev.units];
        const idx = units.findIndex((p) => p.unitId === unitId);
        const current = idx >= 0 ? units[idx] : initializeUnitProgress(unitId);
        const completedLessons = [...new Set([...current.completedLessons, lessonId])];
        const allLessonsComplete = completedLessons.length >= totalLessonsInUnit;
        const isUnitComplete = allLessonsComplete && current.gamifiedActivityCompleted;
        const updated: UnitProgress = {
          ...current,
          status: isUnitComplete ? 'completed' : 'active',
          completedLessons,
          xpEarned: current.xpEarned + xp,
          bambooEarned: current.bambooEarned + bamboo,
          completedAt: isUnitComplete ? new Date().toISOString() : current.completedAt,
        };
        if (idx >= 0) units[idx] = updated;
        else units.push(updated);
        return {
          ...prev,
          units,
          totalXpEarned: prev.totalXpEarned + xp,
          totalBambooEarned: prev.totalBambooEarned + bamboo,
        };
      });
    },
    [initializeUnitProgress]
  );

  const completeGamifiedActivity = useCallback(
    (unitId: string, xp: number, bamboo: number, totalLessonsInUnit: number) => {
      setProgress((prev) => {
        const units = [...prev.units];
        const idx = units.findIndex((p) => p.unitId === unitId);
        const current = idx >= 0 ? units[idx] : initializeUnitProgress(unitId);
        const allLessonsComplete = current.completedLessons.length >= totalLessonsInUnit;
        const updated: UnitProgress = {
          ...current,
          status: allLessonsComplete ? 'completed' : current.status,
          gamifiedActivityCompleted: true,
          xpEarned: current.xpEarned + xp,
          bambooEarned: current.bambooEarned + bamboo,
          completedAt: allLessonsComplete ? new Date().toISOString() : current.completedAt,
        };
        if (idx >= 0) units[idx] = updated;
        else units.push(updated);
        return {
          ...prev,
          units,
          totalXpEarned: prev.totalXpEarned + xp,
          totalBambooEarned: prev.totalBambooEarned + bamboo,
        };
      });
    },
    [initializeUnitProgress]
  );

  const totalProgress = useMemo(() => {
    const completed = progress.units.filter((p) => p.status === 'completed').length;
    return { completed, total: 2 };
  }, [progress.units]);

  return {
    track: TRACK,
    getUnitProgress,
    getUnitStatus,
    startUnit,
    completeLesson,
    completeGamifiedActivity,
    totalXpEarned: progress.totalXpEarned,
    totalBambooEarned: progress.totalBambooEarned,
    totalProgress,
  };
}

export default useBusinessFoundationsProgress;
