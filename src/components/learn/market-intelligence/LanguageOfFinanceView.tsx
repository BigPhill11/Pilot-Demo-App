import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ModuleCard from './ModuleCard';
import { useMarketIntelligenceProgress } from '@/hooks/useMarketIntelligenceProgress';
import { MARKET_INTELLIGENCE_CATALOG } from '@/data/market-intelligence/catalog';

/**
 * Language of Finance View
 * 
 * The bridge to careers - learn the terminology that signals insider knowledge.
 * Professional, glossary-style design.
 */
const LanguageOfFinanceView: React.FC = () => {
  const { getModuleProgress, completeModule } = useMarketIntelligenceProgress();
  const modules = MARKET_INTELLIGENCE_CATALOG.languageOfFinance;

  return (
    <div className="space-y-6">
      {/* Section Header - Dictionary/Glossary Theme */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-950 via-orange-900 to-amber-900 border border-amber-500/30">
        {/* Decorative book spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-800 to-amber-700" />
        
        <div className="relative z-10 p-6 pl-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
              <span className="text-3xl">📖</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Language of Finance</h2>
              <p className="text-amber-200/80 max-w-2xl">
                Access, power, and the vocabulary of finance. Learn the key terms that signal 
                insider knowledge and open doors to careers in finance.
              </p>
            </div>
          </div>

          {/* Sample Terms Preview */}
          <div className="mt-4 flex flex-wrap gap-2">
            {['EBITDA', 'DCF', 'P/E Ratio', 'MOAT', 'Alpha', 'Beta', 'Leverage'].map((term) => (
              <span 
                key={term}
                className="px-2 py-1 rounded bg-amber-900/50 border border-amber-600/30 text-amber-200 text-xs font-mono"
              >
                {term}
              </span>
            ))}
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
            theme="glossary"
          />
        ))}
      </div>

      {/* Boss Game Preview */}
      <Card className="border-amber-500/30 bg-gradient-to-br from-amber-950/50 to-orange-950/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h3 className="text-lg font-bold text-white">Boss Game: Phil's Boardroom</h3>
              <p className="text-sm text-amber-300/70">Participate in a mock investment committee meeting</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-400/60">Complete all modules to unlock</span>
            <span className="text-xs px-2 py-1 rounded bg-amber-900/50 text-amber-300">Coming Soon</span>
          </div>
        </CardContent>
      </Card>

      {/* Career Path Connection */}
      <div className="p-4 rounded-lg border border-dashed border-amber-500/30 bg-amber-950/20">
        <div className="flex items-center gap-3">
          <span className="text-xl">🚀</span>
          <div>
            <p className="text-amber-200 text-sm font-medium">
              Ready for the next step?
            </p>
            <p className="text-amber-300/60 text-xs">
              Completing this section prepares you for the Careers in Finance module
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageOfFinanceView;



