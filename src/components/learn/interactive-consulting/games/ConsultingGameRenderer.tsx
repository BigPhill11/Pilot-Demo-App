
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import all consulting games
import ConsultingBasicsMatch from './ConsultingBasicsMatch';
import ClientProblemIdentifier from './ClientProblemIdentifier';
import IssueTreeBuilder from './IssueTreeBuilder';
import MECESorter from './MECESorter';
import FiveForcesAnalyzer from './FiveForcesAnalyzer';
import BCGPortfolioManager from './BCGPortfolioManager';
import ProcessOptimizer from './ProcessOptimizer';

// Placeholder components for games not yet fully implemented
const PlaceholderGame: React.FC<{ gameName: string; onComplete: (score: number) => void }> = ({ gameName, onComplete }) => (
  <div className="p-8 text-center space-y-4">
    <h3 className="text-xl font-semibold">{gameName}</h3>
    <p className="text-muted-foreground">This game is coming soon!</p>
    <Button onClick={() => onComplete(100)}>Complete Demo</Button>
  </div>
);

interface ConsultingGameRendererProps {
  gameId: string;
  completedActivities: string[];
  onComplete: (gameId: string, score?: number) => void;
  onBack?: () => void;
}

const ConsultingGameRenderer: React.FC<ConsultingGameRendererProps> = ({
  gameId,
  completedActivities,
  onComplete,
  onBack
}) => {
  const handleGameComplete = (score: number) => {
    onComplete(gameId, score);
  };

  const renderGame = () => {
    switch (gameId) {
      case 'consulting-basics-match':
        return <ConsultingBasicsMatch onComplete={handleGameComplete} />;
      case 'client-problem-identifier':
        return <ClientProblemIdentifier onComplete={handleGameComplete} />;
      case 'issue-tree-builder':
        return <IssueTreeBuilder onComplete={handleGameComplete} />;
      case 'mece-sorter':
        return <MECESorter onComplete={handleGameComplete} />;
      case 'five-forces-analyzer':
        return <FiveForcesAnalyzer onComplete={handleGameComplete} />;
      case 'bcg-portfolio-manager':
        return <BCGPortfolioManager onComplete={handleGameComplete} />;
      case 'process-optimizer':
        return <ProcessOptimizer onComplete={handleGameComplete} />;
      case 'kpi-dashboard-designer':
        return <PlaceholderGame gameName="KPI Dashboard Designer" onComplete={handleGameComplete} />;
      case 'digital-roadmap-builder':
        return <PlaceholderGame gameName="Digital Roadmap Builder" onComplete={handleGameComplete} />;
      case 'customer-journey-optimizer':
        return <PlaceholderGame gameName="Customer Journey Optimizer" onComplete={handleGameComplete} />;
      case 'change-navigator':
        return <PlaceholderGame gameName="Change Navigator" onComplete={handleGameComplete} />;
      case 'stakeholder-orchestrator':
        return <PlaceholderGame gameName="Stakeholder Orchestrator" onComplete={handleGameComplete} />;
      case 'strategic-scenario-planner':
        return <PlaceholderGame gameName="Strategic Scenario Planner" onComplete={handleGameComplete} />;
      case 'board-advisor-simulator':
        return <PlaceholderGame gameName="Board Advisor Simulator" onComplete={handleGameComplete} />;
      default:
        return (
          <div className="p-8 text-center space-y-4">
            <h3 className="text-xl font-semibold text-red-600">Game Not Found</h3>
            <p className="text-muted-foreground">The game "{gameId}" could not be loaded.</p>
            <Button onClick={() => onComplete(gameId, 0)} variant="outline">Return</Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>
      )}
      {renderGame()}
    </div>
  );
};

export default ConsultingGameRenderer;
