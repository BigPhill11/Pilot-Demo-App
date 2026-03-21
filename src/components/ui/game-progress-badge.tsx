/**
 * GameProgressBadge - Compact display of Bamboo Empire game progress
 * 
 * Replaces the old LevelProgress component with game-based progress.
 * Reads from useGameStore and displays bamboo, XP, and energy.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sparkles, Zap } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface GameProgressBadgeProps {
  /** Whether to show the full version with all stats or compact version */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const GameProgressBadge: React.FC<GameProgressBadgeProps> = ({ 
  compact = false,
  className 
}) => {
  const bamboo = useGameStore(state => state.bamboo);
  const xp = useGameStore(state => state.xp);
  const energy = useGameStore(state => state.energy);
  const initialized = useGameStore(state => state.initialized);
  const getStorageCapacity = useGameStore(state => state.getStorageCapacity);

  // Don't render if game not initialized
  if (!initialized) {
    return null;
  }

  const capacity = getStorageCapacity();
  const bambooPercent = capacity > 0 ? (bamboo / capacity) * 100 : 0;

  if (compact) {
    return (
      <Link 
        to="/empire" 
        className={cn(
          "flex items-center gap-3 px-3 py-1.5 rounded-lg",
          "bg-gradient-to-r from-emerald-500/10 to-purple-500/10",
          "hover:from-emerald-500/20 hover:to-purple-500/20",
          "border border-emerald-500/20 transition-all",
          className
        )}
      >
        {/* Bamboo */}
        <div className="flex items-center gap-1">
          <Leaf className="h-4 w-4 text-emerald-500" />
          <span className="font-medium text-sm">{Math.floor(bamboo)}</span>
        </div>
        
        {/* XP */}
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="font-medium text-sm">{Math.floor(xp)}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to="/empire" 
      className={cn(
        "flex items-center gap-4 px-4 py-2 rounded-xl",
        "bg-gradient-to-r from-emerald-900/30 via-slate-800/30 to-purple-900/30",
        "hover:from-emerald-900/40 hover:via-slate-800/40 hover:to-purple-900/40",
        "border border-emerald-500/20 transition-all group",
        className
      )}
    >
      {/* Bamboo with mini progress bar */}
      <div className="flex items-center gap-2">
        <Leaf className="h-5 w-5 text-emerald-400" />
        <div className="flex flex-col">
          <span className="font-bold text-emerald-100 text-sm leading-tight">
            {Math.floor(bamboo).toLocaleString()}
          </span>
          <Progress 
            value={bambooPercent} 
            className="h-1 w-12 bg-emerald-950"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-600" />

      {/* XP */}
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-4 w-4 text-purple-400" />
        <span className="font-semibold text-purple-100 text-sm">
          {Math.floor(xp).toLocaleString()} XP
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-600" />

      {/* Energy */}
      <div className="flex items-center gap-1.5">
        <Zap className={cn(
          "h-4 w-4",
          energy > 60 ? "text-amber-400" : energy > 30 ? "text-orange-400" : "text-red-400"
        )} />
        <span className={cn(
          "font-semibold text-sm",
          energy > 60 ? "text-amber-100" : energy > 30 ? "text-orange-100" : "text-red-100"
        )}>
          {Math.floor(energy)}%
        </span>
      </div>

      {/* Hover indicator */}
      <span className="text-xs text-slate-400 group-hover:text-slate-300 ml-1">
        →
      </span>
    </Link>
  );
};

export default GameProgressBadge;



