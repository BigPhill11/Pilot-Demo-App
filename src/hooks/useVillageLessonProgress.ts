import { useState, useEffect, useCallback } from 'react';
import type { VillageModuleId } from '@/types/village-lesson';
import {
  migrateLegacyStorageKey,
  notifyProgressUpdated,
  scopedStorageKey,
} from '@/lib/userScopedStorage';

const STORAGE_KEY_BASE = 'village_lesson_progress_v1';

export interface LessonRecord {
  completedAt: string;
  xpEarned: number;
  bambooEarned: number;
}

export interface VillageLessonProgressState {
  completedLessons: Record<string, LessonRecord>;
  totalXp: number;
  totalBamboo: number;
}

function load(): VillageLessonProgressState {
  try {
    migrateLegacyStorageKey(STORAGE_KEY_BASE);
    const raw = localStorage.getItem(scopedStorageKey(STORAGE_KEY_BASE));
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { completedLessons: {}, totalXp: 0, totalBamboo: 0 };
}

function save(state: VillageLessonProgressState) {
  try {
    localStorage.setItem(scopedStorageKey(STORAGE_KEY_BASE), JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function useVillageLessonProgress() {
  const [state, setState] = useState<VillageLessonProgressState>(load);

  useEffect(() => {
    save(state);
  }, [state]);

  const isLessonCompleted = useCallback(
    (lessonId: string) => !!state.completedLessons[lessonId],
    [state]
  );

  const completeLesson = useCallback((lessonId: string, xp: number, bamboo: number) => {
    setState((prev) => {
      if (prev.completedLessons[lessonId]) return prev;
      const next = {
        completedLessons: {
          ...prev.completedLessons,
          [lessonId]: {
            completedAt: new Date().toISOString(),
            xpEarned: xp,
            bambooEarned: bamboo,
          },
        },
        totalXp: prev.totalXp + xp,
        totalBamboo: prev.totalBamboo + bamboo,
      };
      notifyProgressUpdated();
      return next;
    });
  }, []);

  const getModuleProgress = useCallback(
    (moduleId: VillageModuleId, totalLessons: number) => {
      const completed = Object.keys(state.completedLessons).filter(
        (id) =>
          id.startsWith(moduleId.replace('-', '').substring(0, 2)) ||
          (moduleId === 'business-economics' && id.startsWith('be-')) ||
          (moduleId === 'ownership' && id.startsWith('own-')) ||
          (moduleId === 'language-finance' && id.startsWith('lf-')) ||
          (moduleId === 'markets-headlines' && id.startsWith('mh-')) ||
          (moduleId === 'business-foundations' && id.startsWith('bf-'))
      ).length;
      return {
        completed,
        total: totalLessons,
        percent: totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0,
      };
    },
    [state]
  );

  const resetProgress = useCallback(() => {
    setState({ completedLessons: {}, totalXp: 0, totalBamboo: 0 });
    notifyProgressUpdated();
  }, []);

  return {
    isLessonCompleted,
    completeLesson,
    getModuleProgress,
    resetProgress,
    totalXp: state.totalXp,
    totalBamboo: state.totalBamboo,
    completedLessons: state.completedLessons,
  };
}
