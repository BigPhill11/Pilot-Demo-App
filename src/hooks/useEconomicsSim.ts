/**
 * Economics Simulator Hook
 * 
 * Manages state for economics unit simulators including:
 * - Current round and decision tracking
 * - Meter values with history
 * - Decision log
 * - Progress persistence
 * - Completion evaluation
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  SimulatorConfig,
  SimulatorState,
  SimulatorProgress,
  EconomicsSimulatorId,
  INITIAL_SIMULATOR_STATE,
} from '@/types/economics-sim';
import { getSimulatorById } from '@/data/economics-simulators';

const STORAGE_KEY_PREFIX = 'economics_sim_';
const PROGRESS_KEY = 'economics_sim_progress';

function loadSimulatorState(simulatorId: EconomicsSimulatorId): SimulatorState | null {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${simulatorId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading simulator state:', error);
  }
  return null;
}

function saveSimulatorState(state: SimulatorState): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${state.simulatorId}`, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving simulator state:', error);
  }
}

function loadAllProgress(): Record<EconomicsSimulatorId, SimulatorProgress> {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading simulator progress:', error);
  }
  return {} as Record<EconomicsSimulatorId, SimulatorProgress>;
}

function saveAllProgress(progress: Record<EconomicsSimulatorId, SimulatorProgress>): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving simulator progress:', error);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function applyMeterChanges(
  currentMeters: Record<string, number>,
  changes: Record<string, number>,
  config: SimulatorConfig
): Record<string, number> {
  const newMeters = { ...currentMeters };
  
  for (const [meterId, change] of Object.entries(changes)) {
    const meterConfig = config.initialMeters.find(m => m.id === meterId);
    if (meterConfig) {
      newMeters[meterId] = clamp(
        (newMeters[meterId] || 0) + change,
        meterConfig.min,
        meterConfig.max
      );
    }
  }
  
  return newMeters;
}

function evaluateEnding(
  state: SimulatorState,
  config: SimulatorConfig
): 'excellent' | 'good' | 'passing' | 'needsWork' {
  const { meters } = state;
  const { completionThresholds } = config;
  
  const meetsThreshold = (
    thresholds: Record<string, { min?: number; max?: number }>
  ): boolean => {
    for (const [meterId, bounds] of Object.entries(thresholds)) {
      const value = meters[meterId];
      if (value === undefined) continue;
      if (bounds.min !== undefined && value < bounds.min) return false;
      if (bounds.max !== undefined && value > bounds.max) return false;
    }
    return true;
  };
  
  if (meetsThreshold(completionThresholds.excellent)) return 'excellent';
  if (meetsThreshold(completionThresholds.good)) return 'good';
  if (meetsThreshold(completionThresholds.passing)) return 'passing';
  return 'needsWork';
}

export function useEconomicsSim(simulatorId: EconomicsSimulatorId) {
  const config = useMemo(() => getSimulatorById(simulatorId), [simulatorId]);
  
  const [state, setState] = useState<SimulatorState>(() => {
    if (!config) {
      return {
        simulatorId,
        currentRound: 1,
        currentDecisionIndex: 0,
        phase: 'intro',
        meters: {},
        meterHistory: [],
        decisions: [],
        startedAt: Date.now(),
      };
    }
    
    const saved = loadSimulatorState(simulatorId);
    if (saved && saved.phase !== 'completion') {
      return saved;
    }
    
    return INITIAL_SIMULATOR_STATE(config);
  });
  
  const [allProgress, setAllProgress] = useState<Record<EconomicsSimulatorId, SimulatorProgress>>(
    loadAllProgress
  );
  
  useEffect(() => {
    if (state.phase !== 'completion') {
      saveSimulatorState(state);
    }
  }, [state]);
  
  useEffect(() => {
    saveAllProgress(allProgress);
  }, [allProgress]);
  
  const resetSimulator = useCallback(() => {
    if (!config) return;
    const newState = INITIAL_SIMULATOR_STATE(config);
    setState(newState);
  }, [config]);
  
  const startSimulator = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'round-intro' }));
  }, []);
  
  const startRound = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'decision', currentDecisionIndex: 0 }));
  }, []);
  
  const makeDecision = useCallback((decisionId: string, optionId: string, meterChanges: Record<string, number>) => {
    if (!config) return;
    
    setState(prev => {
      const newMeters = applyMeterChanges(prev.meters, meterChanges, config);
      const newDecision = {
        roundNumber: prev.currentRound,
        decisionId,
        optionId,
        timestamp: Date.now(),
      };
      
      const currentRoundConfig = config.rounds[prev.currentRound - 1];
      const totalDecisions = currentRoundConfig?.decisions.length || 0;
      const nextDecisionIndex = prev.currentDecisionIndex + 1;
      
      let nextPhase = prev.phase;
      if (nextDecisionIndex >= totalDecisions) {
        nextPhase = 'round-summary';
      }
      
      return {
        ...prev,
        meters: newMeters,
        decisions: [...prev.decisions, newDecision],
        currentDecisionIndex: nextDecisionIndex,
        phase: nextPhase,
      };
    });
  }, [config]);
  
  const advanceRound = useCallback(() => {
    if (!config) return;
    
    setState(prev => {
      const newMeterHistory = [...prev.meterHistory, { ...prev.meters }];
      const nextRound = prev.currentRound + 1;
      
      if (nextRound > config.rounds.length) {
        return {
          ...prev,
          meterHistory: newMeterHistory,
          phase: 'completion',
          completedAt: Date.now(),
        };
      }
      
      return {
        ...prev,
        currentRound: nextRound,
        currentDecisionIndex: 0,
        meterHistory: newMeterHistory,
        phase: 'round-intro',
      };
    });
  }, [config]);
  
  const completeSimulator = useCallback(() => {
    if (!config) return;
    
    const ending = evaluateEnding(state, config);
    const bambooEarned = ending === 'excellent' ? config.rewards.bamboo :
                         ending === 'good' ? Math.floor(config.rewards.bamboo * 0.75) :
                         ending === 'passing' ? Math.floor(config.rewards.bamboo * 0.5) :
                         Math.floor(config.rewards.bamboo * 0.25);
    const xpEarned = ending === 'excellent' ? config.rewards.xp :
                     ending === 'good' ? Math.floor(config.rewards.xp * 0.75) :
                     ending === 'passing' ? Math.floor(config.rewards.xp * 0.5) :
                     Math.floor(config.rewards.xp * 0.25);
    
    setAllProgress(prev => {
      const existing = prev[simulatorId];
      const newProgress: SimulatorProgress = {
        simulatorId,
        completed: true,
        bestEnding: !existing?.bestEnding || 
          ['excellent', 'good', 'passing', 'needsWork'].indexOf(ending) < 
          ['excellent', 'good', 'passing', 'needsWork'].indexOf(existing.bestEnding)
          ? ending : existing.bestEnding,
        attempts: (existing?.attempts || 0) + 1,
        lastAttemptAt: new Date().toISOString(),
        bambooEarned: Math.max(existing?.bambooEarned || 0, bambooEarned),
        xpEarned: Math.max(existing?.xpEarned || 0, xpEarned),
      };
      
      return {
        ...prev,
        [simulatorId]: newProgress,
      };
    });
    
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${simulatorId}`);
    
    return { ending, bambooEarned, xpEarned };
  }, [config, state, simulatorId]);
  
  const getCurrentRoundConfig = useCallback(() => {
    if (!config) return null;
    return config.rounds[state.currentRound - 1] || null;
  }, [config, state.currentRound]);
  
  const getCurrentDecision = useCallback(() => {
    const roundConfig = getCurrentRoundConfig();
    if (!roundConfig) return null;
    return roundConfig.decisions[state.currentDecisionIndex] || null;
  }, [getCurrentRoundConfig, state.currentDecisionIndex]);
  
  const getEnding = useCallback(() => {
    if (!config) return 'needsWork';
    return evaluateEnding(state, config);
  }, [config, state]);
  
  const getEndingDetails = useCallback(() => {
    if (!config) return null;
    const ending = getEnding();
    return config.endings[ending];
  }, [config, getEnding]);
  
  const getProgress = useCallback(() => {
    return allProgress[simulatorId] || null;
  }, [allProgress, simulatorId]);
  
  const getMeterConfigs = useCallback(() => {
    if (!config) return [];
    return config.initialMeters.map(meter => ({
      ...meter,
      value: state.meters[meter.id] ?? meter.value,
    }));
  }, [config, state.meters]);
  
  const hasExistingProgress = useCallback(() => {
    const saved = loadSimulatorState(simulatorId);
    return saved !== null && saved.phase !== 'intro';
  }, [simulatorId]);
  
  return {
    config,
    state,
    meters: state.meters,
    currentRound: state.currentRound,
    currentPhase: state.phase,
    decisions: state.decisions,
    progress: getProgress(),
    
    resetSimulator,
    startSimulator,
    startRound,
    makeDecision,
    advanceRound,
    completeSimulator,
    
    getCurrentRoundConfig,
    getCurrentDecision,
    getEnding,
    getEndingDetails,
    getMeterConfigs,
    hasExistingProgress,
  };
}

export function useAllSimulatorProgress() {
  const [progress, setProgress] = useState<Record<EconomicsSimulatorId, SimulatorProgress>>(
    loadAllProgress
  );
  
  const getProgressForUnit = useCallback((unitId: string): SimulatorProgress | null => {
    const entry = Object.entries(progress).find(([_, p]) => {
      const config = getSimulatorById(p.simulatorId);
      return config?.unitId === unitId;
    });
    return entry ? entry[1] : null;
  }, [progress]);
  
  const isSimulatorCompleted = useCallback((simulatorId: EconomicsSimulatorId): boolean => {
    return progress[simulatorId]?.completed || false;
  }, [progress]);
  
  const getTotalProgress = useCallback(() => {
    const completed = Object.values(progress).filter(p => p.completed).length;
    const total = 10;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  }, [progress]);
  
  const getTotalRewards = useCallback(() => {
    return Object.values(progress).reduce(
      (acc, p) => ({
        bamboo: acc.bamboo + (p.bambooEarned || 0),
        xp: acc.xp + (p.xpEarned || 0),
      }),
      { bamboo: 0, xp: 0 }
    );
  }, [progress]);
  
  const resetAllProgress = useCallback(() => {
    setProgress({} as Record<EconomicsSimulatorId, SimulatorProgress>);
    localStorage.removeItem(PROGRESS_KEY);
    
    const simulatorIds: EconomicsSimulatorId[] = [
      'micro-1-market-sim', 'micro-2-elasticity-sim', 'micro-3-utility-sim',
      'micro-4-market-power-sim', 'micro-5-policy-sim',
      'macro-1-gdp-sim', 'macro-2-jobs-sim', 'macro-3-inflation-sim',
      'macro-4-fed-sim', 'macro-5-fiscal-sim',
    ];
    
    simulatorIds.forEach(id => {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${id}`);
    });
  }, []);
  
  return {
    progress,
    getProgressForUnit,
    isSimulatorCompleted,
    getTotalProgress,
    getTotalRewards,
    resetAllProgress,
  };
}

export default useEconomicsSim;
