import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  SIGNAL_NOISE_ITEMS,
  SIGNAL_NOISE_MIN_CORRECT,
} from '@/data/career-readiness/interviewing';
import type { InterviewActivityProps } from './types';

const BUCKETS = [
  { id: 'use' as const, label: 'Use in interview', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 'nice' as const, label: 'Nice to know', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  { id: 'ignore' as const, label: 'Ignore for now', color: 'bg-muted text-muted-foreground border-border' },
];

const SignalNoiseActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const sorts = answers.signalNoiseSorts ?? {};
  const [activeItem, setActiveItem] = useState<string | null>(
    SIGNAL_NOISE_ITEMS.find((i) => !sorts[i.id])?.id ?? null
  );
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  const assign = (itemId: string, bucket: 'use' | 'nice' | 'ignore') => {
    const next = { ...sorts, [itemId]: bucket };
    onUpdateAnswers({ signalNoiseSorts: next });
    const item = SIGNAL_NOISE_ITEMS.find((i) => i.id === itemId);
    setShowFeedback(itemId);
    setTimeout(() => {
      setShowFeedback(null);
      const remaining = SIGNAL_NOISE_ITEMS.find((i) => !next[i.id]);
      setActiveItem(remaining?.id ?? null);
    }, 1200);
  };

  const correctCount = SIGNAL_NOISE_ITEMS.filter(
    (i) => sorts[i.id] === i.correctBucket
  ).length;
  const allSorted = SIGNAL_NOISE_ITEMS.every((i) => sorts[i.id]);
  const passed = correctCount >= SIGNAL_NOISE_MIN_CORRECT;

  const handleFinish = () => {
    if (passed) onComplete();
  };

  const active = SIGNAL_NOISE_ITEMS.find((i) => i.id === activeItem);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Drag your brain through each note: what helps you sound prepared vs. what is just noise?
      </p>

      <div className="flex flex-wrap gap-2">
        {BUCKETS.map((b) => (
          <Badge key={b.id} variant="outline" className={b.color}>
            {b.label}
          </Badge>
        ))}
      </div>

      {active && (
        <div className="p-4 rounded-xl border-2 border-emerald-200 bg-white shadow-sm">
          <p className="font-medium">{active.text}</p>
          <p className="text-xs text-muted-foreground mt-2">Where does this belong?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
            {BUCKETS.map((b) => (
              <Button
                key={b.id}
                variant="outline"
                className="h-auto py-3"
                onClick={() => assign(active.id, b.id)}
              >
                {b.label}
              </Button>
            ))}
          </div>
          {showFeedback === active.id && (
            <p className="text-sm mt-3 text-emerald-700">
              {sorts[active.id] === active.correctBucket ? '✓ ' : ''}
              {active.explanation}
            </p>
          )}
        </div>
      )}

      <div className="space-y-1">
        {SIGNAL_NOISE_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (sorts[item.id]) {
                const next = { ...sorts };
                delete next[item.id];
                onUpdateAnswers({ signalNoiseSorts: next });
                setActiveItem(item.id);
              }
            }}
            className={`w-full text-sm p-2 rounded-lg flex justify-between gap-2 text-left ${
              sorts[item.id]
                ? 'bg-muted/40 hover:bg-emerald-50 border border-transparent hover:border-emerald-200'
                : 'opacity-50'
            }`}
          >
            <span className="truncate">{item.text}</span>
            {sorts[item.id] && (
              <Badge variant="outline" className="shrink-0 text-xs">
                {sorts[item.id]} · tap to change
              </Badge>
            )}
          </button>
        ))}
      </div>

      <p className="text-sm text-center text-muted-foreground">
        {correctCount}/{SIGNAL_NOISE_ITEMS.length} sorted correctly
      </p>

      {allSorted && (
        <>
          <div
            className={`p-3 rounded-lg text-sm ${
              passed ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'
            }`}
          >
            {passed
              ? 'You can filter signal from noise—exactly what interviewers expect.'
              : `Get at least ${SIGNAL_NOISE_MIN_CORRECT} correct to continue. Review the feedback and retry.`}
          </div>
          <Button
            className="w-full bg-emerald-800 hover:bg-emerald-900"
            disabled={!passed}
            onClick={handleFinish}
          >
            {passed ? 'Save & mark simulation complete' : 'Review & adjust'}
          </Button>
        </>
      )}
    </div>
  );
};

export default SignalNoiseActivity;
