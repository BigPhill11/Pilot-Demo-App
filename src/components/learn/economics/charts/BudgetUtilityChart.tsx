import React from 'react';
import type { UtilityBudgetChartConfig } from '@/types/economics-charts';
import { CHART_H, CHART_W, ChartFrame, PAD } from './chart-utils';

const BudgetUtilityChart: React.FC<{ config: UtilityBudgetChartConfig }> = ({ config }) => {
  const { stateId, caption } = config;
  const plotW = CHART_W - PAD.l - PAD.r;
  const plotH = CHART_H - PAD.t - PAD.b;

  const render = () => {
    switch (stateId) {
      case 'mu-declining':
      case 'diminishing-mu':
        return [8, 6, 4, 2, 1].map((h, i) => (
          <rect
            key={i}
            x={PAD.l + i * 28}
            y={PAD.t + plotH - h * 12}
            width={22}
            height={h * 12}
            className="fill-emerald-500 opacity-80"
            rx={2}
          />
        ));
      case 'total-vs-marginal':
        return (
          <>
            {[3, 5, 7, 8, 8].map((h, i) => (
              <rect key={`t${i}`} x={PAD.l + i * 32} y={PAD.t + plotH - h * 10} width={20} height={h * 10} className="fill-teal-400" rx={2} />
            ))}
            <text x={PAD.l} y={PAD.t + 12} className="fill-teal-800 text-[9px]">Total utility</text>
            <text x={PAD.l + 160} y={PAD.t + plotH - 20} className="fill-emerald-800 text-[9px]">MU falls</text>
          </>
        );
      case 'budget-line':
      case 'budget-pivot':
      case 'opportunity-cost-slope':
        return (
          <>
            <line x1={PAD.l} y1={PAD.t + plotH} x2={PAD.l + plotW} y2={PAD.t + 20} stroke="#059669" strokeWidth={2.5} />
            <text x={PAD.l + plotW - 8} y={CHART_H - 8} textAnchor="end" className="fill-emerald-700 text-[10px]">Good B</text>
            <text x={PAD.l + 4} y={PAD.t + 14} className="fill-emerald-700 text-[10px]">Good A</text>
            {stateId === 'budget-pivot' && (
              <line x1={PAD.l} y1={PAD.t + plotH} x2={PAD.l + plotW * 0.7} y2={PAD.t + 50} stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 3" />
            )}
          </>
        );
      case 'mu-per-dollar':
      case 'utility-max-rule':
      case 'equal-marginal':
        return (
          <>
            <line x1={PAD.l} y1={PAD.t + plotH} x2={PAD.l + plotW} y2={PAD.t + 30} stroke="#059669" strokeWidth={2} />
            <text x={PAD.l + 20} y={PAD.t + plotH - 30} className="fill-amber-800 text-[10px] font-medium">MUₐ/Pₐ = MUᵦ/Pᵦ</text>
          </>
        );
      case 'consumer-surplus':
      case 'surplus-shrink':
        return (
          <>
            <polyline
              points={`${PAD.l},${PAD.t + plotH} ${PAD.l + plotW},${PAD.t + 30} ${PAD.l + plotW},${PAD.t + plotH}`}
              className="fill-emerald-100 stroke-emerald-600"
              strokeWidth={1.5}
            />
            <line x1={PAD.l + plotW * 0.5} y1={PAD.t + plotH} x2={PAD.l + plotW * 0.5} y2={PAD.t + 55} stroke="#dc2626" strokeWidth={2} strokeDasharray="4 2" />
            <text x={PAD.l + 40} y={PAD.t + 60} className="fill-emerald-700 text-[9px]">Consumer surplus</text>
          </>
        );
      default:
        return <line x1={PAD.l} y1={PAD.t + plotH} x2={PAD.l + plotW} y2={PAD.t + 40} stroke="#059669" strokeWidth={2} />;
    }
  };

  return <ChartFrame caption={caption}>{render()}</ChartFrame>;
};

export default BudgetUtilityChart;
