import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EmailActivityProps } from './types';

type ToneAnswer = 'too-casual' | 'too-formal' | 'just-right';

interface ToneExcerpt {
  id: string;
  text: string;
  correct: ToneAnswer;
  why: string;
}

const EXCERPTS: ToneExcerpt[] = [
  {
    id: 'e1',
    text: "Yo!! soooo I was wondering if maybe possibly we could talk about jobs n stuff if ur free??? hmu when u can lol",
    correct: 'too-casual',
    why: 'Slang, multiple exclamations, no specifics. Reads as a text to a friend, not a professional email.',
  },
  {
    id: 'e2',
    text: 'To Whom It May Concern: Pursuant to your esteemed position, I should be most grateful if you would consider granting me the privilege of a conversation regarding my professional aspirations.',
    correct: 'too-formal',
    why: 'Reads like a 19th-century letter. Modern professionals use warm, direct language — not "pursuant" or "esteemed."',
  },
  {
    id: 'e3',
    text: "Hi Maria — I'm a junior at Lincoln High researching corporate finance roles, and your path from accounting into FP&A is exactly the move I'm trying to understand. Would a 15-minute call be possible in the next two weeks?",
    correct: 'just-right',
    why: 'Specific, warm, professional, ends with a low-commitment ask.',
  },
  {
    id: 'e4',
    text: "Hey what's up! Saw your LinkedIn and was like wow she seems cool, would love to chat sometime if you're down 👍",
    correct: 'too-casual',
    why: 'Slang ("what\'s up"), emoji, no ask, no professional context.',
  },
  {
    id: 'e5',
    text: 'Dear Madam, It would be a tremendous honor and a most sincere privilege if you would be so kind as to afford me a brief portion of your invaluable time.',
    correct: 'too-formal',
    why: 'Over-formal phrasing reads as performative and lands awkwardly in a 2026 inbox.',
  },
  {
    id: 'e6',
    text: "Hi Sam — Thanks for your time at the mixer last Thursday. The way you described modeling as 'clarifying' has stuck with me. I'd love to stay connected as I dig deeper into corporate finance. No ask, just gratitude.",
    correct: 'just-right',
    why: 'Warm, specific, references the actual conversation, explicitly says "no ask" which is disarming and professional.',
  },
];

const OPTIONS: { key: ToneAnswer; label: string; tone: string }[] = [
  { key: 'too-casual', label: 'Too Casual', tone: 'border-amber-300 text-amber-800 hover:bg-amber-50' },
  { key: 'too-formal', label: 'Too Formal', tone: 'border-indigo-300 text-indigo-800 hover:bg-indigo-50' },
  { key: 'just-right', label: 'Just Right', tone: 'border-emerald-300 text-emerald-800 hover:bg-emerald-50' },
];

const ToneCalibatorActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  isActivityComplete,
}) => {
  const results = answers.toneCalibrationResults ?? {};
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState<null | 'correct' | 'wrong'>(null);
  const [showExplain, setShowExplain] = useState(false);
  const [locked, setLocked] = useState(false);
  const advanceTimerRef = useRef<number | null>(null);
  const flashTimerRef = useRef<number | null>(null);

  const total = EXCERPTS.length;
  const current = EXCERPTS[Math.min(index, total - 1)];
  const finished = index >= total;

  const score = useMemo(
    () =>
      EXCERPTS.filter((e) => results[e.id] === e.correct).length,
    [results]
  );

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) window.clearTimeout(advanceTimerRef.current);
      if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (finished && score >= 4) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#065f46', '#10b981', '#a7f3d0'],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const handlePick = (choice: ToneAnswer) => {
    if (locked || finished) return;
    setLocked(true);
    const isCorrect = choice === current.correct;
    setFlash(isCorrect ? 'correct' : 'wrong');
    onUpdateAnswers({
      toneCalibrationResults: { ...results, [current.id]: choice },
    });
    flashTimerRef.current = window.setTimeout(() => {
      setFlash(null);
      setShowExplain(true);
    }, 600);
    advanceTimerRef.current = window.setTimeout(() => {
      setShowExplain(false);
      setLocked(false);
      setIndex((i) => i + 1);
    }, 600 + 1300);
  };

  const reset = () => {
    onUpdateAnswers({ toneCalibrationResults: {} });
    setIndex(0);
    setShowExplain(false);
    setFlash(null);
    setLocked(false);
  };

  if (finished) {
    const passed = score >= 4;
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            All 6 excerpts calibrated.
          </p>
          {isActivityComplete && (
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              Saved — edit any time
            </Badge>
          )}
        </div>
        <Card className="rounded-xl border-emerald-100">
          <CardContent className="p-6 text-center space-y-3">
            <p className="text-5xl font-bold text-emerald-800">
              {score}
              <span className="text-2xl text-muted-foreground"> / {total}</span>
            </p>
            <p className="text-sm font-semibold">
              {score} of {total} calibrated.
            </p>
            <p
              className={`text-sm ${
                passed ? 'text-emerald-800' : 'text-amber-800'
              }`}
            >
              {passed
                ? 'Your ear for professional tone is dialed in.'
                : 'Almost there — try again to lock it in.'}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            variant="outline"
            className="h-11"
            onClick={reset}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry all 6
          </Button>
          <Button
            className="h-11 bg-emerald-800 hover:bg-emerald-900"
            disabled={!passed}
            onClick={onComplete}
          >
            {passed ? 'Save & continue' : `Need 4+ correct (you got ${score})`}
          </Button>
        </div>
      </div>
    );
  }

  const flashRing =
    flash === 'correct'
      ? 'ring-4 ring-emerald-400 bg-emerald-50'
      : flash === 'wrong'
        ? 'ring-4 ring-red-400 bg-red-50'
        : 'ring-1 ring-gray-200 bg-white';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Excerpt {index + 1} of {total} — how does this email read?
        </p>
        {isActivityComplete && (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
            Saved
          </Badge>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {EXCERPTS.map((e, i) => {
          const done = !!results[e.id];
          const isCurrent = i === index;
          return (
            <div
              key={e.id}
              className={`h-2 flex-1 rounded-full transition-colors ${
                done
                  ? results[e.id] === e.correct
                    ? 'bg-emerald-500'
                    : 'bg-red-300'
                  : isCurrent
                    ? 'bg-emerald-200'
                    : 'bg-gray-200'
              }`}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        >
          <Card
            className={`rounded-xl border transition-all duration-300 ${flashRing}`}
          >
            <CardContent className="p-6">
              <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2">
                Email excerpt
              </p>
              <p className="text-base leading-relaxed text-gray-900">
                &ldquo;{current.text}&rdquo;
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showExplain && (
          <motion.div
            key={`why-${current.id}`}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`rounded-xl p-3 text-sm border ${
              flash === 'wrong' || results[current.id] !== current.correct
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className="flex items-start gap-2">
              {results[current.id] === current.correct ? (
                <Check className="w-4 h-4 mt-0.5 shrink-0" />
              ) : (
                <X className="w-4 h-4 mt-0.5 shrink-0" />
              )}
              <p>
                <span className="font-semibold capitalize">
                  {current.correct.replace('-', ' ')}.
                </span>{' '}
                {current.why}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            disabled={locked}
            onClick={() => handlePick(opt.key)}
            className={`min-h-[52px] rounded-xl border-2 font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${opt.tone}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Pick fast — go with your gut.
      </p>
    </div>
  );
};

export default ToneCalibatorActivity;
