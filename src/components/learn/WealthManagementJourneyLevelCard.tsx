import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Lock, Play } from 'lucide-react';
import { WealthLevel } from '@/data/wealth-management-journey-data';

interface WealthManagementJourneyLevelCardProps {
  level: WealthLevel;
  isCompleted: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}

const WealthManagementJourneyLevelCard: React.FC<WealthManagementJourneyLevelCardProps> = ({
  level,
  isCompleted,
  isUnlocked,
  onClick
}) => {
  const getCardStyling = () => {
    if (isCompleted) {
      return "border-emerald-200 bg-emerald-50";
    }
    if (isUnlocked) {
      return "border-emerald-100 hover:border-emerald-200 hover:shadow-md transition-all duration-200";
    }
    return "border-muted bg-muted/30";
  };

  return (
    <Card className={`cursor-pointer ${getCardStyling()}`} onClick={isUnlocked ? onClick : undefined}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge 
            variant={isCompleted ? "default" : isUnlocked ? "secondary" : "outline"}
            className={isCompleted ? "bg-emerald-500" : ""}
          >
            Level {level.id}
          </Badge>
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          ) : !isUnlocked ? (
            <Lock className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Play className="h-5 w-5 text-emerald-600" />
          )}
        </div>
        
        <CardTitle className={`text-lg ${!isUnlocked ? 'text-muted-foreground' : 'text-emerald-800'}`}>
          {level.title}
        </CardTitle>
        
        <CardDescription className={!isUnlocked ? 'text-muted-foreground' : ''}>
          {!isUnlocked && level.id > 1 ? 
            `Complete Level ${level.id - 1} to unlock this level.` : 
            `${level.overview.slice(0, 120)}...`
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>📚 Flashcards: {level.flashcards.length}</span>
              <span>🎮 Games: {level.miniGames.length}</span>
            </div>
            <div className="mt-1">
              <span>❓ Quiz: {level.quiz.questions.length} questions</span>
            </div>
          </div>
          
          <Button 
            variant={isCompleted ? "default" : isUnlocked ? "default" : "secondary"}
            className={`w-full ${isCompleted ? "bg-emerald-500 hover:bg-emerald-600" : isUnlocked ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
            disabled={!isUnlocked}
          >
            {isCompleted ? "✓ Review Level" : isUnlocked ? "Start Level" : "🔒 Locked"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WealthManagementJourneyLevelCard;