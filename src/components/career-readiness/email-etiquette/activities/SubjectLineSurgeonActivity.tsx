import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import type { EmailActivityProps } from './types';

interface WeakLine {
  id: string;
  original: string;
  hint: string;
}

const WEAK_LINES: WeakLine[] = [
  {
    id: 'sl1',
    original: 'Hi',
    hint: 'Try: "10-min call request — junior interested in your work"',
  },
  {
    id: 'sl2',
    original: 'Question',
    hint: 'Try: "Quick question — equity research recruiting timeline?"',
  },
  {
    id: 'sl3',
    original: 'Following up',
    hint: 'Try: "Following up on our 4/12 chat — 15 minutes next week?"',
  },
  {
    id: 'sl4',
    original: 'Opportunity for you',
    hint: 'Try: "Undergrad analyst interested in your IB summer program"',
  },
  {
    id: 'sl5',
    original: 'Resume attached',
    hint: 'Try: "Resume — Junior, finance major, interest in equity research"',
  },
];

const MIN_PASS = 60;

const KEYWORD_LIST = [
  'minutes', 'min', 'call', 'intro', 'request',
  'question', 'interested', 'junior', 'senior', 'undergrad',
];

const VAGUE_EXACT = new Set(['hi', 'hello', 'hey', 'question']);

function calcRating(raw: string): number {
  const value = raw.trim();
  if (value.length === 0) return 0;

  let score = 0;
  const len = value.length;

  if (len >= 6 && len <= 70) score += 30;
  if (/\d/.test(value)) score += 15;
  if (/[—:\-]/.test(value)) score += 10;

  const lower = value.toLowerCase();
  if (KEYWORD_LIST.some((kw) => lower.includes(kw))) score += 20;

  if (VAGUE_EXACT.has(lower)) score -= 20;

  const distinctWords = new Set(
    value
      .split(/\s+/)
      .map((w) => w.replace(/[^a-zA-Z]/g, '').toLowerCase())
      .filter((w) => w.length > 0)
  );
  if (distinctWords.size >= 2) score += 15;

  return Math.max(0, Math.min(100, score));
}

function ratingBucket(score: number): {
  color: string;
  bar: string;
  tip: string;
  label: string;
} {
  if (score < 35) {
    return {
      color: 'text-red-700',
      bar: 'bg-red-500',
      tip: 'Cold openers vanish — add a specific reason.',
      label: 'Weak',
    };
  }
  if (score < 70) {
    return {
      color: 'text-amber-700',
      bar: 'bg-amber-500',
      tip: 'Closer — try a number or specific ask.',
      label: 'Okay',
    };
  }
  return {
    color: 'text-emerald-800',
    bar: 'bg-emerald-600',
    tip: "That's a subject worth opening.",
    label: 'Strong',
  };
}

const SubjectLineSurgeonActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  allowEdit = true,
  isActivityComplete,
}) => {
  const rewrites = (answers.subjectLineRewrites ?? {}) as Record<string, string>;

  const ratings = useMemo(() => {
    const r: Record<string, number> = {};
    WEAK_LINES.forEach((l) => {
      r[l.id] = calcRating(rewrites[l.id] ?? '');
    });
    return r;
  }, [rewrites]);

  const allPass = WEAK_LINES.every((l) => ratings[l.id] >= MIN_PASS);
  const passedCount = WEAK_LINES.filter((l) => ratings[l.id] >= MIN_PASS).length;

  const update = (id: string, value: string) => {
    onUpdateAnswers({
      subjectLineRewrites: { ...rewrites, [id]: value },
    });
  };

  const canComplete = allPass || (allowEdit && isActivityComplete && allPass);

  const handleSave = () => {
    if (!allPass) return;
    confetti({ particleCount: 70, spread: 65, origin: { y: 0.7 } });
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Rewrite each weak subject line. Aim for a Phil Rating of {MIN_PASS} or higher.
        </p>
        {isActivityComplete && (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-xs shrink-0">
            Saved — edit any time
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {WEAK_LINES.map((line) => {
          const value = rewrites[line.id] ?? '';
          const score = ratings[line.id];
          const bucket = ratingBucket(score);
          const passed = score >= MIN_PASS;
          return (
            <Card key={line.id} className="rounded-xl border-emerald-100">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">Original: "{line.original}"</p>
                  {passed && (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px]">
                      Saved
                    </Badge>
                  )}
                </div>

                <Input
                  value={value}
                  onChange={(e) => update(line.id, e.target.value)}
                  placeholder={line.hint}
                  className="text-sm"
                  aria-label={`Rewrite for ${line.original}`}
                />

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      Phil Rating
                    </span>
                    <span className={`font-semibold ${bucket.color}`}>
                      {score}/100 · {bucket.label}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full ${bucket.bar}`}
                      initial={false}
                      animate={{ width: `${score}%` }}
                      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    />
                  </div>
                  <p className={`text-xs ${bucket.color}`}>{bucket.tip}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-sm text-emerald-900 flex items-center justify-between">
        <span>
          {passedCount} of {WEAK_LINES.length} subject lines hit {MIN_PASS}+
        </span>
        {allPass && <span className="text-xs font-semibold">Ready to save</span>}
      </div>

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900"
        disabled={!canComplete}
        onClick={handleSave}
      >
        {allPass
          ? isActivityComplete
            ? 'Save changes'
            : 'Save & continue'
          : `Get every line to ${MIN_PASS}+ to continue`}
      </Button>
    </div>
  );
};

export default SubjectLineSurgeonActivity;
