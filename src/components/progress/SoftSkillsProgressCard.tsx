import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Trophy, 
  Target, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Zap
} from 'lucide-react';
import { useSoftSkillsProgress } from '@/hooks/useSoftSkillsProgress';
import { cn } from '@/lib/utils';

interface SoftSkillsProgressCardProps {
  courseId?: string;
  moduleId?: string;
  showDetailed?: boolean;
  className?: string;
  onSync?: () => void;
}

export const SoftSkillsProgressCard: React.FC<SoftSkillsProgressCardProps> = ({
  courseId,
  moduleId,
  showDetailed = true,
  className,
  onSync
}) => {
  const {
    loading,
    syncing,
    offline,
    moduleProgress,
    courseProgress,
    pendingUpdates,
    lastSync,
    getModuleProgress,
    getCourseProgress,
    syncToDatabase,
    refreshProgress
  } = useSoftSkillsProgress({ courseId, moduleId });

  const handleSync = async () => {
    await syncToDatabase();
    onSync?.();
  };

  const handleRefresh = () => {
    refreshProgress();
  };

  if (loading) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-3 bg-muted rounded"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get specific progress data
  const specificModuleProgress = moduleId && courseId ? getModuleProgress(moduleId, courseId) : null;
  const specificCourseProgress = courseId ? getCourseProgress(courseId) : null;

  // Calculate overall stats
  const totalModules = moduleProgress.length;
  const completedModules = moduleProgress.filter(m => m.progressPercentage >= 100).length;
  const totalCourses = courseProgress.length;
  const completedCourses = courseProgress.filter(c => c.overallProgress >= 100).length;
  const overallProgress = totalModules > 0 
    ? moduleProgress.reduce((sum, m) => sum + m.progressPercentage, 0) / totalModules 
    : 0;

  // Calculate total XP earned
  const totalXp = moduleProgress.reduce((sum, m) => sum + (m.detailedProgress.xpEarned || 0), 0);

  return (
    <Card className={cn("relative", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>
              {specificModuleProgress ? 'Module Progress' : 
               specificCourseProgress ? 'Course Progress' : 
               'Soft Skills Progress'}
            </span>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            {/* Sync Status */}
            <div className="flex items-center space-x-1">
              {offline ? (
                <WifiOff className="h-4 w-4 text-orange-500" />
              ) : (
                <Wifi className="h-4 w-4 text-green-500" />
              )}
              {pendingUpdates > 0 && (
                <Badge variant="outline" className="text-xs">
                  {pendingUpdates} pending
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={syncing}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={cn("h-4 w-4", syncing && "animate-spin")} />
              </Button>
              
              {pendingUpdates > 0 && !offline && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSync}
                  disabled={syncing}
                  className="h-8 w-8 p-0"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Offline Warning */}
        {offline && (
          <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <p className="text-sm text-orange-700">
              You're offline. Progress will sync when connection is restored.
            </p>
          </div>
        )}

        {/* Specific Module Progress */}
        {specificModuleProgress && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Module Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(specificModuleProgress.progressPercentage)}%
              </span>
            </div>
            <Progress value={specificModuleProgress.progressPercentage} className="h-3" />
            
            {showDetailed && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{specificModuleProgress.timeSpentMinutes} min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span>{specificModuleProgress.detailedProgress.xpEarned || 0} XP</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Specific Course Progress */}
        {specificCourseProgress && !specificModuleProgress && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm text-muted-foreground">
                {specificCourseProgress.completedModules}/{specificCourseProgress.totalModules} modules
              </span>
            </div>
            <Progress value={specificCourseProgress.overallProgress} className="h-3" />
            
            {showDetailed && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>{Math.round(specificCourseProgress.overallProgress)}% complete</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{specificCourseProgress.estimatedTimeLeft} min left</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Overall Progress */}
        {!specificModuleProgress && !specificCourseProgress && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>

            {showDetailed && (
              <>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{completedModules}</div>
                    <div className="text-xs text-muted-foreground">Modules Done</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{completedCourses}</div>
                    <div className="text-xs text-muted-foreground">Courses Done</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{totalXp}</div>
                    <div className="text-xs text-muted-foreground">Total XP</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last synced: {new Date(lastSync).toLocaleTimeString()}</span>
                  {pendingUpdates > 0 && (
                    <span className="text-orange-600">{pendingUpdates} updates pending</span>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Sync Status */}
        {syncing && (
          <div className="flex items-center justify-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-700">Syncing progress...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};