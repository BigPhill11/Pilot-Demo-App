import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GripVertical, Mail, Sparkles } from 'lucide-react';
import type { EmailActivityProps } from './types';

interface InboxEmail {
  id: string;
  sender: string;
  subject: string;
  time: string;
  why: string;
}

const EMAILS: InboxEmail[] = [
  {
    id: 'e1',
    sender: 'Maria — Greenfield Capital',
    subject: '10-min intro call?',
    time: 'Tue 9:14 AM',
    why: 'Mid-week morning — peak open rate.',
  },
  {
    id: 'e2',
    sender: 'Jamie — Partners LLC',
    subject: 'Quick question on the role',
    time: 'Wed 10:02 AM',
    why: 'Wednesday mid-morning — still prime inbox time.',
  },
  {
    id: 'e3',
    sender: 'Alex Park',
    subject: 'Following up after our chat',
    time: 'Thu 8:48 AM',
    why: 'Early Thursday — strong, but week-end fatigue creeps in.',
  },
  {
    id: 'e4',
    sender: 'Sam Chen',
    subject: 'Coffee chat next month?',
    time: 'Mon 7:32 AM',
    why: 'Monday before the workday — often buried under weekend backlog.',
  },
  {
    id: 'e5',
    sender: 'Dr. Rivera',
    subject: 'Article you mentioned',
    time: 'Fri 4:18 PM',
    why: 'Friday afternoon — most professionals are checked out.',
  },
  {
    id: 'e6',
    sender: 'Jordan Lee',
    subject: 'Reaching out about the firm',
    time: 'Sun 11:47 PM',
    why: 'Sunday night — buried under Monday-morning triage.',
  },
];

const IDEAL_ORDER = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'];

const emailById = (id: string) => EMAILS.find((e) => e.id === id)!;

const TimingPickerActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  isActivityComplete,
}) => {
  const initialOrder: string[] = useMemo(() => {
    const saved = answers.timingRankingResult;
    if (saved && saved.length === EMAILS.length && saved.every((id) => EMAILS.some((e) => e.id === id))) {
      return saved;
    }
    // shuffle once per mount when no save exists
    return [...EMAILS.map((e) => e.id)].sort(() => Math.random() - 0.5);
  }, [answers.timingRankingResult]);

  const [order, setOrder] = useState<string[]>(initialOrder);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // persist if we initialized a shuffled order with no prior save
    if (!answers.timingRankingResult) {
      onUpdateAnswers({ timingRankingResult: initialOrder });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (next: string[]) => {
    setOrder(next);
    onUpdateAnswers({ timingRankingResult: next });
  };

  const moveBy = (id: string, delta: -1 | 1) => {
    const idx = order.indexOf(id);
    const target = idx + delta;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[idx], next[target]] = [next[target], next[idx]];
    persist(next);
  };

  const score = useMemo(() => {
    return order.reduce((acc, id, idx) => {
      const ideal = IDEAL_ORDER.indexOf(id);
      return acc + (Math.abs(ideal - idx) <= 1 ? 1 : 0);
    }, 0);
  }, [order]);

  const handleReveal = () => setRevealed(true);

  const handleComplete = () => {
    confetti({ particleCount: 60, spread: 65, origin: { y: 0.7 } });
    onComplete();
  };

  const displayOrder = revealed ? IDEAL_ORDER : order;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Drag the inbox so the email <strong>most likely to be seen first</strong> sits at the top.
        </p>
        <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-800 shrink-0">
          {score}/{EMAILS.length} close
        </Badge>
      </div>

      {isActivityComplete && (
        <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">
          Saved — edit any time
        </Badge>
      )}

      <Card className="rounded-xl border-emerald-100 bg-emerald-50/30">
        <CardContent className="p-3 text-xs text-emerald-900 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Recruiter inbox · ranked top-to-bottom by likely visibility
        </CardContent>
      </Card>

      {!revealed ? (
        <Reorder.Group
          axis="y"
          values={order}
          onReorder={persist}
          className="space-y-2 list-none p-0"
        >
          {order.map((id, idx) => {
            const email = emailById(id);
            return (
              <Reorder.Item
                key={id}
                value={id}
                className="rounded-xl border border-emerald-100 bg-white shadow-sm p-3 cursor-grab active:cursor-grabbing"
                whileDrag={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold truncate">{email.sender}</p>
                      <span className="text-xs text-muted-foreground shrink-0">{email.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{email.subject}</p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      aria-label="Move up"
                      className="w-7 h-7 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold disabled:opacity-30"
                      onClick={() => moveBy(id, -1)}
                      disabled={idx === 0}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      className="w-7 h-7 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold disabled:opacity-30"
                      onClick={() => moveBy(id, 1)}
                      disabled={idx === order.length - 1}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      ) : (
        <ul className="space-y-2 list-none p-0">
          <AnimatePresence>
            {displayOrder.map((id, idx) => {
              const email = emailById(id);
              return (
                <motion.li
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.25 }}
                  className="rounded-xl border border-emerald-200 bg-white shadow-sm p-3"
                >
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-800 text-white shrink-0 w-7 h-7 rounded-full flex items-center justify-center p-0">
                      {idx + 1}
                    </Badge>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold truncate">{email.sender}</p>
                        <span className="text-xs text-muted-foreground shrink-0">{email.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{email.subject}</p>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.06 + 0.2 }}
                        className="text-xs text-emerald-800 mt-1"
                      >
                        {email.why}
                      </motion.span>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}

      <div className="flex flex-col gap-2">
        {!revealed ? (
          <Button
            variant="outline"
            className="rounded-xl border-emerald-300"
            onClick={handleReveal}
          >
            Reveal correct order
          </Button>
        ) : (
          <>
            <div
              className={`rounded-xl p-4 text-sm ${
                score >= 4
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border border-amber-200 text-amber-900'
              }`}
            >
              <p className="font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {score >= 4
                  ? `${score} of ${EMAILS.length} within one spot — you read the inbox like a pro.`
                  : `${score} of ${EMAILS.length} within one spot. Re-rank and try again.`}
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setRevealed(false)}
            >
              Re-rank the inbox
            </Button>
            <Button
              className="bg-emerald-800 hover:bg-emerald-900 rounded-xl"
              disabled={score < 4}
              onClick={handleComplete}
            >
              {score >= 4 ? 'Save & mark simulation complete' : 'Need at least 4 close to continue'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimingPickerActivity;
