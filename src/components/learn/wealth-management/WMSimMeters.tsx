/**
 * WM Simulation Meters Display
 * 
 * Reusable component showing all career simulation meters
 * with visual progress bars and icons.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  Brain, 
  Users, 
  LineChart,
  Scale,
  Zap,
  Battery
} from 'lucide-react';
import { WMSimMeters as WMSimMetersType } from '@/types/wealth-management-sim';

interface WMSimMetersProps {
  meters: WMSimMetersType;
  showSalary?: boolean;
  compact?: boolean;
}

const WMSimMeters: React.FC<WMSimMetersProps> = ({
  meters,
  showSalary = true,
  compact = false,
}) => {
  const formatSalary = (salary: number) => {
    return `$${(salary / 1000).toFixed(0)}K`;
  };

  const getMeterColor = (value: number, isNegative = false) => {
    if (isNegative) {
      if (value >= 70) return 'bg-rose-500';
      if (value >= 40) return 'bg-amber-500';
      return 'bg-emerald-500';
    }
    if (value >= 70) return 'bg-emerald-500';
    if (value >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const skillMeters = [
    { 
      key: 'investmentKnowledge', 
      label: 'Investment Knowledge', 
      value: meters.investmentKnowledge,
      icon: <Brain className="h-4 w-4" />,
      color: getMeterColor(meters.investmentKnowledge),
    },
    { 
      key: 'clientRelations', 
      label: 'Client Relations', 
      value: meters.clientRelations,
      icon: <Users className="h-4 w-4" />,
      color: getMeterColor(meters.clientRelations),
    },
    { 
      key: 'technicalAnalysis', 
      label: 'Technical Analysis', 
      value: meters.technicalAnalysis,
      icon: <LineChart className="h-4 w-4" />,
      color: getMeterColor(meters.technicalAnalysis),
    },
  ];

  const balanceMeters = [
    { 
      key: 'workLifeBalance', 
      label: 'Work-Life Balance', 
      value: meters.workLifeBalance,
      icon: <Scale className="h-4 w-4" />,
      color: getMeterColor(meters.workLifeBalance),
    },
    { 
      key: 'productivity', 
      label: 'Productivity', 
      value: meters.productivity,
      icon: <Zap className="h-4 w-4" />,
      color: getMeterColor(meters.productivity),
    },
    { 
      key: 'fatigue', 
      label: 'Fatigue', 
      value: meters.fatigue,
      icon: <Battery className="h-4 w-4" />,
      color: getMeterColor(meters.fatigue, true),
      isNegative: true,
    },
  ];

  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {showSalary && (
          <div className="col-span-2 flex items-center justify-center gap-2 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span className="font-bold text-emerald-800 text-lg">{formatSalary(meters.salary)}</span>
            <span className="text-xs text-emerald-600/70">/ year</span>
          </div>
        )}
        
        {[...skillMeters, ...balanceMeters].map((meter) => (
          <div key={meter.key} className="flex items-center gap-2">
            <div className={`p-1 rounded ${meter.isNegative ? 'text-rose-600' : 'text-emerald-600'}`}>
              {meter.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-xs mb-0.5">
                <span className="truncate text-green-700">{meter.label}</span>
                <span className="font-medium">{meter.value}</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${meter.color} transition-all duration-300`}
                  style={{ width: `${meter.value}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Salary Display */}
      {showSalary && (
        <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-emerald-600" />
                <span className="text-green-700 font-medium">Annual Salary</span>
              </div>
              <span className="text-2xl font-bold text-emerald-800">{formatSalary(meters.salary)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills Section */}
      <Card className="border-green-200">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-emerald-600" />
            Skills
          </h3>
          <div className="space-y-3">
            {skillMeters.map((meter) => (
              <div key={meter.key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-700 flex items-center gap-1.5">
                    {meter.icon}
                    {meter.label}
                  </span>
                  <span className="font-medium text-green-800">{meter.value}/100</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${meter.color} transition-all duration-500`}
                    style={{ width: `${meter.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Balance Section */}
      <Card className="border-green-200">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Scale className="h-4 w-4 text-emerald-600" />
            Balance
          </h3>
          <div className="space-y-3">
            {balanceMeters.map((meter) => (
              <div key={meter.key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={`flex items-center gap-1.5 ${meter.isNegative ? 'text-rose-700' : 'text-green-700'}`}>
                    {meter.icon}
                    {meter.label}
                    {meter.isNegative && <span className="text-xs">(lower is better)</span>}
                  </span>
                  <span className={`font-medium ${meter.isNegative ? 'text-rose-800' : 'text-green-800'}`}>
                    {meter.value}/100
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${meter.color} transition-all duration-500`}
                    style={{ width: `${meter.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WMSimMeters;
