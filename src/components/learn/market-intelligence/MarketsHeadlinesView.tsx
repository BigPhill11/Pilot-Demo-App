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
      {/* Section Header - Newspaper Theme */}
      <div className="relative overflow-hidden rounded-xl bg-[#faf8f0] border-2 border-slate-800 shadow-lg">
        {/* Newspaper Masthead */}
        <div className="border-b-4 border-double border-slate-800 p-4 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-slate-600 mb-1">
            The Financial Times of Bamboo City
          </div>
          <h2 className="text-4xl font-serif font-black text-slate-900 tracking-tight">
            Markets & Headlines
          </h2>
          <div className="text-xs text-slate-500 mt-1">
            Vol. XXIII • Learn to Read the Language of Money • Est. 2024
          </div>
        </div>

        {/* Newspaper Content */}
        <div className="p-6 bg-[#faf8f0]">
          <div className="flex gap-4 items-start">
            <span className="text-4xl">📰</span>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
                Breaking: Financial Literacy Rates Soar
              </h3>
              <p className="text-slate-700 font-serif leading-relaxed">
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
      <Card className="border-slate-800 bg-[#faf8f0]">
        <CardHeader className="pb-3 border-b border-slate-300">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📺</span>
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Boss Game: Phil's News Room
              </h3>
              <p className="text-sm text-slate-600">Sort headlines by relevance and make informed decisions</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Complete all modules to unlock</span>
            <span className="text-xs px-2 py-1 rounded bg-slate-200 text-slate-700 font-serif">Coming Soon</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketsHeadlinesView;



