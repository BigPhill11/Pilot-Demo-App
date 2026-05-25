import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import PandaLogo from '@/components/icons/PandaLogo';
import { useIsMobile } from '@/hooks/use-mobile';

interface JungleHeroHeaderProps {
  displayName?: string | null;
  appVersion?: string | null;
  streakMultiplier: number;
}

const JungleHeroHeader: React.FC<JungleHeroHeaderProps> = ({
  displayName,
  appVersion,
  streakMultiplier,
}) => {
  const isMobile = useIsMobile();
  const greeting = displayName ? `Hey ${displayName.split(' ')[0]}!` : 'Welcome back!';

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-emerald-500/10 to-amber-500/5 p-5"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl" />
      <div className={`flex items-center ${isMobile ? 'flex-col text-center gap-3' : 'justify-between'}`}>
        <div className="flex items-center gap-3">
          <PandaLogo className={isMobile ? 'h-10 w-10' : 'h-12 w-12'} />
          <div className={isMobile ? 'text-center' : 'text-left'}>
            <p className="text-xs font-medium text-primary uppercase tracking-wider">Phil&apos;s Jungle</p>
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground`}>
              {greeting}
            </h1>
            <p className="text-sm text-muted-foreground">Your learning trail awaits 🌿</p>
          </div>
        </div>
        <div className={`flex flex-wrap gap-2 ${isMobile ? 'justify-center' : ''}`}>
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
            {appVersion || 'Learner'}
          </Badge>
          {streakMultiplier > 1 && (
            <Badge className="bg-amber-500 hover:bg-amber-500 text-white border-0">
              {streakMultiplier.toFixed(1)}x Bamboo Boost
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JungleHeroHeader;
