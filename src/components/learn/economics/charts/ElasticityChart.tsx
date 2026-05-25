import React from 'react';
import type { ElasticityChartConfig } from '@/types/economics-charts';
import { CHART_H, CHART_W, ChartFrame, Curve, PAD, toX, toY } from './chart-utils';

const PMAX = 10;
const QMAX = 10;

function demandSteep(): string {
  return `${toX(2, QMAX)},${toY(9, PMAX)} ${toX(4, QMAX)},${toY(1, PMAX)}`;
}

function demandFlat(): string {
  return `${toX(1, QMAX)},${toY(8, PMAX)} ${toX(9, QMAX)},${toY(2, PMAX)}`;
}

const ElasticityChart: React.FC<{ config: ElasticityChartConfig }> = ({ config }) => {
  const { stateId, caption } = config;

  const render = () => {
    switch (stateId) {
      case 'inelastic-steep':
        return <Curve color="#059669" label="Inelastic D" points={demandSteep()} />;
      case 'elastic-flat':
        return <Curve color="#059669" label="Elastic D" points={demandFlat()} />;
      case 'perfect-inelastic':
        return (
          <line x1={toX(5, QMAX)} y1={PAD.t} x2={toX(5, QMAX)} y2={CHART_H - PAD.b} stroke="#059669" strokeWidth={2.5} />
        );
      case 'perfect-elastic':
        return (
          <line x1={PAD.l} y1={toY(5, PMAX)} x2={CHART_W - PAD.r} y2={toY(5, PMAX)} stroke="#059669" strokeWidth={2.5} />
        );
      case 'revenue-elastic':
        return (
          <>
            <Curve color="#059669" label="Elastic D" points={demandFlat()} />
            <rect x={toX(3, QMAX)} y={toY(6, PMAX)} width={toX(7, QMAX) - toX(3, QMAX)} height={toY(3, PMAX) - toY(6, PMAX)} className="fill-amber-200/60 stroke-amber-500" strokeWidth={1} />
            <text x={toX(5, QMAX)} y={toY(7.5, PMAX)} className="fill-amber-800 text-[9px]">Revenue ↓ if P↑</text>
          </>
        );
      case 'revenue-inelastic':
        return (
          <>
            <Curve color="#059669" label="Inelastic D" points={demandSteep()} />
            <rect x={toX(2.5, QMAX)} y={toY(7, PMAX)} width={toX(3.5, QMAX) - toX(2.5, QMAX)} height={toY(4, PMAX) - toY(7, PMAX)} className="fill-amber-200/60 stroke-amber-500" strokeWidth={1} />
            <text x={toX(2, QMAX)} y={toY(8, PMAX)} className="fill-amber-800 text-[9px]">Revenue ↑ if P↑</text>
          </>
        );
      case 'cross-complement':
        return (
          <>
            <Curve color="#059669" label="Good A" points={demandFlat()} />
            <Curve color="#7c3aed" label="Good B (complement)" points={`${toX(2, QMAX)},${toY(8, PMAX)} ${toX(8, QMAX)},${toY(3, PMAX)}`} />
            <text x={PAD.l + 4} y={PAD.t + 28} className="fill-violet-700 text-[9px]">Pₐ↓ → Dᵦ→</text>
          </>
        );
      case 'cross-substitute':
        return (
          <>
            <Curve color="#059669" label="Coffee" points={demandFlat()} />
            <Curve color="#dc2626" label="Tea (substitute)" points={demandSteep()} />
            <text x={PAD.l + 4} y={PAD.t + 28} className="fill-red-700 text-[9px]">P coffee↑ → D tea→</text>
          </>
        );
      default:
        return <Curve color="#059669" label="Demand" points={demandFlat()} />;
    }
  };

  return <ChartFrame caption={caption}>{render()}</ChartFrame>;
};

export default ElasticityChart;
