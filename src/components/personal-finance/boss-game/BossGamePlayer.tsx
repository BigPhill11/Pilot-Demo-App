import { useState, useCallback } from 'react';
import { BossGameState, BossGameConfig, DecisionOption, GameMeters, MeterChange } from '@/types/boss-game';
import { GameMetersDisplay } from './GameMetersDisplay';
import { MonthDecisions } from './MonthDecisions';
import { GameEndingScreen } from './GameEndingScreen';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface BossGamePlayerProps {
  game: BossGameConfig;
  onComplete: (xpEarned: number, coinsEarned: number) => void;
  onBack: () => void;
  xpReward?: number;
  coinReward?: number;
}

const BossGamePlayer = ({ 
  game, 
  onComplete, 
  onBack, 
  xpReward = 150, 
  coinReward = 25 
}: BossGamePlayerProps) => {
  const playerName = "Panda";
  
  const [gameState, setGameState] = useState<BossGameState>({
    currentMonth: 1,
    meters: { ...game.initialMeters },
    decisions: {},
    unlocks: [],
    isComplete: false,
    playerName,
  });
  
  const [previousMeters, setPreviousMeters] = useState<GameMeters | undefined>();
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [showNarration, setShowNarration] = useState<'opening' | 'closing' | 'response' | null>('opening');
  const [lastResponse, setLastResponse] = useState('');
  
  const currentMonthData = game.months[gameState.currentMonth - 1];
  const currentDecision = currentMonthData?.decisions[currentDecisionIndex];
  
  const applyMeterChanges = useCallback((changes: MeterChange): GameMeters => {
    return {
      income: Math.max(0, Math.min(100, gameState.meters.income + (changes.income || 0))),
      hourlyValue: Math.max(0, Math.min(100, gameState.meters.hourlyValue + (changes.hourlyValue || 0))),
      energy: Math.max(0, Math.min(100, gameState.meters.energy + (changes.energy || 0))),
      replaceability: Math.max(0, Math.min(100, gameState.meters.replaceability + (changes.replaceability || 0))),
      optionality: Math.max(0, Math.min(100, gameState.meters.optionality + (changes.optionality || 0))),
    };
  }, [gameState.meters]);
  
  const handleDecisionSelect = (option: DecisionOption) => {
    setPreviousMeters({ ...gameState.meters });
    const newMeters = applyMeterChanges(option.meterChanges);
    const newUnlocks = [...gameState.unlocks, ...(option.unlocks || [])];
    
    setGameState(prev => ({
      ...prev,
      meters: newMeters,
      decisions: { ...prev.decisions, [currentDecision.id]: option.id },
      unlocks: newUnlocks,
    }));
    
    setLastResponse(option.storyResponse);
    setShowNarration('response');
  };
  
  const handleContinue = () => {
    if (showNarration === 'opening') {
      setShowNarration(null);
      return;
    }
    
    if (showNarration === 'response') {
      if (currentDecisionIndex < currentMonthData.decisions.length - 1) {
        setCurrentDecisionIndex(prev => prev + 1);
        setShowNarration(null);
      } else {
        setShowNarration('closing');
      }
      return;
    }
    
    if (showNarration === 'closing') {
      if (gameState.currentMonth < game.totalMonths) {
        setGameState(prev => ({ ...prev, currentMonth: prev.currentMonth + 1 }));
        setCurrentDecisionIndex(0);
        setShowNarration('opening');
        setPreviousMeters(undefined);
      } else {
        // Game complete - determine ending
        const ending = game.endings.find(e => e.conditions(gameState.meters, gameState.unlocks)) || game.endings[game.endings.length - 1];
        setGameState(prev => ({ ...prev, isComplete: true, ending }));
        onComplete(xpReward, coinReward);
      }
      return;
    }
  };
  
  const handleReplay = () => {
    setGameState({
      currentMonth: 1,
      meters: { ...game.initialMeters },
      decisions: {},
      unlocks: [],
      isComplete: false,
      playerName,
    });
    setCurrentDecisionIndex(0);
    setShowNarration('opening');
    setPreviousMeters(undefined);
  };
  
  if (gameState.isComplete && gameState.ending) {
    return (
      <GameEndingScreen
        ending={gameState.ending}
        meters={gameState.meters}
        onReplay={handleReplay}
        onExit={onBack}
        playerName={playerName}
      />
    );
  }

  // Determine the period label based on the game
  const getPeriodLabel = () => {
    if (game.id === 'the-wealth-builder') return 'Phase';
    if (game.id === 'the-career-architect') return 'Phase';
    return 'Year';
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="w-4 h-4" />
          Exit
        </Button>
        <div className="text-center">
          <h2 className="font-bold text-lg">{getPeriodLabel()} {gameState.currentMonth} of {game.totalMonths}</h2>
          <p className="text-xs text-muted-foreground">{currentMonthData?.title}</p>
        </div>
        <div className="w-16" />
      </div>
      
      {/* Meters */}
      <GameMetersDisplay meters={gameState.meters} previousMeters={previousMeters} />
      
      {/* Content area */}
      <AnimatePresence mode="wait">
        {showNarration === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="text-4xl text-center mb-4">🐼</div>
            <p className="text-sm leading-relaxed whitespace-pre-line text-center">
              {currentMonthData?.openingNarration}
            </p>
            <div className="flex justify-center mt-6">
              <Button onClick={handleContinue} className="gap-2">
                Begin {getPeriodLabel()} <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
        
        {showNarration === 'response' && (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="text-3xl text-center mb-3">🐼</div>
            <p className="text-sm leading-relaxed text-center italic">{lastResponse}</p>
            <div className="flex justify-center mt-6">
              <Button onClick={handleContinue} className="gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
        
        {showNarration === 'closing' && (
          <motion.div
            key="closing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="text-4xl text-center mb-4">🌙</div>
            <p className="text-sm leading-relaxed text-center italic">
              {currentMonthData?.closingNarration}
            </p>
            <div className="flex justify-center mt-6">
              <Button onClick={handleContinue} className="gap-2">
                {gameState.currentMonth < game.totalMonths ? `Next ${getPeriodLabel()}` : 'See Your Trajectory'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
        
        {!showNarration && currentDecision && (
          <MonthDecisions
            key={currentDecision.id}
            decision={currentDecision}
            meters={gameState.meters}
            unlocks={gameState.unlocks}
            onSelect={handleDecisionSelect}
            selectedOptionId={gameState.decisions[currentDecision.id]}
          />
        )}
      </AnimatePresence>
      
      {/* Progress dots */}
      {!showNarration && currentMonthData && (
        <div className="flex justify-center gap-2">
          {currentMonthData.decisions.map((d, i) => (
            <div
              key={d.id}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentDecisionIndex ? 'bg-primary' :
                i === currentDecisionIndex ? 'bg-primary/50' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BossGamePlayer;
