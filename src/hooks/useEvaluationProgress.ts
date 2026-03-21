import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface ModuleProgress {
  lessonNumber: number;
  moduleNumber: string;
  completed: boolean;
  quizScore?: number;
  timeSpent?: number;
  completedAt?: string;
}

export interface LessonProgress {
  lessonNumber: number;
  modulesCompleted: number;
  totalModules: number;
  completed: boolean;
  badgeEarned: boolean;
}

export const useEvaluationProgress = () => {
  const { user } = useAuth();
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProgress = async () => {
    // Load from localStorage (works for both authenticated and non-authenticated users)
    const saved = localStorage.getItem('evaluation_progress');
    if (saved) {
      try {
        setModuleProgress(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing saved progress:', error);
      }
    }
    setLoading(false);
  };

  const saveProgress = async (progress: ModuleProgress) => {
    const updated = moduleProgress.filter(
      m => !(m.lessonNumber === progress.lessonNumber && m.moduleNumber === progress.moduleNumber)
    );
    updated.push(progress);
    setModuleProgress(updated);

    // Save to localStorage
    localStorage.setItem('evaluation_progress', JSON.stringify(updated));
  };

  const getModuleProgress = (lessonNumber: number, moduleNumber: string): ModuleProgress | null => {
    return moduleProgress.find(
      m => m.lessonNumber === lessonNumber && m.moduleNumber === moduleNumber
    ) || null;
  };

  const getLessonProgress = (lessonNumber: number, totalModules: number): LessonProgress => {
    const lessonModules = moduleProgress.filter(m => m.lessonNumber === lessonNumber);
    const completed = lessonModules.filter(m => m.completed);

    return {
      lessonNumber,
      modulesCompleted: completed.length,
      totalModules,
      completed: completed.length === totalModules && totalModules > 0,
      badgeEarned: completed.length === totalModules && totalModules > 0
    };
  };

  const getTotalProgress = (): { completed: number; total: number; percentage: number } => {
    const total = 9; // 3 lessons × 3 modules each
    const completed = moduleProgress.filter(m => m.completed).length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const isLessonUnlocked = (lessonNumber: number): boolean => {
    if (lessonNumber === 1) return true; // First lesson always unlocked
    
    // Lesson unlocked if previous lesson is completed
    const prevLesson = getLessonProgress(lessonNumber - 1, 3);
    return prevLesson.completed;
  };

  const isModuleUnlocked = (lessonNumber: number, moduleNumber: string): boolean => {
    const modNum = parseFloat(moduleNumber);
    
    // First module of unlocked lesson is always available
    if (modNum === Math.floor(modNum) + 0.1) {
      return isLessonUnlocked(lessonNumber);
    }

    // Check if previous module in same lesson is completed
    const prevModNum = (Math.floor(modNum) + (Math.round((modNum % 1) * 10) - 1) / 10).toFixed(1);
    const prevModule = getModuleProgress(lessonNumber, prevModNum);
    return prevModule?.completed || false;
  };

  const allLessonsCompleted = (): boolean => {
    return getTotalProgress().completed === 9;
  };

  useEffect(() => {
    loadProgress();
  }, [user]);

  return {
    moduleProgress,
    loading,
    saveProgress,
    getModuleProgress,
    getLessonProgress,
    getTotalProgress,
    isLessonUnlocked,
    isModuleUnlocked,
    allLessonsCompleted,
    refreshProgress: loadProgress
  };
};
