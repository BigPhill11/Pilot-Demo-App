import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface PowerMoveProps {
  powerMove: string;
  realLifeAction: string;
  onComplete: () => void;
}

const PowerMove: React.FC<PowerMoveProps> = ({ powerMove, realLifeAction, onComplete }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleComplete = () => {
    // Trigger confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#f59e0b', '#3b82f6', '#a855f7'],
    });
    
    setAcknowledged(true);
    
    // Auto-continue after brief celebration
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-primary">
        <Zap className="w-5 h-5" />
        <h2 className="font-semibold">Power Move</h2>
      </div>

      {/* Power Move - Main takeaway */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/30 rounded-xl p-6"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative">
          <span className="text-4xl mb-4 block">💪</span>
          <p className="text-xl font-semibold leading-relaxed text-foreground">
            {powerMove}
          </p>
        </div>
      </motion.div>

      {/* Real-Life Action */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-card border rounded-xl p-5"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="font-medium mb-1">This Week's Challenge</h3>
            <p className="text-sm text-muted-foreground">{realLifeAction}</p>
          </div>
        </div>
      </motion.div>

      {/* Phil's encouragement */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-start gap-3 bg-muted/30 rounded-lg p-4"
      >
        <span className="text-2xl">🐼</span>
        <p className="text-sm text-muted-foreground italic">
          "Knowledge without action is just entertainment. Take what you learned today and use it this week."
        </p>
      </motion.div>

      {/* Complete button */}
      {!acknowledged ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            onClick={handleComplete} 
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            I'm Ready to Apply This!
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-center gap-2 py-4 text-emerald-500"
        >
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Lesson Complete!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PowerMove;
