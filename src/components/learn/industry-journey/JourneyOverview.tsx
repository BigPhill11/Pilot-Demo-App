
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ProgressCard from './ProgressCard';
import LevelCard from './LevelCard';

interface JourneyOverviewProps {
  journey: any;
  progress: any;
  onBack: () => void;
  onLevelSelect: (levelId: number) => void;
}

const JourneyOverview: React.FC<JourneyOverviewProps> = ({
  journey,
  progress,
  onBack,
  onLevelSelect
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Industries
        </Button>
        <div className="flex-1">
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>
            {journey.name || journey.title} Learning Journey
          </h1>
          <p className="text-muted-foreground">
            Interactive lessons with multiple difficulty levels
          </p>
        </div>
      </div>

      <ProgressCard progress={progress} totalLevels={journey.levels.length} journeyId={journey.id} />

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
        {journey.levels.map((level: any) => {
          const levelId = level.level || level.id;
          const isCompleted = progress.completedLevels.includes(levelId);
          const isUnlocked = levelId <= progress.currentLevel;
          
          return (
            <LevelCard
              key={levelId}
              level={level}
              isCompleted={isCompleted}
              isUnlocked={isUnlocked}
              onLevelSelect={() => onLevelSelect(levelId)}
              journeyId={journey.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default JourneyOverview;
