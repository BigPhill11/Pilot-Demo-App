import type { InterviewModuleAnswers, InterviewModuleDetails } from '@/types/career-readiness';

export interface InterviewActivityProps {
  answers: InterviewModuleAnswers;
  onUpdateAnswers: (patch: Partial<InterviewModuleAnswers>) => void;
  onComplete: () => void;
  /** When true, user can change answers after submitting (review mode). Default true. */
  allowEdit?: boolean;
  isActivityComplete?: boolean;
}

export type { InterviewModuleDetails };
