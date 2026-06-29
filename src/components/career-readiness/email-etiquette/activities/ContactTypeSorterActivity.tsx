import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Snowflake, Sun, Users, X } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import type { EmailActivityProps } from './types';

type Bucket = 'cold' | 'warm' | 'internal';

interface SortCard {
  id: string;
  text: string;
  correct: Bucket;
}

const CARDS: SortCard[] = [
  { id: 'c1', text: "A friend's older sibling who works at the firm you want to apply to. She offered to talk.", correct: 'warm' },
  { id: 'c2', text: 'Your team captain from a club, emailing about a fundraising deadline.', correct: 'internal' },
  { id: 'c3', text: 'A managing director you have never spoken to or been introduced to.', correct: 'cold' },
  { id: 'c4', text: 'An analyst whose article you read on LinkedIn. You commented once and they replied.', correct: 'warm' },
  { id: 'c5', text: 'A classmate in your same course about a group project.', correct: 'internal' },
  { id: 'c6', text: 'The CFO of a Fortune 500 you saw quoted in an article. No connection.', correct: 'cold' },
  { id: 'c7', text: 'A college admissions officer who chatted with you at an info session two weeks ago.', correct: 'warm' },
  { id: 'c8', text: 'An advisor you have never met whose name was on a list your teacher passed out.', correct: 'cold' },
];

const PASS_THRESHOLD = 6;

const BUCKETS: {
  key: Bucket;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  bucketClass: string;
  chipClass: string;
  buttonClass: string;
}[] = [
  {
    key: 'cold',
    label: 'Cold',
    icon: Snowflake,
    bucketClass: 'bg-slate-50 border-slate-200',
    chipClass: 'bg-white border-slate-300 text-slate-700',
    buttonClass: 'border-slate-300 hover:bg-slate-100 text-slate-800',
  },
  {
    key: 'warm',
    label: 'Warm',
    icon: Sun,
    bucketClass: 'bg-amber-50 border-emerald-200',
    chipClass: 'bg-white border-amber-300 text-amber-800',
    buttonClass: 'border-amber-300 hover:bg-amber-100 text-amber-900',
  },
  {
    key: 'internal',
    label: 'Internal',
    icon: Users,
    bucketClass: 'bg-indigo-50 border-indigo-200',
    chipClass: 'bg-white border-indigo-300 text-indigo-800',
    buttonClass: 'border-indigo-300 hover:bg-indigo-100 text-indigo-900',
  },
];

const ContactTypeSorterActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  allowEdit = true,
  isActivityComplete,
}) => {
  const sorts = (answers.contactTypeSorts ?? {}) as Record<string, Bucket>;
  const sortedCount = useMemo(() => CARDS.filter((c) => sorts[c.id]).length, [sorts]);
  const correctCount = useMemo(
    () => CARDS.filter((c) => sorts[c.id] === c.correct).length,
    [sorts]
  );
  const allSorted = sortedCount === CARDS.length;
  const passed = correctCount >= PASS_THRESHOLD;

  const unsortedCards = CARDS.filter((c) => !sorts[c.id]);
  const activeCard = unsortedCards[0];

  const assign = (cardId: string, bucket: Bucket) => {
    const next = { ...sorts, [cardId]: bucket };
    onUpdateAnswers({ contactTypeSorts: next });
  };

  const unassign = (cardId: string) => {
    if (!allowEdit && isActivityComplete) return;
    const next = { ...sorts };
    delete next[cardId];
    onUpdateAnswers({ contactTypeSorts: next });
  };

  const handleSave = () => {
    if (passed) {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      onComplete();
    }
  };

  const handleReset = () => {
    onUpdateAnswers({ contactTypeSorts: {} });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Tap a bucket to drop the active card into Cold, Warm, or Internal.
        </p>
        {isActivityComplete && (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-xs">
            Saved — edit any time
          </Badge>
        )}
      </div>

      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex gap-2">
          {CARDS.map((c) => {
            const placed = !!sorts[c.id];
            const isActive = activeCard?.id === c.id;
            return (
              <div
                key={c.id}
                className={`shrink-0 w-44 rounded-xl border-2 p-2 text-xs leading-snug transition-all ${
                  isActive
                    ? 'border-emerald-500 bg-white shadow-md scale-[1.02]'
                    : placed
                      ? 'border-dashed border-emerald-200 bg-muted/30 opacity-60'
                      : 'border-emerald-100 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">
                    {placed ? 'Sorted' : isActive ? 'Active' : 'Up next'}
                  </span>
                  {placed && (
                    <span className="text-[10px] font-semibold text-emerald-700 capitalize">
                      {sorts[c.id]}
                    </span>
                  )}
                </div>
                {c.text}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeCard ? (
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="rounded-xl bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
              <CardContent className="p-4">
                <p className="text-xs uppercase font-semibold text-emerald-700 mb-1">Sort this one</p>
                <p className="text-sm font-medium">{activeCard.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="done-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground py-2"
          >
            All cards sorted. Review the buckets below.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {BUCKETS.map((b) => {
          const Icon = b.icon;
          const inBucket = CARDS.filter((c) => sorts[c.id] === b.key);
          return (
            <div key={b.key} className={`rounded-xl border-2 ${b.bucketClass} p-3 min-h-[140px] flex flex-col`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{b.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">{inBucket.length}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={!activeCard}
                onClick={() => activeCard && assign(activeCard.id, b.key)}
                className={`mb-2 ${b.buttonClass}`}
              >
                Drop here
              </Button>
              <div className="flex flex-col gap-1.5">
                <AnimatePresence initial={false}>
                  {inBucket.map((c) => (
                    <motion.button
                      key={c.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      type="button"
                      onClick={() => unassign(c.id)}
                      className={`text-left text-[11px] leading-snug rounded-lg border px-2 py-1.5 flex items-start gap-1 ${b.chipClass} hover:bg-muted/40`}
                    >
                      <X className="w-3 h-3 mt-0.5 shrink-0 opacity-60" />
                      <span className="line-clamp-2">{c.text}</span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-center text-muted-foreground">
        {sortedCount} of {CARDS.length} sorted · {correctCount} correct
      </p>

      <AnimatePresence>
        {allSorted && passed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3"
          >
            <PandaLogo className="w-16 h-16" />
            <div>
              <p className="text-sm font-semibold text-emerald-900">
                Nice — you can tell at a glance now.
              </p>
              <p className="text-xs text-emerald-800 mt-0.5">
                {correctCount} of {CARDS.length} sorted correctly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {allSorted && !passed && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
          Get at least {PASS_THRESHOLD} right to lock this in. Tap a chip in a bucket to send it back to the queue.
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        {sortedCount > 0 && (
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            Reset all
          </Button>
        )}
        <Button
          className="flex-1 bg-emerald-800 hover:bg-emerald-900"
          disabled={!passed}
          onClick={handleSave}
        >
          {passed ? 'Save & continue' : `Need ${PASS_THRESHOLD - correctCount} more correct`}
        </Button>
      </div>
    </div>
  );
};

export default ContactTypeSorterActivity;
