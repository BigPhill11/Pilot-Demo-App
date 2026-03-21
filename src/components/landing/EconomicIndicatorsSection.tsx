
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import EconomicCalendar from './EconomicCalendar';

interface EconomicIndicator {
  name: string;
  value: number;
  change: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
}

const EconomicIndicatorsSection = () => {
  const fetchEconomicData = async () => {
    console.log('Fetching economic data...');
    const { data, error } = await supabase.functions.invoke('fred-data');
    if (error) {
      console.error('Economic data fetch error:', error);
      throw new Error(error.message);
    }
    console.log('Economic data received:', data);
    return data || { indicators: [] };
  };

  const { data: economicData, isLoading, error } = useQuery({
    queryKey: ['economicIndicators'],
    queryFn: fetchEconomicData,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Economic data is currently unavailable.</p>
        </div>
        <EconomicCalendar />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Economic Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))
        ) : (
          economicData?.indicators?.map((indicator: EconomicIndicator, index: number) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {indicator.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {indicator.value}{indicator.unit}
                    </p>
                    <p className={`text-sm flex items-center gap-1 ${
                      indicator.change > 0 ? 'text-green-600' : 
                      indicator.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {getTrendIcon(indicator.trend)}
                      {indicator.change > 0 ? '+' : ''}{indicator.change}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Economic Calendar */}
      <EconomicCalendar />
    </div>
  );
};

export default EconomicIndicatorsSection;
