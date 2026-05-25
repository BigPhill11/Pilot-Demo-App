import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, CheckCircle2 } from 'lucide-react';
import type { MILessonTryActivity } from '@/types/mi-lesson';

interface CompoundCompareTryProps {
  activity: MILessonTryActivity;
  onComplete: () => void;
}

function futureValueMonthly(
  monthlyPayment: number,
  annualRate: number,
  years: number
): number {
  if (years <= 0) return 0;
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return monthlyPayment * n;
  return monthlyPayment * ((Math.pow(1 + r, n) - 1) / r);
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${Math.round(value).toLocaleString()}`;
}

const CompoundCompareTry: React.FC<CompoundCompareTryProps> = ({ activity, onComplete }) => {
  const rate = activity.annualReturnRate ?? 0.07;
  const retirementAge = activity.retirementAge ?? 65;
  const compareStartAge = 28;

  const [startAge, setStartAge] = useState(activity.defaultStartAge ?? 22);
  const [monthly, setMonthly] = useState(activity.defaultMonthly ?? 100);
  const [interactionCount, setInteractionCount] = useState(0);

  const userYears = Math.max(0, retirementAge - startAge);
  const compareYears = Math.max(0, retirementAge - compareStartAge);

  const userTotal = useMemo(
    () => futureValueMonthly(monthly, rate, userYears),
    [monthly, rate, userYears]
  );
  const compareTotal = useMemo(
    () => futureValueMonthly(monthly, rate, compareYears),
    [monthly, rate, compareYears]
  );

  const maxBar = Math.max(userTotal, compareTotal, 1);
  const canContinue = interactionCount >= 2;

  const bumpInteraction = () => setInteractionCount((c) => c + 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-800">
        <Gamepad2 className="h-5 w-5" />
        <h3 className="font-bold">{activity.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{activity.description}</p>

      <div className="space-y-4 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
        <div>
          <label className="text-sm font-medium text-emerald-900 flex justify-between">
            <span>Your start age</span>
            <span className="font-bold">{startAge}</span>
          </label>
          <input
            type="range"
            min={18}
            max={35}
            value={startAge}
            onChange={(e) => {
              setStartAge(Number(e.target.value));
              bumpInteraction();
            }}
            className="w-full mt-2 accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-emerald-700/70 mt-1">
            <span>18</span>
            <span>35</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-emerald-900 flex justify-between">
            <span>Monthly investment</span>
            <span className="font-bold">${monthly}</span>
          </label>
          <input
            type="range"
            min={50}
            max={200}
            step={25}
            value={monthly}
            onChange={(e) => {
              setMonthly(Number(e.target.value));
              bumpInteraction();
            }}
            className="w-full mt-2 accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-emerald-700/70 mt-1">
            <span>$50</span>
            <span>$200</span>
          </div>
        </div>

        <p className="text-xs text-emerald-700/80">
          Assumed average return: {(rate * 100).toFixed(0)}% per year (illustration only — not a guarantee).
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-emerald-900">You (start at {startAge})</span>
            <span className="font-bold text-emerald-700">{formatCurrency(userTotal)}</span>
          </div>
          <div className="h-8 rounded-lg bg-emerald-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg transition-all duration-300"
              style={{ width: `${(userTotal / maxBar) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{userYears} years of contributions to age {retirementAge}</p>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">Friend (starts at {compareStartAge})</span>
            <span className="font-bold text-gray-600">{formatCurrency(compareTotal)}</span>
          </div>
          <div className="h-8 rounded-lg bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg transition-all duration-300"
              style={{ width: `${(compareTotal / maxBar) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{compareYears} years of contributions — same ${monthly}/month</p>
        </div>
      </div>

      {userTotal > compareTotal && (
        <p className="text-sm text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
          Starting {compareStartAge - startAge} years earlier could mean{' '}
          <strong>{formatCurrency(userTotal - compareTotal)}</strong> more at retirement — even with the same monthly amount.
        </p>
      )}

      {!canContinue && (
        <p className="text-xs text-center text-emerald-600">
          Adjust the sliders at least twice to explore different scenarios ({interactionCount}/2)
        </p>
      )}

      {canContinue && (
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">You explored the time advantage</span>
          </div>
          <Button onClick={onComplete} className="w-full bg-emerald-600 hover:bg-emerald-700">
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompoundCompareTry;
