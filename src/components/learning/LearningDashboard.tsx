/**
 * Learning Dashboard
 * 
 * Shows real progress across 3 learning paths and personalized daily goals.
 * Integrates with unified streak system for XP/bamboo multipliers.
 * Theme: Green palette matching Phil's Financials panda logo
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Brain, 
  PlayCircle, 
  Clock, 
  Zap, 
  Lightbulb,
  Flame,
  CheckCircle2,
  ArrowRight,
  Lock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDashboardProgress } from '@/hooks/useDashboardProgress';
import { useDailyGoals } from '@/hooks/useDailyGoals';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { useGameStore } from '@/store/useGameStore';
import PandaLogo from '@/components/icons/PandaLogo';
import TermOfTheDay from '@/components/learn/TermOfTheDay';
import ComingSoonDialog from '@/components/ui/ComingSoonDialog';

interface LearningDashboardProps {
  onNavigateToTab?: (tabValue: string) => void;
}

const LearningDashboard: React.FC<LearningDashboardProps> = ({ onNavigateToTab }) => {
  const { profile } = useAuth();
  const isMobile = useIsMobile();
  const { paths, overallProgress, totalLessonsCompleted, loading: progressLoading } = useDashboardProgress();
  const { goals, completedCount, loading: goalsLoading } = useDailyGoals();
  const { currentStreak, streakLevel, streakMultiplier, nextMilestone } = useUnifiedStreak();
  const xp = useGameStore(state => state.xp);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');

  // Beta-locked features
  const isFeatureLocked = (targetTab: string) => {
    return targetTab === 'companies' || targetTab === 'careers';
  };

  const handlePathClick = (targetTab: string, featureName: string) => {
    if (isFeatureLocked(targetTab)) {
      setComingSoonFeature(featureName);
      setShowComingSoon(true);
      return;
    }
    onNavigateToTab?.(targetTab);
  };
  // Green theme color classes for learning paths
  const getColorClasses = (index: number) => {
    const colors = [
      'border-green-300 hover:border-green-500 bg-gradient-to-br from-green-50 to-emerald-100',
      'border-teal-300 hover:border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-100',
      'border-emerald-300 hover:border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-100',
    ];
    return colors[index % colors.length];
  };

  const getProgressColor = (index: number) => {
    const colors = ['bg-green-500', 'bg-teal-500', 'bg-emerald-500'];
    return colors[index % colors.length];
  };

  const loading = progressLoading || goalsLoading;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Welcome Card - Compact with green theme */}
      <Card className="border-green-300 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        <CardContent className="p-4">
          <div className={`flex items-center ${isMobile ? 'flex-col text-center space-y-3' : 'justify-between'}`}>
            <div className="flex items-center gap-3">
              <PandaLogo className={`${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`} />
              <div>
                <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-green-800`}>
                  Your Learning Dashboard
                </h1>
              </div>
            </div>
            <div className={`${isMobile ? 'flex gap-2' : 'flex items-center gap-2'}`}>
              <Badge variant="outline" className="text-green-700 border-green-400 bg-green-50">
                {profile?.app_version || 'Learner'}
              </Badge>
              {streakMultiplier > 1 && (
                <Badge className="bg-green-600 text-white">
                  {streakMultiplier.toFixed(1)}x Multiplier Active!
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Term of the Day - Right below welcome card (unchanged) */}
      <TermOfTheDay />

      {/* Quick Stats - 4 items with green theme */}
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-700">{totalLessonsCompleted}</div>
            <div className="text-xs text-green-600/70">Lessons Completed</div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
            <div className="text-2xl font-bold text-emerald-700">{overallProgress}%</div>
            <div className="text-xs text-emerald-600/70">Overall Progress</div>
          </CardContent>
        </Card>
        <Card className={`${streakLevel.bg} border-orange-200`}>
          <CardContent className="p-4 text-center">
            <Flame className={`h-8 w-8 mx-auto mb-2 ${streakLevel.color}`} />
            <div className={`text-2xl font-bold ${streakLevel.color}`}>{currentStreak}</div>
            <div className="text-xs text-muted-foreground">
              Day Streak {currentStreak > 0 && `→ ${nextMilestone}`}
            </div>
          </CardContent>
        </Card>
        <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-teal-600" />
            <div className="text-2xl font-bold text-teal-700">{xp}</div>
            <div className="text-xs text-teal-600/70">Total XP</div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Paths - 3 paths with green theme */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-800">
          <Lightbulb className="h-6 w-6 text-green-500" />
          Your Learning Paths
        </h2>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse border-green-200">
                <CardHeader className="pb-3">
                  <div className="h-8 w-8 bg-green-100 rounded mb-2" />
                  <div className="h-5 bg-green-100 rounded w-3/4" />
                  <div className="h-4 bg-green-100 rounded w-full mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="h-2 bg-green-100 rounded mb-4" />
                  <div className="h-8 bg-green-100 rounded" />
                </CardContent>
              </Card>
            ))
          ) : (
            paths.map((path, index) => {
              const locked = isFeatureLocked(path.targetTab);
              return (
              <Card 
                key={path.id}
                className={`${getColorClasses(index)} cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${locked ? 'opacity-70' : ''}`}
                onClick={() => handlePathClick(path.targetTab, path.title)}
              >
                {locked && (
                  <div className="absolute top-2 right-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{path.icon}</span>
                    <Badge variant="outline" className="text-xs border-green-400 text-green-700">
                      {locked ? 'Coming Soon' : `${path.lessonsCompleted}/${path.totalLessons} lessons`}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-green-800">{path.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2 text-green-600/80">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-green-700">
                      <span>Progress</span>
                      <span className="font-medium">{locked ? '🔒' : `${path.progressPct}%`}</span>
                    </div>
                    <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColor(index)} transition-all duration-500`}
                        style={{ width: locked ? '0%' : `${path.progressPct}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-green-600/70">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{path.estimatedTime}</span>
                    </div>
                    <Button size="sm" className="h-7 text-xs gap-1 bg-green-600 hover:bg-green-700 text-white">
                      {locked ? 'Coming Soon' : path.progressPct === 0 ? 'Start' : 'Continue'}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                  {!locked && path.progressPct > 0 && path.progressPct < 100 && (
                    <p className="text-xs text-green-600/70 italic">
                      Next: {path.nextActionLabel}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })
          )}
        </div>
      </div>

      {/* Today's Learning Goals - with green theme */}
      <Card className="border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Target className="h-5 w-5 text-green-600" />
              Today's Learning Goals
            </CardTitle>
            <Badge variant="outline" className="text-green-700 border-green-400 bg-green-50">
              {completedCount}/3 Complete
            </Badge>
          </div>
          <CardDescription className="text-green-600/80">
            Complete these goals to earn bonus rewards and maintain your streak!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-white animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full" />
                    <div>
                      <div className="h-4 w-32 bg-green-100 rounded mb-1" />
                      <div className="h-3 w-24 bg-green-100 rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-green-100 rounded" />
                </div>
              ))
            ) : (
              goals.map((goal) => (
                <div 
                  key={goal.id} 
                  className={`flex items-center justify-between p-4 border rounded-lg bg-white cursor-pointer transition-all hover:shadow-md ${
                    goal.completed ? 'opacity-75 border-green-400' : 'border-green-200 hover:border-green-400'
                  }`}
                  onClick={() => {
                    if (!goal.completed) {
                      onNavigateToTab?.(goal.targetTab);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    {goal.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <span className="text-2xl">{goal.icon}</span>
                    )}
                    <div>
                      <span className={`font-medium ${goal.completed ? 'line-through text-green-600/50' : 'text-green-800'}`}>
                        {goal.title}
                      </span>
                      <p className="text-xs text-green-600/70">{goal.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={goal.completed ? 'default' : 'outline'} className={goal.completed ? 'bg-green-500' : 'border-green-400 text-green-700'}>
                      +{goal.bambooReward} 🎋
                    </Badge>
                    <Badge variant={goal.completed ? 'default' : 'secondary'} className={goal.completed ? 'bg-green-600' : 'bg-green-100 text-green-700'}>
                      +{goal.xpReward} XP
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Streak info */}
          {currentStreak > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">
                  {currentStreak} day streak active!
                </span>
              </div>
              <span className="text-xs text-orange-600">
                {streakMultiplier > 1 
                  ? `${streakMultiplier.toFixed(1)}x bamboo multiplier` 
                  : `${nextMilestone - currentStreak} days to ${streakMultiplier.toFixed(1)}x bonus`
                }
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions - 3 buttons with green theme */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        <Button 
          onClick={() => onNavigateToTab?.('adaptive-flashcards')}
          className="h-20 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          <div className="text-center">
            <PlayCircle className="h-8 w-8 mx-auto mb-1" />
            <div>Quick Review</div>
          </div>
        </Button>
        <Button 
          onClick={() => onNavigateToTab?.('personal-finance')}
          variant="outline"
          className="h-20 border-2 border-green-400 text-green-700 hover:bg-green-50 hover:border-green-500"
        >
          <div className="text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-1" />
            <div>Continue Learning</div>
          </div>
        </Button>
        <Button 
          onClick={() => handlePathClick('companies', 'Market Intelligence')}
          variant="outline"
          className="h-20 border-2 border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400 opacity-70"
        >
          <div className="text-center">
            <Lock className="h-8 w-8 mx-auto mb-1" />
            <div>Market Intel (Soon)</div>
          </div>
        </Button>
      </div>

      {/* Coming Soon Dialog */}
      <ComingSoonDialog
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        featureName={comingSoonFeature}
      />
    </div>
  );
};

export default LearningDashboard;
