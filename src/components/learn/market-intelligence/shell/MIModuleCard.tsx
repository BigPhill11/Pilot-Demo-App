import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Check, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ModuleCardData } from '@/data/market-intelligence/catalog';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface MIModuleCardProps {
  module: ModuleCardData;
  progress: { completed: boolean; checkpoints?: number; totalCheckpoints?: number };
  /** If provided, clicking starts a lesson. Otherwise shows a dialog with Mark as Complete. */
  onStartLesson?: (moduleId: string) => void;
  onComplete?: () => void;
  accent?: 'emerald' | 'gold' | 'navy' | 'newsprint' | 'violet';
  className?: string;
}

const ACCENT = {
  emerald: {
    card: 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-300',
    title: 'text-green-800',
    desc: 'text-green-700/80',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    ring: 'ring-emerald-500/50',
  },
  gold: {
    card: 'bg-gradient-to-br from-amber-50/60 to-emerald-50 border-amber-200 hover:border-amber-300',
    title: 'text-amber-900',
    desc: 'text-amber-800/70',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    btn: 'bg-amber-600 hover:bg-amber-700 text-white',
    ring: 'ring-amber-500/50',
  },
  navy: {
    card: 'bg-gradient-to-br from-slate-50 to-green-50 border-slate-200 hover:border-slate-300',
    title: 'text-slate-800',
    desc: 'text-slate-700/80',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    btn: 'bg-slate-700 hover:bg-slate-800 text-white',
    ring: 'ring-slate-500/50',
  },
  newsprint: {
    card: 'bg-[#faf8f0] border-green-300 hover:border-green-400',
    title: 'text-green-900 font-serif',
    desc: 'text-green-800/80 font-serif',
    badge: 'bg-green-100 text-green-700 border-green-200',
    btn: 'bg-green-700 hover:bg-green-800 text-white',
    ring: 'ring-green-500/50',
  },
  violet: {
    card: 'bg-gradient-to-br from-violet-50 to-emerald-50/30 border-violet-200 hover:border-violet-300',
    title: 'text-violet-900',
    desc: 'text-violet-800/70',
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    btn: 'bg-violet-600 hover:bg-violet-700 text-white',
    ring: 'ring-violet-500/50',
  },
};

const MIModuleCard: React.FC<MIModuleCardProps> = ({
  module,
  progress,
  onStartLesson,
  onComplete,
  accent = 'emerald',
  className,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const s = ACCENT[accent];
  const hasLesson = Boolean(onStartLesson);

  const handleClick = () => {
    if (hasLesson) {
      onStartLesson!(module.id);
    } else {
      setShowDialog(true);
    }
  };

  const handleComplete = () => {
    onComplete?.();
    setShowDialog(false);
  };

  return (
    <>
      <Card
        className={cn(
          'cursor-pointer transition-all hover:scale-[1.02] border',
          s.card,
          progress.completed && `ring-2 ${s.ring}`,
          className
        )}
        onClick={handleClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-0.5 shrink-0"><ThemedEmoji emoji={module.icon} className="h-[1em] w-[1em]" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn('font-semibold truncate text-sm', s.title)}>{module.title}</h3>
                {progress.completed && <Check className="h-4 w-4 text-green-500 shrink-0" />}
              </div>
              <p className={cn('text-xs line-clamp-2', s.desc)}>{module.description}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="outline" className={cn('text-[10px]', s.badge)}>
                  <Clock className="h-3 w-3 mr-1" />
                  {module.estimatedMinutes} min
                </Badge>
                {module.difficulty && (
                  <Badge variant="outline" className={cn('text-[10px]', s.badge)}>
                    {module.difficulty}
                  </Badge>
                )}
                {hasLesson && !progress.completed && (
                  <Badge variant="outline" className={cn('text-[10px]', s.badge)}>
                    Full Lesson
                  </Badge>
                )}
              </div>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-green-400" />
          </div>
        </CardContent>
      </Card>

      {!hasLesson && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl"><ThemedEmoji emoji={module.icon} className="h-[1em] w-[1em]" /></span>
                <DialogTitle className="text-xl">{module.title}</DialogTitle>
              </div>
              <DialogDescription className="text-base">{module.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Time</p>
                  <p className="font-medium text-sm">{module.estimatedMinutes} min</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                  <p className="font-medium text-sm">{module.difficulty || 'Beginner'}</p>
                </div>
              </div>
              {module.learningPoints && (
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-2">What You'll Learn</p>
                  <ul className="space-y-1">
                    {module.learningPoints.map((pt, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <Sparkles className="h-3 w-3 mt-1 text-primary shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <span className="text-sm text-green-700">Reward</span>
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-green-800">+{module.rewards?.bamboo ?? 10} 🎋</span>
                  <span className="text-sm font-medium text-green-800">+{module.rewards?.xp ?? 2} XP</span>
                </div>
              </div>
              {progress.completed ? (
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-100 border border-green-300">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 font-medium">Completed</span>
                </div>
              ) : (
                <Button className={cn('w-full', s.btn)} onClick={handleComplete}>
                  Mark as Complete
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MIModuleCard;
