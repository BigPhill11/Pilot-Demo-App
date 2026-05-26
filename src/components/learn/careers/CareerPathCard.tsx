/**
 * Career Path Card
 * 
 * Reusable card component for displaying individual career paths
 * within a jungle category. Styled to match Phil's Financials theme.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Clock, Lock, Sprout } from 'lucide-react';
import { FinanceCareerData } from '@/data/finance-careers';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface CareerPathCardProps {
  career: FinanceCareerData;
  onClick: () => void;
  available?: boolean;
}

const CareerPathCard: React.FC<CareerPathCardProps> = ({ career, onClick, available = false }) => {
  const isMobile = useIsMobile();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`${career.name} ${available ? 'open career path' : 'coming soon'}`}
      className={cn(
        'relative overflow-hidden cursor-pointer border transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/80',
        available
          ? 'border-emerald-300 bg-white shadow-lg shadow-emerald-900/10 hover:scale-[1.02] hover:border-emerald-500 hover:shadow-xl'
          : 'border-amber-200 bg-white/85 opacity-90 hover:border-amber-300 hover:shadow-md'
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >

      <div className={cn(
        'absolute inset-0 bg-gradient-to-br',
        available ? 'from-emerald-50 via-green-50/70 to-transparent' : 'from-amber-50 via-green-50/60 to-transparent'
      )} />

      <CardContent className={`relative z-10 ${isMobile ? 'p-4' : 'p-5'}`}>
        <div className="flex items-start gap-4">
          <div className={`
            ${isMobile ? 'p-2.5' : 'p-3'} 
            rounded-xl border shadow-sm
            transition-transform group-hover:scale-110
            ${available ? 'border-emerald-200 bg-gradient-to-br from-green-100 to-emerald-100' : 'border-amber-200 bg-amber-50'}
          `}>
            <career.icon className={`${isMobile ? 'h-6 w-6' : 'h-7 w-7'} ${available ? 'text-green-600' : 'text-amber-600'}`} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-green-800 mb-1`}>
              {career.name}
            </h3>
            
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-600/80 mb-2 line-clamp-2`}>
              {available
                ? career.kidFriendlyDescription
                : 'This career path is still growing. Lessons and details are not available yet.'}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              {available ? (
                <>
                  <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                    <Sprout className="mr-1 h-3 w-3" />
                    Open path
                  </Badge>
                  <Badge variant="outline" className="text-xs border-green-200 bg-green-50 text-green-700">
                    Wealth Management
                  </Badge>
                </>
              ) : (
                <>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                    <Clock className="mr-1 h-3 w-3" />
                    Coming soon
                  </Badge>
                  <Badge variant="outline" className="text-xs border-amber-200 bg-white/70 text-amber-700">
                    No lessons yet
                  </Badge>
                </>
              )}
            </div>
          </div>

          {available ? (
            <ChevronRight className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
          ) : (
            <Lock className="h-5 w-5 flex-shrink-0 self-center text-amber-500" />
          )}
        </div>

        <div className={cn(
          'absolute bottom-0 left-0 right-0 h-1 opacity-70',
          available
            ? 'bg-gradient-to-r from-green-300 via-emerald-400 to-green-300'
            : 'bg-gradient-to-r from-amber-200 via-green-200 to-amber-200'
        )} />
      </CardContent>
    </Card>
  );
};

export default CareerPathCard;
