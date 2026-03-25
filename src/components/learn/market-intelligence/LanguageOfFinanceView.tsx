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
      {/* Section Header - Glossary Theme with sage/emerald */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border border-green-200">
        {/* Decorative book spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-green-300 to-emerald-200" />
        
        <div className="relative z-10 p-6 pl-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-200">
              <span className="text-3xl">📖</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Language of Finance</h2>
              <p className="text-green-700/80 max-w-2xl">
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
                className="px-2 py-1 rounded bg-green-100 border border-green-200 text-green-700 text-xs font-mono"
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
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h3 className="text-lg font-bold text-green-800">Boss Game: Phil's Boardroom</h3>
              <p className="text-sm text-green-600/80">Participate in a mock investment committee meeting</p>
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

      {/* Career Path Connection */}
      <div className="p-4 rounded-lg border border-dashed border-green-300 bg-green-50/50">
        <div className="flex items-center gap-3">
          <span className="text-xl">🚀</span>
          <div>
            <p className="text-green-800 text-sm font-medium">
              Ready for the next step?
            </p>
            <p className="text-green-600/70 text-xs">
              Completing this section prepares you for the Careers in Finance module
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageOfFinanceView;



