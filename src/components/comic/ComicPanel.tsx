import React, { useEffect, useState } from 'react';
import PandaLogo from '@/components/icons/PandaLogo';
import SpeechBubble from '@/components/comic/SpeechBubble';
import { cn } from '@/lib/utils';

export type ComicPanelStyle = 'normal' | 'wide' | 'tall' | 'splash';

export interface ComicPanelSpeechBubble {
  text: string;
  speaker: string;
}

export interface ComicPanelProps {
  imageUrl: string;
  /** If the primary image fails to load (e.g. file not uploaded yet), show this URL instead. */
  imageFallbackUrl?: string;
  caption?: string;
  speechBubble?: ComicPanelSpeechBubble;
  panelStyle?: ComicPanelStyle;
  className?: string;
}

const panelStyleClasses: Record<ComicPanelStyle, string> = {
  normal: 'aspect-[4/3] sm:aspect-video max-h-[220px] sm:max-h-[280px]',
  wide: 'aspect-[16/9] max-h-[200px] sm:max-h-[260px]',
  tall: 'aspect-[3/4] max-h-[280px] sm:max-h-[340px]',
  splash: 'aspect-[4/5] sm:aspect-video min-h-[200px] max-h-[320px] sm:max-h-[360px]',
};

const ComicPanel: React.FC<ComicPanelProps> = ({
  imageUrl,
  imageFallbackUrl,
  caption,
  speechBubble,
  panelStyle = 'normal',
  className,
}) => {
  const isPhil = speechBubble?.speaker === 'Phil';
  const [resolvedSrc, setResolvedSrc] = useState(imageUrl);

  useEffect(() => {
    setResolvedSrc(imageUrl);
  }, [imageUrl]);

  return (
    <div
      className={cn(
        'w-full max-w-full overflow-hidden rounded-lg border-[3px] border-black bg-white shadow-[6px_6px_0_0_rgba(0,0,0,0.12)] dark:border-foreground dark:bg-card',
        className,
      )}
    >
      <div className="flex flex-col gap-3 p-3 sm:p-4">
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-md border-2 border-black bg-muted dark:border-foreground',
            panelStyleClasses[panelStyle],
          )}
        >
          <img
            src={resolvedSrc}
            alt={caption || 'Comic panel'}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => {
              if (imageFallbackUrl && resolvedSrc !== imageFallbackUrl) {
                setResolvedSrc(imageFallbackUrl);
              }
            }}
          />
        </div>
        {caption ? (
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">{caption}</p>
        ) : null}

        {speechBubble ? (
          <div className="flex w-full max-w-full items-start gap-2 sm:gap-3">
            {isPhil ? (
              <div className="mt-1 shrink-0 rounded-full border-2 border-black bg-white p-0.5 shadow-sm dark:border-foreground">
                <PandaLogo className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover" />
              </div>
            ) : null}
            <div className="min-w-0 flex-1">
              <SpeechBubble text={speechBubble.text} speaker={isPhil ? undefined : speechBubble.speaker} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ComicPanel;
