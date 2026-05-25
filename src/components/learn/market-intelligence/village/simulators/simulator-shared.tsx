import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';

export interface SimulatorShellProps {
  simulator: DecisionSimulator;
  onComplete: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function SimulatorIntro({ simulator }: { simulator: DecisionSimulator }) {
  return (
    <div className="space-y-3 mb-4">
      <h3 className="text-base font-bold text-gray-900">{simulator.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{simulator.intro}</p>
      <p className="text-xs text-gray-500 bg-gray-50 rounded-xl p-3 border border-gray-100">
        {simulator.scenario}
      </p>
    </div>
  );
}

export function SimulatorShell({
  simulator,
  onComplete,
  children,
  footer,
}: SimulatorShellProps) {
  return (
    <div className="space-y-4">
      <SimulatorIntro simulator={simulator} />
      {children}
      {footer ?? (
        <Button
          className="w-full bg-orange-600 hover:bg-orange-700"
          onClick={onComplete}
        >
          Continue to Quiz
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export function MeterBar({
  label,
  emoji,
  value,
  colorClass,
}: {
  label: string;
  emoji: string;
  value: number;
  colorClass: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium text-gray-700">
        <span>
          {emoji} {label}
        </span>
        <span>{Math.round(v)}%</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}
