
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface LessonProgress {
  lessonId: string;
  masteredTerms: string[];
  quizScores: Record<string, number>;
  completedActivities: string[];
  lastAccessed: string;
}

export const useLessonProgress = (lessonId: string) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<LessonProgress>({
    lessonId,
    masteredTerms: [],
    quizScores: {},
    completedActivities: [],
    lastAccessed: new Date().toISOString()
  });

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user, lessonId]);

  const loadProgress = () => {
    if (!user) return;
    
    const storageKey = `lesson_progress_${user.id}_${lessonId}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      const savedProgress = JSON.parse(saved);
      setProgress({
        ...savedProgress,
        lastAccessed: new Date().toISOString()
      });
    }
  };

  const saveProgress = (updatedProgress: Partial<LessonProgress>) => {
    if (!user) return;
    
    const newProgress = {
      ...progress,
      ...updatedProgress,
      lastAccessed: new Date().toISOString()
    };
    
    setProgress(newProgress);
    
    const storageKey = `lesson_progress_${user.id}_${lessonId}`;
    localStorage.setItem(storageKey, JSON.stringify(newProgress));
  };

  const markTermMastered = (term: string) => {
    const updatedTerms = progress.masteredTerms.includes(term)
      ? progress.masteredTerms.filter(t => t !== term)
      : [...progress.masteredTerms, term];
    
    saveProgress({ masteredTerms: updatedTerms });
  };

  const saveQuizScore = (quizId: string, score: number) => {
    const updatedScores = {
      ...progress.quizScores,
      [quizId]: score
    };
    
    saveProgress({ quizScores: updatedScores });
  };

  const markActivityCompleted = (activityId: string) => {
    if (!progress.completedActivities.includes(activityId)) {
      const updatedActivities = [...progress.completedActivities, activityId];
      saveProgress({ completedActivities: updatedActivities });
    }
  };

  const getProgressPercentage = (totalTerms: number, totalActivities: number) => {
    const termProgress = progress.masteredTerms.length / totalTerms;
    const activityProgress = progress.completedActivities.length / totalActivities;
    const quizProgress = Object.keys(progress.quizScores).length > 0 ? 1 : 0;
    
    return Math.round(((termProgress + activityProgress + quizProgress) / 3) * 100);
  };

  return {
    progress,
    markTermMastered,
    saveQuizScore,
    markActivityCompleted,
    getProgressPercentage
  };
};
