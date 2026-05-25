import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  normalizeResumeDetails,
  type ResumeBuilderAnswers,
  type ResumeBuilderDetails,
} from '@/types/career-readiness';

const DEBOUNCE_MS = 800;

export type ResumeSyncStatus = 'idle' | 'loading' | 'saving' | 'saved' | 'error';

interface ResumeDraftRow {
  draft: ResumeBuilderAnswers | Record<string, unknown>;
  progress: {
    currentSectionId?: ResumeBuilderDetails['currentSectionId'];
    completedSections?: ResumeBuilderDetails['completedSections'];
    isComplete?: boolean;
  } | null;
}

export function useResumeDraftSync(
  details: ResumeBuilderDetails,
  onHydrate: (remote: ResumeBuilderDetails) => void
) {
  const { user } = useAuth();
  const [status, setStatus] = useState<ResumeSyncStatus>('idle');
  const hydratedRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    if (!user) {
      setStatus('idle');
      hydratedRef.current = false;
      return;
    }

    let cancelled = false;

    const load = async () => {
      setStatus('loading');
      try {
        // @ts-expect-error resume_drafts table exists after migration; regenerate types when applied
        const { data, error } = await supabase
          .from('resume_drafts')
          .select('draft, progress')
          .eq('user_id', user.id)
          .maybeSingle();

        if (cancelled) return;

        if (error) {
          console.error('Resume draft load error:', error);
          setStatus('error');
          return;
        }

        const row = data as ResumeDraftRow | null;
        if (row?.draft && typeof row.draft === 'object' && !hydratedRef.current) {
          const progressMeta = row.progress ?? {};
          onHydrate(
            normalizeResumeDetails({
              answers: row.draft as ResumeBuilderAnswers,
              currentSectionId: progressMeta.currentSectionId,
              completedSections: progressMeta.completedSections,
              isComplete: progressMeta.isComplete,
            })
          );
          hydratedRef.current = true;
          lastSavedRef.current = JSON.stringify(row);
        }
        setStatus('saved');
      } catch (e) {
        console.error(e);
        if (!cancelled) setStatus('error');
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user, onHydrate]);

  const persist = useCallback(
    async (payload: ResumeBuilderDetails) => {
      if (!user) return;
      const serialized = JSON.stringify(payload);
      if (serialized === lastSavedRef.current) return;

      setStatus('saving');
      try {
        const row = {
          user_id: user.id,
          draft: payload.answers,
          progress: {
            currentSectionId: payload.currentSectionId,
            completedSections: payload.completedSections,
            isComplete: payload.isComplete,
          },
          updated_at: new Date().toISOString(),
        };

        // @ts-expect-error resume_drafts table exists after migration
        const { error } = await supabase.from('resume_drafts').upsert(row, {
          onConflict: 'user_id',
        });

        if (error) {
          console.error('Resume draft save error:', error);
          setStatus('error');
          return;
        }
        lastSavedRef.current = serialized;
        setStatus('saved');
      } catch (e) {
        console.error(e);
        setStatus('error');
      }
    },
    [user]
  );

  useEffect(() => {
    if (!user || status === 'loading') return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      persist(details);
    }, DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [user, details, persist, status]);

  return { syncStatus: status, isLoggedIn: !!user };
}
