/**
 * Cumulative successful Teach Phil sessions for the signed-in user
 * (profiles.teach_backs_completed) — drives the Teaching Pagoda unlock.
 *
 * Fetched once on mount; kept fresh without a refetch via the
 * TEACH_BACKS_UPDATED_EVENT window event fired by useTeachPhilSession when
 * the Edge Function reports a new count after a pass. Guests are 0.
 */

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { TEACH_BACKS_UPDATED_EVENT } from '@/hooks/useTeachPhilSession';

export function useTeachBacksCompleted(): number {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setCount(0);
      return;
    }
    let cancelled = false;
    supabase
      .from('profiles')
      .select('teach_backs_completed')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled || error) return;
        // Generated Supabase types may predate the column — read it loosely
        const value = (data as { teach_backs_completed?: number } | null)?.teach_backs_completed;
        if (typeof value === 'number') setCount(value);
      });
    return () => { cancelled = true; };
  }, [user]);

  useEffect(() => {
    const onUpdated = (event: Event) => {
      const detail = (event as CustomEvent<{ teachBacksCompleted?: number }>).detail;
      if (typeof detail?.teachBacksCompleted === 'number') {
        setCount(detail.teachBacksCompleted);
      }
    };
    window.addEventListener(TEACH_BACKS_UPDATED_EVENT, onUpdated);
    return () => window.removeEventListener(TEACH_BACKS_UPDATED_EVENT, onUpdated);
  }, []);

  return count;
}
