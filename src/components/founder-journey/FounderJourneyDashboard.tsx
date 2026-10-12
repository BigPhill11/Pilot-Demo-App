import React, { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Clock3, LayoutDashboard, Lock, Map, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FOUNDER_MISSIONS, getFounderMission } from '@/data/founder-journey/missions';
import { FOUNDER_MODULES, FOUNDER_SECTIONS } from '@/data/founder-journey/curriculum';
import { isFounderLessonUnlocked } from '@/lib/founderJourneyProgress';
import type { FounderCanvasSectionId, FounderJourneyProgress, FounderMissionId } from '@/types/founder-journey';
import FounderCanvasDashboard from './FounderCanvasDashboard';

interface Props {
  progress: FounderJourneyProgress;
  completionPercent: number;
  onStartMission: (missionId: FounderMissionId) => void;
  onSaveCanvas: (sectionId: FounderCanvasSectionId, value: string) => void;
  onShowIntro: () => void;
}

const FounderJourneyDashboard: React.FC<Props> = ({ progress, completionPercent, onStartMission, onSaveCanvas, onShowIntro }) => {
  const [showFullCanvas, setShowFullCanvas] = useState(false);
  const completed = new Set(progress.completedMissionIds);
  const nextLesson = FOUNDER_MISSIONS.find((lesson) => !completed.has(lesson.id));
  const resumeLesson = getFounderMission(progress.activeMissionId);
  const next = resumeLesson && !completed.has(resumeLesson.id) && isFounderLessonUnlocked(resumeLesson.id, progress) ? resumeLesson : nextLesson;

  return (
    <div className="mx-auto max-w-6xl space-y-7 pb-12">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-green-800 to-emerald-600 p-6 text-white shadow-xl sm:p-9">
        <div className="grid gap-7 lg:grid-cols-[1fr_280px] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider"><Rocket className="h-4 w-4" /> Founder Journey</p>
            <h1 className="max-w-2xl text-3xl font-black leading-tight sm:text-5xl">Build an idea people want.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-100 sm:text-base">
              Three sections. Six modules. Eighteen lessons. Follow Phil, practice startup decisions, and build a plan for your own idea.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {next ? <Button size="lg" className="h-12 bg-white text-emerald-900 hover:bg-emerald-50" onClick={() => onStartMission(next.id)}>
                {progress.activeMissionId || completed.size > 0 ? 'Continue Journey' : 'Start First Lesson'}<ArrowRight className="ml-2 h-4 w-4" />
              </Button> : <p className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3 font-semibold"><CheckCircle2 className="h-5 w-5" /> Founder Journey complete</p>}
              <Button variant="ghost" className="h-12 text-white hover:bg-white/15 hover:text-white" onClick={onShowIntro}><BookOpen className="mr-2 h-4 w-4" /> Journey Intro</Button>
            </div>
            {next && <p className="mt-3 text-xs text-emerald-100">Next: {next.title}</p>}
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-5">
            <div className="mb-4 flex items-center justify-between"><div><p className="text-xs uppercase tracking-wider text-emerald-200">Journey progress</p><p className="text-3xl font-black">{completionPercent}%</p></div><Map className="h-8 w-8" /></div>
            <Progress value={completionPercent} className="h-3 bg-white/20" />
            <p className="mt-3 text-xs text-emerald-100">{completed.size} of {FOUNDER_MISSIONS.length} lessons complete</p>
            <p className="mt-1 text-xs text-emerald-100">{Object.values(progress.canvas).filter((value) => value?.trim()).length} of 9 Founder Plan blocks filled</p>
          </div>
        </div>
      </section>

      {FOUNDER_SECTIONS.map((section, sectionIndex) => (
        <section key={section.id} aria-labelledby={`founder-section-${section.id}`}>
          <div className="mb-4"><p className="text-xs font-bold uppercase tracking-wider text-primary">Section {sectionIndex + 1} of {FOUNDER_SECTIONS.length}</p><h2 id={`founder-section-${section.id}`} className="mt-1 text-2xl font-bold">{section.title}</h2><p className="mt-1 text-sm text-muted-foreground">{section.description}</p></div>
          <div className="grid gap-4 lg:grid-cols-2">
            {FOUNDER_MODULES.filter((module) => module.sectionId === section.id).map((module) => {
              const done = module.lessonIds.filter((id) => completed.has(id)).length;
              return <article key={module.id} className="min-w-0 overflow-hidden rounded-3xl border bg-card shadow-sm">
                <div className="border-b bg-primary/5 p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-bold">{module.title}</h3><span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{done}/{module.lessonIds.length}</span></div><p className="mt-1 text-sm text-muted-foreground">{module.description}</p><Progress value={done / module.lessonIds.length * 100} className="mt-3 h-2" /></div>
                <ol className="divide-y">
                  {module.lessonIds.map((id, index) => {
                    const lesson = getFounderMission(id)!;
                    const isComplete = completed.has(id);
                    const unlocked = isFounderLessonUnlocked(id, progress);
                    const active = progress.activeMissionId === id;
                    return <li key={id} className="p-4">
                      <div className="flex items-start gap-3"><div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">{isComplete ? <CheckCircle2 className="h-4 w-4" /> : !unlocked ? <Lock className="h-4 w-4" /> : index + 1}</div><div className="min-w-0 flex-1"><h4 className="font-semibold leading-snug">{lesson.title}</h4><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{lesson.tagline}</p><p className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" />{lesson.estimatedMinutes} min</span><span>+{lesson.rewards.xp} XP · +{lesson.rewards.bamboo} bamboo</span></p></div></div>
                      <Button disabled={!unlocked} variant={isComplete ? 'outline' : 'default'} className="mt-3 h-11 w-full whitespace-normal" onClick={() => onStartMission(id)}>{isComplete ? 'Review Lesson' : !unlocked ? 'Complete the previous lesson' : active ? 'Resume Lesson' : 'Start Lesson'}{unlocked && <ArrowRight className="ml-2 h-4 w-4 shrink-0" />}</Button>
                    </li>;
                  })}
                </ol>
              </article>;
            })}
          </div>
        </section>
      ))}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary"><LayoutDashboard className="h-4 w-4" /> My Founder Plan</p><h2 className="mt-1 text-2xl font-bold">Your idea, one page at a time</h2></div><Button variant="outline" className="h-11" onClick={() => setShowFullCanvas((value) => !value)}>{showFullCanvas ? 'Show Summary' : 'Open Full Canvas'}</Button></div>
        <FounderCanvasDashboard progress={progress} onSave={onSaveCanvas} compact={!showFullCanvas} />
      </section>
    </div>
  );
};
export default FounderJourneyDashboard;
