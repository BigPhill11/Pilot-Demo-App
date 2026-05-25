import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { SimulatorShell } from './simulator-shared';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

const HEADLINE = 'Tech giant suffers massive data breach; investors flee sector';

const PortfolioStressTestSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [portfolio, setPortfolio] = useState<'concentrated' | 'diversified' | null>(null);
  const [shocked, setShocked] = useState(false);

  const applyShock = () => {
    setShocked(true);
  };

  const concentratedDrop = 40;
  const diversifiedDrop = 2.5;
  const drop = portfolio === 'concentrated' ? concentratedDrop : diversifiedDrop;

  return (
    <SimulatorShell
      simulator={simulator}
      onComplete={onComplete}
      footer={
        shocked ? (
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={onComplete}>
            Continue to Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      {!portfolio && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setPortfolio('concentrated')}
            className="w-full rounded-xl border-2 border-gray-200 p-4 text-left bg-white hover:border-red-300"
          >
            <p className="font-bold text-gray-900">Concentrated (90% one tech stock)</p>
            <p className="text-xs text-gray-500">High conviction, high idiosyncratic risk</p>
          </button>
          <button
            type="button"
            onClick={() => setPortfolio('diversified')}
            className="w-full rounded-xl border-2 border-gray-200 p-4 text-left bg-white hover:border-emerald-300"
          >
            <p className="font-bold text-gray-900">Diversified index basket</p>
            <p className="text-xs text-gray-500">Hundreds of companies and sectors</p>
          </button>
        </div>
      )}

      {portfolio && !shocked && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Portfolio set. Run the stress test headline.
          </p>
          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={applyShock}>
            Breaking: {HEADLINE}
          </Button>
        </div>
      )}

      {shocked && (
        <div className="space-y-3">
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-3">
            <p className="text-xs font-bold text-red-800">{HEADLINE}</p>
          </div>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-red-600">-{drop}%</p>
            <p className="text-sm text-gray-600 mt-1">Portfolio value change</p>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed bg-white rounded-xl p-3 border">
            {portfolio === 'concentrated'
              ? 'One company failure crushed your net worth. Unsystemic risk can be reduced by spreading across industries and geographies.'
              : 'The same headline barely moved a diversified portfolio. You still felt systemic worry, but no single company could sink you.'}
          </p>
        </div>
      )}
    </SimulatorShell>
  );
};

export default PortfolioStressTestSimulator;
