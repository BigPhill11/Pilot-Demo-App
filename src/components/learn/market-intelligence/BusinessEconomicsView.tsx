import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ModuleCard from './ModuleCard';
import { useMarketIntelligenceProgress } from '@/hooks/useMarketIntelligenceProgress';
import { MARKET_INTELLIGENCE_CATALOG } from '@/data/market-intelligence/catalog';

/**
 * Business Economics View
 * 
 * Themed as a "business window" with professional corporate styling.
 * Covers micro and macro economics fundamentals.
 */
const BusinessEconomicsView: React.FC = () => {
  const { getModuleProgress, completeModule } = useMarketIntelligenceProgress();
  const modules = MARKET_INTELLIGENCE_CATALOG.businessEconomics;

  return (
    <div className="space-y-6">
      {/* Section Header - Light sage/emerald theme */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border border-green-200 shadow-sm">
        {/* Subtle window accent */}
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100/60 border-b border-green-200">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          </div>
          <span className="text-green-700 text-sm font-medium ml-2">Business Economics</span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-200">
              <span className="text-3xl">📊</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Business Economics</h2>
              <p className="text-green-700/80 max-w-2xl">
                The "how the world works" foundation. Understand supply and demand, market structures, 
                economic cycles, and how interest rates and inflation affect everything.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            progress={getModuleProgress(module.id)}
            onComplete={() => completeModule(module.id)}
            theme="corporate"
          />
        ))}
      </div>

      {/* Boss Game Preview */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌤️</span>
            <div>
              <h3 className="text-lg font-bold text-green-800">Boss Game: Phil's Economic Weather Report</h3>
              <p className="text-sm text-green-600/80">React to economic news and predict their market impact</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600/70">Complete all modules to unlock</span>
            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 border border-green-200">Planned</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessEconomicsView;



