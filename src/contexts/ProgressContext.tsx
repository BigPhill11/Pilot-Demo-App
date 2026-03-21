import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ModuleProgress } from '@/hooks/useUnifiedProgress';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface ProgressContextType {
  allProgress: ModuleProgress[];
  loading: boolean;
  refreshAllProgress: () => Promise<void>;
  getModuleProgress: (moduleId: string, moduleType: string, courseId?: string) => ModuleProgress | null;
  getTotalCompletedModules: () => number;
  getOverallProgress: () => number;
  getStreakData: () => { currentStreak: number; longestStreak: number };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgressContext = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgressContext must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: React.ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [allProgress, setAllProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { progress } = useProgressTracking();

  const refreshAllProgress = async () => {
    if (!user) {
      // Load from localStorage for non-authenticated users
      const allLocalProgress: ModuleProgress[] = [];
      const keys = Object.keys(localStorage).filter(key => key.startsWith('progress_'));
      
      keys.forEach(key => {
        try {
          const progress = JSON.parse(localStorage.getItem(key) || '{}');
          if (progress.moduleId) {
            allLocalProgress.push(progress);
          }
        } catch (error) {
          console.error('Error parsing localStorage progress:', error);
        }
      });
      
      setAllProgress(allLocalProgress);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('last_accessed', { ascending: false });

      if (error) {
        console.error('Error loading all progress:', error);
        setAllProgress([]);
      } else {
        const formattedProgress: ModuleProgress[] = (data || []).map(item => ({
          id: item.id,
          moduleId: item.module_id,
          moduleType: item.module_type as ModuleProgress['moduleType'],
          courseId: item.course_id || undefined,
          progressPercentage: item.progress_percentage,
          timeSpentMinutes: item.time_spent_minutes,
          lastAccessed: item.last_accessed,
          completedAt: item.completed_at || undefined,
          detailedProgress: (item.detailed_progress as Record<string, any>) || {}
        }));
        
        setAllProgress(formattedProgress);
      }
    } catch (error) {
      console.error('Error in refreshAllProgress:', error);
      setAllProgress([]);
    } finally {
      setLoading(false);
    }
  };

  const getModuleProgress = (moduleId: string, moduleType: string, courseId?: string): ModuleProgress | null => {
    return allProgress.find(p => 
      p.moduleId === moduleId && 
      p.moduleType === moduleType && 
      p.courseId === courseId
    ) || null;
  };

  const getTotalCompletedModules = (): number => {
    return allProgress.filter(p => p.progressPercentage >= 100).length;
  };

  const getOverallProgress = (): number => {
    if (allProgress.length === 0) return 0;
    const totalProgress = allProgress.reduce((sum, p) => sum + p.progressPercentage, 0);
    return Math.round(totalProgress / allProgress.length);
  };

  /**
   * @deprecated Use useUnifiedStreak hook directly instead.
   * This now reads from the unified streak localStorage for backward compatibility.
   */
  const getStreakData = (): { currentStreak: number; longestStreak: number } => {
    // Read from unified streak system
    try {
      const stored = localStorage.getItem('unified_streak');
      if (stored) {
        const data = JSON.parse(stored);
        return {
          currentStreak: data.currentStreak || 0,
          longestStreak: data.longestStreak || 0,
        };
      }
    } catch (error) {
      console.error('Error reading unified streak:', error);
    }
    return { currentStreak: 0, longestStreak: 0 };
  };

  useEffect(() => {
    refreshAllProgress();
  }, [user]);

  // When XP changes, consumers of this context often display progress bars nearby.
  // Trigger a light refresh so dashboards remain up to date without user reload.
  useEffect(() => {
    // Only run when authenticated to avoid noisy local-only updates
    if (user) {
      // Do not spam the DB; just update state timestamped fields locally
      // by re-mapping to new objects which will cause re-renders of consumers.
      setAllProgress(prev => prev.map(p => ({ ...p })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.total_points]);

  const contextValue: ProgressContextType = {
    allProgress,
    loading,
    refreshAllProgress,
    getModuleProgress,
    getTotalCompletedModules,
    getOverallProgress,
    getStreakData
  };

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};