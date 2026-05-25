import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { SimulatorShell } from './simulator-shared';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

const MarketPanicHoldSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [phase, setPhase] = useState<'alert' | 'choose' | 'outcome'>('alert');
  const [seconds, setSeconds] = useState(15);
  const [choice, setChoice] = useState<'panic' | 'hold' | 'buy' | null>(null);

  useEffect(() => {
    if (phase !== 'choose') return;
    if (seconds <= 0) {
      setChoice('panic');
      setPhase('outcome');
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, seconds]);

  const startPanic = () => {
    setPhase('choose');
    setSeconds(15);
  };

  const pick = (c: 'panic' | 'hold' | 'buy') => {
    setChoice(c);
    setPhase('outcome');
  };

  return (
    <SimulatorShell
      simulator={simulator}
      onComplete={onComplete}
      footer={
        phase === 'outcome' ? (
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={onComplete}>
            Continue to Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      {phase === 'alert' && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Your portfolio was $10,000. Markets are calm... for now.
          </p>
          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={startPanic}>
            Simulate market flash crash
          </Button>
        </div>
      )}

      {phase === 'choose' && (
        <div className="space-y-3 animate-pulse">
          <div className="rounded-xl border-2 border-red-500 bg-red-50 p-4 flex gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-800">
                Market crash! Your portfolio just dropped 15%!
              </p>
              <p className="text-xs text-red-700 mt-1">Decide in {seconds}s</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="destructive"
              className="w-full h-12"
              onClick={() => pick('panic')}
            >
              Panic sell and move to cash
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 border-emerald-500 text-emerald-800"
              onClick={() => pick('hold')}
            >
              Hold steady — do nothing
            </Button>
            <Button
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => pick('buy')}
            >
              Hold steady &amp; buy cheap stocks
            </Button>
          </div>
        </div>
      )}

      {phase === 'outcome' && choice && (
        <div className="space-y-3">
          {choice === 'panic' ? (
            <>
              <p className="text-2xl font-bold text-red-600 text-center">$8,500</p>
              <p className="text-sm text-gray-700">
                You panic-sold and locked in the loss. Next week&apos;s headline: &quot;Markets
                bounce back as investors stay calm.&quot; You missed the recovery because fear
                turned a screen drop into real money gone.
              </p>
            </>
          ) : choice === 'buy' ? (
            <>
              <p className="text-center text-2xl">🏅</p>
              <p className="text-sm font-bold text-emerald-800 text-center">
                Stoic Investor + Clearance Sale
              </p>
              <p className="text-2xl font-bold text-emerald-600 text-center">$11,400</p>
              <p className="text-sm text-gray-700">
                You treated the crash like a clearance sale and added to quality names at lower
                prices. When the market bounced, you captured the rebound plus a bonus for staying
                rational.
              </p>
            </>
          ) : (
            <>
              <p className="text-center text-2xl">🏅</p>
              <p className="text-sm font-bold text-emerald-800 text-center">
                Stoic Investor
              </p>
              <p className="text-2xl font-bold text-emerald-600 text-center">$10,800</p>
              <p className="text-sm text-gray-700">
                You endured the drop without selling. The market recovered and your ownership stake
                grew. Patience beat the brain trap that screams &quot;sell everything.&quot;
              </p>
            </>
          )}
        </div>
      )}
    </SimulatorShell>
  );
};

export default MarketPanicHoldSimulator;
