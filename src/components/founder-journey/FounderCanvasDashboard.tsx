import React, { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronUp, Lightbulb, Lock, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { FOUNDER_MISSIONS } from '@/data/founder-journey/missions';
import type {
  FounderCanvasPrompt,
  FounderCanvasSectionId,
  FounderJourneyProgress,
  FounderMissionId,
} from '@/types/founder-journey';
import { cn } from '@/lib/utils';

interface Props {
  progress: FounderJourneyProgress;
  onSave: (sectionId: FounderCanvasSectionId, value: string) => void;
  focusMissionId?: FounderMissionId;
  compact?: boolean;
}

const sectionOrder: FounderCanvasSectionId[] = [
  'idea', 'problem', 'customer', 'solution', 'uniqueValue',
  'revenue', 'costs', 'validation', 'nextStep',
];

const promptEntries = FOUNDER_MISSIONS.flatMap((mission) =>
  mission.canvasPrompts.map((prompt) => ({ prompt, missionId: mission.id, missionOrder: mission.order })),
);

const promptBySection = Object.fromEntries(
  promptEntries.map((entry) => [entry.prompt.sectionId, entry]),
) as Record<FounderCanvasSectionId, { prompt: FounderCanvasPrompt; missionId: FounderMissionId; missionOrder: number }>;

const FounderCanvasDashboard: React.FC<Props> = ({
  progress,
  onSave,
  focusMissionId,
  compact = false,
}) => {
  const [drafts, setDrafts] = useState(progress.canvas);
  const [expanded, setExpanded] = useState<FounderCanvasSectionId | null>(focusMissionId
    ? FOUNDER_MISSIONS.find((mission) => mission.id === focusMissionId)?.canvasPrompts[0]?.sectionId ?? null
    : null);
  const [savedSection, setSavedSection] = useState<FounderCanvasSectionId | null>(null);

  useEffect(() => setDrafts(progress.canvas), [progress.canvas]);

  const unlocked = useMemo(() => {
    const completed = new Set(progress.completedMissionIds);
    return new Set(
      promptEntries
        .filter((entry) => completed.has(entry.missionId) || entry.missionId === focusMissionId)
        .map((entry) => entry.prompt.sectionId),
    );
  }, [focusMissionId, progress.completedMissionIds]);

  const filledCount = sectionOrder.filter((sectionId) => (progress.canvas[sectionId] ?? '').trim().length > 0).length;
  const completion = Math.round((filledCount / sectionOrder.length) * 100);

  const save = (sectionId: FounderCanvasSectionId) => {
    onSave(sectionId, (drafts[sectionId] ?? '').trim());
    setSavedSection(sectionId);
    window.setTimeout(() => setSavedSection((current) => current === sectionId ? null : current), 1400);
  };

  const visibleSections = compact ? sectionOrder.slice(0, 4) : sectionOrder;

  return (
    <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-700 p-5 text-white sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-emerald-200">
              <Lightbulb className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">My Founder Plan</span>
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">Lean Canvas</h2>
            <p className="mt-1 max-w-xl text-sm text-emerald-100">
              Turn each mission into one clear piece of your business idea. You can always come back and improve it.
            </p>
          </div>
          <div className="min-w-36 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
            <div className="mb-2 flex justify-between text-xs font-semibold">
              <span>{filledCount} of {sectionOrder.length} filled</span>
              <span>{completion}%</span>
            </div>
            <Progress value={completion} className="h-2 bg-white/20" />
          </div>
        </div>
      </div>

      <div className={cn('grid gap-3 p-4 sm:p-6', compact ? 'sm:grid-cols-2' : 'lg:grid-cols-3')}>
        {visibleSections.map((sectionId) => {
          const entry = promptBySection[sectionId];
          const isUnlocked = unlocked.has(sectionId);
          const isExpanded = expanded === sectionId;
          const hasValue = Boolean((progress.canvas[sectionId] ?? '').trim());
          const isSaved = savedSection === sectionId;

          return (
            <article
              key={sectionId}
              className={cn(
                'rounded-2xl border-2 transition-all',
                isUnlocked ? 'border-emerald-200 bg-white' : 'border-border bg-muted/30',
                isExpanded && 'ring-2 ring-primary/20',
              )}
            >
              <button
                type="button"
                className="flex min-h-20 w-full items-center gap-3 p-4 text-left"
                disabled={!isUnlocked}
                onClick={() => setExpanded(isExpanded ? null : sectionId)}
              >
                <div className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                  isUnlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground',
                )}>
                  {!isUnlocked ? <Lock className="h-4 w-4" /> : hasValue ? <Check className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{entry.prompt.title}</h3>
                  <p className="truncate text-xs text-muted-foreground">
                    {isUnlocked ? (progress.canvas[sectionId] || entry.prompt.prompt) : `Unlock in Mission ${entry.missionOrder}`}
                  </p>
                </div>
                {isUnlocked && (isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </button>

              {isUnlocked && isExpanded && (
                <div className="space-y-3 border-t p-4">
                  <p className="text-sm font-medium">{entry.prompt.prompt}</p>
                  <Textarea
                    value={drafts[sectionId] ?? ''}
                    onChange={(event) => setDrafts((current) => ({ ...current, [sectionId]: event.target.value }))}
                    onBlur={() => save(sectionId)}
                    placeholder={entry.prompt.placeholder}
                    className="min-h-28 resize-y text-base"
                    maxLength={500}
                  />
                  <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-900">
                    <span className="font-bold">Example: </span>{entry.prompt.example}
                  </div>
                  <Button type="button" onClick={() => save(sectionId)} className="h-11 w-full">
                    {isSaved ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                    {isSaved ? 'Saved' : 'Save to My Canvas'}
                  </Button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {compact && (
        <div className="border-t bg-muted/20 px-5 py-3 text-center text-xs text-muted-foreground">
          Complete missions to unlock all nine canvas sections.
        </div>
      )}
    </section>
  );
};

export default FounderCanvasDashboard;
