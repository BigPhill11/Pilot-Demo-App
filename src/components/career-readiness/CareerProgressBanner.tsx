import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PandaLogo from '@/components/icons/PandaLogo';

interface CareerProgressBannerProps {
  onViewProgress: () => void;
}

const CareerProgressBanner: React.FC<CareerProgressBannerProps> = ({ onViewProgress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100 p-5"
    >
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <PandaLogo className="h-16 w-16 shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-bold text-lg text-foreground">Track. Learn. Grow.</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Check your progress, revisit modules, and keep leveling up your future.
          </p>
          <Button
            className="mt-4 bg-emerald-800 hover:bg-emerald-900"
            onClick={onViewProgress}
          >
            View My Progress
          </Button>
        </div>
        <div className="hidden sm:flex items-end gap-1 h-16 shrink-0 opacity-80">
          {[40, 55, 45, 70, 60, 85].map((height, i) => (
            <div
              key={i}
              className="w-3 rounded-t bg-emerald-600"
              style={{ height: `${height}%` }}
            />
          ))}
          <BarChart3 className="h-5 w-5 text-emerald-700 ml-1 self-center" />
        </div>
      </div>
    </motion.div>
  );
};

export default CareerProgressBanner;
