import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Baby,
  Bot,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Lock,
  Moon,
  PartyPopper,
  RotateCcw,
  Send,
  Sparkles,
  User,
  UserRound,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import {
  PHIL_AGE_ORDER,
  TEACH_BACK_MAX_TURNS,
  TEACH_BACK_OPT_UP_BONUS_BAMBOO_PER_TIER,
  TEACH_BACK_PASS_THRESHOLDS,
} from '@/types/teach-back';
import type { PhilAge, TeachBackSpec } from '@/types/teach-back';
import { useTeachPhilSession } from '@/hooks/useTeachPhilSession';
import type { TeachPhilResult } from '@/hooks/useTeachPhilSession';

/**
 * The optional Teach Phil teach-back panel, shared by every lesson system
 * (Village/market-intelligence and personal-finance). Callers derive the
 * concept spec for their lesson shape — see src/lib/teach-back-spec.ts.
 */
interface Props {
  lessonId: string;
  spec: TeachBackSpec;
  defaultPhilAge: PhilAge;
  onComplete: (result: TeachPhilResult) => void;
}

const PERSONA_META: Record<PhilAge, { name: string; icon: React.ElementType; blurb: string }> = {
  cub:   { name: 'Cub Phil',   icon: Baby,      blurb: 'Explain it super simply — no jargon allowed.' },
  teen:  { name: 'Teen Phil',  icon: UserRound, blurb: 'Wants the idea and a real-world example.' },
  elder: { name: 'Elder Phil', icon: User,      blurb: 'Will push on what-ifs and edge cases.' },
};

const TeachPhilPanel: React.FC<Props> = ({ lessonId, spec, defaultPhilAge, onComplete }) => {
  const {
    phase, turn, attempt, chatLog, assessment,
    isThinking, sendError, passThreshold, choosePersona, sendMessage,
    startFreshAttempt, buildResult, buildSkipResult,
  } = useTeachPhilSession({ lessonId, spec, defaultPhilAge });

  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const score = assessment?.understandingScore ?? 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, isThinking]);

  useEffect(() => {
    if (phase === 'passed') {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
    }
  }, [phase]);

  const handleSend = async () => {
    const delivered = await sendMessage(input);
    if (delivered) setInput('');
  };

  const finish = () => onComplete(buildResult());
  const skip = () => onComplete(buildSkipResult());

  /* ─── Shared: step banner ─── */
  const banner = (
    <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-4 mb-4">
      <div className="flex items-start gap-3">
        <GraduationCap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-1">Teach It Back</h3>
          <p className="text-sm text-muted-foreground">
            The best way to master something is to teach it. Explain{' '}
            <span className="font-medium text-foreground">{spec.conceptName}</span> to Phil in your own words — or skip if you'd rather move on.
          </p>
        </div>
      </div>
    </div>
  );

  const skipButton = (
    <Button variant="ghost" onClick={skip} className="w-full text-muted-foreground">
      Skip this step
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  );

  /* ─── Shared: understanding meter ─── */
  const meter = (
    <div className="bg-muted/30 rounded-xl p-3">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs font-medium text-foreground">Phil's Understanding</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium">{score}%</span>
          <span>·</span>
          <span>Turn {turn} of {TEACH_BACK_MAX_TURNS}</span>
          {attempt > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              Fresh attempt
            </span>
          )}
        </div>
      </div>
      <div className="relative h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700 ease-out',
            score >= passThreshold ? 'bg-primary' : score >= 40 ? 'bg-amber-500' : 'bg-muted-foreground/40',
          )}
          style={{ width: `${score}%` }}
        />
        <div
          className="absolute top-0 h-full w-0.5 bg-foreground/40"
          style={{ left: `${passThreshold}%` }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground mt-1 text-right">
        Phil gets it at {passThreshold}%
      </p>
    </div>
  );

  /* ══ GUEST ══ */
  if (phase === 'guest') {
    return (
      <div className="space-y-4">
        {banner}
        <div className="bg-muted/30 rounded-xl p-6 text-center">
          <Bot className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-medium mb-1">Sign in to teach Phil</h3>
          <p className="text-sm text-muted-foreground">
            Phil only learns from students with an account. Sign in next time to teach him and grow your Teaching Pagoda.
          </p>
        </div>
        <Button onClick={finish} className="w-full h-12 text-base">
          Continue to Reward
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  /* ══ PICKER ══ */
  if (phase === 'picker') {
    return (
      <div className="space-y-4">
        {banner}
        <div>
          <h3 className="font-medium mb-3">Who are you teaching today?</h3>
          <div className="space-y-2">
            {PHIL_AGE_ORDER.map((age) => {
              const meta = PERSONA_META[age];
              const Icon = meta.icon;
              const locked = PHIL_AGE_ORDER.indexOf(age) < PHIL_AGE_ORDER.indexOf(defaultPhilAge);
              const bonusSteps = PHIL_AGE_ORDER.indexOf(age) - PHIL_AGE_ORDER.indexOf(defaultPhilAge);
              const bonus = bonusSteps > 0 ? bonusSteps * TEACH_BACK_OPT_UP_BONUS_BAMBOO_PER_TIER : 0;
              return (
                <button
                  key={age}
                  disabled={locked}
                  onClick={() => choosePersona(age)}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all',
                    locked
                      ? 'bg-muted/20 border-border opacity-50 cursor-not-allowed'
                      : 'bg-background border-border hover:border-primary/50 hover:bg-primary/5',
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{meta.name}</p>
                    <p className="text-xs text-muted-foreground">{meta.blurb}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {locked ? (
                      <Lock className="w-4 h-4 text-muted-foreground ml-auto" />
                    ) : (
                      <>
                        <p className="text-[11px] text-muted-foreground">Passes at {TEACH_BACK_PASS_THRESHOLDS[age]}%</p>
                        {bonus > 0 && <p className="text-xs font-medium text-primary">+{bonus} bamboo bonus</p>}
                        {age === defaultPhilAge && <p className="text-[11px] font-medium text-primary">Recommended</p>}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {skipButton}
      </div>
    );
  }

  /* ══ RECAP (attempt 1 exhausted) ══ */
  if (phase === 'recap') {
    return (
      <div className="space-y-4">
        {banner}
        <div className="bg-muted/30 rounded-xl p-4 flex gap-3">
          <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            I think I need to re-read this one with you — let's go over it together one more time. Here's what I'm still fuzzy on:
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-4 space-y-2">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wider">Still fuzzy on</p>
          {(assessment?.keyFactsMissing.length ? assessment.keyFactsMissing : spec.keyFacts).map((fact, i) => (
            <p key={i} className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed pl-3 border-l-2 border-amber-300">
              {fact}
            </p>
          ))}
        </div>
        <Button onClick={startFreshAttempt} className="w-full h-12 text-base">
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Teaching Phil Again
        </Button>
        {skipButton}
      </div>
    );
  }

  /* ══ TERMINAL STATES: passed / exhausted / quota / unavailable ══ */
  if (phase !== 'chatting') {
    const cards: Record<string, { icon: React.ElementType; title: string; body: string }> = {
      passed: {
        icon: PartyPopper,
        title: 'Phil gets it!',
        body: `"Now I actually understand ${spec.conceptName}. You're a great teacher — explaining something to someone else is the best way to master it yourself."`,
      },
      exhausted: {
        icon: Sparkles,
        title: 'Phil learned a lot from you',
        body: `"I didn't get all of it, but you taught me so much about ${spec.conceptName}. Let's claim your reward — we can always talk it through again later."`,
      },
      quota: {
        icon: Moon,
        title: 'Phil needs a break',
        body: '"I\'ve learned so much today that my head is spinning. Come back tomorrow to keep teaching me — you can still claim your lesson reward."',
      },
      unavailable: {
        icon: Moon,
        title: 'Phil is unreachable right now',
        body: '"Phil couldn\'t be reached. Continue to your reward and come back to teach him anytime."',
      },
    };
    const card = cards[phase];
    const Icon = card.icon;
    return (
      <div className="space-y-4">
        {banner}
        {phase === 'passed' && meter}
        <div className={cn(
          'rounded-xl p-6 text-center',
          phase === 'passed'
            ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20'
            : 'bg-muted/30',
        )}>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold mb-2">{card.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
        </div>
        <Button onClick={finish} className="w-full h-12 text-base">
          Claim Your Reward
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  /* ══ CHATTING ══ */
  return (
    <div className="space-y-3">
      {banner}
      {meter}

      {/* Chat log */}
      <div className="bg-background border border-border rounded-xl p-3 space-y-3 max-h-72 overflow-y-auto">
        {chatLog.map((entry) => (
          <div key={entry.id} className={cn('flex', entry.sender === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[85%] flex gap-2', entry.sender === 'user' && 'flex-row-reverse')}>
              {entry.sender === 'phil' && (
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className={cn(
                'p-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap',
                entry.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
              )}>
                {entry.text}
              </div>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Phil is thinking...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {sendError && (
        <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2">
          {sendError}
        </p>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={`Explain ${spec.conceptName} in your own words...`}
          rows={2}
          disabled={isThinking}
          className="flex-1 resize-none rounded-lg border border-border bg-background focus:border-primary focus:outline-none p-3 text-sm disabled:opacity-50"
        />
        <Button
          onClick={handleSend}
          disabled={isThinking || !input.trim()}
          className="px-4 self-stretch"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {skipButton}
      {assessment?.readyToPass === false && score >= passThreshold - 10 && (
        <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Almost there — Phil just needs a little more
        </p>
      )}
    </div>
  );
};

export default TeachPhilPanel;
