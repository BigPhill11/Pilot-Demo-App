import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, BookOpen, Zap } from "lucide-react";
import { StudySession } from "@/types/flashcard-gamification";
import { formatDistanceToNow } from "date-fns";

interface StudySessionTrackerProps {
  session: StudySession | null;
  isActive: boolean;
}

export const StudySessionTracker = ({ session, isActive }: StudySessionTrackerProps) => {
  if (!session) return null;

  const accuracy = session.cardsReviewed > 0 
    ? ((session.correctAnswers / session.cardsReviewed) * 100).toFixed(0)
    : 0;

  const sessionDuration = session.endTime 
    ? Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000 / 60)
    : 0;

  return (
    <Card className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          <h4 className="font-semibold">Study Session</h4>
        </div>
        {isActive && (
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100 animate-pulse">
            Active
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <BookOpen className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-lg font-bold">{session.cardsReviewed}</div>
          <div className="text-xs text-muted-foreground">Cards</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Target className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-lg font-bold">{accuracy}%</div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Clock className="h-4 w-4 text-orange-600" />
          </div>
          <div className="text-lg font-bold">{sessionDuration}m</div>
          <div className="text-xs text-muted-foreground">Time</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap className="h-4 w-4 text-yellow-600" />
          </div>
          <div className="text-lg font-bold">+{session.xpEarned}</div>
          <div className="text-xs text-muted-foreground">XP</div>
        </div>
      </div>

      {!isActive && session.endTime && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          Completed {formatDistanceToNow(new Date(session.endTime), { addSuffix: true })}
        </p>
      )}
    </Card>
  );
};
