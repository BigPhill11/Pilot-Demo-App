import React, { useEffect, useMemo, useState } from 'react';
import type { FinanceCareerData } from '@/data/finance-careers';
import {
  wealthManagementCareerStages,
  wealthManagementModules,
} from '@/data/wealth-management/wealthManagementCurriculum';
import WealthManagementCareerSimulator from './WealthManagementCareerSimulator';
import WealthManagementModuleView from './WealthManagementModuleView';
import WealthManagementOverview from './WealthManagementOverview';

interface WealthManagementJourneyProps {
  career: FinanceCareerData;
}

type WealthManagementView =
  | { type: 'overview' }
  | { type: 'module'; moduleId: string }
  | { type: 'simulator' };

interface WealthManagementProgress {
  completedModuleIds: string[];
  completedCareerStageIds: string[];
}

const storageKey = 'wealth-management-progress';

const loadProgress = (): WealthManagementProgress => {
  if (typeof window === 'undefined') {
    return { completedModuleIds: [], completedCareerStageIds: [] };
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return { completedModuleIds: [], completedCareerStageIds: [] };
    const parsed = JSON.parse(raw) as Partial<WealthManagementProgress>;

    return {
      completedModuleIds: Array.isArray(parsed.completedModuleIds) ? parsed.completedModuleIds : [],
      completedCareerStageIds: Array.isArray(parsed.completedCareerStageIds) ? parsed.completedCareerStageIds : [],
    };
  } catch {
    return { completedModuleIds: [], completedCareerStageIds: [] };
  }
};

const WealthManagementJourney: React.FC<WealthManagementJourneyProps> = ({ career }) => {
  const [view, setView] = useState<WealthManagementView>({ type: 'overview' });
  const [progress, setProgress] = useState<WealthManagementProgress>(() => loadProgress());

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress]);

  const activeModule = useMemo(() => {
    if (view.type !== 'module') return null;
    return wealthManagementModules.find((module) => module.id === view.moduleId) ?? null;
  }, [view]);

  const handleCompleteModule = (moduleId: string) => {
    setProgress((current) => {
      if (current.completedModuleIds.includes(moduleId)) return current;
      return {
        ...current,
        completedModuleIds: [...current.completedModuleIds, moduleId],
      };
    });
  };

  const handleCompleteCareerStage = (stageId: string) => {
    setProgress((current) => {
      if (current.completedCareerStageIds.includes(stageId)) return current;

      const stageOrder = wealthManagementCareerStages.map((stage) => stage.id);
      const nextIds = [...current.completedCareerStageIds, stageId].sort(
        (a, b) => stageOrder.indexOf(a) - stageOrder.indexOf(b)
      );

      return {
        ...current,
        completedCareerStageIds: nextIds,
      };
    });
  };

  if (view.type === 'simulator') {
    return (
      <WealthManagementCareerSimulator
        completedStageIds={progress.completedCareerStageIds}
        onCompleteStage={handleCompleteCareerStage}
        onBack={() => setView({ type: 'overview' })}
      />
    );
  }

  if (activeModule) {
    return (
      <WealthManagementModuleView
        module={activeModule}
        isCompleted={progress.completedModuleIds.includes(activeModule.id)}
        onComplete={handleCompleteModule}
        onBack={() => setView({ type: 'overview' })}
      />
    );
  }

  return (
    <WealthManagementOverview
      careerName={career.name}
      modules={wealthManagementModules}
      completedModuleIds={progress.completedModuleIds}
      completedCareerStageIds={progress.completedCareerStageIds}
      onSelectModule={(moduleId) => setView({ type: 'module', moduleId })}
      onStartSimulator={() => setView({ type: 'simulator' })}
    />
  );
};

export default WealthManagementJourney;
