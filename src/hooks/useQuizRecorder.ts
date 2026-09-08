import { useEffect, useRef } from 'react';
import { createQuizRecorder, type QuizContext, type QuizRecorder } from '@/lib/quizTelemetry';

/**
 * Holds one quiz recorder for the life of a quiz attempt.
 *
 * Callers pass the context as an inline object, so the recorder is keyed on the
 * lesson rather than on object identity — otherwise every render would start a
 * fresh attempt and drop the answers buffered so far. Passing `undefined`
 * disables recording, which keeps the telemetry optional for the quiz surfaces
 * that have no lesson context to attribute answers to.
 */
export function useQuizRecorder(context: QuizContext | undefined): QuizRecorder | null {
  const key = context ? `${context.moduleType}:${context.lessonId}:${context.instrument ?? ''}` : null;
  const keyRef = useRef<string | null>(null);
  const recorderRef = useRef<QuizRecorder | null>(null);

  if (key && context && keyRef.current !== key) {
    keyRef.current = key;
    recorderRef.current = createQuizRecorder(context);
  }
  if (!key) {
    keyRef.current = null;
    recorderRef.current = null;
  }

  // A student who abandons a quiz half way still tells you something: the
  // questions they did answer are the ones they saw.
  useEffect(() => {
    const recorder = recorderRef.current;
    return () => recorder?.flush();
  }, [key]);

  return recorderRef.current;
}
