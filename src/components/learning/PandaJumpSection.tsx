/**
 * PandaJumpSection - Setup screen for Panda Jump game
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Mountain,
  Heart,
  Shield,
  Rocket,
  Zap,
  Trophy
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';
import PandaJumpGame from './games/PandaJumpGame';

type QuestionType = 'definitions' | 'scenarios' | 'truefalse' | 'mixed';

interface PandaJumpSectionProps {
  onBack: () => void;
}

interface PowerUpInventory {
  shield: number;
  doubleJump: number;
  bambooBoost: number;
}

const PandaJumpSection: React.FC<PandaJumpSectionProps> = ({ onBack }) => {
  const isMobile = useIsMobile();
  const [selectedType, setSelectedType] = useState<QuestionType>('mixed');
  const [isPlaying, setIsPlaying] = useState(false);
  const [maxAltitude, setMaxAltitude] = useState(0);
  const [powerUps, setPowerUps] = useState<PowerUpInventory>({ shield: 0, doubleJump: 0, bambooBoost: 0 });
  const [totalClimbs, setTotalClimbs] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('panda_jump_stats');
    if (saved) {
      const stats = JSON.parse(saved);
      setMaxAltitude(stats.maxAltitude || 0);
      setPowerUps(stats.powerUps || { shield: 0, doubleJump: 0, bambooBoost: 0 });
      setTotalClimbs(stats.totalClimbs || 0);
    }
  }, []);

  const questionTypes: { id: QuestionType; label: string; icon: string; description: string }[] = [
    { id: 'definitions', label: 'Definitions', icon: '📚', description: 'What is compound interest?' },
    { id: 'scenarios', label: 'Scenarios', icon: '🎭', description: 'You got a bonus - invest or pay debt?' },
    { id: 'truefalse', label: 'True/False', icon: '✓✗', description: 'Quick rapid-fire decisions' },
    { id: 'mixed', label: 'Mixed', icon: '🎲', description: 'Random mix of all types' }
  ];

  const handleGameComplete = (altitude: number, newPowerUps: PowerUpInventory) => {
    const stats = {
      maxAltitude: Math.max(maxAltitude, altitude),
      powerUps: {
        shield: powerUps.shield + newPowerUps.shield,
        doubleJump: powerUps.doubleJump + newPowerUps.doubleJump,
        bambooBoost: powerUps.bambooBoost + newPowerUps.bambooBoost
      },
      totalClimbs: totalClimbs + 1
    };
    
    setMaxAltitude(stats.maxAltitude);
    setPowerUps(stats.powerUps);
    setTotalClimbs(stats.totalClimbs);
    localStorage.setItem('panda_jump_stats', JSON.stringify(stats));
    
    setIsPlaying(false);
  };

  if (isPlaying) {
    return (
      <PandaJumpGame
        questionType={selectedType}
        onComplete={handleGameComplete}
        onBack={() => setIsPlaying(false)}
        initialPowerUps={powerUps}
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
            <PandaLogo className="h-6 w-6" />
            Panda Jump
          </h3>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Mountain className="h-3 w-3" />
          Max: {maxAltitude}m
        </Badge>
      </div>

      {/* Game Preview */}
      <Card className="bg-gradient-to-b from-green-500/10 to-emerald-500/20 overflow-hidden">
        <CardContent className="p-6 text-center">
          <div className="relative">
            <PandaLogo className="h-24 w-24 mx-auto animate-bounce" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-4 h-16 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full" />
                ))}
              </div>
            </div>
          </div>
          <h4 className="text-lg font-bold mt-6">Climb the Bamboo Tower!</h4>
          <p className="text-sm text-muted-foreground">
            Answer questions correctly to jump higher. Don't lose all your hearts!
          </p>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <Trophy className="h-5 w-5 mx-auto text-yellow-500 mb-1" />
            <div className="text-lg font-bold">{maxAltitude}m</div>
            <div className="text-xs text-muted-foreground">Best Height</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Heart className="h-5 w-5 mx-auto text-red-500 mb-1" />
            <div className="text-lg font-bold">3</div>
            <div className="text-xs text-muted-foreground">Lives</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Zap className="h-5 w-5 mx-auto text-purple-500 mb-1" />
            <div className="text-lg font-bold">{totalClimbs}</div>
            <div className="text-xs text-muted-foreground">Climbs</div>
          </CardContent>
        </Card>
      </div>

      {/* Power-ups Inventory */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Power-Up Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-500/10">
              <Shield className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-sm font-semibold">{powerUps.shield}</div>
                <div className="text-xs text-muted-foreground">Shield</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10">
              <Zap className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm font-semibold">{powerUps.doubleJump}</div>
                <div className="text-xs text-muted-foreground">Skip</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10">
              <Rocket className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm font-semibold">{powerUps.bambooBoost}</div>
                <div className="text-xs text-muted-foreground">Boost</div>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Earn power-ups by answering correctly!
          </p>
        </CardContent>
      </Card>

      {/* Question Type Selection */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Question Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-2`}>
            {questionTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type.id)}
                className="flex flex-col h-auto py-3"
              >
                <span className="text-lg mb-1">{type.icon}</span>
                <span className="text-xs">{type.label}</span>
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {questionTypes.find(t => t.id === selectedType)?.description}
          </p>
        </CardContent>
      </Card>

      {/* Start Button */}
      <Button 
        className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        size="lg"
        onClick={() => setIsPlaying(true)}
      >
        <PandaLogo className="h-6 w-6 mr-2" />
        Start Climbing
        <Badge variant="secondary" className="ml-2">
          +1🎋 per 10m
        </Badge>
      </Button>
    </div>
  );
};

export default PandaJumpSection;
