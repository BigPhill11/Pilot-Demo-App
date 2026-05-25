import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { SimulatorShell } from './simulator-shared';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

function projectWealth(
  principal: number,
  annualReturn: number,
  annualFee: number,
  years: number
): number {
  let balance = principal;
  for (let y = 0; y < years; y++) {
    balance = balance * (1 + annualReturn - annualFee);
  }
  return Math.round(balance);
}

const IndexFundAllocatorSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [choice, setChoice] = useState<'active' | 'index' | null>(null);
  const [animated, setAnimated] = useState(false);

  const principal = 1000;
  const years = 10;
  const marketReturn = 0.08;

  const results = useMemo(
    () => ({
      active: projectWealth(principal, marketReturn - 0.02, 0.02, years),
      index: projectWealth(principal, marketReturn, 0.0005, years),
    }),
    []
  );

  const pick = (c: 'active' | 'index') => {
    setChoice(c);
    setTimeout(() => setAnimated(true), 100);
  };

  const final = choice ? results[choice] : 0;
  const alt = choice === 'active' ? results.index : results.active;
  const diff = choice ? alt - final : 0;

  return (
    <SimulatorShell
      simulator={simulator}
      onComplete={onComplete}
      footer={
        choice && animated ? (
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={onComplete}>
            Continue to Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      <p className="text-sm font-medium text-gray-800">
        Allocate {principal.toLocaleString()} bamboo coins for {years} years
      </p>

      {!choice && (
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() => pick('active')}
            className="rounded-xl border-2 border-gray-200 p-4 text-left hover:border-amber-400 bg-white"
          >
            <p className="font-bold text-gray-900">Alpha Active Fund</p>
            <p className="text-xs text-gray-500 mt-1">2% annual fee · manager picks stocks</p>
          </button>
          <button
            type="button"
            onClick={() => pick('index')}
            className="rounded-xl border-2 border-gray-200 p-4 text-left hover:border-emerald-400 bg-white"
          >
            <p className="font-bold text-gray-900">Bamboo Market Index</p>
            <p className="text-xs text-gray-500 mt-1">0.05% fee · tracks the whole market</p>
          </button>
        </div>
      )}

      {choice && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">Fast-forward {years} years...</p>
          <div className="h-32 flex items-end gap-4 justify-center">
            {(['active', 'index'] as const).map((key) => {
              const val = results[key];
              const h = animated ? Math.max(12, (val / results.index) * 120) : 8;
              return (
                <div key={key} className="flex flex-col items-center w-24">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-1000 ${
                      key === 'index' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ height: h }}
                  />
                  <p className="text-[10px] mt-1 font-medium capitalize">{key}</p>
                  <p className="text-xs font-bold">${val}</p>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 border">
            {choice === 'active'
              ? `Your active fund ended at $${final}. The index fund reached $${results.index}. Fees and underperformance cost you about $${Math.abs(diff)} over ${years} years.`
              : `Smart pick. Low fees kept more of the market return in your pocket: $${final} vs $${results.active} in the active fund.`}
          </p>
        </div>
      )}
    </SimulatorShell>
  );
};

export default IndexFundAllocatorSimulator;
