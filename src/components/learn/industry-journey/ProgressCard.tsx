
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LessonProgress {
  completedLevels: number[];
  currentLevel: number;
  selectedDifficulty: 'beginner' | 'intermediate' | 'pro';
  totalPointsEarned: number;
}

interface ProgressCardProps {
  progress: LessonProgress;
  totalLevels: number;
  journeyId?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ progress, totalLevels, journeyId }) => {
  const isMobile = useIsMobile();

  return (
    <Card className={`border-2 ${
      journeyId === 'private-equity' 
        ? 'border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50'
        : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'
    }`}>
      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${
            journeyId === 'private-equity' ? 'text-purple-800' : 'text-blue-800'
          }`}>Your Progress</h3>
          <Badge className={`text-white ${
            journeyId === 'private-equity' ? 'bg-purple-500' : 'bg-blue-500'
          }`}>
            <Trophy className="h-4 w-4 mr-1" />
            Level {progress.currentLevel}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              journeyId === 'private-equity' ? 'text-purple-600' : 'text-blue-600'
            }`}>
              {progress.completedLevels.length}
            </div>
            <div className="text-sm text-muted-foreground">Levels Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {progress.totalPointsEarned}
            </div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 capitalize">
              {progress.selectedDifficulty}
            </div>
            <div className="text-sm text-muted-foreground">Current Level</div>
          </div>
        </div>

        <Progress 
          value={(progress.completedLevels.length / totalLevels) * 100} 
          className="mt-4 h-2" 
        />
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
