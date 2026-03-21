import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Lock, CheckCircle2, PlayCircle, Gamepad2, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalFinanceModule, ModuleProgress } from '@/types/personal-finance';
import { cn } from '@/lib/utils';
import { getBossGameForModule } from '@/data/personal-finance/boss-games';

interface ModuleLessonsViewProps {
  module: PersonalFinanceModule;
  progress?: ModuleProgress;
  onLessonClick: (lessonIndex: number) => void;
  onBack: () => void;
  onBossGameClick?: () => void;
}

const ModuleLessonsView: React.FC<ModuleLessonsViewProps> = ({
  module,
  progress,
  onLessonClick,
  onBack,
  onBossGameClick,
}) => {
  const completedLessons = progress?.completedLessons || [];
  const allLessonsCompleted = completedLessons.length === module.lessons.length;
  const bossGameCompleted = progress?.bossGameCompleted || false;
  const bossGamePlayCount = progress?.bossGamePlayCount || 0;
  
  // Get the boss game info for this module
  const bossGameInfo = getBossGameForModule(module.id);

  const getLessonStatus = (lessonId: string, index: number) => {
    if (completedLessons.includes(lessonId)) return 'completed';
    const previousLessonId = index > 0 ? module.lessons[index - 1]?.id : null;
    if (index === 0 || (previousLessonId && completedLessons.includes(previousLessonId))) {
      return 'unlocked';
    }
    return 'locked';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto px-4 sm:px-0"
    >
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 h-10 px-3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Modules
        </Button>

        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{module.icon}</div>
          <div>
            <h1 className="text-2xl font-bold">{module.name}</h1>
            <p className="text-muted-foreground text-sm">{module.pillar} • {module.level}</p>
          </div>
        </div>

        <p className="text-muted-foreground">{module.description}</p>

        {/* Progress indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="text-primary font-medium">
            {completedLessons.length}/{module.lessons.length} lessons completed
          </span>
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        {module.lessons.map((lesson, index) => {
          const status = getLessonStatus(lesson.id, index);
          const isLocked = status === 'locked';
          const isCompleted = status === 'completed';

          return (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !isLocked && onLessonClick(index)}
              disabled={isLocked}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all min-h-[72px]",
                "active:scale-[0.99] touch-manipulation",
                isLocked && "opacity-50 cursor-not-allowed bg-muted/30 border-border",
                isCompleted && "bg-primary/5 border-primary/20 hover:bg-primary/10",
                !isLocked && !isCompleted && "bg-card border-border hover:border-primary/50 hover:shadow-md"
              )}
            >
              <div className="flex items-center gap-4">
                {/* Status icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  isLocked && "bg-muted text-muted-foreground",
                  isCompleted && "bg-primary text-primary-foreground",
                  !isLocked && !isCompleted && "bg-primary/10 text-primary"
                )}>
                  {isLocked && <Lock className="w-4 h-4" />}
                  {isCompleted && <CheckCircle2 className="w-5 h-5" />}
                  {!isLocked && !isCompleted && <PlayCircle className="w-5 h-5" />}
                </div>

                {/* Lesson info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      Lesson {index + 1}
                    </span>
                  </div>
                  <h3 className={cn(
                    "font-medium truncate",
                    isLocked && "text-muted-foreground"
                  )}>
                    {lesson.title}
                  </h3>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground flex-shrink-0">
                  <Clock className="w-4 h-4" />
                  {lesson.estimatedMinutes} min
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Boss Game Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: module.lessons.length * 0.1 + 0.1 }}
        className="mt-6"
      >
        <button
          onClick={() => onBossGameClick?.()}
          disabled={!allLessonsCompleted || !onBossGameClick}
          className={cn(
            "w-full text-left p-5 rounded-xl border-2 transition-all relative overflow-hidden",
            !allLessonsCompleted && "opacity-50 cursor-not-allowed bg-muted/30 border-border",
            allLessonsCompleted && !bossGameCompleted && "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/50 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20",
            bossGameCompleted && "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/50 hover:border-green-500"
          )}
        >
          {/* Decorative background */}
          {allLessonsCompleted && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
          )}
          
          <div className="flex items-center gap-4 relative z-10">
            {/* Icon */}
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
              !allLessonsCompleted && "bg-muted text-muted-foreground",
              allLessonsCompleted && !bossGameCompleted && "bg-gradient-to-br from-amber-500 to-orange-500 text-white",
              bossGameCompleted && "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
            )}>
              {!allLessonsCompleted && <Lock className="w-5 h-5" />}
              {allLessonsCompleted && !bossGameCompleted && <Gamepad2 className="w-6 h-6" />}
              {bossGameCompleted && <Trophy className="w-6 h-6" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs font-bold uppercase tracking-wide",
                  !allLessonsCompleted && "text-muted-foreground",
                  allLessonsCompleted && "text-amber-500"
                )}>
                  Boss Game
                </span>
                {bossGameCompleted && (
                  <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                )}
              </div>
              <h3 className={cn(
                "font-bold text-lg",
                !allLessonsCompleted && "text-muted-foreground"
              )}>
                {bossGameInfo?.emoji || '🎮'} {bossGameInfo?.title || 'Boss Game'}
              </h3>
              <p className={cn(
                "text-sm mt-1",
                !allLessonsCompleted ? "text-muted-foreground" : "text-foreground/70"
              )}>
                {!allLessonsCompleted 
                  ? `Complete all ${module.lessons.length} lessons to unlock`
                  : bossGameInfo?.description || 'Interactive story simulator • Branching decisions'}
              </p>
            </div>

            {/* Play count / Replay */}
            {allLessonsCompleted && (
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                {bossGamePlayCount > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <RotateCcw className="w-3 h-3" />
                    Played {bossGamePlayCount}x
                  </div>
                )}
                <span className={cn(
                  "text-sm font-medium",
                  bossGameCompleted ? "text-green-500" : "text-amber-500"
                )}>
                  {bossGameCompleted ? "Play Again →" : "Play Now →"}
                </span>
              </div>
            )}
          </div>
        </button>
      </motion.div>

      {/* Module rewards preview */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20">
        <h3 className="font-medium mb-2">Complete all lessons to earn:</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="font-bold text-primary">{module.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪙</span>
            <span className="font-bold text-amber-500">{module.coinReward} coins</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleLessonsView;
