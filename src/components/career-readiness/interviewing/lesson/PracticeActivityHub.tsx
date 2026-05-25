import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ACTIVITY_LABELS } from '@/data/career-readiness/interviewing';
import type { CareerActivityId } from '@/types/career-readiness';

interface PracticeActivityHubProps {
  activityIds: CareerActivityId[];
  completedActivityIds: CareerActivityId[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onContinueToTest?: () => void;
  practiceStepComplete: boolean;
}

const PracticeActivityHub: React.FC<PracticeActivityHubProps> = ({
  activityIds,
  completedActivityIds,
  currentIndex,
  onSelectIndex,
  onContinueToTest,
  practiceStepComplete,
}) => {
  const allDone = activityIds.every((id) => completedActivityIds.includes(id));
  const safeIndex = Math.min(Math.max(0, currentIndex), activityIds.length - 1);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Tap any simulation to practice or review your answers. Complete each one before the
        checkpoint.
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {activityIds.map((id, index) => {
          const meta = ACTIVITY_LABELS[id];
          const done = completedActivityIds.includes(id);
          const active = index === safeIndex;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectIndex(index)}
              className={`shrink-0 min-w-[140px] max-w-[180px] p-3 rounded-xl border-2 text-left transition-all ${
                active
                  ? 'border-emerald-500 bg-emerald-50 shadow-md scale-[1.02]'
                  : done
                    ? 'border-emerald-200 bg-white hover:border-emerald-300'
                    : 'border-border bg-white hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <span className="text-[10px] font-bold text-emerald-700">
                  {index + 1}/{activityIds.length}
                </span>
              </div>
              <p className="text-sm font-semibold leading-tight line-clamp-2">{meta.title}</p>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={safeIndex <= 0}
          onClick={() => onSelectIndex(safeIndex - 1)}
        >
          <ChevronLeft className="h-4 w-4 mr-0.5" />
          Prev
        </Button>
        <span className="text-xs text-muted-foreground text-center flex-1">
          {completedActivityIds.filter((id) => activityIds.includes(id)).length} of{' '}
          {activityIds.length} done
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={safeIndex >= activityIds.length - 1}
          onClick={() => onSelectIndex(safeIndex + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-0.5" />
        </Button>
      </div>

      {allDone && onContinueToTest && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Button
            type="button"
            className="w-full bg-emerald-800 hover:bg-emerald-900"
            onClick={onContinueToTest}
          >
            {practiceStepComplete ? 'Review checkpoint' : 'Continue to lesson checkpoint'}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PracticeActivityHub;
