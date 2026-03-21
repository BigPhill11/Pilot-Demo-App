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
      {/* Section Header - Business Window Theme */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-600/50 shadow-2xl">
        {/* Window Title Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/80 border-b border-slate-600/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-slate-300 text-sm font-mono ml-2">business_economics.exe</span>
        </div>

        {/* Window Content */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
              <span className="text-3xl">📊</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Business Economics</h2>
              <p className="text-slate-300 max-w-2xl">
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
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-950/50 to-slate-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌤️</span>
            <div>
              <h3 className="text-lg font-bold text-white">Boss Game: Phil's Economic Weather Report</h3>
              <p className="text-sm text-slate-400">React to economic news and predict their market impact</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Complete all modules to unlock</span>
            <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">Coming Soon</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessEconomicsView;



