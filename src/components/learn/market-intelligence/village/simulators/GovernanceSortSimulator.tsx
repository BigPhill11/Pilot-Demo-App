import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Check } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { SimulatorShell } from './simulator-shared';
import { cn } from '@/lib/utils';

type Bucket = 'shareholders' | 'board' | 'c_suite';

interface Scenario {
  id: string;
  card: string;
  correct: Bucket;
  hint: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    card: 'Vote on issuing new shares that dilute existing owners',
    correct: 'shareholders',
    hint: 'Shareholders vote on major equity changes.',
  },
  {
    id: 's2',
    card: 'Review CEO compensation and performance',
    correct: 'board',
    hint: 'The board oversees executive pay and accountability.',
  },
  {
    id: 's3',
    card: 'Approve quarterly product launch budget',
    correct: 'c_suite',
    hint: 'Day-to-day operations sit with executive leadership.',
  },
  {
    id: 's4',
    card: 'Elect directors at the annual meeting',
    correct: 'shareholders',
    hint: 'Owners elect the board that represents them.',
  },
];

const BUCKETS: { id: Bucket; label: string; emoji: string }[] = [
  { id: 'shareholders', label: 'Shareholders', emoji: '🗳️' },
  { id: 'board', label: 'Board of Directors', emoji: '🏛️' },
  { id: 'c_suite', label: 'C-Suite / Management', emoji: '👔' },
];

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

const GovernanceSortSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Bucket | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = SCENARIOS[index];

  const assign = (bucket: Bucket) => {
    if (picked) return;
    setPicked(bucket);
    const ok = bucket === scenario.correct;
    if (ok) setScore((s) => s + 1);
    setFeedback(ok ? `Correct. ${scenario.hint}` : `Not quite. ${scenario.hint}`);
  };

  const next = () => {
    if (index >= SCENARIOS.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setFeedback(null);
  };

  return (
    <SimulatorShell
      simulator={simulator}
      onComplete={onComplete}
      footer={
        finished ? (
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={onComplete}>
            Continue to Quiz ({score}/{SCENARIOS.length} routed correctly)
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      {!finished ? (
        <div className="space-y-4">
          <p className="text-xs text-gray-500">
            Scenario {index + 1} of {SCENARIOS.length}
          </p>
          <div className="rounded-xl border-2 border-violet-200 bg-violet-50 p-4">
            <p className="text-sm font-semibold text-violet-900">{scenario.card}</p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {BUCKETS.map((b) => (
              <button
                key={b.id}
                type="button"
                disabled={!!picked}
                onClick={() => assign(b.id)}
                className={cn(
                  'flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition-all',
                  picked === b.id
                    ? b.id === scenario.correct
                      ? 'border-green-400 bg-green-50 text-green-900'
                      : 'border-red-300 bg-red-50 text-red-900'
                    : 'border-gray-200 bg-white hover:border-violet-300'
                )}
              >
                <span>{b.emoji}</span>
                {b.label}
                {picked === b.id && b.id === scenario.correct && (
                  <Check className="h-4 w-4 ml-auto text-green-600" />
                )}
              </button>
            ))}
          </div>
          {feedback && (
            <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 border">{feedback}</p>
          )}
          {picked && (
            <Button className="w-full" onClick={next}>
              {index < SCENARIOS.length - 1 ? 'Next scenario' : 'See results'}
            </Button>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-700 leading-relaxed">
          Ownership flows down: shareholders elect the board, the board hires and monitors
          executives, and management runs daily operations. Mixing these layers causes
          principal-agent conflicts.
        </p>
      )}
    </SimulatorShell>
  );
};

export default GovernanceSortSimulator;
