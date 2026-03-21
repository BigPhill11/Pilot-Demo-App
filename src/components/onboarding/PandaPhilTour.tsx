import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PandaLogo from '@/components/icons/PandaLogo';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TourStep {
  id: number;
  title: string;
  message: string;
  highlightSelector?: string;
  position: 'center' | 'top' | 'bottom';
}

const tourSteps: TourStep[] = [
  {
    id: 1,
    title: "Welcome to Phil's Financials! 🐼",
    message: "I'm Phil, your financial learning buddy! Let me show you around and help you get started on your journey to financial literacy.",
    position: 'center'
  },
  {
    id: 2,
    title: "Your Home Base 🏠",
    message: "This is your dashboard! Here you can see your progress, daily streaks, and quick actions to continue learning.",
    position: 'center'
  },
  {
    id: 3,
    title: "The Learn Tab 📚",
    message: "The Learn section is where all the magic happens! You'll find lessons, quizzes, flashcards, and interactive content to boost your financial knowledge.",
    position: 'center'
  },
  {
    id: 4,
    title: "Your Bamboo Empire 🎋",
    message: "As you learn, you'll earn XP and coins! Use them to build your very own Bamboo Empire. The more you learn, the more your empire grows!",
    position: 'center'
  },
  {
    id: 5,
    title: "Your Learning Track 🎯",
    message: "Based on your quiz results, I've placed you in the perfect starting point. Don't worry - you can explore all tracks as you progress!",
    position: 'center'
  },
  {
    id: 6,
    title: "Streaks & XP 🔥",
    message: "Keep your streak alive by learning something new every day! Longer streaks mean bonus XP multipliers. Consistency is key!",
    position: 'center'
  },
  {
    id: 7,
    title: "You're All Set! 🎉",
    message: "That's everything you need to know to get started. Remember, I'm always here in the app if you need help. Let's build that financial future together!",
    position: 'center'
  }
];

interface PandaPhilTourProps {
  onComplete: () => void;
  placementTrack?: string;
}

const PandaPhilTour: React.FC<PandaPhilTourProps> = ({ onComplete, placementTrack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const step = tourSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourSteps.length - 1;
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  useEffect(() => {
    if (isLastStep && currentStep === tourSteps.length - 1) {
      // Don't trigger confetti until they click complete
    }
  }, [currentStep, isLastStep]);

  const handleNext = () => {
    if (isLastStep) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
      }, 500);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  // Customize step 5 message based on placement track
  const getStepMessage = (stepIndex: number): string => {
    if (stepIndex === 4 && placementTrack) {
      const trackNames: Record<string, string> = {
        'personal-finance': 'Personal Finance',
        'market-intelligence': 'Market Intelligence',
        'careers-in-finance': 'Careers in Finance'
      };
      const trackName = trackNames[placementTrack] || placementTrack;
      return `Based on your quiz results, I've placed you in the ${trackName} track - the perfect starting point for your journey! Don't worry - you can explore all tracks as you progress!`;
    }
    return tourSteps[stepIndex].message;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          
          {/* Tour Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            <Card className="p-6 relative overflow-hidden">
              {/* Skip Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-muted-foreground"
                onClick={handleSkip}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Step {currentStep + 1} of {tourSteps.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              
              {/* Panda Phil */}
              <motion.div
                className="flex justify-center mb-4"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <div className="relative">
                  <PandaLogo className="h-20 w-20" />
                  {/* Speech bubble indicator */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary/20" />
                  </div>
                </div>
              </motion.div>
              
              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-center space-y-3 mb-6"
                >
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {getStepMessage(currentStep)}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isFirstStep}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                
                <Button
                  onClick={handleNext}
                  className="flex-1"
                >
                  {isLastStep ? (
                    "Let's Go! 🚀"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PandaPhilTour;
