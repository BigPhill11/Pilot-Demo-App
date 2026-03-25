/**
 * Career Jungle Map
 * 
 * Landing page for Careers in Finance with a bamboo jungle pathway
 * connecting 4 career category "jungles". Mobile-first design with
 * Phil's Financials sage/emerald color palette.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, TreePine } from 'lucide-react';
import { JUNGLE_CATEGORIES, JungleCategory } from '@/data/career-jungle-categories';
import { financeCareerData } from '@/data/finance-careers';
import { useIsMobile } from '@/hooks/use-mobile';

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
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30 -z-10" />
      
      {/* Decorative bamboo elements */}
      <div className="absolute top-0 left-0 w-full h-32 overflow-hidden -z-5 opacity-20">
        <div className="absolute top-0 left-4 w-2 h-32 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
        <div className="absolute top-0 left-8 w-1.5 h-24 bg-gradient-to-b from-green-300 to-green-500 rounded-full" />
        <div className="absolute top-0 right-4 w-2 h-28 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
        <div className="absolute top-0 right-10 w-1 h-20 bg-gradient-to-b from-green-300 to-green-500 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200">
            <TreePine className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Career Jungle Explorer</span>
          </div>
          
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-green-800`}>
            Explore Finance Careers
          </h1>
          
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-green-600/80 max-w-xl mx-auto`}>
            Navigate through the jungle of finance careers! Each path leads to exciting opportunities. 
            Choose your adventure and discover where your skills can grow.
          </p>

          <Button
            onClick={onTakeQuiz}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            size={isMobile ? "default" : "lg"}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Find Your Path (Career Quiz)
          </Button>
        </div>

        {/* Pathway SVG connector (visible on desktop) */}
        {!isMobile && (
          <div className="relative h-8 flex justify-center">
            <svg className="w-full max-w-md h-8" viewBox="0 0 400 32">
              <path
                d="M200 0 L200 16 Q200 24 192 24 L100 24 M200 16 Q200 24 208 24 L300 24"
                fill="none"
                stroke="rgb(134, 239, 172)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 4"
              />
              <circle cx="200" cy="4" r="6" fill="rgb(34, 197, 94)" />
            </svg>
          </div>
        )}

        {/* Jungle Cards Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6'}`}>
          {JUNGLE_CATEGORIES.map((jungle, index) => (
            <JungleCard
              key={jungle.id}
              jungle={jungle}
              careerCount={getCareerCount(jungle)}
              onClick={() => onSelectJungle(jungle)}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Pathway connectors between cards (mobile) */}
        {isMobile && (
          <div className="absolute left-1/2 top-[280px] bottom-[100px] w-1 -translate-x-1/2 -z-5">
            <div className="w-full h-full bg-gradient-to-b from-green-200 via-emerald-200 to-teal-200 rounded-full opacity-50" />
          </div>
        )}

        {/* Phil's guidance footer */}
        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🐼</span>
            <div>
              <p className="text-sm font-medium text-green-800">Phil's Tip</p>
              <p className="text-xs text-green-600/80">
                Not sure where to start? Take the career quiz above, or explore each jungle 
                to learn about different paths. Every career builds valuable skills!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface JungleCardProps {
  jungle: JungleCategory;
  careerCount: number;
  onClick: () => void;
  index: number;
  isMobile: boolean;
}

const JungleCard: React.FC<JungleCardProps> = ({ jungle, careerCount, onClick, index, isMobile }) => {
  return (
    <Card
      className={`
        relative overflow-hidden cursor-pointer transition-all duration-300
        hover:shadow-lg hover:scale-[1.02] hover:border-green-400
        bg-white ${jungle.borderColor} border-2
      `}
      onClick={onClick}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${jungle.gradientFrom} ${jungle.gradientTo} opacity-50`} />
      
      {/* Decorative corner bamboo */}
      <div className="absolute -top-2 -right-2 w-16 h-16 opacity-10">
        <div className="absolute top-0 right-4 w-1.5 h-12 bg-green-600 rounded-full transform rotate-12" />
        <div className="absolute top-2 right-8 w-1 h-8 bg-green-500 rounded-full transform -rotate-6" />
      </div>

      <CardContent className={`relative z-10 ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`
            ${isMobile ? 'text-3xl' : 'text-4xl'} 
            p-3 rounded-xl bg-white/80 border border-green-200 shadow-sm
          `}>
            {jungle.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-green-800`}>
                {jungle.name}
              </h3>
              <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50">
                {careerCount} {careerCount === 1 ? 'career' : 'careers'}
              </Badge>
            </div>
            
            <p className="text-sm font-medium text-green-700 mb-2 italic">
              {jungle.jungleName}
            </p>
            
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-600/80 line-clamp-2`}>
              {jungle.kidFriendlyDescription}
            </p>
          </div>

          {/* Arrow */}
          <ChevronRight className="h-6 w-6 text-green-400 flex-shrink-0 self-center" />
        </div>

        {/* Progress indicator placeholder */}
        <div className="mt-4 pt-3 border-t border-green-100">
          <div className="flex items-center justify-between text-xs text-green-600">
            <span>Careers explored: 0/{careerCount}</span>
            <span className="font-medium">Start exploring →</span>
          </div>
          <div className="mt-2 h-1.5 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerJungleMap;
