import React from 'react';
import { cn } from '@/lib/utils';

interface ReelProgressDotsProps {
  count: number;
  activeIndex: number;
}

const ReelProgressDots: React.FC<ReelProgressDotsProps> = ({ count, activeIndex }) => {
  if (count <= 1) return null;

  return (
    <div
      className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none pt-12"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'rounded-full bg-green-300/80 transition-all duration-300',
            i === activeIndex ? 'h-5 w-1.5 bg-primary' : 'h-1.5 w-1.5'
          )}
        />
      ))}
    </div>
  );
};

export default ReelProgressDots;
