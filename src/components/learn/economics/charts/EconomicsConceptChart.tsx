import React from 'react';
import type { EconomicsChartConfig } from '@/types/economics-charts';
import SupplyDemandChart from './SupplyDemandChart';
import ElasticityChart from './ElasticityChart';
import BudgetUtilityChart from './BudgetUtilityChart';
import MarketStructureChart from './MarketStructureChart';
import MarketFailureChart from './MarketFailureChart';

interface EconomicsConceptChartProps {
  config: EconomicsChartConfig;
  className?: string;
}

const EconomicsConceptChart: React.FC<EconomicsConceptChartProps> = ({ config, className }) => {
  const inner = (() => {
    switch (config.type) {
      case 'supply-demand':
        return <SupplyDemandChart config={config} />;
      case 'elasticity':
        return <ElasticityChart config={config} />;
      case 'utility-budget':
        return <BudgetUtilityChart config={config} />;
      case 'market-structure':
        return <MarketStructureChart config={config} />;
      case 'market-failure':
        return <MarketFailureChart config={config} />;
      default:
        return null;
    }
  })();

  return <div className={className}>{inner}</div>;
};

export default EconomicsConceptChart;
