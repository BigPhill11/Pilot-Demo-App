import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import type { ResumeBulletCheckResult } from '@/types/career-readiness';

export type ResumeBulletSection = 'experience' | 'leadership';

interface CheckBulletInput {
  bulletText: string;
  section: ResumeBulletSection;
  roleContext?: string;
}

export function useResumeBulletCheck() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkBullet = useCallback(
    async (input: CheckBulletInput): Promise<ResumeBulletCheckResult | null> => {
      if (!user) {
        setError('Sign in to use AskPhil resume checks.');
        return null;
      }

      const text = input.bulletText.trim();
      if (text.length < 10) {
        setError('Add at least 10 characters before checking.');
        return null;
      }
      if (text.length > 500) {
        setError('Bullet is too long (max 500 characters).');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData?.session?.access_token;

        if (!accessToken) {
          setError('Session expired. Please sign in again to use AI checks.');
          return null;
        }

        const { data, error: invokeError } = await supabase.functions.invoke(
          'resume-bullet-check',
          {
            body: {
              bulletText: text,
              section: input.section,
              roleContext: input.roleContext?.trim().slice(0, 200) ?? '',
            },
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (data?.error) {
          setError(String(data.error));
          return null;
        }

        if (invokeError) {
          let detail = 'AI check failed. Please try again.';
          try {
            const body = await (invokeError as any).context?.json?.();
            if (body?.error) detail = String(body.error);
          } catch { /* ignore */ }
          setError(detail);
          return null;
        }

        return data as ResumeBulletCheckResult;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong.');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return { checkBullet, loading, error, isLoggedIn: !!user };
}
