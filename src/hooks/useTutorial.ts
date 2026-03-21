import { useCallback } from 'react';

/**
 * Marks progress for a guided-tutorial step. Empire canvas calls this on key actions.
 * When no tutorial driver is mounted, advances are no-ops.
 */
export function useTutorialTrigger(_stepId: string) {
  const triggerAdvance = useCallback(() => {}, []);

  return { triggerAdvance };
}
