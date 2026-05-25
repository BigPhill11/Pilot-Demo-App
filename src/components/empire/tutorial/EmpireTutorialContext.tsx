import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  EMPIRE_TUTORIAL_STEPS,
  markTutorialComplete,
  type EmpireTutorialStep,
  type TutorialAction,
} from './empireTutorialSteps';

export type TutorialSpotlightHandler = (action: TutorialAction) => void;

export type TutorialRunType = 'first_time' | 'replay';

interface EmpireTutorialContextValue {
  isActive: boolean;
  runType: TutorialRunType;
  step: EmpireTutorialStep;
  stepIndex: number;
  totalSteps: number;
  sessionId: number;
  tutorialBuildingId: string | null;
  setTutorialBuildingId: (id: string | null) => void;
  startTutorial: () => void;
  restartTutorial: () => void;
  skipTutorial: () => void;
  advance: () => void;
  reportAction: (action: TutorialAction) => void;
  setStepEnterHandler: (handler: ((step: EmpireTutorialStep) => void) | null) => void;
  setSpotlightHandler: (handler: TutorialSpotlightHandler | null) => void;
  handleSpotlightTap: () => void;
}

const EmpireTutorialContext = createContext<EmpireTutorialContextValue | null>(null);

export const EmpireTutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [runType, setRunType] = useState<TutorialRunType>('first_time');
  const [stepIndex, setStepIndex] = useState(0);
  const [sessionId, setSessionId] = useState(0);
  const [tutorialBuildingId, setTutorialBuildingId] = useState<string | null>(null);
  const stepEnterHandlerRef = useRef<((step: EmpireTutorialStep) => void) | null>(null);
  const spotlightHandlerRef = useRef<TutorialSpotlightHandler | null>(null);
  const enteredStepRef = useRef<string | null>(null);

  const step = EMPIRE_TUTORIAL_STEPS[stepIndex];
  const totalSteps = EMPIRE_TUTORIAL_STEPS.length;

  const beginTutorial = useCallback((mode: TutorialRunType) => {
    enteredStepRef.current = null;
    setRunType(mode);
    setStepIndex(0);
    setTutorialBuildingId(null);
    setIsActive(true);
    setSessionId((id) => id + 1);
  }, []);

  const startTutorial = useCallback(() => beginTutorial('first_time'), [beginTutorial]);
  const restartTutorial = useCallback(() => beginTutorial('replay'), [beginTutorial]);

  const skipTutorial = useCallback(() => {
    markTutorialComplete();
    enteredStepRef.current = null;
    setIsActive(false);
    setStepIndex(0);
    setTutorialBuildingId(null);
    setSessionId((id) => id + 1);
  }, []);

  const runStepEnter = useCallback((s: EmpireTutorialStep) => {
    if (enteredStepRef.current === s.id) return;
    enteredStepRef.current = s.id;
    stepEnterHandlerRef.current?.(s);
  }, []);

  useEffect(() => {
    if (!isActive || !step) return;
    runStepEnter(step);
  }, [isActive, step, runStepEnter]);

  const finish = useCallback(() => {
    markTutorialComplete();
    setIsActive(false);
  }, []);

  const advance = useCallback(() => {
    if (!step) return;
    if (step.advance === 'action' && runType === 'first_time') return;

    if (stepIndex >= totalSteps - 1) {
      finish();
      return;
    }
    setStepIndex((i) => i + 1);
  }, [step, stepIndex, totalSteps, finish, runType]);

  const reportAction = useCallback(
    (action: TutorialAction) => {
      if (!isActive || !step || step.action !== action) return;
      if (stepIndex >= totalSteps - 1) {
        finish();
        return;
      }
      setStepIndex((i) => i + 1);
    },
    [isActive, step, stepIndex, totalSteps, finish],
  );

  const setStepEnterHandler = useCallback((handler: ((s: EmpireTutorialStep) => void) | null) => {
    stepEnterHandlerRef.current = handler;
  }, []);

  const setSpotlightHandler = useCallback((handler: TutorialSpotlightHandler | null) => {
    spotlightHandlerRef.current = handler;
  }, []);

  const handleSpotlightTap = useCallback(() => {
    if (!isActive || !step?.action) return;

    if (spotlightHandlerRef.current) {
      spotlightHandlerRef.current(step.action);
      return;
    }

    if (step.target) {
      document.querySelector<HTMLElement>(`[data-tutorial="${step.target}"]`)?.click();
    }
  }, [isActive, step]);

  const value = useMemo(
    () => ({
      isActive,
      runType,
      step,
      stepIndex,
      totalSteps,
      sessionId,
      tutorialBuildingId,
      setTutorialBuildingId,
      startTutorial,
      restartTutorial,
      skipTutorial,
      advance,
      reportAction,
      setStepEnterHandler,
      setSpotlightHandler,
      handleSpotlightTap,
    }),
    [
      isActive,
      runType,
      step,
      stepIndex,
      totalSteps,
      sessionId,
      tutorialBuildingId,
      startTutorial,
      restartTutorial,
      skipTutorial,
      advance,
      reportAction,
      setStepEnterHandler,
      setSpotlightHandler,
      handleSpotlightTap,
    ],
  );

  return (
    <EmpireTutorialContext.Provider value={value}>{children}</EmpireTutorialContext.Provider>
  );
};

export function useEmpireTutorial(): EmpireTutorialContextValue {
  const ctx = useContext(EmpireTutorialContext);
  if (!ctx) {
    throw new Error('useEmpireTutorial must be used within EmpireTutorialProvider');
  }
  return ctx;
}

export function useEmpireTutorialOptional(): EmpireTutorialContextValue | null {
  return useContext(EmpireTutorialContext);
}
