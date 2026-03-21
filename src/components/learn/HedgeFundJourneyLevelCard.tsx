import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Lock, Play } from 'lucide-react';

interface HedgeFundJourneyLevelCardProps {
  level: any;
  isUnlocked: boolean;
  isCompleted: boolean;
  onLevelSelect: (levelId: number) => void;
}

const HedgeFundJourneyLevelCard: React.FC<HedgeFundJourneyLevelCardProps> = ({
  level,
  isUnlocked,
  isCompleted,
  onLevelSelect
}) => {
  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      isCompleted 
        ? 'border-green-200 bg-green-50/50' 
        : isUnlocked 
          ? 'border-blue-200 hover:border-blue-300 cursor-pointer' 
          : 'border-gray-200 bg-gray-50/50 opacity-75'
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Level {level.id}: {level.title}
          </CardTitle>
          {isCompleted ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : !isUnlocked ? (
            <Lock className="h-6 w-6 text-gray-400" />
          ) : (
            <Play className="h-6 w-6 text-blue-500" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {level.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {level.flashcards?.length || 5} Terms
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {level.quiz?.length || 5} Questions
          </Badge>
          {level.miniGames && (
            <Badge variant="secondary" className="text-xs">
              {level.miniGames.length} Mini Games
            </Badge>
          )}
        </div>

        {isUnlocked ? (
          <Button 
            onClick={() => onLevelSelect(level.id)}
            className={`w-full ${
              isCompleted 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isCompleted ? 'Review Level' : 'Start Level'}
          </Button>
        ) : (
          <Button disabled className="w-full">
            <Lock className="h-4 w-4 mr-2" />
            Complete Previous Level
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default HedgeFundJourneyLevelCard;