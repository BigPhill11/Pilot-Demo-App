import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Gamepad2,
  GraduationCap,
  LayoutDashboard,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import FounderComicLesson from './FounderComicLesson';
import FounderDecisionSimulator from './FounderDecisionSimulator';
import FounderCanvasDashboard from './FounderCanvasDashboard';
import VillageQuizStep from '@/components/learn/market-intelligence/village/VillageQuizStep';
import TeachPhilPanel from '@/components/teach-phil/TeachPhilPanel';
import type { TeachPhilResult } from '@/hooks/useTeachPhilSession';
import type { FounderJourneyProgress, FounderMission } from '@/types/founder-journey';
import { cn } from '@/lib/utils';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { getFounderModule } from '@/data/founder-journey/curriculum';
import { getFounderTeachBackSpec } from '@/lib/teach-back-spec';

type FounderStep = 'comic' | 'simulate' | 'quiz' | 'teach' | 'canvas' | 'complete';

const STEPS: Array<{ id: FounderStep; label: string; icon: React.ElementType }> = [
  { id: 'comic', label: 'Comic', icon: BookOpen },
  { id: 'simulate', label: 'Play', icon: Gamepad2 },
  { id: 'quiz', label: 'Check', icon: CheckCircle2 },
  { id: 'teach', label: 'Teach', icon: GraduationCap },
  { id: 'canvas', label: 'Build', icon: LayoutDashboard },
  { id: 'complete', label: 'Done', icon: Trophy },
];

interface Props {
  mission: FounderMission;
  progress: FounderJourneyProgress;
  initialStep?: string;
  alreadyCompleted: boolean;
  onBack: () => void;
  onSaveStep: (step: FounderStep) => void;
  onSaveCanvas: (sectionId: Parameters<React.ComponentProps<typeof FounderCanvasDashboard>['onSave']>[0], value: string) => void;
  onComplete: () => void;
  onSaveTeachResult: (result: TeachPhilResult) => void;
}

const FounderMissionFlow: React.FC<Props> = ({
  mission,
  progress,
  initialStep,
  alreadyCompleted,
  onBack,
  onSaveStep,
  onSaveCanvas,
  onComplete,
  onSaveTeachResult,
}) => {
  const validInitial = STEPS.some(({ id }) => id === initialStep) ? initialStep as FounderStep : 'comic';
  const [step, setStep] = useState<FounderStep>(alreadyCompleted ? 'comic' : validInitial);
  const [teachResult, setTeachResult] = useState<TeachPhilResult | null>(progress.teachResults?.[mission.id] ?? null);
  const [quizAttempt, setQuizAttempt] = useState(0);
  const { awardResources } = usePlatformIntegration();
  const module = getFounderModule(mission.id)!;
  const lessonNumber = module.lessonIds.indexOf(mission.id) + 1;
  const stepIndex = STEPS.findIndex(({ id }) => id === step);

  const currentCanvasComplete = useMemo(
    () => mission.canvasPrompts.every(({ sectionId }) => Boolean((progress.canvas[sectionId] ?? '').trim())),
    [mission.canvasPrompts, progress.canvas],
  );

  const moveTo = (next: FounderStep) => {
    setStep(next);
    if (!alreadyCompleted) onSaveStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finish = () => {
    if (!alreadyCompleted) {
      awardResources(
        mission.rewards.bamboo + (teachResult?.passRewardBamboo ?? 0) + (teachResult?.optUpBonusBamboo ?? 0),
        mission.rewards.xp + (teachResult?.passXp ?? 0),
        `Founder Journey: ${mission.title}`,
        true,
      );
    }
    onComplete();
  };

  return (
    <div className="mx-auto max-w-4xl pb-10">
      <header className="sticky top-0 z-20 -mx-4 mb-5 border-b bg-background/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:rounded-2xl sm:border">
        <div className="mb-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0" onClick={onBack} aria-label="Back to Founder Journey">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">{module.title} · Lesson {lessonNumber} of {module.lessonIds.length}</p>
            <h1 className="truncate text-lg font-bold sm:text-xl">{mission.title}</h1>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{mission.estimatedMinutes} min</span>
        </div>
        <div className="flex items-center gap-1">
          {STEPS.map(({ id, label, icon: Icon }, index) => (
            <React.Fragment key={id}>
              <div className={cn(
                'flex min-w-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold',
                index === stepIndex && 'bg-primary text-primary-foreground',
                index < stepIndex && 'bg-primary/15 text-primary',
                index > stepIndex && 'bg-muted text-muted-foreground',
              )}>
                <Icon className="h-3 w-3 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={cn('h-0.5 flex-1 rounded-full bg-muted', index < stepIndex && 'bg-primary/50')} />
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      {step === 'comic' && <FounderComicLesson mission={mission} onComplete={() => moveTo('simulate')} />}
      {step === 'simulate' && <FounderDecisionSimulator simulator={mission.simulator} onComplete={() => moveTo('quiz')} />}
      {step === 'quiz' && (
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 rounded-2xl border bg-primary/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Knowledge Check</p>
            <p className="mt-1 text-sm text-muted-foreground">Score 75% or higher to unlock Teach Phil.</p>
          </div>
          <VillageQuizStep
            key={quizAttempt}
            questions={mission.quiz}
            onComplete={(passed) => {
              if (passed) moveTo('teach');
              else {
                setQuizAttempt((attempt) => attempt + 1);
                moveTo('comic');
              }
            }}
          />
        </div>
      )}
      {step === 'teach' && (
        <div className="mx-auto max-w-2xl">
          <TeachPhilPanel
            requireExplanation
            lessonId={`founder-${mission.id}`}
            spec={getFounderTeachBackSpec(mission)}
            defaultPhilAge="teen"
            onComplete={(result) => {
              setTeachResult(result);
              if (!alreadyCompleted) onSaveTeachResult(result);
              moveTo('canvas');
            }}
          />
        </div>
      )}
      {step === 'canvas' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Build Your Founder Plan</p>
            <p className="mt-1 text-sm">Complete the highlighted canvas sections using your own idea. Short, clear answers are enough.</p>
          </div>
          <FounderCanvasDashboard progress={progress} onSave={onSaveCanvas} focusMissionId={mission.id} />
          <Button className="h-12 w-full text-base" disabled={!currentCanvasComplete} onClick={() => moveTo('complete')}>
            {currentCanvasComplete ? 'Finish Lesson' : `Fill ${mission.canvasPrompts.length} lesson section${mission.canvasPrompts.length === 1 ? '' : 's'} to continue`}
            {currentCanvasComplete && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      )}
      {step === 'complete' && (
        <div className="space-y-5 rounded-3xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-background p-6 text-center sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
            <Trophy className="h-10 w-10" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Lesson complete</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{mission.title}</h2>
            <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
              You turned the lesson into decisions, explained it in your own words, and added it to your Founder Plan.
            </p>
          </div>
          <div className="mx-auto grid max-w-sm grid-cols-2 gap-3">
            <div className="rounded-2xl border bg-white p-4">
              <div className="text-2xl font-bold text-primary">+{alreadyCompleted ? 0 : mission.rewards.xp}</div>
              <div className="text-xs text-muted-foreground">XP</div>
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <div className="text-2xl font-bold text-primary">+{alreadyCompleted ? 0 : mission.rewards.bamboo}</div>
              <div className="text-xs text-muted-foreground">Bamboo</div>
            </div>
          </div>
          {alreadyCompleted && <p className="text-sm text-muted-foreground">Review complete — rewards were earned the first time.</p>}
          <Button onClick={finish} className="h-12 w-full max-w-md text-base">
            <Sparkles className="mr-2 h-4 w-4" /> Back to Founder Journey
          </Button>
        </div>
      )}
    </div>
  );
};

export default FounderMissionFlow;
