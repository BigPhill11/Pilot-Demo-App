/**
 * Phil's Economic Weather Report — Business Economics boss game.
 * 6 segments: headline → pick forecast graphic + winning sector.
 */
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import BossShell, { BossScoreCard } from './BossShell';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';

interface Segment {
  headline: string;
  forecasts: { id: string; emoji: string; label: string }[];
  correctForecast: string;
  sectors: { id: string; label: string }[];
  correctSector: string;
  explanation: string;
}

const SEGMENTS: Segment[] = [
  {
    headline: 'Fed hikes rates by 0.5% — fastest pace in 15 years',
    forecasts: [
      { id: 'sunny', emoji: '☀️', label: 'Sunny' },
      { id: 'cloudy', emoji: '⛅', label: 'Cloudy' },
      { id: 'storm', emoji: '🌩️', label: 'Storm' },
      { id: 'heat', emoji: '🌡️', label: 'Heatwave' },
    ],
    correctForecast: 'storm',
    sectors: ['Technology', 'Utilities', 'Energy', 'Financials'],
    correctSector: 'Financials',
    explanation: 'Rate hikes hurt growth stocks but help banks (wider net interest margin). Financials tend to win.',
  },
  {
    headline: 'Major oil supply shock — OPEC cuts production 10%',
    forecasts: [
      { id: 'sunny', emoji: '☀️', label: 'Sunny' },
      { id: 'cloudy', emoji: '⛅', label: 'Cloudy' },
      { id: 'storm', emoji: '🌩️', label: 'Storm' },
      { id: 'heat', emoji: '🌡️', label: 'Heatwave' },
    ],
    correctForecast: 'heat',
    sectors: ['Consumer Discretionary', 'Energy', 'Technology', 'Healthcare'],
    correctSector: 'Energy',
    explanation: 'Supply cut raises oil prices. Energy companies earn more when oil is expensive.',
  },
  {
    headline: 'GDP grows 4.2% — strongest quarter in 3 years',
    forecasts: [
      { id: 'sunny', emoji: '☀️', label: 'Sunny' },
      { id: 'cloudy', emoji: '⛅', label: 'Cloudy' },
      { id: 'storm', emoji: '🌩️', label: 'Storm' },
      { id: 'heat', emoji: '🌡️', label: 'Heatwave' },
    ],
    correctForecast: 'sunny',
    sectors: ['Utilities', 'Consumer Discretionary', 'Bonds', 'Gold'],
    correctSector: 'Consumer Discretionary',
    explanation: 'Strong GDP means consumers are spending. Consumer discretionary (restaurants, retail) tends to outperform.',
  },
  {
    headline: 'Unemployment rises to 6.5% — highest since 2016',
    forecasts: [
      { id: 'sunny', emoji: '☀️', label: 'Sunny' },
      { id: 'cloudy', emoji: '⛅', label: 'Cloudy' },
      { id: 'storm', emoji: '🌩️', label: 'Storm' },
      { id: 'heat', emoji: '🌡️', label: 'Heatwave' },
    ],
    correctForecast: 'storm',
    sectors: ['Consumer Staples', 'Crypto', 'Real Estate', 'Technology'],
    correctSector: 'Consumer Staples',
    explanation: 'High unemployment weakens consumer spending on luxuries. Staples (food, household goods) are defensive.',
  },
  {
    headline: 'Inflation falls to 2.1% — first time at target in 2 years',
    forecasts: [
      { id: 'sunny', emoji: '☀️', label: 'Sunny' },
      { id: 'cloudy', emoji: '⛅', label: 'Cloudy' },
      { id: 'storm', emoji: '🌩️', label: 'Storm' },
      { id: 'heat', emoji: '🌡️', label: 'Heatwave' },
    ],
    correctForecast: 'sunny',
    sectors: ['Energy', 'Technology', 'Commodities', 'Cash'],
    correctSector: 'Technology',
    explanation: 'Lower inflation → likely rate cuts → growth stocks (tech) benefit from lower discount rates.',
  },
  {
    headline: 'Consumer confidence hits 15-year low — recession fears surge',
    forecasts: [
      { id: 'sunny', emoji: '☀️', label: 'Sunny' },
      { id: 'cloudy', emoji: '⛅', label: 'Cloudy' },
      { id: 'storm', emoji: '🌩️', label: 'Storm' },
      { id: 'heat', emoji: '🌡️', label: 'Heatwave' },
    ],
    correctForecast: 'storm',
    sectors: ['Airlines', 'Utilities', 'Luxury Retail', 'Restaurants'],
    correctSector: 'Utilities',
    explanation: 'Recession fears push investors to defensive, stable-income sectors like utilities (electricity, water).',
  },
];

interface SegmentState {
  forecastChoice?: string;
  sectorChoice?: string;
  revealed: boolean;
}

interface EconomicWeatherReportProps {
  onComplete: (result: { bambooEarned: number; xpEarned: number }) => void;
  onExit: () => void;
}

const EconomicWeatherReport: React.FC<EconomicWeatherReportProps> = ({ onComplete, onExit }) => {
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [states, setStates] = useState<SegmentState[]>(SEGMENTS.map(() => ({ revealed: false })));
  const [phase, setPhase] = useState<'forecast' | 'sector' | 'reveal'>('forecast');
  const [gameOver, setGameOver] = useState(false);
  const [firstClear] = useState(true);
  const { awardResources } = usePlatformIntegration();

  const seg = SEGMENTS[segmentIndex];
  const state = states[segmentIndex];

  const pickForecast = (id: string) => {
    setStates(prev => { const n = [...prev]; n[segmentIndex] = { ...n[segmentIndex], forecastChoice: id }; return n; });
    setPhase('sector');
  };

  const pickSector = (sector: string) => {
    setStates(prev => { const n = [...prev]; n[segmentIndex] = { ...n[segmentIndex], sectorChoice: sector, revealed: true }; return n; });
    setPhase('reveal');
  };

  const handleNext = () => {
    if (segmentIndex < SEGMENTS.length - 1) {
      setSegmentIndex(i => i + 1);
      setPhase('forecast');
    } else {
      setGameOver(true);
    }
  };

  const score = states.filter((s, i) => {
    const seg = SEGMENTS[i];
    const forecastOk = s.forecastChoice === seg.correctForecast;
    const sectorOk = s.sectorChoice === seg.correctSector;
    return forecastOk && sectorOk;
  }).length;

  const handleContinue = () => {
    awardResources(100, 25, 'Boss: Economic Weather Report', true);
    onComplete({ bambooEarned: 100, xpEarned: 25 });
  };

  const handleReplay = () => {
    setSegmentIndex(0);
    setStates(SEGMENTS.map(() => ({ revealed: false })));
    setPhase('forecast');
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <BossShell title="Phil's Economic Weather Report" icon="🌤️" onExit={onExit}>
        <BossScoreCard
          score={score * 2}
          maxScore={12}
          goldThreshold={75}
          silverThreshold={58}
          onContinue={handleContinue}
          onReplay={handleReplay}
          rewardBamboo={100}
          rewardXp={25}
          firstClear={firstClear}
        />
      </BossShell>
    );
  }

  return (
    <BossShell title="Phil's Economic Weather Report" icon="🌤️" onExit={onExit}>
      <div className="space-y-4">
        <div className="text-xs text-emerald-400 text-center">Segment {segmentIndex + 1} of {SEGMENTS.length}</div>

        {/* TV Frame */}
        <div className="rounded-xl bg-slate-800 border-4 border-slate-600 p-4">
          <div className="flex gap-1 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="bg-slate-900 rounded p-4 text-center">
            <div className="text-xs text-emerald-400 uppercase tracking-widest mb-1">BREAKING NEWS</div>
            <p className="text-white font-bold text-sm leading-snug">{seg.headline}</p>
          </div>
        </div>

        {phase === 'forecast' && (
          <div>
            <p className="text-sm text-emerald-300 text-center mb-3">What\'s the economic forecast?</p>
            <div className="grid grid-cols-2 gap-3">
              {seg.forecasts.map(f => (
                <Button
                  key={f.id}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700 h-14 flex-col"
                  onClick={() => pickForecast(f.id)}
                >
                  <span className="text-2xl">{f.emoji}</span>
                  <span className="text-xs">{f.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {phase === 'sector' && (
          <div>
            <p className="text-sm text-emerald-300 text-center mb-3">Which sector tends to win?</p>
            <div className="grid grid-cols-2 gap-3">
              {seg.sectors.map(sector => (
                <Button
                  key={sector}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700 text-sm"
                  onClick={() => pickSector(sector)}
                >
                  {sector}
                </Button>
              ))}
            </div>
          </div>
        )}

        {phase === 'reveal' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className={cn('p-3 rounded-lg text-center text-sm', state.forecastChoice === seg.correctForecast ? 'bg-emerald-900/50 border border-emerald-500 text-emerald-300' : 'bg-red-900/30 border border-red-500 text-red-300')}>
                <div className="text-lg">{seg.forecasts.find(f => f.id === state.forecastChoice)?.emoji}</div>
                <div>{state.forecastChoice === seg.correctForecast ? '✓ Forecast' : '✗ Forecast'}</div>
              </div>
              <div className={cn('p-3 rounded-lg text-center text-sm', state.sectorChoice === seg.correctSector ? 'bg-emerald-900/50 border border-emerald-500 text-emerald-300' : 'bg-red-900/30 border border-red-500 text-red-300')}>
                <div className="text-lg">📈</div>
                <div>{state.sectorChoice === seg.correctSector ? '✓ Sector' : '✗ Sector'}</div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-600 text-sm text-slate-300">
              <span className="text-emerald-400 font-medium">Right answers: </span>
              {seg.forecasts.find(f => f.id === seg.correctForecast)?.label} · {seg.correctSector}
              <p className="mt-1 text-xs text-slate-400">{seg.explanation}</p>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleNext}>
              {segmentIndex < SEGMENTS.length - 1 ? 'Next Segment' : 'See Results'}
            </Button>
          </div>
        )}
      </div>
    </BossShell>
  );
};

export default EconomicWeatherReport;
