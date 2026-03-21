import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { ModuleStatus } from '@/types/personal-finance';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface BambooNodeProps {
  module: {
    id: string;
    name: string;
    icon: string;
    description: string;
    level: string;
  };
  status: ModuleStatus;
  completedLessons: number;
  totalLessons: number;
  onClick: () => void;
  alternatePosition: boolean;
  isMobile?: boolean;
}

const BambooNode: React.FC<BambooNodeProps> = ({
  module,
  status,
  completedLessons,
  totalLessons,
  onClick,
  alternatePosition,
  isMobile = false,
}) => {
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const statusConfig = {
    locked: {
      leafBg: 'bg-muted/60',
      leafBorder: 'border-muted/80',
      text: 'text-muted-foreground',
      iconBg: 'bg-muted/40',
      icon: <Lock className="w-3 h-3" />,
    },
    unlocked: {
      leafBg: 'bg-gradient-to-br from-emerald-500/20 via-emerald-400/15 to-emerald-600/10',
      leafBorder: 'border-emerald-500/40',
      text: 'text-foreground',
      iconBg: 'bg-emerald-500/20',
      icon: <ChevronRight className="w-3 h-3 text-emerald-500" />,
    },
    active: {
      leafBg: 'bg-gradient-to-br from-emerald-400/30 via-emerald-500/20 to-emerald-600/15',
      leafBorder: 'border-emerald-400/60',
      text: 'text-foreground',
      iconBg: 'bg-emerald-400/30',
      icon: <ChevronRight className="w-3 h-3 text-emerald-400" />,
    },
    completed: {
      leafBg: 'bg-gradient-to-br from-amber-400/20 via-amber-500/15 to-amber-600/10',
      leafBorder: 'border-amber-400/50',
      text: 'text-foreground',
      iconBg: 'bg-amber-400/20',
      icon: <Check className="w-3 h-3 text-amber-400" />,
    },
  };

  const config = statusConfig[status];

  // Mobile-optimized card layout
  if (isMobile) {
    return (
      <motion.button
        onClick={onClick}
        whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
        className={cn(
          "relative w-full touch-manipulation",
          status === 'locked' ? 'cursor-pointer' : 'cursor-pointer'
        )}
      >
        <div
          className={cn(
            "relative w-full p-4 transition-all duration-300 rounded-xl",
            config.leafBg,
            "border",
            config.leafBorder,
            status === 'locked' && 'opacity-60',
            status !== 'locked' && 'shadow-md',
            status === 'active' && 'shadow-emerald-500/20 ring-1 ring-emerald-400/30',
            status === 'completed' && 'shadow-amber-500/20'
          )}
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={cn(
                "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                config.iconBg
              )}
            >
              {module.icon}
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2">
                <h3 className={cn("font-semibold text-base", config.text)}>
                  {module.name}
                </h3>
                {config.icon}
              </div>
              
              {/* Progress for non-locked */}
              {status !== 'locked' && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">
                      {completedLessons}/{totalLessons} lessons
                    </span>
                    {status === 'completed' && (
                      <span className="text-amber-400 font-medium">✓ Complete</span>
                    )}
                  </div>
                  <Progress 
                    value={progressPercent} 
                    className={cn(
                      "h-2",
                      status === 'completed' ? '[&>div]:bg-amber-400' : '[&>div]:bg-emerald-500'
                    )}
                  />
                </div>
              )}

              {/* Locked hint */}
              {status === 'locked' && (
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Tap to test out
                </p>
              )}
            </div>

            {/* Level badge */}
            <div className={cn(
              "flex-shrink-0 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
              status === 'locked' ? 'bg-muted/80 text-muted-foreground' : 'bg-emerald-600/90 text-white',
              status === 'completed' && 'bg-amber-500/90'
            )}>
              {module.level.charAt(0)}
            </div>
          </div>
        </div>
      </motion.button>
    );
  }

  // Desktop leaf-shaped layout
  return (
    <motion.button
      onClick={onClick}
      whileHover={status !== 'locked' ? { scale: 1.03, y: -2 } : { scale: 1.01 }}
      whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
      className={cn(
        "relative group",
        status === 'locked' ? 'cursor-pointer' : 'cursor-pointer'
      )}
    >
      {/* Leaf shape container */}
      <div
        className={cn(
          "relative w-52 p-4 transition-all duration-300",
          config.leafBg,
          "border",
          config.leafBorder,
          status === 'locked' && 'grayscale-[60%] hover:grayscale-[30%]',
          status !== 'locked' && 'shadow-lg',
          status === 'active' && 'shadow-emerald-500/20 ring-1 ring-emerald-400/30',
          status === 'completed' && 'shadow-amber-500/20',
          // Leaf shape with pointed ends
          alternatePosition 
            ? 'rounded-l-full rounded-r-[2rem] pl-6 pr-4' 
            : 'rounded-r-full rounded-l-[2rem] pr-6 pl-4'
        )}
        style={{
          clipPath: alternatePosition
            ? 'polygon(15% 0%, 100% 0%, 100% 50%, 100% 100%, 15% 100%, 0% 50%)'
            : 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 0% 50%)',
        }}
      >
        {/* Leaf vein decoration */}
        <div 
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-[1px] opacity-20",
            status === 'locked' ? 'bg-muted-foreground' : 'bg-emerald-600',
            status === 'completed' && 'bg-amber-500',
            alternatePosition ? 'left-4 right-8' : 'left-8 right-4'
          )}
        />
        
        {/* Module content */}
        <div className={cn("flex items-center gap-3", alternatePosition && "flex-row-reverse")}>
          {/* Icon */}
          <div
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl",
              config.iconBg
            )}
          >
            {module.icon}
          </div>

          {/* Text content */}
          <div className={cn("flex-1 min-w-0", alternatePosition ? "text-right" : "text-left")}>
            <div className={cn("flex items-center gap-1.5", alternatePosition && "flex-row-reverse")}>
              <h3 className={cn("font-semibold text-sm truncate", config.text)}>
                {module.name}
              </h3>
              {config.icon}
            </div>
            
            {/* Progress for non-locked */}
            {status !== 'locked' && (
              <div className="mt-1.5">
                <div className={cn("flex items-center justify-between text-[10px] mb-1", alternatePosition && "flex-row-reverse")}>
                  <span className="text-muted-foreground">
                    {completedLessons}/{totalLessons}
                  </span>
                  {status === 'completed' && (
                    <span className="text-amber-400 font-medium">✓</span>
                  )}
                </div>
                <Progress 
                  value={progressPercent} 
                  className={cn(
                    "h-1",
                    status === 'completed' ? '[&>div]:bg-amber-400' : '[&>div]:bg-emerald-500'
                  )}
                />
              </div>
            )}

            {/* Locked hint */}
            {status === 'locked' && (
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                Tap to test out
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Level badge on stem side */}
      <div className={cn(
        "absolute top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
        status === 'locked' ? 'bg-muted/80 text-muted-foreground' : 'bg-emerald-600/90 text-white',
        status === 'completed' && 'bg-amber-500/90',
        alternatePosition ? '-left-1' : '-right-1'
      )}>
        {module.level.charAt(0)}
      </div>

      {/* Glow effect for active/completed */}
      {(status === 'active' || status === 'completed') && (
        <div 
          className={cn(
            "absolute inset-0 rounded-full blur-xl opacity-30 -z-10",
            status === 'active' && 'bg-emerald-500',
            status === 'completed' && 'bg-amber-500'
          )}
        />
      )}
    </motion.button>
  );
};

export default BambooNode;
