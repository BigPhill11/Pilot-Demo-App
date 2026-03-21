import React from 'react';
import WallStreetWordMatch from './WallStreetWordMatch';
import DealTypeDetective from './DealTypeDetective';
import DCFBuilderGame from './DCFBuilderGame';
import ValuationBattleGame from './ValuationBattleGame';
import DealCoordinatorGame from './DealCoordinatorGame';
import CrisisManagerGame from './CrisisManagerGame';
import SectorSpecialistGame from './SectorSpecialistGame';
import SectorDetectiveGame from './SectorDetectiveGame';
import ESGInvestmentChallenge from './ESGInvestmentChallenge';
import DivisionDetectiveGame from './DivisionDetectiveGame';
import UnderwritingChallengeGame from './UnderwritingChallengeGame';
import MADealArchitectGame from './MADealArchitectGame';
import CompanyValuationMasterGame from './CompanyValuationMasterGame';
import FutureBankerGame from './FutureBankerGame';
import RevenueGrowthCalculator from '../../evaluation/interactive/RevenueGrowthCalculator';
import MarginComparisonTool from '../../evaluation/interactive/MarginComparisonTool';
import CompanyComparisonMatrix from '../../evaluation/interactive/CompanyComparisonMatrix';
import NewsSentimentAnalyzer from '../../evaluation/interactive/NewsSentimentAnalyzer';
import AnalystRatingDecoder from '../../evaluation/interactive/AnalystRatingDecoder';
import SocialSentimentMeter from '../../evaluation/interactive/SocialSentimentMeter';
import ChecklistBuilderTool from '../../evaluation/interactive/ChecklistBuilderTool';
import RiskRadarGame from '../../evaluation/interactive/RiskRadarGame';
import InvestmentDecisionSimulator from '../../evaluation/interactive/InvestmentDecisionSimulator';

interface GameRendererProps {
  gameId: string;
  completedActivities: string[];
  onComplete: (gameId: string, score?: number) => void;
}

const GameRenderer: React.FC<GameRendererProps> = ({ gameId, completedActivities, onComplete }) => {
  const commonProps = {
    onComplete: (score: number) => onComplete(gameId, score)
  };

  const legacyGameProps = {
    onComplete: onComplete,
    isCompleted: completedActivities.includes(gameId)
  };

  switch (gameId) {
    case 'ib-basics-matching':
      return <WallStreetWordMatch {...legacyGameProps} />;
    case 'deal-type-sorter':
      return <DealTypeDetective {...legacyGameProps} />;
    case 'dcf-builder-game':
      return <DCFBuilderGame {...commonProps} />;
    case 'valuation-battle':
      return <ValuationBattleGame {...commonProps} />;
    case 'deal-coordinator-game':
      return <DealCoordinatorGame {...commonProps} />;
    case 'crisis-manager-game':
      return <CrisisManagerGame {...commonProps} />;
    case 'sector-specialist-game':
      return <SectorSpecialistGame {...commonProps} />;
    case 'sector-detective-game':
      return <SectorDetectiveGame {...commonProps} />;
    case 'esg-investment-challenge':
      return <ESGInvestmentChallenge {...commonProps} />;
    case 'ib-divisions-match':
      return <DivisionDetectiveGame {...commonProps} />;
    case 'underwriting-simulator':
      return <UnderwritingChallengeGame {...commonProps} />;
    case 'ma-deal-builder':
      return <MADealArchitectGame {...commonProps} />;
    case 'valuation-challenge':
      return <CompanyValuationMasterGame {...commonProps} />;
    case 'future-banker-game':
      return <FutureBankerGame {...commonProps} />;
    case 'revenue-growth-calc':
      return <RevenueGrowthCalculator />;
    case 'margin-comparison-tool':
      return <MarginComparisonTool />;
    case 'company-comparison-matrix':
      return <CompanyComparisonMatrix />;
    case 'news-sentiment-analyzer':
      return <NewsSentimentAnalyzer />;
    case 'analyst-rating-decoder':
      return <AnalystRatingDecoder />;
    case 'social-sentiment-meter':
      return <SocialSentimentMeter />;
    case 'checklist-builder-tool':
      return <ChecklistBuilderTool />;
    case 'risk-radar-game':
      return <RiskRadarGame />;
    case 'investment-decision-simulator':
      return <InvestmentDecisionSimulator />;
    default:
      return <div>Game not found</div>;
  }
};

export default GameRenderer;