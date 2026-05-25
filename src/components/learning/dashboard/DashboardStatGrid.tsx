import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, Flame, Zap, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface DashboardStatGridProps {
  lessonsCompleted: number;
  overallProgress: number;
  currentStreak: number;
  nextMilestone: number;
  streakLevel: { color: string; bg: string };
  xp: number;
}

const statConfig = [
  {
    key: 'lessons',
    icon: Brain,
    label: 'Lessons Completed',
    iconClass: 'text-emerald-500',
    cardClass: 'from-emerald-500/10 to-primary/5 border-emerald-500/20',
  },
  {
    key: 'progress',
    icon: Trophy,
    label: 'Overall Progress',
    iconClass: 'text-primary',
    cardClass: 'from-primary/10 to-emerald-500/5 border-primary/20',
    suffix: '%',
  },
  {
    key: 'streak',
    icon: Flame,
    label: 'Day Streak',
    iconClass: '',
    cardClass: 'border-orange-200/60',
    isStreak: true,
  },
  {
    key: 'xp',
    icon: Zap,
    label: 'Total XP',
    iconClass: 'text-amber-500',
    cardClass: 'from-amber-500/10 to-yellow-500/5 border-amber-400/30',
  },
] as const;

const DashboardStatGrid: React.FC<DashboardStatGridProps> = ({
  lessonsCompleted,
  overallProgress,
  currentStreak,
  nextMilestone,
  streakLevel,
  xp,
}) => {
  const isMobile = useIsMobile();

  const values: Record<string, string | number> = {
    lessons: lessonsCompleted,
    progress: overallProgress,
    streak: currentStreak,
    xp,
  };

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-3`}>
      {statConfig.map((stat, index) => {
        const Icon = stat.icon;
        const isStreak = 'isStreak' in stat && stat.isStreak;

        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            className={cn(
              'relative overflow-hidden rounded-xl border p-4 text-center bg-gradient-to-br',
              isStreak ? streakLevel.bg : stat.cardClass
            )}
          >
            <Icon className={cn('h-7 w-7 mx-auto mb-2', isStreak ? streakLevel.color : stat.iconClass)} />
            <div className={cn('text-2xl font-bold', isStreak ? streakLevel.color : 'text-foreground')}>
              {values[stat.key]}
              {'suffix' in stat ? stat.suffix : ''}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            {isStreak && currentStreak > 0 && (
              <p className="text-[10px] text-muted-foreground mt-1">→ {nextMilestone} days</p>
            )}
            {stat.key === 'xp' && (
              <Sparkles className="absolute top-2 right-2 h-3 w-3 text-amber-400/50" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardStatGrid;
