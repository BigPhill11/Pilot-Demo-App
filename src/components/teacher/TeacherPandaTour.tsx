import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PandaLogo from '@/components/icons/PandaLogo';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TeacherView } from './TeacherShell';

interface TourStep {
  id: number;
  title: string;
  message: string;
  /** Dashboard view to show behind the card while this step is up. */
  view: TeacherView;
  /**
   * 'center' covers the screen for intro/outro steps; 'bottom' pins the card
   * low with a see-through overlay so the screen being described stays visible.
   */
  position: 'center' | 'bottom';
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 1,
    title: 'Welcome to your teacher dashboard!',
    message:
      "I'm Phil, your classroom co-pilot! Let me walk you through every screen so you know exactly where everything lives.",
    view: 'overview',
    position: 'center',
  },
  {
    id: 2,
    title: 'Your class at a glance',
    message:
      'Up top you can see your class code — tap Copy and share it so students can join. The tiles below track students, weekly activity, streaks, and who needs attention.',
    view: 'overview',
    position: 'bottom',
  },
  {
    id: 3,
    title: 'Daily activity',
    message:
      'This heatmap shows who opened the app each day. Green squares are sign-ins, so patterns like "only on class days" jump right out. Tap any name for details.',
    view: 'overview',
    position: 'bottom',
  },
  {
    id: 4,
    title: 'Module completion',
    message:
      'The matrix below shows exactly which modules each student has finished, started, or not touched yet. Swipe sideways to see every module in a track.',
    view: 'overview',
    position: 'bottom',
  },
  {
    id: 5,
    title: 'The Students tab',
    message:
      'Here is your full roster — search, sort by streaks, progress, or XP, and export everything to CSV for grading. Tap a student to open their full profile.',
    view: 'roster',
    position: 'bottom',
  },
  {
    id: 6,
    title: 'Class insights',
    message:
      'The Insights tab surfaces trends and highlights across the whole class, so you can spot wins and gaps without digging through individual profiles.',
    view: 'insights',
    position: 'bottom',
  },
  {
    id: 7,
    title: 'Getting around',
    message:
      'On your phone, switch screens with the tabs at the bottom. The menu button (top-left) opens your class list — jump between classes or create a new one any time.',
    view: 'overview',
    position: 'center',
  },
  {
    id: 8,
    title: "You're all set!",
    message:
      "That's the whole dashboard! Share your class code, and I'll take care of guiding your students. You've got this, teach!",
    view: 'overview',
    position: 'center',
  },
];

interface TeacherPandaTourProps {
  onComplete: () => void;
  /** Lets the tour switch the dashboard view behind it as it walks through screens. */
  onShowView: (view: TeacherView) => void;
}

/**
 * Phil-the-Panda guided tour of the teacher dashboard — the teacher's
 * counterpart to the student PandaPhilTour. It steps through every screen,
 * switching the live dashboard behind a translucent overlay as it goes.
 */
const TeacherPandaTour: React.FC<TeacherPandaTourProps> = ({ onComplete, onShowView }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const step = TOUR_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;
  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100;
  const centered = step.position === 'center';

  // Keep the dashboard behind the card in sync with the step being described.
  useEffect(() => {
    onShowView(step.view);
  }, [step.view, onShowView]);

  const finish = (celebrate: boolean) => {
    if (celebrate) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    onShowView('overview');
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  const handleNext = () => {
    if (isLastStep) {
      finish(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex justify-center ${
            centered ? 'items-center' : 'items-end'
          }`}
        >
          {/* Overlay: opaque-ish for intro/outro, light for steps that point at the screen behind. */}
          <div
            className={`absolute inset-0 ${
              centered ? 'bg-background/80 backdrop-blur-sm' : 'bg-background/30'
            }`}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: centered ? 0 : 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={`relative z-10 w-full max-w-md mx-4 ${centered ? '' : 'mb-24 md:mb-6'}`}
          >
            <Card className="p-6 relative overflow-hidden shadow-xl">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-muted-foreground"
                onClick={() => finish(false)}
                aria-label="Skip tour"
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="mb-5">
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-1 pr-10">
                  <span>
                    Step {currentStep + 1} of {TOUR_STEPS.length}
                  </span>
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

              <motion.div
                className="flex justify-center mb-3"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <PandaLogo className={centered ? 'h-20 w-20' : 'h-14 w-14'} />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-center space-y-2 mb-5"
                >
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.message}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={() => !isFirstStep && setCurrentStep(currentStep - 1)}
                  disabled={isFirstStep}
                  className="flex-1"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>

                <Button onClick={handleNext} className="flex-1">
                  {isLastStep ? (
                    "Let's Go!"
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

export default TeacherPandaTour;
