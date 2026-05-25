import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ReelViewportProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 9:16 reel frame: edge-to-edge on small phones, centered phone column on desktop.
 */
const ReelViewport: React.FC<ReelViewportProps> = ({ children, className }) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'flex h-full w-full min-h-0 items-center justify-center',
        isMobile ? 'p-1' : 'px-4 py-3',
        className
      )}
    >
      <div
        className={cn(
          'relative h-full overflow-hidden bg-green-50 shadow-lg ring-1 ring-green-200/70',
          isMobile
            ? 'w-full max-h-full rounded-2xl'
            : 'aspect-[9/16] w-auto max-w-[min(100%,420px)] max-h-full rounded-3xl'
        )}
        style={
          isMobile
            ? {
                aspectRatio: '9 / 16',
                width: 'min(100%, calc((100dvh - 10rem) * 9 / 16))',
                maxHeight: '100%',
              }
            : { height: '100%' }
        }
      >
        {children}
      </div>
    </div>
  );
};

export default ReelViewport;
