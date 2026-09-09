/**
 * Records which answer a student picked on each scenario question.
 *
 * The quizzes throughout the app already know everything a teacher needs —
 * which option was chosen, which was right, how long it took — and until now
 * threw all of it away on unmount, keeping only a score. This posts the item
 * rows to `assessment_responses` so `teacher_get_question_breakdown` can tell a
 * teacher that six students picked the same wrong option, rather than only that
 * six students got the question wrong.
 *
 * Telemetry is never allowed to interfere with a lesson: every failure here is
 * swallowed, and signed-out players simply record nothing.
 */

import { supabase } from '@/integrations/supabase/client';

/** Which instrument produced the answer. Only lesson_quiz is wired today; the
 *  rest are the vocabulary the pre/post spec expects. */
export type Instrument = 'lesson_quiz' | 'pre_test' | 'post_test' | 'test_out' | 'checkpoint';

export interface QuizContext {
  /** Matches module_progress.module_type: 'personal-finance', 'economics', … */
  moduleType: string;
  moduleId?: string | null;
  lessonId: string;
  instrument?: Instrument;
}

export interface QuizResponse {
  /** Stable within a lesson. Village questions have real ids; PF and economics
   *  questions are positional, so those callers pass `${lessonId}#${index}`. */
  itemId: string;
  itemIndex: number;
  prompt: string;
  selectedKey: string;
  selectedLabel: string;
  correctKey: string;
  correctLabel: string;
  isCorrect: boolean;
  msElapsed?: number;
}

const db = supabase as unknown as {
  rpc: (fn: string, args?: Record<string, unknown>) => Promise<{ error: { message: string } | null }>;
};

function newAttemptId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Older WebViews (Capacitor on old Android) lack randomUUID.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

async function isSignedIn(): Promise<boolean> {
  try {
    const { data } = await supabase.auth.getSession();
    return !!data.session?.user;
  } catch {
    return false;
  }
}

export async function recordQuizResponses(
  context: QuizContext,
  responses: QuizResponse[],
  attemptId: string
): Promise<void> {
  if (responses.length === 0) return;
  if (!(await isSignedIn())) return;

  const entries = responses.map((r) => ({
    attempt_id: attemptId,
    instrument: context.instrument ?? 'lesson_quiz',
    module_type: context.moduleType,
    module_id: context.moduleId ?? null,
    lesson_id: context.lessonId,
    item_id: r.itemId,
    item_index: r.itemIndex,
    prompt: r.prompt,
    selected_key: r.selectedKey,
    selected_label: r.selectedLabel,
    correct_key: r.correctKey,
    correct_label: r.correctLabel,
    is_correct: r.isCorrect,
    ms_elapsed: r.msElapsed ?? null,
  }));

  try {
    const { error } = await db.rpc('record_assessment_responses', { p_entries: entries });
    if (error && import.meta.env.DEV) {
      console.warn('[quizTelemetry] could not record responses:', error.message);
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[quizTelemetry] record failed:', err);
  }
}

/**
 * Collects answers across one run of a quiz and posts them in a single write.
 *
 * Buffering to the end rather than writing per question keeps a slow network
 * from stalling the question transition, and means one attempt is one round
 * trip. The attempt id makes the write idempotent, so a double-fire on the
 * completion handler cannot double-count.
 */
export function createQuizRecorder(context: QuizContext) {
  let attemptId = newAttemptId();
  let buffer: QuizResponse[] = [];
  let questionShownAt = Date.now();
  let flushed = false;

  return {
    get attemptId() {
      return attemptId;
    },
    /** Call when the student's answer to the current question is locked in. */
    record(response: Omit<QuizResponse, 'msElapsed'> & { msElapsed?: number }) {
      buffer.push({
        ...response,
        msElapsed: response.msElapsed ?? Date.now() - questionShownAt,
      });
      questionShownAt = Date.now();
    },
    /** Call once when the quiz finishes. Safe to call more than once. */
    flush() {
      if (flushed || buffer.length === 0) return;
      flushed = true;
      void recordQuizResponses(context, buffer, attemptId);
    },
    /**
     * Send what has been answered so far and begin a new attempt.
     *
     * Quizzes that let a student retry after failing would otherwise replay the
     * same attempt id, and the idempotency constraint would discard the second
     * set of answers — losing exactly the evidence that the student improved.
     */
    reset() {
      this.flush();
      attemptId = newAttemptId();
      buffer = [];
      questionShownAt = Date.now();
      flushed = false;
    },
  };
}

export type QuizRecorder = ReturnType<typeof createQuizRecorder>;
