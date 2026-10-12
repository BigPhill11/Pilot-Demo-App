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
import { printFounderPlan } from '@/lib/printFounderPlan';

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
  [...promptEntries].reverse().map((entry) => [entry.prompt.sectionId, entry]),
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
  const planComplete = progress.completedMissionIds.length === FOUNDER_MISSIONS.length && filledCount === sectionOrder.length;

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
              Turn each lesson into one clear piece of your business idea. You can always come back and improve it.
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

      {planComplete && (
        <div className="mx-4 mt-4 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:mx-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-400/20 p-2 text-amber-700"><Sparkles className="h-5 w-5" /></div>
            <div>
              <p className="font-bold text-amber-950">Your Founder Plan is ready</p>
              <p className="text-sm text-amber-900">You can use this dashboard as a one-page summary when you explain or test your idea.</p>
            </div>
          </div>
          <Button type="button" variant="outline" className="shrink-0 bg-white" onClick={() => printFounderPlan(sectionOrder.map((id) => ({ title: promptBySection[id].prompt.title, answer: progress.canvas[id] ?? '' })))}>
            Print My Plan
          </Button>
        </div>
      )}

      <div className={cn('grid gap-3 p-4 sm:p-6', compact ? 'sm:grid-cols-2' : 'lg:grid-cols-3')}>
        {visibleSections.map((sectionId) => {
          const entry = promptBySection[sectionId];
          const prompt = FOUNDER_MISSIONS.find((lesson) => lesson.id === focusMissionId)?.canvasPrompts.find((value) => value.sectionId === sectionId) ?? entry.prompt;
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
                  <h3 className="font-semibold">{prompt.title}</h3>
                  <p className="truncate text-xs text-muted-foreground">
                    {isUnlocked ? (progress.canvas[sectionId] || prompt.prompt) : `Unlock in Lesson ${entry.missionOrder}`}
                  </p>
                </div>
                {isUnlocked && (isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </button>

              {isUnlocked && isExpanded && (
                <div className="space-y-3 border-t p-4">
                  <p className="text-sm font-medium">{prompt.prompt}</p>
                  <Textarea
                    aria-label={prompt.title}
                    value={drafts[sectionId] ?? ''}
                    onChange={(event) => {
                      const text = event.target.value;
                      setDrafts((current) => ({ ...current, [sectionId]: text }));
                      onSave(sectionId, text);
                    }}
                    onBlur={() => save(sectionId)}
                    placeholder={prompt.placeholder}
                    className="min-h-28 resize-y text-base"
                    maxLength={500}
                  />
                  <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-900">
                    <span className="font-bold">Example: </span>{prompt.example}
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
          Complete lessons to unlock all nine canvas sections.
        </div>
      )}
    </section>
  );
};

export default FounderCanvasDashboard;
