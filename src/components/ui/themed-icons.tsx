/**
 * Themed stat icons — the app's visual language for currencies and stats.
 *
 * Bamboo is always an emerald Leaf, XP is always a purple Sparkles (matching
 * the GameProgressBadge pill). Never use emojis for these; use these
 * components so every surface renders the same iconography.
 *
 * ThemedEmoji maps emoji strings coming from data files (goal.icon etc.)
 * onto the same lucide icon set so data can stay as-is.
 */

import React from 'react';
import {
  Award,
  BookOpen,
  Brain,
  Building2,
  CheckCircle2,
  Clock,
  Coins,
  Flame,
  Gamepad2,
  Gem,
  Heart,
  Home,
  Landmark,
  Layers,
  Leaf,
  Lightbulb,
  LineChart,
  Lock,
  Medal,
  PartyPopper,
  PawPrint,
  PiggyBank,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Sprout,
  Star,
  Target,
  TreePine,
  TrendingDown,
  TrendingUp,
  Trophy,
  Wallet,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/** Bamboo / bamboo coins — emerald leaf, always */
export const BambooIcon: React.FC<IconProps> = ({ className }) => (
  <Leaf className={cn('inline-block h-4 w-4 shrink-0 text-emerald-500', className)} aria-label="Bamboo" />
);

/** XP — purple sparkles, always */
export const XpIcon: React.FC<IconProps> = ({ className }) => (
  <Sparkles className={cn('inline-block h-4 w-4 shrink-0 text-purple-500', className)} aria-label="XP" />
);

/** Streak — orange flame */
export const StreakIcon: React.FC<IconProps> = ({ className }) => (
  <Flame className={cn('inline-block h-4 w-4 shrink-0 text-orange-500', className)} aria-label="Streak" />
);

/** Achievement — amber trophy */
export const TrophyIcon: React.FC<IconProps> = ({ className }) => (
  <Trophy className={cn('inline-block h-4 w-4 shrink-0 text-amber-500', className)} aria-label="Trophy" />
);

/** Phil / panda mascot mark */
export const PandaIcon: React.FC<IconProps> = ({ className }) => (
  <PawPrint className={cn('inline-block h-4 w-4 shrink-0 text-foreground/70', className)} aria-label="Phil" />
);

/**
 * Compact bamboo + XP pill, identical language to GameProgressBadge compact:
 * emerald leaf and purple sparkles on a soft two-tone gradient.
 */
export const StatPill: React.FC<{ bamboo?: number; xp?: number; className?: string }> = ({
  bamboo,
  xp,
  className,
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-3 px-3 py-1 rounded-full',
      'bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20',
      className
    )}
  >
    {bamboo !== undefined && (
      <span className="inline-flex items-center gap-1 font-semibold text-sm">
        <BambooIcon />
        {Math.floor(bamboo).toLocaleString()}
      </span>
    )}
    {xp !== undefined && (
      <span className="inline-flex items-center gap-1 font-semibold text-sm">
        <XpIcon />
        {Math.floor(xp).toLocaleString()}
      </span>
    )}
  </span>
);

/** Emoji string → themed icon component + color */
const EMOJI_MAP: Record<string, { Icon: React.ElementType; className: string; label: string }> = {
  '🎋': { Icon: Leaf, className: 'text-emerald-500', label: 'Bamboo' },
  '🌱': { Icon: Sprout, className: 'text-emerald-500', label: 'Sprout' },
  '🍃': { Icon: Leaf, className: 'text-emerald-500', label: 'Leaf' },
  '🌿': { Icon: Leaf, className: 'text-emerald-600', label: 'Leaf' },
  '🌳': { Icon: TreePine, className: 'text-emerald-600', label: 'Tree' },
  '🪙': { Icon: Leaf, className: 'text-emerald-500', label: 'Bamboo Coins' },
  '💰': { Icon: Coins, className: 'text-amber-500', label: 'Money' },
  '💎': { Icon: Gem, className: 'text-sky-500', label: 'Gem' },
  '🏦': { Icon: Landmark, className: 'text-slate-500', label: 'Bank' },
  '🐷': { Icon: PiggyBank, className: 'text-pink-500', label: 'Savings' },
  '👛': { Icon: Wallet, className: 'text-amber-600', label: 'Wallet' },
  '⭐': { Icon: Star, className: 'text-amber-400', label: 'Star' },
  '🌟': { Icon: Star, className: 'text-amber-400', label: 'Star' },
  '✨': { Icon: Sparkles, className: 'text-purple-500', label: 'XP' },
  '💫': { Icon: Sparkles, className: 'text-purple-400', label: 'Sparkle' },
  '🔥': { Icon: Flame, className: 'text-orange-500', label: 'Streak' },
  '🏆': { Icon: Trophy, className: 'text-amber-500', label: 'Trophy' },
  '🥇': { Icon: Medal, className: 'text-amber-500', label: 'Gold' },
  '🎖️': { Icon: Award, className: 'text-amber-500', label: 'Award' },
  '🐼': { Icon: PawPrint, className: 'text-foreground/70', label: 'Phil' },
  '🎯': { Icon: Target, className: 'text-rose-500', label: 'Target' },
  '🎮': { Icon: Gamepad2, className: 'text-indigo-500', label: 'Game' },
  '🃏': { Icon: Layers, className: 'text-indigo-500', label: 'Cards' },
  '📈': { Icon: TrendingUp, className: 'text-emerald-500', label: 'Up' },
  '📉': { Icon: TrendingDown, className: 'text-red-500', label: 'Down' },
  '📊': { Icon: LineChart, className: 'text-sky-500', label: 'Chart' },
  '🔍': { Icon: Search, className: 'text-slate-500', label: 'Search' },
  '💡': { Icon: Lightbulb, className: 'text-amber-400', label: 'Idea' },
  '📚': { Icon: BookOpen, className: 'text-sky-600', label: 'Learn' },
  '📖': { Icon: BookOpen, className: 'text-sky-600', label: 'Learn' },
  '⚡': { Icon: Zap, className: 'text-amber-400', label: 'Energy' },
  '🚀': { Icon: Rocket, className: 'text-indigo-500', label: 'Rocket' },
  '🧠': { Icon: Brain, className: 'text-purple-500', label: 'Brain' },
  '❤️': { Icon: Heart, className: 'text-rose-500', label: 'Heart' },
  '🏠': { Icon: Home, className: 'text-slate-500', label: 'Home' },
  '🏢': { Icon: Building2, className: 'text-slate-500', label: 'Company' },
  '🛡️': { Icon: Shield, className: 'text-sky-600', label: 'Shield' },
  '⏰': { Icon: Clock, className: 'text-slate-500', label: 'Time' },
  '⏱️': { Icon: Clock, className: 'text-slate-500', label: 'Time' },
  '🎉': { Icon: PartyPopper, className: 'text-rose-500', label: 'Celebrate' },
  '🎊': { Icon: PartyPopper, className: 'text-rose-500', label: 'Celebrate' },
  '✅': { Icon: CheckCircle2, className: 'text-emerald-500', label: 'Done' },
  '🔒': { Icon: Lock, className: 'text-slate-400', label: 'Locked' },
};

/**
 * Renders a data-driven emoji string (e.g. goal.icon) as a themed lucide
 * icon. Unknown emojis fall back to the raw text so nothing breaks.
 */
export const ThemedEmoji: React.FC<{ emoji: string; className?: string }> = ({ emoji, className }) => {
  const entry = EMOJI_MAP[emoji.trim()];
  if (!entry) return <span className={className}>{emoji}</span>;
  const { Icon, className: color, label } = entry;
  return <Icon className={cn('inline-block h-5 w-5 shrink-0', color, className)} aria-label={label} />;
};
