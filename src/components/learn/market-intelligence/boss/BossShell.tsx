import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BossShellProps {
  title: string;
  icon: string;
  accentClass?: string;
  onExit: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const BossShell: React.FC<BossShellProps> = ({
  title,
  icon,
  accentClass = 'bg-emerald-50/95 border-emerald-200',
  onExit,
  children,
  footer,
}) => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 via-emerald-900/20 to-slate-900 pb-8">
    <div className={cn('sticky top-0 z-30 backdrop-blur border-b px-3 pt-3 pb-2', accentClass)}>
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onExit}
          className="text-emerald-700 hover:bg-emerald-100 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <p className="text-sm font-bold text-emerald-800">{title}</p>
        </div>
        <div className="w-8" />
      </div>
    </div>
    <div className="max-w-lg mx-auto px-4 pt-6">{children}</div>
    {footer && <div className="max-w-lg mx-auto px-4 pt-4">{footer}</div>}
  </div>
);

export interface BossScoreCardProps {
  score: number;
  maxScore: number;
  goldThreshold: number;
  silverThreshold: number;
  onContinue: () => void;
  onReplay: () => void;
  rewardBamboo?: number;
  rewardXp?: number;
  firstClear?: boolean;
}

export const BossScoreCard: React.FC<BossScoreCardProps> = ({
  score,
  maxScore,
  goldThreshold,
  silverThreshold,
  onContinue,
  onReplay,
  rewardBamboo = 100,
  rewardXp = 25,
  firstClear = false,
}) => {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const tier = pct >= goldThreshold ? 'gold' : pct >= silverThreshold ? 'silver' : 'bronze';

  const TIER = {
    gold: { emoji: '🥇', label: 'Gold Panda', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    silver: { emoji: '🥈', label: 'Silver Panda', color: 'text-slate-500', bg: 'bg-slate-50 border-slate-200' },
    bronze: { emoji: '🥉', label: 'Bronze Panda', color: 'text-amber-700', bg: 'bg-amber-50/50 border-amber-200' },
  };
  const t = TIER[tier];

  return (
    <div className="space-y-4">
      <div className={cn('p-6 rounded-xl border text-center', t.bg)}>
        <div className="text-5xl mb-2">{t.emoji}</div>
        <h3 className={cn('text-2xl font-bold mb-1', t.color)}>{t.label}</h3>
        <p className="text-sm text-slate-600">{score}/{maxScore} correct</p>
        {firstClear && (
          <div className="mt-3 p-3 rounded-lg bg-emerald-100 border border-emerald-200">
            <p className="text-emerald-800 font-medium text-sm">First clear bonus!</p>
            <p className="text-emerald-700 text-sm">+{rewardBamboo} 🎋 +{rewardXp} XP</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={onReplay} className="border-emerald-200 text-emerald-700">
          Play Again
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BossShell;
