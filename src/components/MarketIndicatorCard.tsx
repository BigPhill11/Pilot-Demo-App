
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MarketIndicatorCardProps {
  title: string;
  value: string;
  change: number; // Positive for increase, negative for decrease
  changeSuffix?: string;
}

const MarketIndicatorCard: React.FC<MarketIndicatorCardProps> = ({ title, value, change, changeSuffix = "" }) => {
  // Ensure change is a valid number before using it
  const safeChange = typeof change === 'number' && !isNaN(change) ? change : 0;
  const isPositive = safeChange >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className={`text-xs ${changeColor} flex items-center`}>
          <ChangeIcon className="h-3 w-3 mr-1" />
          {isPositive ? '+' : ''}{safeChange.toFixed(2)}{changeSuffix}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIndicatorCard;
