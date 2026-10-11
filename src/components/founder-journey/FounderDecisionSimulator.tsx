import React, { useState } from 'react';
import { ArrowRight, Gamepad2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { DecisionSimulator, SimulatorChoice } from '@/types/village-lesson';
import { cn } from '@/lib/utils';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

const meterColors: Record<string, string> = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

const clamp = (value: number) => Math.max(0, Math.min(100, value));

const FounderDecisionSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const initialMeters = Object.fromEntries(simulator.meters.map((meter) => [meter.id, meter.initial]));
  const [roundIndex, setRoundIndex] = useState(0);
  const [meters, setMeters] = useState<Record<string, number>>(initialMeters);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const round = simulator.rounds[roundIndex];

  const choose = (choice: SimulatorChoice) => {
    setMeters((current) => {
      const next = { ...current };
      Object.entries(choice.effects).forEach(([id, change]) => {
        next[id] = clamp((next[id] ?? 0) + change);
      });
      return next;
    });
    setFeedback(choice.feedback);
  };

  const advance = () => {
    if (roundIndex === simulator.rounds.length - 1) {
      setFinished(true);
    } else {
      setRoundIndex((index) => index + 1);
      setFeedback(null);
    }
  };

  const restart = () => {
    setRoundIndex(0);
    setMeters(initialMeters);
    setFeedback(null);
    setFinished(false);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-emerald-50 p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-2 text-primary">
          <Gamepad2 className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Founder Simulation</span>
        </div>
        <h2 className="text-xl font-bold sm:text-2xl">{simulator.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{simulator.intro}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {simulator.meters.map((meter) => (
          <div key={meter.id} className="rounded-2xl border bg-card p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{meter.emoji} {meter.label}</span>
              <span className="text-sm font-bold">{meters[meter.id]}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full rounded-full transition-all duration-500', meterColors[meter.color] ?? 'bg-primary')}
                style={{ width: `${meters[meter.id]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {!finished ? (
        <div className="rounded-2xl border bg-card p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Decision {roundIndex + 1} of {simulator.rounds.length}
            </p>
            <Progress value={((roundIndex + 1) / simulator.rounds.length) * 100} className="h-2 w-24" />
          </div>
          <h3 className="mb-4 text-lg font-semibold">{round.situation}</h3>

          {!feedback ? (
            <div className="space-y-3">
              {round.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => choose(choice)}
                  className="min-h-16 w-full rounded-2xl border-2 p-4 text-left transition hover:border-primary hover:bg-primary/5 active:scale-[0.99]"
                >
                  <span className="block font-semibold">{choice.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{choice.description}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">What happened</p>
                <p className="mt-1 text-sm leading-relaxed">{feedback}</p>
              </div>
              <Button onClick={advance} className="h-12 w-full text-base">
                {roundIndex === simulator.rounds.length - 1 ? 'See My Results' : 'Next Decision'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center sm:p-7">
          <div className="text-4xl">🌱</div>
          <h3 className="text-xl font-bold text-emerald-950">Simulation complete</h3>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-emerald-900">{simulator.endMessage}</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={restart} className="h-11 flex-1 bg-white">
              <RotateCcw className="mr-2 h-4 w-4" /> Try Different Choices
            </Button>
            <Button onClick={onComplete} className="h-11 flex-1">
              Knowledge Check <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FounderDecisionSimulator;
