
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { Adventure } from '@/types/adventure';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdventureCardProps {
  adventure: Adventure;
  onStartAdventure: (adventure: Adventure) => void;
}

const AdventureCard: React.FC<AdventureCardProps> = ({ adventure, onStartAdventure }) => {
  const isMobile = useIsMobile();
  const IconComponent = adventure.icon;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClick = () => {
    if (adventure.isUnlocked) {
      onStartAdventure(adventure);
    }
  };

  return (
    <Card 
      className={`border-emerald-200 transition-all hover:shadow-lg ${
        adventure.isUnlocked 
          ? 'cursor-pointer hover:border-emerald-400' 
          : 'opacity-60 cursor-not-allowed'
      }`}
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {adventure.isUnlocked ? (
              <IconComponent className="h-8 w-8 text-emerald-600" />
            ) : (
              <Lock className="h-8 w-8 text-gray-400" />
            )}
            <div>
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-emerald-800`}>
                {adventure.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="outline" 
                  className={getDifficultyColor(adventure.difficulty)}
                >
                  {adventure.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {adventure.estimatedTime}
                </span>
              </div>
            </div>
          </div>
          
          {adventure.isCompleted && (
            <CheckCircle className="h-6 w-6 text-green-500" />
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''} mb-4`}>
          {adventure.description}
        </p>

        {/* Progress Bar */}
        {adventure.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{adventure.progress}%</span>
            </div>
            <Progress value={adventure.progress} className="h-2" />
          </div>
        )}

        {/* Adventure Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{adventure.chapters} chapters</span>
          <span>Interactive story</span>
        </div>

        {/* Action Button */}
        <Button 
          className={`w-full ${
            adventure.isUnlocked 
              ? 'bg-emerald-600 hover:bg-emerald-700' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!adventure.isUnlocked}
          size={isMobile ? 'sm' : 'default'}
        >
          {adventure.isUnlocked ? (
            <>
              {adventure.progress > 0 ? 'Continue Adventure' : 'Start Adventure'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Complete previous adventures to unlock
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdventureCard;
