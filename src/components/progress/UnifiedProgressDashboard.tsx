import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Target, Zap, BookOpen, TrendingUp } from 'lucide-react';
import { useProgressContext } from '@/contexts/ProgressContext';

const UnifiedProgressDashboard: React.FC = () => {
  const { 
    allProgress, 
    loading, 
    getTotalCompletedModules, 
    getOverallProgress, 
    getStreakData 
  } = useProgressContext();

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const completedModules = getTotalCompletedModules();
  const overallProgress = getOverallProgress();
  const { currentStreak, longestStreak } = getStreakData();
  const totalTimeSpent = allProgress.reduce((sum, p) => sum + p.timeSpentMinutes, 0);

  const modulesByType = allProgress.reduce((acc, module) => {
    if (!acc[module.moduleType]) {
      acc[module.moduleType] = [];
    }
    acc[module.moduleType].push(module);
    return acc;
  }, {} as Record<string, typeof allProgress>);

  const getModuleTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'soft_skills': 'Soft Skills',
      'career_finance': 'Career Finance',
      'personal_finance': 'Personal Finance',
      'trading': 'Trading',
      'investment_banking': 'Investment Banking',
      'venture_capital': 'Venture Capital',
      'consulting': 'Consulting'
    };
    return labels[type] || type;
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Modules</p>
                <p className="text-2xl font-bold">{completedModules}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{overallProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{currentStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time Spent</p>
                <p className="text-2xl font-bold">{formatTime(totalTimeSpent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Learning Progress</span>
          </CardTitle>
          <CardDescription>Your overall progress across all learning modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Completion</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completedModules} completed</span>
              <span>{allProgress.length} total modules</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress by Category */}
      <div className="grid lg:grid-cols-2 gap-6">
        {Object.entries(modulesByType).map(([type, modules]) => {
          const typeProgress = Math.round(
            modules.reduce((sum, m) => sum + m.progressPercentage, 0) / modules.length
          );
          const completedInType = modules.filter(m => m.progressPercentage >= 100).length;

          return (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>{getModuleTypeLabel(type)}</span>
                  </div>
                  <Badge variant="secondary">{typeProgress}%</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={typeProgress} className="h-2" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span>{completedInType}/{modules.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Spent</span>
                    <span>{formatTime(modules.reduce((sum, m) => sum + m.timeSpentMinutes, 0))}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recent Modules:</p>
                  {modules
                    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
                    .slice(0, 3)
                    .map((module, index) => (
                      <div key={`${module.moduleId}-${index}`} className="flex items-center justify-between text-xs">
                        <span className="truncate">{module.moduleId}</span>
                        <Badge variant={module.progressPercentage >= 100 ? "default" : "outline"} className="text-xs">
                          {module.progressPercentage}%
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Highlights */}
      {(currentStreak > 0 || longestStreak > 0 || completedModules > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Achievement Highlights</CardTitle>
            <CardDescription>Your learning milestones and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {longestStreak > 0 && (
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="font-semibold">Longest Streak</p>
                  <p className="text-2xl font-bold text-yellow-600">{longestStreak} days</p>
                </div>
              )}
              
              {completedModules > 0 && (
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">Modules Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedModules}</p>
                </div>
              )}
              
              {totalTimeSpent > 0 && (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold">Total Learning Time</p>
                  <p className="text-2xl font-bold text-blue-600">{formatTime(totalTimeSpent)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UnifiedProgressDashboard;