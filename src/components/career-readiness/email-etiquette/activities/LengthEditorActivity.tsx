import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Scissors, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import type { EmailActivityProps } from './types';

const BLOATED_ORIGINAL = `Dear Ms. Rodriguez,

I hope this email finds you well and that you are having a wonderful start to your week despite the busy season. My name is Jordan Lee and I am currently a junior at Lincoln High School where I have been deeply involved in our finance club for the past two years and am also taking AP Economics this semester which I am absolutely loving so far. I came across your impressive profile on LinkedIn last weekend while doing extensive research into corporate finance careers at mid-market firms in the Midwest region. I would love to learn more about your journey into the field and what a typical day looks like for someone in your position. I would be so grateful for any of your valuable time, even just 15 or 20 minutes at your convenience, perhaps over coffee or a brief virtual call. I completely understand if you are too busy and I do not want to be a burden in any way. Please let me know if there is any time in the coming weeks that might work for a brief chat. Thank you so much in advance for your consideration and I hope to hear from you soon.`;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countSentences(text: string): number {
  return text
    .trim()
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
}

interface BarState {
  bar: string;
  text: string;
  showCheck: boolean;
  label: string;
}

function barStateFor(words: number): BarState {
  if (words === 0) {
    return {
      bar: 'bg-gray-300',
      text: 'text-gray-500',
      showCheck: false,
      label: 'Start typing your shorter version',
    };
  }
  if (words > 80) {
    return {
      bar: 'bg-red-500',
      text: 'text-red-700',
      showCheck: false,
      label: 'Over limit — keep cutting',
    };
  }
  if (words > 50) {
    return {
      bar: 'bg-amber-500',
      text: 'text-amber-700',
      showCheck: false,
      label: 'Getting tight — trim a little more',
    };
  }
  if (words >= 20) {
    return {
      bar: 'bg-emerald-700',
      text: 'text-emerald-800',
      showCheck: true,
      label: 'Sweet spot — punchy and complete',
    };
  }
  return {
    bar: 'bg-emerald-500',
    text: 'text-emerald-700',
    showCheck: false,
    label: 'In range — say a little more',
  };
}

const LengthEditorActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  isActivityComplete,
}) => {
  const draft = answers.lengthEditResult ?? '';
  const celebratedRef = useRef(false);

  const words = useMemo(() => countWords(draft), [draft]);
  const sentences = useMemo(() => countSentences(draft), [draft]);

  const state = barStateFor(words);
  const fillPct = Math.min(100, (words / 100) * 100);

  const wordsInRange = words >= 20 && words <= 50;
  const sentencesOk = sentences <= 4;
  const canComplete = wordsInRange && sentencesOk;

  let blockingMessage = '';
  if (!canComplete) {
    if (words === 0) {
      blockingMessage = 'Start your rewrite below.';
    } else if (words > 50) {
      const over = words - 50;
      blockingMessage = `Still too long — cut another ${over} ${over === 1 ? 'word' : 'words'}.`;
    } else if (words < 20) {
      const under = 20 - words;
      blockingMessage = `Add ${under} more ${under === 1 ? 'word' : 'words'} to make it complete.`;
    } else if (!sentencesOk) {
      const overSentences = sentences - 4;
      blockingMessage =
        overSentences === 1
          ? 'One more sentence to trim.'
          : `Trim ${overSentences} more sentences.`;
    }
  }

  useEffect(() => {
    if (!canComplete) {
      celebratedRef.current = false;
    }
  }, [canComplete]);

  const handleChange = (value: string) => {
    onUpdateAnswers({ lengthEditResult: value });
  };

  const handleComplete = () => {
    if (!canComplete) return;
    if (!celebratedRef.current) {
      celebratedRef.current = true;
      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#065f46', '#10b981', '#a7f3d0'],
      });
    }
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          This email is bloated. Cut it down to a sharp, send-ready version.
        </p>
        {isActivityComplete && (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
            Saved — edit any time
          </Badge>
        )}
      </div>

      {/* Bloated original */}
      <Card className="rounded-xl border-gray-200 bg-muted/40">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-gray-500" />
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-500">
              Original — too long
            </p>
          </div>
          <p className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700">
            {BLOATED_ORIGINAL}
          </p>
          <p className="text-xs text-muted-foreground pt-1">
            {countWords(BLOATED_ORIGINAL)} words · {countSentences(BLOATED_ORIGINAL)} sentences
          </p>
        </CardContent>
      </Card>

      {/* Word count bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-700">
            Word count target: 20–50
          </p>
          <div className={`flex items-center gap-1.5 text-sm font-bold ${state.text}`}>
            {state.showCheck && <CheckCircle2 className="w-4 h-4" />}
            <span>
              {words} {words === 1 ? 'word' : 'words'}
            </span>
          </div>
        </div>
        <div className="relative h-3 w-full rounded-full bg-gray-100 overflow-hidden">
          {/* Sweet spot band (20–50) */}
          <div
            className="absolute inset-y-0 bg-emerald-100/60"
            style={{ left: '20%', width: '30%' }}
          />
          <motion.div
            className={`h-full rounded-full ${state.bar}`}
            animate={{ width: `${fillPct}%` }}
            transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>0</span>
          <span>20</span>
          <span>50</span>
          <span>80</span>
          <span>100+</span>
        </div>
        <p className={`text-xs font-medium ${state.text}`}>{state.label}</p>
      </div>

      {/* Editor */}
      <div className="space-y-2">
        <Textarea
          value={draft}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={`Hi Ms. Rodriguez —\n\nI'm Jordan Lee, a junior at Lincoln High studying corporate finance...`}
          className="min-h-[180px] resize-y text-sm leading-relaxed"
        />
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <p className="text-muted-foreground">
            Cut this to 4 sentences or fewer (20–50 words). Keep: who you are,
            why them, the ask.
          </p>
          <p
            className={`font-mono ${
              sentencesOk ? 'text-emerald-700' : 'text-amber-700'
            }`}
          >
            {sentences} {sentences === 1 ? 'sentence' : 'sentences'} / 4 max
          </p>
        </div>
      </div>

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900 h-12 text-base"
        disabled={!canComplete}
        onClick={handleComplete}
      >
        {canComplete ? (
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Save edited email
          </span>
        ) : (
          blockingMessage || 'Keep editing'
        )}
      </Button>
    </div>
  );
};

export default LengthEditorActivity;
