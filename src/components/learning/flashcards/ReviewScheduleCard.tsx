import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Zap
} from "lucide-react";
import { SM2Progress, getDaysUntilReview, predictRetention } from "@/utils/spaced-repetition";
import { formatDistanceToNow, format } from "date-fns";

interface ReviewScheduleCardProps {
  progress: SM2Progress;
  cardTerm: string;
  onClick?: () => void;
}

export const ReviewScheduleCard = ({ progress, cardTerm, onClick }: ReviewScheduleCardProps) => {
  const daysUntil = getDaysUntilReview(progress);
  const retention = predictRetention(progress);
  const isOverdue = daysUntil < 0;
  const isDueToday = daysUntil === 0;
  const isDueSoon = daysUntil > 0 && daysUntil <= 3;

  const getStatusColor = () => {
    if (isOverdue) return "border-red-500 bg-red-50 dark:bg-red-950/20";
    if (isDueToday) return "border-orange-500 bg-orange-50 dark:bg-orange-950/20";
    if (isDueSoon) return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20";
    return "border-green-500 bg-green-50 dark:bg-green-950/20";
  };

  const getStatusIcon = () => {
    if (isOverdue) return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (isDueToday) return <Clock className="h-5 w-5 text-orange-500" />;
    if (isDueSoon) return <Zap className="h-5 w-5 text-yellow-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  const getStatusText = () => {
    if (isOverdue) return `Overdue by ${Math.abs(daysUntil)} day${Math.abs(daysUntil) !== 1 ? 's' : ''}`;
    if (isDueToday) return "Due today";
    if (isDueSoon) return `Due in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`;
    return `Due ${format(new Date(progress.nextReviewDate), 'MMM d')}`;
  };

  const getRetentionColor = () => {
    if (retention >= 80) return "text-green-600";
    if (retention >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card 
      className={`p-4 border-2 transition-all hover:shadow-lg cursor-pointer ${getStatusColor()}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getStatusIcon()}
            <h4 className="font-semibold">{cardTerm}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{getStatusText()}</p>
        </div>
        <Badge variant="secondary" className="ml-2">
          Rep {progress.repetitions}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Interval</div>
          <div className="font-bold">{progress.interval}d</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Easiness</div>
          <div className="font-bold">{progress.easinessFactor.toFixed(1)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Reviews</div>
          <div className="font-bold">{progress.totalReviews}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Est. Retention</span>
          <span className={`font-semibold ${getRetentionColor()}`}>{retention}%</span>
        </div>
        <Progress value={retention} className="h-1.5" />
      </div>

      {progress.lastReviewDate && (
        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Last reviewed {formatDistanceToNow(new Date(progress.lastReviewDate), { addSuffix: true })}</span>
        </div>
      )}
    </Card>
  );
};
