import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import type { DecisionSimulator } from '@/types/village-lesson';
import { MeterBar, SimulatorShell } from './simulator-shared';

interface Props {
  simulator: DecisionSimulator;
  onComplete: () => void;
}

type Choice = 'mvp' | 'full' | 'overbuild';

const ROUNDS = [
  {
    situation: 'You have $50k saved. A bamboo snack brand idea needs validation.',
    choices: [
      {
        id: 'mvp' as Choice,
        label: 'Ship a simple MVP to 100 customers',
        desc: 'Minimum cash, fast feedback.',
        capital: -10,
        validation: +25,
        risk: -15,
        feedback:
          'You learned what sells before renting a factory. Entrepreneurship upside with controlled downside.',
      },
      {
        id: 'full' as Choice,
        label: 'Lease a store and hire staff immediately',
        desc: 'Big launch, big burn.',
        capital: -35,
        validation: +10,
        risk: +20,
        feedback:
          'Foot traffic was weak. Fixed costs ate your savings. Scaling before demand is a classic failure mode.',
      },
      {
        id: 'overbuild' as Choice,
        label: 'Build a custom app and packaging for 12 months',
        desc: 'Perfect product, no customers yet.',
        capital: -40,
        validation: -5,
        risk: +30,
        feedback:
          'You ran out of runway before selling. Over-investing before validation is one of the top startup killers.',
      },
    ],
  },
  {
    situation: 'Early reviews are mixed. Some love the taste, some want lower price.',
    choices: [
      {
        id: 'mvp' as Choice,
        label: 'Run price tests and interviews',
        desc: 'Iterate on data.',
        capital: -5,
        validation: +20,
        risk: -10,
        feedback: 'You adjusted pricing with evidence. MVP thinking keeps you alive.',
      },
      {
        id: 'full' as Choice,
        label: 'Double ad spend to force growth',
        desc: 'Buy attention.',
        capital: -25,
        validation: +5,
        risk: +15,
        feedback: 'Revenue rose but margins collapsed. Growth without unit economics hurts.',
      },
      {
        id: 'overbuild' as Choice,
        label: 'Pause sales and redesign everything',
        desc: 'Stop revenue to rebuild.',
        capital: -15,
        validation: -10,
        risk: +10,
        feedback: 'Silence killed momentum. Customers moved on while you rebuilt.',
      },
    ],
  },
  {
    situation: 'A competitor copies your flavor. You need a strategic response.',
    choices: [
      {
        id: 'mvp' as Choice,
        label: 'Test a niche flavor only you can serve',
        desc: 'Differentiate small and fast.',
        capital: -8,
        validation: +15,
        risk: -5,
        feedback: 'Loyal niche fans stuck with you. Agility beat their scale temporarily.',
      },
      {
        id: 'full' as Choice,
        label: 'Match them on price across all stores',
        desc: 'Price war.',
        capital: -20,
        validation: 0,
        risk: +20,
        feedback: 'Margins vanished. Price wars favor the bigger balance sheet.',
      },
      {
        id: 'overbuild' as Choice,
        label: 'Raise VC money and expand nationally',
        desc: 'Go big or go home.',
        capital: +15,
        validation: +5,
        risk: +25,
        feedback:
          'You gave up ownership for cash and pressure. Unlimited upside, but dilution and failure risk jumped.',
      },
    ],
  },
];

const MVPRiskSimulator: React.FC<Props> = ({ simulator, onComplete }) => {
  const [round, setRound] = useState(0);
  const [capital, setCapital] = useState(55);
  const [validation, setValidation] = useState(40);
  const [risk, setRisk] = useState(45);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const current = ROUNDS[round];

  const pick = (c: (typeof ROUNDS)[0]['choices'][0]) => {
    setCapital((v) => Math.max(0, Math.min(100, v + c.capital)));
    setValidation((v) => Math.max(0, Math.min(100, v + c.validation)));
    setRisk((v) => Math.max(0, Math.min(100, v + c.risk)));
    setFeedback(c.feedback);
  };

  const advance = () => {
    if (round >= ROUNDS.length - 1) {
      setDone(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
  };

  return (
    <SimulatorShell
      simulator={simulator}
      onComplete={onComplete}
      footer={
        done ? (
          <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={onComplete}>
            Continue to Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      <MeterBar label="Capital runway" emoji="💵" value={capital} colorClass="bg-emerald-500" />
      <MeterBar label="Market validation" emoji="✅" value={validation} colorClass="bg-blue-500" />
      <MeterBar label="Enterprise risk" emoji="⚠️" value={risk} colorClass="bg-red-500" />

      {!done && (
        <>
          <p className="text-sm font-medium text-gray-800 mt-2">{current.situation}</p>
          {!feedback ? (
            <div className="space-y-2">
              {current.choices.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => pick(c)}
                  className="w-full text-left rounded-xl border-2 border-gray-200 p-3 hover:border-orange-300 bg-white"
                >
                  <p className="text-sm font-semibold text-gray-900">{c.label}</p>
                  <p className="text-[11px] text-gray-500">{c.desc}</p>
                </button>
              ))}
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-700 bg-orange-50 rounded-xl p-3 border border-orange-100">
                {feedback}
              </p>
              <Button className="w-full" onClick={advance}>
                {round < ROUNDS.length - 1 ? 'Next round' : 'Finish simulation'}
              </Button>
            </>
          )}
        </>
      )}

      {done && (
        <p className="text-sm text-gray-700">
          {simulator.endMessage}
        </p>
      )}
    </SimulatorShell>
  );
};

export default MVPRiskSimulator;
