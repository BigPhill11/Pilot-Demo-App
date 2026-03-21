import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface LessonCompletion {
  id: string;
  career_id: string;
  lesson_level: number;
  completed_at: string;
  completed_by_admin: boolean;
}

export const useLessonCompletions = (careerId: string) => {
  const { user } = useAuth();
  const [completions, setCompletions] = useState<LessonCompletion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCompletions();
    }
  }, [user, careerId]);

  const fetchCompletions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('lesson_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('career_id', careerId)
        .order('lesson_level');

      if (error) throw error;
      setCompletions(data || []);
    } catch (error) {
      console.error('Error fetching completions:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (level: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('lesson_completions')
        .upsert({
          user_id: user.id,
          career_id: careerId,
          lesson_level: level,
          completed_by_admin: false
        }, {
          onConflict: 'user_id,career_id,lesson_level'
        });

      if (error) throw error;
      await fetchCompletions();
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const isLevelComplete = (level: number) => {
    return completions.some(c => c.lesson_level === level);
  };

  const isLevelAvailable = (level: number) => {
    if (level === 1) return true;
    return isLevelComplete(level - 1);
  };

  const getCompletedLevels = () => {
    return completions.map(c => c.lesson_level);
  };

  const getCurrentLevel = () => {
    const completedLevels = getCompletedLevels().sort((a, b) => a - b);
    for (let i = 1; i <= 7; i++) {
      if (!completedLevels.includes(i)) {
        return i;
      }
    }
    return 8; // All completed
  };

  return {
    completions,
    loading,
    markLessonComplete,
    isLevelComplete,
    isLevelAvailable,
    getCompletedLevels,
    getCurrentLevel,
    refetch: fetchCompletions
  };
};