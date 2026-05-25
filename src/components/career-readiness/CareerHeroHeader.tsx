import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import { useAuth } from '@/hooks/useAuth';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { useIsMobile } from '@/hooks/use-mobile';

const CareerHeroHeader: React.FC = () => {
  const { profile } = useAuth();
  const { currentStreak } = useUnifiedStreak();
  const isMobile = useIsMobile();

  const greeting = profile?.display_name
    ? `Welcome back, ${profile.display_name.split(' ')[0]}!`
    : 'Welcome back!';

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-5"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl" />

      <div className={`relative flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between gap-6'}`}>
        <div className={`flex items-center gap-4 ${isMobile ? 'flex-col text-center' : ''}`}>
          <PandaLogo className={isMobile ? 'h-16 w-16' : 'h-20 w-20'} />
          <div className={isMobile ? 'text-center' : ''}>
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              Phil&apos;s Career Ready
            </p>
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground leading-tight`}>
              {greeting} Let&apos;s build your future.
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Explore modules designed to help you show up, stand out, and succeed in any professional setting.
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-3 rounded-2xl bg-emerald-800 text-white px-4 py-3 shadow-md ${
            isMobile ? 'w-full justify-center' : 'shrink-0'
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700/80">
            <Star className="h-5 w-5 fill-amber-300 text-amber-300" />
          </div>
          <div>
            <p className="text-xs text-emerald-100">Keep your streak going!</p>
            <p className="font-bold flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-orange-300" />
              {currentStreak} Day Streak
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerHeroHeader;
