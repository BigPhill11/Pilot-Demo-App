import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronRight } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { SimulatorShell } from './simulator-shared';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

function futureValue(monthly: number, annualRate: number, years: number): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}

const CompoundGrowthSlidersSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [startAge, setStartAge] = useState(18);
  const [monthly, setMonthly] = useState(100);
  const retireAge = 65;
  const rate = 0.07;

  const years = Math.max(1, retireAge - startAge);
  const terminal = useMemo(
    () => Math.round(futureValue(monthly, rate, years)),
    [monthly, years]
  );

  const lateStartTerminal = useMemo(
    () => Math.round(futureValue(300, rate, retireAge - 30)),
    []
  );

  const maxBar = Math.max(terminal, lateStartTerminal, 1);
  const heightPct = (terminal / maxBar) * 100;
  const latePct = (lateStartTerminal / maxBar) * 100;

  return (
    <SimulatorShell simulator={simulator} onComplete={onComplete}>
      <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span>Age you start investing</span>
            <span className="font-bold">{startAge}</span>
          </div>
          <Slider
            value={[startAge]}
            onValueChange={([v]) => setStartAge(v)}
            min={14}
            max={45}
            step={1}
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span>Monthly bamboo coin savings</span>
            <span className="font-bold">${monthly}</span>
          </div>
          <Slider
            value={[monthly]}
            onValueChange={([v]) => setMonthly(v)}
            min={25}
            max={500}
            step={25}
          />
        </div>

        <div className="flex items-end gap-6 justify-center h-36 pt-2">
          <div className="flex flex-col items-center flex-1">
            <div
              className="w-full max-w-[80px] bg-emerald-500 rounded-t-lg transition-all duration-500"
              style={{ height: `${heightPct}%`, minHeight: 12 }}
            />
            <p className="text-[10px] mt-2 text-center font-medium">Your plan</p>
            <p className="text-sm font-bold text-emerald-800">
              ${terminal.toLocaleString()}
            </p>
            <p className="text-[9px] text-gray-500">by age {retireAge}</p>
          </div>
          <div className="flex flex-col items-center flex-1 opacity-70">
            <div
              className="w-full max-w-[80px] bg-gray-400 rounded-t-lg"
              style={{ height: `${latePct}%`, minHeight: 12 }}
            />
            <p className="text-[10px] mt-2 text-center">Start at 30, $300/mo</p>
            <p className="text-sm font-bold text-gray-700">
              ${lateStartTerminal.toLocaleString()}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Time is the multiplier. Starting in your teens with modest monthly amounts often
          beats starting later with much larger contributions.
        </p>
      </div>

    </SimulatorShell>
  );
};

export default CompoundGrowthSlidersSimulator;
