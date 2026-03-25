import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ComicPanel from '@/components/comic/ComicPanel';
import { cn } from '@/lib/utils';
import { getComicPanelImageUrl, getComicPanelPlaceholderUrl } from '@/data/personal-finance/comicPanelBackgrounds';

interface MicroLessonComicProps {
  lessonId: string;
  content: string;
  lessonTitle?: string;
  onComplete: () => void;
}

const MicroLessonComic: React.FC<MicroLessonComicProps> = ({ lessonId, content, lessonTitle, onComplete }) => {
  const panels = useMemo(
    () =>
      content
        .split('\n\n')
        .map((s) => s.trim())
        .filter(Boolean),
    [content],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = Math.max(0, panels.length - 1);
  const isLast = currentIndex >= lastIndex;

  const goBack = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goSkip = () => setCurrentIndex(lastIndex);
  const goContinue = () => {
    if (isLast) {
      onComplete();
      return;
    }
    setCurrentIndex((i) => Math.min(lastIndex, i + 1));
  };

  if (panels.length === 0) {
    return (
      <div className="rounded-xl border border-destructive/50 p-4 text-sm text-muted-foreground">
        This lesson has no micro-lesson content.
        <Button className="mt-4 w-full" onClick={onComplete}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  const panelText = panels[currentIndex];
  const panelNumber = currentIndex + 1;
  const placeholderUrl = getComicPanelPlaceholderUrl(panelNumber);
  const configuredUrl = getComicPanelImageUrl(lessonId, currentIndex);
  const imageUrl = configuredUrl ?? placeholderUrl;
  const imageFallbackUrl = configuredUrl ? placeholderUrl : undefined;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-10 shrink-0 px-2 sm:px-3"
          onClick={goBack}
          disabled={currentIndex === 0}
          aria-label="Previous panel"
        >
          Back
        </Button>

        <div className="flex flex-1 flex-wrap items-center justify-center gap-1.5 sm:gap-2" role="tablist" aria-label="Comic panel progress">
          {panels.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Panel ${i + 1} of ${panels.length}`}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-all sm:h-2 sm:w-2',
                i === currentIndex && 'w-6 bg-primary sm:w-5',
                i < currentIndex && 'bg-primary/70',
                i > currentIndex && 'bg-muted',
              )}
              onClick={() => {
                if (i <= currentIndex) setCurrentIndex(i);
              }}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-10 shrink-0 px-2 sm:px-3"
          onClick={goSkip}
          disabled={isLast}
          aria-label="Skip to last panel"
        >
          Skip
        </Button>
      </div>

      <div className="flex items-center gap-2 text-primary">
        <BookOpen className="h-5 w-5 shrink-0" />
        <div>
          <h2 className="text-base font-semibold sm:text-lg">Micro-Lesson</h2>
          {lessonTitle ? <p className="text-xs text-muted-foreground sm:text-sm">{lessonTitle}</p> : null}
        </div>
      </div>

      <div
        className="rounded-xl bg-gradient-to-b from-amber-100/80 via-amber-50/50 to-background p-3 sm:p-4 dark:from-amber-950/20 dark:via-amber-950/10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.08) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(22, 163, 74, 0.06) 0%, transparent 40%)',
        }}
      >
        <div className="mx-auto w-full max-w-lg" aria-live="polite">
          <ComicPanel
            imageUrl={imageUrl}
            imageFallbackUrl={imageFallbackUrl}
            caption={`Part ${panelNumber} of ${panels.length}`}
            speechBubble={{ text: panelText, speaker: 'Phil' }}
            panelStyle="normal"
          />
        </div>
      </div>

      <Button type="button" onClick={goContinue} className="h-12 w-full text-base" size="lg">
        {isLast ? (
          <>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default MicroLessonComic;
