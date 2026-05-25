import React from 'react';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getReelCategoryLabel } from '@/types/phils-friends';
import type { ReelCourseCategory } from '@/types/phils-friends';

interface ReelFeedToolbarProps {
  category: ReelCourseCategory;
  onBack: () => void;
  onBrowseClick?: () => void;
  showDemoBadge?: boolean;
}

const ReelFeedToolbar: React.FC<ReelFeedToolbarProps> = ({
  category,
  onBack,
  onBrowseClick,
  showDemoBadge,
}) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-30 flex items-center gap-2 px-3 py-2 pointer-events-none"
      style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top, 0px))' }}
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="pointer-events-auto h-9 gap-1.5 rounded-full bg-white/95 text-green-800 shadow-sm ring-1 ring-green-200 hover:bg-white pl-2 pr-3"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" />
        <span className="text-xs font-semibold">Topics</span>
      </Button>

      <div className="flex-1 flex items-center justify-center gap-2 pointer-events-none min-w-0">
        <h1 className="text-sm font-bold text-green-900 truncate">
          {getReelCategoryLabel(category)}
        </h1>
        {showDemoBadge && (
          <span className="shrink-0 rounded-full bg-amber-100 text-amber-900 px-2 py-0.5 text-[10px] font-bold ring-1 ring-amber-200">
            Demo
          </span>
        )}
      </div>

      {onBrowseClick ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBrowseClick}
          className="pointer-events-auto h-9 w-9 rounded-full bg-white/95 text-green-800 hover:bg-white shadow-sm ring-1 ring-green-200 shrink-0"
          aria-label="Browse full interviews"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
      ) : (
        <div className="w-9 shrink-0" aria-hidden />
      )}
    </div>
  );
};

export default ReelFeedToolbar;
