
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoryProgressProps {
  currentChapter: number;
  totalChapters: number;
  adventureTitle: string;
}

const StoryProgress: React.FC<StoryProgressProps> = ({ 
  currentChapter, 
  totalChapters, 
  adventureTitle 
}) => {
  const isMobile = useIsMobile();
  const progressPercentage = ((currentChapter + 1) / totalChapters) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className={`font-bold text-emerald-800 ${isMobile ? 'text-lg' : 'text-xl'}`}>
          {adventureTitle}
        </h2>
        <span className={`text-emerald-600 font-medium ${isMobile ? 'text-sm' : ''}`}>
          {currentChapter + 1} / {totalChapters}
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default StoryProgress;
