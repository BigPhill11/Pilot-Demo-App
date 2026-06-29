import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import type { EmailActivityProps } from './types';

type DraftField =
  | 'subjectLine'
  | 'specificReference'
  | 'whyItMattered'
  | 'reinstateInterest'
  | 'close';

interface FieldConfig {
  key: DraftField;
  label: string;
  helper: string;
  placeholder: string;
  type: 'input' | 'textarea';
  rows?: number;
  cap: number;
  min: number;
}

const FIELDS: FieldConfig[] = [
  {
    key: 'subjectLine',
    label: 'Subject line',
    helper: 'Specific, scannable, no fluff.',
    placeholder: "Thank you — yesterday's conversation about FP&A",
    type: 'input',
    cap: 80,
    min: 15,
  },
  {
    key: 'specificReference',
    label: 'Specific reference',
    helper: "Reference something specific they said — the detail you'll actually remember.",
    placeholder:
      "Reference something specific they said — the detail you'll actually remember.",
    type: 'textarea',
    rows: 3,
    cap: 280,
    min: 30,
  },
  {
    key: 'whyItMattered',
    label: 'Why it mattered',
    helper: "Why that detail changed how you're thinking.",
    placeholder: "Why that detail changed how you're thinking.",
    type: 'textarea',
    rows: 2,
    cap: 200,
    min: 20,
  },
  {
    key: 'reinstateInterest',
    label: 'Restate interest',
    helper: 'Restate your interest or name a small next step.',
    placeholder: 'Restate your interest or name a small next step.',
    type: 'textarea',
    rows: 2,
    cap: 200,
    min: 20,
  },
  {
    key: 'close',
    label: 'Close',
    helper: 'Warm, professional sign-off with your name.',
    placeholder: 'Thanks again for your time — [Your name]',
    type: 'input',
    cap: 120,
    min: 10,
  },
];

const PHIL_MESSAGES = [
  "That's the one that gets remembered.",
  'Phil approves.',
  'Send it.',
];

const EMPTY_DRAFT = {
  subjectLine: '',
  specificReference: '',
  whyItMattered: '',
  reinstateInterest: '',
  close: '',
};

const ThankyouEmailBuilderActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  isActivityComplete,
}) => {
  const draft = answers.thankYouEmailDraft ?? EMPTY_DRAFT;

  const update = (field: DraftField, value: string) => {
    onUpdateAnswers({
      thankYouEmailDraft: { ...draft, [field]: value },
    });
  };

  const meets = (f: FieldConfig) => draft[f.key].trim().length >= f.min;
  const allMeet = FIELDS.every(meets);
  const completeCount = FIELDS.filter(meets).length;

  const [philIdx, setPhilIdx] = useState(0);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    if (!allMeet) return;
    const t = setInterval(() => {
      setPhilIdx((i) => (i + 1) % PHIL_MESSAGES.length);
    }, 2000);
    return () => clearInterval(t);
  }, [allMeet]);

  useEffect(() => {
    if (allMeet && !hasCelebrated) {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#065f46', '#10b981', '#34d399', '#fde68a'],
      });
      setHasCelebrated(true);
    }
    if (!allMeet && hasCelebrated) {
      setHasCelebrated(false);
    }
  }, [allMeet, hasCelebrated]);

  const previewBody = useMemo(() => {
    return [
      draft.specificReference,
      draft.whyItMattered,
      draft.reinstateInterest,
      draft.close,
    ]
      .filter((s) => s.trim().length > 0)
      .join('\n\n');
  }, [draft]);

  return (
    <div className="space-y-4">
      {isActivityComplete && (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
          Saved — edit any time
        </Badge>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-600">
          Build a thank-you they actually remember. Live preview updates as you write.
        </p>
        <span className="text-xs font-semibold text-emerald-800">
          {completeCount}/{FIELDS.length}
        </span>
      </div>

      <div className="space-y-3">
        {FIELDS.map((f) => {
          const value = draft[f.key];
          const len = value.length;
          const done = meets(f);
          return (
            <Card
              key={f.key}
              className={`rounded-xl transition-colors ${
                done ? 'border-emerald-200 bg-emerald-50/30' : 'border-stone-200'
              }`}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {done && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    <span className="text-sm font-semibold text-stone-800">{f.label}</span>
                  </div>
                  <span
                    className={`text-xs tabular-nums ${
                      len > f.cap
                        ? 'text-red-600'
                        : done
                          ? 'text-emerald-700'
                          : 'text-stone-500'
                    }`}
                  >
                    {len}/{f.cap}
                  </span>
                </div>
                <p className="text-xs text-stone-500">{f.helper}</p>
                {f.type === 'input' ? (
                  <Input
                    value={value}
                    placeholder={f.placeholder}
                    maxLength={f.cap}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="rounded-lg"
                  />
                ) : (
                  <Textarea
                    value={value}
                    placeholder={f.placeholder}
                    maxLength={f.cap}
                    rows={f.rows ?? 3}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="rounded-lg resize-none"
                  />
                )}
                {!done && len > 0 && (
                  <p className="text-xs text-amber-700">
                    {f.min - len > 0
                      ? `${f.min - len} more characters to hit the minimum.`
                      : ''}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Live preview - email client style */}
      <Card className="rounded-xl border-stone-200 shadow-sm overflow-hidden">
        <div className="bg-stone-100 px-4 py-2 border-b border-stone-200 flex items-center gap-2">
          <Mail className="w-4 h-4 text-stone-600" />
          <span className="text-xs font-semibold uppercase text-stone-600 tracking-wide">
            Live preview
          </span>
        </div>
        <CardContent className="p-0 bg-white">
          <div className="px-4 py-3 border-b border-stone-100 space-y-1 text-xs text-stone-600">
            <div className="flex">
              <span className="w-16 font-semibold text-stone-500">From</span>
              <span className="text-stone-700">you@email.com</span>
            </div>
            <div className="flex">
              <span className="w-16 font-semibold text-stone-500">To</span>
              <span className="text-stone-700">recipient@firm.com</span>
            </div>
            <div className="flex">
              <span className="w-16 font-semibold text-stone-500">Subject</span>
              <span className="text-stone-900 font-medium">
                {draft.subjectLine || (
                  <span className="text-stone-400 italic font-normal">Your subject line…</span>
                )}
              </span>
            </div>
          </div>
          <div className="px-4 py-4 min-h-[160px] text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">
            {previewBody ? (
              previewBody
            ) : (
              <span className="text-stone-400 italic">
                Your email will build itself as you write…
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {allMeet && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="shrink-0"
            >
              <PandaLogo className="w-16 h-16" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                  Phil says
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={philIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <Badge className="bg-white text-emerald-800 border border-emerald-300 text-sm py-1 px-2.5">
                    {PHIL_MESSAGES[philIdx]}
                  </Badge>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900"
        disabled={!allMeet}
        onClick={onComplete}
      >
        {allMeet
          ? 'Save thank-you email'
          : `Fill ${FIELDS.length - completeCount} more field${
              FIELDS.length - completeCount === 1 ? '' : 's'
            }`}
      </Button>
    </div>
  );
};

export default ThankyouEmailBuilderActivity;
