import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lesson } from '@/types/personal-finance';
import MicroLesson from './MicroLesson';
import LessonFlashcards from './LessonFlashcards';
import TimeValueSimulator from './TimeValueSimulator';
import LessonQuiz from './LessonQuiz';
import MiniReflection from './MiniReflection';
import PowerMove from './PowerMove';
import { cn } from '@/lib/utils';

interface LessonContainerProps {
  lesson: Lesson;
  onComplete: (xpEarned: number, coinsEarned: number) => void;
  onBack: () => void;
}

type LessonStep = 'intro' | 'micro-lesson' | 'flashcards' | 'simulator' | 'quiz' | 'reflection' | 'power-move' | 'complete';

const STEPS: LessonStep[] = ['intro', 'micro-lesson', 'flashcards', 'simulator', 'quiz', 'reflection', 'power-move', 'complete'];

const LessonContainer: React.FC<LessonContainerProps> = ({
  lesson,
  onComplete,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState<LessonStep>('intro');
  const [xpEarned, setXpEarned] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [stepCompleted, setStepCompleted] = useState<Record<string, boolean>>({});

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progressPercent = (currentStepIndex / (STEPS.length - 1)) * 100;

  const handleStepComplete = (xp: number = 0, coins: number = 0) => {
    setXpEarned(prev => prev + xp);
    setCoinsEarned(prev => prev + coins);
    setStepCompleted(prev => ({ ...prev, [currentStep]: true }));
  };

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
    if (STEPS[nextIndex] === 'complete') {
      onComplete(xpEarned, coinsEarned);
    }
  };

  const goToPrevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
    } else {
      onBack(); // Go back to module view if at first step
    }
  };

  const canGoBack = currentStepIndex > 0;
  const canGoForward = stepCompleted[currentStep] && currentStepIndex < STEPS.length - 1;

  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Reality Hook */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6">
              <h3 className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">Reality Check</h3>
              <p className="text-lg leading-relaxed whitespace-pre-line">{lesson.realityHook}</p>
            </div>

            {/* Outcome Preview */}
            <div className="bg-muted/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">What You'll Unlock</h3>
                  <p className="text-muted-foreground text-sm">{lesson.outcomePreview}</p>
                </div>
              </div>
            </div>

            {/* Module Overview */}
            <div>
              <h3 className="font-medium mb-3">About This Lesson</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{lesson.moduleOverview}</p>
            </div>

            <Button onClick={goToNextStep} className="w-full h-12 text-base">
              Start Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      case 'micro-lesson':
        return (
          <MicroLesson
            content={lesson.microLesson}
            onComplete={() => {
              handleStepComplete(15, 1);
              goToNextStep();
            }}
          />
        );

      case 'flashcards':
        return (
          <LessonFlashcards
            flashcards={lesson.flashcards}
            onComplete={() => {
              handleStepComplete(25, 2);
              goToNextStep();
            }}
          />
        );

      case 'simulator':
        return (
          <TimeValueSimulator
            config={lesson.simulatorGame}
            onComplete={(won, xp, coins) => {
              handleStepComplete(xp, coins);
              goToNextStep();
            }}
          />
        );

      case 'quiz':
        return (
          <LessonQuiz
            questions={lesson.quiz}
            onComplete={(score) => {
              const xp = score * 20;
              const coins = Math.floor(score * 2);
              handleStepComplete(xp, coins);
              goToNextStep();
            }}
          />
        );

      case 'reflection':
        return (
          <MiniReflection
            question={lesson.miniReflection.question}
            followUp={lesson.miniReflection.followUp}
            onComplete={() => {
              handleStepComplete(10, 1);
              goToNextStep();
            }}
          />
        );

      case 'power-move':
        return (
          <PowerMove
            powerMove={lesson.powerMove}
            realLifeAction={lesson.realLifeAction}
            onComplete={() => {
              handleStepComplete(25, 3);
              goToNextStep();
            }}
          />
        );

      case 'complete':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
            <p className="text-muted-foreground mb-6">
              You've mastered the basics of active income
            </p>

            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{xpEarned}</div>
                <div className="text-sm text-muted-foreground">XP Earned</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">{coinsEarned}</div>
                <div className="text-sm text-muted-foreground">Coins Earned</div>
              </div>
            </div>

            <Button onClick={onBack} className="w-full max-w-xs">
              Back to Modules
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-10 px-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {lesson.estimatedMinutes} min
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold mb-2">{lesson.title}</h1>
        
        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <Progress value={progressPercent} className="flex-1 h-2" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {currentStepIndex + 1}/{STEPS.length}
          </span>
        </div>

        {/* XP/Coins counter */}
        {(xpEarned > 0 || coinsEarned > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mt-3 text-sm"
          >
            <span className="flex items-center gap-1 text-primary">
              <Sparkles className="w-4 h-4" />
              {xpEarned} XP
            </span>
            <span className="flex items-center gap-1 text-amber-500">
              🪙 {coinsEarned}
            </span>
          </motion.div>
        )}
      </div>

      {/* Step navigation with larger touch targets */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevStep}
          disabled={currentStep === 'intro'}
          className="h-10 px-3 opacity-70 hover:opacity-100"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        {/* Progress dots - larger on mobile */}
        <div className="flex items-center gap-2 sm:gap-2">
          {STEPS.slice(0, -1).map((step, index) => (
            <div
              key={step}
              className={cn(
                "rounded-full transition-all cursor-pointer",
                // Larger touch targets on all devices
                "w-3 h-3 sm:w-2 sm:h-2",
                index < currentStepIndex && "bg-primary hover:scale-125",
                index === currentStepIndex && "w-5 sm:w-4 bg-primary",
                index > currentStepIndex && "bg-muted"
              )}
              onClick={() => {
                // Allow clicking on completed steps to go back
                if (index < currentStepIndex) {
                  setCurrentStep(STEPS[index]);
                }
              }}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextStep}
          disabled={!canGoForward}
          className="h-10 px-3 opacity-70 hover:opacity-100"
        >
          Skip
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <div key={currentStep}>
          {renderStep()}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default LessonContainer;
