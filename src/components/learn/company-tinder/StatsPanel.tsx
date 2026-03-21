import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, TrendingUp, Target, Award, Flame, Star, Share2, Download } from 'lucide-react';
import { GameStats, Achievement } from './hooks/useGameStats';
import { DailyChallenge } from './hooks/useDailyChallenges';
import { getLevelFromTotalXp, getXpToNextLevel, getProgressPercent } from '@/lib/progression';
import { toast } from 'sonner';

interface StatsPanelProps {
  stats: GameStats;
  achievements: Achievement[];
  challenge: DailyChallenge | null;
  onClose: () => void;
}

const LEVEL_NAMES = [
  'Window Shopper',
  'Curious Investor',
  'Deal Hunter',
  'Stock Sleuth',
  'Portfolio Pro',
  'Market Maven',
  'Finance Guru',
];

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, achievements, challenge, onClose }) => {
  const currentLevel = getLevelFromTotalXp(stats.totalXP);
  const xpToNext = getXpToNextLevel(stats.totalXP);
  const progressPercent = getProgressPercent(stats.totalXP);
  const levelName = LEVEL_NAMES[Math.min(currentLevel - 1, LEVEL_NAMES.length - 1)];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  const handleShare = async () => {
    const shareText = `🎯 My Company Tinder Stats\n\n💪 Level ${currentLevel} - ${levelName}\n⭐ ${stats.totalXP} XP earned\n📊 ${stats.swipeCount} companies swiped\n💚 ${stats.likeCount} matches made\n🔥 ${stats.currentStreak} day streak\n🏆 ${unlockedAchievements.length} achievements unlocked\n\nPlay Company Tinder and find your investment matches!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Company Tinder Stats',
          text: shareText,
        });
        toast.success('Shared successfully!');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard(shareText);
        }
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Stats copied to clipboard!');
  };

  const downloadStats = () => {
    const statsData = {
      level: currentLevel,
      levelName,
      totalXP: stats.totalXP,
      swipeCount: stats.swipeCount,
      likeCount: stats.likeCount,
      superLikeCount: stats.superLikeCount,
      passCount: stats.passCount,
      currentStreak: stats.currentStreak,
      achievements: unlockedAchievements.map(a => a.name),
    };

    const blob = new Blob([JSON.stringify(statsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `company-tinder-stats-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Stats downloaded!');
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Your Stats</CardTitle>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={downloadStats}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">
                Achievements
                <Badge variant="secondary" className="ml-2">
                  {unlockedAchievements.length}/{achievements.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="challenge">Daily Challenge</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Level Progress */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Level {currentLevel}</h3>
                      <p className="text-sm text-muted-foreground">{levelName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{stats.totalXP}</p>
                      <p className="text-xs text-muted-foreground">Total XP</p>
                    </div>
                  </div>
                  <Progress value={progressPercent} className="h-3 mb-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    {xpToNext} XP to Level {currentLevel + 1}
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{stats.swipeCount}</p>
                    <p className="text-xs text-muted-foreground">Total Swipes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">{stats.likeCount}</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">{stats.superLikeCount}</p>
                    <p className="text-xs text-muted-foreground">Super Likes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Flame className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-2xl font-bold">{stats.currentStreak}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </CardContent>
                </Card>
              </div>

              {/* Swipe Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Swipe Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>✅ Likes</span>
                      <span className="font-medium">
                        {stats.likeCount} ({stats.swipeCount ? Math.round((stats.likeCount / stats.swipeCount) * 100) : 0}%)
                      </span>
                    </div>
                    <Progress 
                      value={stats.swipeCount ? (stats.likeCount / stats.swipeCount) * 100 : 0} 
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>⭐ Super Likes</span>
                      <span className="font-medium">
                        {stats.superLikeCount} ({stats.swipeCount ? Math.round((stats.superLikeCount / stats.swipeCount) * 100) : 0}%)
                      </span>
                    </div>
                    <Progress 
                      value={stats.swipeCount ? (stats.superLikeCount / stats.swipeCount) * 100 : 0} 
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>❌ Passes</span>
                      <span className="font-medium">
                        {stats.passCount} ({stats.swipeCount ? Math.round((stats.passCount / stats.swipeCount) * 100) : 0}%)
                      </span>
                    </div>
                    <Progress 
                      value={stats.swipeCount ? (stats.passCount / stats.swipeCount) * 100 : 0} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Streak Info */}
              {stats.currentStreak > 0 && (
                <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <Flame className="h-12 w-12 text-orange-500" />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {stats.currentStreak} Day Streak! 🔥
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Keep swiping daily to maintain your streak
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              {/* Unlocked Achievements */}
              {unlockedAchievements.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Unlocked ({unlockedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {unlockedAchievements.map((achievement) => (
                      <Card key={achievement.id} className="bg-gradient-to-br from-primary/5 to-primary/10">
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-3">
                            <span className="text-3xl">{achievement.icon}</span>
                            <div className="flex-1">
                              <h4 className="font-semibold">{achievement.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {achievement.description}
                              </p>
                            </div>
                            <Badge variant="secondary">✓</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Achievements */}
              {lockedAchievements.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-muted-foreground">
                    Locked ({lockedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lockedAchievements.map((achievement) => (
                      <Card key={achievement.id} className="opacity-60">
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-3">
                            <span className="text-3xl grayscale">?</span>
                            <div className="flex-1">
                              <h4 className="font-semibold text-muted-foreground">
                                {achievement.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="challenge" className="space-y-4">
              {challenge ? (
                <Card className={challenge.completed ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10' : ''}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start space-x-4">
                      <span className="text-5xl">{challenge.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{challenge.name}</h3>
                          {challenge.completed && (
                            <Badge className="bg-green-500">Completed! ✓</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-2">{challenge.description}</p>
                        <Badge variant="outline">
                          <Target className="mr-1 h-3 w-3" />
                          Reward: +{challenge.xpReward} XP
                        </Badge>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">
                          {challenge.progress} / {challenge.target}
                        </span>
                      </div>
                      <Progress 
                        value={(challenge.progress / challenge.target) * 100} 
                        className="h-3"
                      />
                    </div>

                    {challenge.completed && (
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground">
                          🎉 Great job! Come back tomorrow for a new challenge!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No challenge available</p>
                  </CardContent>
                </Card>
              )}

              {/* Challenge Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">💡 Daily Challenge Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• New challenges refresh every day at midnight</p>
                  <p>• Complete challenges to earn bonus XP</p>
                  <p>• Unlock special badges for challenge completions</p>
                  <p>• Some challenges require specific actions (likes, sectors, etc.)</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
