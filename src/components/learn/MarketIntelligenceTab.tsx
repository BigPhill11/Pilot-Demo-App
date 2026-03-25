import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Newspaper, 
  Building2, 
  Languages, 
  Heart,
  Flame,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import BusinessEconomicsView from './market-intelligence/BusinessEconomicsView';
import MarketsHeadlinesView from './market-intelligence/MarketsHeadlinesView';
import OwnershipView from './market-intelligence/OwnershipView';
import LanguageOfFinanceView from './market-intelligence/LanguageOfFinanceView';
import CompanyTinderView from './market-intelligence/CompanyTinderView';
import { useMarketIntelligenceProgress } from '@/hooks/useMarketIntelligenceProgress';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { recordPathTouched } from '@/hooks/useDashboardProgress';
import { useIsMobile } from '@/hooks/use-mobile';

const MarketIntelligenceTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('business-economics');
  const { overallProgress, getNextIncompleteModule } = useMarketIntelligenceProgress();
  const { currentStreak } = useUnifiedStreak();
  const isMobile = useIsMobile();

  // Track that user visited this tab for dashboard goal prioritization
  useEffect(() => {
    recordPathTouched('companyDiscovery');
  }, []);

  const handleContinueLearning = () => {
    const nextModule = getNextIncompleteModule();
    if (nextModule) {
      setActiveSubTab(nextModule.sectionId);
    }
  };

  const subTabs = [
    {
      id: 'business-economics',
      label: isMobile ? 'Economics' : 'Business Economics',
      icon: TrendingUp,
      description: 'Micro & macro economics fundamentals',
    },
    {
      id: 'markets-headlines',
      label: isMobile ? 'Headlines' : 'Markets & Headlines',
      icon: Newspaper,
      description: 'Reading financial news like a pro',
    },
    {
      id: 'ownership',
      label: 'Ownership',
      icon: Building2,
      description: 'Understanding what you own',
    },
    {
      id: 'language-finance',
      label: isMobile ? 'Language' : 'Language of Finance',
      icon: Languages,
      description: 'Key terms that signal expertise',
    },
    {
      id: 'company-tinder',
      label: isMobile ? 'Tinder' : 'Company Tinder',
      icon: Heart,
      description: 'Practice investment decisions',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header - Light sage/emerald theme matching dashboard */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border border-green-300 p-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 border border-emerald-200">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-green-800">
                  Market Intelligence
                </h1>
                <p className="text-green-600/80 text-sm md:text-base">
                  Learn to read markets and make informed investment decisions
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Streak Badge */}
            {currentStreak > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">{currentStreak} day streak</span>
              </div>
            )}

            {/* Progress Summary */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 border border-green-200">
              <span className="text-sm text-green-700">Progress:</span>
              <span className="text-sm font-bold text-green-800">{overallProgress}%</span>
            </div>

            {/* Continue Button */}
            <Button 
              onClick={handleContinueLearning}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Continue
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-5 h-auto' : 'grid-cols-5'}`}>
          {subTabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id} 
              className={`flex items-center gap-2 ${isMobile ? 'flex-col text-xs py-3 px-1' : ''}`}
            >
              <tab.icon className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4'}`} />
              <span className={isMobile ? 'text-[10px] leading-tight text-center' : ''}>
                {tab.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="business-economics" className="mt-6">
          <BusinessEconomicsView />
        </TabsContent>

        <TabsContent value="markets-headlines" className="mt-6">
          <MarketsHeadlinesView />
        </TabsContent>

        <TabsContent value="ownership" className="mt-6">
          <OwnershipView />
        </TabsContent>

        <TabsContent value="language-finance" className="mt-6">
          <LanguageOfFinanceView />
        </TabsContent>

        <TabsContent value="company-tinder" className="mt-6">
          <CompanyTinderView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketIntelligenceTab;



