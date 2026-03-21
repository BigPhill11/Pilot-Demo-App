
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PandaLogo from '@/components/icons/PandaLogo';
import { useIsMobile } from '@/hooks/use-mobile';

const AdventureHeader = () => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center gap-4">
          <PandaLogo className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`} />
          <div>
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-emerald-800 mb-2`}>
              Phil's Adventures in Finance! 📚
            </h2>
            <p className={`text-emerald-700 ${isMobile ? 'text-sm' : ''}`}>
              Join Phil the panda on interactive learning journeys through the bamboo forest of finance. 
              Learn investing concepts through engaging stories and hands-on activities!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdventureHeader;
