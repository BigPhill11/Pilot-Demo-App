import React from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import { LESSON_STEP_LABELS } from '@/data/career-readiness/interviewing';
import {
  INTERVIEW_STEP_ORDER,
  canReviewLessonStep,
  lessonStepKey,
  type InterviewLessonId,
  type InterviewLessonStepId,
  type InterviewModuleDetails,
} from '@/types/career-readiness';

interface InterviewStepNavigatorProps {
  lessonId: InterviewLessonId;
  details: InterviewModuleDetails;
  currentStepId: InterviewLessonStepId;
  onNavigate: (stepId: InterviewLessonStepId) => void;
}

const InterviewStepNavigator: React.FC<InterviewStepNavigatorProps> = ({
  lessonId,
  details,
  currentStepId,
  onNavigate,
}) => {
  return (
    <div className="grid grid-cols-4 gap-1">
      {INTERVIEW_STEP_ORDER.map((stepId, index) => {
        const labels = LESSON_STEP_LABELS[stepId];
        const key = lessonStepKey(lessonId, stepId);
        const done = details.completedLessonSteps.includes(key);
        const active = currentStepId === stepId;
        const canOpen = canReviewLessonStep(details, lessonId, stepId);
        const locked = !canOpen;

        return (
          <button
            key={stepId}
            type="button"
            disabled={locked}
            onClick={() => canOpen && onNavigate(stepId)}
            className={`flex flex-col items-center text-center px-1 py-2 rounded-lg transition-all ${
              active
                ? 'bg-emerald-800 text-white shadow-md ring-2 ring-emerald-400 ring-offset-1'
                : done
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 cursor-pointer'
                  : locked
                    ? 'bg-muted/30 text-muted-foreground/60 cursor-not-allowed'
                    : 'bg-muted/20 text-muted-foreground hover:bg-muted/40 cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-center h-5 mb-1">
              {done ? (
                <CheckCircle2 className={`h-4 w-4 ${active ? 'text-white' : 'text-emerald-600'}`} />
              ) : locked ? (
                <Lock className="h-3 w-3" />
              ) : (
                <span className="text-[10px] font-bold">{index + 1}</span>
              )}
            </div>
            <span className="text-[10px] font-medium leading-tight">{labels.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
};

export default InterviewStepNavigator;
