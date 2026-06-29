import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Mail, Users, EyeOff, Sparkles } from 'lucide-react';
import type { EmailActivityProps } from './types';

type Choice = 'individual' | 'cc' | 'bcc';

interface Scenario {
  id: string;
  text: string;
  correct: Choice;
  consequences: Record<Choice, string>;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'sc1',
    text: 'You want to send the same cold outreach email to three analysts at different firms. None know each other and none should know you contacted the others.',
    correct: 'individual',
    consequences: {
      individual:
        'All three got a personalized email referencing why you reached out to them specifically. Two replied within 48 hours. The third forwarded it to their colleague.',
      cc: "All three saw each other's emails. They realized this was a mass send. Two ignored it; one replied 'wrong analyst — please remove me from your list.'",
      bcc: "BCC hides the addresses but feels impersonal. None replied. Worse, when one of them mentioned it to a colleague who was also BCC'd, the cover was blown.",
    },
  },
  {
    id: 'sc2',
    text: 'Your manager asked you to email a vendor about a delay. She wants to be aware of the conversation but not actively part of it.',
    correct: 'cc',
    consequences: {
      individual:
        "Your manager later asked why she wasn't included — you'd missed an easy chance to demonstrate visibility.",
      cc: 'The CC kept your manager looped in without making the vendor address her directly. The exchange stayed clean.',
      bcc: 'BCC means the vendor never knew your manager was watching. When your manager later referenced the thread the vendor was caught off guard, and trust took a hit.',
    },
  },
  {
    id: 'sc3',
    text: "You're sending a holiday announcement from your student org to 200 members. You want to protect everyone's email privacy.",
    correct: 'bcc',
    consequences: {
      individual:
        'Sending 200 individual emails took six hours and the formatting got inconsistent partway through.',
      cc: "Everyone saw 199 other addresses. Within an hour, three angry replies asked why you'd shared their email. Two unsubscribed from the org.",
      bcc: "Every recipient saw it as 'to me' with no one else visible. Privacy preserved. A few even replied to thank you for the discretion.",
    },
  },
  {
    id: 'sc4',
    text: "You're following up with a single recruiter about a specific job posting.",
    correct: 'individual',
    consequences: {
      individual:
        'The recruiter saw a personal, targeted email. She replied with next steps within 36 hours.',
      cc: "CC who? There's no one else relevant — this just looks confused.",
      bcc: "BCC of one person doesn't make sense and might trigger spam filters.",
    },
  },
  {
    id: 'sc5',
    text: 'Your professor asked you to email a guest speaker to confirm logistics, and to keep her in the loop on the response.',
    correct: 'cc',
    consequences: {
      individual:
        "You'd have needed to forward each reply to your professor — slow, redundant, error-prone.",
      cc: 'The speaker replied directly to you with details. Your professor saw the chain without needing a forward. Everyone aligned.',
      bcc: 'BCC means your professor sees the chain but the speaker doesn’t know that. If the professor accidentally replies-all, the BCC is exposed and looks shady.',
    },
  },
];

const OPTIONS: { id: Choice; label: string; icon: React.ReactNode }[] = [
  { id: 'individual', label: 'Send individual emails', icon: <Mail className="w-4 h-4" /> },
  { id: 'cc', label: 'CC them', icon: <Users className="w-4 h-4" /> },
  { id: 'bcc', label: 'BCC them', icon: <EyeOff className="w-4 h-4" /> },
];

const CcBccSimulatorActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  isActivityComplete,
}) => {
  const results = answers.ccBccSimulatorResults ?? {};
  const [index, setIndex] = useState(() => {
    const next = SCENARIOS.findIndex((s) => !results[s.id]);
    return next === -1 ? SCENARIOS.length - 1 : next;
  });
  const [phase, setPhase] = useState<'choose' | 'reveal'>(
    results[SCENARIOS[Math.min(index, SCENARIOS.length - 1)].id] ? 'reveal' : 'choose'
  );

  const scenario = SCENARIOS[index];
  const chosen = results[scenario.id] as Choice | undefined;
  const isCorrect = chosen === scenario.correct;

  const correctCount = useMemo(
    () => SCENARIOS.filter((s) => results[s.id] === s.correct).length,
    [results]
  );
  const allAnswered = SCENARIOS.every((s) => results[s.id]);

  const handlePick = (choice: Choice) => {
    onUpdateAnswers({
      ccBccSimulatorResults: { ...results, [scenario.id]: choice },
    });
    setPhase('reveal');
  };

  const handleNext = () => {
    if (index < SCENARIOS.length - 1) {
      setIndex((i) => i + 1);
      setPhase('choose');
    }
  };

  const handleReplay = () => {
    onUpdateAnswers({ ccBccSimulatorResults: {} });
    setIndex(0);
    setPhase('choose');
  };

  const handleComplete = () => {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Round {index + 1} of {SCENARIOS.length} · Pick fast, learn faster.
        </p>
        <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-800">
          {correctCount}/{SCENARIOS.length} right
        </Badge>
      </div>

      {isActivityComplete && (
        <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">
          Saved — edit any time
        </Badge>
      )}

      <AnimatePresence mode="wait">
        {phase === 'choose' ? (
          <motion.div
            key={`q-${scenario.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <Card className="rounded-xl border-emerald-100 bg-emerald-50/40 shadow-sm">
              <CardContent className="p-5">
                <p className="text-base font-medium leading-snug">{scenario.text}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {OPTIONS.map((opt) => (
                <Button
                  key={opt.id}
                  variant="outline"
                  className="h-auto py-4 rounded-xl border-emerald-200 hover:bg-emerald-50 hover:border-emerald-400 flex flex-col gap-1 items-center"
                  onClick={() => handlePick(opt.id)}
                >
                  <span className="text-emerald-800">{opt.icon}</span>
                  <span className="text-sm font-semibold">{opt.label}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`a-${scenario.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <Card className="rounded-xl border-emerald-100 bg-white shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-2">The scenario</p>
                <p className="text-base font-medium leading-snug">{scenario.text}</p>
              </CardContent>
            </Card>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className={`rounded-xl p-5 shadow-md border ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              }`}
            >
              <div className="flex items-start gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-700" />
                ) : (
                  <AlertTriangle className="w-5 h-5 mt-0.5 text-red-700" />
                )}
                <div>
                  <p className="text-sm font-semibold">
                    {isCorrect ? 'Nailed it.' : `You chose ${chosen?.toUpperCase()}. Correct: ${scenario.correct.toUpperCase()}.`}
                  </p>
                  <p className="text-xs opacity-80">What happens next</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                {chosen ? scenario.consequences[chosen] : ''}
              </p>
            </motion.div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setPhase('choose')}
              >
                Try a different answer
              </Button>
              {index < SCENARIOS.length - 1 ? (
                <Button
                  className="bg-emerald-800 hover:bg-emerald-900 rounded-xl"
                  onClick={handleNext}
                >
                  Next scenario
                </Button>
              ) : (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center space-y-2">
                  <p className="text-emerald-900 font-semibold flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {correctCount} of {SCENARIOS.length} played right
                  </p>
                  {allAnswered && correctCount >= 4 ? (
                    <Button
                      className="w-full bg-emerald-800 hover:bg-emerald-900 rounded-xl"
                      onClick={handleComplete}
                    >
                      Save & mark simulation complete
                    </Button>
                  ) : (
                    <>
                      <p className="text-xs text-emerald-800">
                        You need at least 4 right to lock this in. Replay the round.
                      </p>
                      <Button
                        variant="outline"
                        className="rounded-xl border-emerald-300"
                        onClick={handleReplay}
                      >
                        Replay scenarios
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CcBccSimulatorActivity;
