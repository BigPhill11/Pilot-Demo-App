import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ACHIEVEMENTS, Achievement } from '@/lib/achievements-catalog';
import { toast } from '@/hooks/use-toast';
import { useBambooCoins } from './useBambooCoins';
import { XpSource } from '@/lib/coin-conversion';

interface UserAchievement {
  achievement_id: string;
  unlocked_at: string;
  claimed: boolean;
}

export interface AchievementProgress {
  achievement: Achievement;
  unlocked: boolean;
  unlockedAt?: string;
  claimed: boolean;
  currentProgress: number;
  progressPercentage: number;
}

export const useAchievements = () => {
  const { user } = useAuth();
  const { awardCoinsForXp } = useBambooCoins();
  const [achievements, setAchievements] = useState<AchievementProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAchievements = async () => {
    if (!user) return;

    try {
      // Fetch unlocked achievements
      const { data: unlockedData } = await supabase
        .from('user_achievements' as any)
        .select('*')
        .eq('user_id', user.id) as any;

      // Fetch user stats for progress calculation
      const { data: profile } = await supabase
        .from('profiles' as any)
        .select('total_points, streak_days')
        .eq('id', user.id)
        .single() as any;

      const { data: coins } = await supabase
        .from('user_bamboo_coins' as any)
        .select('lifetime_earned, total_spent')
        .eq('user_id', user.id)
        .single() as any;

      const { data: purchases } = await supabase
        .from('shop_purchases' as any)
        .select('id')
        .eq('user_id', user.id) as any;

      const { data: transactions } = await supabase
        .from('xp_transactions' as any)
        .select('source')
        .eq('user_id', user.id) as any;

      // Calculate progress for each achievement
      const progressData = ACHIEVEMENTS.map((achievement) => {
        const unlocked = (unlockedData as any)?.find((u: any) => u.achievement_id === achievement.id);
        let currentProgress = 0;

        // Calculate current progress based on achievement type
        switch (achievement.id) {
          // XP-based
          case 'first_steps':
          case 'knowledge_seeker':
          case 'wisdom_warrior':
          case 'enlightened_master':
          case 'legend_ascended':
            currentProgress = (profile as any)?.total_points || 0;
            break;

          // Streak-based
          case 'daily_dedication':
          case 'week_warrior':
          case 'unstoppable':
          case 'eternal_flame':
            currentProgress = (profile as any)?.streak_days || 0;
            break;

          // Coin-based
          case 'coin_collector':
          case 'treasure_hunter':
            currentProgress = (coins as any)?.lifetime_earned || 0;
            break;

          case 'big_spender':
            currentProgress = (coins as any)?.total_spent || 0;
            break;

          case 'first_purchase':
          case 'shop_collector':
            currentProgress = (purchases as any)?.length || 0;
            break;

          // Activity-based
          case 'quiz_novice':
          case 'quiz_expert':
            currentProgress = (transactions as any)?.filter((t: any) => t.source === 'quiz')?.length || 0;
            break;

          case 'module_complete':
            currentProgress = (transactions as any)?.filter((t: any) => t.source === 'module')?.length || 0;
            break;

          case 'story_reader':
            currentProgress = (transactions as any)?.filter((t: any) => t.source === 'story')?.length || 0;
            break;

          // Meta achievements
          case 'achievement_hunter':
          case 'completionist':
          case 'legend':
            currentProgress = (unlockedData as any)?.length || 0;
            break;

          default:
            currentProgress = 0;
        }

        const progressPercentage = Math.min((currentProgress / achievement.requirement) * 100, 100);

        return {
          achievement,
          unlocked: !!unlocked,
          unlockedAt: (unlocked as any)?.unlocked_at,
          claimed: (unlocked as any)?.claimed || false,
          currentProgress,
          progressPercentage
        };
      });

      setAchievements(progressData);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndUnlockAchievements = async () => {
    if (!user) return;

    const unlockedAchievements: Achievement[] = [];

    for (const progress of achievements) {
      if (!progress.unlocked && progress.currentProgress >= progress.achievement.requirement) {
        try {
          await supabase.from('user_achievements' as any).insert({
            user_id: user.id,
            achievement_id: progress.achievement.id,
            unlocked_at: new Date().toISOString(),
            claimed: false
          });

          unlockedAchievements.push(progress.achievement);
        } catch (error) {
          console.error('Error unlocking achievement:', error);
        }
      }
    }

    if (unlockedAchievements.length > 0) {
      await fetchAchievements();
      
      unlockedAchievements.forEach(achievement => {
        toast({
          title: '🎉 Achievement Unlocked!',
          description: `${achievement.icon} ${achievement.name} - Claim ${achievement.rewardCoins} coins!`,
        });
      });
    }
  };

  const claimReward = async (achievementId: string) => {
    if (!user) return false;

    const progress = achievements.find(a => a.achievement.id === achievementId);
    if (!progress || !progress.unlocked || progress.claimed) return false;

    try {
      // Mark as claimed
      await supabase
        .from('user_achievements' as any)
        .update({ claimed: true })
        .eq('user_id', user.id)
        .eq('achievement_id', achievementId);

      // Award coins
      await awardCoinsForXp(
        progress.achievement.rewardCoins * 10, // Convert coins back to XP for transaction
        XpSource.ACHIEVEMENT,
        achievementId
      );

      toast({
        title: '💰 Reward Claimed!',
        description: `You received ${progress.achievement.rewardCoins} Bamboo Coins!`,
      });

      await fetchAchievements();
      return true;
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast({
        title: 'Error',
        description: 'Failed to claim reward. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchAchievements();
    }
  }, [user]);

  // Auto-check for new achievements when progress changes
  useEffect(() => {
    if (!loading && achievements.length > 0) {
      checkAndUnlockAchievements();
    }
  }, [achievements.map(a => a.currentProgress).join(',')]);

  const stats = {
    total: ACHIEVEMENTS.length,
    unlocked: achievements.filter(a => a.unlocked).length,
    claimed: achievements.filter(a => a.claimed).length,
    unclaimed: achievements.filter(a => a.unlocked && !a.claimed).length
  };

  return {
    achievements,
    loading,
    stats,
    claimReward,
    refresh: fetchAchievements
  };
};
