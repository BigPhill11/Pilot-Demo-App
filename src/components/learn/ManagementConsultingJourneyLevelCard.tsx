import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle2, Play } from 'lucide-react';
import { ManagementConsultingLevel } from '@/data/management-consulting-journey-data';

interface ManagementConsultingJourneyLevelCardProps {
  level: ManagementConsultingLevel;
  isUnlocked: boolean;
  isCompleted: boolean;
  onSelect: () => void;
}

const ManagementConsultingJourneyLevelCard: React.FC<ManagementConsultingJourneyLevelCardProps> = ({
  level,
  isUnlocked,
  isCompleted,
  onSelect
}) => {
  const getCardClassName = () => {
    if (isCompleted) return "border-green-200 bg-green-50 hover:bg-green-100";
    if (isUnlocked) return "border-blue-200 bg-blue-50 hover:bg-blue-100 cursor-pointer";
    return "border-muted bg-muted/30 opacity-60";
  };

  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle2 className="h-4 w-4 mr-1" />
          Completed
        </Badge>
      );
    }
    if (isUnlocked) {
      return (
        <Badge variant="outline" className="border-blue-300 text-blue-600">
          <Play className="h-4 w-4 mr-1" />
          Available
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-muted-foreground/20">
        <Lock className="h-4 w-4 mr-1" />
        Locked
      </Badge>
    );
  };

  return (
    <Card 
      className={`transition-all duration-200 ${getCardClassName()}`}
      onClick={isUnlocked ? onSelect : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Level {level.id}</CardTitle>
          {getStatusBadge()}
        </div>
        <h3 className="font-semibold text-sm">{level.title}</h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
          {level.overview.substring(0, 120)}...
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Flashcards:</span>
            <span className="font-medium">{level.flashcards.length} terms</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Mini Games:</span>
            <span className="font-medium">{level.miniGames.length} games</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Quiz Questions:</span>
            <span className="font-medium">{level.quiz.length} questions</span>
          </div>
        </div>

        {isUnlocked && (
          <Button 
            className="w-full mt-4" 
            variant={isCompleted ? "outline" : "default"}
            size="sm"
            onClick={onSelect}
          >
            {isCompleted ? 'Review Level' : 'Start Level'}
          </Button>
        )}
        
        {!isUnlocked && (
          <div className="flex items-center justify-center mt-4 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
            <Lock className="h-3 w-3 mr-1" />
            Complete previous level to unlock
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ManagementConsultingJourneyLevelCard;