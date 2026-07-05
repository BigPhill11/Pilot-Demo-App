import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, GraduationCap, Loader2, Lock, RotateCcw, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { VillageLesson } from '@/types/village-lesson';
import {
  PHIL_AGE_ORDER,
  TEACH_BACK_MAX_TURNS,
  TEACH_BACK_OPT_UP_BONUS_BAMBOO_PER_TIER,
  TEACH_BACK_PASS_THRESHOLDS,
} from '@/types/teach-back';
import type { PhilAge } from '@/types/teach-back';
import { useTeachPhilSession } from '@/hooks/useTeachPhilSession';
import type { TeachPhilResult } from '@/hooks/useTeachPhilSession';

interface Props {
  lesson: VillageLesson;
  onComplete: (result: TeachPhilResult) => void;
}

const PERSONA_META: Record<PhilAge, { name: string; emoji: string; blurb: string }> = {
  cub:   { name: 'Cub Phil',   emoji: '🐼', blurb: 'Explain it super simply — no big words!' },
  teen:  { name: 'Teen Phil',  emoji: '🎧', blurb: 'Wants the idea AND a real example.' },
  elder: { name: 'Elder Phil', emoji: '🧓', blurb: 'Will poke at what-ifs and edge cases.' },
};

/** Meter fill color by score vs threshold */
const meterColor = (score: number, threshold: number) =>
  score >= threshold ? 'bg-green-600' : score >= 40 ? 'bg-amber-500' : 'bg-red-400';

const VillageTeachPhilStep: React.FC<Props> = ({ lesson, onComplete }) => {
  const {
    spec, defaultPhilAge, phase, philAge, turn, attempt, chatLog, assessment,
    isThinking, sendError, passThreshold, choosePersona, sendMessage,
    startFreshAttempt, buildResult,
  } = useTeachPhilSession(lesson);

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

  /* ─── Shared: step banner ─── */
  const banner = (
    <div className="flex items-center gap-2.5 p-3 mb-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
      <GraduationCap className="h-5 w-5 text-emerald-600 flex-shrink-0" />
      <div>
        <p className="text-xs font-bold text-emerald-800">Teach It Back</p>
        <p className="text-[11px] text-emerald-600">
          Explain <span className="font-semibold">{spec.conceptName}</span> to Phil in your own words — he can't finish the lesson without you!
        </p>
      </div>
    </div>
  );

  /* ─── Shared: understanding meter ─── */
  const meter = (
    <div className="bg-white rounded-2xl border-2 border-emerald-100 p-3 shadow-sm">
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[11px] font-bold text-emerald-700">🐼 Phil's Understanding</p>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-600">{score}%</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
            Turn {turn} of {TEACH_BACK_MAX_TURNS}
          </span>
          {attempt > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
              Fresh attempt
            </span>
          )}
        </div>
      </div>
      <div className="relative h-3 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${meterColor(score, passThreshold)}`}
          style={{ width: `${score}%` }}
        />
        {/* Pass threshold tick */}
        <div
          className="absolute top-0 h-full w-0.5 bg-emerald-800/60"
          style={{ left: `${passThreshold}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-400 mt-1 text-right">
        Phil gets it at {passThreshold}%
      </p>
    </div>
  );

  /* ══ GUEST ══ */
  if (phase === 'guest') {
    return (
      <div className="space-y-4">
        {banner}
        <div className="rounded-2xl bg-white border-2 border-emerald-200 p-5 text-center shadow-sm">
          <div className="text-4xl mb-2">🐼</div>
          <h3 className="text-lg font-bold text-gray-800">Sign in to teach Phil!</h3>
          <p className="text-sm text-gray-600 mt-1">
            Phil only learns from students with an account. Sign in next time to teach him and grow your Teaching Pagoda!
          </p>
        </div>
        <Button onClick={finish} className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl text-base font-semibold shadow-md">
          Continue to Reward <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    );
  }

  /* ══ PICKER ══ */
  if (phase === 'picker') {
    return (
      <div className="space-y-4">
        {banner}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Who are you teaching today?</p>
          </div>
          <div className="p-3 space-y-2">
            {PHIL_AGE_ORDER.map((age) => {
              const meta = PERSONA_META[age];
              const locked = PHIL_AGE_ORDER.indexOf(age) < PHIL_AGE_ORDER.indexOf(defaultPhilAge);
              const bonusSteps = PHIL_AGE_ORDER.indexOf(age) - PHIL_AGE_ORDER.indexOf(defaultPhilAge);
              const bonus = bonusSteps > 0 ? bonusSteps * TEACH_BACK_OPT_UP_BONUS_BAMBOO_PER_TIER : 0;
              return (
                <button
                  key={age}
                  disabled={locked}
                  onClick={() => choosePersona(age)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    locked
                      ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed'
                      : 'bg-emerald-50 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100'
                  }`}
                >
                  <span className="text-2xl">{meta.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{meta.name}</p>
                    <p className="text-[11px] text-gray-500">{meta.blurb}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {locked ? (
                      <Lock className="h-4 w-4 text-gray-400 ml-auto" />
                    ) : (
                      <>
                        <p className="text-[10px] text-gray-400">Gets it at {TEACH_BACK_PASS_THRESHOLDS[age]}%</p>
                        {bonus > 0 && <p className="text-[11px] font-bold text-green-600">+{bonus} 🎋 bonus</p>}
                        {age === defaultPhilAge && <p className="text-[10px] font-semibold text-emerald-600">Recommended</p>}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ══ RECAP (attempt 1 exhausted) ══ */
  if (phase === 'recap') {
    return (
      <div className="space-y-4">
        {banner}
        <div className="flex gap-3 p-4 bg-white rounded-2xl border-2 border-blue-100 shadow-sm">
          <span className="text-2xl flex-shrink-0">🐼</span>
          <div>
            <p className="text-[11px] font-bold text-blue-700 mb-1">Phil says:</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              I think I need to re-read this one with you — let's go over it together one more time! Here's what I'm still fuzzy on:
            </p>
          </div>
        </div>
        <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-4 space-y-2">
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Phil is still fuzzy on</p>
          {(assessment?.keyFactsMissing.length ? assessment.keyFactsMissing : spec.keyFacts).map((fact, i) => (
            <div key={i} className="flex gap-2 items-start p-2 rounded-xl bg-white border border-amber-100">
              <span className="text-amber-500 text-sm">•</span>
              <p className="text-xs text-amber-900 leading-relaxed">{fact}</p>
            </div>
          ))}
        </div>
        <Button
          onClick={startFreshAttempt}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl text-base font-semibold shadow-md"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Try Teaching Phil Again
        </Button>
      </div>
    );
  }

  /* ══ TERMINAL STATES: passed / exhausted / quota / unavailable ══ */
  if (phase !== 'chatting') {
    const cards: Record<string, { emoji: string; title: string; body: string }> = {
      passed: {
        emoji: '🎉',
        title: 'Phil gets it!',
        body: `"OHHH, now I totally understand ${spec.conceptName}! You're a great teacher — teaching someone else is the best way to master something yourself. 🐼"`,
      },
      exhausted: {
        emoji: '💚',
        title: 'Phil learned a ton from you!',
        body: `"Whew, my panda brain is full! I didn't get ALL of it, but you taught me so much about ${spec.conceptName}. Let's claim your reward — we can always chat again later!"`,
      },
      quota: {
        emoji: '😴',
        title: 'Phil is all tuckered out!',
        body: '"I\'ve learned SO much today my head is spinning! Come back tomorrow to keep teaching me. You can still claim your lesson reward!"',
      },
      unavailable: {
        emoji: '💤',
        title: 'Phil is napping right now',
        body: '"Zzz... Phil couldn\'t be reached. You can continue to your reward and come back to teach him anytime!"',
      },
    };
    const card = cards[phase];
    return (
      <div className="space-y-4">
        {banner}
        {phase === 'passed' && meter}
        <div className={`rounded-2xl p-5 text-center shadow-sm border-2 ${
          phase === 'passed'
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
            : 'bg-white border-gray-200'
        }`}>
          <div className="text-4xl mb-2">{card.emoji}</div>
          <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{card.body}</p>
        </div>
        <Button onClick={finish} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 rounded-xl text-base font-bold shadow-lg">
          Claim Your Reward <ChevronRight className="ml-2 h-5 w-5" />
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
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 space-y-3 max-h-72 overflow-y-auto">
        {chatLog.map((entry) => (
          <div key={entry.id} className={`flex ${entry.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-2 ${entry.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              {entry.sender === 'phil' && <span className="text-xl flex-shrink-0 mt-0.5">🐼</span>}
              <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                entry.sender === 'user'
                  ? 'bg-green-600 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}>
                {entry.text}
              </div>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <span className="text-xl">🐼</span>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Phil is thinking...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {sendError && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">{sendError}</p>
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
          placeholder={`Teach Phil about ${spec.conceptName} in your own words...`}
          rows={2}
          disabled={isThinking}
          className="flex-1 resize-none rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none p-3 text-sm disabled:opacity-50"
        />
        <Button
          onClick={handleSend}
          disabled={isThinking || !input.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 self-stretch"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VillageTeachPhilStep;
