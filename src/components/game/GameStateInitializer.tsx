import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGameStore } from '@/store/useGameStore';
import { loadGameState, createFreshState } from '@/engine/persistence';
import { useGamePersistence } from '@/hooks/useGamePersistence';
import {
  migrateAllLegacyStorageKeys,
  setActiveStorageUserId,
} from '@/lib/userScopedStorage';

/**
 * Global component that initializes the Bamboo Empire game state on app load.
 * Reloads per-user state on account switch and wires autosave.
 */
const GameStateInitializer = () => {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const loadedForUserRef = useRef<string | null | undefined>(undefined);

  useGamePersistence(userId);

  useEffect(() => {
    let cancelled = false;

    const initializeGameState = async () => {
      if (loadedForUserRef.current === userId) return;

      setActiveStorageUserId(userId);
      migrateAllLegacyStorageKeys(userId);

      try {
        const savedState = await loadGameState(userId ?? undefined);
        if (cancelled) return;

        if (savedState) {
          useGameStore.getState().loadState(savedState);
        } else {
          const freshState = createFreshState();
          useGameStore.getState().loadState(freshState);
        }

        loadedForUserRef.current = userId;
      } catch (error) {
        console.error('Failed to initialize game state:', error);
        if (cancelled) return;
        const freshState = createFreshState();
        useGameStore.getState().loadState(freshState);
        loadedForUserRef.current = userId;
      }
    };

    void initializeGameState();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return null;
};

export default GameStateInitializer;
