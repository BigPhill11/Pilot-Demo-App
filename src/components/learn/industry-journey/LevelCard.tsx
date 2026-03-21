
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LevelCardProps {
  level: any;
  isCompleted: boolean;
  isUnlocked: boolean;
  onLevelSelect: () => void;
  journeyId?: string;
}

const LevelCard: React.FC<LevelCardProps> = ({
  level,
  isCompleted,
  isUnlocked,
  onLevelSelect,
  journeyId
}) => {
  const isMobile = useIsMobile();
  const levelId = level.level || level.id;
  const focusArea = level.focusArea || level.title;
  const topics = level.sampleTopics || level.keyTakeaways || [];

  return (
    <Card 
      className={`transition-all cursor-pointer hover:shadow-lg ${
        isCompleted ? 'border-green-500 bg-green-50' :
        isUnlocked ? (journeyId === 'private-equity' 
          ? 'border-purple-500 hover:border-purple-600' 
          : 'border-blue-500 hover:border-blue-600') :
        'border-gray-200 opacity-60 cursor-not-allowed'
      }`}
      onClick={() => isUnlocked && onLevelSelect()}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>
            Level {levelId}
          </CardTitle>
          {isCompleted && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
        </div>
        <h4 className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
          {focusArea}
        </h4>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {topics.slice(0, 3).map((topic: string, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isCompleted ? 'bg-green-500' : 
                isUnlocked ? (journeyId === 'private-equity' ? 'bg-purple-500' : 'bg-blue-500') : 
                'bg-gray-300'
              }`}></div>
              <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                {topic}
              </span>
            </div>
          ))}
        </div>
        
        <Button 
          className={`w-full mt-4 ${isMobile ? 'text-sm' : ''}`}
          size={isMobile ? 'sm' : 'default'}
          disabled={!isUnlocked}
          variant={isCompleted ? "secondary" : isUnlocked ? "default" : "ghost"}
        >
          {isCompleted ? "Completed ✓" : 
           isUnlocked ? "Start Level" : 
           "Locked"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LevelCard;
