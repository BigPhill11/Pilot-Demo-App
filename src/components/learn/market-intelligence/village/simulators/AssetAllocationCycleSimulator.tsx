import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronRight } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { SimulatorShell } from './simulator-shared';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

type Macro = 'boom' | 'recession';

const AssetAllocationCycleSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [stocks, setStocks] = useState(60);
  const [bonds, setBonds] = useState(30);
  const cash = Math.max(0, 100 - stocks - bonds);
  const [phase, setPhase] = useState<'allocate' | 'pick_macro' | 'result'>('allocate');
  const [macro, setMacro] = useState<Macro | null>(null);
  const [feedback, setFeedback] = useState('');

  const setStocksVal = (v: number) => {
    const room = 100 - bonds;
    setStocks(Math.min(v, room));
  };

  const runCycle = (m: Macro) => {
    setMacro(m);
    setPhase('result');
    if (m === 'boom') {
      if (cash >= 70) {
        setFeedback(
          'Boom cycle: stocks rallied 18% but you held mostly cash. Opportunity cost hurt. Growth assets would have captured the upswing.'
        );
      } else if (stocks >= 50) {
        setFeedback(
          'Boom cycle: your stock allocation captured strong gains. Balanced bonds still provided stability.'
        );
      } else {
        setFeedback(
          'Boom cycle: modest participation. You avoided big losses but lagged aggressive equity holders.'
        );
      }
    } else {
      if (stocks >= 80) {
        setFeedback(
          'Recession cycle: equities fell 25%. Heavy stock weighting crushed portfolio value. Rebalancing toward bonds and cash would have cushioned the hit.'
        );
      } else if (cash >= 50) {
        setFeedback(
          'Recession cycle: you preserved capital. Cash and bonds held up while stocks fell. You sacrificed boom upside for crash protection.'
        );
      } else {
        setFeedback(
          'Recession cycle: diversified mix limited damage. Neither max gain nor max pain. Master allocators adjust weights to goals and cycle.'
        );
      }
    }
  };

  return (
    <SimulatorShell
      simulator={simulator}
      onComplete={onComplete}
      footer={
        phase === 'result' ? (
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={onComplete}>
            Continue to Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      {phase === 'allocate' && (
        <div className="space-y-4">
          <p className="text-xs font-semibold text-gray-700">Set allocation (must total 100%)</p>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Stocks</span>
              <span>{stocks}%</span>
            </div>
            <Slider value={[stocks]} onValueChange={([v]) => setStocksVal(v)} max={100} step={5} />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Bonds</span>
              <span>{bonds}%</span>
            </div>
            <Slider
              value={[bonds]}
              onValueChange={([v]) => setBonds(Math.min(v, 100 - stocks))}
              max={100 - stocks}
              step={5}
            />
          </div>
          <p className="text-xs text-gray-500">Cash equivalents: {cash}%</p>
          <Button
            className="w-full"
            disabled={stocks + bonds > 100}
            onClick={() => setPhase('pick_macro')}
          >
            Lock allocation and enter macro cycle
          </Button>
        </div>
      )}

      {phase === 'pick_macro' && (
        <div className="space-y-2">
          <p className="text-sm text-gray-700">Which environment hits next?</p>
          <Button variant="outline" className="w-full" onClick={() => runCycle('boom')}>
            Boom cycle
          </Button>
          <Button variant="outline" className="w-full" onClick={() => runCycle('recession')}>
            Recession cycle
          </Button>
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase text-gray-500">{macro} scenario</p>
          <p className="text-sm text-gray-700 bg-white rounded-xl p-3 border">{feedback}</p>
        </div>
      )}
    </SimulatorShell>
  );
};

export default AssetAllocationCycleSimulator;
