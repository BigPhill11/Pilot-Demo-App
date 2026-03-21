
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MiniGameConfig } from '@/data/investment-banking-lessons';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import GameCard from './games/components/GameCard';
import GameRenderer from './games/GameRenderer';

interface MiniGamesTabProps {
  filteredMiniGames: MiniGameConfig[];
  completedActivities: string[];
  onActivityComplete: (activityId: string) => void;
}

const MiniGamesTab: React.FC<MiniGamesTabProps> = ({ 
  filteredMiniGames, 
  completedActivities, 
  onActivityComplete 
}) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const { updateActivityComplete, awardPoints } = useProgressTracking();

  const handleGameComplete = (gameId: string, score?: number) => {
    console.log(`Game ${gameId} completed with score:`, score);
    const game = filteredMiniGames.find(g => g.id === gameId);
    const xpReward = game?.xpReward || 50;
    updateActivityComplete(gameId, xpReward);
    // Ensure XP bar updates even if activity already completed previously
    awardPoints(xpReward, 'Mini-game');
    onActivityComplete(gameId);
    setActiveGame(null);
  };

  const handleGameExit = () => {
    setActiveGame(null);
  };

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
  };

  // If a game is active, render the game component
  if (activeGame) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleGameExit} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>
        <GameRenderer
          gameId={activeGame}
          completedActivities={completedActivities}
          onComplete={handleGameComplete}
        />
      </div>
    );
  }

  // Default view - show game selection
  return (
    <div className="grid gap-6">
      {filteredMiniGames.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          isCompleted={completedActivities.includes(game.id)}
          onStartGame={startGame}
        />
      ))}
    </div>
  );
};

export default MiniGamesTab;
