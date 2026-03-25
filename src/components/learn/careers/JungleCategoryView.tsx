/**
 * Jungle Category View
 * 
 * Displays all careers within a selected jungle category.
 * Uses the Phil's Financials green theme and mobile-friendly layout.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TreePine } from 'lucide-react';
import { JungleCategory } from '@/data/career-jungle-categories';
import { FinanceCareerData, financeCareerData } from '@/data/finance-careers';
import CareerPathCard from './CareerPathCard';
import { useIsMobile } from '@/hooks/use-mobile';

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

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-emerald-50/30 to-white -z-10" />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-green-700 hover:text-green-800 hover:bg-green-100 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jungle Map
        </Button>

        {/* Header */}
        <div className={`
          relative overflow-hidden rounded-2xl p-6
          bg-gradient-to-br ${jungle.gradientFrom} ${jungle.gradientTo}
          border-2 ${jungle.borderColor}
        `}>
          {/* Decorative bamboo */}
          <div className="absolute top-0 right-0 w-24 h-full opacity-10">
            <div className="absolute top-0 right-4 w-2 h-full bg-green-600 rounded-full" />
            <div className="absolute top-4 right-10 w-1.5 h-3/4 bg-green-500 rounded-full" />
            <div className="absolute top-8 right-16 w-1 h-1/2 bg-green-400 rounded-full" />
          </div>

          <div className="relative z-10 flex items-start gap-4">
            {/* Icon */}
            <div className={`
              ${isMobile ? 'text-4xl' : 'text-5xl'} 
              p-4 rounded-2xl bg-white/80 border border-green-200 shadow-sm
            `}>
              {jungle.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-white/50">
                  <TreePine className="h-3 w-3 mr-1" />
                  {jungle.name} Careers
                </Badge>
              </div>

              <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-green-800 mb-2`}>
                {jungle.jungleName}
              </h1>

              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-green-700/80`}>
                {jungle.description}
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm text-green-600">
                <span className="font-medium">{careers.length} careers to explore</span>
                <span>•</span>
                <span>0 completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Career Cards */}
        <div className="space-y-4">
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-green-800`}>
            Choose Your Path
          </h2>

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
            {careers.map((career) => (
              <CareerPathCard
                key={career.id}
                career={career}
                onClick={() => onSelectCareer(career)}
              />
            ))}
          </div>
        </div>

        {/* Empty state if no careers */}
        {careers.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">🌱</span>
            <p className="mt-4 text-green-600">
              More careers growing in this jungle soon!
            </p>
          </div>
        )}

        {/* Phil's guidance */}
        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🐼</span>
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
