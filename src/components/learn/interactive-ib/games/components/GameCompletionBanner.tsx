
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, RotateCcw, Star } from 'lucide-react';

interface GameCompletionBannerProps {
  title?: string;
  score: number;
  totalScore?: number;
  feedback?: string;
  onPlayAgain?: () => void;
}

const GameCompletionBanner: React.FC<GameCompletionBannerProps> = ({
  title = "Game Complete!",
  score,
  totalScore = 100,
  feedback = "Great job!",
  onPlayAgain
}) => {
  const percentage = Math.round((score / totalScore) * 100);
  const isExcellent = percentage >= 90;
  const isGood = percentage >= 70;
  
  const getPerformanceColor = () => {
    if (isExcellent) return 'text-green-600';
    if (isGood) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getPerformanceText = () => {
    if (isExcellent) return 'Excellent!';
    if (isGood) return 'Well Done!';
    return 'Good Effort!';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardContent className="p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <Trophy className={`h-16 w-16 ${getPerformanceColor()}`} />
            {isExcellent && (
              <Star className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className={`text-xl font-semibold ${getPerformanceColor()}`}>
            {getPerformanceText()}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            Score: {score}/{totalScore}
          </Badge>
          <Badge 
            variant={isExcellent ? "default" : isGood ? "secondary" : "outline"}
            className="text-lg px-4 py-2"
          >
            {percentage}%
          </Badge>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-muted-foreground">{feedback}</p>
        </div>

        {onPlayAgain && (
          <Button 
            onClick={onPlayAgain}
            className="hover-scale"
            size="lg"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GameCompletionBanner;
