import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity } from 'lucide-react';
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
      <h3 className="font-semibold flex items-center gap-2 text-lg">
        <Activity className="w-5 h-5 text-primary" />
        {simulator.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{simulator.intro}</p>
      <div className="bg-muted/30 rounded-xl p-4">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">The Scenario</span>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{simulator.scenario}</p>
      </div>
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
        <Button className="w-full" onClick={onComplete}>
          Continue to Quiz
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export function MeterBar({
  label,
  value,
  colorClass,
}: {
  label: string;
  /** Deprecated — emojis are no longer rendered in meters */
  emoji?: string;
  value: number;
  colorClass: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span>{label}</span>
        <span className="text-muted-foreground">{Math.round(v)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}
