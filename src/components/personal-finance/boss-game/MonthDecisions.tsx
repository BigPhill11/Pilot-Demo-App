import { MonthDecision, DecisionOption, GameMeters } from '@/types/boss-game';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Briefcase, GraduationCap, MessageSquare, Wallet } from 'lucide-react';

interface MonthDecisionsProps {
  decision: MonthDecision;
  meters: GameMeters;
  unlocks: string[];
  onSelect: (option: DecisionOption) => void;
  selectedOptionId?: string;
}

const categoryIcons = {
  work: Briefcase,
  skill: GraduationCap,
  negotiation: MessageSquare,
  money: Wallet,
};

const categoryColors = {
  work: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
  skill: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
  negotiation: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
  money: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
};

const categoryLabels = {
  work: 'Work Decision',
  skill: 'Skill Choice',
  negotiation: 'Negotiation Moment',
  money: 'Money Allocation',
};

export function MonthDecisions({ decision, meters, unlocks, onSelect, selectedOptionId }: MonthDecisionsProps) {
  const Icon = categoryIcons[decision.category];
  
  const isOptionAvailable = (option: DecisionOption) => {
    if (!option.requires) return true;
    return option.requires.every(req => unlocks.includes(req));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "rounded-xl border p-5 bg-gradient-to-br",
        categoryColors[decision.category]
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-lg bg-background/50">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {categoryLabels[decision.category]}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{decision.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{decision.description}</p>
      
      {decision.pandaDialogue && (
        <div className="bg-background/50 rounded-lg p-3 mb-4 border border-border/30">
          <p className="text-sm italic flex items-start gap-2">
            <span className="text-xl">🐼</span>
            <span>"{decision.pandaDialogue}"</span>
          </p>
        </div>
      )}
      
      <div className="space-y-2">
        {decision.options.map((option) => {
          const available = isOptionAvailable(option);
          const isSelected = selectedOptionId === option.id;
          
          return (
            <motion.div
              key={option.id}
              whileHover={available && !isSelected ? { scale: 1.01 } : {}}
              whileTap={available && !isSelected ? { scale: 0.99 } : {}}
            >
              <button
                onClick={() => available && !isSelected && onSelect(option)}
                disabled={!available || isSelected}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all min-h-[64px]",
                  "active:scale-[0.99] touch-manipulation",
                  isSelected
                    ? "bg-primary/20 border-primary ring-2 ring-primary/30"
                    : available
                    ? "bg-background/70 border-border/50 hover:bg-background hover:border-border"
                    : "bg-muted/30 border-border/20 opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">{option.label}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{option.description}</p>
                    {!available && option.requires && (
                      <p className="text-xs text-amber-500 mt-1">
                        Requires: {option.requires.join(', ')}
                      </p>
                    )}
                  </div>
                  {isSelected && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                      Selected
                    </span>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
