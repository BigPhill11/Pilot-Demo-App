import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PandaLogo from '@/components/icons/PandaLogo';

const PhilTipCard: React.FC = () => {
  return (
    <Card className="rounded-2xl border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-green-50">
      <CardContent className="p-5 flex items-center gap-4">
        <PandaLogo className="h-12 w-12 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            Phil&apos;s Tip
          </p>
          <p className="text-sm font-medium text-foreground">
            Confidence grows with preparation. You&apos;ve got this!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhilTipCard;
