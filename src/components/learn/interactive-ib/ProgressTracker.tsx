
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressTrackerProps {
  progress: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Lesson Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
