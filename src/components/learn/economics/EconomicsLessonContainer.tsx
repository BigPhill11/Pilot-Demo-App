/**
 * EconomicsLessonContainer
 * 
 * Main container component that manages the 7-step economics lesson flow:
 * 1. Intro - Hook and Phil's welcome message
 * 2. Concepts - Core economic concepts with examples
 * 3. Personal Finance - Real-world money connections
 * 4. Flashcards - Interactive term study
 * 5. Quiz - Knowledge assessment
 * 6. Career Spotlight - Related career information (optional)
 * 7. Complete - Celebration and rewards
 */

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { EconomicsLesson, EconomicsTrack } from '@/types/economics-curriculum';

import LessonIntroStep from './LessonIntroStep';
import LessonConceptsStep from './LessonConceptsStep';
import LessonPersonalFinanceStep from './LessonPersonalFinanceStep';
import LessonFlashcardsStep from './LessonFlashcardsStep';
import LessonQuizStep from './LessonQuizStep';
import LessonCareerSpotlightStep from './LessonCareerSpotlightStep';
import LessonCompleteStep from './LessonCompleteStep';

type LessonStep = 
  | 'intro'
  | 'concepts'
  | 'personal-finance'
  | 'flashcards'
  | 'quiz'
  | 'career-spotlight'
  | 'complete';

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
  unitId,
  track,
  onComplete,
  onExit,
}) => {
  const [currentStep, setCurrentStep] = useState<LessonStep>('intro');
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);

  const hasCareerSpotlight = !!lesson.careerSpotlight;

  const getStepOrder = useCallback((): LessonStep[] => {
    const steps: LessonStep[] = [
      'intro',
      'concepts',
      'personal-finance',
      'flashcards',
      'quiz',
    ];
    
    if (hasCareerSpotlight) {
      steps.push('career-spotlight');
    }
    
    steps.push('complete');
    return steps;
  }, [hasCareerSpotlight]);

  const goToNextStep = useCallback(() => {
    const steps = getStepOrder();
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  }, [currentStep, getStepOrder]);

  const goToPreviousStep = useCallback(() => {
    const steps = getStepOrder();
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }, [currentStep, getStepOrder]);

  const handleQuizComplete = useCallback((score: number, total: number) => {
    setQuizScore(score);
    setQuizTotal(total);
    goToNextStep();
  }, [goToNextStep]);

  const handleLessonComplete = useCallback(() => {
    const isPerfect = quizScore === quizTotal;
    const xpEarned = BASE_XP + (isPerfect ? PERFECT_BONUS_XP : 0);
    const bambooEarned = BASE_BAMBOO + (isPerfect ? PERFECT_BONUS_BAMBOO : 0);
    onComplete(xpEarned, bambooEarned);
  }, [quizScore, quizTotal, onComplete]);

  const handleReplay = useCallback(() => {
    setCurrentStep('intro');
    setQuizScore(0);
    setQuizTotal(0);
  }, []);

  const calculateRewards = () => {
    const isPerfect = quizScore === quizTotal;
    return {
      xp: BASE_XP + (isPerfect ? PERFECT_BONUS_XP : 0),
      bamboo: BASE_BAMBOO + (isPerfect ? PERFECT_BONUS_BAMBOO : 0),
    };
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <LessonIntroStep
            lessonTitle={lesson.title}
            estimatedMinutes={lesson.estimatedMinutes}
            hook={lesson.intro.hook}
            philMessage={lesson.intro.philMessage}
            onContinue={goToNextStep}
          />
        );

      case 'concepts':
        return (
          <LessonConceptsStep
            lessonTitle={lesson.title}
            concepts={lesson.coreConcepts}
            onContinue={goToNextStep}
            onBack={goToPreviousStep}
          />
        );

      case 'personal-finance':
        return (
          <LessonPersonalFinanceStep
            description={lesson.personalFinanceConnection.description}
            realWorldExample={lesson.personalFinanceConnection.realWorldExample}
            onContinue={goToNextStep}
            onBack={goToPreviousStep}
          />
        );

      case 'flashcards':
        return (
          <LessonFlashcardsStep
            flashcards={lesson.flashcards}
            onContinue={goToNextStep}
            onBack={goToPreviousStep}
          />
        );

      case 'quiz':
        return (
          <LessonQuizStep
            questions={lesson.quiz}
            onComplete={handleQuizComplete}
            onBack={goToPreviousStep}
          />
        );

      case 'career-spotlight':
        if (!lesson.careerSpotlight) {
          goToNextStep();
          return null;
        }
        return (
          <LessonCareerSpotlightStep
            career={lesson.careerSpotlight}
            onContinue={goToNextStep}
            onBack={goToPreviousStep}
          />
        );

      case 'complete':
        const rewards = calculateRewards();
        return (
          <LessonCompleteStep
            lessonTitle={lesson.title}
            quizScore={quizScore}
            quizTotal={quizTotal}
            xpEarned={rewards.xp}
            bambooEarned={rewards.bamboo}
            onContinue={handleLessonComplete}
            onReplay={handleReplay}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen">
      {currentStep !== 'complete' && (
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Exit Lesson
          </Button>
        </div>
      )}
      
      {renderCurrentStep()}
    </div>
  );
};

export default EconomicsLessonContainer;
