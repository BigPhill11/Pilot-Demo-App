import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { getReviewStats } from "@/utils/spaced-repetition";
import { SM2Progress } from "@/utils/spaced-repetition";

interface ReviewDashboardProps {
  allProgress: Map<string, SM2Progress>;
}

export const ReviewDashboard = ({ allProgress }: ReviewDashboardProps) => {
  const stats = getReviewStats(allProgress);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
        <div className="flex items-center justify-between mb-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          {stats.dueNow > 0 && (
            <Badge variant="destructive" className="text-xs">
              Review Now!
            </Badge>
          )}
        </div>
        <div className="text-2xl font-bold text-red-700 dark:text-red-400">
          {stats.dueNow}
        </div>
        <div className="text-xs text-muted-foreground">Due Now</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-200 dark:border-orange-800">
        <div className="flex items-center justify-between mb-2">
          <Clock className="h-5 w-5 text-orange-600" />
          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
            Today
          </Badge>
        </div>
        <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
          {stats.dueToday}
        </div>
        <div className="text-xs text-muted-foreground">Due Today</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
            7 Days
          </Badge>
        </div>
        <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
          {stats.dueThisWeek}
        </div>
        <div className="text-xs text-muted-foreground">Due This Week</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between mb-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
            Mature
          </Badge>
        </div>
        <div className="text-2xl font-bold text-green-700 dark:text-green-400">
          {stats.mature}
        </div>
        <div className="text-xs text-muted-foreground">Mastered Cards</div>
      </Card>

      <Card className="p-4 col-span-2 md:col-span-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Learning Progress</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
              {stats.learning}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Learning</div>
            <div className="text-xs text-muted-foreground opacity-70">
              {"<"}3 reps
            </div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {stats.young}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Young</div>
            <div className="text-xs text-muted-foreground opacity-70">
              {"<"}21 days
            </div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {stats.mature}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Mature</div>
            <div className="text-xs text-muted-foreground opacity-70">
              ≥21 days
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Avg Easiness:</span>
          </div>
          <span className="font-semibold">{stats.averageEasiness.toFixed(2)}</span>
        </div>
      </Card>
    </div>
  );
};
