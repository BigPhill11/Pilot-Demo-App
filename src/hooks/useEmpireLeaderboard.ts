import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type LeaderboardPeriod = 'daily' | 'weekly' | 'alltime';

interface LeaderboardEntry {
  user_id: string;
  username: string;
  total_xp: number;
  rank: number;
  streak_days?: number;
  avatar_url?: string;
}

interface UserRankInfo {
  rank: number;
  totalXp: number;
  xpToNextRank: number;
}

export function useEmpireLeaderboard(period: LeaderboardPeriod = 'alltime', limit: number = 100) {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<UserRankInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch leaderboard data
  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);

      // Get current user's total XP from profiles
      let currentUserXp = 0;
      if (user) {
        const { data: profile } = await supabase
          .from('profiles' as any)
          .select('total_points, streak_days')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profile) {
          currentUserXp = (profile as any).total_points || 0;
        }
      }

      // Fetch top users based on period
      const query = supabase
        .from('profiles' as any)
        .select('id, username, total_points, streak_days, avatar_url')
        .order('total_points', { ascending: false })
        .limit(limit);

      // For daily/weekly, we'd filter by updated_at, but for now we'll use total_xp
      // In a real implementation, you'd have separate daily_xp and weekly_xp columns
      
      const { data, error } = await query;

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      if (data) {
        // Add ranks
        const rankedData: LeaderboardEntry[] = (data as any[]).map((entry: any, index: number) => ({
          user_id: entry.id,
          username: entry.username || 'Anonymous',
          total_xp: entry.total_points || 0,
          rank: index + 1,
          streak_days: entry.streak_days || 0,
          avatar_url: entry.avatar_url || undefined,
        }));

        setLeaderboard(rankedData);

        // Calculate user's rank
        if (user) {
          const userEntry = rankedData.find((entry) => entry.user_id === user.id);
          if (userEntry) {
            setUserRank({
              rank: userEntry.rank,
              totalXp: userEntry.total_xp,
              xpToNextRank: userEntry.rank > 1 
                ? rankedData[userEntry.rank - 2].total_xp - userEntry.total_xp 
                : 0,
            });
          } else {
            // User not in top 100, calculate rank from total count
            const { count } = await supabase
              .from('profiles' as any)
              .select('*', { count: 'exact', head: true })
              .gt('total_points', currentUserXp);

            setUserRank({
              rank: (count || 0) + 1,
              totalXp: currentUserXp,
              xpToNextRank: 0, // Would need to fetch next user's XP
            });
          }
        }
      }

      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error in fetchLeaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [period, limit, user]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    fetchLeaderboard();
    
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  // Set up realtime subscription for profile updates
  useEffect(() => {
    const channel = supabase
      .channel('leaderboard-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: 'total_points=neq.null',
        },
        () => {
          // Refresh leaderboard when any profile's XP updates
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeaderboard]);

  return {
    leaderboard,
    userRank,
    loading,
    lastUpdate,
    refresh: fetchLeaderboard,
  };
}
