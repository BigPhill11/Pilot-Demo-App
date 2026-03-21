/**
 * MatchingGameSection - Setup screen for the matching game
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Layers, 
  Timer,
  Trophy,
  Zap,
  Star
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import MatchingGame from './matching/MatchingGame';

type TimeBet = 30 | 60 | 90 | 120;
type Difficulty = 'beginner' | 'intermediate' | 'pro';

interface MatchingGameSectionProps {
  onBack: () => void;
}

const MatchingGameSection: React.FC<MatchingGameSectionProps> = ({ onBack }) => {
  const isMobile = useIsMobile();
  const [selectedTime, setSelectedTime] = useState<TimeBet>(60);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('beginner');
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestTimes, setBestTimes] = useState<Record<string, number>>({});
  const [totalGamesWon, setTotalGamesWon] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('matching_game_stats');
    if (saved) {
      const stats = JSON.parse(saved);
      setBestTimes(stats.bestTimes || {});
      setTotalGamesWon(stats.totalWon || 0);
    }
  }, []);

  const timeConfig: Record<TimeBet, { multiplier: number; risk: string; color: string }> = {
    30: { multiplier: 2.5, risk: 'Extreme', color: 'bg-red-500' },
    60: { multiplier: 2, risk: 'High', color: 'bg-orange-500' },
    90: { multiplier: 1.5, risk: 'Medium', color: 'bg-yellow-500' },
    120: { multiplier: 1, risk: 'Safe', color: 'bg-green-500' }
  };

  const difficultyConfig: Record<Difficulty, { pairs: number; label: string; icon: string }> = {
    beginner: { pairs: 6, label: 'Beginner', icon: '🌱' },
    intermediate: { pairs: 8, label: 'Intermediate', icon: '🌿' },
    pro: { pairs: 12, label: 'Pro', icon: '🎋' }
  };

  const getBestTimeKey = () => `${selectedDifficulty}_${selectedTime}`;

  const handleGameComplete = (won: boolean, timeRemaining: number, comboBonus: number) => {
    const stats = {
      bestTimes: { ...bestTimes },
      totalWon: totalGamesWon + (won ? 1 : 0)
    };
    
    if (won) {
      const key = getBestTimeKey();
      const completionTime = selectedTime - timeRemaining;
      if (!stats.bestTimes[key] || completionTime < stats.bestTimes[key]) {
        stats.bestTimes[key] = completionTime;
      }
    }
    
    setBestTimes(stats.bestTimes);
    setTotalGamesWon(stats.totalWon);
    localStorage.setItem('matching_game_stats', JSON.stringify(stats));
    
    setIsPlaying(false);
  };

  if (isPlaying) {
    return (
      <MatchingGame
        timeLimit={selectedTime}
        pairCount={difficultyConfig[selectedDifficulty].pairs}
        multiplier={timeConfig[selectedTime].multiplier}
        onComplete={handleGameComplete}
        onBack={() => setIsPlaying(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            Term Matching
          </h3>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Trophy className="h-3 w-3 text-yellow-500" />
          Won: {totalGamesWon}
        </Badge>
      </div>

      {/* Difficulty Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4" />
            Difficulty Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(difficultyConfig) as Difficulty[]).map((diff) => {
              const config = difficultyConfig[diff];
              return (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDifficulty(diff)}
                  className="flex-1"
                >
                  <span className="mr-1">{config.icon}</span>
                  {config.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {config.pairs} pairs
                  </Badge>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Betting */}
      <Card className="border-2 border-dashed">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Timer className="h-4 w-4" />
            Time Challenge
            <Badge variant="outline" className="ml-auto">Higher Risk = Higher Reward</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-3`}>
            {(Object.keys(timeConfig) as unknown as TimeBet[]).map((time) => {
              const numTime = Number(time) as TimeBet;
              const config = timeConfig[numTime];
              const isSelected = selectedTime === numTime;
              
              return (
                <Card
                  key={time}
                  className={`cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTime(numTime)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-3 h-3 rounded-full ${config.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold">{time}s</div>
                    <div className="text-xs text-muted-foreground">{config.risk}</div>
                    <Badge 
                      variant="secondary" 
                      className="mt-2 text-xs font-bold"
                    >
                      {config.multiplier}x Reward
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {bestTimes[getBestTimeKey()] && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Your best time: <span className="font-bold text-foreground">{bestTimes[getBestTimeKey()]}s</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reward Preview */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Potential Reward</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">
                +{Math.round(25 * timeConfig[selectedTime].multiplier)} 🎋
              </div>
              <div className="text-xs text-muted-foreground">
                Base 25 × {timeConfig[selectedTime].multiplier}x multiplier
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <Button 
        className="w-full h-14 text-lg"
        size="lg"
        onClick={() => setIsPlaying(true)}
      >
        <Layers className="h-5 w-5 mr-2" />
        Start Matching
        <Badge variant="secondary" className="ml-2">
          {difficultyConfig[selectedDifficulty].pairs} pairs • {selectedTime}s
        </Badge>
      </Button>
    </div>
  );
};

export default MatchingGameSection;
