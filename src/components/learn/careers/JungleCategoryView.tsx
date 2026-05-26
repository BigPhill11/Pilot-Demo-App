/**
 * Jungle Category View
 * 
 * Displays all careers within a selected jungle category.
 * Uses the Phil's Financials green theme and mobile-friendly layout.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Compass, TreePine } from 'lucide-react';
import { JungleCategory } from '@/data/career-jungle-categories';
import { FinanceCareerData, financeCareerData } from '@/data/finance-careers';
import CareerPathCard from './CareerPathCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface JungleCategoryViewProps {
  jungle: JungleCategory;
  onBack: () => void;
  onSelectCareer: (career: FinanceCareerData) => void;
}

const JungleCategoryView: React.FC<JungleCategoryViewProps> = ({ 
  jungle, 
  onBack, 
  onSelectCareer 
}) => {
  const isMobile = useIsMobile();

  const careers = financeCareerData.filter(c => jungle.careerIds.includes(c.id));
  const openCareers = careers.filter((career) => career.id === 'wealth-management').length;

  return (
    <div className="relative min-h-screen overflow-hidden rounded-[2rem] bg-green-950">
      <div className="absolute inset-0">
        <img
          src="/careers/career-canopy-dashboard.png"
          alt=""
          className={cn(
            'h-full w-full object-cover opacity-75 blur-[1px] scale-110',
            jungle.id === 'buy-side' && 'object-left-top',
            jungle.id === 'sell-side' && 'object-right-top',
            jungle.id === 'advisory' && 'object-left-bottom',
            jungle.id === 'corporate' && 'object-right-bottom'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-green-100/50 to-green-950/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="-ml-2 bg-white/70 text-green-800 backdrop-blur hover:bg-white hover:text-green-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Canopy Map
        </Button>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={`
            relative overflow-hidden rounded-[2rem] border border-white/70 p-6 shadow-2xl backdrop-blur-md
            bg-gradient-to-br ${jungle.gradientFrom} ${jungle.gradientTo}
          `}>
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute bottom-0 right-8 h-24 w-3 rounded-full bg-green-700/15" />

            <div className="relative z-10 flex items-start gap-4">
              <div className="rounded-2xl border border-green-200 bg-white/85 p-4 shadow-sm">
                <TreePine className="h-9 w-9 text-green-700" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-green-300 bg-white/60 text-green-700">
                    <Compass className="h-3 w-3 mr-1" />
                    {jungle.name} Canopy
                  </Badge>
                  {openCareers > 0 ? (
                    <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                      {openCareers} open path
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      <Clock className="mr-1 h-3 w-3" />
                      Preview only
                    </Badge>
                  )}
                </div>

                <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} mt-3 font-bold tracking-tight text-green-950`}>
                  {jungle.jungleName}
                </h1>

                <p className={`${isMobile ? 'text-sm' : 'text-base'} mt-3 text-green-800/85`}>
                  {jungle.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-white/60 bg-white/60 p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-green-700/70">Canopy size</p>
                    <p className="mt-1 text-xl font-bold text-green-950">{careers.length} careers</p>
                  </div>
                  <div className="rounded-2xl border border-white/60 bg-white/60 p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-green-700/70">Status</p>
                    <p className="mt-1 text-xl font-bold text-green-950">
                      {openCareers > 0 ? 'Open now' : 'Growing'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-xl backdrop-blur">
            <p className="text-sm font-semibold text-green-900">What happens here?</p>
            <p className="mt-2 text-sm text-green-700/80">
              This is a closer look at the canopy. Open paths can launch a career experience.
              Coming-soon paths only show a warning so students do not enter empty lesson content.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-2xl backdrop-blur">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-green-950`}>
                Choose Your Path
              </h2>
              <p className="mt-1 text-sm text-green-700/80">
                Select Wealth Management to enter the available path, or preview upcoming careers.
              </p>
            </div>
            <Badge variant="outline" className="border-green-300 bg-green-50 text-green-700">
              {careers.length} total
            </Badge>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
            {careers.map((career) => (
              <CareerPathCard
                key={career.id}
                career={career}
                onClick={() => onSelectCareer(career)}
                available={career.id === 'wealth-management'}
              />
            ))}
          </div>
        </div>

        {careers.length === 0 && (
          <div className="rounded-2xl border border-white/70 bg-white/85 py-12 text-center shadow-xl backdrop-blur">
            <TreePine className="mx-auto h-10 w-10 text-green-600" />
            <p className="mt-4 text-green-600">
              More careers growing in this jungle soon!
            </p>
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <TreePine className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Phil's Insight</p>
              <p className="text-xs text-green-600/80">
                {getPhilTip(jungle.id)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getPhilTip(jungleId: string): string {
  const tips: Record<string, string> = {
    'sell-side': 'Sell-side careers are fast-paced and deal-focused. You\'ll work with many clients and learn how businesses raise capital. Great for those who love variety and client interaction!',
    'buy-side': 'Buy-side careers let you focus on growing wealth over time. You\'ll develop deep expertise in specific markets or strategies. Perfect for those who love research and long-term thinking!',
    'advisory': 'Advisory careers combine business strategy with problem-solving. You\'ll work with many different industries and help companies transform. Ideal for curious minds who love variety!',
    'corporate': 'Corporate finance puts you at the heart of a company\'s financial decisions. You\'ll understand the business deeply and help guide its growth. Great for those who want stability with impact!',
  };
  return tips[jungleId] || 'Every career path has unique rewards. Explore to find your perfect fit!';
}

export default JungleCategoryView;
