import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ModuleCard from './ModuleCard';
import { useMarketIntelligenceProgress } from '@/hooks/useMarketIntelligenceProgress';
import { MARKET_INTELLIGENCE_CATALOG } from '@/data/market-intelligence/catalog';

/**
 * Markets & Headlines View
 * 
 * Themed as a "newspaper" with classic newspaper styling.
 * Teaches how to read and interpret financial news.
 */
const MarketsHeadlinesView: React.FC = () => {
  const { getModuleProgress, completeModule } = useMarketIntelligenceProgress();
  const modules = MARKET_INTELLIGENCE_CATALOG.marketsHeadlines;

  return (
    <div className="space-y-6">
      {/* Section Header - Newspaper Theme with green accents */}
      <div className="relative overflow-hidden rounded-xl bg-[#faf8f0] border-2 border-green-700 shadow-lg">
        {/* Newspaper Masthead */}
        <div className="border-b-4 border-double border-green-700 p-4 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-green-700 mb-1">
            The Financial Times of Bamboo City
          </div>
          <h2 className="text-4xl font-serif font-black text-green-900 tracking-tight">
            Markets & Headlines
          </h2>
          <div className="text-xs text-green-600 mt-1">
            Vol. XXIII • Learn to Read the Language of Money • Est. 2024
          </div>
        </div>

        {/* Newspaper Content */}
        <div className="p-6 bg-[#faf8f0]">
          <div className="flex gap-4 items-start">
            <span className="text-4xl">📰</span>
            <div>
              <h3 className="text-xl font-serif font-bold text-green-900 mb-2">
                Breaking: Financial Literacy Rates Soar
              </h3>
              <p className="text-green-800/80 font-serif leading-relaxed">
                Learn to decode financial news without panic, separate signal from noise, 
                understand what companies reveal (and hide) in earnings calls, and read market sentiment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards - Newspaper Column Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            progress={getModuleProgress(module.id)}
            onComplete={() => completeModule(module.id)}
            theme="newspaper"
          />
        ))}
      </div>

      {/* Boss Game Preview */}
      <Card className="border-green-700 bg-[#faf8f0]">
        <CardHeader className="pb-3 border-b border-green-200">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📺</span>
            <div>
              <h3 className="text-lg font-serif font-bold text-green-900">
                Boss Game: Phil's News Room
              </h3>
              <p className="text-sm text-green-700/80">Sort headlines by relevance and make informed decisions</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600/70">Complete all modules to unlock</span>
            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 border border-green-200 font-serif">Planned</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketsHeadlinesView;



