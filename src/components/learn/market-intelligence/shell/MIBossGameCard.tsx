import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Trophy, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MIBossGameCardProps {
  icon: string;
  title: string;
  description: string;
  accent?: 'emerald' | 'gold' | 'navy' | 'newsprint' | 'violet';
  /** 0–100, used when locked to show how far the section is */
  sectionPercent?: number;
  unlocked: boolean;
  completed?: boolean;
  onPlay?: () => void;
}

const ACCENT = {
  emerald: {
    card: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50',
    header: 'border-b border-emerald-200',
    btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    lock: 'text-emerald-600/60',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    progress: 'bg-emerald-500',
    progressTrack: 'bg-emerald-200',
    tagText: 'text-emerald-700',
  },
  gold: {
    card: 'border-amber-200 bg-gradient-to-br from-amber-50/50 to-emerald-50',
    header: 'border-b border-amber-200',
    btn: 'bg-amber-600 hover:bg-amber-700 text-white',
    lock: 'text-amber-600/60',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    progress: 'bg-amber-500',
    progressTrack: 'bg-amber-100',
    tagText: 'text-amber-700',
  },
  navy: {
    card: 'border-slate-200 bg-gradient-to-br from-slate-50 to-green-50',
    header: 'border-b border-slate-200',
    btn: 'bg-slate-700 hover:bg-slate-800 text-white',
    lock: 'text-slate-600/60',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    progress: 'bg-slate-600',
    progressTrack: 'bg-slate-200',
    tagText: 'text-slate-700',
  },
  newsprint: {
    card: 'border-green-700 bg-[#faf8f0]',
    header: 'border-b border-green-300',
    btn: 'bg-green-700 hover:bg-green-800 text-white',
    lock: 'text-green-600/60',
    badge: 'bg-green-100 text-green-700 border-green-200 font-serif',
    progress: 'bg-green-700',
    progressTrack: 'bg-green-200',
    tagText: 'text-green-700',
  },
  violet: {
    card: 'border-violet-200 bg-gradient-to-br from-violet-50 to-emerald-50/30',
    header: 'border-b border-violet-200',
    btn: 'bg-violet-600 hover:bg-violet-700 text-white',
    lock: 'text-violet-600/60',
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    progress: 'bg-violet-500',
    progressTrack: 'bg-violet-100',
    tagText: 'text-violet-700',
  },
};

const MIBossGameCard: React.FC<MIBossGameCardProps> = ({
  icon,
  title,
  description,
  accent = 'emerald',
  sectionPercent = 0,
  unlocked,
  completed = false,
  onPlay,
}) => {
  const s = ACCENT[accent];

  return (
    <Card className={cn('border', s.card)}>
      <CardHeader className={cn('pb-3', s.header)}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-900">{title}</h3>
            <p className="text-sm text-green-700/80">{description}</p>
          </div>
          {completed && <Trophy className="h-5 w-5 text-amber-500" />}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {unlocked ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700 font-medium">
              {completed ? '+100 🎋 +25 XP earned' : '+100 🎋 +25 XP on first clear'}
            </span>
            <Button size="sm" className={s.btn} onClick={onPlay}>
              <Play className="h-4 w-4 mr-1" />
              {completed ? 'Play Again' : 'Play'}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className={cn('flex items-center gap-1', s.lock)}>
                <Lock className="h-4 w-4" />
                Complete all modules to unlock
              </span>
              <span className={cn('text-xs font-medium', s.tagText)}>{sectionPercent}%</span>
            </div>
            <div className={cn('h-1.5 rounded-full overflow-hidden', s.progressTrack)}>
              <div
                className={cn('h-full rounded-full transition-all', s.progress)}
                style={{ width: `${sectionPercent}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MIBossGameCard;
