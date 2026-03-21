import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const RevenueGrowthCalculator: React.FC = () => {
  const [year1, setYear1] = useState<string>('');
  const [year2, setYear2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const y1 = parseFloat(year1);
    const y2 = parseFloat(year2);

    if (isNaN(y1) || isNaN(y2) || y1 <= 0) {
      return;
    }

    const growth = ((y2 - y1) / y1) * 100;
    setResult(growth);
  };

  const getGrowthMessage = (growth: number) => {
    if (growth < 0) return { text: 'Declining revenue - Red flag! 🚩', color: 'text-red-600' };
    if (growth < 5) return { text: 'Very slow growth', color: 'text-orange-600' };
    if (growth < 15) return { text: 'Moderate growth', color: 'text-yellow-600' };
    if (growth < 30) return { text: 'Strong growth! ✅', color: 'text-green-600' };
    return { text: 'Exceptional growth! 🚀', color: 'text-green-600 font-bold' };
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year1">Last Year Revenue ($M)</Label>
          <Input
            id="year1"
            type="number"
            placeholder="e.g., 100"
            value={year1}
            onChange={(e) => setYear1(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year2">This Year Revenue ($M)</Label>
          <Input
            id="year2"
            type="number"
            placeholder="e.g., 130"
            value={year2}
            onChange={(e) => setYear2(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={calculate} className="w-full">
        Calculate Growth Rate
      </Button>

      {result !== null && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6 text-center space-y-2">
            <div className="text-4xl font-bold">{result.toFixed(1)}%</div>
            <div className={getGrowthMessage(result).color}>
              {getGrowthMessage(result).text}
            </div>
            <div className="text-sm text-muted-foreground pt-2">
              Formula: (${year2}M - ${year1}M) / ${year1}M × 100
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg text-sm space-y-2">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">Try These Examples:</h4>
        <ul className="space-y-1 text-blue-700 dark:text-blue-300">
          <li>• Last Year: $50M, This Year: $65M = 30% growth</li>
          <li>• Last Year: $100M, This Year: $110M = 10% growth</li>
          <li>• Last Year: $80M, This Year: $70M = -12.5% (shrinking!)</li>
        </ul>
      </div>
    </div>
  );
};

export default RevenueGrowthCalculator;
