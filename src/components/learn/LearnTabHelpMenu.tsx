import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HelpCircle, RotateCcw, Lightbulb, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface LearnTabHelpMenuProps {
  onRestartTutorial?: () => void;
}

const quickTips = [
  "Complete lessons daily to maintain your streak! 🔥",
  "Games give bonus XP—play them after lessons!",
  "Stuck? Rewatch lesson videos anytime.",
  "Paper Trading applies what you learn here!",
  "Check your progress dashboard regularly to track growth.",
  "Interactive modules unlock as you level up!",
];

const LearnTabHelpMenu: React.FC<LearnTabHelpMenuProps> = ({ onRestartTutorial }) => {
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    // Pulse animation on first load
    const hasSeenHelp = sessionStorage.getItem('learn-help-seen');
    if (!hasSeenHelp) {
      setShouldPulse(true);
      sessionStorage.setItem('learn-help-seen', 'true');
      
      // Stop pulsing after 5 seconds
      setTimeout(() => setShouldPulse(false), 5000);
    }
  }, []);

  const showRandomTip = () => {
    const randomTip = quickTips[Math.floor(Math.random() * quickTips.length)];
    toast.info(randomTip, { duration: 5000 });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            animate={shouldPulse ? {
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.7)",
                "0 0 0 10px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0)"
              ]
            } : {}}
            transition={shouldPulse ? {
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            } : {}}
          >
            <Button
              size="lg"
              className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
            >
              <HelpCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => onRestartTutorial?.()}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Restart Tutorial
          </DropdownMenuItem>
          <DropdownMenuItem onClick={showRandomTip}>
            <Lightbulb className="mr-2 h-4 w-4" />
            Quick Tips
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info('Progress tracking is in the cards at the top of the homepage!')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            View My Progress
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LearnTabHelpMenu;
