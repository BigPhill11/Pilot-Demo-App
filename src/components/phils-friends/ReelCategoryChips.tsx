import React from 'react';
import { cn } from '@/lib/utils';
import { LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReelCourseCategory } from '@/types/phils-friends';
import { REEL_CATEGORIES } from '@/types/phils-friends';

interface ReelCategoryChipsProps {
  activeCategory: ReelCourseCategory;
  onCategoryChange: (category: ReelCourseCategory) => void;
  onBrowseClick?: () => void;
  showDemoBadge?: boolean;
}

const ReelCategoryChips: React.FC<ReelCategoryChipsProps> = ({
  activeCategory,
  onCategoryChange,
  onBrowseClick,
  showDemoBadge,
}) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-20 flex items-center gap-2 px-3 pt-2 pb-3 pointer-events-none"
      style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top, 0px))' }}
    >
      <div className="flex-1 overflow-x-auto scrollbar-hide flex gap-2 pointer-events-auto items-center">
        {showDemoBadge && (
          <span className="shrink-0 rounded-full bg-amber-100 text-amber-900 px-2 py-1 text-[10px] font-bold ring-1 ring-amber-200">
            Demo
          </span>
        )}
        {REEL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all touch-manipulation',
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-white/90 text-green-800 backdrop-blur-sm border border-green-200 shadow-sm'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {onBrowseClick && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBrowseClick}
          className="shrink-0 h-9 w-9 rounded-full bg-white/90 text-green-800 hover:bg-white shadow-sm ring-1 ring-green-200 pointer-events-auto"
          aria-label="Browse all videos"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ReelCategoryChips;
