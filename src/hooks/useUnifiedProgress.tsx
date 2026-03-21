import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { createGamificationService, GamificationSource } from '@/services/gamificationService';

export interface ModuleProgress {
  id?: string;
  moduleId: string;
  moduleType: 'soft_skills' | 'career_finance' | 'personal_finance' | 'trading' | 'investment_banking' | 'venture_capital' | 'consulting';
  courseId?: string;
  progressPercentage: number;
  timeSpentMinutes: number;
  lastAccessed: string;
  completedAt?: string;
  detailedProgress: Record<string, any>;
}

interface UseUnifiedProgressOptions {
  moduleId: string;
  moduleType: ModuleProgress['moduleType'];
  courseId?: string;
}

export const useUnifiedProgress = ({ moduleId, moduleType, courseId }: UseUnifiedProgressOptions) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ModuleProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());

  // Create storage key for localStorage fallback
  const getStorageKey = useCallback(() => {
    return `progress_${moduleType}_${moduleId}${courseId ? `_${courseId}` : ''}`;
  }, [moduleType, moduleId, courseId]);

  // Load progress from database or localStorage
  const loadProgress = useCallback(async () => {
    if (!user) {
      // Load from localStorage for non-authenticated users
      const storageKey = getStorageKey();
      const savedProgress = localStorage.getItem(storageKey);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      } else {
        setProgress(createEmptyProgress());
      }
      setLoading(false);
      return;
    }

    try {
      // Build query with proper NULL handling for course_id
      let query = supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('module_id', moduleId)
        .eq('module_type', moduleType);

      // Handle course_id: match both NULL and empty string, or specific value
      if (courseId) {
        query = query.eq('course_id', courseId);
      } else {
        // Match either NULL or empty string for backwards compatibility
        query = query.or(`course_id.is.null,course_id.eq.`);
      }

      const { data, error } = await query.maybeSingle();

      if (error) {
        console.error('Error loading progress:', error);
        setProgress(createEmptyProgress());
      } else if (data) {
        setProgress({
          id: data.id,
          moduleId: data.module_id,
          moduleType: data.module_type as ModuleProgress['moduleType'],
          courseId: data.course_id || undefined,
          progressPercentage: data.progress_percentage,
          timeSpentMinutes: data.time_spent_minutes,
          lastAccessed: data.last_accessed,
          completedAt: data.completed_at || undefined,
          detailedProgress: (data.detailed_progress as Record<string, any>) || {}
        });
      } else {
        setProgress(createEmptyProgress());
      }
    } catch (error) {
      console.error('Error in loadProgress:', error);
      setProgress(createEmptyProgress());
    } finally {
      setLoading(false);
    }
  }, [user, moduleId, moduleType, courseId, getStorageKey]);

  // Create empty progress object
  const createEmptyProgress = useCallback((): ModuleProgress => ({
    moduleId,
    moduleType,
    courseId,
    progressPercentage: 0,
    timeSpentMinutes: 0,
    lastAccessed: new Date().toISOString(),
    detailedProgress: {}
  }), [moduleId, moduleType, courseId]);

  // Save progress to database and localStorage
  const saveProgress = useCallback(async (updates: Partial<ModuleProgress>) => {
    if (!progress) return;

    const updatedProgress = {
      ...progress,
      ...updates,
      lastAccessed: new Date().toISOString()
    };

    setProgress(updatedProgress);

    // Save to localStorage
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(updatedProgress));

    if (!user) return;

    try {
      const dataToSave = {
        user_id: user.id,
        module_id: updatedProgress.moduleId,
        module_type: updatedProgress.moduleType,
        course_id: updatedProgress.courseId || '',
        progress_percentage: updatedProgress.progressPercentage,
        time_spent_minutes: updatedProgress.timeSpentMinutes,
        last_accessed: updatedProgress.lastAccessed,
        completed_at: updatedProgress.completedAt || null,
        detailed_progress: updatedProgress.detailedProgress
      };

      if (updatedProgress.id) {
        const { error } = await supabase
          .from('module_progress')
          .update(dataToSave)
          .eq('id', updatedProgress.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('module_progress')
          .upsert(dataToSave, {
            onConflict: 'user_id,module_id,module_type,course_id'
          })
          .select()
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setProgress(prev => prev ? { ...prev, id: data.id } : null);
        }
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      // Continue silently - progress is still saved locally
    }
  }, [user, progress, getStorageKey]);

  // Update progress percentage
  const updateProgress = useCallback(async (percentage: number) => {
    const isComplete = percentage >= 100;
    await saveProgress({
      progressPercentage: percentage,
      completedAt: isComplete ? new Date().toISOString() : undefined
    });

    if (isComplete) {
      toast.success('Module completed! 🎉');
    }
  }, [saveProgress]);

  // Update detailed progress (for quizzes, activities, etc.)
  const updateDetailedProgress = useCallback(async (key: string, value: any) => {
    if (!progress) return;
    
    const newDetailedProgress = {
      ...progress.detailedProgress,
      [key]: value
    };

    await saveProgress({
      detailedProgress: newDetailedProgress
    });
  }, [progress, saveProgress]);

  // Mark module as complete
  const completeModule = useCallback(async () => {
    const timeSpent = Math.round((Date.now() - startTime) / (1000 * 60));
    const wasAlreadyCompleted = progress?.completedAt !== undefined;
    
    await saveProgress({
      progressPercentage: 100,
      timeSpentMinutes: (progress?.timeSpentMinutes || 0) + timeSpent,
      completedAt: new Date().toISOString()
    });

    // Award XP for completing the module (only if not already completed and authenticated)
    if (user && !wasAlreadyCompleted) {
      const gamificationService = await createGamificationService(user.id);
      await gamificationService.awardXp(
        50, // Base XP for module completion
        GamificationSource.MODULE_COMPLETION,
        `${moduleType}:${moduleId}`
      );
    }
  }, [saveProgress, startTime, progress, user, moduleType, moduleId]);

  // Add time spent
  const addTimeSpent = useCallback(async (minutes: number) => {
    await saveProgress({
      timeSpentMinutes: (progress?.timeSpentMinutes || 0) + minutes
    });
  }, [saveProgress, progress]);

  // Reset progress
  const resetProgress = useCallback(async () => {
    await saveProgress({
      progressPercentage: 0,
      timeSpentMinutes: 0,
      completedAt: undefined,
      detailedProgress: {}
    });
  }, [saveProgress]);

  // Save pre-test results
  const savePreTestResults = useCallback(async (
    score: number,
    answers: number[],
    weakAreas: string[],
    strongAreas: string[]
  ) => {
    if (!progress) return;

    const percentage = Math.round((score / answers.length) * 100);
    const testData = {
      preTestScore: percentage,
      preTestAnswers: answers,
      preTestCompletedAt: new Date().toISOString(),
      weakAreas,
      strongAreas,
      testAttempts: (progress.detailedProgress.testAttempts || 0) + 1
    };

    await saveProgress({
      detailedProgress: {
        ...progress.detailedProgress,
        ...testData
      }
    });

    // Award 5 XP for completing pre-test
    toast.success(`Pre-test complete! You scored ${percentage}%`, {
      description: 'Now let\'s start learning! 🎯'
    });

    return testData;
  }, [progress, saveProgress]);

  // Save post-test results
  const savePostTestResults = useCallback(async (
    score: number,
    answers: number[],
    weakAreas: string[],
    strongAreas: string[]
  ) => {
    if (!progress) return;

    const percentage = Math.round((score / answers.length) * 100);
    const preScore = progress.detailedProgress.preTestScore || 0;
    const improvement = percentage - preScore;

    const testData = {
      postTestScore: percentage,
      postTestAnswers: answers,
      postTestCompletedAt: new Date().toISOString(),
      postWeakAreas: weakAreas,
      postStrongAreas: strongAreas,
      improvement,
      timeSpentOnTests: (progress.detailedProgress.timeSpentOnTests || 0) + 10 // Estimate 10 minutes
    };

    await saveProgress({
      detailedProgress: {
        ...progress.detailedProgress,
        ...testData
      }
    });

    // Award bonus XP for improvement
    if (improvement >= 20) {
      toast.success(`🏆 Outstanding! ${percentage}% score with +${improvement}% improvement!`, {
        description: 'Bonus XP awarded! +50 XP'
      });
    } else if (improvement >= 15) {
      toast.success(`🌟 Great job! ${percentage}% score with +${improvement}% improvement!`, {
        description: 'Bonus XP awarded! +50 XP'
      });
    } else if (improvement > 0) {
      toast.success(`✨ Nice improvement! ${percentage}% score with +${improvement}% growth!`, {
        description: 'Bonus XP awarded! +25 XP'
      });
    } else {
      toast.success(`💪 Solid performance! ${percentage}% score!`, {
        description: 'You maintained your knowledge level!'
      });
    }

    return testData;
  }, [progress, saveProgress]);

  // Get test summary
  const getTestSummary = useCallback(() => {
    if (!progress) {
      return {
        hasPreTest: false,
        hasPostTest: false,
        preTestScore: undefined,
        postTestScore: undefined,
        improvement: undefined,
        weakAreas: [],
        strongAreas: [],
        postWeakAreas: [],
        postStrongAreas: []
      };
    }

    const dp = progress.detailedProgress || {};
    return {
      hasPreTest: !!dp.preTestScore,
      hasPostTest: !!dp.postTestScore,
      preTestScore: dp.preTestScore,
      postTestScore: dp.postTestScore,
      improvement: dp.improvement,
      weakAreas: dp.weakAreas || [],
      strongAreas: dp.strongAreas || [],
      postWeakAreas: dp.postWeakAreas || [],
      postStrongAreas: dp.postStrongAreas || [],
      preTestCompletedAt: dp.preTestCompletedAt,
      postTestCompletedAt: dp.postTestCompletedAt,
      testAttempts: dp.testAttempts || 0,
      timeSpentOnTests: dp.timeSpentOnTests || 0
    };
  }, [progress]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Auto-save time spent every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / (1000 * 60));
      if (timeSpent > 0) {
        addTimeSpent(Math.min(timeSpent, 5)); // Cap at 5 minutes per save
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [addTimeSpent, startTime]);

  return {
    progress,
    loading,
    updateProgress,
    updateDetailedProgress,
    completeModule,
    addTimeSpent,
    resetProgress,
    refresh: loadProgress,
    isCompleted: progress?.progressPercentage === 100,
    timeSpent: progress?.timeSpentMinutes || 0,
    // Test management functions
    savePreTestResults,
    savePostTestResults,
    getTestSummary
  };
};