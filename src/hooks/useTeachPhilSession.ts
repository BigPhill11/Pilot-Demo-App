/**
 * Teach Phil session state machine.
 *
 * Drives the required post-quiz teach-back step: the student explains the
 * lesson's concept to Phil, the TeachPhil Edge Function grades each turn,
 * and the session ends by passing, exhausting both attempts, hitting the
 * daily quota, or the function being unreachable. The last three still let
 * the student finish the lesson (fail-open, matching the Edge Function's own
 * philosophy) — they just earn no opt-up bonus and no Pagoda credit.
 */

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { VillageLesson } from '@/types/village-lesson';
import { getPhilAge, getTeachBackSpec } from '@/lib/teach-back-spec';
import {
  PHIL_AGE_ORDER,
  TEACH_BACK_MAX_ATTEMPTS,
  TEACH_BACK_MAX_TURNS,
  TEACH_BACK_OPT_UP_BONUS_BAMBOO_PER_TIER,
  TEACH_BACK_PASS_THRESHOLDS,
} from '@/types/teach-back';
import type { PhilAge, TeachBackAssessment } from '@/types/teach-back';

export type TeachPhilOutcome =
  | 'passed'
  | 'completed-after-fallback'
  | 'skipped-unavailable'
  | 'skipped-quota'
  | 'skipped-guest';

/** What the teach step hands back to the lesson shell when it's done */
export interface TeachPhilResult {
  outcome: TeachPhilOutcome;
  optUpBonusBamboo: number;
  teachBacksCompleted: number | null;
}

export type TeachPhilPhase =
  | 'picker'      // choosing Phil's tier (opt-up only)
  | 'chatting'    // active teach-back turns
  | 'recap'       // attempt 1 exhausted — show missing facts, offer retry
  | 'passed'      // Phil gets it!
  | 'exhausted'   // both attempts exhausted — supportive continue
  | 'quota'       // daily turn limit reached mid-session
  | 'unavailable' // repeated network/function errors
  | 'guest';      // not signed in — can't reach the function

export interface TeachPhilChatEntry {
  id: string;
  sender: 'user' | 'phil';
  text: string;
}

/** Window event fired when the server reports a new teach_backs_completed count */
export const TEACH_BACKS_UPDATED_EVENT = 'teach-backs-updated';

const MAX_CONSECUTIVE_ERRORS = 2;

let entryId = 0;
const nextEntryId = () => `teach-${++entryId}`;

const openerFor = (age: PhilAge, conceptName: string): string => {
  switch (age) {
    case 'cub':
      return `You just learned about ${conceptName}?? I have NO idea what that is. Can you explain it to me in really simple words, like you're talking to a little cub? 🐼`;
    case 'elder':
      return `Ah, ${conceptName}... I knew it well once, but my memory is rusty. Teach it back to me properly — and be ready, I may poke at the tricky parts. 🐼`;
    default:
      return `Okay, I sort of get what ${conceptName} is, but not really. Can you explain it to me like I'm your friend? What even IS it? 🐼`;
  }
};

export function useTeachPhilSession(lesson: VillageLesson) {
  const spec = getTeachBackSpec(lesson);
  const defaultPhilAge = getPhilAge(lesson);

  const [phase, setPhase] = useState<TeachPhilPhase>('picker');
  const [philAge, setPhilAge] = useState<PhilAge>(defaultPhilAge);
  const [turn, setTurn] = useState(1);
  const [attempt, setAttempt] = useState(1);
  const [flaggedEarlier, setFlaggedEarlier] = useState(false);
  const [chatLog, setChatLog] = useState<TeachPhilChatEntry[]>([]);
  const [assessment, setAssessment] = useState<TeachBackAssessment | null>(null);
  const [teachBacksCompleted, setTeachBacksCompleted] = useState<number | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);

  // Guests can never reach the function (gateway verify_jwt) — show the
  // sign-in nudge instead of a dead-end error path.
  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!cancelled && !session) setPhase('guest');
    });
    return () => { cancelled = true; };
  }, []);

  const optUpSteps = Math.max(
    0,
    PHIL_AGE_ORDER.indexOf(philAge) - PHIL_AGE_ORDER.indexOf(defaultPhilAge),
  );
  const optUpBonusBamboo = optUpSteps * TEACH_BACK_OPT_UP_BONUS_BAMBOO_PER_TIER;
  const passThreshold = TEACH_BACK_PASS_THRESHOLDS[philAge];

  const choosePersona = useCallback((age: PhilAge) => {
    // Opting down below the lesson default is not allowed
    if (PHIL_AGE_ORDER.indexOf(age) < PHIL_AGE_ORDER.indexOf(defaultPhilAge)) return;
    setPhilAge(age);
    setChatLog([{ id: nextEntryId(), sender: 'phil', text: openerFor(age, spec.conceptName) }]);
    setPhase('chatting');
  }, [defaultPhilAge, spec.conceptName]);

  /** Returns true if the message was delivered (component clears its input on true) */
  const sendMessage = useCallback(async (rawText: string): Promise<boolean> => {
    const text = rawText.trim();
    if (!text || isThinking || phase !== 'chatting') return false;

    setSendError(null);
    setIsThinking(true);
    const userEntry: TeachPhilChatEntry = { id: nextEntryId(), sender: 'user', text };
    setChatLog((prev) => [...prev, userEntry]);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke('TeachPhil', {
        body: {
          message: text,
          lessonId: lesson.id,
          conceptName: spec.conceptName,
          philAge,
          turnNumber: turn,
          attempt,
          flaggedEarlier,
          keyFacts: spec.keyFacts,
          misconceptions: spec.misconceptions,
          history: chatLog.map((entry) => ({ role: entry.sender, content: entry.text })),
        },
        headers: session?.access_token
          ? { Authorization: `Bearer ${session.access_token}` }
          : undefined,
      });

      if (error) throw new Error((data as { error?: string } | null)?.error || error.message);

      if (data?.error) {
        if (data.limitReached) {
          setPhase('quota');
          return true;
        }
        throw new Error(data.error);
      }

      const result = data as TeachBackAssessment & { teachBacksCompleted: number | null };
      setConsecutiveErrors(0);
      setAssessment(result);
      if (result.flaggedAsCopiedText) setFlaggedEarlier(true);
      setChatLog((prev) => [...prev, { id: nextEntryId(), sender: 'phil', text: result.philSays }]);

      if (result.readyToPass) {
        if (typeof result.teachBacksCompleted === 'number') {
          setTeachBacksCompleted(result.teachBacksCompleted);
          window.dispatchEvent(new CustomEvent(TEACH_BACKS_UPDATED_EVENT, {
            detail: { teachBacksCompleted: result.teachBacksCompleted },
          }));
        }
        setPhase('passed');
      } else if (turn >= TEACH_BACK_MAX_TURNS) {
        setPhase(attempt >= TEACH_BACK_MAX_ATTEMPTS ? 'exhausted' : 'recap');
      } else {
        setTurn((t) => t + 1);
      }
      return true;
    } catch (err) {
      console.error('TeachPhil send error:', err);
      // Roll the optimistic user bubble back so a retry doesn't pollute history
      setChatLog((prev) => prev.filter((entry) => entry.id !== userEntry.id));
      const errors = consecutiveErrors + 1;
      setConsecutiveErrors(errors);
      if (errors >= MAX_CONSECUTIVE_ERRORS) {
        setPhase('unavailable');
      } else {
        setSendError('Phil got distracted for a second — try sending that again.');
      }
      return false;
    } finally {
      setIsThinking(false);
    }
  }, [attempt, chatLog, consecutiveErrors, flaggedEarlier, isThinking, lesson.id, phase, philAge, spec, turn]);

  /** Recap → one fresh attempt: turn counter and chat reset, flaggedEarlier sticks */
  const startFreshAttempt = useCallback(() => {
    setAttempt(TEACH_BACK_MAX_ATTEMPTS);
    setTurn(1);
    setAssessment(null);
    setSendError(null);
    setChatLog([{ id: nextEntryId(), sender: 'phil', text: openerFor(philAge, spec.conceptName) }]);
    setPhase('chatting');
  }, [philAge, spec.conceptName]);

  const buildResult = useCallback((): TeachPhilResult => {
    const outcome: TeachPhilOutcome =
      phase === 'passed' ? 'passed' :
      phase === 'exhausted' ? 'completed-after-fallback' :
      phase === 'quota' ? 'skipped-quota' :
      phase === 'guest' ? 'skipped-guest' :
      'skipped-unavailable';
    return {
      outcome,
      // Bonus bamboo only for a genuine pass — skipped/fallback outcomes keep
      // the base lesson reward but earn nothing extra
      optUpBonusBamboo: outcome === 'passed' ? optUpBonusBamboo : 0,
      teachBacksCompleted,
    };
  }, [optUpBonusBamboo, phase, teachBacksCompleted]);

  return {
    spec,
    defaultPhilAge,
    phase,
    philAge,
    turn,
    attempt,
    chatLog,
    assessment,
    isThinking,
    sendError,
    passThreshold,
    optUpBonusBamboo,
    teachBacksCompleted,
    choosePersona,
    sendMessage,
    startFreshAttempt,
    buildResult,
  };
}
