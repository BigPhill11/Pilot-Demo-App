import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useCareerReadinessProgress } from '@/hooks/useCareerReadinessProgress';
import {
  ACTIVITY_LABELS,
  getLessonConfig,
  LESSON_STEP_LABELS,
} from '@/data/career-readiness/interviewing';
import { unlockCareersLessonFlashcards } from '@/data/flashcards/flashcardUnlockStore';
import { getAllUnifiedFlashcards } from '@/data/unified-flashcards';
import {
  calculateInterviewProgress,
  getNextLessonStep,
  INTERVIEW_STEP_ORDER,
  isInterviewModuleComplete,
  isLessonComplete,
  lessonStepKey,
  type CareerActivityId,
  type InterviewLessonId,
  type InterviewLessonStepId,
} from '@/types/career-readiness';
import { ACTIVITY_COMPONENTS } from './activities';
import InterviewFinishScreen from './InterviewFinishScreen';
import InterviewLessonStepper from './lesson/InterviewLessonStepper';
import InterviewStepNavigator from './lesson/InterviewStepNavigator';
import LessonContextPanel from './lesson/LessonContextPanel';
import LessonExamplePanel from './lesson/LessonExamplePanel';
import LessonTestCheckpoint from './lesson/LessonTestCheckpoint';
import PracticeActivityHub from './lesson/PracticeActivityHub';

const CareerInterviewModule: React.FC = () => {
  const navigate = useNavigate();
  const { getInterviewModuleDetails, updateInterviewDetails, updateInterviewAnswers } =
    useCareerReadinessProgress();

  const details = getInterviewModuleDetails();
  const {
    currentLessonId,
    currentStepId,
    currentPracticeActivityIndex,
    completedLessonSteps,
    completedLessons,
    completedActivityIds,
    answers,
  } = details;

  const lesson = getLessonConfig(currentLessonId);
  const percent = calculateInterviewProgress(details);
  const moduleComplete = isInterviewModuleComplete(details);

  const practiceStepComplete = completedLessonSteps.includes(
    lessonStepKey(currentLessonId, 'practice')
  );

  const safePracticeIndex = Math.min(
    Math.max(0, currentPracticeActivityIndex),
    Math.max(0, lesson.practiceActivityIds.length - 1)
  );

  const practiceActivityId: CareerActivityId | null = useMemo(() => {
    if (currentStepId !== 'practice') return null;
    return lesson.practiceActivityIds[safePracticeIndex] ?? null;
  }, [currentStepId, lesson, safePracticeIndex]);

  const ActivityComponent = practiceActivityId
    ? ACTIVITY_COMPONENTS[practiceActivityId]
    : null;
  const activityMeta = practiceActivityId ? ACTIVITY_LABELS[practiceActivityId] : null;
  const isCurrentActivityComplete =
    !!practiceActivityId && completedActivityIds.includes(practiceActivityId);

  const completeStep = useCallback(
    (lessonId: InterviewLessonId, stepId: InterviewLessonStepId) => {
      updateInterviewDetails((d) => {
        const key = lessonStepKey(lessonId, stepId);
        const completedLessonSteps = d.completedLessonSteps.includes(key)
          ? d.completedLessonSteps
          : [...d.completedLessonSteps, key];

        const next = getNextLessonStep(lessonId, stepId);

        let completedLessons = d.completedLessons;
        if (stepId === 'test' && !completedLessons.includes(lessonId)) {
          completedLessons = [...completedLessons, lessonId];
          // Unlock flashcards for this interview lesson
          const config = getLessonConfig(lessonId);
          unlockCareersLessonFlashcards(
            `Interview — ${config.title}`,
            getAllUnifiedFlashcards()
          );
        }

        if (next === 'finish') {
          return {
            ...d,
            completedLessonSteps,
            completedLessons,
            currentLessonId: lessonId,
            currentStepId: 'test',
            currentPracticeActivityIndex: 0,
          };
        }

        return {
          ...d,
          completedLessonSteps,
          completedLessons,
          currentLessonId: next.lessonId,
          currentStepId: next.stepId,
          currentPracticeActivityIndex: 0,
        };
      });
    },
    [updateInterviewDetails]
  );

  const goToStep = useCallback(
    (stepId: InterviewLessonStepId, lessonId: InterviewLessonId = currentLessonId) => {
      updateInterviewDetails((d) => {
        const config = getLessonConfig(lessonId);
        const maxIdx = Math.max(0, config.practiceActivityIds.length - 1);
        let practiceIndex = d.currentPracticeActivityIndex;
        if (stepId === 'practice') {
          practiceIndex = Math.min(Math.max(0, practiceIndex), maxIdx);
          const firstIncomplete = config.practiceActivityIds.findIndex(
            (id) => !d.completedActivityIds.includes(id)
          );
          if (firstIncomplete >= 0 && lessonId === d.currentLessonId) {
            practiceIndex = firstIncomplete;
          }
        }
        return {
          ...d,
          currentLessonId: lessonId,
          currentStepId: stepId,
          currentPracticeActivityIndex: stepId === 'practice' ? practiceIndex : 0,
        };
      });
    },
    [currentLessonId, updateInterviewDetails]
  );

  const goToLesson = useCallback(
    (lessonId: InterviewLessonId) => {
      updateInterviewDetails((d) => {
        let stepId: InterviewLessonStepId = 'context';
        for (const s of INTERVIEW_STEP_ORDER) {
          if (!d.completedLessonSteps.includes(lessonStepKey(lessonId, s))) {
            stepId = s;
            break;
          }
        }
        const config = getLessonConfig(lessonId);
        const firstIncomplete = config.practiceActivityIds.findIndex(
          (id) => !d.completedActivityIds.includes(id)
        );
        return {
          ...d,
          currentLessonId: lessonId,
          currentStepId: stepId,
          currentPracticeActivityIndex:
            stepId === 'practice' && firstIncomplete >= 0 ? firstIncomplete : 0,
        };
      });
    },
    [updateInterviewDetails]
  );

  const goToPracticeActivity = useCallback(
    (index: number) => {
      updateInterviewDetails((d) => ({
        ...d,
        currentStepId: 'practice',
        currentPracticeActivityIndex: index,
      }));
    },
    [updateInterviewDetails]
  );

  const goToPracticeCheckpoint = useCallback(() => {
    updateInterviewDetails((d) => {
      const key = lessonStepKey(currentLessonId, 'practice');
      const completedLessonSteps = d.completedLessonSteps.includes(key)
        ? d.completedLessonSteps
        : [...d.completedLessonSteps, key];
      return {
        ...d,
        completedLessonSteps,
        currentStepId: 'test',
        currentPracticeActivityIndex: 0,
      };
    });
  }, [currentLessonId, updateInterviewDetails]);

  const handleContextContinue = useCallback(() => {
    const key = lessonStepKey(currentLessonId, 'context');
    if (completedLessonSteps.includes(key)) {
      goToStep('example');
    } else {
      completeStep(currentLessonId, 'context');
    }
  }, [completeStep, currentLessonId, completedLessonSteps, goToStep]);

  const handleExampleContinue = useCallback(() => {
    const key = lessonStepKey(currentLessonId, 'example');
    if (completedLessonSteps.includes(key)) {
      goToStep('practice');
    } else {
      completeStep(currentLessonId, 'example');
    }
  }, [completeStep, currentLessonId, completedLessonSteps, goToStep]);

  const handleTestPass = useCallback(() => {
    completeStep(currentLessonId, 'test');
  }, [completeStep, currentLessonId]);

  const handleActivityComplete = useCallback(() => {
    if (!practiceActivityId) return;

    updateInterviewDetails((d) => {
      const completedActivityIds = d.completedActivityIds.includes(practiceActivityId)
        ? d.completedActivityIds
        : [...d.completedActivityIds, practiceActivityId];
      return { ...d, completedActivityIds };
    });
  }, [practiceActivityId, updateInterviewDetails]);

  const reflectionValue =
    answers.lessonReflections?.[lesson.context.reflectionKey] ?? '';

  const testResults = (answers.testCheckpointResults?.[currentLessonId] ?? {}) as Record<
    string,
    string
  >;

  const stepLabels = LESSON_STEP_LABELS[currentStepId];
  const contextStepDone = completedLessonSteps.includes(
    lessonStepKey(currentLessonId, 'context')
  );
  const exampleStepDone = completedLessonSteps.includes(
    lessonStepKey(currentLessonId, 'example')
  );

  const practiceDoneCount = lesson.practiceActivityIds.filter((id) =>
    completedActivityIds.includes(id)
  ).length;
  const practiceProgress =
    lesson.practiceActivityIds.length > 0
      ? Math.round((practiceDoneCount / lesson.practiceActivityIds.length) * 100)
      : 0;

  if (moduleComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-4 pb-8">
        <Button variant="ghost" size="sm" onClick={() => navigate('/career')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Career Readiness
        </Button>
        <InterviewFinishScreen
          answers={answers}
          onBackToCareer={() => navigate('/career')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-10">
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/career')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Career
        </Button>
        <Badge variant="outline" className="text-emerald-700 border-emerald-200 shrink-0">
          Saved locally
        </Badge>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-5 shadow-lg">
        <h1 className="text-2xl font-bold">Interview Prep Studio</h1>
        <p className="text-sm text-emerald-100/90 mt-1">
          Learn the why first, then practice. Tap any completed step to review and edit.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Progress value={percent} className="h-2 flex-1 bg-emerald-900/50" />
          <span className="text-sm font-semibold">{percent}%</span>
        </div>
      </div>

      <InterviewLessonStepper
        details={details}
        currentLessonId={currentLessonId}
        onSelectLesson={goToLesson}
      />

      <Card className="rounded-2xl border-emerald-100 shadow-sm overflow-hidden">
        <CardHeader className="pb-2 bg-emerald-50/50 border-b border-emerald-100">
          <div className="flex items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg text-emerald-900">
                Lesson {lesson.iconLabel}: {lesson.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground font-normal mt-0.5">
                {lesson.subtitle}
              </p>
            </div>
            {isLessonComplete(currentLessonId, completedLessonSteps) && (
              <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
            )}
          </div>
          <div className="mt-4">
            <InterviewStepNavigator
              lessonId={currentLessonId}
              details={details}
              currentStepId={currentStepId}
              onNavigate={goToStep}
            />
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                Step {INTERVIEW_STEP_ORDER.indexOf(currentStepId) + 1} of 4
              </p>
              <h2 className="text-xl font-semibold mt-0.5">{stepLabels.label}</h2>
            </div>
            {(contextStepDone || exampleStepDone) && currentStepId !== 'test' && (
              <Badge variant="secondary" className="shrink-0 text-xs gap-1">
                <RotateCcw className="h-3 w-3" />
                Review mode
              </Badge>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentLessonId}-${currentStepId}-${safePracticeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {currentStepId === 'context' && (
                <LessonContextPanel
                  content={lesson.context}
                  reflectionValue={reflectionValue}
                  isReview={contextStepDone}
                  onReflectionChange={(value) =>
                    updateInterviewAnswers({
                      lessonReflections: {
                        ...answers.lessonReflections,
                        [lesson.context.reflectionKey]: value,
                      },
                    })
                  }
                  onContinue={handleContextContinue}
                />
              )}

              {currentStepId === 'example' && (
                <LessonExamplePanel
                  content={lesson.example}
                  isReview={exampleStepDone}
                  onContinue={handleExampleContinue}
                />
              )}

              {currentStepId === 'practice' && (
                <div className="space-y-4">
                  <PracticeActivityHub
                    activityIds={lesson.practiceActivityIds}
                    completedActivityIds={completedActivityIds}
                    currentIndex={safePracticeIndex}
                    onSelectIndex={goToPracticeActivity}
                    onContinueToTest={goToPracticeCheckpoint}
                    practiceStepComplete={practiceStepComplete}
                  />

                  <Progress value={practiceProgress} className="h-2 bg-emerald-100" />

                  {ActivityComponent && activityMeta ? (
                    <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm space-y-4">
                      <div>
                        <p className="font-semibold text-emerald-900">{activityMeta.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {activityMeta.description}
                        </p>
                        {isCurrentActivityComplete && (
                          <p className="text-xs text-emerald-700 mt-2 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Completed — edit anytime, then save again
                          </p>
                        )}
                      </div>

                      <ActivityComponent
                        answers={answers}
                        onUpdateAnswers={updateInterviewAnswers}
                        onComplete={handleActivityComplete}
                        allowEdit
                        isActivityComplete={isCurrentActivityComplete}
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Select a simulation above to begin.
                    </p>
                  )}
                </div>
              )}

              {currentStepId === 'test' && (
                <LessonTestCheckpoint
                  lesson={lesson}
                  results={testResults}
                  onResult={(itemId, optionId) =>
                    updateInterviewAnswers({
                      testCheckpointResults: {
                        ...answers.testCheckpointResults,
                        [currentLessonId]: {
                          ...testResults,
                          [itemId]: optionId,
                        },
                      },
                    })
                  }
                  onReset={() =>
                    updateInterviewAnswers({
                      testCheckpointResults: {
                        ...answers.testCheckpointResults,
                        [currentLessonId]: {},
                      },
                    })
                  }
                  onPass={handleTestPass}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {completedLessons.length > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          {completedLessons.length} of 3 lessons completed — tap lesson tabs to review
        </p>
      )}
    </div>
  );
};

export default CareerInterviewModule;
