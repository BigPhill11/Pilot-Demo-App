import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, AlertTriangle, Zap, Clock, DollarSign, Battery } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SimulatorGameConfig, SimulatorState, SimulatorChoice } from '@/types/personal-finance';
import { cn } from '@/lib/utils';

interface TimeValueSimulatorProps {
  config: SimulatorGameConfig;
  onComplete: (won: boolean, xpEarned: number, coinsEarned: number) => void;
}

const TimeValueSimulator: React.FC<TimeValueSimulatorProps> = ({ config, onComplete }) => {
  const [gameState, setGameState] = useState<SimulatorState>({ ...config.initialState });
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<SimulatorChoice | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [decisions, setDecisions] = useState<string[]>([]);

  const currentScenario = config.scenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === config.scenarios.length - 1;

  // Calculate win condition
  const hasWon = gameState.weeklyIncome >= config.winCondition.minIncome && 
                 gameState.fatigue <= config.winCondition.maxFatigue;

  const handleChoiceSelect = (choice: SimulatorChoice) => {
    if (showOutcome) return;
    setSelectedChoice(choice);
  };

  const handleConfirmChoice = () => {
    if (!selectedChoice) return;

    // Apply outcome to game state
    const newState = {
      ...gameState,
      weeklyIncome: gameState.weeklyIncome + selectedChoice.outcome.incomeChange,
      fatigue: Math.min(100, Math.max(0, gameState.fatigue + selectedChoice.outcome.fatigueChange)),
      freeTime: Math.max(0, gameState.freeTime + selectedChoice.outcome.freeTimeChange),
      skillLevel: gameState.skillLevel + selectedChoice.outcome.skillChange,
    };

    // Apply skill bonus to hourly wage if skill increased
    if (selectedChoice.outcome.skillChange > 0) {
      newState.hourlyWage = gameState.hourlyWage + 2; // Each skill level adds $2/hr
    }

    setGameState(newState);
    setShowOutcome(true);
    setDecisions([...decisions, selectedChoice.label]);
  };

  const handleNextScenario = () => {
    if (isLastScenario) {
      setGameComplete(true);
    } else {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowOutcome(false);
    }
  };

  const handleComplete = () => {
    // Calculate rewards based on performance
    const baseXP = 50;
    const bonusXP = hasWon ? 25 : 0;
    const skillBonus = (gameState.skillLevel - config.initialState.skillLevel) * 10;
    const totalXP = baseXP + bonusXP + skillBonus;
    
    const baseCoins = 5;
    const bonusCoins = hasWon ? 3 : 0;
    const totalCoins = baseCoins + bonusCoins;

    onComplete(hasWon, totalXP, totalCoins);
  };

  const getMeterColor = (value: number, type: 'income' | 'fatigue' | 'freeTime') => {
    if (type === 'fatigue') {
      if (value > 70) return 'bg-red-500';
      if (value > 50) return 'bg-amber-500';
      return 'bg-emerald-500';
    }
    if (type === 'income') {
      if (value >= config.winCondition.minIncome) return 'bg-emerald-500';
      if (value >= config.winCondition.minIncome * 0.7) return 'bg-amber-500';
      return 'bg-red-500';
    }
    return 'bg-blue-500';
  };

  if (gameComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 text-center"
      >
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mx-auto",
          hasWon ? "bg-emerald-500/20" : "bg-amber-500/20"
        )}>
          {hasWon ? (
            <Trophy className="w-10 h-10 text-emerald-500" />
          ) : (
            <AlertTriangle className="w-10 h-10 text-amber-500" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">
            {hasWon ? 'You Win!' : 'Close, But Not Quite'}
          </h2>
          <p className="text-muted-foreground">
            {hasWon
              ? `You reached $${gameState.weeklyIncome}/week while keeping fatigue at ${gameState.fatigue}%!`
              : `Income: $${gameState.weeklyIncome}/week | Fatigue: ${gameState.fatigue}%`
            }
          </p>
        </div>

        {/* Final stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-500">${gameState.weeklyIncome}</div>
            <div className="text-sm text-muted-foreground">Weekly Income</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">${gameState.hourlyWage}/hr</div>
            <div className="text-sm text-muted-foreground">Hourly Rate</div>
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-left">
          <h4 className="font-medium mb-1 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Key Insight
          </h4>
          <p className="text-sm text-muted-foreground">
            {gameState.skillLevel > config.initialState.skillLevel
              ? "You invested in skills! Each skill point increased your hourly rate permanently—that compounds over time."
              : "Adding hours works, but skills create lasting value. Next time, try investing in skill upgrades."
            }
          </p>
        </div>

        <Button onClick={handleComplete} className="w-full">
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="font-semibold flex items-center gap-2 text-lg">
          <span className="text-xl">🎮</span>
          {config.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
      </div>

      {/* Status meters */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium">Income</span>
          </div>
          <div className="text-xl font-bold">${gameState.weeklyIncome}</div>
          <div className="text-xs text-muted-foreground">Goal: ${config.winCondition.minIncome}+</div>
          <Progress 
            value={(gameState.weeklyIncome / config.winCondition.minIncome) * 100} 
            className={cn("h-1.5 mt-2", `[&>div]:${getMeterColor(gameState.weeklyIncome, 'income')}`)}
          />
        </div>

        <div className="bg-card border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium">Fatigue</span>
          </div>
          <div className="text-xl font-bold">{gameState.fatigue}%</div>
          <div className="text-xs text-muted-foreground">Max: {config.winCondition.maxFatigue}%</div>
          <Progress 
            value={gameState.fatigue} 
            className={cn("h-1.5 mt-2", `[&>div]:${getMeterColor(gameState.fatigue, 'fatigue')}`)}
          />
        </div>

        <div className="bg-card border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium">Free Time</span>
          </div>
          <div className="text-xl font-bold">{gameState.freeTime}hrs</div>
          <div className="text-xs text-muted-foreground">Skill Lv: {gameState.skillLevel}</div>
          <Progress 
            value={(gameState.freeTime / 50) * 100} 
            className="h-1.5 mt-2 [&>div]:bg-blue-500"
          />
        </div>
      </div>

      {/* Current scenario */}
      <div className="bg-muted/30 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Decision {currentScenarioIndex + 1} of {config.scenarios.length}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{currentScenario.title}</h3>
        <p className="text-muted-foreground text-sm">{currentScenario.description}</p>
      </div>

      {/* Choices */}
      <div className="space-y-2">
        {currentScenario.choices.map((choice) => (
          <motion.button
            key={choice.id}
            onClick={() => handleChoiceSelect(choice)}
            disabled={showOutcome}
            whileHover={!showOutcome ? { scale: 1.01 } : {}}
            whileTap={!showOutcome ? { scale: 0.99 } : {}}
            className={cn(
              "w-full p-4 rounded-lg border-2 text-left transition-all",
              selectedChoice?.id === choice.id && !showOutcome && "border-primary bg-primary/5",
              selectedChoice?.id !== choice.id && !showOutcome && "border-border hover:border-primary/50",
              showOutcome && selectedChoice?.id === choice.id && "border-primary bg-primary/10",
              showOutcome && selectedChoice?.id !== choice.id && "opacity-40"
            )}
          >
            <span className="font-medium">{choice.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Outcome feedback */}
      <AnimatePresence>
        {showOutcome && selectedChoice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-card border rounded-lg p-4"
          >
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Outcome
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {selectedChoice.outcome.feedback}
            </p>
            
            {/* Stat changes */}
            <div className="flex flex-wrap gap-2">
              {selectedChoice.outcome.incomeChange !== 0 && (
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  selectedChoice.outcome.incomeChange > 0 
                    ? "bg-emerald-500/10 text-emerald-600" 
                    : "bg-red-500/10 text-red-600"
                )}>
                  {selectedChoice.outcome.incomeChange > 0 ? '+' : ''}${selectedChoice.outcome.incomeChange}
                </span>
              )}
              {selectedChoice.outcome.fatigueChange !== 0 && (
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  selectedChoice.outcome.fatigueChange > 0 
                    ? "bg-amber-500/10 text-amber-600" 
                    : "bg-emerald-500/10 text-emerald-600"
                )}>
                  Fatigue {selectedChoice.outcome.fatigueChange > 0 ? '+' : ''}{selectedChoice.outcome.fatigueChange}%
                </span>
              )}
              {selectedChoice.outcome.skillChange > 0 && (
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  +{selectedChoice.outcome.skillChange} Skill
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action button */}
      <div>
        {!showOutcome ? (
          <Button 
            onClick={handleConfirmChoice}
            disabled={!selectedChoice}
            className="w-full"
          >
            Make This Choice
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleNextScenario} className="w-full">
            {isLastScenario ? 'See Results' : 'Next Decision'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default TimeValueSimulator;
