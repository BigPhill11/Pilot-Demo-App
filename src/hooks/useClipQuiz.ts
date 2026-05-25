import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { ClipQuizQuestion } from '@/types/phils-friends';

export function useClipQuiz(clipId: string | null) {
  const [question, setQuestion] = useState<ClipQuizQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clipId) {
      setQuestion(null);
      return;
    }

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: qError } = await supabase
          .from('clip_quiz_questions')
          .select('id, clip_id, question, options, correct_index, explanation, difficulty, published')
          .eq('clip_id', clipId)
          .eq('published', true)
          .maybeSingle();

        if (qError) throw qError;
        if (cancelled) return;

        if (data) {
          const opts = Array.isArray(data.options)
            ? (data.options as string[])
            : typeof data.options === 'string'
              ? JSON.parse(data.options)
              : [];
          setQuestion({
            ...data,
            options: opts,
          } as ClipQuizQuestion);
        } else {
          setQuestion(null);
        }
      } catch (e) {
        console.error('useClipQuiz:', e);
        if (!cancelled) setError('Could not load question');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [clipId]);

  return { question, loading, error };
}

export function useClipQuizSubmit() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const submitAnswer = useCallback(
    async (params: {
      clipId: string;
      questionId: string;
      selectedIndex: number;
      correctIndex: number;
      watchPercent: number;
    }): Promise<{ isCorrect: boolean; alreadyRewarded: boolean } | null> => {
      if (!user) return null;
      setSubmitting(true);
      try {
        const isCorrect = params.selectedIndex === params.correctIndex;

        const { error } = await supabase.from('clip_quiz_attempts').insert({
          user_id: user.id,
          clip_id: params.clipId,
          question_id: params.questionId,
          selected_index: params.selectedIndex,
          is_correct: isCorrect,
          watch_percent: params.watchPercent,
        });

        if (error) throw error;
        return { isCorrect, alreadyRewarded: false };
      } catch (e) {
        console.error('submitAnswer:', e);
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [user]
  );

  const hasRecentReward = useCallback(
    async (clipId: string): Promise<boolean> => {
      if (!user) return false;
      const since = new Date();
      since.setHours(since.getHours() - 24);

      const { data } = await supabase
        .from('clip_quiz_attempts')
        .select('id, is_correct')
        .eq('user_id', user.id)
        .eq('clip_id', clipId)
        .eq('is_correct', true)
        .gte('answered_at', since.toISOString())
        .limit(1);

      return (data?.length ?? 0) > 0;
    },
    [user]
  );

  return { submitAnswer, hasRecentReward, submitting };
}
