import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { MeterBar, SimulatorShell } from './simulator-shared';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

const QUARTERS = ['Q1', 'Q2', 'Q3'];

const DividendDripSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [q, setQ] = useState(0);
  const [mode, setMode] = useState<'cash' | 'drip'>('drip');
  const [shares, setShares] = useState(10);
  const [quarterlyIncome, setQuarterlyIncome] = useState(8);
  const [choices, setChoices] = useState<Array<'cash' | 'drip'>>([]);
  const [done, setDone] = useState(false);

  const payout = Math.round(quarterlyIncome * 1.05);

  const choose = (pick: 'cash' | 'drip') => {
    const nextChoices = [...choices, pick];
    setChoices(nextChoices);
    if (pick === 'drip') {
      setShares((s) => s + 1.2);
      setQuarterlyIncome((i) => i * 1.08);
    } else {
      setQuarterlyIncome((i) => i * 1.02);
    }
    if (q >= QUARTERS.length - 1) {
      setDone(true);
      return;
    }
    setQ((i) => i + 1);
  };

  return (
    <SimulatorShell
      simulator={simulator}
      onComplete={onComplete}
      footer={
        done ? (
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={onComplete}>
            Continue to Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      <MeterBar
        label="Shares owned"
        emoji="📜"
        value={Math.min(100, shares * 6)}
        colorClass="bg-violet-500"
      />
      <MeterBar
        label="Quarterly dividend power"
        emoji="💰"
        value={Math.min(100, quarterlyIncome * 4)}
        colorClass="bg-amber-500"
      />

      {!done && (
        <div className="space-y-3 mt-2">
          <p className="text-sm font-semibold text-gray-800">
            {QUARTERS[q]} dividend: ${payout} available
          </p>
          <p className="text-xs text-gray-500">
            Default strategy: {mode === 'drip' ? 'Auto-reinvest (DRIP)' : 'Cash out'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => choose('cash')}
              className="rounded-xl border-2 border-gray-200 p-3 text-sm font-medium hover:border-amber-400 bg-white"
            >
              Cash out
            </button>
            <button
              type="button"
              onClick={() => choose('drip')}
              className="rounded-xl border-2 border-emerald-300 p-3 text-sm font-medium bg-emerald-50 hover:border-emerald-500"
            >
              DRIP reinvest
            </button>
          </div>
        </div>
      )}

      {done && (
        <p className="text-sm text-gray-700 leading-relaxed">
          {choices.filter((c) => c === 'drip').length >= 2
            ? 'Reinvesting dividends bought more shares, which raised future payouts. That feedback loop is how owners compound without adding new cash.'
            : 'Cashing out felt good each quarter, but your ownership stake stayed flat. DRIP turns company profits into a growing claim on future profits.'}
        </p>
      )}
    </SimulatorShell>
  );
};

export default DividendDripSimulator;
