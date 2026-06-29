import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, AlertCircle, Snowflake, Sun, Users } from 'lucide-react';
import type { EmailActivityProps } from './types';

type Bucket = 'cold' | 'warm' | 'internal';

interface Scenario {
  id: string;
  text: string;
  correct: Bucket;
  why: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    text: 'A senior analyst at JP Morgan whose name you got from a friend at the firm. You have never spoken to her.',
    correct: 'warm',
    why: 'A mutual contact bridges you — she is warm even if you have not met directly.',
  },
  {
    id: 's2',
    text: 'Your classmate in your finance club, who you are emailing about an upcoming meeting.',
    correct: 'internal',
    why: 'Same organization, same context — no need to explain who you are.',
  },
  {
    id: 's3',
    text: 'A VP at a bank you found on LinkedIn while researching the firm. You have never interacted.',
    correct: 'cold',
    why: 'No relationship and no shared context yet.',
  },
  {
    id: 's4',
    text: "A recruiter you spoke with at last week's career fair who handed you her card.",
    correct: 'warm',
    why: 'You have a real prior interaction to anchor the email in.',
  },
  {
    id: 's5',
    text: 'Your team lead in a school capstone project who you are emailing about a deadline.',
    correct: 'internal',
    why: 'Same team, working relationship already exists.',
  },
  {
    id: 's6',
    text: "An alum from your high school you found in the school's networking directory. No prior interaction.",
    correct: 'cold',
    why: 'Shared school is a tiny warm signal, but the relationship has not started — write it like a cold email with a school reference.',
  },
];

const PASS_THRESHOLD = 5;

const OPTIONS: { key: Bucket; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { key: 'cold', label: 'Cold', icon: Snowflake, color: 'border-slate-300 hover:bg-slate-50' },
  { key: 'warm', label: 'Warm', icon: Sun, color: 'border-amber-300 hover:bg-amber-50' },
  { key: 'internal', label: 'Internal', icon: Users, color: 'border-emerald-300 hover:bg-emerald-50' },
];

const RecipientIdActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  allowEdit = true,
  isActivityComplete,
}) => {
  const results = (answers.recipientIdResults ?? {}) as Record<string, Bucket>;
  const firstUnsorted = SCENARIOS.findIndex((s) => !results[s.id]);
  const [index, setIndex] = useState<number>(firstUnsorted === -1 ? SCENARIOS.length - 1 : firstUnsorted);

  const scenario = SCENARIOS[index];
  const chosen = scenario ? (results[scenario.id] as Bucket | undefined) : undefined;
  const isCorrect = chosen ? chosen === scenario.correct : false;

  const allSorted = SCENARIOS.every((s) => results[s.id]);
  const correctCount = useMemo(
    () => SCENARIOS.filter((s) => results[s.id] === s.correct).length,
    [results]
  );
  const passed = correctCount >= PASS_THRESHOLD;

  const choose = (bucket: Bucket) => {
    onUpdateAnswers({
      recipientIdResults: { ...results, [scenario.id]: bucket },
    });
  };

  const goNext = () => {
    if (index < SCENARIOS.length - 1) setIndex(index + 1);
  };

  const goBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleSave = () => {
    if (passed) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
      onComplete();
    }
  };

  const handleReset = () => {
    onUpdateAnswers({ recipientIdResults: {} });
    setIndex(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Scenario {index + 1} of {SCENARIOS.length} — is this contact cold, warm, or internal?
        </p>
        {isActivityComplete && (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-xs">
            Saved — edit any time
          </Badge>
        )}
      </div>

      <div className="flex justify-center gap-1.5">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to scenario ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? 'w-6 bg-emerald-800'
                : results[s.id]
                  ? 'w-2 bg-emerald-300'
                  : 'w-2 bg-muted'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <Card className="rounded-xl bg-gradient-to-br from-emerald-50 to-white border-emerald-100 shadow-sm">
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-wide text-emerald-700 font-semibold">
                Who is this person?
              </p>
              <p className="text-base font-medium mt-2 leading-snug">{scenario.text}</p>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-2">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const active = chosen === opt.key;
          return (
            <motion.button
              key={opt.key}
              whileTap={{ scale: 0.95 }}
              type="button"
              disabled={!!chosen && !allowEdit}
              onClick={() => choose(opt.key)}
              className={`rounded-xl border-2 p-3 flex flex-col items-center gap-1 transition-colors ${opt.color} ${
                active
                  ? opt.key === scenario.correct
                    ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-300'
                    : 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
                  : 'bg-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-semibold">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {chosen && (
          <motion.div
            key={`${scenario.id}-fb`}
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className={`rounded-xl p-3 text-sm flex gap-2 ${
                isCorrect
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              {isCorrect ? (
                <Check className="w-5 h-5 shrink-0 text-emerald-700 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-700 mt-0.5" />
              )}
              <div>
                <p className="font-semibold">
                  {isCorrect ? 'Nice read.' : `Not quite — correct is ${scenario.correct}.`}
                </p>
                <p className="mt-0.5 leading-snug">Why: {scenario.why}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={goBack} disabled={index === 0}>
          Back
        </Button>
        <Button
          className="flex-1 bg-emerald-800 hover:bg-emerald-900"
          onClick={goNext}
          disabled={!chosen || index === SCENARIOS.length - 1}
        >
          Next
        </Button>
      </div>

      {allSorted && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="rounded-xl border-emerald-200 bg-emerald-50/40">
            <CardContent className="p-4 space-y-3">
              <p className="text-sm font-semibold text-emerald-900">
                You sorted {correctCount} of {SCENARIOS.length} correctly.
              </p>
              <p className="text-sm text-emerald-800">
                {passed
                  ? 'You can read a contact at a glance — that is the whole game.'
                  : `Get at least ${PASS_THRESHOLD} right to lock this in. Tap a dot above to revisit.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  className="flex-1 bg-emerald-800 hover:bg-emerald-900"
                  disabled={!passed}
                  onClick={handleSave}
                >
                  {passed ? 'Save & continue' : 'Review and try again'}
                </Button>
                {!passed && (
                  <Button variant="outline" className="flex-1" onClick={handleReset}>
                    Reset all
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default RecipientIdActivity;
