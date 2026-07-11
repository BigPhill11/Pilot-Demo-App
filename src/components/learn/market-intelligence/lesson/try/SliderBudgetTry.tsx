import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SliderBudgetCategory, SliderBudgetScenario } from '@/types/mi-lesson';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface SliderBudgetTryProps {
  title: string;
  description: string;
  categories: SliderBudgetCategory[];
  scenarios: SliderBudgetScenario[];
  onComplete: () => void;
}

const SliderBudgetTry: React.FC<SliderBudgetTryProps> = ({
  title,
  description,
  categories,
  scenarios,
  onComplete,
}) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [allocation, setAllocation] = useState<Record<string, number>>(() => {
    const even = Math.floor(100 / categories.length);
    const init: Record<string, number> = {};
    categories.forEach((c, i) => {
      init[c.id] = i === categories.length - 1 ? 100 - even * (categories.length - 1) : even;
    });
    return init;
  });
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const scenario = scenarios[roundIndex];
  const total = Object.values(allocation).reduce((s, v) => s + v, 0);

  const updateAllocation = (catId: string, value: number) => {
    setAllocation(prev => {
      const remaining = 100 - value;
      const otherIds = categories.map(c => c.id).filter(id => id !== catId);
      const currentOtherTotal = otherIds.reduce((s, id) => s + (prev[id] ?? 0), 0);
      const next: Record<string, number> = { ...prev, [catId]: value };
      if (currentOtherTotal > 0) {
        otherIds.forEach(id => {
          next[id] = Math.round((prev[id] / currentOtherTotal) * remaining);
        });
      } else {
        const even = Math.floor(remaining / otherIds.length);
        otherIds.forEach((id, i) => {
          next[id] = i === otherIds.length - 1 ? remaining - even * (otherIds.length - 1) : even;
        });
      }
      return next;
    });
  };

  const getScore = () => {
    const optimal = scenario.optimalAllocation;
    const diffs = categories.map(c => Math.abs((allocation[c.id] ?? 0) - (optimal[c.id] ?? 0)));
    const avgDiff = diffs.reduce((s, v) => s + v, 0) / categories.length;
    if (avgDiff <= 10) return 'great';
    if (avgDiff <= 20) return 'good';
    return 'adjust';
  };

  const score = submitted ? getScore() : null;

  const handleNext = () => {
    if (roundIndex < scenarios.length - 1) {
      setRoundIndex(i => i + 1);
      setSubmitted(false);
      const even = Math.floor(100 / categories.length);
      const init: Record<string, number> = {};
      categories.forEach((c, i) => {
        init[c.id] = i === categories.length - 1 ? 100 - even * (categories.length - 1) : even;
      });
      setAllocation(init);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="space-y-4">
        <div className="text-center p-6 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="text-4xl mb-3"><ThemedEmoji emoji="🎯" className="h-[1em] w-[1em]" /></div>
          <h3 className="text-lg font-bold text-green-800 mb-1">Budget Practice Done</h3>
          <p className="text-sm text-green-700/80">
            Every allocation decision is a trade-off. The goal is always matching resources to strategy.
          </p>
        </div>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onComplete}>
          Continue <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-green-800 text-base">{title}</h3>
        <p className="text-sm text-green-700/70 mt-1">{description}</p>
      </div>

      <div className="text-xs text-green-600/60">Round {roundIndex + 1} of {scenarios.length}</div>

      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
        <p className="text-sm font-medium text-green-800">{scenario.prompt}</p>
      </div>

      <div className="space-y-4">
        {categories.map(cat => (
          <div key={cat.id}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-green-800">{cat.label}</span>
              <span className="text-sm font-bold text-emerald-700">{allocation[cat.id] ?? 0}%</span>
            </div>
            <p className="text-xs text-green-600/70 mb-2">{cat.description}</p>
            <Slider
              value={[allocation[cat.id] ?? 0]}
              min={0}
              max={100}
              step={5}
              disabled={submitted}
              onValueChange={([v]) => updateAllocation(cat.id, v)}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className={cn(
        'text-xs text-center font-medium',
        total === 100 ? 'text-emerald-600' : 'text-red-500'
      )}>
        Total: {total}/100 {total !== 100 && '— adjust sliders to reach 100'}
      </div>

      {!submitted ? (
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={total !== 100}
          onClick={() => setSubmitted(true)}
        >
          Submit Allocation
        </Button>
      ) : (
        <div className="space-y-3">
          <div className={cn(
            'p-3 rounded-lg flex items-start gap-2 text-sm',
            score === 'great' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
            score === 'good' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
            'bg-amber-50 text-amber-800 border border-amber-200'
          )}>
            {score === 'great' ? <Check className="h-4 w-4 shrink-0 mt-0.5" /> : <span className="shrink-0"><ThemedEmoji emoji="💡" className="h-[1em] w-[1em]" /></span>}
            <div>
              <p className="font-medium mb-1">
                {score === 'great' ? 'Great allocation.' : score === 'good' ? 'Close.' : 'Room to adjust.'}
              </p>
              <p>{scenario.feedback}</p>
            </div>
          </div>
          <div className="grid gap-1">
            {categories.map(cat => (
              <div key={cat.id} className="flex justify-between text-xs text-green-700/80">
                <span>{cat.label}</span>
                <span>
                  You: {allocation[cat.id]}% · Optimal: {scenario.optimalAllocation[cat.id] ?? 0}%
                </span>
              </div>
            ))}
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleNext}>
            {roundIndex < scenarios.length - 1 ? 'Next Scenario' : 'Finish'}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SliderBudgetTry;
