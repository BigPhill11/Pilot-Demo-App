import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProgressTracking } from '@/hooks/useProgressTracking';

export interface GameStats {
  totalXP: number;
  swipeCount: number;
  likeCount: number;
  superLikeCount: number;
  passCount: number;
  currentStreak: number;
  superLikesRemaining: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const INITIAL_STATS: GameStats = {
  totalXP: 0,
  swipeCount: 0,
  likeCount: 0,
  superLikeCount: 0,
  passCount: 0,
  currentStreak: 0,
  superLikesRemaining: 5,
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_swipe',
    name: 'First Swipe',
    description: 'Complete your first swipe',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'speed_dater',
    name: 'Speed Dater',
    description: 'Complete the tutorial',
    icon: '💘',
    unlocked: false,
  },
  {
    id: 'century_club',
    name: 'Century Club',
    description: 'Swipe on 100 companies',
    icon: '💯',
    unlocked: false,
  },
  {
    id: 'hot_streak_7',
    name: 'Hot Streak',
    description: '7-day swipe streak',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'super_fan',
    name: 'Super Fan',
    description: 'Use 10 Super Likes',
    icon: '⭐',
    unlocked: false,
  },
  {
    id: 'picky_investor',
    name: 'Picky Investor',
    description: 'View 50 companies, like only 10',
    icon: '🧐',
    unlocked: false,
  },
  {
    id: 'love_at_first_sight',
    name: 'Love at First Sight',
    description: 'Super Like 5 companies',
    icon: '😍',
    unlocked: false,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Swipe on 50 companies',
    icon: '🗺️',
    unlocked: false,
  },
  {
    id: 'veteran',
    name: 'Veteran Swiper',
    description: 'Swipe on 250 companies',
    icon: '🎖️',
    unlocked: false,
  },
  {
    id: 'legend',
    name: 'Legendary',
    description: 'Swipe on 500 companies',
    icon: '👑',
    unlocked: false,
  },
  {
    id: 'match_maker',
    name: 'Match Maker',
    description: 'Like 25 companies',
    icon: '💚',
    unlocked: false,
  },
  {
    id: 'portfolio_builder',
    name: 'Portfolio Builder',
    description: 'Like 50 companies',
    icon: '📊',
    unlocked: false,
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: '3-day swipe streak',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'committed',
    name: 'Committed',
    description: '30-day swipe streak',
    icon: '💎',
    unlocked: false,
  },
  {
    id: 'challenger',
    name: 'Challenger',
    description: 'Complete 5 daily challenges',
    icon: '🏅',
    unlocked: false,
  },
  {
    id: 'challenge_master',
    name: 'Challenge Master',
    description: 'Complete 25 daily challenges',
    icon: '🏆',
    unlocked: false,
  },
];

export const useGameStats = () => {
  const { user } = useAuth();
  const { awardPoints } = useProgressTracking();
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStats();
    } else {
      // Load from localStorage for non-authenticated users
      const savedStats = localStorage.getItem('tinderGameStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
      const savedAchievements = localStorage.getItem('tinderAchievements');
      if (savedAchievements) {
        setAchievements(JSON.parse(savedAchievements));
      }
      setLoading(false);
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;

    try {
      // Get swipe counts with dates
      const { data: interactions, error } = await supabase
        .from('user_company_interactions')
        .select('interaction_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const likeCount = interactions?.filter(i => i.interaction_type === 'like').length || 0;
      const superLikeCount = interactions?.filter(i => i.interaction_type === 'super_like').length || 0;
      const passCount = interactions?.filter(i => i.interaction_type === 'dislike').length || 0;
      
      // Calculate XP based on counts (simplified)
      const totalXP = (likeCount * 10) + (superLikeCount * 25) + (passCount * 5);

      // Calculate streak
      const currentStreak = calculateStreak(interactions || []);

      setStats({
        totalXP,
        swipeCount: interactions?.length || 0,
        likeCount,
        superLikeCount,
        passCount,
        currentStreak,
        superLikesRemaining: Math.max(0, 5 - superLikeCount),
      });

      // Load achievements
      const { data: unlockedAchievements } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', user.id);

      if (unlockedAchievements) {
        setAchievements(prev => prev.map(a => ({
          ...a,
          unlocked: unlockedAchievements.some(ua => ua.achievement_id === a.id),
        })));
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = (interactions: any[]): number => {
    if (!interactions.length) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get unique dates
    const dates = [...new Set(interactions.map(i => {
      const date = new Date(i.created_at);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }))].sort((a, b) => b - a);

    // Check if user swiped today or yesterday
    const latestDate = new Date(dates[0]);
    const daysDiff = Math.floor((today.getTime() - latestDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 1) return 0; // Streak broken

    // Count consecutive days
    for (let i = 0; i < dates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (dates[i] === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const addXP = (amount: number) => {
    setStats(prev => {
      const newStats = { ...prev, totalXP: prev.totalXP + amount };
      if (!user) {
        localStorage.setItem('tinderGameStats', JSON.stringify(newStats));
      }
      return newStats;
    });

    // Also reflect XP in global progression when authenticated
    if (user && amount > 0) {
      // Fire and forget; hook handles toasts and level-up
      awardPoints(amount, 'Company Tinder');
    }
  };

  const incrementStat = (statKey: keyof GameStats, amount: number = 1) => {
    setStats(prev => {
      const newStats = { ...prev, [statKey]: (prev[statKey] as number) + amount };
      if (!user) {
        localStorage.setItem('tinderGameStats', JSON.stringify(newStats));
      }
      return newStats;
    });
  };

  const unlockAchievement = async (achievementId: string) => {
    setAchievements(prev => {
      const newAchievements = prev.map(a => 
        a.id === achievementId ? { ...a, unlocked: true } : a
      );
      if (!user) {
        localStorage.setItem('tinderAchievements', JSON.stringify(newAchievements));
      }
      return newAchievements;
    });

    if (user) {
      try {
        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_id: achievementId,
        });
      } catch (error) {
        console.error('Error saving achievement:', error);
      }
    }
  };

  const checkAchievements = () => {
    // First Swipe
    if (stats.swipeCount >= 1 && !achievements.find(a => a.id === 'first_swipe')?.unlocked) {
      unlockAchievement('first_swipe');
    }

    // Swipe milestones
    if (stats.swipeCount >= 50 && !achievements.find(a => a.id === 'explorer')?.unlocked) {
      unlockAchievement('explorer');
    }
    if (stats.swipeCount >= 100 && !achievements.find(a => a.id === 'century_club')?.unlocked) {
      unlockAchievement('century_club');
    }
    if (stats.swipeCount >= 250 && !achievements.find(a => a.id === 'veteran')?.unlocked) {
      unlockAchievement('veteran');
    }
    if (stats.swipeCount >= 500 && !achievements.find(a => a.id === 'legend')?.unlocked) {
      unlockAchievement('legend');
    }

    // Like milestones
    if (stats.likeCount >= 25 && !achievements.find(a => a.id === 'match_maker')?.unlocked) {
      unlockAchievement('match_maker');
    }
    if (stats.likeCount >= 50 && !achievements.find(a => a.id === 'portfolio_builder')?.unlocked) {
      unlockAchievement('portfolio_builder');
    }

    // Super like milestones
    if (stats.superLikeCount >= 5 && !achievements.find(a => a.id === 'love_at_first_sight')?.unlocked) {
      unlockAchievement('love_at_first_sight');
    }
    if (stats.superLikeCount >= 10 && !achievements.find(a => a.id === 'super_fan')?.unlocked) {
      unlockAchievement('super_fan');
    }

    // Streak achievements
    if (stats.currentStreak >= 3 && !achievements.find(a => a.id === 'dedicated')?.unlocked) {
      unlockAchievement('dedicated');
    }
    if (stats.currentStreak >= 7 && !achievements.find(a => a.id === 'hot_streak_7')?.unlocked) {
      unlockAchievement('hot_streak_7');
    }
    if (stats.currentStreak >= 30 && !achievements.find(a => a.id === 'committed')?.unlocked) {
      unlockAchievement('committed');
    }

    // Picky investor
    if (stats.swipeCount >= 50 && stats.likeCount <= 10 && !achievements.find(a => a.id === 'picky_investor')?.unlocked) {
      unlockAchievement('picky_investor');
    }
  };

  useEffect(() => {
    if (!loading) {
      checkAchievements();
    }
  }, [stats.swipeCount, loading]);

  return {
    stats,
    achievements,
    loading,
    addXP,
    incrementStat,
    unlockAchievement,
  };
};
