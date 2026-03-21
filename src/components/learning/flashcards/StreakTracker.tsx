import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Snowflake, Trophy, Calendar } from "lucide-react";
import { StreakData } from "@/types/flashcard-gamification";

interface StreakTrackerProps {
  streakData: StreakData;
  onUseFreeze?: () => void;
}

export const StreakTracker = ({ streakData, onUseFreeze }: StreakTrackerProps) => {
  const getStreakFlameSize = (streak: number) => {
    if (streak >= 30) return "h-16 w-16";
    if (streak >= 14) return "h-14 w-14";
    if (streak >= 7) return "h-12 w-12";
    return "h-10 w-10";
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-orange-500";
    if (streak >= 14) return "text-orange-400";
    if (streak >= 7) return "text-orange-300";
    return "text-orange-200";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`${getStreakFlameSize(streakData.currentStreak)} ${getStreakColor(streakData.currentStreak)} animate-pulse`}>
            <Flame className="w-full h-full" fill="currentColor" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">{streakData.currentStreak} Day Streak</h3>
              {streakData.currentStreak >= 7 && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100">
                  🔥 On Fire!
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Keep it going!</p>
          </div>
        </div>
        
        {streakData.streakFreezeTokens > 0 && onUseFreeze && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onUseFreeze}
          >
            <Snowflake className="h-4 w-4 text-blue-500" />
            Freeze ({streakData.streakFreezeTokens})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-background/50">
          <Trophy className="h-5 w-5 text-yellow-500 mb-1" />
          <span className="text-sm text-muted-foreground">Longest</span>
          <span className="text-xl font-bold">{streakData.longestStreak}</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-background/50">
          <Calendar className="h-5 w-5 text-blue-500 mb-1" />
          <span className="text-sm text-muted-foreground">This Week</span>
          <span className="text-xl font-bold">{streakData.weeklyStreak}</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-background/50">
          <Flame className="h-5 w-5 text-orange-500 mb-1" />
          <span className="text-sm text-muted-foreground">This Month</span>
          <span className="text-xl font-bold">{streakData.monthlyStreak}</span>
        </div>
      </div>

      {streakData.streakFreezeTokens === 0 && (
        <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            💡 Earn streak freeze tokens by mastering cards. Use them to protect your streak if you miss a day!
          </p>
        </div>
      )}
    </Card>
  );
};
