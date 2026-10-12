import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import ComicPanel from '@/components/comic/ComicPanel';
import { Button } from '@/components/ui/button';
import type { FounderMission } from '@/types/founder-journey';
import { cn } from '@/lib/utils';

interface Props {
  mission: FounderMission;
  onComplete: () => void;
}

const FounderComicLesson: React.FC<Props> = ({ mission, onComplete }) => {
  const [panelIndex, setPanelIndex] = useState(0);
  const panel = mission.comicPanels[panelIndex];
  const isLast = panelIndex === mission.comicPanels.length - 1;

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="h-11"
          disabled={panelIndex === 0}
          onClick={() => setPanelIndex((index) => Math.max(0, index - 1))}
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Comic progress">
          {mission.comicPanels.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === panelIndex}
              aria-label={`Panel ${index + 1} of ${mission.comicPanels.length}`}
              onClick={() => index <= panelIndex && setPanelIndex(index)}
              className={cn(
                'h-2.5 w-2.5 rounded-full bg-muted transition-all',
                index < panelIndex && 'bg-primary/60',
                index === panelIndex && 'w-7 bg-primary',
              )}
            />
          ))}
        </div>
        <span className="w-16 text-right text-xs font-medium text-muted-foreground">
          {panelIndex + 1} / {mission.comicPanels.length}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="rounded-xl bg-primary/10 p-2 text-primary">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Founder Comic</p>
          <h2 className="text-lg font-semibold">{panel.title ?? mission.title}</h2>
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <ComicPanel
          imageUrl={panel.imageUrl}
          imageFallbackUrl="/logo.png"
          imageAlt={panel.alt}
          caption={`Part ${panelIndex + 1} of ${mission.comicPanels.length}`}
          speechBubble={{ speaker: 'Phil', text: panel.text }}
          panelStyle="splash"
          className="rounded-2xl"
        />
        <div className="mt-5 space-y-4 text-sm leading-relaxed sm:text-base">
          {panel.explanation && <p>{panel.explanation}</p>}
          {panel.example && <div className="rounded-2xl border bg-card p-4"><p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">Work through an example</p><p>{panel.example}</p></div>}
          {panel.takeaway && <div className="rounded-2xl bg-primary/10 p-4"><p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">Remember this</p><p>{panel.takeaway}</p></div>}
        </div>
      </div>

      <Button
        className="h-12 w-full text-base"
        onClick={() => {
          if (isLast) onComplete();
          else setPanelIndex((index) => index + 1);
        }}
      >
        {isLast ? 'Try the Simulation' : 'Next Panel'}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      {isLast && mission.sources && <details className="rounded-xl border p-4 text-sm"><summary className="cursor-pointer font-medium">Lesson sources</summary><ul className="mt-3 space-y-2">{mission.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="text-primary underline">{source.title}</a></li>)}</ul></details>}
    </div>
  );
};

export default FounderComicLesson;
