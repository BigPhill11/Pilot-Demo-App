/**
 * Standardized Market Intelligence lesson flow (v1):
 * Hook → Learn → Try → Connect → Review → Check → Done
 */

import React, { useState, useCallback } from 'react';
import type { MILesson } from '@/types/mi-lesson';
import { quizPassed } from '@/types/mi-lesson';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { unlockLessonFlashcards } from '@/data/market-intelligence/mi-flashcard-unlocks';

import LessonStepShell, { type MILessonStepId } from './LessonStepShell';
import LessonIntroStep from '@/components/learn/economics/LessonIntroStep';
import LessonConceptsStep from '@/components/learn/economics/LessonConceptsStep';
import LessonConnectStep from './LessonConnectStep';
import LessonFlashcardsStep from '@/components/learn/economics/LessonFlashcardsStep';
import LessonQuizStep from '@/components/learn/economics/LessonQuizStep';
import LessonCompleteStep from '@/components/learn/economics/LessonCompleteStep';
import MILessonTryStep from './MILessonTryStep';

const STEP_ORDER: MILessonStepId[] = [
  'hook',
  'learn',
  'try',
  'connect',
  'review',
  'check',
  'done',
];

interface MILessonContainerProps {
  lesson: MILesson;
  onComplete: (moduleId: string) => void;
  onExit: () => void;
}

const MILessonContainer: React.FC<MILessonContainerProps> = ({
  lesson,
  onComplete,
  onExit,
}) => {
  const [currentStep, setCurrentStep] = useState<MILessonStepId>('hook');
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const { awardResources } = usePlatformIntegration();

  const goTo = useCallback((step: MILessonStepId) => setCurrentStep(step), []);

  const goNext = useCallback(() => {
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[idx + 1]);
    }
  }, [currentStep]);

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(STEP_ORDER[idx - 1]);
    }
  }, [currentStep]);

  const handleQuizComplete = useCallback((score: number, total: number) => {
    setQuizScore(score);
    setQuizTotal(total);
    if (quizPassed(score, total)) {
      goTo('done');
    }
  }, [goTo]);

  const handleLessonFinish = useCallback(() => {
    const bamboo = lesson.rewards?.bamboo ?? 15;
    const xp = lesson.rewards?.xp ?? 3;
    const isPerfect = quizTotal > 0 && quizScore === quizTotal;
    awardResources(
      bamboo + (isPerfect ? 5 : 0),
      xp + (isPerfect ? 2 : 0),
      `MI Lesson: ${lesson.title}`,
      true
    );
    unlockLessonFlashcards(lesson);
    onComplete(lesson.moduleId);
  }, [lesson, quizScore, quizTotal, awardResources, onComplete]);

  const handleReplay = useCallback(() => {
    setCurrentStep('hook');
    setQuizScore(0);
    setQuizTotal(0);
  }, []);

  const rewards = {
    xp: (lesson.rewards?.xp ?? 3) + (quizScore === quizTotal && quizTotal > 0 ? 2 : 0),
    bamboo: (lesson.rewards?.bamboo ?? 15) + (quizScore === quizTotal && quizTotal > 0 ? 5 : 0),
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'hook':
        return (
          <LessonIntroStep
            lessonTitle={lesson.title}
            estimatedMinutes={lesson.estimatedMinutes}
            hook={lesson.intro.hook}
            philMessage={lesson.intro.philMessage}
            heroImage={lesson.intro.heroImage}
            onContinue={goNext}
          />
        );
      case 'learn':
        return (
          <LessonConceptsStep
            lessonTitle={lesson.title}
            concepts={lesson.coreConcepts}
            perConceptVisuals
            onContinue={goNext}
            onBack={goBack}
          />
        );
      case 'try':
        return (
          <MILessonTryStep
            activity={lesson.tryActivity}
            onComplete={goNext}
            onBack={goBack}
          />
        );
      case 'connect':
        return (
          <LessonConnectStep
            connect={lesson.connect}
            onContinue={goNext}
            onBack={goBack}
          />
        );
      case 'review':
        return (
          <LessonFlashcardsStep
            flashcards={lesson.flashcards}
            onContinue={goNext}
            onBack={goBack}
          />
        );
      case 'check':
        return (
          <LessonQuizStep
            questions={lesson.quiz}
            passThreshold={0.75}
            requirePassToContinue
            onComplete={handleQuizComplete}
            onBack={goBack}
          />
        );
      case 'done':
        return (
          <LessonCompleteStep
            lessonTitle={lesson.title}
            quizScore={quizScore}
            quizTotal={quizTotal}
            xpEarned={rewards.xp}
            bambooEarned={rewards.bamboo}
            passThresholdPercent={75}
            flashcardsSynced
            onContinue={handleLessonFinish}
            onReplay={handleReplay}
          />
        );
      default:
        return null;
    }
  };

  // Intro/complete steps use full-screen layouts; wrap others in shell
  const useShell = !['hook', 'check', 'done'].includes(currentStep);

  if (currentStep === 'hook') {
    return (
      <div className="relative">
        <div className="absolute top-4 left-4 z-20">
          <button
            type="button"
            onClick={onExit}
            className="text-sm text-emerald-700 px-3 py-1.5 rounded-md hover:bg-emerald-100"
          >
            ← Exit
          </button>
        </div>
        {renderStepContent()}
      </div>
    );
  }

  if (currentStep === 'check' || currentStep === 'done') {
    return (
      <div className="relative">
        {currentStep === 'check' && (
          <div className="absolute top-4 left-4 z-20 max-w-lg mx-auto w-full px-4">
            <button
              type="button"
              onClick={onExit}
              className="text-sm text-emerald-700 px-3 py-1.5 rounded-md hover:bg-emerald-100"
            >
              ← Exit
            </button>
          </div>
        )}
        {renderStepContent()}
      </div>
    );
  }

  if (useShell) {
    return (
      <LessonStepShell
        currentStep={currentStep}
        lessonTitle={lesson.title}
        estimatedMinutes={lesson.estimatedMinutes}
        onExit={onExit}
      >
        {renderStepContent()}
      </LessonStepShell>
    );
  }

  return null;
};

export default MILessonContainer;
