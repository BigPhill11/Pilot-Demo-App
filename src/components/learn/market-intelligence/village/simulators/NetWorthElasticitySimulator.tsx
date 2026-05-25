import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronRight } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { MeterBar, SimulatorShell } from './simulator-shared';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

const NetWorthElasticitySimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [investPct, setInvestPct] = useState(40);
  const [boughtLuxury, setBoughtLuxury] = useState(false);
  const [done, setDone] = useState(false);

  const spendPct = 100 - investPct;
  const assets = 30 + investPct * 0.5 + (boughtLuxury ? -25 : 0);
  const liabilities = 20 + spendPct * 0.35 + (boughtLuxury ? 35 : 0);
  const netWorth = Math.max(0, assets - liabilities);

  const handleLuxury = () => {
    setBoughtLuxury(true);
    setDone(true);
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
      <div className="space-y-4 rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-4">
        <p className="text-xs font-semibold text-amber-900">
          Split this month&apos;s $2,000 surplus
        </p>
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span>Invest / build assets</span>
            <span className="font-bold text-emerald-700">{investPct}%</span>
          </div>
          <Slider
            value={[investPct]}
            onValueChange={([v]) => setInvestPct(v)}
            min={0}
            max={100}
            step={5}
          />
          <p className="text-[10px] text-gray-500 mt-1">
            Lifestyle spending: {spendPct}%
          </p>
        </div>

        <MeterBar label="Assets" emoji="📈" value={assets} colorClass="bg-emerald-500" />
        <MeterBar label="Liabilities" emoji="📉" value={liabilities} colorClass="bg-red-500" />
        <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Net worth</p>
          <p className="text-2xl font-bold text-gray-900">${Math.round(netWorth * 100)}</p>
        </div>

        {!done && (
          <Button
            variant="outline"
            className="w-full border-amber-400 text-amber-900"
            onClick={handleLuxury}
          >
            Buy a $45k luxury car (financed)
          </Button>
        )}

        {done && (
          <p className="text-sm text-amber-900 leading-relaxed bg-white rounded-xl p-3 border border-amber-200">
            The car looked like wealth but added a fixed liability while the asset depreciates.
            High income with negative net worth is possible when consumption outruns ownership.
          </p>
        )}

        {!done && (
          <p className="text-[11px] text-gray-500">
            Tap the luxury purchase to see how one decision can crush real equity.
          </p>
        )}
      </div>
    </SimulatorShell>
  );
};

export default NetWorthElasticitySimulator;
