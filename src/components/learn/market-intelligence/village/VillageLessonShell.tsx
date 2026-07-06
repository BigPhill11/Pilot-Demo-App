import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, Zap, HelpCircle, Trophy, Sparkles, Star, MessageCircle, GraduationCap, Leaf, Building2, CheckCircle2 } from 'lucide-react';
import type { VillageLesson, VillageModuleConfig } from '@/types/village-lesson';
import VillageLessonSimulator from './simulators/VillageLessonSimulator';
import VillageQuizStep from './VillageQuizStep';
import VillageTeachPhilStep from './VillageTeachPhilStep';
import type { TeachPhilResult } from '@/hooks/useTeachPhilSession';

type Step = 'intro' | 'learn' | 'simulate' | 'quiz' | 'teach' | 'empire';

interface Props {
  lesson: VillageLesson;
  module: VillageModuleConfig;
  onComplete: (xp: number, bamboo: number) => void;
  onBack: () => void;
  /** Lesson was completed before this session — rewards were already claimed */
  alreadyCompleted?: boolean;
}

const STEPS: Step[] = ['intro', 'learn', 'simulate', 'quiz', 'teach', 'empire'];

const STEP_META: Record<Step, { label: string; icon: React.ElementType; color: string; bg: string; desc: string }> = {
  intro:    { label: 'Intro',    icon: Sparkles,   color: 'text-green-600',  bg: 'bg-green-600',  desc: 'Set the stage' },
  learn:    { label: 'Learn',    icon: BookOpen,   color: 'text-blue-600',   bg: 'bg-blue-600',   desc: 'Concepts' },
  simulate: { label: 'Simulate', icon: Zap,        color: 'text-orange-600', bg: 'bg-orange-600', desc: 'Real consequences' },
  quiz:     { label: 'Quiz',     icon: HelpCircle, color: 'text-purple-600', bg: 'bg-purple-600', desc: 'Test yourself' },
  teach:    { label: 'Teach',    icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-600', desc: 'Teach Phil' },
  empire:   { label: 'Empire',   icon: Trophy,     color: 'text-amber-600',  bg: 'bg-amber-500',  desc: 'Claim reward' },
};

/* ─── Module gradient for the lesson header ─── */
const MODULE_HEADER_GRADIENT: Record<string, string> = {
  'business-economics':   'from-slate-700 to-slate-600',
  'ownership':            'from-amber-700 to-amber-600',
  'language-finance':     'from-violet-800 to-violet-600',
  'markets-headlines':    'from-teal-800 to-teal-600',
  'business-foundations': 'from-orange-700 to-orange-600',
  'company-tinder':       'from-rose-700 to-rose-600',
};

const VillageLessonShell: React.FC<Props> = ({ lesson, module, onComplete, onBack, alreadyCompleted = false }) => {
  const [step, setStep] = useState<Step>('intro');
  const [conceptIndex, setConceptIndex] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });
  const [teachResult, setTeachResult] = useState<TeachPhilResult | null>(null);
  // Furthest step reached this session — lets students revisit earlier
  // sections via the progress track without losing their progress
  const [maxStepIndex, setMaxStepIndex] = useState(0);

  const stepIndex = STEPS.indexOf(step);

  useEffect(() => {
    setMaxStepIndex((prev) => Math.max(prev, stepIndex));
  }, [stepIndex]);
  const headerGradient = MODULE_HEADER_GRADIENT[module.id] ?? 'from-green-700 to-green-600';

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    if (stepIndex === 0) { onBack(); return; }
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev);
  };

  return (
    <div className="flex flex-col bg-gray-50" style={{ minHeight: 500 }}>
      {/* ─── Lesson header ─── */}
      <div className={`bg-gradient-to-r ${headerGradient} flex-shrink-0`}>
        <div className="flex items-center gap-2.5 px-4 py-3">
          <button
            onClick={goBack}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors flex-shrink-0"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <span className="text-base flex-shrink-0">{module.buildingEmoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-white/60 uppercase tracking-wide font-medium">{module.name}</p>
            <h2 className="text-sm font-bold text-white truncate">{lesson.title}</h2>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 px-2 py-1 rounded-full bg-white/15">
            <BookOpen className="h-3 w-3 text-white/70" />
            <span className="text-[10px] text-white/70">{lesson.estimatedMinutes}m</span>
          </div>
        </div>

        {/* ─── Step progress track ─── */}
        <div className="flex items-center px-4 pb-3 gap-1">
          {STEPS.map((s, i) => {
            const meta = STEP_META[s];
            const done = i < stepIndex;
            const active = i === stepIndex;
            const visited = i <= maxStepIndex;
            const Icon = meta.icon;
            return (
              <React.Fragment key={s}>
                <button
                  onClick={() => { if (visited && !active) setStep(s); }}
                  disabled={!visited || active}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    active ? 'bg-white text-gray-800 shadow-md scale-105' :
                    done  ? 'bg-white/30 text-white' :
                    visited ? 'bg-white/20 text-white/80' :
                            'bg-white/10 text-white/40'
                  } ${visited && !active ? 'cursor-pointer hover:bg-white/50' : ''}`}
                >
                  <Icon className="h-2.5 w-2.5" />
                  <span className="hidden sm:inline">{meta.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded-full mx-0.5 transition-all ${done ? 'bg-white/60' : 'bg-white/15'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ─── Content area ─── */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4 space-y-0">

        {/* ══ INTRO STEP ══ */}
        {step === 'intro' && (
          <div className="space-y-4">
            {/* Hero hook card */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 p-5 text-white shadow-lg">
              <Sparkles className="absolute top-3 right-3 w-10 h-10 text-white/10" aria-hidden />
              <p className="text-base font-bold leading-snug relative z-10 mb-1">"{lesson.hook.question}"</p>
              <p className="text-xs text-green-200 relative z-10">Today's big question</p>
            </div>

            {/* Phil says */}
            <div className="flex gap-3 p-4 bg-white rounded-2xl border-2 border-green-200 shadow-sm">
              <MessageCircle className="h-8 w-8 text-green-600 flex-shrink-0" aria-hidden />
              <div>
                <p className="text-[11px] font-bold text-green-700 mb-1">Phil says:</p>
                <p className="text-sm text-gray-700 leading-relaxed">{lesson.hook.philMessage}</p>
              </div>
            </div>

            {/* What's inside */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">What you will cover</p>
              </div>
              <div className="p-3 space-y-2">
                {lesson.concepts.map((c, i) => (
                  <div key={c.id} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/30">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-bold text-primary">{i + 1}</span>
                    </div>
                    <p className="text-xs font-medium">{c.title}</p>
                    <span className="ml-auto text-[9px] text-muted-foreground font-medium">Concept</span>
                  </div>
                ))}
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/30">
                  <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                  <p className="text-xs font-medium">{lesson.simulator.title}</p>
                  <span className="ml-auto text-[9px] text-muted-foreground font-medium">Simulator</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/30">
                  <HelpCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <p className="text-xs font-medium">{lesson.quiz.length}-question quiz</p>
                  <span className="ml-auto text-[9px] text-muted-foreground font-medium">Quiz</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/30">
                  <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                  <p className="text-xs font-medium">Teach it back to Phil (optional)</p>
                  <span className="ml-auto text-[9px] text-muted-foreground font-medium">Teach Phil</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/30">
                  <Trophy className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">Empire Reward</p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600">+{lesson.rewards.xp} XP · +{lesson.rewards.bamboo} bamboo</span>
                </div>
              </div>
            </div>

            <Button onClick={goNext} className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl text-base font-semibold shadow-md">
              Start Lesson
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* ══ LEARN STEP ══ */}
        {step === 'learn' && (() => {
          const concept = lesson.concepts[conceptIndex];
          return (
            <div className="space-y-4">
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-1.5">
                {lesson.concepts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setConceptIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === conceptIndex ? 'w-8 h-2.5 bg-blue-500' :
                      i < conceptIndex  ? 'w-2.5 h-2.5 bg-blue-300' :
                                          'w-2.5 h-2.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Concept card */}
              <div className="bg-card border rounded-xl overflow-hidden">
                <div className="p-4 bg-muted/30 border-b">
                  <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                    Concept {conceptIndex + 1} of {lesson.concepts.length}
                  </p>
                  <h3 className="font-bold text-base leading-snug">{concept.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{concept.body}</p>
                </div>
              </div>

              {/* Real world example */}
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1 text-sm">Real World Example</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{concept.realWorldExample}</p>
                  </div>
                </div>
              </div>

              {/* Phil tip */}
              <div className="flex gap-2.5 p-3 bg-primary/5 border border-primary/20 rounded-xl">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden />
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  Remember: understanding the "why" behind each concept is what separates good investors from great ones.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-2">
                {conceptIndex > 0 && (
                  <Button variant="outline" className="flex-1 h-11" onClick={() => setConceptIndex(i => i - 1)}>
                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                  </Button>
                )}
                {conceptIndex < lesson.concepts.length - 1 ? (
                  <Button className="flex-1 h-11" onClick={() => setConceptIndex(i => i + 1)}>
                    Next Concept <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="flex-1 h-11" onClick={goNext}>
                    Now Simulate It <Zap className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          );
        })()}

        {/* ══ SIMULATE STEP ══ */}
        {step === 'simulate' && (
          <div className="space-y-0">
            {/* Simulator intro banner */}
            <div className="flex items-center gap-2.5 p-3 mb-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl">
              <Zap className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-medium">Real Consequences Simulator</p>
                <p className="text-[11px] text-muted-foreground">Your decisions have real outcomes. Experience them safely here.</p>
              </div>
            </div>
            <VillageLessonSimulator lesson={lesson} onComplete={goNext} />
          </div>
        )}

        {/* ══ QUIZ STEP ══ */}
        {step === 'quiz' && (
          <div className="space-y-0">
            {/* Quiz intro banner */}
            <div className="flex items-center gap-2.5 p-3 mb-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl">
              <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs font-medium">Knowledge Check</p>
                <p className="text-[11px] text-muted-foreground">Score 75%+ to unlock your Empire Reward!</p>
              </div>
            </div>
            <VillageQuizStep
              questions={lesson.quiz}
              onComplete={(passed, score, total) => {
                setQuizPassed(passed);
                setFinalScore({ score, total });
                // Quiz failures skip Teach Phil and go straight to the retry
                // screen; only passers earn the right to teach
                setStep(passed ? 'teach' : 'empire');
              }}
            />
          </div>
        )}

        {/* ══ TEACH PHIL STEP ══ */}
        {step === 'teach' && (
          <VillageTeachPhilStep
            lesson={lesson}
            onComplete={(result) => {
              setTeachResult(result);
              setStep('empire');
            }}
          />
        )}

        {/* ══ EMPIRE REWARD STEP ══ */}
        {step === 'empire' && (
          <div className="space-y-4">
            {quizPassed ? (
              <>
                {/* Victory header */}
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Lesson Complete!</h2>
                  <p className="text-muted-foreground text-sm mt-1">{lesson.title}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary">
                    <span>{finalScore.score}/{finalScore.total} correct</span>
                    <span>·</span>
                    <span>{Math.round((finalScore.score / finalScore.total) * 100)}%</span>
                  </div>
                </div>

                {/* Empire reward section */}
                <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="bg-muted/30 px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Empire Reward</p>
                        <p className="text-xs text-muted-foreground">Your empire grows with every lesson mastered</p>
                      </div>
                    </div>
                  </div>
                  {alreadyCompleted ? (
                    <div className="p-4">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">
                          You already completed this lesson — rewards were claimed the first time. Great review session!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                          <div className="text-2xl font-bold text-foreground">+{lesson.rewards.xp}</div>
                          <div className="text-xs text-muted-foreground font-medium">XP Earned</div>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <Leaf className="w-5 h-5 text-primary mx-auto mb-1" />
                          <div className="text-2xl font-bold text-foreground">+{lesson.rewards.bamboo}</div>
                          <div className="text-xs text-muted-foreground font-medium">Bamboo</div>
                        </div>
                      </div>
                      {(teachResult?.optUpBonusBamboo ?? 0) > 0 && (
                        <div className="px-4 pb-1">
                          <div className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/20">
                            <GraduationCap className="w-4 h-4 text-primary" />
                            <p className="text-xs text-primary font-medium">
                              +{teachResult!.optUpBonusBamboo} bamboo bonus for teaching a tougher Phil
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div className="px-4 pb-3 pt-1">
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30">
                      <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        This knowledge fuels your empire — visit the <span className="font-medium text-foreground">Empire tab</span> to see your growing village.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phil congratulates */}
                <div className="flex gap-3 p-4 bg-white rounded-xl border border-border shadow-sm">
                  <MessageCircle className="h-6 w-6 text-primary flex-shrink-0" aria-hidden />
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">Phil says:</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Outstanding work! Every concept you master compounds — you are building real financial intelligence.
                      Keep going — your empire awaits.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => onComplete(lesson.rewards.xp, lesson.rewards.bamboo + (teachResult?.optUpBonusBamboo ?? 0))}
                  className="w-full h-12 text-base"
                >
                  Back to Village
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                {/* Not passed */}
                <div className="rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 p-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-orange-800">Almost There!</h2>
                  <p className="text-sm text-orange-700 mt-1">
                    You scored {finalScore.score}/{finalScore.total} ({Math.round((finalScore.score / finalScore.total) * 100)}%)
                  </p>
                  <p className="text-xs text-orange-600 mt-1">Need 75% to unlock your Empire Reward.</p>
                </div>

                <div className="flex gap-3 p-4 bg-white rounded-2xl border-2 border-blue-100 shadow-sm">
                  <MessageCircle className="h-8 w-8 text-green-600 flex-shrink-0" aria-hidden />
                  <div>
                    <p className="text-[11px] font-bold text-blue-700 mb-1">Phil says:</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Mistakes are how we learn! Re-read the concepts — one more pass often makes it click. You've got this!
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl h-11"
                    onClick={() => { setStep('learn'); setConceptIndex(0); }}
                  >
                    <BookOpen className="mr-1.5 h-4 w-4" />
                    Review Concepts
                  </Button>
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-11"
                    onClick={() => { setFinalScore({ score: 0, total: 0 }); setQuizPassed(false); setTeachResult(null); setStep('quiz'); }}
                  >
                    Retry Quiz
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VillageLessonShell;
