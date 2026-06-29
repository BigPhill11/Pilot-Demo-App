import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Send,
  CalendarDays,
  CalendarClock,
  Pause,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import type { EmailActivityProps } from './types';

type Temperature = 'warm' | 'lukewarm' | 'cold';

interface TimingOption {
  id: 'send-now' | 'wait-3-days' | 'wait-1-week' | 'dont-follow-up';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Consequence {
  text: string;
  temperature: Temperature;
}

interface Scenario {
  id: string;
  situation: string;
  correctId: TimingOption['id'];
  whyCorrect: string;
  consequences: Record<TimingOption['id'], Consequence>;
}

const OPTIONS: TimingOption[] = [
  { id: 'send-now', label: 'Send now', icon: Send },
  { id: 'wait-3-days', label: 'Wait 3 days', icon: CalendarDays },
  { id: 'wait-1-week', label: 'Wait 1 week', icon: CalendarClock },
  { id: 'dont-follow-up', label: "Don't follow up yet", icon: Pause },
];

const SCENARIOS: Scenario[] = [
  {
    id: 'sc1',
    situation:
      'You sent a cold outreach email 3 days ago. No reply yet. The recipient is a busy VP at a bank.',
    correctId: 'wait-1-week',
    whyCorrect:
      '3 days is too soon for a cold contact. 5–7 business days is the professional sweet spot.',
    consequences: {
      'send-now': {
        text: "Two emails in three days reads as desperate. She didn't respond to either.",
        temperature: 'cold',
      },
      'wait-3-days': {
        text: 'You sent another email at day 6. She marked the first as spammy and ignored both.',
        temperature: 'cold',
      },
      'wait-1-week': {
        text: "On day 7 you sent a thoughtful follow-up referencing an article she'd just published. She replied that afternoon.",
        temperature: 'warm',
      },
      'dont-follow-up': {
        text: "You never followed up. Three months later she remembered your name in passing but couldn't recall what you wanted.",
        temperature: 'lukewarm',
      },
    },
  },
  {
    id: 'sc2',
    situation:
      "You had an informational interview yesterday. Great conversation. You haven't sent a thank-you yet.",
    correctId: 'send-now',
    whyCorrect:
      'Thank-yous are time-sensitive — within 24 hours while the conversation is fresh.',
    consequences: {
      'send-now': {
        text: 'She replied within the hour with three more contacts who could help you. The thank-you opened more doors than the meeting did.',
        temperature: 'warm',
      },
      'wait-3-days': {
        text: "By the time it arrived she'd already had two more meetings and only vaguely remembered yours.",
        temperature: 'lukewarm',
      },
      'wait-1-week': {
        text: 'A week-late thank-you feels like an afterthought. She replied politely but the warmth was gone.',
        temperature: 'lukewarm',
      },
      'dont-follow-up': {
        text: 'No thank-you. She remembered the conversation but not the courtesy.',
        temperature: 'cold',
      },
    },
  },
  {
    id: 'sc3',
    situation:
      "At the end of your meeting last Friday the analyst said: 'I'm slammed this week — I'll email you next Wednesday with the introductions I promised.' It's Monday.",
    correctId: 'dont-follow-up',
    whyCorrect:
      "She named a specific date that hasn't arrived. Trust her timeline; pinging early reads as anxious.",
    consequences: {
      'send-now': {
        text: "She replied tersely: 'I said Wednesday.' You looked like you didn't trust her.",
        temperature: 'cold',
      },
      'wait-3-days': {
        text: 'Thursday rolled around. You sent a reminder before her Wednesday window had even fully passed. She felt rushed and disrespected.',
        temperature: 'cold',
      },
      'wait-1-week': {
        text: "By Monday the next week she'd already moved on. You should have waited just until her promised date.",
        temperature: 'lukewarm',
      },
      'dont-follow-up': {
        text: 'Wednesday came. She emailed you the introductions exactly as promised. Your patience confirmed you were someone she could rely on.',
        temperature: 'warm',
      },
    },
  },
  {
    id: 'sc4',
    situation:
      "You met someone at a career fair 4 days ago. You wrote down your contact info on her clipboard. No exchange since. You haven't reached out at all.",
    correctId: 'send-now',
    whyCorrect:
      "4 days is already late for a post-event touch — any more and she won't remember which student you were.",
    consequences: {
      'send-now': {
        text: 'You sent a short note that night referencing her comment about ESG investing. She remembered you immediately and offered to connect you with a friend in the sector.',
        temperature: 'warm',
      },
      'wait-3-days': {
        text: 'By the time it arrived, a week had passed since the fair. She had to ask which booth she met you at.',
        temperature: 'lukewarm',
      },
      'wait-1-week': {
        text: "Eleven days post-fair. She didn't remember you at all.",
        temperature: 'cold',
      },
      'dont-follow-up': {
        text: 'She never heard from you. A great in-person impression evaporated.',
        temperature: 'cold',
      },
    },
  },
  {
    id: 'sc5',
    situation:
      'You sent a thoughtful cold email 10 days ago. No response. No relationship existed before this.',
    correctId: 'send-now',
    whyCorrect:
      '10 days past the 5–7 business day window is fair game for one final, value-add follow-up.',
    consequences: {
      'send-now': {
        text: 'A short, specific follow-up with one new piece of value got a reply within two days. The original timing was just a miss — the follow-up rescued the relationship.',
        temperature: 'warm',
      },
      'wait-3-days': {
        text: 'You waited until day 13. By then the original message was buried.',
        temperature: 'lukewarm',
      },
      'wait-1-week': {
        text: 'You waited until day 17. The trail was completely cold.',
        temperature: 'cold',
      },
      'dont-follow-up': {
        text: 'Most cold-email responses come after the second touch. You left it on the table.',
        temperature: 'cold',
      },
    },
  },
];

const TEMP_COLOR: Record<Temperature, string> = {
  warm: 'bg-emerald-500',
  lukewarm: 'bg-amber-400',
  cold: 'bg-red-400',
};

const TEMP_LABEL: Record<Temperature, string> = {
  warm: 'Warm',
  lukewarm: 'Lukewarm',
  cold: 'Cold',
};

function TemperatureRow({ temperature }: { temperature: Temperature }) {
  // dot pattern: warm = [green, green, green], lukewarm = [green, amber, gray],
  // cold = [red, gray, gray]
  const dots: string[] =
    temperature === 'warm'
      ? ['bg-emerald-500', 'bg-emerald-500', 'bg-emerald-500']
      : temperature === 'lukewarm'
        ? ['bg-emerald-300', 'bg-amber-400', 'bg-stone-300']
        : ['bg-red-500', 'bg-stone-300', 'bg-stone-300'];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-stone-600">Relationship:</span>
      <div className="flex gap-1.5">
        {dots.map((cls, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 320 }}
            className={`w-2.5 h-2.5 rounded-full ${cls}`}
          />
        ))}
      </div>
      <span
        className={`text-xs font-semibold ${
          temperature === 'warm'
            ? 'text-emerald-700'
            : temperature === 'lukewarm'
              ? 'text-amber-700'
              : 'text-red-600'
        }`}
      >
        {TEMP_LABEL[temperature]}
      </span>
    </div>
  );
}

const FollowupTimingSimulatorActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  isActivityComplete,
}) => {
  const results = answers.followupTimingResults ?? {};
  const [index, setIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const scenario = SCENARIOS[index];
  const chosenId = results[scenario.id] as TimingOption['id'] | undefined;
  const consequence = chosenId ? scenario.consequences[chosenId] : undefined;
  const isCorrect = chosenId === scenario.correctId;

  const correctCount = useMemo(
    () => SCENARIOS.filter((s) => results[s.id] === s.correctId).length,
    [results]
  );
  const answeredAll = SCENARIOS.every((s) => results[s.id]);
  const canComplete = correctCount >= 4;

  const pick = (optionId: TimingOption['id']) => {
    onUpdateAnswers({
      followupTimingResults: { ...results, [scenario.id]: optionId },
    });
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

  const handleChange = () => {
    const next = { ...results };
    delete next[scenario.id];
    onUpdateAnswers({ followupTimingResults: next });
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
                You called {correctCount} of {SCENARIOS.length} correctly
              </h3>
            </div>
            <p className="text-sm text-emerald-900/80">
              {canComplete
                ? 'Strong instincts. Timing is leverage — you just proved you can use it.'
                : 'Almost. Review the ones you missed; the right timing changes the whole relationship.'}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {SCENARIOS.map((s, i) => {
            const picked = results[s.id] as TimingOption['id'] | undefined;
            const right = picked === s.correctId;
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
                    </div>
                  </div>
                  <p className="text-xs text-stone-600">
                    <span className="font-semibold">Right move:</span>{' '}
                    {OPTIONS.find((o) => o.id === s.correctId)?.label}
                  </p>
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
            onClick={handleComplete}
            disabled={!canComplete}
          >
            {canComplete
              ? 'Save & mark simulation complete'
              : `Get ${4 - correctCount} more right to finish`}
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
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-semibold text-emerald-800">
            {correctCount}/{SCENARIOS.length} correct
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
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

      <div className="grid grid-cols-1 gap-2">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const selected = chosenId === opt.id;
          const correct = selected && opt.id === scenario.correctId;
          const wrong = selected && opt.id !== scenario.correctId;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => pick(opt.id)}
              className={`flex items-center gap-3 w-full text-left p-4 rounded-xl border-2 transition-all min-h-[56px] ${
                correct
                  ? 'border-emerald-500 bg-emerald-50'
                  : wrong
                    ? 'border-amber-400 bg-amber-50'
                    : selected
                      ? 'border-emerald-300 bg-emerald-50/60'
                      : 'border-stone-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30 active:scale-[0.99]'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  correct
                    ? 'text-emerald-700'
                    : wrong
                      ? 'text-amber-600'
                      : 'text-stone-500'
                }`}
              />
              <span className="font-medium text-stone-800">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {chosenId && consequence && (
          <motion.div
            key={`${scenario.id}-${chosenId}`}
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <Card
              className={`rounded-xl shadow-sm ${
                isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50/70'
              }`}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-600" />
                  )}
                  <span
                    className={`text-xs font-bold uppercase tracking-wide ${
                      isCorrect ? 'text-emerald-800' : 'text-amber-800'
                    }`}
                  >
                    {isCorrect ? 'What happens next' : 'Here’s how that plays out'}
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    isCorrect ? 'text-emerald-900' : 'text-amber-900'
                  }`}
                >
                  {consequence.text}
                </p>
                <div
                  className={`flex items-center gap-1 w-fit px-2 py-1 rounded-full ${
                    TEMP_COLOR[consequence.temperature]
                  }/0`}
                >
                  <TemperatureRow temperature={consequence.temperature} />
                </div>
                {isCorrect && (
                  <p className="text-xs text-emerald-800/80 italic border-l-2 border-emerald-300 pl-2">
                    Why this works: {scenario.whyCorrect}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2">
        {chosenId && (
          <Button variant="outline" className="w-full" onClick={handleChange}>
            Try a different move
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
            {index < SCENARIOS.length - 1
              ? 'Next scenario'
              : answeredAll
                ? 'See summary'
                : 'See summary'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FollowupTimingSimulatorActivity;
