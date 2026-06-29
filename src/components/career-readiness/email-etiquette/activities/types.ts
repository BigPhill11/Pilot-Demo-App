import type {
  EmailEtiquetteModuleAnswers,
  EmailEtiquetteModuleDetails,
} from '@/types/career-readiness';

export interface EmailActivityProps {
  answers: EmailEtiquetteModuleAnswers;
  onUpdateAnswers: (patch: Partial<EmailEtiquetteModuleAnswers>) => void;
  onComplete: () => void;
  /** When true, user can change answers after submitting (review mode). Default true. */
  allowEdit?: boolean;
  isActivityComplete?: boolean;
}

export type { EmailEtiquetteModuleDetails };
