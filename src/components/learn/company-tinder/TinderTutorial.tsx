import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Star, X, TrendingUp, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface TinderTutorialProps {
  isOpen: boolean;
  onComplete: () => void;
}

const TinderTutorial: React.FC<TinderTutorialProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Tutorial complete
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  const progress = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-4"
          >
            <div className="text-6xl mb-4">💘</div>
            <h2 className="text-3xl font-bold">Welcome to Company Speed Dating!</h2>
            <p className="text-lg text-muted-foreground">
              Swipe through real companies just like you're on Tinder
            </p>
            <p className="text-muted-foreground">
              Find your perfect investment matches and earn XP along the way!
            </p>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Master the Swipe Actions</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Pass (Left)</p>
                  <p className="text-sm text-muted-foreground">Not interested, move on (+5 XP)</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Like (Right)</p>
                  <p className="text-sm text-muted-foreground">Add to watchlist (+10 XP)</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Super Like</p>
                  <p className="text-sm text-muted-foreground">High interest, priority match (+25 XP)</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">Limited to 5 per session!</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Explore the Card</h2>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <p className="font-semibold">📊 Quick Stats</p>
                <p className="text-sm text-muted-foreground">See market cap, revenue, P/E ratio at a glance</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-semibold">💼 Professional</p>
                <p className="text-sm text-muted-foreground">Deep dive into business model and financials</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-semibold">💘 Dating Profile</p>
                <p className="text-sm text-muted-foreground">Fun take on market sentiment and performance</p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Tap the tabs to switch between views!
            </p>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-4"
          >
            <div className="text-6xl mb-4">💕</div>
            <h2 className="text-2xl font-bold">It's a Match!</h2>
            <p className="text-muted-foreground">
              When you Like or Super Like a company, it goes to your <strong>Matches collection</strong>
            </p>
            <div className="p-4 bg-primary/10 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm">
                Track all your favorite companies in one place and build your investment watchlist
              </p>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Level Up & Earn Badges</h2>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">Earn XP</p>
                  <span className="text-sm text-primary font-bold">+5 to +25 XP</span>
                </div>
                <p className="text-sm text-muted-foreground">Every swipe earns you experience points</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <p className="font-semibold">Unlock Badges</p>
                </div>
                <p className="text-sm text-muted-foreground">Complete achievements to collect exclusive badges</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-semibold">Build Your Streak</p>
                <p className="text-sm text-muted-foreground">Swipe daily to maintain your streak and earn bonuses</p>
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold">You're Ready!</h2>
            <div className="space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="font-bold text-lg">Tutorial Complete Rewards</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">🎯 +100 XP</p>
                  <p className="text-sm">💘 Speed Dater Badge</p>
                  <p className="text-sm">⭐ 5 Free Super Likes</p>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              Start swiping to discover your perfect investment matches!
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && step === totalSteps && onComplete()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="space-y-4">
            <DialogTitle className="text-center">
              Company Tinder Tutorial
            </DialogTitle>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>
        </DialogHeader>

        <div className="py-6">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        <div className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <Button 
            onClick={nextStep}
            className="ml-auto"
          >
            {step === totalSteps ? "Start Swiping!" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TinderTutorial;
