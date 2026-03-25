import React from 'react';
import { cn } from '@/lib/utils';

interface SpeechBubbleProps {
  text: string;
  speaker?: string;
  className?: string;
}

/**
 * Comic-style speech bubble with tail pointing down-left (toward the scene).
 */
const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, speaker, className }) => {
  return (
    <div className={cn('relative', className)}>
      {speaker ? (
        <p className="text-xs font-bold uppercase tracking-wide text-green-800 dark:text-green-300 mb-1">
          {speaker}
        </p>
      ) : null}
      <div
        className={cn(
          'relative rounded-2xl border-[3px] border-black bg-amber-50 px-3 py-3 sm:px-4 sm:py-3',
          'shadow-[4px_4px_0_0_rgba(0,0,0,0.85)] dark:bg-amber-950/40 dark:border-foreground',
        )}
      >
        <p className="text-sm leading-relaxed text-gray-900 dark:text-amber-50 whitespace-pre-wrap">{text}</p>
        <div
          className="absolute -bottom-[10px] left-6 h-0 w-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-black dark:border-t-foreground"
          aria-hidden
        />
        <div
          className="absolute -bottom-[6px] left-[26px] h-0 w-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-amber-50 dark:border-t-amber-950/40"
          aria-hidden
        />
      </div>
    </div>
  );
};

export default SpeechBubble;
