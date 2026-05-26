import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import type { WealthManagementModule } from '@/data/wealth-management/wealthManagementCurriculum';
import WealthManagementActivity from './WealthManagementActivity';

type ModuleStep = 'intro' | 'learn' | 'activity' | 'check' | 'reward';

interface WealthManagementModuleViewProps {
  module: WealthManagementModule;
  isCompleted: boolean;
  onComplete: (moduleId: string) => void;
  onBack: () => void;
}

const steps: ModuleStep[] = ['intro', 'learn', 'activity', 'check', 'reward'];

const stepMeta: Record<ModuleStep, { label: string; icon: React.ElementType }> = {
  intro: { label: 'Intro', icon: Sparkles },
  learn: { label: 'Learn', icon: BookOpen },
  activity: { label: 'Practice', icon: Zap },
  check: { label: 'Check', icon: HelpCircle },
  reward: { label: 'Reward', icon: Trophy },
};

const WealthManagementModuleView: React.FC<WealthManagementModuleViewProps> = ({
  module,
  isCompleted,
  onComplete,
  onBack,
}) => {
  const [step, setStep] = useState<ModuleStep>('intro');
  const [conceptIndex, setConceptIndex] = useState(0);
  const [activityComplete, setActivityComplete] = useState(isCompleted);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const stepIndex = steps.indexOf(step);
  const progressPercent = Math.round(((stepIndex + 1) / steps.length) * 100);
  const currentConcept = module.concepts[conceptIndex];

  const quizScore = useMemo(() => {
    return module.quiz.reduce((total, question, index) => {
      return total + (quizAnswers[index] === question.answerIndex ? 1 : 0);
    }, 0);
  }, [module.quiz, quizAnswers]);

  const allQuizAnswered = Object.keys(quizAnswers).length === module.quiz.length;
  const quizPassed = allQuizAnswered && quizScore >= Math.ceil(module.quiz.length * 0.7);

  const goNext = () => {
    const nextStep = steps[stepIndex + 1];
    if (nextStep) setStep(nextStep);
  };

  const goBack = () => {
    const previousStep = steps[stepIndex - 1];
    if (previousStep) {
      setStep(previousStep);
      return;
    }
    onBack();
  };

  const handleClaimReward = () => {
    onComplete(module.id);
    onBack();
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-slate-50 shadow-xl">
      <div className={`bg-gradient-to-r ${module.color} text-white`}>
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            type="button"
            onClick={goBack}
            className="rounded-xl bg-white/20 p-2 transition-colors hover:bg-white/30"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
              Module {module.number} of 4
            </p>
            <h2 className="truncate text-lg font-black sm:text-xl">{module.title}</h2>
          </div>
          <Badge className="bg-white text-green-900 hover:bg-white">{module.minutes} min</Badge>
        </div>

        <div className="px-4 pb-4">
          <div className="mb-3 flex items-center gap-1">
            {steps.map((moduleStep, index) => {
              const Icon = stepMeta[moduleStep].icon;
              const isActive = index === stepIndex;
              const isDone = index < stepIndex;

              return (
                <React.Fragment key={moduleStep}>
                  <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold transition-all ${
                    isActive
                      ? 'bg-white text-green-900 shadow'
                      : isDone
                        ? 'bg-white/30 text-white'
                        : 'bg-white/10 text-white/50'
                  }`}>
                    <Icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{stepMeta[moduleStep].label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 rounded-full ${isDone ? 'bg-white/60' : 'bg-white/15'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <Progress
            value={progressPercent}
            className="h-1.5 bg-white/20"
            indicatorClassName="bg-white"
          />
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        {step === 'intro' && (
          <div className="space-y-4">
            <Card className="overflow-hidden border-emerald-100 bg-white">
              <CardContent className="p-5">
                <Badge className="mb-3 bg-emerald-600 text-white hover:bg-emerald-600">
                  {module.shortTitle}
                </Badge>
                <h3 className="text-2xl font-black text-green-950">{module.subtitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  This module gives you quick reps with the kind of thinking wealth teams use
                  when turning client facts into useful advice.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-3 md:grid-cols-3">
              {module.outcomes.map((outcome) => (
                <div key={outcome} className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-600" />
                  <p className="text-sm font-semibold leading-relaxed text-slate-700">{outcome}</p>
                </div>
              ))}
            </div>

            <Button onClick={goNext} className="w-full bg-green-700 text-white hover:bg-green-800">
              Start Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 'learn' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              {module.concepts.map((concept, index) => (
                <button
                  key={concept.title}
                  type="button"
                  onClick={() => setConceptIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === conceptIndex
                      ? 'w-10 bg-emerald-600'
                      : index < conceptIndex
                        ? 'w-3 bg-emerald-300'
                        : 'w-3 bg-slate-300'
                  }`}
                  aria-label={`Show concept ${index + 1}`}
                />
              ))}
            </div>

            <Card className="overflow-hidden border-blue-100 bg-white">
              <CardContent className="p-0">
                <div className="border-b border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white p-3 text-blue-700 shadow-sm">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                        Concept {conceptIndex + 1} of {module.concepts.length}
                      </p>
                      <h3 className="text-lg font-black text-slate-900">{currentConcept.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <p className="text-sm leading-relaxed text-slate-700">{currentConcept.body}</p>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-amber-700">
                      Real-world example
                    </p>
                    <p className="text-sm leading-relaxed text-amber-950">{currentConcept.example}</p>
                  </div>
                  <div className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                    <MessageCircle className="h-5 w-5 flex-shrink-0 text-emerald-700" />
                    <p className="text-sm leading-relaxed text-emerald-900">
                      Phil tip: the best advisors make technical ideas feel simple enough
                      for a real family to act on.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => setConceptIndex((current) => Math.max(current - 1, 0))}
                disabled={conceptIndex === 0}
              >
                Previous
              </Button>
              {conceptIndex < module.concepts.length - 1 ? (
                <Button
                  onClick={() => setConceptIndex((current) => current + 1)}
                  className="bg-green-700 text-white hover:bg-green-800"
                >
                  Next Concept
                </Button>
              ) : (
                <Button onClick={goNext} className="bg-green-700 text-white hover:bg-green-800">
                  Practice It
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}

        {step === 'activity' && (
          <div className="space-y-4">
            <WealthManagementActivity
              activity={module.activity}
              isCompleted={activityComplete}
              onComplete={() => setActivityComplete(true)}
            />
            <Button
              onClick={goNext}
              disabled={!activityComplete}
              className="w-full bg-green-700 text-white hover:bg-green-800"
            >
              Continue to Quick Check
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 'check' && (
          <div className="space-y-4">
            {module.quiz.map((question, questionIndex) => {
              const selectedAnswer = quizAnswers[questionIndex];
              const hasAnswered = selectedAnswer !== undefined;

              return (
                <Card key={question.question} className="border-purple-100 bg-white">
                  <CardContent className="space-y-3 p-4">
                    <Badge variant="outline" className="border-purple-200 text-purple-700">
                      Question {questionIndex + 1}
                    </Badge>
                    <h3 className="font-bold text-slate-900">{question.question}</h3>
                    <div className="grid gap-2">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = selectedAnswer === optionIndex;
                        const isCorrect = question.answerIndex === optionIndex;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setQuizAnswers((current) => ({
                              ...current,
                              [questionIndex]: optionIndex,
                            }))}
                            disabled={hasAnswered}
                            className={`rounded-xl border p-3 text-left text-sm font-semibold transition-colors ${
                              isSelected && isCorrect
                                ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                                : isSelected
                                  ? 'border-amber-300 bg-amber-50 text-amber-900'
                                  : hasAnswered && isCorrect
                                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-purple-200 hover:bg-purple-50'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {hasAnswered && (
                      <p className="rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
                        {question.explanation}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            <div className="rounded-2xl border border-purple-100 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-purple-600">Quick Check</p>
                  <p className="text-sm font-semibold text-slate-700">
                    Score: {quizScore}/{module.quiz.length}
                  </p>
                </div>
                <Button
                  onClick={goNext}
                  disabled={!quizPassed}
                  className="bg-green-700 text-white hover:bg-green-800"
                >
                  Claim Reward
                </Button>
              </div>
              {allQuizAnswered && !quizPassed && (
                <Button
                  variant="outline"
                  onClick={() => setQuizAnswers({})}
                  className="mt-3 w-full border-purple-200 text-purple-700"
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        )}

        {step === 'reward' && (
          <Card className="overflow-hidden border-amber-200 bg-gradient-to-br from-amber-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 text-amber-700">
                <Trophy className="h-9 w-9" />
              </div>
              <Badge className="bg-amber-500 text-white hover:bg-amber-500">{module.reward.badge}</Badge>
              <h3 className="mt-4 text-2xl font-black text-green-950">Module complete</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-green-800/80">
                You earned {module.reward.xp} XP and added another wealth advisory skill to your toolkit.
              </p>
              <Button onClick={handleClaimReward} className="mt-5 bg-green-700 text-white hover:bg-green-800">
                Back to Wealth Management Lab
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WealthManagementModuleView;
