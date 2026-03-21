import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { toast } from 'sonner';

export interface SoftSkillsModuleProgress {
  moduleId: string;
  courseId: string;
  lessonId?: string;
  progressPercentage: number;
  timeSpentMinutes: number;
  lastAccessed: string;
  completedAt?: string;
  detailedProgress: {
    completedLessons: string[];
    quizScores: Record<string, number>;
    assignments: Record<string, any>;
    xpEarned: number;
    achievements: string[];
  };
}

export interface SoftSkillsCourseProgress {
  courseId: string;
  overallProgress: number;
  completedModules: number;
  totalModules: number;
  lastAccessed: string;
  estimatedTimeLeft: number;
}

interface UseSoftSkillsProgressOptions {
  courseId?: string;
  moduleId?: string;
  autoSync?: boolean;
}

export const useSoftSkillsProgress = (options: UseSoftSkillsProgressOptions = {}) => {
  const { user } = useAuth();
  const { updateActivityComplete, updateQuizScore, refreshProgress } = useProgressTracking();
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [offline, setOffline] = useState(!navigator.onLine);
  
  // Progress state
  const [moduleProgress, setModuleProgress] = useState<SoftSkillsModuleProgress[]>([]);
  const [courseProgress, setCourseProgress] = useState<SoftSkillsCourseProgress[]>([]);
  const [pendingUpdates, setPendingUpdates] = useState<any[]>([]);
  
  // Refs for cleanup and optimization
  const syncTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSyncRef = useRef<Date>(new Date());

  // Storage keys
  const getStorageKey = useCallback((type: 'modules' | 'courses' | 'pending') => {
    const prefix = user?.id ? `${user.id}_` : 'anonymous_';
    return `soft_skills_${type}_${prefix}${options.courseId || 'all'}`;
  }, [user?.id, options.courseId]);

  // Load progress from localStorage
  const loadLocalProgress = useCallback(() => {
    try {
      const modulesKey = getStorageKey('modules');
      const coursesKey = getStorageKey('courses');
      const pendingKey = getStorageKey('pending');
      
      const savedModules = localStorage.getItem(modulesKey);
      const savedCourses = localStorage.getItem(coursesKey);
      const savedPending = localStorage.getItem(pendingKey);
      
      if (savedModules) setModuleProgress(JSON.parse(savedModules));
      if (savedCourses) setCourseProgress(JSON.parse(savedCourses));
      if (savedPending) setPendingUpdates(JSON.parse(savedPending));
    } catch (error) {
      console.error('Error loading local progress:', error);
    }
  }, [getStorageKey]);

  // Save progress to localStorage
  const saveLocalProgress = useCallback(() => {
    try {
      const modulesKey = getStorageKey('modules');
      const coursesKey = getStorageKey('courses');
      const pendingKey = getStorageKey('pending');
      
      localStorage.setItem(modulesKey, JSON.stringify(moduleProgress));
      localStorage.setItem(coursesKey, JSON.stringify(courseProgress));
      localStorage.setItem(pendingKey, JSON.stringify(pendingUpdates));
    } catch (error) {
      console.error('Error saving local progress:', error);
    }
  }, [moduleProgress, courseProgress, pendingUpdates, getStorageKey]);

  // Load progress from database
  const loadDatabaseProgress = useCallback(async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('module_type', 'soft_skills');
      
      if (options.courseId) {
        query = query.eq('course_id', options.courseId);
      }

      const { data, error } = await query;
      
      if (error) throw error;

      // Transform database format to our format
      const transformedModules: SoftSkillsModuleProgress[] = data?.map(item => {
        let detailedProgress = {
          completedLessons: [],
          quizScores: {},
          assignments: {},
          xpEarned: 0,
          achievements: []
        };

        // Safely parse detailed_progress if it exists
        if (item.detailed_progress && typeof item.detailed_progress === 'object') {
          try {
            detailedProgress = {
              completedLessons: (item.detailed_progress as any)?.completedLessons || [],
              quizScores: (item.detailed_progress as any)?.quizScores || {},
              assignments: (item.detailed_progress as any)?.assignments || {},
              xpEarned: (item.detailed_progress as any)?.xpEarned || 0,
              achievements: (item.detailed_progress as any)?.achievements || []
            };
          } catch (error) {
            console.warn('Error parsing detailed_progress:', error);
          }
        }

        return {
          moduleId: item.module_id,
          courseId: item.course_id || '',
          progressPercentage: item.progress_percentage,
          timeSpentMinutes: item.time_spent_minutes,
          lastAccessed: item.last_accessed,
          completedAt: item.completed_at || undefined,
          detailedProgress
        };
      }) || [];

      setModuleProgress(transformedModules);
      calculateCourseProgress(transformedModules);
      
    } catch (error) {
      console.error('Error loading database progress:', error);
      toast.error('Failed to load progress from server');
    }
  }, [user, options.courseId]);

  // Calculate course progress from module progress
  const calculateCourseProgress = useCallback((modules: SoftSkillsModuleProgress[]) => {
    const courseMap = new Map<string, SoftSkillsModuleProgress[]>();
    
    modules.forEach(module => {
      if (!courseMap.has(module.courseId)) {
        courseMap.set(module.courseId, []);
      }
      courseMap.get(module.courseId)?.push(module);
    });

    const courses: SoftSkillsCourseProgress[] = Array.from(courseMap.entries()).map(([courseId, courseModules]) => {
      const totalModules = courseModules.length;
      const completedModules = courseModules.filter(m => m.progressPercentage >= 100).length;
      const overallProgress = totalModules > 0 
        ? courseModules.reduce((sum, m) => sum + m.progressPercentage, 0) / totalModules 
        : 0;
      
      const lastAccessed = courseModules.reduce((latest, m) => 
        new Date(m.lastAccessed) > new Date(latest) ? m.lastAccessed : latest, 
        courseModules[0]?.lastAccessed || new Date().toISOString()
      );

      const totalTimeSpent = courseModules.reduce((sum, m) => sum + m.timeSpentMinutes, 0);
      const estimatedTimeLeft = Math.max(0, (totalModules * 30) - totalTimeSpent); // Assuming 30 min per module

      return {
        courseId,
        overallProgress,
        completedModules,
        totalModules,
        lastAccessed,
        estimatedTimeLeft
      };
    });

    setCourseProgress(courses);
  }, []);

  // Sync progress to database
  const syncToDatabase = useCallback(async (updates?: any[]) => {
    if (!user || offline) return false;

    const updatesToSync = updates || pendingUpdates;
    if (updatesToSync.length === 0) return true;

    setSyncing(true);
    
    try {
      for (const update of updatesToSync) {
        const { data, error } = await supabase
          .from('module_progress')
          .upsert({
            user_id: user.id,
            module_id: update.moduleId,
            module_type: 'soft_skills',
            course_id: update.courseId,
            progress_percentage: update.progressPercentage,
            time_spent_minutes: update.timeSpentMinutes,
            last_accessed: update.lastAccessed,
            completed_at: update.completedAt,
            detailed_progress: update.detailedProgress
          }, {
            onConflict: 'user_id,module_id,module_type,course_id'
          });

        if (error) throw error;

        // Update global progress tracking if module completed
        if (update.completedAt && !update.wasAlreadyCompleted) {
          await updateActivityComplete(`soft_skills_${update.moduleId}`, update.detailedProgress.xpEarned || 50);
        }
      }

      // Clear pending updates after successful sync
      setPendingUpdates([]);
      lastSyncRef.current = new Date();
      
      toast.success('Progress synced successfully');
      return true;
      
    } catch (error) {
      console.error('Error syncing progress:', error);
      toast.error('Failed to sync progress. Changes saved locally.');
      return false;
    } finally {
      setSyncing(false);
    }
  }, [user, offline, pendingUpdates, updateActivityComplete]);

  // Auto-sync with debouncing
  const scheduleSync = useCallback(() => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    
    syncTimeoutRef.current = setTimeout(() => {
      if (options.autoSync !== false) {
        syncToDatabase();
      }
    }, 2000); // 2 second delay
  }, [syncToDatabase, options.autoSync]);

  // Update module progress
  const updateModuleProgress = useCallback(async (
    moduleId: string,
    courseId: string,
    updates: Partial<SoftSkillsModuleProgress>
  ) => {
    const now = new Date().toISOString();
    
    setModuleProgress(prev => {
      const existing = prev.find(p => p.moduleId === moduleId && p.courseId === courseId);
      const wasAlreadyCompleted = existing?.progressPercentage >= 100;
      
      const updated: SoftSkillsModuleProgress = {
        moduleId,
        courseId,
        progressPercentage: 0,
        timeSpentMinutes: 0,
        detailedProgress: {
          completedLessons: [],
          quizScores: {},
          assignments: {},
          xpEarned: 0,
          achievements: []
        },
        ...existing,
        ...updates,
        lastAccessed: now
      };

      // Ensure progress doesn't exceed 100%
      updated.progressPercentage = Math.min(100, Math.max(0, updated.progressPercentage));
      
      // Mark as completed if at 100%
      if (updated.progressPercentage >= 100 && !updated.completedAt) {
        updated.completedAt = now;
      }

      const newProgress = prev.filter(p => !(p.moduleId === moduleId && p.courseId === courseId));
      newProgress.push(updated);
      
      // Calculate course progress
      calculateCourseProgress(newProgress);
      
      // Add to pending updates
      setPendingUpdates(current => {
        const filtered = current.filter(u => !(u.moduleId === moduleId && u.courseId === courseId));
        filtered.push({ ...updated, wasAlreadyCompleted });
        return filtered;
      });
      
      return newProgress;
    });

    scheduleSync();
  }, [calculateCourseProgress, scheduleSync]);

  // Complete lesson
  const completeLesson = useCallback(async (
    moduleId: string,
    courseId: string,
    lessonId: string,
    xpEarned: number = 10
  ) => {
    const existing = moduleProgress.find(p => p.moduleId === moduleId && p.courseId === courseId);
    const currentLessons = existing?.detailedProgress?.completedLessons || [];
    
    if (currentLessons.includes(lessonId)) {
      return; // Already completed
    }

    const newLessons = [...currentLessons, lessonId];
    const newXp = (existing?.detailedProgress?.xpEarned || 0) + xpEarned;
    
    const defaultDetailedProgress = {
      completedLessons: [],
      quizScores: {},
      assignments: {},
      xpEarned: 0,
      achievements: []
    };

    await updateModuleProgress(moduleId, courseId, {
      detailedProgress: {
        ...defaultDetailedProgress,
        ...existing?.detailedProgress,
        completedLessons: newLessons,
        xpEarned: newXp
      },
      timeSpentMinutes: (existing?.timeSpentMinutes || 0) + 5 // Add 5 min per lesson
    });

    toast.success(`Lesson completed! +${xpEarned} XP`);
  }, [moduleProgress, updateModuleProgress]);

  // Complete quiz
  const completeQuiz = useCallback(async (
    moduleId: string,
    courseId: string,
    quizId: string,
    score: number,
    isCorrect: boolean
  ) => {
    const existing = moduleProgress.find(p => p.moduleId === moduleId && p.courseId === courseId);
    const currentScores = existing?.detailedProgress?.quizScores || {};
    
    // Don't update if score is lower than existing
    if (currentScores[quizId] && currentScores[quizId] >= score) {
      return;
    }

    const xpEarned = isCorrect ? (score >= 80 ? 20 : 10) : 5;
    const newXp = (existing?.detailedProgress?.xpEarned || 0) + xpEarned;

    const defaultDetailedProgress = {
      completedLessons: [],
      quizScores: {},
      assignments: {},
      xpEarned: 0,
      achievements: []
    };

    await updateModuleProgress(moduleId, courseId, {
      detailedProgress: {
        ...defaultDetailedProgress,
        ...existing?.detailedProgress,
        quizScores: {
          ...currentScores,
          [quizId]: score
        },
        xpEarned: newXp
      }
    });

    // Update global progress tracking
    await updateQuizScore(quizId, isCorrect);
    
    toast.success(`Quiz completed! Score: ${score}% (+${xpEarned} XP)`);
  }, [moduleProgress, updateModuleProgress, updateQuizScore]);

  // Complete module
  const completeModule = useCallback(async (
    moduleId: string,
    courseId: string,
    finalXp: number = 50
  ) => {
    const existing = moduleProgress.find(p => p.moduleId === moduleId && p.courseId === courseId);
    
    if (existing?.progressPercentage >= 100) {
      return; // Already completed
    }

    const newXp = (existing?.detailedProgress?.xpEarned || 0) + finalXp;

    const defaultDetailedProgress = {
      completedLessons: [],
      quizScores: {},
      assignments: {},
      xpEarned: 0,
      achievements: []
    };

    await updateModuleProgress(moduleId, courseId, {
      progressPercentage: 100,
      detailedProgress: {
        ...defaultDetailedProgress,
        ...existing?.detailedProgress,
        xpEarned: newXp
      }
    });

    toast.success(`Module completed! +${finalXp} XP`);
  }, [moduleProgress, updateModuleProgress]);

  // Get progress for specific module/course
  const getModuleProgress = useCallback((moduleId: string, courseId: string) => {
    return moduleProgress.find(p => p.moduleId === moduleId && p.courseId === courseId);
  }, [moduleProgress]);

  const getCourseProgress = useCallback((courseId: string) => {
    return courseProgress.find(c => c.courseId === courseId);
  }, [courseProgress]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
      if (pendingUpdates.length > 0) {
        syncToDatabase();
      }
    };

    const handleOffline = () => {
      setOffline(true);
      toast.info('You\'re offline. Progress will sync when connection is restored.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingUpdates.length, syncToDatabase]);

  // Initial load
  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      
      // Always load local progress first
      loadLocalProgress();
      
      // Then try to load from database if online and authenticated
      if (user && !offline) {
        await loadDatabaseProgress();
      }
      
      setLoading(false);
    };

    loadProgress();
  }, [user, options.courseId, loadLocalProgress, loadDatabaseProgress, offline]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!loading) {
      saveLocalProgress();
    }
  }, [moduleProgress, courseProgress, pendingUpdates, saveLocalProgress, loading]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    loading,
    syncing,
    offline,
    moduleProgress,
    courseProgress,
    pendingUpdates: pendingUpdates.length,
    lastSync: lastSyncRef.current,
    
    // Actions
    updateModuleProgress,
    completeLesson,
    completeQuiz,
    completeModule,
    syncToDatabase: () => syncToDatabase(),
    
    // Getters
    getModuleProgress,
    getCourseProgress,
    
    // Utils
    refreshProgress: () => {
      refreshProgress();
      loadDatabaseProgress();
    }
  };
};