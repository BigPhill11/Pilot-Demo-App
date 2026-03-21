import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllModules } from '@/data/personal-finance/modules';
import BambooNode from './BambooNode';
import TestOutModal from './TestOutModal';
import { ModuleStatus } from '@/types/personal-finance';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface BambooSkillTreeProps {
  moduleProgress: Record<string, { status: ModuleStatus; completedLessons: string[]; testedOut: boolean }>;
  onModuleClick: (moduleId: string) => void;
  onTestOut: (moduleId: string, passed: boolean) => void;
}

const BambooSkillTree: React.FC<BambooSkillTreeProps> = ({
  moduleProgress,
  onModuleClick,
  onTestOut,
}) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showTestOut, setShowTestOut] = useState(false);
  const modules = getAllModules();
  const isMobile = useIsMobile();

  const getModuleStatus = (moduleId: string, index: number): ModuleStatus => {
    const progress = moduleProgress[moduleId];
    if (progress?.status) return progress.status;
    
    // First module is always unlocked
    if (index === 0) return 'unlocked';
    
    // Check if previous module is completed
    const prevModuleId = modules[index - 1]?.id;
    const prevProgress = moduleProgress[prevModuleId];
    if (prevProgress?.status === 'completed') return 'unlocked';
    
    return 'locked';
  };

  const handleNodeClick = (moduleId: string, status: ModuleStatus) => {
    if (status === 'locked') {
      setSelectedModule(moduleId);
      setShowTestOut(true);
    } else {
      onModuleClick(moduleId);
    }
  };

  const handleTestOutComplete = (passed: boolean) => {
    if (selectedModule) {
      onTestOut(selectedModule, passed);
    }
    setShowTestOut(false);
    setSelectedModule(null);
  };

  // Mobile layout - vertical stacked cards
  if (isMobile) {
    return (
      <div className="relative w-full px-2 py-6">
        {/* Vertical bamboo line on the left */}
        <div className="absolute left-6 top-8 bottom-8 w-1.5 bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-700 rounded-full" />
        
        {/* Module cards stacked vertically */}
        <div className="relative flex flex-col gap-4 pl-10">
          {modules.map((module, index) => {
            const status = getModuleStatus(module.id, index);
            const progress = moduleProgress[module.id];
            const completedLessons = progress?.completedLessons?.length || 0;
            const totalLessons = 5;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                className="relative"
              >
                {/* Horizontal connector to stalk */}
                <div 
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-4 h-0.5 -ml-4",
                    status === 'locked' ? 'bg-muted' : 
                    status === 'completed' ? 'bg-amber-500' : 'bg-emerald-500'
                  )}
                />
                
                {/* Node dot on the stalk */}
                <div 
                  className={cn(
                    "absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2",
                    status === 'locked' ? 'bg-muted border-muted-foreground/30' : 
                    status === 'completed' ? 'bg-amber-500 border-amber-400' : 'bg-emerald-500 border-emerald-400'
                  )}
                />

                <BambooNode
                  module={module}
                  status={status}
                  completedLessons={completedLessons}
                  totalLessons={totalLessons}
                  onClick={() => handleNodeClick(module.id, status)}
                  alternatePosition={false}
                  isMobile={true}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Test Out Modal */}
        <AnimatePresence>
          {showTestOut && selectedModule && (
            <TestOutModal
              moduleId={selectedModule}
              onClose={() => {
                setShowTestOut(false);
                setSelectedModule(null);
              }}
              onComplete={handleTestOutComplete}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop layout - alternating left/right
  return (
    <div className="relative w-full max-w-2xl mx-auto py-12 px-4">
      {/* Background bamboo stalk - centered */}
      <div className="absolute left-1/2 top-8 bottom-8 w-3 -translate-x-1/2">
        {/* Main stalk gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-800 rounded-full shadow-inner" />
        
        {/* Stalk highlight */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600/50 via-emerald-500/30 to-emerald-600/50 rounded-full" />
        
        {/* Bamboo segment joints */}
        {modules.map((_, idx) => (
          <div
            key={`joint-${idx}`}
            className="absolute left-1/2 -translate-x-1/2 w-5 h-2.5 rounded-full overflow-hidden"
            style={{ top: `${(idx + 0.5) * (100 / modules.length)}%` }}
          >
            <div className="absolute inset-0 bg-emerald-900/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Module nodes - leaves branching from stalk */}
      <div className="relative flex flex-col gap-6">
        {modules.map((module, index) => {
          const status = getModuleStatus(module.id, index);
          const progress = moduleProgress[module.id];
          const completedLessons = progress?.completedLessons?.length || 0;
          const totalLessons = 5;
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
              className={cn(
                "relative flex items-center",
                isLeft ? "justify-start" : "justify-end"
              )}
            >
              {/* Branch/stem connecting leaf to main stalk */}
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 h-1",
                  isLeft ? "right-1/2 left-4" : "left-1/2 right-4"
                )}
              >
                {/* Branch background */}
                <div 
                  className={cn(
                    "absolute inset-0 rounded-full",
                    status === 'locked' 
                      ? 'bg-muted/50' 
                      : status === 'completed'
                      ? 'bg-gradient-to-r from-amber-600/60 to-emerald-700/80'
                      : 'bg-gradient-to-r from-emerald-600/60 to-emerald-700/80'
                  )}
                  style={{
                    background: isLeft
                      ? status === 'locked'
                        ? 'linear-gradient(90deg, transparent 0%, hsl(var(--muted) / 0.5) 100%)'
                        : status === 'completed'
                        ? 'linear-gradient(90deg, hsl(45 93% 47% / 0.4) 0%, hsl(152 76% 30%) 100%)'
                        : 'linear-gradient(90deg, hsl(152 76% 36% / 0.4) 0%, hsl(152 76% 30%) 100%)'
                      : status === 'locked'
                        ? 'linear-gradient(270deg, transparent 0%, hsl(var(--muted) / 0.5) 100%)'
                        : status === 'completed'
                        ? 'linear-gradient(270deg, hsl(45 93% 47% / 0.4) 0%, hsl(152 76% 30%) 100%)'
                        : 'linear-gradient(270deg, hsl(152 76% 36% / 0.4) 0%, hsl(152 76% 30%) 100%)'
                  }}
                />
              </div>

              {/* Small decorative leaves near the stalk */}
              {status !== 'locked' && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-4 h-6",
                      isLeft ? "right-[48%]" : "left-[48%]"
                    )}
                  >
                    <div 
                      className={cn(
                        "absolute inset-0 rounded-full",
                        status === 'completed' 
                          ? 'bg-gradient-to-br from-amber-400/60 to-amber-600/40'
                          : 'bg-gradient-to-br from-emerald-400/60 to-emerald-600/40'
                      )}
                      style={{
                        transform: isLeft ? 'rotate(-30deg) scaleX(0.4)' : 'rotate(30deg) scaleX(0.4)',
                      }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4, type: 'spring', stiffness: 200 }}
                    className={cn(
                      "absolute top-1/2 w-3 h-5",
                      isLeft ? "right-[46%] -translate-y-[80%]" : "left-[46%] -translate-y-[80%]"
                    )}
                  >
                    <div 
                      className={cn(
                        "absolute inset-0 rounded-full",
                        status === 'completed' 
                          ? 'bg-gradient-to-br from-amber-300/50 to-amber-500/30'
                          : 'bg-gradient-to-br from-emerald-300/50 to-emerald-500/30'
                      )}
                      style={{
                        transform: isLeft ? 'rotate(-50deg) scaleX(0.35)' : 'rotate(50deg) scaleX(0.35)',
                      }}
                    />
                  </motion.div>
                </>
              )}

              {/* The main leaf node */}
              <div className={cn(isLeft ? "mr-auto ml-0" : "ml-auto mr-0")}>
                <BambooNode
                  module={module}
                  status={status}
                  completedLessons={completedLessons}
                  totalLessons={totalLessons}
                  onClick={() => handleNodeClick(module.id, status)}
                  alternatePosition={!isLeft}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Ground/pot decoration */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-8">
        <div className="absolute inset-x-4 bottom-0 h-6 bg-gradient-to-t from-amber-900/50 via-amber-800/30 to-transparent rounded-t-full blur-sm" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-4 bg-gradient-to-t from-amber-950/60 to-transparent rounded-full" />
      </div>

      {/* Test Out Modal */}
      <AnimatePresence>
        {showTestOut && selectedModule && (
          <TestOutModal
            moduleId={selectedModule}
            onClose={() => {
              setShowTestOut(false);
              setSelectedModule(null);
            }}
            onComplete={handleTestOutComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BambooSkillTree;
