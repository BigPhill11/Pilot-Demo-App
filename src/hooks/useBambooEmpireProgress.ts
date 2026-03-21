/**
 * Hook for managing Bamboo Empire game progress with Supabase sync
 * 
 * This hook:
 * - Syncs game progress to Supabase (not just localStorage)
 * - Triggers gamification rewards (XP, coins, achievements)
 * - Maintains backward compatibility with localStorage
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { createGamificationService, GamificationSource } from '@/services/gamificationService';

export interface BambooEmpireGameState {
  level: number;
  experience: number;
  bambooCoins: number;
  energy: number;
  territories: number;
  answeredQuestions: string[];
  achievements: string[];
  powerUps: { [key: string]: number };
  streak: number;
  totalAnswered: number;
}

export const useBambooEmpireProgress = (gameLevel: 'beginner' | 'intermediate' | 'pro') => {
  const { user } = useAuth();
  const [gameState, setGameState] = useState<BambooEmpireGameState>({
    level: 1,
    experience: 0,
    bambooCoins: 100,
    energy: 100,
    territories: 1,
    answeredQuestions: [],
    achievements: [],
    powerUps: {},
    streak: 0,
    totalAnswered: 0
  });
  const [loading, setLoading] = useState(true);

  const getStorageKey = () => `bamboo_empire_${gameLevel}`;
  const getModuleId = () => `bamboo_empire_${gameLevel}`;

  // Load game state from Supabase or localStorage
  const loadGameState = useCallback(async () => {
    const storageKey = getStorageKey();
    
    if (!user) {
      // Load from localStorage for non-authenticated users
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setGameState(JSON.parse(stored));
      }
      setLoading(false);
      return;
    }

    try {
      // Try to load from Supabase
      let query = supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('module_id', getModuleId())
        .eq('module_type', 'personal_finance');

      // Match either NULL or empty string for course_id
      query = query.or(`course_id.is.null,course_id.eq.`);

      const { data, error } = await query.maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading game state:', error);
      }

      if (data?.detailed_progress) {
        const savedState = data.detailed_progress as any;
        setGameState({
          level: savedState.level || 1,
          experience: savedState.experience || 0,
          bambooCoins: savedState.bambooCoins || 100,
          energy: savedState.energy || 100,
          territories: savedState.territories || 1,
          answeredQuestions: savedState.answeredQuestions || [],
          achievements: savedState.achievements || [],
          powerUps: savedState.powerUps || {},
          streak: savedState.streak || 0,
          totalAnswered: savedState.totalAnswered || 0
        });
      } else {
        // Try localStorage as fallback
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsedState = JSON.parse(stored);
          setGameState(parsedState);
          // Sync to Supabase
          await saveGameStateToSupabase(parsedState);
        }
      }
    } catch (error) {
      console.error('Error in loadGameState:', error);
    } finally {
      setLoading(false);
    }
  }, [user, gameLevel]);

  // Save game state to both Supabase and localStorage
  const saveGameStateToSupabase = useCallback(async (newState: BambooEmpireGameState) => {
    const storageKey = getStorageKey();
    
    // Always save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(newState));

    if (!user) return;

    try {
      const progressPercentage = Math.min(100, (newState.territories / 10) * 100);
      
      const dataToSave = {
        user_id: user.id,
        module_id: getModuleId(),
        module_type: 'personal_finance',
        course_id: '', // Empty string for consistency with upsert constraint
        progress_percentage: progressPercentage,
        time_spent_minutes: 0, // Could track this if needed
        last_accessed: new Date().toISOString(),
        detailed_progress: JSON.parse(JSON.stringify(newState))
      };

      const { error } = await supabase
        .from('module_progress')
        .upsert([dataToSave], {
          onConflict: 'user_id,module_id,module_type,course_id'
        });

      if (error) {
        console.error('Error saving game state to Supabase:', error);
      }
    } catch (error) {
      console.error('Error in saveGameStateToSupabase:', error);
    }
  }, [user, gameLevel]);

  // Save game state and update local state
  const saveGameState = useCallback(async (newState: BambooEmpireGameState) => {
    setGameState(newState);
    await saveGameStateToSupabase(newState);
  }, [saveGameStateToSupabase]);

  // Award XP for correct answer using gamification service
  const awardAnswerXp = useCallback(async (isCorrect: boolean, coinGain: number) => {
    if (!user) return;

    const baseXp = isCorrect ? 25 : 5;
    
    try {
      const gamificationService = await createGamificationService(user.id);
      await gamificationService.awardXp(
        baseXp,
        GamificationSource.BAMBOO_EMPIRE,
        `${gameLevel}_${isCorrect ? 'correct' : 'incorrect'}`
      );
    } catch (error) {
      console.error('Error awarding XP:', error);
    }
  }, [user, gameLevel]);

  // Award XP for level up
  const awardLevelUpXp = useCallback(async (newLevel: number) => {
    if (!user) return;

    try {
      const gamificationService = await createGamificationService(user.id);
      await gamificationService.awardXp(
        50, // Bonus XP for leveling up
        GamificationSource.BAMBOO_EMPIRE,
        `level_up_${newLevel}`
      );
    } catch (error) {
      console.error('Error awarding level up XP:', error);
    }
  }, [user]);

  useEffect(() => {
    loadGameState();
  }, [loadGameState]);

  return {
    gameState,
    loading,
    saveGameState,
    awardAnswerXp,
    awardLevelUpXp,
    refresh: loadGameState
  };
};
