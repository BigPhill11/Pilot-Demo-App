import React from 'react';
import type { VillageLesson } from '@/types/village-lesson';
import VillageDecisionSimulator from '../VillageDecisionSimulator';
import NetWorthElasticitySimulator from './NetWorthElasticitySimulator';
import GovernanceSortSimulator from './GovernanceSortSimulator';
import MVPRiskSimulator from './MVPRiskSimulator';
import IndexFundAllocatorSimulator from './IndexFundAllocatorSimulator';
import PortfolioStressTestSimulator from './PortfolioStressTestSimulator';
import CompoundGrowthSlidersSimulator from './CompoundGrowthSlidersSimulator';
import DividendDripSimulator from './DividendDripSimulator';
import AssetAllocationCycleSimulator from './AssetAllocationCycleSimulator';
import MarketPanicHoldSimulator from './MarketPanicHoldSimulator';
import HeadlineExpectationSimulator from './HeadlineExpectationSimulator';
import MacroHeadlinesSimulator from './MacroHeadlinesSimulator';

interface Props {
  lesson: VillageLesson;
  onComplete: () => void;
}

const VillageLessonSimulator: React.FC<Props> = ({ lesson, onComplete }) => {
  const type = lesson.simulatorType ?? 'decision';

  if (type === 'decision') {
    return (
      <VillageDecisionSimulator simulator={lesson.simulator} onComplete={onComplete} />
    );
  }

  const shared = { simulator: lesson.simulator, onComplete };

  switch (type) {
    case 'net-worth-elasticity':
      return <NetWorthElasticitySimulator {...shared} />;
    case 'governance-sort':
      return <GovernanceSortSimulator {...shared} />;
    case 'mvp-risk':
      return <MVPRiskSimulator {...shared} />;
    case 'index-fee-allocator':
      return <IndexFundAllocatorSimulator {...shared} />;
    case 'portfolio-stress-test':
      return <PortfolioStressTestSimulator {...shared} />;
    case 'compound-growth-sliders':
      return <CompoundGrowthSlidersSimulator {...shared} />;
    case 'dividend-drip':
      return <DividendDripSimulator {...shared} />;
    case 'asset-allocation-cycle':
      return <AssetAllocationCycleSimulator {...shared} />;
    case 'market-panic-hold':
      return <MarketPanicHoldSimulator {...shared} />;
    case 'headline-expectation':
      return <HeadlineExpectationSimulator {...shared} />;
    case 'macro-headlines':
      return <MacroHeadlinesSimulator {...shared} />;
    default:
      return (
        <VillageDecisionSimulator simulator={lesson.simulator} onComplete={onComplete} />
      );
  }
};

export default VillageLessonSimulator;
