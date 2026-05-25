import React from 'react';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RESUME_SECTION_LABELS } from '@/data/career-readiness/resume';
import {
  RESUME_SECTION_ORDER,
  type ResumeSectionId,
  type ResumeBuilderDetails,
  canAccessResumeSection,
  isResumeSectionComplete,
} from '@/types/career-readiness';

interface ResumeSectionNavigatorProps {
  details: ResumeBuilderDetails;
  onSelect: (sectionId: ResumeSectionId) => void;
}

const ResumeSectionNavigator: React.FC<ResumeSectionNavigatorProps> = ({
  details,
  onSelect,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {RESUME_SECTION_ORDER.map((sectionId) => {
        const meta = RESUME_SECTION_LABELS[sectionId];
        const isActive = details.currentSectionId === sectionId;
        const complete =
          details.completedSections.includes(sectionId) ||
          isResumeSectionComplete(sectionId, details.answers);
        const locked = !canAccessResumeSection(details, sectionId);

        return (
          <button
            key={sectionId}
            type="button"
            disabled={locked}
            onClick={() => onSelect(sectionId)}
            className={cn(
              'shrink-0 rounded-xl border px-3 py-2 text-left min-w-[120px] transition-colors',
              isActive
                ? 'border-emerald-600 bg-emerald-800 text-white'
                : 'border-emerald-100 bg-white hover:bg-emerald-50',
              locked && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              {locked ? (
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              ) : complete ? (
                <Check className={cn('h-3.5 w-3.5', isActive ? 'text-emerald-200' : 'text-emerald-600')} />
              ) : null}
              <span className="text-xs font-semibold">{meta.title}</span>
            </div>
            <p
              className={cn(
                'text-[10px] leading-tight line-clamp-2',
                isActive ? 'text-emerald-100' : 'text-muted-foreground'
              )}
            >
              {meta.subtitle}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default ResumeSectionNavigator;
