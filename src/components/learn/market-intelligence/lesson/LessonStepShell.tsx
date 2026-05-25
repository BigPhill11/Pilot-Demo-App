import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MILessonStepId =
  | 'hook'
  | 'learn'
  | 'try'
  | 'connect'
  | 'review'
  | 'check'
  | 'done';

const STEP_LABELS: Record<MILessonStepId, string> = {
  hook: 'Hook',
  learn: 'Learn',
  try: 'Try',
  connect: 'Connect',
  review: 'Review',
  check: 'Check',
  done: 'Done',
};

const STEP_ORDER: MILessonStepId[] = [
  'hook',
  'learn',
  'try',
  'connect',
  'review',
  'check',
  'done',
];

interface LessonStepShellProps {
  currentStep: MILessonStepId;
  lessonTitle: string;
  estimatedMinutes: number;
  onExit: () => void;
  children: React.ReactNode;
  hideProgress?: boolean;
}

const LessonStepShell: React.FC<LessonStepShellProps> = ({
  currentStep,
  lessonTitle,
  estimatedMinutes,
  onExit,
  children,
  hideProgress = false,
}) => {
  const stepIndex = STEP_ORDER.indexOf(currentStep);
  const progressPct = ((stepIndex + 1) / STEP_ORDER.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50/50 to-teal-50/30 pb-8">
      <div className="sticky top-0 z-30 bg-emerald-50/95 backdrop-blur border-b border-emerald-200 px-3 pt-3 pb-2 safe-area-inset-top">
        <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="text-emerald-700 hover:bg-emerald-100 shrink-0 h-9 px-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Exit</span>
          </Button>
          <div className="flex-1 min-w-0 text-center">
            <p className="text-xs text-emerald-700/80 truncate">{lessonTitle}</p>
            {!hideProgress && (
              <p className="text-[10px] text-emerald-600/70">
                Step {stepIndex + 1} of {STEP_ORDER.length} · ~{estimatedMinutes} min
              </p>
            )}
          </div>
          <div className="w-9 shrink-0" />
        </div>
        {!hideProgress && (
          <>
            <div className="flex justify-between gap-1 mt-2 max-w-lg mx-auto">
              {STEP_ORDER.slice(0, -1).map((id, i) => (
                <div
                  key={id}
                  className={cn(
                    'flex-1 h-1 rounded-full transition-colors',
                    i <= stepIndex ? 'bg-emerald-500' : 'bg-emerald-200'
                  )}
                  title={STEP_LABELS[id]}
                />
              ))}
            </div>
            <div
              className="h-0.5 mt-1 max-w-lg mx-auto bg-emerald-100 rounded overflow-hidden"
              aria-hidden
            >
              <div
                className="h-full bg-emerald-400 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </>
        )}
      </div>
      <div className="max-w-lg mx-auto px-4 pt-4">{children}</div>
    </div>
  );
};

export default LessonStepShell;
