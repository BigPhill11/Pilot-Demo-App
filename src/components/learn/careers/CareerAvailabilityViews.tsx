import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock, Lock } from 'lucide-react';
import { FinanceCareerData } from '@/data/finance-careers';
import WealthManagementJourney from '../wealth-management/WealthManagementJourney';

interface CareerViewProps {
  career: FinanceCareerData;
  onBack: () => void;
}

export const ComingSoonCareerNotice: React.FC<CareerViewProps> = ({ career, onBack }) => {
  return (
    <div className="relative min-h-screen overflow-hidden rounded-[2rem] bg-green-950">
      <div className="absolute inset-0">
        <img
          src="/careers/career-canopy-dashboard.png"
          alt=""
          className="h-full w-full scale-110 object-cover opacity-70 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-green-100/50 to-green-950/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="-ml-2 bg-white/70 text-green-800 backdrop-blur hover:bg-white hover:text-green-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Canopy
        </Button>

        <Card className="mt-8 overflow-hidden border-amber-200 bg-white/90 shadow-2xl backdrop-blur">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <Lock className="h-10 w-10 text-amber-600" />
              </div>

              <div className="flex-1">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  <Clock className="mr-1 h-3 w-3" />
                  Coming soon
                </Badge>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-950">
                  {career.name}
                </h1>

                <p className="mt-3 text-green-700/85">
                  This career path is still growing. There are no lessons, modules, quizzes,
                  or career details available here yet.
                </p>

                <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4">
                  <p className="text-sm font-semibold text-green-900">What to do next</p>
                  <p className="mt-1 text-sm text-green-700/80">
                    Return to the canopy and enter Wealth Management, the only open career path right now.
                  </p>
                </div>

                <Button
                  onClick={onBack}
                  className="mt-6 bg-green-700 text-white hover:bg-green-800"
                >
                  Back to Available Paths
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const WealthManagementCareerView: React.FC<CareerViewProps> = ({ career, onBack }) => {
  return (
    <div className="relative min-h-screen overflow-hidden rounded-[2rem] bg-green-950">
      <div className="absolute inset-0">
        <img
          src="/careers/career-canopy-dashboard.png"
          alt=""
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-emerald-50/40 to-green-950/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="-ml-2 bg-white/70 text-green-800 backdrop-blur hover:bg-white hover:text-green-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Buy Side Canopy
        </Button>

        <div className="mt-6">
          <WealthManagementJourney career={career} />
        </div>
      </div>
    </div>
  );
};
