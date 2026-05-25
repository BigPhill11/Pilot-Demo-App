import React from 'react';
import PandaLogo from '@/components/icons/PandaLogo';
import { Video } from 'lucide-react';
import type { ReelCourseCategory } from '@/types/phils-friends';
import { REEL_CATEGORIES } from '@/types/phils-friends';

interface ReelEmptyStateProps {
  category: ReelCourseCategory;
}

const ReelEmptyState: React.FC<ReelEmptyStateProps> = ({ category }) => {
  const label = REEL_CATEGORIES.find((c) => c.id === category)?.label ?? 'this category';

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center bg-gradient-to-b from-green-50 to-white">
      <div className="rounded-full bg-green-100 p-6 mb-6 ring-2 ring-green-200">
        <PandaLogo className="h-16 w-16 opacity-90" />
      </div>
      <Video className="h-10 w-10 text-primary mb-4" />
      <h2 className="text-xl font-bold text-green-900 mb-2">More pros coming soon</h2>
      <p className="text-green-700/90 text-sm max-w-xs">
        We&apos;re adding short clips from finance professionals for {label}. Check back soon or try
        another category.
      </p>
    </div>
  );
};

export default ReelEmptyState;
