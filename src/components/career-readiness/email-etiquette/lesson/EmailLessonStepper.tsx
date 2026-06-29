import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';
import { EMAIL_LESSONS } from '@/data/career-readiness/email-etiquette';
import {
  EMAIL_LESSON_ORDER,
  canNavigateToEmailLesson,
  isEmailLessonComplete,
  type EmailEtiquetteModuleDetails,
  type EmailLessonId,
} from '@/types/career-readiness';

interface EmailLessonStepperProps {
  details: EmailEtiquetteModuleDetails;
  currentLessonId: EmailLessonId;
  onSelectLesson: (lessonId: EmailLessonId) => void;
}

const EmailLessonStepper: React.FC<EmailLessonStepperProps> = ({
  details,
  currentLessonId,
  onSelectLesson,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {EMAIL_LESSON_ORDER.map((lessonId) => {
        const config = EMAIL_LESSONS.find((l) => l.id === lessonId)!;
        const complete = isEmailLessonComplete(lessonId, details.completedLessonSteps);
        const active = currentLessonId === lessonId;
        const canOpen = canNavigateToEmailLesson(details, lessonId);
        const locked = !canOpen;

        return (
          <button
            key={lessonId}
            type="button"
            disabled={locked}
            onClick={() => canOpen && onSelectLesson(lessonId)}
            className={`relative flex-1 min-w-[100px] p-3 rounded-xl border-2 text-left transition-all ${
              active
                ? 'border-emerald-500 bg-emerald-50 shadow-md'
                : complete
                  ? 'border-emerald-200 bg-white hover:border-emerald-300 cursor-pointer'
                  : locked
                    ? 'border-border bg-muted/20 opacity-60 cursor-not-allowed'
                    : 'border-border bg-white hover:border-emerald-200 cursor-pointer'
            }`}
          >
            {active && (
              <motion.div
                layoutId="email-lesson-active"
                className="absolute inset-0 rounded-xl bg-emerald-500/5 pointer-events-none"
              />
            )}
            <div className="relative flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  complete
                    ? 'bg-emerald-600 text-white'
                    : active
                      ? 'bg-emerald-800 text-white'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {complete ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : locked ? (
                  <Lock className="h-3.5 w-3.5" />
                ) : (
                  config.iconLabel
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{config.title}</p>
                <p className="text-[10px] text-muted-foreground truncate hidden sm:block">
                  {complete ? 'Tap to review' : config.subtitle.slice(0, 28) + '…'}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default EmailLessonStepper;
