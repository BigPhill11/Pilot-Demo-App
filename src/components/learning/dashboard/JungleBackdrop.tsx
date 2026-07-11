import React from 'react';
import { cn } from '@/lib/utils';
import { ThemedEmoji } from '@/components/ui/themed-icons';

interface JungleBackdropProps {
  className?: string;
}

/** Decorative bamboo forest background for dashboard sections */
const JungleBackdrop: React.FC<JungleBackdropProps> = ({ className }) => (
  <div className={cn('absolute inset-0 overflow-hidden pointer-events-none -z-10', className)}>
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/80 via-primary/5 to-amber-50/30" />
    <div className="absolute top-0 left-3 w-1.5 h-48 bg-gradient-to-b from-emerald-400/25 to-emerald-600/10 rounded-full" />
    <div className="absolute top-8 left-7 w-1 h-36 bg-gradient-to-b from-emerald-300/20 to-emerald-500/10 rounded-full" />
    <div className="absolute top-0 right-4 w-1.5 h-44 bg-gradient-to-b from-emerald-400/25 to-emerald-600/10 rounded-full" />
    <div className="absolute top-12 right-9 w-1 h-32 bg-gradient-to-b from-emerald-300/15 to-emerald-500/10 rounded-full" />
    <div className="absolute bottom-16 left-6 text-emerald-200/40 text-lg">🐾</div>
    <div className="absolute bottom-32 right-6 text-emerald-200/35 text-lg rotate-45">🐾</div>
    <div className="absolute top-24 right-1/4 text-2xl opacity-20"><ThemedEmoji emoji="🎋" className="h-[1em] w-[1em]" /></div>
    <div className="absolute bottom-24 left-1/4 text-xl opacity-15"><ThemedEmoji emoji="🌿" className="h-[1em] w-[1em]" /></div>
  </div>
);

export default JungleBackdrop;
