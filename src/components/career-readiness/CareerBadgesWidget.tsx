import React from 'react';
import { Lock, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CAREER_MODULES } from '@/data/career-readiness/modules';
import { useCareerReadinessProgress } from '@/hooks/useCareerReadinessProgress';

interface CareerBadgesWidgetProps {
  badgesEarned: number;
  totalBadges: number;
}

const CareerBadgesWidget: React.FC<CareerBadgesWidgetProps> = ({
  badgesEarned,
  totalBadges,
}) => {
  const { hasBadge } = useCareerReadinessProgress();

  return (
    <Card className="rounded-2xl border-emerald-100">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">Earn Badges</h3>
          <span className="text-sm text-muted-foreground">
            {badgesEarned}/{totalBadges} Earned
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {CAREER_MODULES.map((module) => {
            const earned = hasBadge(module.badgeId);
            return (
              <Tooltip key={module.id}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl border ${
                      earned
                        ? 'bg-emerald-600 border-emerald-700 text-white'
                        : 'bg-emerald-100/60 border-emerald-200 text-emerald-600'
                    }`}
                    style={{
                      clipPath:
                        'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  >
                    {earned ? (
                      <Award className="h-5 w-5" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {earned ? (
                    <p>{module.title} badge earned!</p>
                  ) : (
                    <p>Complete {module.title} to unlock</p>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerBadgesWidget;
