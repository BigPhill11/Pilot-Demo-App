import React, { useState } from 'react';
import type { LessonVisual } from '@/types/mi-lesson';
import { cn } from '@/lib/utils';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface LessonVisualImageProps {
  visual: LessonVisual;
  className?: string;
  aspect?: 'video' | 'square';
  fallbackSeed?: string;
  loading?: 'lazy' | 'eager';
}

function hashHue(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i) * 17) % 360;
  return h;
}

const LessonVisualImage: React.FC<LessonVisualImageProps> = ({
  visual,
  className,
  aspect = 'video',
  fallbackSeed,
  loading = 'lazy',
}) => {
  const [failed, setFailed] = useState(false);
  const seed = fallbackSeed ?? visual.src;
  const hue = hashHue(seed);

  if (failed) {
    return (
      <div
        className={cn(
          'rounded-xl border border-emerald-200 overflow-hidden flex flex-col items-center justify-center text-center p-4',
          aspect === 'video' ? 'aspect-video' : 'aspect-square max-h-48',
          className
        )}
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 45% 92%) 0%, hsl(${(hue + 40) % 360} 35% 88%) 100%)`,
        }}
        role="img"
        aria-label={visual.alt}
      >
        <span className="text-4xl mb-2" aria-hidden>
          <ThemedEmoji emoji="📊" className="h-[1em] w-[1em]" />
        </span>
        <p className="text-xs font-medium text-emerald-900/80 px-2">{visual.alt}</p>
      </div>
    );
  }

  return (
    <figure className={cn('rounded-xl overflow-hidden border border-emerald-200 bg-white shadow-sm', className)}>
      <img
        src={visual.src}
        alt={visual.alt}
        className={cn(
          'w-full object-contain bg-white',
          aspect === 'video' ? 'aspect-video max-h-[min(420px,70vh)]' : 'aspect-square max-h-64'
        )}
        loading={loading}
        decoding="async"
        onError={() => setFailed(true)}
      />
      {visual.caption && (
        <figcaption className="text-xs text-center text-emerald-800/80 px-3 py-2 bg-emerald-50/80 border-t border-emerald-100">
          {visual.caption}
        </figcaption>
      )}
    </figure>
  );
};

export default LessonVisualImage;
