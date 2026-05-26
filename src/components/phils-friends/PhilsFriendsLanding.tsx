import React from 'react';
import {
  Wallet,
  TrendingUp,
  Briefcase,
  Play,
  Users,
  ChevronRight,
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import { cn } from '@/lib/utils';
import {
  PHILS_FRIENDS_LANDING_CATEGORIES,
  type PhilsFriendsFeedCategory,
} from '@/types/phils-friends';
import { getMockReelCount } from '@/data/phils-friends/mock-reels';

const CATEGORY_META: Record<
  PhilsFriendsFeedCategory,
  {
    icon: React.ReactNode;
    tagline: string;
    description: string;
    previewImage: string;
    accent: string;
  }
> = {
  'personal-finance': {
    icon: <Wallet className="h-6 w-6" />,
    tagline: 'Money basics',
    description: 'Paychecks, credit, saving, and habits pros wish they knew at your age.',
    previewImage: '/market-intelligence/ownership/time-is-your-ally/hero.png',
    accent: 'from-emerald-500/20 to-green-100',
  },
  'market-intelligence': {
    icon: <TrendingUp className="h-6 w-6" />,
    tagline: 'Markets & companies',
    description: 'Headlines, stocks, and financial statements explained without jargon.',
    previewImage: '/market-intelligence/language-finance/balance-sheet-basics/hero.png',
    accent: 'from-teal-500/20 to-emerald-50',
  },
  'careers-in-finance': {
    icon: <Briefcase className="h-6 w-6" />,
    tagline: 'Jobs in finance',
    description: 'Hear what bankers, VCs, and traders actually do day to day.',
    previewImage: '/market-intelligence/ownership/own-a-piece/hero.png',
    accent: 'from-green-600/15 to-green-50',
  },
};

interface PhilsFriendsLandingProps {
  onSelectCategory: (category: PhilsFriendsFeedCategory) => void;
}

const PhilsFriendsLanding: React.FC<PhilsFriendsLandingProps> = ({ onSelectCategory }) => {
  return (
    <div className="min-h-[calc(100dvh-8rem)] pb-8">
      <div className="px-4 pt-6 pb-8 text-center max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-3 mb-4 ring-2 ring-green-200">
          <PandaLogo className="h-12 w-12" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold text-green-900">Phil&apos;s Friends</h1>
        </div>
        <p className="text-green-700/90 text-sm leading-relaxed max-w-md mx-auto">
          Real finance professionals explain their jobs in ~1 minute clips. Pick a topic to start
          watching.
        </p>
      </div>

      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {PHILS_FRIENDS_LANDING_CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat.id as PhilsFriendsFeedCategory];
          const clipCount = getMockReelCount(cat.id);

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id as PhilsFriendsFeedCategory)}
              className={cn(
                'group text-left rounded-2xl overflow-hidden bg-white shadow-md ring-1 ring-green-200/80',
                'transition-all hover:shadow-lg hover:ring-primary/40 active:scale-[0.98] touch-manipulation'
              )}
            >
              <div className={cn('relative h-32 bg-gradient-to-br overflow-hidden', meta.accent)}>
                <img
                  src={meta.previewImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                <span className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-primary shadow-sm ring-1 ring-green-100">
                  {meta.icon}
                </span>
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-primary/90 text-primary-foreground px-2.5 py-1 text-xs font-semibold shadow-sm">
                  <Play className="h-3 w-3 fill-current" />
                  {clipCount > 0 ? `${clipCount} clips` : 'Watch'}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-primary">
                      {meta.tagline}
                    </p>
                    <h2 className="text-base font-bold text-green-900 mt-0.5">{cat.label}</h2>
                  </div>
                  <ChevronRight className="h-5 w-5 text-green-600 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-green-700/85 mt-2 line-clamp-2 leading-relaxed">
                  {meta.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-green-600/70 mt-8 px-6">
        Swipe vertically through short clips after you choose a topic.
      </p>
    </div>
  );
};

export default PhilsFriendsLanding;
