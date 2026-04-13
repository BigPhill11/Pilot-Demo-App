/**
 * Wealth Management Simulation Hook
 * 
 * Manages state for the multi-year career simulation including:
 * - Current module and year tracking
 * - All meter values with history
 * - Decision log
 * - Achievements/milestones
 * - localStorage persistence
 * 
 * Module-Year Mapping:
 * - Module 1: Overview + Comic (no simulation year)
 * - Module 2: Year 1 - Junior Advisor
 * - Module 3: Year 2 - Junior Advisor (growth)
 * - Module 4: Year 3 - Associate Advisor
 * - Module 5: Year 4 - Senior Advisor
 * - Module 6: Year 5 - Managing Director track
 * - Module 7: Final Scenarios + Endings (no simulation year)
 */

import { useState, useCallback, useEffect } from 'react';
import {
  WMSimState,
  WMSimMeters,
  WMSimMeterChanges,
  WMDecisionLog,
  WMCareerTitle,
  INITIAL_WM_STATE,
  INITIAL_WM_METERS,
} from '@/types/wealth-management-sim';
import { getYearConfig, determineEnding, WM_SCENARIOS } from '@/data/wealth-management/career-sim-config';

const STORAGE_KEY = 'wm_career_sim_state';
const MODULE_PROGRESS_KEY = 'wm_module_progress';

interface ModuleProgress {
  completedModules: number[];
  currentModule: number;
  moduleYearCompleted: Record<number, boolean>;
}

function loadModuleProgress(): ModuleProgress {
  try {
    const stored = localStorage.getItem(MODULE_PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading module progress:', error);
  }
  return { completedModules: [], currentModule: 1, moduleYearCompleted: {} };
}

function saveModuleProgress(progress: ModuleProgress): void {
  try {
    localStorage.setItem(MODULE_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving module progress:', error);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function applyMeterChanges(meters: WMSimMeters, changes: WMSimMeterChanges): WMSimMeters {
  return {
    salary: meters.salary + (changes.salary || 0),
    investmentKnowledge: clamp(meters.investmentKnowledge + (changes.investmentKnowledge || 0), 0, 100),
    clientRelations: clamp(meters.clientRelations + (changes.clientRelations || 0), 0, 100),
    technicalAnalysis: clamp(meters.technicalAnalysis + (changes.technicalAnalysis || 0), 0, 100),
    workLifeBalance: clamp(meters.workLifeBalance + (changes.workLifeBalance || 0), 0, 100),
    productivity: clamp(meters.productivity + (changes.productivity || 0), 0, 100),
    fatigue: clamp(meters.fatigue + (changes.fatigue || 0), 0, 100),
  };
}

function loadState(): WMSimState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading WM sim state:', error);
  }
  return null;
}

function saveState(state: WMSimState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving WM sim state:', error);
  }
}

function getTitleForYear(year: number, meters: WMSimMeters): WMCareerTitle {
  const yearConfig = getYearConfig(year);
  if (!yearConfig) return 'Junior Advisor';
  
  if (year >= 5) {
    if (meters.workLifeBalance >= 70 && meters.fatigue <= 30) {
      return 'Work-Life Champion';
    }
    if (meters.salary >= 180000 && meters.productivity >= 75) {
      return 'Managing Director';
    }
  }
  
  return yearConfig.title;
}

export function useWealthManagementSim() {
  const [state, setState] = useState<WMSimState>(() => {
    const saved = loadState();
    return saved || { ...INITIAL_WM_STATE, startedAt: Date.now() };
  });

  const [moduleProgress, setModuleProgress] = useState<ModuleProgress>(() => {
    return loadModuleProgress();
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    saveModuleProgress(moduleProgress);
  }, [moduleProgress]);

  const resetSimulation = useCallback(() => {
    const newState: WMSimState = {
      ...INITIAL_WM_STATE,
      startedAt: Date.now(),
    };
    setState(newState);
  }, []);

  const setPhase = useCallback((phase: WMSimState['currentPhase']) => {
    setState(prev => ({ ...prev, currentPhase: phase }));
  }, []);

  const startJourney = useCallback(() => {
    setState(prev => ({ ...prev, currentPhase: 'comic' }));
  }, []);

  const startSimulation = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      currentPhase: 'year-intro',
      currentYear: 1,
      currentDecisionIndex: 0,
      currentEventIndex: 0,
    }));
  }, []);

  const advanceToDecisions = useCallback(() => {
    setState(prev => ({ ...prev, currentPhase: 'decisions', currentDecisionIndex: 0 }));
  }, []);

  const makeDecision = useCallback((decisionId: string, optionId: string, meterChanges: WMSimMeterChanges) => {
    setState(prev => {
      const newMeters = applyMeterChanges(prev.meters, meterChanges);
      const newLog: WMDecisionLog = {
        yearNumber: prev.currentYear,
        decisionId,
        chosenOptionId: optionId,
        timestamp: Date.now(),
      };
      
      const yearConfig = getYearConfig(prev.currentYear);
      const totalDecisions = yearConfig?.decisions.length || 0;
      const nextDecisionIndex = prev.currentDecisionIndex + 1;
      
      let nextPhase: WMSimState['currentPhase'] = 'decisions';
      if (nextDecisionIndex >= totalDecisions) {
        nextPhase = 'event';
      }
      
      return {
        ...prev,
        meters: newMeters,
        decisionLog: [...prev.decisionLog, newLog],
        currentDecisionIndex: nextDecisionIndex,
        currentPhase: nextPhase,
      };
    });
  }, []);

  const triggerEvent = useCallback((eventId: string, meterChanges: WMSimMeterChanges) => {
    setState(prev => {
      const newMeters = applyMeterChanges(prev.meters, meterChanges);
      return {
        ...prev,
        meters: newMeters,
        triggeredEvents: [...prev.triggeredEvents, eventId],
        currentPhase: 'year-review',
      };
    });
  }, []);

  const skipEvent = useCallback(() => {
    setState(prev => ({ ...prev, currentPhase: 'year-review' }));
  }, []);

  const advanceYear = useCallback(() => {
    setState(prev => {
      const nextYear = prev.currentYear + 1;
      const newMeterHistory = [...prev.meterHistory, { ...prev.meters }];
      const newTitle = getTitleForYear(nextYear, prev.meters);
      
      if (nextYear > 5) {
        return {
          ...prev,
          meterHistory: newMeterHistory,
          currentPhase: 'scenarios',
          currentTitle: newTitle,
        };
      }
      
      return {
        ...prev,
        currentYear: nextYear,
        currentPhase: 'year-intro',
        currentDecisionIndex: 0,
        currentEventIndex: 0,
        meterHistory: newMeterHistory,
        currentTitle: newTitle,
      };
    });
  }, []);

  const completeScenario = useCallback((scenarioId: string, meterChanges: WMSimMeterChanges) => {
    setState(prev => {
      const newMeters = applyMeterChanges(prev.meters, meterChanges);
      const newCompleted = [...prev.scenariosCompleted, scenarioId];
      
      const allScenarios = WM_SCENARIOS;
      const requiredScenarios = 3;
      
      let nextPhase: WMSimState['currentPhase'] = 'scenarios';
      if (newCompleted.length >= requiredScenarios) {
        nextPhase = 'completion';
      }
      
      return {
        ...prev,
        meters: newMeters,
        scenariosCompleted: newCompleted,
        currentPhase: nextPhase,
        completedAt: nextPhase === 'completion' ? Date.now() : undefined,
      };
    });
  }, []);

  const completeSimulation = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPhase: 'completion',
      completedAt: Date.now(),
    }));
  }, []);

  const getEnding = useCallback(() => {
    return determineEnding(state);
  }, [state]);

  const getSkillsAverage = useCallback(() => {
    const { investmentKnowledge, clientRelations, technicalAnalysis } = state.meters;
    return Math.round((investmentKnowledge + clientRelations + technicalAnalysis) / 3);
  }, [state.meters]);

  const getCurrentYearConfig = useCallback(() => {
    return getYearConfig(state.currentYear);
  }, [state.currentYear]);

  const getCurrentDecision = useCallback(() => {
    const yearConfig = getCurrentYearConfig();
    if (!yearConfig) return null;
    return yearConfig.decisions[state.currentDecisionIndex] || null;
  }, [getCurrentYearConfig, state.currentDecisionIndex]);

  const getRandomEvent = useCallback(() => {
    const yearConfig = getCurrentYearConfig();
    if (!yearConfig || yearConfig.possibleEvents.length === 0) return null;
    
    const availableEvents = yearConfig.possibleEvents.filter(
      e => !state.triggeredEvents.includes(e.id)
    );
    
    if (availableEvents.length === 0) return null;
    
    if (Math.random() > 0.7) return null;
    
    const randomIndex = Math.floor(Math.random() * availableEvents.length);
    return availableEvents[randomIndex];
  }, [getCurrentYearConfig, state.triggeredEvents]);

  const getNextScenario = useCallback(() => {
    const availableScenarios = WM_SCENARIOS.filter(
      s => !state.scenariosCompleted.includes(s.id)
    );
    
    if (availableScenarios.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * availableScenarios.length);
    return availableScenarios[randomIndex];
  }, [state.scenariosCompleted]);

  const hasExistingProgress = useCallback(() => {
    const saved = loadState();
    return saved !== null && saved.currentPhase !== 'overview';
  }, []);

  // Module-specific functions
  const startYearForModule = useCallback((simulationYear: number) => {
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'useWealthManagementSim.ts:startYearForModule',message:'Starting year for module',data:{simulationYear:simulationYear},hypothesisId:'H2',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setState(prev => ({
      ...prev,
      currentYear: simulationYear,
      currentPhase: 'year-intro',
      currentDecisionIndex: 0,
      currentEventIndex: 0,
    }));
  }, []);

  const completeYearForModule = useCallback((moduleId: number) => {
    setModuleProgress(prev => ({
      ...prev,
      moduleYearCompleted: {
        ...prev.moduleYearCompleted,
        [moduleId]: true,
      },
    }));
    
    // Save meter history after year completion
    setState(prev => ({
      ...prev,
      meterHistory: [...prev.meterHistory, { ...prev.meters }],
      currentPhase: 'year-review',
    }));
  }, []);

  const completeModule = useCallback((moduleId: number) => {
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'useWealthManagementSim.ts:completeModule',message:'Completing module',data:{moduleId:moduleId},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setModuleProgress(prev => ({
      ...prev,
      completedModules: prev.completedModules.includes(moduleId) 
        ? prev.completedModules 
        : [...prev.completedModules, moduleId],
      currentModule: Math.max(prev.currentModule, moduleId + 1),
    }));
  }, []);

  const isModuleUnlocked = useCallback((moduleId: number) => {
    const unlocked = moduleId === 1 || moduleProgress.completedModules.includes(moduleId - 1);
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'useWealthManagementSim.ts:isModuleUnlocked',message:'Checking module unlock',data:{moduleId:moduleId,unlocked:unlocked,completedModules:moduleProgress.completedModules},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return unlocked;
  }, [moduleProgress.completedModules]);

  const isModuleCompleted = useCallback((moduleId: number) => {
    return moduleProgress.completedModules.includes(moduleId);
  }, [moduleProgress.completedModules]);

  const isYearCompletedForModule = useCallback((moduleId: number) => {
    return moduleProgress.moduleYearCompleted[moduleId] === true;
  }, [moduleProgress.moduleYearCompleted]);

  const getModuleProgress = useCallback(() => {
    return moduleProgress;
  }, [moduleProgress]);

  const resetModuleProgress = useCallback(() => {
    const newProgress: ModuleProgress = { 
      completedModules: [], 
      currentModule: 1, 
      moduleYearCompleted: {} 
    };
    setModuleProgress(newProgress);
  }, []);

  return {
    state,
    meters: state.meters,
    currentYear: state.currentYear,
    currentPhase: state.currentPhase,
    currentTitle: state.currentTitle,
    decisionLog: state.decisionLog,
    scenariosCompleted: state.scenariosCompleted,
    moduleProgress,
    
    resetSimulation,
    setPhase,
    startJourney,
    startSimulation,
    advanceToDecisions,
    makeDecision,
    triggerEvent,
    skipEvent,
    advanceYear,
    completeScenario,
    completeSimulation,
    
    // Module-specific
    startYearForModule,
    completeYearForModule,
    completeModule,
    isModuleUnlocked,
    isModuleCompleted,
    isYearCompletedForModule,
    getModuleProgress,
    resetModuleProgress,
    
    getEnding,
    getSkillsAverage,
    getCurrentYearConfig,
    getCurrentDecision,
    getRandomEvent,
    getNextScenario,
    hasExistingProgress,
  };
}
