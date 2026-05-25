import React from 'react';
import type { MarketStructureChartConfig } from '@/types/economics-charts';
import { ChartFrame, Curve, PAD, toX, toY, CHART_W, CHART_H } from './chart-utils';

const PMAX = 10;
const QMAX = 10;

const MarketStructureChart: React.FC<{ config: MarketStructureChartConfig }> = ({ config }) => {
  const { stateId, caption } = config;
  const plotW = CHART_W - PAD.l - PAD.r;

  const render = () => {
    switch (stateId) {
      case 'spectrum':
        return (
          <>
            {['Perfect', 'Monopolistic', 'Oligopoly', 'Monopoly'].map((label, i) => (
              <g key={label}>
                <rect x={PAD.l + i * (plotW / 4)} y={PAD.t + 40} width={plotW / 4 - 4} height={40} className="fill-emerald-100 stroke-emerald-400" rx={4} />
                <text x={PAD.l + i * (plotW / 4) + (plotW / 8)} y={PAD.t + 65} textAnchor="middle" className="fill-emerald-800 text-[8px] font-medium">
                  {label}
                </text>
              </g>
            ))}
            <text x={CHART_W / 2} y={PAD.t + 20} textAnchor="middle" className="fill-emerald-700 text-[10px]">
              Competition →
            </text>
          </>
        );
      case 'perfect-competition':
      case 'price-taker':
        return (
          <>
            <line x1={PAD.l} y1={toY(5, PMAX)} x2={CHART_W - PAD.r} y2={toY(5, PMAX)} stroke="#64748b" strokeWidth={2} />
            <text x={PAD.l + 4} y={toY(5.8, PMAX)} className="fill-slate-600 text-[9px]">Market price</text>
            <line x1={toX(5, QMAX)} y1={PAD.t} x2={toX(5, QMAX)} y2={CHART_H - PAD.b} stroke="#059669" strokeWidth={2.5} />
            <text x={toX(5.5, QMAX)} y={PAD.t + 14} className="fill-emerald-700 text-[9px]">Firm D (horizontal)</text>
          </>
        );
      case 'monopolistic':
      case 'oligopoly':
        return <Curve color="#059669" label="Firm demand" points={`${toX(2, QMAX)},${toY(9, PMAX)} ${toX(8, QMAX)},${toY(2, PMAX)}`} />;
      case 'monopoly-firm-demand':
        return <Curve color="#7c3aed" label="Market D" points={`${toX(1, QMAX)},${toY(9, PMAX)} ${toX(9, QMAX)},${toY(1, PMAX)}`} />;
      case 'monopoly-mr':
        return (
          <>
            <Curve color="#7c3aed" label="D" points={`${toX(1, QMAX)},${toY(9, PMAX)} ${toX(9, QMAX)},${toY(1, PMAX)}`} />
            <Curve color="#dc2626" label="MR" points={`${toX(1, QMAX)},${toY(9, PMAX)} ${toX(5, QMAX)},${toY(1, PMAX)}`} dashed />
          </>
        );
      case 'deadweight-loss':
        return (
          <>
            <Curve color="#7c3aed" label="D" points={`${toX(1, QMAX)},${toY(9, PMAX)} ${toX(9, QMAX)},${toY(1, PMAX)}`} />
            <polygon points={`${toX(4, QMAX)},${toY(6, PMAX)} ${toX(6, QMAX)},${toY(4, PMAX)} ${toX(5, QMAX)},${toY(5, PMAX)}`} className="fill-red-200/70 stroke-red-400" />
            <text x={toX(4.5, QMAX)} y={toY(5.5, PMAX)} className="fill-red-700 text-[8px]">DWL</text>
          </>
        );
      default:
        return null;
    }
  };

  return <ChartFrame caption={caption}>{render()}</ChartFrame>;
};

export default MarketStructureChart;
