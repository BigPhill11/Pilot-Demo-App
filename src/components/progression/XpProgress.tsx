import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { getLevelFromTotalXp, getXpToNextLevel, getProgressPercent } from '@/lib/progression';

// dynamic XP per level via progression lib

const XpProgress: React.FC = () => {
  const { progress } = useProgressTracking();
  const total = progress.total_points || 0;
  const currentLevel = getLevelFromTotalXp(total);
  const toNext = getXpToNextLevel(total);
  const percent = getProgressPercent(total);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">XP Progress</span>
          <span className="text-sm text-muted-foreground">Level {currentLevel}</span>
        </div>
        <Progress value={percent} className="h-3" />
        <div className="mt-2 text-xs text-muted-foreground">{toNext} XP to next level</div>
      </CardContent>
    </Card>
  );
};

export default XpProgress;
