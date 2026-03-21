
import React from 'react';
import MarketIndicatorCard from '@/components/MarketIndicatorCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

// Static data updated to match the new indicators and serve as a fallback
const fallbackIndicators = [
  { title: "NASDAQ", value: "15,832.80", change: 1.25 },
  { title: "Dow Jones", value: "37,248.90", change: -0.45 },
  { title: "S&P 500", value: "4,783.45", change: 0.85 },
  { title: "Gold", value: "$2,042.30", change: 2.10 },
  { title: "Crude Oil", value: "$73.85", change: -1.55 },
  { title: "Volatility Index", value: "13.42", change: -0.75 },
];

const MarketIndicatorsSection = () => {
  // Function to fetch data from enhanced market data
  const fetchEnhancedMarketData = async () => {
    const { data, error } = await supabase.functions.invoke('enhanced-market-data');
    if (error) {
      throw new Error(error.message);
    }
    if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format received from enhanced market data");
    }
    
    // Transform the enhanced market data to match component expectations
    return data.map(item => ({
      title: item.name || item.symbol,
      value: item.asset_type === 'commodity' && !item.name?.includes('$') 
        ? `$${(item.price || 0).toFixed(2)}`
        : (item.price || 0).toFixed(2),
      change: item.change_percent || 0,
      changeSuffix: '%'
    }));
  };

  // Function to fetch cached data from database
  const fetchCachedMarketData = async () => {
    const { data, error } = await supabase
      .from('market_data_cache')
      .select('*')
      .order('last_updated', { ascending: false });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data.map(item => ({
      title: item.name,
      value: item.asset_type === 'commodity' && !item.name.includes('$') 
        ? `$${(item.price || 0).toFixed(2)}`
        : (item.price || 0).toFixed(2),
      change: item.change_percent || 0,
      changeSuffix: '%'
    }));
  };

  // Try enhanced market data first, fallback to cached data
  const { data: marketIndicators, isLoading, isError, error } = useQuery({
    queryKey: ['enhancedMarketData'],
    queryFn: async () => {
      try {
        // Try enhanced market data first
        return await fetchEnhancedMarketData();
      } catch (enhancedError) {
        console.log("Enhanced market data failed, trying cached data:", enhancedError);
        try {
          // Fallback to cached data
          return await fetchCachedMarketData();
        } catch (cachedError) {
          console.error("Both enhanced and cached data failed:", cachedError);
          throw cachedError;
        }
      }
    },
    staleTime: 1000 * 60 * 5, // Re-fetch data every 5 minutes
  });

  if (isError) {
    console.error("Error fetching market data:", error);
  }

  const indicatorsToDisplay = isError || !marketIndicators || marketIndicators.length === 0 ? fallbackIndicators : marketIndicators;
  const subtitle = isError ? "Could not load live data. Showing static data." : "Today's key market indicators.";

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-emerald-700">Market Snapshot</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : (
            indicatorsToDisplay.map((indicator) => (
              <MarketIndicatorCard
                key={indicator.title}
                title={indicator.title}
                value={indicator.value}
                change={indicator.change}
                changeSuffix={indicator.changeSuffix}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

// A skeleton component to show while data is loading
const CardSkeleton = () => (
  <div className="p-4 border rounded-lg shadow-md space-y-2 bg-card">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-8 w-32" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export default MarketIndicatorsSection;
