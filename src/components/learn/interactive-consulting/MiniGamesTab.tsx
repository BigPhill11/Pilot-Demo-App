
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Star, Trophy, Play, ArrowLeft } from 'lucide-react';
import { ConsultingLessonContent } from '@/data/management-consulting-lessons';
import ConsultingGameRenderer from './games/ConsultingGameRenderer';
import { useConsultingProgressAdapter } from '@/hooks/useProgressAdapter';

interface MiniGamesTabProps {
  lesson: ConsultingLessonContent;
  completedActivities: string[];
  onActivityComplete: () => void;
}

const MiniGamesTab: React.FC<MiniGamesTabProps> = ({ 
  lesson, 
  completedActivities,
  onActivityComplete 
}) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set());
  const { saveMiniGameProgress, getLevelProgress } = useConsultingProgressAdapter();

  // Load existing progress on mount and when progress changes
  useEffect(() => {
    const levelProgress = getLevelProgress(lesson.level);
    const existingCompletedGames = new Set(
      Object.keys(levelProgress.miniGamesProgress).filter(
        gameId => levelProgress.miniGamesProgress[gameId].completed
      )
    );
    setCompletedGames(existingCompletedGames);
  }, [lesson.level]);

  const handleGameComplete = (gameId: string, score: number = 0) => {
    console.log(`Consulting game ${gameId} completed with score:`, score);
    
    // Save to progress tracking
    saveMiniGameProgress(lesson.level, gameId, score, true);
    
    setCompletedGames(prev => new Set([...prev, gameId]));
    setSelectedGame(null);
    
    // Mark activity as complete when at least one game is completed
    if (completedGames.size === 0) {
      onActivityComplete();
    }
  };

  const handleGameStart = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleBackToGames} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>
        <ConsultingGameRenderer
          gameId={selectedGame}
          completedActivities={completedActivities}
          onComplete={handleGameComplete}
        />
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Gamepad2 className="h-5 w-5" />
            Interactive Mini-Games
          </CardTitle>
          <p className="text-purple-700">
            Practice your consulting skills through engaging games and simulations
          </p>
          {completedGames.size > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-purple-700">
                {completedGames.size} game{completedGames.size !== 1 ? 's' : ''} completed
              </span>
            </div>
          )}
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {lesson.miniGames.map((game) => {
          const isCompleted = completedGames.has(game.id);
          
          return (
            <Card 
              key={game.id} 
              className={`transition-all duration-200 hover:shadow-lg ${
                isCompleted ? 'ring-2 ring-green-200 bg-green-50' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {isCompleted && <Trophy className="h-5 w-5 text-green-600" />}
                    {game.name}
                  </CardTitle>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getDifficultyColor(game.difficulty)}>
                      {game.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="h-4 w-4" />
                      <span>{game.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {game.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => handleGameStart(game.id)}
                    className="flex items-center gap-2"
                    variant={isCompleted ? "outline" : "default"}
                  >
                    <Play className="h-4 w-4" />
                    {isCompleted ? 'Play Again' : 'Start Game'}
                  </Button>
                  
                  {isCompleted && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {completedGames.size === 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <Gamepad2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Ready to Play?
              </h3>
              <p className="text-blue-700 text-sm">
                Choose a mini-game to start practicing your consulting skills in a fun, interactive way!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {completedGames.size > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Great Job!
              </h3>
              <p className="text-green-700 text-sm">
                You're building real consulting skills through practice. Keep it up!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MiniGamesTab;
