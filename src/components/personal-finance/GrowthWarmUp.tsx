import React from 'react';
import GrowthCheckStep from './GrowthCheckStep';
import type { ModuleGrowthCheck, GrowthCheckPayload } from '@/types/personal-finance';

interface GrowthWarmUpProps {
  growthCheck: ModuleGrowthCheck;
  onComplete: (payload: GrowthCheckPayload) => void;
}

/** Quiet baseline check shown once, before the first lesson content of a module. */
const GrowthWarmUp: React.FC<GrowthWarmUpProps> = ({ growthCheck, onComplete }) => (
  <GrowthCheckStep
    title="Quick warm-up"
    intro="Before we dive in — a couple of quick questions to see where you're starting from."
    anchorQuestions={growthCheck.anchorQuestions}
    decisionScenario={growthCheck.decisionScenario}
    onComplete={onComplete}
  />
);

export default GrowthWarmUp;
