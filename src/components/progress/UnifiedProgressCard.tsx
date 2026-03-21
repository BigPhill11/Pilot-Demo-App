import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, Trophy } from 'lucide-react';

interface UnifiedProgressCardProps {
  title: string;
  description?: string;
  progress: number;
  timeSpent?: number;
  isCompleted?: boolean;
  badges?: string[];
  className?: string;
}

export const UnifiedProgressCard: React.FC<UnifiedProgressCardProps> = ({
  title,
  description,
  progress,
  timeSpent = 0,
  isCompleted = false,
  badges = [],
  className = ""
}) => {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
              <Trophy className="h-4 w-4" />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Time spent: {formatTime(timeSpent)}</span>
          </div>
          
          {badges.length > 0 && (
            <div className="flex gap-1">
              {badges.slice(0, 2).map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
              {badges.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{badges.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};