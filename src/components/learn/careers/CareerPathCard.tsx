/**
 * Career Path Card
 * 
 * Reusable card component for displaying individual career paths
 * within a jungle category. Styled to match Phil's Financials theme.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { FinanceCareerData } from '@/data/finance-careers';
import { useIsMobile } from '@/hooks/use-mobile';

interface CareerPathCardProps {
  career: FinanceCareerData;
  onClick: () => void;
}

const CareerPathCard: React.FC<CareerPathCardProps> = ({ career, onClick }) => {
  const isMobile = useIsMobile();

  return (
    <Card
      className={`
        relative overflow-hidden cursor-pointer transition-all duration-300
        hover:shadow-lg hover:scale-[1.02] hover:border-green-400
        bg-white border-green-200 border
      `}
      onClick={onClick}
    >

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent" />

      <CardContent className={`relative z-10 ${isMobile ? 'p-4' : 'p-5'}`}>
        <div className="flex items-start gap-4">
          {/* Career Icon */}
          <div className={`
            ${isMobile ? 'p-2.5' : 'p-3'} 
            rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 
            border border-green-200 shadow-sm
            transition-transform group-hover:scale-110
          `}>
            <career.icon className={`${isMobile ? 'h-6 w-6' : 'h-7 w-7'} text-green-600`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-green-800 mb-1`}>
              {career.name}
            </h3>
            
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-600/80 mb-2 line-clamp-2`}>
              {career.kidFriendlyDescription}
            </p>

            {/* Career type badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                {career.levels.length} modules
              </Badge>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight className="h-5 w-5 text-green-400 flex-shrink-0 self-center" />
        </div>

        {/* Decorative bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-emerald-300 to-green-200 opacity-50" />
      </CardContent>
    </Card>
  );
};

export default CareerPathCard;
