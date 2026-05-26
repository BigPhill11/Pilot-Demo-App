import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, ChevronRight, Clock, Sparkles, TreePine } from 'lucide-react';
import { JUNGLE_CATEGORIES, JungleCategory } from '@/data/career-jungle-categories';
import { financeCareerData } from '@/data/finance-careers';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface CareerJungleMapProps {
  onSelectJungle: (jungle: JungleCategory) => void;
  onTakeQuiz: () => void;
}

const CareerJungleMap: React.FC<CareerJungleMapProps> = ({ onSelectJungle, onTakeQuiz }) => {
  const isMobile = useIsMobile();

  const getCareerCount = (jungle: JungleCategory) => {
    return financeCareerData.filter(c => jungle.careerIds.includes(c.id)).length;
  };

  return (
    <div className="relative min-h-screen overflow-hidden rounded-[2rem] bg-green-950">
      <div className="absolute inset-0">
        <img
          src="/careers/career-canopy-dashboard.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-green-950/5 to-green-950/45" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/85 px-3 py-1.5 shadow-sm backdrop-blur">
            <TreePine className="h-4 w-4 text-green-600" />
            <span className="text-xs font-medium text-green-700 sm:text-sm">Career Jungle Explorer</span>
          </div>
          
          <h1 className={`${isMobile ? 'text-2xl' : 'text-5xl'} mt-3 font-bold tracking-tight text-green-950 sm:mt-4`}>
            Explore Finance Careers
          </h1>
          
          <p className={`${isMobile ? 'text-xs' : 'text-base'} mx-auto mt-2 max-w-2xl text-green-900/80 sm:mt-3`}>
            Step onto the canopy map and choose a side of finance. Wealth Management is open now;
            every other path is marked clearly while its content is still growing.
          </p>

          <Button
            onClick={onTakeQuiz}
            className="mt-4 bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-lg hover:from-green-800 hover:to-emerald-700 sm:mt-5"
            size={isMobile ? "sm" : "lg"}
          >
            <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Find Your Path (Career Quiz)
          </Button>
        </div>

        <div className="relative mt-5 min-h-[530px] sm:mt-8 sm:min-h-[680px]">
          <div className="absolute inset-0">
            {JUNGLE_CATEGORIES.map((jungle) => (
              <CanopyCard
                key={jungle.id}
                jungle={jungle}
                careerCount={getCareerCount(jungle)}
                onClick={() => onSelectJungle(jungle)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-3 max-w-3xl rounded-2xl border border-white/70 bg-white/85 p-3 shadow-xl backdrop-blur sm:mt-4 sm:p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-green-100 p-1.5 sm:p-2">
              <TreePine className="h-4 w-4 text-green-700 sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-green-800 sm:text-sm">Phil's Tip</p>
              <p className="text-xs text-green-600/80">
                Start with the open Wealth Management path inside Buy Side, then preview the other
                canopies to see what will unlock as new finance career content is built.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CanopyCardProps {
  jungle: JungleCategory;
  careerCount: number;
  onClick: () => void;
  isMobile: boolean;
}

const CANOPY_POSITIONS: Record<JungleCategory['id'], string> = {
  'buy-side': 'left-[7%] top-[8%] w-[36%]',
  'sell-side': 'right-[9%] top-[15%] w-[30%]',
  advisory: 'left-[13%] top-[57%] w-[24%]',
  corporate: 'right-[18%] top-[55%] w-[24%]',
};

const MOBILE_CANOPY_POSITIONS: Record<JungleCategory['id'], string> = {
  'buy-side': 'left-[4%] top-[4%] w-[45%]',
  'sell-side': 'right-[4%] top-[17%] w-[38%]',
  advisory: 'left-[8%] top-[58%] w-[36%]',
  corporate: 'right-[8%] top-[57%] w-[36%]',
};

const CANOPY_SIZES: Record<JungleCategory['id'], string> = {
  'buy-side': 'min-h-[175px] p-4',
  'sell-side': 'min-h-[160px] p-4',
  advisory: 'min-h-[140px] p-3.5',
  corporate: 'min-h-[140px] p-3.5',
};

const CanopyCard: React.FC<CanopyCardProps> = ({ jungle, careerCount, onClick, isMobile }) => {
  const hasOpenPath = jungle.id === 'buy-side';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group text-left transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/80',
        'absolute',
        isMobile ? MOBILE_CANOPY_POSITIONS[jungle.id] : CANOPY_POSITIONS[jungle.id]
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-white/70 bg-white/88 shadow-xl backdrop-blur-md sm:rounded-[1.75rem]',
          'hover:-translate-y-1 hover:bg-white hover:shadow-green-950/30',
          !isMobile && CANOPY_SIZES[jungle.id],
          isMobile && 'p-2.5'
        )}
      >
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80', jungle.gradientFrom, jungle.gradientTo)} />
        <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-green-200/50 blur-2xl sm:h-28 sm:w-28" />

        <div className="relative z-10 flex items-start gap-1.5 sm:gap-3">
          <div className="rounded-lg border border-green-200 bg-white/90 p-1.5 shadow-sm sm:rounded-2xl sm:p-2.5">
            <Briefcase className="h-3.5 w-3.5 text-green-700 sm:h-6 sm:w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1">
              <h3 className={cn('font-bold leading-tight text-green-950', isMobile ? 'text-[13px]' : 'text-xl')}>
                {jungle.name}
              </h3>
              <Badge variant="outline" className="h-5 border-green-300 bg-green-50 px-1.5 text-[10px] leading-none text-green-700 sm:h-auto sm:px-2 sm:text-xs">
                {careerCount} {careerCount === 1 ? 'career' : 'careers'}
              </Badge>
            </div>

            <p className="mt-1 line-clamp-2 text-[10px] font-semibold leading-tight text-green-800 sm:text-sm">{jungle.jungleName}</p>
            <p className="mt-1 hidden line-clamp-2 text-[11px] leading-snug text-green-700/80 sm:mt-1.5 sm:block sm:text-xs">
              {jungle.description}
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-1 sm:mt-3">
              <Badge className={cn(
                'px-1.5 text-[10px] leading-tight sm:px-2 sm:text-xs',
                hasOpenPath ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
              )}>
                {hasOpenPath ? (isMobile ? 'Open' : 'Wealth Management open') : (isMobile ? 'Soon' : 'Careers coming soon')}
              </Badge>
              {!hasOpenPath && !isMobile && (
                <Badge variant="outline" className="border-amber-200 bg-white/70 px-1.5 text-[10px] leading-tight text-amber-700 sm:px-2 sm:text-xs">
                  <Clock className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  Preview only
                </Badge>
              )}
            </div>
          </div>

          <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500 transition-transform group-hover:translate-x-1 sm:mt-1 sm:h-5 sm:w-5" />
        </div>
      </div>
    </button>
  );
};

export default CareerJungleMap;
