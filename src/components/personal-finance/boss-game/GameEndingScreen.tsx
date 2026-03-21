import { GameEnding, GameMeters } from '@/types/boss-game';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RotateCcw, Home } from 'lucide-react';

interface GameEndingScreenProps {
  ending: GameEnding;
  meters: GameMeters;
  onReplay: () => void;
  onExit: () => void;
  playerName: string;
}

const trajectoryEmojis = {
  momentum: '🚀',
  growing: '📈',
  balanced: '⚖️',
  stuck: '🧱',
  burnout: '😴',
};

const trajectoryColors = {
  momentum: 'from-emerald-500/30 to-teal-500/20 border-emerald-500/40',
  growing: 'from-blue-500/30 to-cyan-500/20 border-blue-500/40',
  balanced: 'from-amber-500/30 to-yellow-500/20 border-amber-500/40',
  stuck: 'from-gray-500/30 to-slate-500/20 border-gray-500/40',
  burnout: 'from-red-500/30 to-orange-500/20 border-red-500/40',
};

export function GameEndingScreen({ ending, meters, onReplay, onExit, playerName }: GameEndingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[70vh] flex flex-col items-center justify-center p-4 sm:p-6"
    >
      {/* Sunset scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">🌅</div>
        <p className="text-sm text-muted-foreground italic max-w-md">
          The panda sits outside Bamboo City at sunset...
        </p>
      </motion.div>
      
      {/* Ending card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={cn(
          "max-w-lg w-full rounded-2xl border p-6 bg-gradient-to-br text-center",
          trajectoryColors[ending.trajectory]
        )}
      >
        <div className="text-5xl mb-4">{trajectoryEmojis[ending.trajectory]}</div>
        <h2 className="text-2xl font-bold mb-2">{ending.title}</h2>
        <p className="text-muted-foreground mb-6">{ending.description}</p>
        
        <div className="bg-background/50 rounded-xl p-4 mb-6 border border-border/30">
          <p className="text-sm leading-relaxed">{ending.futureSnapshot}</p>
        </div>
        
        {/* Final meters */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          <div className="text-center">
            <div className="text-xl mb-1">🪙</div>
            <div className="text-xs text-muted-foreground">Income</div>
            <div className="font-mono text-sm">{meters.income}</div>
          </div>
          <div className="text-center">
            <div className="text-xl mb-1">⏱️</div>
            <div className="text-xs text-muted-foreground">Value</div>
            <div className="font-mono text-sm">{meters.hourlyValue}</div>
          </div>
          <div className="text-center">
            <div className="text-xl mb-1">⚡</div>
            <div className="text-xs text-muted-foreground">Energy</div>
            <div className="font-mono text-sm">{meters.energy}</div>
          </div>
          <div className="text-center">
            <div className="text-xl mb-1">🔄</div>
            <div className="text-xs text-muted-foreground">Replace</div>
            <div className="font-mono text-sm">{meters.replaceability}</div>
          </div>
          <div className="text-center">
            <div className="text-xl mb-1">🚪</div>
            <div className="text-xs text-muted-foreground">Options</div>
            <div className="font-mono text-sm">{meters.optionality}</div>
          </div>
        </div>
      </motion.div>
      
      {/* Final wisdom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-center max-w-md"
      >
        <p className="text-muted-foreground text-sm italic leading-relaxed">
          "Money follows how you work, not how hard you try.
          <br />
          Momentum follows how you choose."
        </p>
      </motion.div>
      
      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-xs"
      >
        <Button variant="outline" onClick={onExit} className="gap-2 h-12 flex-1">
          <Home className="w-4 h-4" />
          Exit
        </Button>
        <Button onClick={onReplay} className="gap-2 h-12 flex-1">
          <RotateCcw className="w-4 h-4" />
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  );
}
