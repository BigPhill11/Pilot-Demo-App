/**
 * Economics lesson container — MI flow for enriched micro lessons,
 * legacy flow for macro / business tracks until migrated.
 */

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import type { EconomicsLesson, EconomicsTrack } from '@/types/economics-curriculum';
import { isEnrichedMicroLesson } from '@/types/economics-curriculum';
import { quizPassed } from '@/types/mi-lesson';

import LessonIntroStep from './LessonIntroStep';
import LessonConceptsStep from './LessonConceptsStep';
import LessonPersonalFinanceStep from './LessonPersonalFinanceStep';
import LessonFlashcardsStep from './LessonFlashcardsStep';
import LessonQuizStep from './LessonQuizStep';
import LessonCareerSpotlightStep from './LessonCareerSpotlightStep';
import LessonCompleteStep from './LessonCompleteStep';
import LessonConnectStep from '@/components/learn/market-intelligence/lesson/LessonConnectStep';
import MILessonTryStep from '@/components/learn/market-intelligence/lesson/MILessonTryStep';
import LessonStepShell, { type MILessonStepId } from '@/components/learn/market-intelligence/lesson/LessonStepShell';

type LegacyStep =
  | 'intro'
  | 'concepts'
  | 'personal-finance'
  | 'flashcards'
  | 'quiz'
  | 'career-spotlight'
  | 'complete';

const MI_STEPS: MILessonStepId[] = ['hook', 'learn', 'try', 'connect', 'review', 'check', 'done'];

interface EconomicsLessonContainerProps {
  lesson: EconomicsLesson;
  unitId: string;
  track: EconomicsTrack;
  onComplete: (xp: number, bamboo: number) => void;
  onExit: () => void;
}

const BASE_XP = 50;
const BASE_BAMBOO = 10;
const PERFECT_BONUS_XP = 25;
const PERFECT_BONUS_BAMBOO = 5;

const EconomicsLessonContainer: React.FC<EconomicsLessonContainerProps> = ({
  lesson,
  onComplete,
  onExit,
}) => {
  const enriched = isEnrichedMicroLesson(lesson);
  const [miStep, setMiStep] = useState<MILessonStepId>('hook');
  const [legacyStep, setLegacyStep] = useState<LegacyStep>('intro');
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);

  const rewards = {
    xp: (lesson.rewards?.xp ?? BASE_XP) + (quizScore === quizTotal && quizTotal > 0 ? PERFECT_BONUS_XP : 0),
    bamboo: (lesson.rewards?.bamboo ?? BASE_BAMBOO) + (quizScore === quizTotal && quizTotal > 0 ? PERFECT_BONUS_BAMBOO : 0),
  };

  const miGoNext = useCallback(() => {
    const idx = MI_STEPS.indexOf(miStep);
    if (idx < MI_STEPS.length - 1) setMiStep(MI_STEPS[idx + 1]);
  }, [miStep]);

  const miGoBack = useCallback(() => {
    const idx = MI_STEPS.indexOf(miStep);
    if (idx > 0) setMiStep(MI_STEPS[idx - 1]);
  }, [miStep]);

  const handleQuizComplete = useCallback(
    (score: number, total: number) => {
      setQuizScore(score);
      setQuizTotal(total);
      if (enriched && quizPassed(score, total)) {
        setMiStep('done');
      } else if (!enriched) {
        const steps: LegacyStep[] = ['intro', 'concepts', 'personal-finance', 'flashcards', 'quiz'];
        if (lesson.careerSpotlight) steps.push('career-spotlight');
        steps.push('complete');
        const idx = steps.indexOf(legacyStep);
        if (idx < steps.length - 1) setLegacyStep(steps[idx + 1]);
      }
    },
    [enriched, legacyStep, lesson.careerSpotlight]
  );

  const handleFinish = useCallback(() => {
    onComplete(rewards.xp, rewards.bamboo);
  }, [onComplete, rewards.xp, rewards.bamboo]);

  const handleReplay = useCallback(() => {
    setMiStep('hook');
    setLegacyStep('intro');
    setQuizScore(0);
    setQuizTotal(0);
  }, []);

  if (enriched && lesson.tryActivity && lesson.connect) {
    const renderMi = () => {
      switch (miStep) {
        case 'hook':
          return (
            <LessonIntroStep
              lessonTitle={lesson.title}
              estimatedMinutes={lesson.estimatedMinutes}
              hook={lesson.intro.hook}
              philMessage={lesson.intro.philMessage}
              heroImage={lesson.intro.heroImage}
              onContinue={miGoNext}
            />
          );
        case 'learn':
          return (
            <LessonConceptsStep
              lessonTitle={lesson.title}
              concepts={lesson.coreConcepts}
              perConceptVisuals
              onContinue={miGoNext}
              onBack={miGoBack}
            />
          );
        case 'try':
          return (
            <MILessonTryStep activity={lesson.tryActivity!} onComplete={miGoNext} onBack={miGoBack} />
          );
        case 'connect':
          return (
            <LessonConnectStep connect={lesson.connect!} onContinue={miGoNext} onBack={miGoBack} />
          );
        case 'review':
          return (
            <LessonFlashcardsStep flashcards={lesson.flashcards} onContinue={miGoNext} onBack={miGoBack} />
          );
        case 'check':
          return (
            <LessonQuizStep
              questions={lesson.quiz}
              passThreshold={0.75}
              requirePassToContinue
              onComplete={handleQuizComplete}
              onBack={miGoBack}
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
              onContinue={handleFinish}
              onReplay={handleReplay}
            />
          );
        default:
          return null;
      }
    };

    if (miStep === 'hook') {
      return (
        <div className="relative">
          <div className="absolute top-4 left-4 z-20">
            <button type="button" onClick={onExit} className="text-sm text-emerald-700 px-3 py-1.5 rounded-md hover:bg-emerald-100">
              ← Exit
            </button>
          </div>
          {renderMi()}
        </div>
      );
    }

    if (miStep === 'check' || miStep === 'done') {
      return (
        <div className="relative">
          {miStep === 'check' && (
            <div className="absolute top-4 left-4 z-20">
              <button type="button" onClick={onExit} className="text-sm text-emerald-700 px-3 py-1.5 rounded-md hover:bg-emerald-100">
                ← Exit
              </button>
            </div>
          )}
          {renderMi()}
        </div>
      );
    }

    return (
      <LessonStepShell
        currentStep={miStep}
        lessonTitle={lesson.title}
        estimatedMinutes={lesson.estimatedMinutes}
        onExit={onExit}
      >
        {renderMi()}
      </LessonStepShell>
    );
  }

  // Legacy flow
  const legacyOrder: LegacyStep[] = ['intro', 'concepts', 'personal-finance', 'flashcards', 'quiz'];
  if (lesson.careerSpotlight) legacyOrder.push('career-spotlight');
  legacyOrder.push('complete');

  const legacyNext = () => {
    const idx = legacyOrder.indexOf(legacyStep);
    if (idx < legacyOrder.length - 1) setLegacyStep(legacyOrder[idx + 1]);
  };

  const legacyBack = () => {
    const idx = legacyOrder.indexOf(legacyStep);
    if (idx > 0) setLegacyStep(legacyOrder[idx - 1]);
  };

  const renderLegacy = () => {
    switch (legacyStep) {
      case 'intro':
        return (
          <LessonIntroStep
            lessonTitle={lesson.title}
            estimatedMinutes={lesson.estimatedMinutes}
            hook={lesson.intro.hook}
            philMessage={lesson.intro.philMessage}
            heroImage={lesson.intro.heroImage}
            onContinue={legacyNext}
          />
        );
      case 'concepts':
        return (
          <LessonConceptsStep
            lessonTitle={lesson.title}
            concepts={lesson.coreConcepts}
            perConceptVisuals={lesson.coreConcepts.some((c) => c.visual || c.chart)}
            onContinue={legacyNext}
            onBack={legacyBack}
          />
        );
      case 'personal-finance':
        return (
          <LessonPersonalFinanceStep
            description={lesson.personalFinanceConnection.description}
            realWorldExample={lesson.personalFinanceConnection.realWorldExample}
            onContinue={legacyNext}
            onBack={legacyBack}
          />
        );
      case 'flashcards':
        return (
          <LessonFlashcardsStep flashcards={lesson.flashcards} onContinue={legacyNext} onBack={legacyBack} />
        );
      case 'quiz':
        return (
          <LessonQuizStep questions={lesson.quiz} onComplete={handleQuizComplete} onBack={legacyBack} />
        );
      case 'career-spotlight':
        return lesson.careerSpotlight ? (
          <LessonCareerSpotlightStep career={lesson.careerSpotlight} onContinue={legacyNext} onBack={legacyBack} />
        ) : null;
      case 'complete':
        return (
          <LessonCompleteStep
            lessonTitle={lesson.title}
            quizScore={quizScore}
            quizTotal={quizTotal}
            xpEarned={rewards.xp}
            bambooEarned={rewards.bamboo}
            onContinue={handleFinish}
            onReplay={handleReplay}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen">
      {legacyStep !== 'complete' && (
        <div className="absolute top-4 left-4 z-20">
          <Button variant="ghost" size="sm" onClick={onExit} className="text-emerald-700 hover:bg-emerald-100">
            ← Exit Lesson
          </Button>
        </div>
      )}
      {renderLegacy()}
    </div>
  );
};

export default EconomicsLessonContainer;
