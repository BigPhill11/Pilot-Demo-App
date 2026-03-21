import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { getLevelFromTotalXp } from '@/lib/progression';

interface LeaderboardEntry {
  user_id: string;
  username: string;
  total_xp: number;
  swipe_count: number;
  level: number;
  rank: number;
}

interface LeaderboardProps {
  onClose: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [weeklyLeaders, setWeeklyLeaders] = useState<LeaderboardEntry[]>([]);
  const [allTimeLeaders, setAllTimeLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userWeeklyRank, setUserWeeklyRank] = useState<number | null>(null);
  const [userAllTimeRank, setUserAllTimeRank] = useState<number | null>(null);

  useEffect(() => {
    loadLeaderboards();
  }, [user]);

  const loadLeaderboards = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Get weekly stats (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const { data: weeklyData, error: weeklyError } = await supabase
        .from('user_company_interactions')
        .select('user_id, interaction_type, created_at')
        .gte('created_at', weekAgo.toISOString());

      if (weeklyError) throw weeklyError;

      // Get all-time stats
      const { data: allTimeData, error: allTimeError } = await supabase
        .from('user_company_interactions')
        .select('user_id, interaction_type, created_at');

      if (allTimeError) throw allTimeError;

      // Process weekly leaderboard
      const weeklyStats = processLeaderboardData(weeklyData || []);
      setWeeklyLeaders(weeklyStats.slice(0, 50));
      const weeklyUserRank = weeklyStats.findIndex(entry => entry.user_id === user.id);
      setUserWeeklyRank(weeklyUserRank >= 0 ? weeklyUserRank + 1 : null);

      // Process all-time leaderboard
      const allTimeStats = processLeaderboardData(allTimeData || []);
      setAllTimeLeaders(allTimeStats.slice(0, 50));
      const allTimeUserRank = allTimeStats.findIndex(entry => entry.user_id === user.id);
      setUserAllTimeRank(allTimeUserRank >= 0 ? allTimeUserRank + 1 : null);
    } catch (error) {
      console.error('Error loading leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const processLeaderboardData = (data: any[]): LeaderboardEntry[] => {
    // Group by user
    const userStats = data.reduce((acc, interaction) => {
      const userId = interaction.user_id;
      if (!acc[userId]) {
        acc[userId] = {
          swipe_count: 0,
          total_xp: 0,
          likes: 0,
          super_likes: 0,
          passes: 0,
        };
      }

      acc[userId].swipe_count++;

      // Calculate XP
      if (interaction.interaction_type === 'like') {
        acc[userId].total_xp += 10;
        acc[userId].likes++;
      } else if (interaction.interaction_type === 'super_like') {
        acc[userId].total_xp += 25;
        acc[userId].super_likes++;
      } else if (interaction.interaction_type === 'dislike') {
        acc[userId].total_xp += 5;
        acc[userId].passes++;
      }

      return acc;
    }, {} as Record<string, any>);

    // Convert to array and sort by XP
    const leaderboard = Object.entries(userStats)
      .map(([user_id, stats]: [string, any]) => ({
        user_id,
        username: `User ${user_id.slice(0, 8)}`,
        total_xp: stats.total_xp as number,
        swipe_count: stats.swipe_count as number,
        level: getLevelFromTotalXp(stats.total_xp as number),
        rank: 0,
      }))
      .sort((a, b) => b.total_xp - a.total_xp);

    // Assign ranks
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return leaderboard;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-orange-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const renderLeaderboard = (leaders: LeaderboardEntry[], userRank: number | null) => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="text-center py-12">
          <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Sign in to see the leaderboard!</p>
        </div>
      );
    }

    if (leaders.length === 0) {
      return (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No data yet. Start swiping!</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* User's rank card */}
        {userRank && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getRankIcon(userRank)}
                  <div>
                    <p className="font-semibold">Your Rank</p>
                    <p className="text-sm text-muted-foreground">
                      You're #{userRank} on the leaderboard!
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">
                  Level {leaders.find(l => l.user_id === user.id)?.level || 1}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard list */}
        <div className="space-y-2">
          {leaders.map((entry) => (
            <Card
              key={entry.user_id}
              className={entry.user_id === user?.id ? 'bg-accent/50 border-primary/30' : ''}
            >
              <CardContent className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 flex justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {entry.user_id === user?.id ? 'You' : entry.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.swipe_count} swipes • Level {entry.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{entry.total_xp}</p>
                    <p className="text-xs text-muted-foreground">XP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center">
              <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
              Leaderboard
            </CardTitle>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">
                Weekly
                <Badge variant="secondary" className="ml-2">
                  🔥
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="alltime">
                All-Time
                <Badge variant="secondary" className="ml-2">
                  👑
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="weekly">
              {renderLeaderboard(weeklyLeaders, userWeeklyRank)}
            </TabsContent>

            <TabsContent value="alltime">
              {renderLeaderboard(allTimeLeaders, userAllTimeRank)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
