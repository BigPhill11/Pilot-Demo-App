/**
 * GamesHub - Central hub for all learning games
 * Shows 3 game options: Quizzes, Matching, Panda Jump
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Layers, 
  Gamepad2,
  Trophy,
  Flame,
  Star
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';

interface GameStats {
  quizHighScore: number;
  quizStreak: number;
  matchingBestTime: number;
  pandaJumpAltitude: number;
}

interface GamesHubProps {
  onSelectGame: (game: 'quizzes' | 'matching' | 'panda-jump') => void;
  stats: GameStats;
}

const GamesHub: React.FC<GamesHubProps> = ({ onSelectGame, stats }) => {
  const isMobile = useIsMobile();

  const games = [
    {
      id: 'quizzes' as const,
      title: 'Financial Quizzes',
      description: 'Test your knowledge across all finance topics',
      icon: <Brain className="h-10 w-10 text-blue-500" />,
      stats: [
        { label: 'Best Score', value: `${stats.quizHighScore}%`, icon: <Trophy className="h-3 w-3" /> },
        { label: 'Streak', value: `${stats.quizStreak}x`, icon: <Flame className="h-3 w-3 text-orange-500" /> }
      ],
      gradient: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'hover:border-blue-400'
    },
    {
      id: 'matching' as const,
      title: 'Term Matching',
      description: 'Match terms with definitions against the clock',
      icon: <Layers className="h-10 w-10 text-purple-500" />,
      stats: [
        { label: 'Best Time', value: stats.matchingBestTime > 0 ? `${stats.matchingBestTime}s` : '--', icon: <Star className="h-3 w-3" /> }
      ],
      gradient: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'hover:border-purple-400'
    },
    {
      id: 'panda-jump' as const,
      title: 'Panda Jump',
      description: 'Answer questions and climb the bamboo tower',
      icon: <div className="relative">
        <PandaLogo className="h-12 w-12 object-contain" />
      </div>,
      stats: [
        { label: 'Max Altitude', value: `${stats.pandaJumpAltitude}m`, icon: <Gamepad2 className="h-3 w-3" /> }
      ],
      gradient: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'hover:border-green-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose Your Game</h3>
        <p className="text-muted-foreground text-sm">Earn Bamboo Coins and XP while having fun!</p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        {games.map((game) => (
          <Card 
            key={game.id}
            className={`cursor-pointer transition-all duration-300 border-2 border-transparent ${game.borderColor} hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br ${game.gradient}`}
            onClick={() => onSelectGame(game.id)}
          >
            <CardContent className={`${isMobile ? 'p-4' : 'p-6'} flex flex-col items-center text-center`}>
              <div className="mb-4 p-3 rounded-full bg-background/80 shadow-sm">
                {game.icon}
              </div>
              
              <h4 className="font-bold text-lg mb-1">{game.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {game.stats.map((stat, idx) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    {stat.icon}
                    <span>{stat.label}: {stat.value}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reward Info */}
      <Card className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="font-semibold">🎋 Earn Bamboo Coins</span>
            <span className="text-muted-foreground">•</span>
            <span className="font-semibold">⭐ Gain XP</span>
            <span className="text-muted-foreground">•</span>
            <span className="font-semibold">🔥 Build Streaks</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamesHub;
