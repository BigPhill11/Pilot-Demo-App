import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PandaLogo from '@/components/icons/PandaLogo';

interface ResumeTipCardProps {
  tip: string;
  title?: string;
}

const ResumeTipCard: React.FC<ResumeTipCardProps> = ({
  tip,
  title = "Phil's Tip",
}) => {
  return (
    <Card className="rounded-xl border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-green-50">
      <CardContent className="p-4 flex items-start gap-3">
        <PandaLogo className="h-10 w-10 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-sm text-foreground leading-relaxed">{tip}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeTipCard;
