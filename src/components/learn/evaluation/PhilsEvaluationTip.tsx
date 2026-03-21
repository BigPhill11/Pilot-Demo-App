import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PandaLogo from '@/components/icons/PandaLogo';

interface PhilsEvaluationTipProps {
  message: string;
}

const PhilsEvaluationTip: React.FC<PhilsEvaluationTipProps> = ({ message }) => {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <PandaLogo className="h-12 w-12 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-100">Phil's Learning Tip</h3>
            <p className="text-green-700 dark:text-green-200 text-sm mt-1">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhilsEvaluationTip;
