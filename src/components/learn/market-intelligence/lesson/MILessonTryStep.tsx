import React from 'react';
import type { MILessonTryActivity } from '@/types/mi-lesson';
import LineItemSortTry from './try/LineItemSortTry';
import RoleMatchTry from './try/RoleMatchTry';
import TermClassifyTry from './try/TermClassifyTry';
import ScenarioChoiceTry from './try/ScenarioChoiceTry';
import CompoundCompareTry from './try/CompoundCompareTry';
import HeadlineDecoderTry from './try/HeadlineDecoderTry';
import SliderBudgetTry from './try/SliderBudgetTry';

interface MILessonTryStepProps {
  activity: MILessonTryActivity;
  onComplete: () => void;
  onBack: () => void;
}

const MILessonTryStep: React.FC<MILessonTryStepProps> = ({
  activity,
  onComplete,
  onBack,
}) => {
  return (
    <>
      {activity.type === 'line-item-sort' && (
        <LineItemSortTry activity={activity} onComplete={onComplete} />
      )}
      {activity.type === 'role-match' && (
        <RoleMatchTry activity={activity} onComplete={onComplete} />
      )}
      {activity.type === 'term-classify' && (
        <TermClassifyTry activity={activity} onComplete={onComplete} />
      )}
      {activity.type === 'scenario-choice' && (
        <ScenarioChoiceTry activity={activity} onComplete={onComplete} />
      )}
      {activity.type === 'compound-compare' && (
        <CompoundCompareTry activity={activity} onComplete={onComplete} />
      )}
      {activity.type === 'headline-decoder' && activity.headlines && (
        <HeadlineDecoderTry
          title={activity.title}
          description={activity.description}
          headlines={activity.headlines}
          onComplete={onComplete}
        />
      )}
      {activity.type === 'slider-budget' && activity.sliderCategories && activity.sliderScenarios && (
        <SliderBudgetTry
          title={activity.title}
          description={activity.description}
          categories={activity.sliderCategories}
          scenarios={activity.sliderScenarios}
          onComplete={onComplete}
        />
      )}
      <button
        type="button"
        onClick={onBack}
        className="mt-6 text-sm text-emerald-700 underline"
      >
        Back
      </button>
    </>
  );
};

export default MILessonTryStep;
