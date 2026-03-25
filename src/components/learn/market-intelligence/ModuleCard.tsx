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

  // Theme-specific styling - all using Phil's sage/emerald palette
  const getThemeStyles = () => {
    switch (theme) {
      case 'newspaper':
        return {
          card: 'bg-[#faf8f0] border-green-300 hover:border-green-400',
          title: 'text-green-900 font-serif',
          description: 'text-green-800/80 font-serif',
          badge: 'bg-green-100 text-green-700 border border-green-200',
          button: 'bg-green-700 hover:bg-green-800 text-white',
        };
      case 'wealth':
        return {
          card: 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-300',
          title: 'text-green-800',
          description: 'text-green-700/80',
          badge: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
          button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        };
      case 'glossary':
        return {
          card: 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200 hover:border-green-300',
          title: 'text-green-800',
          description: 'text-green-700/80',
          badge: 'bg-teal-100 text-teal-700 border border-teal-200',
          button: 'bg-teal-600 hover:bg-teal-700 text-white',
        };
      default: // corporate
        return {
          card: 'bg-white border-green-200 hover:border-green-300',
          title: 'text-green-800',
          description: 'text-green-700/80',
          badge: 'bg-green-100 text-green-700 border border-green-200',
          button: 'bg-green-600 hover:bg-green-700 text-white',
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
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-green-400" />
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
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <span className="text-sm text-green-700">Completion Reward</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-800">
                  +{module.rewards?.bamboo ?? 10} 🎋
                </span>
                <span className="text-sm font-medium text-green-800">
                  +{module.rewards?.xp ?? 2} XP
                </span>
              </div>
            </div>

            {/* Action Button */}
            {progress.completed ? (
              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-100 border border-green-300">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-green-700 font-medium">Completed</span>
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



