import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { DailyGoal } from '@/hooks/useDailyGoals';
import { navigateToGoal } from '@/lib/dashboardDeepLink';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface DailyGoalsSectionProps {
  goals: DailyGoal[];
  completedCount: number;
  loading: boolean;
  currentStreak: number;
  streakMultiplier: number;
  nextMilestone: number;
  onNavigate?: (tab: string) => void;
}

const DailyGoalsSection: React.FC<DailyGoalsSectionProps> = ({
  goals,
  completedCount,
  loading,
  currentStreak,
  streakMultiplier,
  nextMilestone,
  onNavigate,
}) => {
  const progressPct = (completedCount / 3) * 100;

  const handleGoalClick = (goal: DailyGoal) => {
    if (goal.completed) return;
    navigateToGoal(goal.targetTab, goal.deepLink, onNavigate);
  };

  return (
    <Card className="border-2 border-primary/25 rounded-2xl bg-gradient-to-br from-primary/5 via-emerald-500/5 to-amber-500/5 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            Today&apos;s Trail
          </CardTitle>
          <Badge variant="outline" className="border-primary/30 text-primary shrink-0">
            {completedCount}/3 Complete
          </Badge>
        </div>
        <CardDescription>
          Finish all three for bonus bamboo — goals refresh every day!
        </CardDescription>
        <Progress value={progressPct} className="h-2 mt-3" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border border-primary/10 rounded-xl bg-card animate-pulse">
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))
            : goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  role="button"
                  tabIndex={goal.completed ? -1 : 0}
                  onClick={() => handleGoalClick(goal)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGoalClick(goal)}
                  className={`flex items-center justify-between gap-3 p-4 border rounded-xl transition-all touch-manipulation ${
                    goal.completed
                      ? 'opacity-70 border-emerald-500/40 bg-emerald-500/5 cursor-default'
                      : 'border-primary/15 bg-card hover:border-primary/40 hover:shadow-md cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {goal.completed ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                    ) : (
                      <span className="text-2xl shrink-0"><ThemedEmoji emoji={goal.icon} className="h-[1em] w-[1em]" /></span>
                    )}
                    <div className="min-w-0">
                      <p
                        className={`font-medium text-sm sm:text-base truncate ${
                          goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {goal.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{goal.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge
                      variant={goal.completed ? 'default' : 'outline'}
                      className={goal.completed ? 'bg-emerald-600' : 'border-amber-400/50 text-amber-700 dark:text-amber-400'}
                    >
                      +{goal.bambooReward} <ThemedEmoji emoji="🎋" className="h-[1em] w-[1em]" />
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      +{goal.xpReward} XP
                    </Badge>
                  </div>
                </motion.div>
              ))}
        </div>

        {currentStreak > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-orange-500/10 border border-orange-300/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-400">
                {currentStreak} day streak!
              </span>
            </div>
            <span className="text-xs text-orange-600/80 dark:text-orange-400/80">
              {streakMultiplier > 1
                ? `${streakMultiplier.toFixed(1)}x bamboo multiplier active`
                : `${nextMilestone - currentStreak} days to next bonus`}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyGoalsSection;
