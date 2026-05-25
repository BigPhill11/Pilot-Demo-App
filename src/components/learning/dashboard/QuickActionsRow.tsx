import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuickActionsRowProps {
  onNavigate?: (tab: string) => void;
}

const QuickActionsRow: React.FC<QuickActionsRowProps> = ({ onNavigate }) => {
  const isMobile = useIsMobile();

  const actions = [
    {
      tab: 'adaptive-flashcards',
      label: 'Quick Review',
      icon: PlayCircle,
      primary: true,
    },
    {
      tab: 'personal-finance',
      label: 'Continue Learning',
      icon: BookOpen,
      primary: false,
    },
    {
      tab: 'companies',
      label: 'Market Intelligence',
      icon: TrendingUp,
      primary: false,
    },
  ];

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-3`}>
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 + index * 0.06, duration: 0.3 }}
          >
            <Button
              onClick={() => onNavigate?.(action.tab)}
              variant={action.primary ? 'default' : 'outline'}
              className={`w-full h-20 rounded-xl touch-manipulation ${
                action.primary
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-md shadow-emerald-500/20'
                  : 'border-2 border-primary/25 text-foreground hover:bg-primary/5 hover:border-primary/40'
              }`}
            >
              <div className="text-center">
                <Icon className="h-7 w-7 mx-auto mb-1" />
                <div className="text-sm font-medium">{action.label}</div>
              </div>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default QuickActionsRow;
