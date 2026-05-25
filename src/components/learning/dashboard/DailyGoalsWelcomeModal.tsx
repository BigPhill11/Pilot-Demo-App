import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PandaLogo from '@/components/icons/PandaLogo';
import type { DailyGoal } from '@/hooks/useDailyGoals';
import { navigateToGoal } from '@/lib/dashboardDeepLink';

interface DailyGoalsWelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  primaryGoal: DailyGoal | null;
  currentStreak: number;
  onNavigate?: (tab: string) => void;
}

const DailyGoalsWelcomeModal: React.FC<DailyGoalsWelcomeModalProps> = ({
  open,
  onOpenChange,
  primaryGoal,
  currentStreak,
  onNavigate,
}) => {
  const handleStart = () => {
    if (primaryGoal) {
      navigateToGoal(primaryGoal.targetTab, primaryGoal.deepLink, onNavigate);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-primary/20 bg-gradient-to-br from-background via-emerald-500/5 to-amber-500/5 rounded-2xl">
        <DialogHeader className="text-center sm:text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex justify-center mb-2"
          >
            <PandaLogo className="h-16 w-16" />
          </motion.div>
          <DialogTitle className="text-2xl font-bold">
            Today&apos;s Trail is Ready! 🌿
          </DialogTitle>
          <DialogDescription className="text-base">
            {currentStreak > 0
              ? `You're on a ${currentStreak}-day streak — keep it going!`
              : 'Start a streak by completing your first goal today.'}
          </DialogDescription>
        </DialogHeader>

        {primaryGoal && (
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{primaryGoal.icon}</span>
              <div>
                <p className="font-semibold text-foreground">{primaryGoal.title}</p>
                <p className="text-sm text-muted-foreground">{primaryGoal.description}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Badge className="bg-amber-500/90 hover:bg-amber-500 text-white border-0">
                +{primaryGoal.bambooReward} 🎋
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Sparkles className="h-3 w-3 mr-1 inline" />
                +{primaryGoal.xpReward} XP
              </Badge>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col gap-2 pt-2">
          <Button
            onClick={handleStart}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-base gap-2"
          >
            Start Today&apos;s Trail
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-muted-foreground">
            I&apos;ll explore the dashboard first
          </Button>
        </div>

        {currentStreak > 0 && (
          <div className="flex items-center justify-center gap-2 text-sm text-orange-600 dark:text-orange-400">
            <Flame className="h-4 w-4" />
            <span>{currentStreak} day streak — don&apos;t break the chain!</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DailyGoalsWelcomeModal;
