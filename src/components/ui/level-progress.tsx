
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
import { getProgressPercent } from '@/lib/progression';

interface LevelProgressProps {
  currentLevel: number;
  totalPoints: number;
  pointsToNextLevel: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  totalPoints,
  pointsToNextLevel
}) => {
  const progressPercentage = getProgressPercent(totalPoints);
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <Trophy className="h-4 w-4 text-yellow-500" />
        <span className="font-medium text-sm">{totalPoints}</span>
      </div>
      <div className="flex flex-col space-y-1 min-w-[80px]">
        <Progress value={Math.min(progressPercentage, 100)} className="h-2" />
        <div className="text-xs text-muted-foreground text-center">
          Level {currentLevel}
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;
