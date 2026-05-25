import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CareerProgressRingProps {
  overallPercent: number;
  onViewProgress: () => void;
}

const CareerProgressRing: React.FC<CareerProgressRingProps> = ({
  overallPercent,
  onViewProgress,
}) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (overallPercent / 100) * circumference;

  return (
    <Card id="career-progress-widget" className="rounded-2xl border-emerald-100">
      <CardContent className="p-5">
        <h3 className="font-bold text-foreground mb-4">Your Progress</h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <svg width="140" height="140" className="-rotate-90">
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="#d1fae5"
                strokeWidth="10"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="#047857"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-800">{overallPercent}%</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              You&apos;re just getting started. Complete modules to build your skills and unlock new
              opportunities!
            </p>
            <Button
              className="mt-4 bg-emerald-800 hover:bg-emerald-900"
              onClick={onViewProgress}
            >
              View My Progress
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerProgressRing;
