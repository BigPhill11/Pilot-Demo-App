import React from 'react';
import GrowthCheckStep from './GrowthCheckStep';
import type { ModuleGrowthCheck, GrowthCheckPayload } from '@/types/personal-finance';

interface GrowthWrapUpProps {
  growthCheck: ModuleGrowthCheck;
  onComplete: (payload: GrowthCheckPayload) => void;
}

/** Quiet final check shown once, after the last lesson's content, before the module-complete celebration. */
const GrowthWrapUp: React.FC<GrowthWrapUpProps> = ({ growthCheck, onComplete }) => (
  <GrowthCheckStep
    title="Quick gut-check"
    intro="One more look at the same kind of questions — let's see how your thinking's grown."
    anchorQuestions={growthCheck.anchorQuestions}
    decisionScenario={growthCheck.decisionScenario}
    onComplete={onComplete}
  />
);

export default GrowthWrapUp;
