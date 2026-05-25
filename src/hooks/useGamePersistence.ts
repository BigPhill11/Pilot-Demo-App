/**
 * Autosave Bamboo Empire game state (cloud-first + user-scoped local cache).
 */

import { useEffect, useRef } from 'react';
import {
  extractPersistableState,
  flushGameStateSave,
  saveGameState,
  setupGameStateAutosave,
} from '@/engine/persistence';
import { useGameStore } from '@/store/useGameStore';
import {
  migrateAllLegacyStorageKeys,
  setActiveStorageUserId,
} from '@/lib/userScopedStorage';
import { useBaseLayoutStore } from '@/store/useBaseLayoutStore';
import { initializeCreditStore } from '@/store/useCreditStore';

const PERSISTABLE_FIELDS: (keyof ReturnType<typeof extractPersistableState>)[] = [
  'bamboo',
  'xp',
  'energy',
  'buildings',
  'defenses',
  'lastTick',
  'lastEventCheck',
  'activeModifiers',
  'activeEvent',
  'eventHistory',
  'isPaused',
  'pauseStartedAt',
  'pauseCooldownUntil',
  'highEnergyCycles',
  'totalBambooEarned',
  'totalXpEarned',
  'empireProductivity',
];

function hasPersistableChange(
  prev: ReturnType<typeof extractPersistableState>,
  next: ReturnType<typeof extractPersistableState>
): boolean {
  return PERSISTABLE_FIELDS.some((field) => {
    const a = prev[field];
    const b = next[field];
    if (typeof a === 'object' && a !== null) {
      return JSON.stringify(a) !== JSON.stringify(b);
    }
    return a !== b;
  });
}

export function useGamePersistence(userId: string | null | undefined): void {
  const loadedForUserRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const uid = userId ?? null;
    setActiveStorageUserId(uid);
    migrateAllLegacyStorageKeys(uid);

    if (loadedForUserRef.current !== uid) {
      useBaseLayoutStore.persist.rehydrate();
      initializeCreditStore(uid);
      loadedForUserRef.current = uid;
    }

    const cleanupAutosave = setupGameStateAutosave(
      () => extractPersistableState(useGameStore.getState() as never),
      uid ?? undefined
    );

    const unsubscribe = useGameStore.subscribe((state, prevState) => {
      if (!state.initialized) return;

      const next = extractPersistableState(state as never);
      const prev = extractPersistableState(prevState as never);
      if (hasPersistableChange(prev, next)) {
        saveGameState(next, uid ?? undefined, { debounceMs: 800 });
      }
    });

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        flushGameStateSave(uid ?? undefined);
      }
    };

    const handleBeforeUnload = () => {
      flushGameStateSave(uid ?? undefined);
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unsubscribe();
      cleanupAutosave();
      flushGameStateSave(uid ?? undefined);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userId]);
}
