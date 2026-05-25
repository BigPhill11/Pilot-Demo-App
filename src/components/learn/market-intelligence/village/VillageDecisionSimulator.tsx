import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap } from 'lucide-react';
import type { DecisionSimulator, OutcomeMeter } from '@/types/village-lesson';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

type Phase = 'intro' | { roundIndex: number } | 'result';

const METER_COLORS: Record<string, string> = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
};

const METER_TRACK: Record<string, string> = {
  green: 'bg-green-100',
  blue: 'bg-blue-100',
  red: 'bg-red-100',
  yellow: 'bg-yellow-100',
  orange: 'bg-orange-100',
  purple: 'bg-purple-100',
};

function clamp(v: number) { return Math.max(0, Math.min(100, v)); }

function MeterBar({ meter, value, delta }: { meter: OutcomeMeter; value: number; delta?: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-gray-700">
          {meter.emoji} {meter.label}
        </span>
        <div className="flex items-center gap-1">
          {delta !== undefined && delta !== 0 && (
            <span className={`text-[10px] font-bold ${delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {delta > 0 ? '+' : ''}{delta}
            </span>
          )}
          <span className="text-gray-500 text-[10px]">{Math.round(value)}%</span>
        </div>
      </div>
      <div className={`h-3 rounded-full overflow-hidden ${METER_TRACK[meter.color]}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${METER_COLORS[meter.color]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

const VillageDecisionSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [meterValues, setMeterValues] = useState<Record<string, number>>(
    Object.fromEntries(simulator.meters.map(m => [m.id, m.initial]))
  );
  const [lastDeltas, setLastDeltas] = useState<Record<string, number>>({});
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [choicesMade, setChoicesMade] = useState<string[]>([]);

  const handleChoice = (choiceId: string) => {
    const roundIndex = typeof phase === 'object' ? phase.roundIndex : 0;
    const round = simulator.rounds[roundIndex];
    const choice = round.choices.find(c => c.id === choiceId)!;

    const deltas = choice.effects;
    setLastDeltas(deltas);
    setLastFeedback(choice.feedback);
    setChoicesMade(prev => [...prev, choiceId]);
    setMeterValues(prev => {
      const next = { ...prev };
      for (const [meterId, delta] of Object.entries(deltas)) {
        next[meterId] = clamp((next[meterId] ?? 50) + delta);
      }
      return next;
    });
  };

  const advance = () => {
    if (lastFeedback) {
      const roundIndex = typeof phase === 'object' ? phase.roundIndex : 0;
      setLastFeedback(null);
      setLastDeltas({});
      if (roundIndex + 1 < simulator.rounds.length) {
        setPhase({ roundIndex: roundIndex + 1 });
      } else {
        setPhase('result');
      }
    } else if (phase === 'intro') {
      setPhase({ roundIndex: 0 });
    } else if (phase === 'result') {
      onComplete();
    }
  };

  const currentRound = typeof phase === 'object' ? simulator.rounds[phase.roundIndex] : null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-orange-100 rounded-lg">
          <Zap className="h-4 w-4 text-orange-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">{simulator.title}</h3>
          <p className="text-[11px] text-gray-500">Consequence Simulator</p>
        </div>
      </div>

      {/* Meters */}
      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2.5">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Outcome Meters</p>
        {simulator.meters.map(m => (
          <MeterBar
            key={m.id}
            meter={m}
            value={meterValues[m.id] ?? m.initial}
            delta={lastDeltas[m.id]}
          />
        ))}
      </div>

      {/* Content area */}
      {phase === 'intro' && (
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
            <p className="text-sm font-semibold text-orange-800 mb-2">{simulator.intro}</p>
            <p className="text-sm text-orange-700 leading-relaxed">{simulator.scenario}</p>
          </div>
          <Button onClick={advance} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
            Start Simulation
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {currentRound && !lastFeedback && (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold mb-1">
              Round {typeof phase === 'object' ? phase.roundIndex + 1 : 1} of {simulator.rounds.length}
            </p>
            <p className="text-sm text-blue-900 font-medium leading-relaxed">{currentRound.situation}</p>
          </div>
          <div className="space-y-2">
            {currentRound.choices.map(choice => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.id)}
                className="w-full text-left p-3 rounded-xl border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all group"
              >
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-orange-500 flex-shrink-0 mt-0.5 transition-colors" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{choice.label}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{choice.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {lastFeedback && (
        <div className="space-y-3">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300">
            <p className="text-xs font-bold text-emerald-600 mb-1.5">📊 Outcome</p>
            <p className="text-sm text-emerald-800 leading-relaxed">{lastFeedback}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(lastDeltas).map(([meterId, delta]) => {
              const meter = simulator.meters.find(m => m.id === meterId);
              if (!meter || delta === 0) return null;
              return (
                <span
                  key={meterId}
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    delta > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {meter.emoji} {meter.label}: {delta > 0 ? '+' : ''}{delta}
                </span>
              );
            })}
          </div>
          <Button onClick={advance} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
            {typeof phase === 'object' && phase.roundIndex + 1 < simulator.rounds.length
              ? 'Next Round'
              : 'See Final Results'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-300">
            <p className="text-xs font-bold text-green-600 mb-2">🎯 Simulation Complete</p>
            <p className="text-sm text-green-800 leading-relaxed">{simulator.endMessage}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {simulator.meters.map(m => {
              const finalValue = meterValues[m.id] ?? m.initial;
              const change = finalValue - m.initial;
              return (
                <div key={m.id} className="p-2 bg-white rounded-lg border border-gray-200 text-center">
                  <div className="text-lg">{m.emoji}</div>
                  <div className="text-xs font-medium text-gray-700">{m.label}</div>
                  <div className={`text-sm font-bold ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {change > 0 ? '+' : ''}{change} pts
                  </div>
                </div>
              );
            })}
          </div>
          <Button onClick={advance} className="w-full bg-green-600 hover:bg-green-700 text-white">
            Continue to Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VillageDecisionSimulator;
