import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  Flame,
  Wind,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import type { EmailActivityProps } from './types';

type ToneTag = 'too-eager' | 'too-passive' | 'forgetful' | 'right';

interface ToneOption {
  id: string;
  tag: ToneTag;
  body: string;
  reason: string;
}

interface Scenario {
  id: string;
  situation: string;
  options: ToneOption[];
  correctId: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'sc1',
    situation:
      "It's been 6 business days since you sent a cold email to a director at a hedge fund. No reply. You're sending one follow-up. Pick the right tone.",
    correctId: 'o3',
    options: [
      {
        id: 'o1',
        tag: 'too-eager',
        body: "Hi again! Just bumping this back to the top of your inbox — I'd LOVE to hear from you whenever you have time, no pressure at all but really hoping to chat soon!! Thanks!",
        reason:
          "Emoji-like exclamation density, 'no pressure' while clearly applying pressure, doesn't add anything new.",
      },
      {
        id: 'o2',
        tag: 'too-passive',
        body: "Sorry to bother you again. I know you must be incredibly busy and I completely understand if you haven't had time to read my previous email. No worries at all if you can't respond.",
        reason:
          "Apologizing erodes your standing; tells them it's okay to ignore you.",
      },
      {
        id: 'o3',
        tag: 'right',
        body: "Hi — wanted to surface this back in case my first note got buried. I came across the firm's Q1 letter on private credit since I last wrote and your team's positioning stood out. The original ask of a 15-minute call still stands if you're open to it.",
        reason:
          'Adds new value (the letter reference), restates the ask cleanly, no apology, no pressure language.',
      },
    ],
  },
  {
    id: 'sc2',
    situation:
      "You met someone at a mixer 5 days ago. You're sending the follow-up. Pick the version that feels natural and remembered.",
    correctId: 'o2',
    options: [
      {
        id: 'o1',
        tag: 'forgetful',
        body: "Hi — really enjoyed meeting you the other night! Hope you had a great rest of the event. Would love to stay in touch and learn more about what you do.",
        reason:
          "Generic; could be sent to anyone; 'what you do' suggests you didn't actually listen.",
      },
      {
        id: 'o2',
        tag: 'right',
        body: "Hi Sam — Your comment Thursday night about 'modeling as a puzzle' has stuck with me all week. I'd love to stay connected as I explore corporate finance further. No ask, just thanks for the conversation.",
        reason:
          "A specific, sticky reference + small, low-pressure ask. Explicit 'no ask' disarms.",
      },
      {
        id: 'o3',
        tag: 'too-eager',
        body: "Hi Sam!!! It was AMAZING meeting you on Thursday! You are honestly such an inspiration and I would love love LOVE to follow in your footsteps. Can we set up a call this week or next? I am free anytime!",
        reason:
          "Over-the-top praise, presumptive call request, 'I am free anytime' reverses power dynamic awkwardly.",
      },
    ],
  },
  {
    id: 'sc3',
    situation:
      "It's been 4 weeks since a great informational interview. You haven't reached out since the thank-you note. You want to re-engage without being weird.",
    correctId: 'o1',
    options: [
      {
        id: 'o1',
        tag: 'right',
        body: "Hi Maria — Quick update: I took your advice and shadowed the FP&A team at school's investment club. The mental shift you described — modeling as clarifying — actually played out in practice. Wanted to share. No need to reply.",
        reason:
          "Shows you applied her advice, reports a result, doesn't demand a response.",
      },
      {
        id: 'o2',
        tag: 'too-eager',
        body: "Hi Maria, I know it's been a few weeks but I just wanted to check in and see if you'd had a chance to think about whether you could maybe introduce me to your manager. I think we'd really hit it off.",
        reason:
          "Presumes a favor was queued; 'we'd really hit it off' is a red flag.",
      },
      {
        id: 'o3',
        tag: 'forgetful',
        body: "Hi Maria, hope you're doing well. Just wanted to reach out and say hi. Let me know if you ever have time to chat again sometime.",
        reason:
          'Vague, gives her nothing to respond to, looks like you forgot what the original conversation was about.',
      },
    ],
  },
  {
    id: 'sc4',
    situation:
      'You sent your application and a follow-up email referencing it 8 business days ago. No movement. You want to send a final touch without sounding desperate.',
    correctId: 'o3',
    options: [
      {
        id: 'o1',
        tag: 'too-eager',
        body: "Hi — I really really want this opportunity and just wanted to make sure my application didn't get lost in the shuffle! I am so excited about this role and would be heartbroken if I missed out. Please let me know!",
        reason:
          "Emotional language ('heartbroken') shifts the power dynamic and reads as anxious.",
      },
      {
        id: 'o2',
        tag: 'forgetful',
        body: 'Hello, just following up on the application I submitted recently. Let me know if there is any update.',
        reason:
          "'Recently' is vague; 'any update' puts all labor on them; no specifics.",
      },
      {
        id: 'o3',
        tag: 'right',
        body: "Hi — circling back on the [Role] application I submitted on March 8. Happy to provide anything else that would help your evaluation, and I noticed the firm is hiring across the analyst track this quarter — open to hearing about adjacent fits as well if this role isn't the one.",
        reason:
          "Specific date, professional offer of more material, gracefully opens the door to other roles without ego.",
      },
    ],
  },
];

const TAG_META: Record<
  ToneTag,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  'too-eager': { label: 'Too eager', icon: Flame, color: 'text-amber-600' },
  'too-passive': { label: 'Too passive', icon: Wind, color: 'text-stone-500' },
  forgetful: { label: 'Forgetful', icon: Wind, color: 'text-stone-500' },
  right: { label: 'Professional', icon: Briefcase, color: 'text-emerald-700' },
};

const ToneCheckAdvancedActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  isActivityComplete,
}) => {
  const results = answers.toneCheckAdvancedResults ?? {};
  const [index, setIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const scenario = SCENARIOS[index];
  const chosenId = results[scenario.id];

  const correctCount = useMemo(
    () => SCENARIOS.filter((s) => results[s.id] === s.correctId).length,
    [results]
  );
  const canComplete = correctCount >= 3;

  const pick = (optionId: string) => {
    onUpdateAnswers({
      toneCheckAdvancedResults: { ...results, [scenario.id]: optionId },
    });
  };

  const handleReset = () => {
    const next = { ...results };
    delete next[scenario.id];
    onUpdateAnswers({ toneCheckAdvancedResults: next });
  };

  const goNext = () => {
    if (index < SCENARIOS.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setShowSummary(true);
    }
  };

  const goBack = () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    if (index > 0) setIndex((i) => i - 1);
  };

  const handleComplete = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#065f46', '#10b981', '#34d399', '#fde68a'],
    });
    onComplete();
  };

  if (showSummary) {
    return (
      <div className="space-y-4">
        {isActivityComplete && (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            Saved — edit any time
          </Badge>
        )}

        <Card className="rounded-xl border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <h3 className="font-semibold text-emerald-900">
                You nailed {correctCount} of {SCENARIOS.length}
              </h3>
            </div>
            <p className="text-sm text-emerald-900/80">
              {canComplete
                ? 'Tone is taste. You can hear it now — that matters.'
                : "Close. Tone reads between the lines; review the misses and you'll catch them next time."}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {SCENARIOS.map((s, i) => {
            const picked = results[s.id];
            const right = picked === s.correctId;
            const correctOpt = s.options.find((o) => o.id === s.correctId);
            return (
              <Card key={s.id} className="rounded-xl">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    {right ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase text-stone-500">
                        Scenario {i + 1}
                      </p>
                      <p className="text-sm text-stone-700 mt-1">{s.situation}</p>
                      {correctOpt && (
                        <p className="text-xs text-emerald-800 mt-2 italic">
                          Right pick: “{correctOpt.body.slice(0, 70)}…”
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full" onClick={goBack}>
            Back to last scenario
          </Button>
          <Button
            className="w-full bg-emerald-800 hover:bg-emerald-900"
            disabled={!canComplete}
            onClick={handleComplete}
          >
            {canComplete
              ? 'Save & mark tone check complete'
              : `Get ${3 - correctCount} more right to finish`}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isActivityComplete && (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
          Saved — edit any time
        </Badge>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-stone-600">
          Scenario {index + 1} of {SCENARIOS.length}
        </p>
        <span className="text-xs font-semibold text-emerald-800">
          {correctCount}/{SCENARIOS.length} correct
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="rounded-xl border-emerald-100 bg-emerald-50/40 shadow-sm">
            <CardContent className="p-4">
              <p className="text-base font-medium text-stone-800 leading-relaxed">
                {scenario.situation}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${scenario.id}-options`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {scenario.options.map((opt) => {
              const selected = chosenId === opt.id;
              const isCorrect = opt.id === scenario.correctId;
              const showAsRight = chosenId && isCorrect;
              const showAsWrong = chosenId && selected && !isCorrect;
              const faded = chosenId && !selected && !isCorrect;

              return (
                <motion.button
                  key={opt.id}
                  layout
                  type="button"
                  onClick={() => !chosenId && pick(opt.id)}
                  disabled={!!chosenId}
                  animate={{
                    opacity: faded ? 0.35 : 1,
                    scale: selected ? 1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showAsRight
                      ? 'border-emerald-500 bg-emerald-50'
                      : showAsWrong
                        ? 'border-amber-400 bg-amber-50'
                        : selected
                          ? 'border-emerald-300 bg-emerald-50/60'
                          : 'border-stone-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30 active:scale-[0.99]'
                  } ${chosenId ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <p className="text-sm text-stone-800 leading-relaxed">{opt.body}</p>
                  {chosenId && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.15, duration: 0.25 }}
                      className="mt-3 pt-3 border-t border-stone-200 overflow-hidden"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        {(() => {
                          const meta = TAG_META[opt.tag];
                          const Icon = meta.icon;
                          return (
                            <>
                              <Icon className={`w-3.5 h-3.5 ${meta.color}`} />
                              <span
                                className={`text-xs font-bold uppercase tracking-wide ${meta.color}`}
                              >
                                {meta.label}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{opt.reason}</p>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {chosenId && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`rounded-xl shadow-sm ${
                chosenId === scenario.correctId
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-amber-200 bg-amber-50/70'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {chosenId === scenario.correctId ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                      <span className="text-sm font-bold text-emerald-800">
                        Right call.
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-bold text-amber-800">
                        Not quite — the professional version is highlighted.
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  The other options miss in different ways — read each tag above to see why.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2">
        {chosenId && (
          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reconsider this one
          </Button>
        )}
        <div className="flex gap-2">
          {index > 0 && (
            <Button variant="outline" className="flex-1" onClick={goBack}>
              Back
            </Button>
          )}
          <Button
            className="flex-1 bg-emerald-800 hover:bg-emerald-900"
            onClick={goNext}
            disabled={!chosenId}
          >
            {index < SCENARIOS.length - 1 ? 'Next scenario' : 'See summary'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToneCheckAdvancedActivity;
