/**
 * Economics Simulator Meters
 * 
 * Displays the current meter values for a simulator with
 * visual progress bars and icons.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SimulatorMeter } from '@/types/economics-sim';

interface EconomicsSimMetersProps {
  meters: SimulatorMeter[];
  compact?: boolean;
}

const colorClasses: Record<string, { bg: string; fill: string; text: string }> = {
  green: { bg: 'bg-green-100', fill: 'bg-green-500', text: 'text-green-700' },
  blue: { bg: 'bg-blue-100', fill: 'bg-blue-500', text: 'text-blue-700' },
  amber: { bg: 'bg-amber-100', fill: 'bg-amber-500', text: 'text-amber-700' },
  red: { bg: 'bg-red-100', fill: 'bg-red-500', text: 'text-red-700' },
  purple: { bg: 'bg-purple-100', fill: 'bg-purple-500', text: 'text-purple-700' },
  emerald: { bg: 'bg-emerald-100', fill: 'bg-emerald-500', text: 'text-emerald-700' },
};

const EconomicsSimMeters: React.FC<EconomicsSimMetersProps> = ({ meters, compact = false }) => {
  const getPercentage = (meter: SimulatorMeter): number => {
    const range = meter.max - meter.min;
    const value = meter.value - meter.min;
    return Math.round((value / range) * 100);
  };

  const formatValue = (meter: SimulatorMeter): string => {
    if (meter.unit === '$') {
      return `$${meter.value.toLocaleString()}`;
    }
    if (meter.unit === 'K') {
      return `${meter.value}K`;
    }
    if (meter.unit === 'B') {
      return `$${meter.value}B`;
    }
    return `${meter.value}${meter.unit || ''}`;
  };

  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {meters.map((meter) => {
          const colors = colorClasses[meter.color] || colorClasses.green;
          const percentage = getPercentage(meter);
          
          return (
            <div
              key={meter.id}
              className={`p-2 rounded-lg ${colors.bg}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">
                  {meter.icon} {meter.label}
                </span>
                <span className={`text-xs font-bold ${colors.text}`}>
                  {formatValue(meter)}
                </span>
              </div>
              <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.fill} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Card className="border-gray-200 bg-white/90">
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Status</h3>
        <div className="space-y-3">
          {meters.map((meter) => {
            const colors = colorClasses[meter.color] || colorClasses.green;
            const percentage = getPercentage(meter);
            
            return (
              <div key={meter.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    {meter.icon} {meter.label}
                  </span>
                  <span className={`text-sm font-bold ${colors.text}`}>
                    {formatValue(meter)}
                  </span>
                </div>
                <div className={`h-2 ${colors.bg} rounded-full overflow-hidden`}>
                  <div
                    className={`h-full ${colors.fill} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default EconomicsSimMeters;
