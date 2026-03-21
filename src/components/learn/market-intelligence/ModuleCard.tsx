import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, Clock, ChevronRight, Lock, Sparkles } from 'lucide-react';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { ModuleCardData } from '@/data/market-intelligence/catalog';

interface ModuleCardProps {
  module: ModuleCardData;
  progress: {
    completed: boolean;
    checkpoints?: number;
    totalCheckpoints?: number;
  };
  onComplete: () => void;
  theme?: 'corporate' | 'newspaper' | 'wealth' | 'glossary';
}

/**
 * ModuleCard Component
 * 
 * Displays a module card with title, description, estimated time,
 * and a checkpoint/complete action. Supports different visual themes.
 */
const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  progress,
  onComplete,
  theme = 'corporate',
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const { awardResources } = usePlatformIntegration();

  const handleComplete = () => {
    // Award resources
    awardResources(
      module.rewards?.bamboo ?? 10,
      module.rewards?.xp ?? 2,
      `MI: ${module.title}`,
      true
    );
    onComplete();
    setShowDialog(false);
  };

  // Theme-specific styling
  const getThemeStyles = () => {
    switch (theme) {
      case 'newspaper':
        return {
          card: 'bg-[#faf8f0] border-slate-300 hover:border-slate-400',
          title: 'text-slate-900 font-serif',
          description: 'text-slate-700 font-serif',
          badge: 'bg-slate-200 text-slate-700',
          button: 'bg-slate-800 hover:bg-slate-900 text-white',
        };
      case 'wealth':
        return {
          card: 'bg-gradient-to-br from-violet-950/80 to-indigo-950/80 border-violet-500/30 hover:border-violet-400/50',
          title: 'text-white',
          description: 'text-violet-200/80',
          badge: 'bg-violet-900/50 text-violet-300',
          button: 'bg-violet-600 hover:bg-violet-700 text-white',
        };
      case 'glossary':
        return {
          card: 'bg-gradient-to-br from-amber-950/80 to-orange-950/80 border-amber-500/30 hover:border-amber-400/50',
          title: 'text-white',
          description: 'text-amber-200/80',
          badge: 'bg-amber-900/50 text-amber-300',
          button: 'bg-amber-600 hover:bg-amber-700 text-white',
        };
      default: // corporate
        return {
          card: 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-600/50 hover:border-slate-500/70',
          title: 'text-white',
          description: 'text-slate-300',
          badge: 'bg-slate-700 text-slate-300',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <>
      <Card 
        className={`cursor-pointer transition-all hover:scale-[1.02] ${styles.card} ${
          progress.completed ? 'ring-2 ring-green-500/50' : ''
        }`}
        onClick={() => setShowDialog(true)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="text-2xl mt-0.5">{module.icon}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold truncate ${styles.title}`}>
                  {module.title}
                </h3>
                {progress.completed && (
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                )}
              </div>
              <p className={`text-sm line-clamp-2 ${styles.description}`}>
                {module.description}
              </p>
              
              {/* Footer */}
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={`text-xs ${styles.badge}`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {module.estimatedMinutes} min
                </Badge>
                {module.difficulty && (
                  <Badge variant="outline" className={`text-xs ${styles.badge}`}>
                    {module.difficulty}
                  </Badge>
                )}
              </div>
            </div>

            {/* Arrow */}
            <ChevronRight className={`h-5 w-5 flex-shrink-0 ${
              theme === 'newspaper' ? 'text-slate-400' : 'text-slate-500'
            }`} />
          </div>
        </CardContent>
      </Card>

      {/* Module Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{module.icon}</span>
              <DialogTitle className="text-xl">{module.title}</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              {module.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Module Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Estimated Time</p>
                <p className="font-medium">{module.estimatedMinutes} minutes</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                <p className="font-medium">{module.difficulty || 'Beginner'}</p>
              </div>
            </div>

            {/* What You'll Learn */}
            {module.learningPoints && (
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-2">What You'll Learn</p>
                <ul className="space-y-1">
                  {module.learningPoints.map((point, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <Sparkles className="h-3 w-3 mt-1 text-primary flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Rewards */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/30">
              <span className="text-sm text-emerald-300">Completion Reward</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                  +{module.rewards?.bamboo ?? 10} 🎋
                </span>
                <span className="text-sm font-medium text-white">
                  +{module.rewards?.xp ?? 2} XP
                </span>
              </div>
            </div>

            {/* Action Button */}
            {progress.completed ? (
              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-900/30 border border-green-500/30">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-green-300 font-medium">Completed</span>
              </div>
            ) : (
              <Button 
                className={`w-full ${styles.button}`}
                onClick={handleComplete}
              >
                Mark as Complete
                <Check className="ml-2 h-4 w-4" />
              </Button>
            )}

            <p className="text-xs text-center text-muted-foreground">
              Full lesson content coming soon. Complete checkpoints to earn rewards now!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModuleCard;



