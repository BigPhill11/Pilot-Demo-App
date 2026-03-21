import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Play, Trophy } from 'lucide-react';

interface GameCardProps {
  game: {
    id: string;
    name: string;
    description: string;
    xpReward: number;
  };
  isCompleted: boolean;
  onStartGame: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isCompleted, onStartGame }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            <span className="break-words">{game.name}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={isCompleted ? "default" : "outline"}>
              {game.xpReward} XP
            </Badge>
            {isCompleted && (
              <Trophy className="h-4 w-4 text-yellow-500" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 break-words whitespace-normal">
          {game.description}
        </p>
        <Button 
          onClick={() => onStartGame(game.id)}
          disabled={isCompleted}
          className="w-full"
        >
          <Play className="h-4 w-4 mr-2" />
          {isCompleted ? 'Play Again' : 'Start Game'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameCard;