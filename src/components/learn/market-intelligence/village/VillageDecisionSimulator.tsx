import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, Zap, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { DecisionSimulator, SimulatorChoice } from '@/types/village-lesson';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

type Phase = 'intro' | { roundIndex: number } | 'result';

const METER_FILL: Record<string, string> = {
  green: '[&>div]:bg-emerald-500',
  blue: '[&>div]:bg-blue-500',
  red: '[&>div]:bg-red-500',
  yellow: '[&>div]:bg-amber-500',
  orange: '[&>div]:bg-orange-500',
  purple: '[&>div]:bg-purple-500',
};

function clamp(v: number) { return Math.max(0, Math.min(100, v)); }

const VillageDecisionSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [meterValues, setMeterValues] = useState<Record<string, number>>(
    Object.fromEntries(simulator.meters.map(m => [m.id, m.initial]))
  );
  const [selectedChoice, setSelectedChoice] = useState<SimulatorChoice | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [lastDeltas, setLastDeltas] = useState<Record<string, number>>({});

  const roundIndex = typeof phase === 'object' ? phase.roundIndex : 0;
  const currentRound = typeof phase === 'object' ? simulator.rounds[roundIndex] : null;
  const isLastRound = roundIndex === simulator.rounds.length - 1;

  const handleConfirmChoice = () => {
    if (!selectedChoice) return;
    setLastDeltas(selectedChoice.effects);
    setMeterValues(prev => {
      const next = { ...prev };
      for (const [meterId, delta] of Object.entries(selectedChoice.effects)) {
        next[meterId] = clamp((next[meterId] ?? 50) + delta);
      }
      return next;
    });
    setShowOutcome(true);
  };

  const handleNextRound = () => {
    setSelectedChoice(null);
    setShowOutcome(false);
    setLastDeltas({});
    if (isLastRound) {
      setPhase('result');
    } else {
      setPhase({ roundIndex: roundIndex + 1 });
    }
  };

  /* ─── Meters (status cards, personal-finance simulator style) ─── */
  const meters = (
    <div className={cn('grid gap-3', simulator.meters.length >= 3 ? 'grid-cols-3' : 'grid-cols-2')}>
      {simulator.meters.map(m => {
        const value = meterValues[m.id] ?? m.initial;
        const delta = lastDeltas[m.id];
        return (
          <div key={m.id} className="bg-card border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium">{m.label}</span>
              {showOutcome && delta !== undefined && delta !== 0 && (
                <span className={cn(
                  'text-[10px] font-bold',
                  delta > 0 ? 'text-emerald-600' : 'text-red-600',
                )}>
                  {delta > 0 ? '+' : ''}{delta}
                </span>
              )}
            </div>
            <div className="text-xl font-bold">{Math.round(value)}%</div>
            <Progress
              value={value}
              className={cn('h-1.5 mt-2', METER_FILL[m.color] ?? '[&>div]:bg-primary')}
            />
          </div>
        );
      })}
    </div>
  );

  /* ─── Intro ─── */
  if (phase === 'intro') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h2 className="font-semibold flex items-center gap-2 text-lg">
            <Activity className="w-5 h-5 text-primary" />
            {simulator.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{simulator.intro}</p>
        </div>
        <div className="bg-muted/30 rounded-xl p-5">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">The Scenario</span>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{simulator.scenario}</p>
        </div>
        {meters}
        <Button onClick={() => setPhase({ roundIndex: 0 })} className="w-full">
          Start Simulation
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    );
  }

  /* ─── Result ─── */
  if (phase === 'result') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 text-center"
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto bg-emerald-500/20">
          <Trophy className="w-10 h-10 text-emerald-500" />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Simulation Complete</h2>
          <p className="text-muted-foreground text-sm">{simulator.title}</p>
        </div>

        {/* Final stats */}
        <div className={cn('grid gap-4', simulator.meters.length >= 3 ? 'grid-cols-3' : 'grid-cols-2')}>
          {simulator.meters.map(m => {
            const finalValue = meterValues[m.id] ?? m.initial;
            const change = finalValue - m.initial;
            return (
              <div key={m.id} className="bg-muted/30 rounded-lg p-4">
                <div className={cn(
                  'text-2xl font-bold',
                  change > 0 ? 'text-emerald-500' : change < 0 ? 'text-red-500' : 'text-foreground',
                )}>
                  {change > 0 ? '+' : ''}{change}
                </div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </div>
            );
          })}
        </div>

        {/* Key insight */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-left">
          <h4 className="font-medium mb-1 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Key Insight
          </h4>
          <p className="text-sm text-muted-foreground">{simulator.endMessage}</p>
        </div>

        <Button onClick={onComplete} className="w-full">
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    );
  }

  /* ─── Round ─── */
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {meters}

      {/* Current situation */}
      <div className="bg-muted/30 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Decision {roundIndex + 1} of {simulator.rounds.length}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{currentRound!.situation}</p>
      </div>

      {/* Choices */}
      <div className="space-y-2">
        {currentRound!.choices.map(choice => (
          <motion.button
            key={choice.id}
            onClick={() => { if (!showOutcome) setSelectedChoice(choice); }}
            disabled={showOutcome}
            whileHover={!showOutcome ? { scale: 1.01 } : {}}
            whileTap={!showOutcome ? { scale: 0.99 } : {}}
            className={cn(
              'w-full p-4 rounded-lg border-2 text-left transition-all',
              selectedChoice?.id === choice.id && !showOutcome && 'border-primary bg-primary/5',
              selectedChoice?.id !== choice.id && !showOutcome && 'border-border hover:border-primary/50',
              showOutcome && selectedChoice?.id === choice.id && 'border-primary bg-primary/10',
              showOutcome && selectedChoice?.id !== choice.id && 'opacity-40',
            )}
          >
            <span className="font-medium text-sm">{choice.label}</span>
            <p className="text-xs text-muted-foreground mt-0.5">{choice.description}</p>
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
            <p className="text-sm text-muted-foreground mb-3">{selectedChoice.feedback}</p>

            {/* Stat changes */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedChoice.effects).map(([meterId, delta]) => {
                const meter = simulator.meters.find(m => m.id === meterId);
                if (!meter || delta === 0) return null;
                return (
                  <span
                    key={meterId}
                    className={cn(
                      'text-xs px-2 py-1 rounded-full',
                      delta > 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600',
                    )}
                  >
                    {meter.label} {delta > 0 ? '+' : ''}{delta}
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action button */}
      <div>
        {!showOutcome ? (
          <Button onClick={handleConfirmChoice} disabled={!selectedChoice} className="w-full">
            Make This Choice
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleNextRound} className="w-full">
            {isLastRound ? 'See Results' : 'Next Decision'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default VillageDecisionSimulator;
