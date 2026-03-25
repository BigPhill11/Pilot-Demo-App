import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ModuleCard from './ModuleCard';
import { useMarketIntelligenceProgress } from '@/hooks/useMarketIntelligenceProgress';
import { MARKET_INTELLIGENCE_CATALOG } from '@/data/market-intelligence/catalog';

/**
 * Ownership View
 * 
 * Focuses on what it means to own assets and build wealth.
 * Clean, confident design emphasizing growth and time.
 */
const OwnershipView: React.FC = () => {
  const { getModuleProgress, completeModule } = useMarketIntelligenceProgress();
  const modules = MARKET_INTELLIGENCE_CATALOG.ownership;

  return (
    <div className="space-y-6">
      {/* Section Header - Light sage/emerald theme */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-200">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 right-4 w-64 h-64 bg-emerald-200 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-48 h-48 bg-green-200 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-200">
              <span className="text-3xl">🏛️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Ownership</h2>
              <p className="text-green-700/80 max-w-2xl">
                The wealth-building mindset. Understand what it truly means to own stock, 
                how time works as your ally, and why patience consistently beats reaction.
              </p>
            </div>
          </div>

          {/* Time Visualization */}
          <div className="mt-6 flex items-center gap-2 text-green-600/80 text-sm">
            <span>📅 Today</span>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-green-400/50 via-emerald-300/40 to-emerald-200/30" />
            <span>🎯 10 Years</span>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-emerald-200/30 via-emerald-300/40 to-green-500/60" />
            <span>🌟 Financial Freedom</span>
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
            theme="wealth"
          />
        ))}
      </div>

      {/* Boss Game Preview */}
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📈</span>
            <div>
              <h3 className="text-lg font-bold text-green-800">Boss Game: Phil's 10-Year Challenge</h3>
              <p className="text-sm text-green-600/80">Simulate holding through market cycles and see compound growth in action</p>
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

export default OwnershipView;



