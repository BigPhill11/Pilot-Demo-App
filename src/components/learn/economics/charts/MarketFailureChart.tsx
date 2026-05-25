import React from 'react';
import type { MarketFailureChartConfig } from '@/types/economics-charts';
import { ChartFrame, Curve, PAD, toX, toY, CHART_W, CHART_H } from './chart-utils';

const PMAX = 10;
const QMAX = 10;

const MarketFailureChart: React.FC<{ config: MarketFailureChartConfig }> = ({ config }) => {
  const { stateId, caption } = config;

  const render = () => {
    switch (stateId) {
      case 'negative-externality':
      case 'failure-overview':
        return (
          <>
            <Curve color="#059669" label="Private S" points={`${toX(1, QMAX)},${toY(2, PMAX)} ${toX(8, QMAX)},${toY(8, PMAX)}`} />
            <Curve color="#dc2626" label="Social S" points={`${toX(1, QMAX)},${toY(4, PMAX)} ${toX(8, QMAX)},${toY(9, PMAX)}`} dashed />
            <text x={toX(6, QMAX)} y={toY(3, PMAX)} className="fill-red-700 text-[9px]">Too much Q</text>
          </>
        );
      case 'positive-externality':
        return (
          <>
            <Curve color="#059669" label="Private D" points={`${toX(2, QMAX)},${toY(8, PMAX)} ${toX(9, QMAX)},${toY(2, PMAX)}`} />
            <Curve color="#2563eb" label="Social D" points={`${toX(3, QMAX)},${toY(8, PMAX)} ${toX(9.5, QMAX)},${toY(2, PMAX)}`} dashed />
          </>
        );
      case 'tax-wedge':
        return (
          <>
            <Curve color="#059669" label="S" points={`${toX(1, QMAX)},${toY(2, PMAX)} ${toX(8, QMAX)},${toY(8, PMAX)}`} />
            <line x1={toX(4, QMAX)} y1={toY(3, PMAX)} x2={toX(4, QMAX)} y2={toY(7, PMAX)} stroke="#f59e0b" strokeWidth={3} />
            <text x={toX(4.3, QMAX)} y={toY(5, PMAX)} className="fill-amber-700 text-[9px]">Tax</text>
          </>
        );
      case 'public-goods-matrix':
        return (
          <>
            <text x={PAD.l + 60} y={PAD.t + 30} className="fill-emerald-800 text-[10px] font-bold">Rival?</text>
            <text x={PAD.l + 10} y={PAD.t + 70} className="fill-emerald-800 text-[10px]">Yes</text>
            <text x={PAD.l + 10} y={PAD.t + 120} className="fill-emerald-800 text-[10px]">No</text>
            <rect x={PAD.l + 50} y={PAD.t + 50} width={70} height={40} className="fill-red-100 stroke-red-300" rx={4} />
            <text x={PAD.l + 85} y={PAD.t + 75} textAnchor="middle" className="text-[8px]">Private</text>
            <rect x={PAD.l + 130} y={PAD.t + 50} width={70} height={40} className="fill-amber-100 stroke-amber-300" rx={4} />
            <text x={PAD.l + 165} y={PAD.t + 75} textAnchor="middle" className="text-[8px]">Common</text>
            <rect x={PAD.l + 50} y={PAD.t + 100} width={70} height={40} className="fill-blue-100 stroke-blue-300" rx={4} />
            <text x={PAD.l + 85} y={PAD.t + 125} textAnchor="middle" className="text-[8px]">Club</text>
            <rect x={PAD.l + 130} y={PAD.t + 100} width={70} height={40} className="fill-emerald-100 stroke-emerald-400" rx={4} />
            <text x={PAD.l + 165} y={PAD.t + 125} textAnchor="middle" className="text-[8px] font-medium">Public</text>
          </>
        );
      case 'price-ceiling':
        return (
          <>
            <Curve color="#059669" label="D" points={`${toX(2, QMAX)},${toY(8, PMAX)} ${toX(9, QMAX)},${toY(2, PMAX)}`} />
            <Curve color="#0d9488" label="S" points={`${toX(1, QMAX)},${toY(2, PMAX)} ${toX(8, QMAX)},${toY(8, PMAX)}`} />
            <line x1={PAD.l} y1={toY(4, PMAX)} x2={CHART_W - PAD.r} y2={toY(4, PMAX)} stroke="#dc2626" strokeWidth={2} strokeDasharray="6 3" />
            <text x={PAD.l + 4} y={toY(3.5, PMAX)} className="fill-red-600 text-[9px]">Ceiling</text>
          </>
        );
      case 'price-floor':
        return (
          <>
            <Curve color="#059669" label="D" points={`${toX(2, QMAX)},${toY(8, PMAX)} ${toX(9, QMAX)},${toY(2, PMAX)}`} />
            <Curve color="#0d9488" label="S" points={`${toX(1, QMAX)},${toY(2, PMAX)} ${toX(8, QMAX)},${toY(8, PMAX)}`} />
            <line x1={PAD.l} y1={toY(7, PMAX)} x2={CHART_W - PAD.r} y2={toY(7, PMAX)} stroke="#2563eb" strokeWidth={2} strokeDasharray="6 3" />
            <text x={PAD.l + 4} y={toY(6.5, PMAX)} className="fill-blue-600 text-[9px]">Floor</text>
          </>
        );
      case 'information-asymmetry':
        return (
          <>
            <text x={PAD.l + 20} y={PAD.t + 50} className="fill-slate-700 text-[10px]">Seller knows more</text>
            <text x={PAD.l + 20} y={PAD.t + 70} className="fill-slate-600 text-[9px]">Hidden defects → bad deals</text>
            <rect x={PAD.l + 120} y={PAD.t + 40} width={80} height={50} className="fill-amber-100 stroke-amber-400" rx={4} />
            <text x={PAD.l + 160} y={PAD.t + 70} textAnchor="middle" className="text-[8px]">Lemon risk</text>
          </>
        );
      case 'common-resource':
        return (
          <text x={PAD.l + 40} y={PAD.t + 80} className="fill-amber-800 text-[10px]">Overuse without ownership</text>
        );
      default:
        return <Curve color="#059669" label="Market" points={`${toX(2, QMAX)},${toY(8, PMAX)} ${toX(8, QMAX)},${toY(2, PMAX)}`} />;
    }
  };

  return <ChartFrame caption={caption}>{render()}</ChartFrame>;
};

export default MarketFailureChart;
