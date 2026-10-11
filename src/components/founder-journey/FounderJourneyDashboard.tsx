import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Flag,
  LayoutDashboard,
  Lock,
  Map,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FOUNDER_MISSIONS } from '@/data/founder-journey/missions';
import type {
  FounderCanvasSectionId,
  FounderJourneyProgress,
  FounderMissionId,
} from '@/types/founder-journey';
import FounderCanvasDashboard from './FounderCanvasDashboard';
import { cn } from '@/lib/utils';

interface Props {
  progress: FounderJourneyProgress;
  completionPercent: number;
  onStartMission: (missionId: FounderMissionId) => void;
  onSaveCanvas: (sectionId: FounderCanvasSectionId, value: string) => void;
}

const FounderJourneyDashboard: React.FC<Props> = ({
  progress,
  completionPercent,
  onStartMission,
  onSaveCanvas,
}) => {
  const [showFullCanvas, setShowFullCanvas] = useState(false);
  const completed = new Set(progress.completedMissionIds);
  const nextMission = FOUNDER_MISSIONS.find((mission) => !completed.has(mission.id));

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-green-800 to-emerald-600 p-6 text-white shadow-xl sm:p-9">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-lime-300/10" />
        <div className="relative grid gap-7 lg:grid-cols-[1fr_280px] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-100">
              <Rocket className="h-4 w-4" /> Founder Journey
            </div>
            <h1 className="max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
              Build an idea people actually want.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-100 sm:text-base">
              Follow Phil through four founder missions. Make startup decisions, prove what you learned, and build your own plan along the way.
            </p>
            {nextMission ? (
              <Button
                size="lg"
                className="mt-6 h-12 bg-white text-emerald-900 hover:bg-emerald-50"
                onClick={() => onStartMission(nextMission.id)}
              >
                {completionPercent > 0 ? 'Continue Journey' : 'Start Mission 1'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3 font-semibold">
                <CheckCircle2 className="h-5 w-5" /> Founder Journey complete
              </div>
            )}
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-200">Journey progress</p>
                <p className="text-3xl font-black">{completionPercent}%</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Map className="h-7 w-7" />
              </div>
            </div>
            <Progress value={completionPercent} className="h-3 bg-white/20" />
            <div className="mt-3 flex justify-between text-xs text-emerald-100">
              <span>{progress.completedMissionIds.length} of {FOUNDER_MISSIONS.length} missions</span>
              <span>{Object.values(progress.canvas).filter((value) => value?.trim()).length}/9 canvas blocks</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Flag className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Your route</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold">Four founder missions</h2>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">Comic → Play → Check → Teach → Build</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {FOUNDER_MISSIONS.map((mission, index) => {
            const isComplete = completed.has(mission.id);
            const isUnlocked = index === 0 || completed.has(FOUNDER_MISSIONS[index - 1].id) || isComplete;
            const isActive = progress.activeMissionId === mission.id;

            return (
              <article
                key={mission.id}
                className={cn(
                  'relative overflow-hidden rounded-3xl border-2 bg-card p-5 transition-all',
                  isUnlocked ? 'border-emerald-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-lg' : 'border-border bg-muted/30 opacity-70',
                  isActive && 'ring-2 ring-primary/30',
                )}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-2xl text-2xl',
                      isComplete ? 'bg-emerald-600 text-white' : isUnlocked ? 'bg-emerald-100' : 'bg-muted',
                    )}>
                      {isComplete ? <CheckCircle2 className="h-6 w-6" /> : isUnlocked ? mission.icon : <Lock className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">Mission {mission.order}</p>
                      <h3 className="text-lg font-bold">{mission.title}</h3>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" /> {mission.estimatedMinutes}m
                  </span>
                </div>
                <p className="min-h-10 text-sm text-muted-foreground">{mission.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['5-panel comic', 'Simulation', 'Quiz', 'Teach Phil'].map((label) => (
                    <span key={label} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium">{label}</span>
                  ))}
                </div>
                <Button
                  className="mt-5 h-11 w-full"
                  variant={isComplete ? 'outline' : 'default'}
                  disabled={!isUnlocked}
                  onClick={() => onStartMission(mission.id)}
                >
                  {!isUnlocked ? 'Complete the previous mission' : isComplete ? 'Review Mission' : isActive ? 'Resume Mission' : 'Start Mission'}
                  {isUnlocked && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Build as you learn</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold">Your founder dashboard</h2>
          </div>
          <Button variant="outline" className="h-11" onClick={() => setShowFullCanvas((show) => !show)}>
            <Sparkles className="mr-2 h-4 w-4" />
            {showFullCanvas ? 'Show Compact View' : 'Open Full Canvas'}
          </Button>
        </div>
        <FounderCanvasDashboard
          progress={progress}
          onSave={onSaveCanvas}
          compact={!showFullCanvas}
        />
      </div>
    </div>
  );
};

export default FounderJourneyDashboard;
