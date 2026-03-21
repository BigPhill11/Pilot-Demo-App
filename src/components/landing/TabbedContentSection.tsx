
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rss, Calendar, BarChart3 } from 'lucide-react';
import MarketRecapTab from './MarketRecapTab';
import EconomicIndicatorsSection from './EconomicIndicatorsSection';
import IndustryDeepDiveTab from '@/components/learn/IndustryDeepDiveTab';

const TabbedContentSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="market-recap" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="market-recap" className="flex items-center gap-2">
              <Rss className="h-4 w-4" />
              Market Recap
            </TabsTrigger>
            <TabsTrigger value="economic-calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Economic Calendar
            </TabsTrigger>
            <TabsTrigger value="industry-insights" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Industry Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="market-recap">
            <MarketRecapTab />
          </TabsContent>
          
          <TabsContent value="economic-calendar">
            <EconomicIndicatorsSection />
          </TabsContent>
          
          <TabsContent value="industry-insights">
            <IndustryDeepDiveTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabbedContentSection;
