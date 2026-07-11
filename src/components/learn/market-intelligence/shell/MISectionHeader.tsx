import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ThemedEmoji } from '@/components/ui/themed-icons';

export interface MISectionChip {
  label: string;
  icon?: string;
}

interface MISectionHeaderProps {
  icon: string;
  title: string;
  intro: string;
  accent?: 'emerald' | 'gold' | 'navy' | 'newsprint' | 'violet';
  chips?: MISectionChip[];
  progressCompleted?: number;
  progressTotal?: number;
  stripeContent?: React.ReactNode;
  children?: React.ReactNode;
}

const ACCENT_STYLES = {
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100 border-emerald-200',
    title: 'text-green-800',
    text: 'text-green-700/80',
    chip: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    progress: 'bg-emerald-500',
    progressTrack: 'bg-emerald-200',
    glow1: 'bg-emerald-200',
    glow2: 'bg-green-200',
  },
  gold: {
    bg: 'bg-gradient-to-br from-emerald-50 via-amber-50/30 to-yellow-50/20',
    border: 'border-emerald-200',
    iconBg: 'bg-amber-100 border-amber-200',
    title: 'text-green-800',
    text: 'text-green-700/80',
    chip: 'bg-amber-100 text-amber-700 border-amber-200',
    progress: 'bg-amber-500',
    progressTrack: 'bg-amber-100',
    glow1: 'bg-amber-200',
    glow2: 'bg-emerald-200',
  },
  navy: {
    bg: 'bg-gradient-to-br from-green-50 via-emerald-50 to-slate-50/30',
    border: 'border-green-200',
    iconBg: 'bg-slate-100 border-slate-200',
    title: 'text-slate-800',
    text: 'text-slate-700/80',
    chip: 'bg-slate-100 text-slate-700 border-slate-200',
    progress: 'bg-slate-600',
    progressTrack: 'bg-slate-200',
    glow1: 'bg-slate-200',
    glow2: 'bg-green-200',
  },
  newsprint: {
    bg: 'bg-[#faf8f0]',
    border: 'border-green-700',
    iconBg: 'bg-green-100 border-green-300',
    title: 'text-green-900',
    text: 'text-green-800/80',
    chip: 'bg-green-100 text-green-700 border-green-200',
    progress: 'bg-green-700',
    progressTrack: 'bg-green-200',
    glow1: 'bg-green-300',
    glow2: 'bg-green-200',
  },
  violet: {
    bg: 'bg-gradient-to-br from-violet-50 via-purple-50 to-emerald-50',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100 border-violet-200',
    title: 'text-violet-900',
    text: 'text-violet-800/80',
    chip: 'bg-violet-100 text-violet-700 border-violet-200',
    progress: 'bg-violet-500',
    progressTrack: 'bg-violet-100',
    glow1: 'bg-violet-200',
    glow2: 'bg-emerald-200',
  },
};

const MISectionHeader: React.FC<MISectionHeaderProps> = ({
  icon,
  title,
  intro,
  accent = 'emerald',
  chips = [],
  progressCompleted,
  progressTotal,
  stripeContent,
  children,
}) => {
  const s = ACCENT_STYLES[accent];
  const showProgress = progressCompleted !== undefined && progressTotal !== undefined && progressTotal > 0;

  return (
    <div className={cn('relative overflow-hidden rounded-xl border shadow-sm', s.bg, s.border)}>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className={cn('absolute top-4 right-4 w-64 h-64 rounded-full blur-3xl', s.glow1)} />
        <div className={cn('absolute bottom-4 left-4 w-48 h-48 rounded-full blur-3xl', s.glow2)} />
      </div>

      {stripeContent && (
        <div className={cn('border-b-2 px-4 py-3', s.border)}>
          {stripeContent}
        </div>
      )}

      <div className="relative z-10 p-6">
        <div className="flex items-start gap-4">
          <div className={cn('p-3 rounded-lg border shrink-0', s.iconBg)}>
            <span className="text-3xl">{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className={cn('text-2xl font-bold mb-2', s.title)}>{title}</h2>
            <p className={cn('text-sm leading-relaxed max-w-2xl', s.text)}>{intro}</p>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Badge
                key={chip.label}
                variant="outline"
                className={cn('text-xs', s.chip)}
              >
                {chip.icon && <span className="mr-1"><ThemedEmoji emoji={chip.icon} className="h-[1em] w-[1em]" /></span>}
                {chip.label}
              </Badge>
            ))}
          </div>
        )}

        {showProgress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={s.text}>{progressCompleted}/{progressTotal} modules complete</span>
              <span className={cn('font-medium', s.title)}>
                {Math.round((progressCompleted! / progressTotal!) * 100)}%
              </span>
            </div>
            <div className={cn('h-1.5 rounded-full overflow-hidden', s.progressTrack)}>
              <div
                className={cn('h-full rounded-full transition-all duration-500', s.progress)}
                style={{ width: `${(progressCompleted! / progressTotal!) * 100}%` }}
              />
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default MISectionHeader;
export type { MISectionHeaderProps };
