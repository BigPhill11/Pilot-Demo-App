import React, { useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import PandaLogo from '@/components/icons/PandaLogo';
import type { EmailActivityProps } from './types';

type DraftField =
  | 'subjectLine'
  | 'openingHook'
  | 'whyYouWhyThem'
  | 'theAsk'
  | 'professionalClose';

const EMPTY_DRAFT = {
  subjectLine: '',
  openingHook: '',
  whyYouWhyThem: '',
  theAsk: '',
  professionalClose: '',
};

const FIELD_CONFIG: {
  key: DraftField;
  label: string;
  cap: number;
  minLength: number;
  placeholder: string;
  rows?: number;
  helper: string;
}[] = [
  {
    key: 'subjectLine',
    label: 'Subject line',
    cap: 80,
    minLength: 15,
    placeholder:
      '15-Min Call Request — Junior Interested in Corporate Finance at Greenfield',
    helper: 'Be specific. The inbox preview only shows ~50 characters.',
  },
  {
    key: 'openingHook',
    label: 'Opening hook',
    cap: 200,
    minLength: 20,
    placeholder: 'One sentence on who you are.',
    rows: 2,
    helper: 'Your name, school, and a one-line context.',
  },
  {
    key: 'whyYouWhyThem',
    label: 'Why you, why them',
    cap: 280,
    minLength: 30,
    placeholder: 'One sentence on why this person specifically.',
    rows: 3,
    helper: 'Reference something concrete about their work.',
  },
  {
    key: 'theAsk',
    label: 'The ask',
    cap: 200,
    minLength: 20,
    placeholder: 'One specific, small ask — a 15-minute call works.',
    rows: 2,
    helper: 'Make it tiny and easy to say yes to.',
  },
  {
    key: 'professionalClose',
    label: 'Professional close',
    cap: 120,
    minLength: 10,
    placeholder: 'Thanks for considering — [Your name]',
    helper: 'Gratitude + your name. No emojis.',
  },
];

function ratingFor(value: string, minLength: number): {
  label: 'Empty' | 'Getting there' | 'Strong';
  color: string;
} {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { label: 'Empty', color: 'bg-gray-100 text-gray-500' };
  }
  if (trimmed.length < minLength) {
    return {
      label: 'Getting there',
      color: 'bg-amber-100 text-amber-800',
    };
  }
  return { label: 'Strong', color: 'bg-emerald-100 text-emerald-800' };
}

const EmailAnatomyBuilderActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  isActivityComplete,
}) => {
  const draft = answers.emailAnatomyDraft ?? EMPTY_DRAFT;

  const minimumsMet = useMemo(
    () =>
      FIELD_CONFIG.every(
        (f) => draft[f.key].trim().length >= f.minLength
      ),
    [draft]
  );

  const strongCount = useMemo(
    () =>
      FIELD_CONFIG.filter((f) => draft[f.key].trim().length >= f.minLength)
        .length,
    [draft]
  );

  const celebratedRef = useRef(false);

  useEffect(() => {
    if (minimumsMet && !celebratedRef.current) {
      celebratedRef.current = true;
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#065f46', '#10b981', '#a7f3d0', '#fbbf24'],
      });
    }
    if (!minimumsMet) {
      celebratedRef.current = false;
    }
  }, [minimumsMet]);

  const update = (field: DraftField, value: string) => {
    const cap = FIELD_CONFIG.find((f) => f.key === field)?.cap ?? 200;
    const next = { ...draft, [field]: value.slice(0, cap) };
    onUpdateAnswers({ emailAnatomyDraft: next });
  };

  const previewLine = (text: string, placeholder: string) =>
    text.trim().length > 0 ? (
      <span className="whitespace-pre-wrap text-gray-900">{text}</span>
    ) : (
      <span className="italic text-gray-400">{placeholder}</span>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm text-muted-foreground">
            Build a cold outreach email piece by piece. Watch the preview
            assemble as you type.
          </p>
        </div>
        {isActivityComplete && (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
            Saved — edit any time
          </Badge>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* LEFT: Fields */}
        <Card className="border-emerald-100 rounded-xl shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <p className="text-sm font-semibold text-emerald-900">
                The 5 parts of a great cold email
              </p>
            </div>

            {FIELD_CONFIG.map((field) => {
              const value = draft[field.key];
              const used = value.length;
              const rating = ratingFor(value, field.minLength);
              const InputEl = field.rows ? Textarea : Input;
              return (
                <div key={field.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`anatomy-${field.key}`}
                      className="text-sm font-medium text-gray-800"
                    >
                      {field.label}
                    </label>
                    <span
                      className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full ${rating.color}`}
                    >
                      {rating.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {field.helper}
                  </p>
                  <InputEl
                    id={`anatomy-${field.key}`}
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => update(field.key, e.target.value)}
                    rows={field.rows}
                    className={
                      field.rows
                        ? 'min-h-[70px] resize-y'
                        : 'h-11'
                    }
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      Min {field.minLength} chars
                    </span>
                    <span
                      className={`text-[11px] font-mono ${
                        used > field.cap * 0.9
                          ? 'text-amber-700'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {used}/{field.cap}
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* RIGHT: Email preview */}
        <div className="space-y-3">
          <motion.div
            animate={
              minimumsMet
                ? {
                    boxShadow:
                      '0 0 0 2px rgba(52, 211, 153, 0.6), 0 8px 24px rgba(16, 185, 129, 0.15)',
                  }
                : { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }
            }
            transition={{ duration: 0.4 }}
            className={`rounded-xl border bg-white overflow-hidden ${
              minimumsMet
                ? 'ring-2 ring-emerald-400 border-emerald-200'
                : 'border-gray-200'
            }`}
          >
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                  Live preview
                </span>
              </div>
              <p className="text-xs">
                <span className="font-semibold text-gray-600">From: </span>
                <span className="text-gray-700">you@school.edu</span>
              </p>
              <p className="text-xs">
                <span className="font-semibold text-gray-600">To: </span>
                <span className="text-gray-700">contact@firm.com</span>
              </p>
              <p className="text-xs">
                <span className="font-semibold text-gray-600">Subject: </span>
                {previewLine(
                  draft.subjectLine,
                  '15-Min Call Request — Junior Interested in…'
                )}
              </p>
            </div>
            <div className="p-4 space-y-3 text-sm leading-relaxed min-h-[260px]">
              <p>
                {previewLine(
                  draft.openingHook,
                  'One sentence on who you are.'
                )}
              </p>
              <p>
                {previewLine(
                  draft.whyYouWhyThem,
                  'One sentence on why this person specifically.'
                )}
              </p>
              <p>
                {previewLine(
                  draft.theAsk,
                  'One specific, small ask — a 15-minute call works.'
                )}
              </p>
              <p>
                {previewLine(
                  draft.professionalClose,
                  'Thanks for considering — [Your name]'
                )}
              </p>
            </div>

            <AnimatePresence>
              {minimumsMet && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                  }}
                  className="bg-emerald-50 border-t border-emerald-200 px-4 py-3 flex items-center gap-3"
                >
                  <PandaLogo className="w-12 h-12" />
                  <div>
                    <p className="text-sm font-bold text-emerald-900">
                      Phil Approved
                    </p>
                    <p className="text-xs text-emerald-800">
                      Every part lands. Send it with confidence.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="px-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Strong sections</span>
              <span className="font-mono">{strongCount} / 5</span>
            </div>
            <div className="h-2 rounded-full bg-emerald-50 overflow-hidden">
              <motion.div
                className="h-full bg-emerald-600"
                animate={{ width: `${(strongCount / 5) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900 h-12 text-base"
        disabled={!minimumsMet}
        onClick={onComplete}
      >
        {minimumsMet ? (
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Save anatomy draft
          </span>
        ) : (
          `Fill all 5 parts (${strongCount}/5 strong)`
        )}
      </Button>
    </div>
  );
};

export default EmailAnatomyBuilderActivity;
