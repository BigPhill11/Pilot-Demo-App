import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { getLevelFromTotalXp, getXpToNextLevel } from '@/lib/progression';

interface ProgressData {
  quiz_scores: Record<string, boolean>;
  learning_progress: number;
  engagement_score: number;
  total_points: number;
  level_progress: number;
  achievements: string[];
  completed_activities: string[];
}

// --- Simple in-module event bus to sync progress across components ---
let globalProgressState: ProgressData | null = null;
const progressSubscribers = new Set<(data: ProgressData) => void>();

function notifyProgressUpdate(newData: ProgressData) {
  globalProgressState = newData;
  progressSubscribers.forEach((fn) => {
    try {
      fn(newData);
    } catch (_) {
      // no-op: isolate subscriber errors
    }
  });
}

export const useProgressTracking = () => {
  const { user, profile } = useAuth();
  const [progress, setProgress] = useState<ProgressData>({
    quiz_scores: {},
    learning_progress: 0,
    engagement_score: 0,
    total_points: 0,
    level_progress: 0,
    achievements: [],
    completed_activities: []
  });
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  // Subscribe to global updates so all hook instances stay in sync
  useEffect(() => {
    const subscriber = (data: ProgressData) => setProgress(data);
    progressSubscribers.add(subscriber);
    // Initialize from global state if available (helps non-fetching instances)
    if (globalProgressState) {
      setProgress(globalProgressState);
      setLoading(false);
    }
    return () => {
      progressSubscribers.delete(subscriber);
    };
  }, []);

  // Apply streak multiplier: +5% per day, capped at +50%
  const applyStreakMultiplier = (basePoints: number) => {
    const streak = profile?.current_streak || 0;
    const multiplier = Math.min(streak * 0.05, 0.5);
    return Math.round(basePoints * (1 + multiplier));
  };

  const fetchProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching progress:', error);
        return;
      }

      if (data) {
        const loaded: ProgressData = {
          quiz_scores: (data.quiz_scores as Record<string, boolean>) || {},
          learning_progress: typeof data.learning_progress === 'number' ? data.learning_progress : 0,
          engagement_score: data.engagement_score || 0,
          total_points: data.total_points || 0,
          level_progress: data.level_progress || 0,
          achievements: Array.isArray(data.achievements) ? (data.achievements as string[]) : [],
          // We currently store completed activities in achievements column for simplicity
          completed_activities: Array.isArray(data.achievements) ? (data.achievements as string[]) : []
        };
        setProgress(loaded);
        notifyProgressUpdate(loaded);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateActivityComplete = async (activityId: string, pointsEarned: number = 10) => {
    if (!user) return;

    const basePoints = pointsEarned;
    const earnedPoints = applyStreakMultiplier(basePoints);
    const streakPercent = Math.min((profile?.current_streak || 0) * 5, 50);

    const newCompletedActivities = progress.completed_activities.includes(activityId) 
      ? progress.completed_activities 
      : [...progress.completed_activities, activityId];
    
    const newTotalPoints = progress.completed_activities.includes(activityId) 
      ? progress.total_points 
      : progress.total_points + earnedPoints;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          achievements: newCompletedActivities,
          total_points: newTotalPoints,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        completed_activities: newCompletedActivities,
        total_points: newTotalPoints
      }));

      notifyProgressUpdate({
        ...progress,
        completed_activities: newCompletedActivities,
        total_points: newTotalPoints
      });

      if (!progress.completed_activities.includes(activityId)) {
        if (streakPercent > 0) {
          toast.success(`+${earnedPoints} points! (+${streakPercent}% streak bonus) 🎉`);
        } else {
          toast.success(`+${earnedPoints} points! Activity completed! 🎉`);
        }
      }

      await checkLevelUp(newTotalPoints, earnedPoints);
    } catch (error) {
      console.error('Error updating activity completion:', error);
      toast.error('Failed to save progress');
    }
  };

  const updateQuizScore = async (topicId: string, isCorrect: boolean) => {
    if (!user) return;

    const newQuizScores = {
      ...progress.quiz_scores,
      [topicId]: isCorrect
    };

    const basePoints = isCorrect ? 5 : 0;
    const earnedPoints = applyStreakMultiplier(basePoints);
    const streakPercent = Math.min((profile?.current_streak || 0) * 5, 50);
    const newTotalPoints = progress.total_points + earnedPoints;
    const newEngagementScore = progress.engagement_score + 2;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          quiz_scores: newQuizScores,
          total_points: newTotalPoints,
          engagement_score: newEngagementScore,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        quiz_scores: newQuizScores,
        total_points: newTotalPoints,
        engagement_score: newEngagementScore
      }));

      notifyProgressUpdate({
        ...progress,
        quiz_scores: newQuizScores,
        total_points: newTotalPoints,
        engagement_score: newEngagementScore
      });

      if (isCorrect) {
        if (streakPercent > 0) {
          toast.success(`+${earnedPoints} points! Correct! (+${streakPercent}% streak bonus) 🎉`);
        } else {
          toast.success(`+${earnedPoints} points! Great job! 🎉`);
        }
      }

      await checkLevelUp(newTotalPoints, earnedPoints);
    } catch (error) {
      console.error('Error updating quiz score:', error);
      toast.error('Failed to save progress');
    }
  };

  const updateMarketPrediction = async () => {
    if (!user) return;

    const basePoints = 15; // 15 points for market predictions
    const earnedPoints = applyStreakMultiplier(basePoints);
    const streakPercent = Math.min((profile?.current_streak || 0) * 5, 50);
    const newTotalPoints = progress.total_points + earnedPoints;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          total_points: newTotalPoints,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        total_points: newTotalPoints
      }));

      notifyProgressUpdate({
        ...progress,
        total_points: newTotalPoints
      });

      if (streakPercent > 0) {
        toast.success(`+${earnedPoints} points for market prediction! (+${streakPercent}% streak bonus) 📈`);
      } else {
        toast.success(`+${earnedPoints} points for market prediction! 📈`);
      }
      
      // Check for level up
      await checkLevelUp(newTotalPoints, earnedPoints);
    } catch (error) {
      console.error('Error updating market prediction points:', error);
    }
  };

  // Generic points awarder for arbitrary sources (e.g., games)
  const awardPoints = async (points: number, source?: string) => {
    if (!user || points <= 0) return;

    const earnedPoints = applyStreakMultiplier(points);
    const streakPercent = Math.min((profile?.current_streak || 0) * 5, 50);
    const newTotalPoints = progress.total_points + earnedPoints;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          total_points: newTotalPoints,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      setProgress(prev => ({
        ...prev,
        total_points: newTotalPoints
      }));
      notifyProgressUpdate({ ...progress, total_points: newTotalPoints });

      if (streakPercent > 0) {
        toast.success(`+${earnedPoints} points${source ? ` (${source})` : ''}! (+${streakPercent}% streak bonus) 🎉`);
      } else {
        toast.success(`+${earnedPoints} points${source ? ` (${source})` : ''}! 🎉`);
      }

      await checkLevelUp(newTotalPoints, earnedPoints);
    } catch (error) {
      console.error('Error awarding points:', error);
      toast.error('Failed to update XP');
    }
  };

  const checkLevelUp = async (totalPoints: number, lastAwardPoints: number) => {
    if (!user) return;

    const currentLevel = getLevelFromTotalXp(totalPoints);
    const toNext = getXpToNextLevel(totalPoints);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          current_level: currentLevel,
          points_to_next_level: toNext,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Check if user leveled up
      const previousLevel = getLevelFromTotalXp(Math.max(0, totalPoints - lastAwardPoints));
      if (currentLevel > previousLevel) {
        toast.success(`🎉 Level Up! You're now Level ${currentLevel}! 🎉`);
      }
    } catch (error) {
      console.error('Error checking level up:', error);
    }
  };


  const updateLearningProgress = async (increment: number = 1, pointsEarned?: number) => {
    if (!user) return;

    const newLearningProgress = Math.min(progress.learning_progress + increment, 100);

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          learning_progress: newLearningProgress,
          // When awarding learning progress, optionally award XP too
          total_points: pointsEarned && pointsEarned > 0 
            ? progress.total_points + applyStreakMultiplier(pointsEarned)
            : progress.total_points,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      const updated: ProgressData = {
        ...progress,
        learning_progress: newLearningProgress,
        total_points: pointsEarned && pointsEarned > 0
          ? progress.total_points + applyStreakMultiplier(pointsEarned)
          : progress.total_points
      };
      setProgress(updated);
      notifyProgressUpdate(updated);

      if (pointsEarned && pointsEarned > 0) {
        const earnedPoints = applyStreakMultiplier(pointsEarned);
        const streakPercent = Math.min((profile?.current_streak || 0) * 5, 50);
        if (streakPercent > 0) {
          toast.success(`+${earnedPoints} points for learning progress! (+${streakPercent}% streak bonus) 🎉`);
        } else {
          toast.success(`+${earnedPoints} points for learning progress! 🎉`);
        }
        await checkLevelUp(updated.total_points, earnedPoints);
      }
    } catch (error) {
      console.error('Error updating learning progress:', error);
    }
  };

  return {
    progress,
    loading,
    updateQuizScore,
    updateMarketPrediction,
    updateLearningProgress,
    updateActivityComplete,
    awardPoints,
    refreshProgress: fetchProgress
  };
};
