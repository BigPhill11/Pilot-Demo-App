
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Adventure } from '@/types/adventure';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProgressOverviewProps {
  adventures: Adventure[];
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ adventures }) => {
  const isMobile = useIsMobile();

  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle className="text-emerald-700">Your Learning Journey</CardTitle>
        <CardDescription>Track your progress through Phil's adventures</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {adventures.filter(a => a.isCompleted).length}
            </div>
            <div className="text-sm text-muted-foreground">Adventures Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {adventures.reduce((total, a) => total + a.chapters, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Chapters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {Math.round(adventures.reduce((total, a) => total + a.progress, 0) / adventures.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">⭐</div>
            <div className="text-sm text-muted-foreground">Panda Expert</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
