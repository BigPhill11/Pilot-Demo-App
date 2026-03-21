import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, 
  Calendar, 
  Trophy, 
  Target, 
  CheckCircle2, 
  Clock,
  Zap,
  Star
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

import { toast } from 'sonner';
import PandaLogo from '@/components/icons/PandaLogo';

const StreakTracker: React.FC = () => {
  const { profile } = useAuth();
  const [todayCompleted, setTodayCompleted] = useState(false);

  const currentStreak = profile?.current_streak || 0;
  const longestStreak = profile?.longest_streak || 0;

  // Mock daily goals
  const dailyGoals = [
    { id: 'lesson', title: 'Complete a lesson', completed: true, points: 10 },
    { id: 'quiz', title: 'Take a quiz', completed: true, points: 15 },
    { id: 'reading', title: 'Read financial term', completed: false, points: 5 },
    { id: 'game', title: 'Play a learning game', completed: false, points: 20 }
  ];

  const completedGoals = dailyGoals.filter(goal => goal.completed).length;
  const totalGoals = dailyGoals.length;
  const progressPercentage = (completedGoals / totalGoals) * 100;

  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return { level: 'Diamond', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (streak >= 21) return { level: 'Gold', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (streak >= 14) return { level: 'Silver', color: 'text-gray-600', bg: 'bg-gray-50' };
    if (streak >= 7) return { level: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { level: 'Starter', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const streakLevel = getStreakLevel(currentStreak);

  const getNextMilestone = (streak: number) => {
    if (streak < 7) return 7;
    if (streak < 14) return 14;
    if (streak < 21) return 21;
    if (streak < 30) return 30;
    return Math.ceil((streak + 1) / 10) * 10;
  };

  const nextMilestone = getNextMilestone(currentStreak);
  const milestoneProgress = ((currentStreak % 7) / 7) * 100;

  const handleCompleteDaily = async () => {
    setTodayCompleted(true);
    toast.success('Daily login bonus earned! 🎉');
  };

  return (
    <div className="space-y-6">
      {/* Main Streak Card */}
      <Card className={`border-2 ${streakLevel.bg} border-opacity-50`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${streakLevel.bg}`}>
                <Flame className={`h-8 w-8 ${streakLevel.color}`} />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Learning Streak
                  <Badge className={`${streakLevel.color} ${streakLevel.bg}`}>
                    {streakLevel.level}
                  </Badge>
                </CardTitle>
                <CardDescription>Keep learning daily to maintain your streak!</CardDescription>
              </div>
            </div>
            <PandaLogo className="h-12 w-12" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Streak Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
              <div className="text-sm text-muted-foreground">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{longestStreak}</div>
              <div className="text-sm text-muted-foreground">Best Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{nextMilestone - currentStreak}</div>
              <div className="text-sm text-muted-foreground">Days to Next Level</div>
            </div>
          </div>

          {/* Progress to Next Milestone */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to {nextMilestone} days</span>
              <span>{currentStreak}/{nextMilestone}</span>
            </div>
            <Progress value={(currentStreak / nextMilestone) * 100} className="h-3" />
          </div>

          {/* Daily Check-in */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-emerald-600" />
                <div>
                  <h4 className="font-semibold">Daily Check-in</h4>
                  <p className="text-sm text-muted-foreground">
                    {todayCompleted ? 'Completed today! ✨' : 'Complete your daily learning goal'}
                  </p>
                </div>
              </div>
              {!todayCompleted && (
                <Button onClick={handleCompleteDaily} size="sm">
                  Check In
                </Button>
              )}
              {todayCompleted && (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Today's Goals
            <Badge variant="outline">
              {completedGoals}/{totalGoals}
            </Badge>
          </CardTitle>
          <CardDescription>Complete these goals to maintain your streak</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Overview */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Daily Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Goal List */}
          <div className="space-y-3">
            {dailyGoals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    goal.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {goal.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className={goal.completed ? 'line-through text-muted-foreground' : ''}>
                    {goal.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={goal.completed ? 'default' : 'outline'}>
                    {goal.points} pts
                  </Badge>
                  {goal.completed && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                </div>
              </div>
            ))}
          </div>

          {/* Motivational Message */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="flex items-start gap-3">
              <PandaLogo className="h-8 w-8 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-emerald-800 mb-1">Phil's Motivation 🐼</h4>
                <p className="text-sm text-emerald-700">
                  {currentStreak === 0 && "Every journey starts with a single step! Let's begin your learning adventure today."}
                  {currentStreak > 0 && currentStreak < 7 && `Great start! You're ${7 - currentStreak} days away from your first milestone!`}
                  {currentStreak >= 7 && currentStreak < 14 && "Fantastic dedication! You're building a strong learning habit."}
                  {currentStreak >= 14 && "Incredible consistency! You're becoming a finance expert day by day."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Streak Achievements
          </CardTitle>
          <CardDescription>Unlock rewards for consistent learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[
              { days: 7, title: 'Week Warrior', icon: Zap, unlocked: currentStreak >= 7 },
              { days: 14, title: 'Bi-Weekly Boss', icon: Star, unlocked: currentStreak >= 14 },
              { days: 21, title: 'Triple Week Legend', icon: Trophy, unlocked: currentStreak >= 21 },
              { days: 30, title: 'Monthly Master', icon: Calendar, unlocked: currentStreak >= 30 }
            ].map((achievement) => (
              <div 
                key={achievement.days}
                className={`p-3 border rounded-lg text-center ${
                  achievement.unlocked 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <achievement.icon className={`h-6 w-6 mx-auto mb-2 ${
                  achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                }`} />
                <div className={`font-semibold text-sm ${
                  achievement.unlocked ? 'text-yellow-800' : 'text-gray-600'
                }`}>
                  {achievement.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement.days} days
                </div>
                {achievement.unlocked && (
                  <Badge variant="outline" className="mt-1 text-xs">
                    Unlocked!
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreakTracker;