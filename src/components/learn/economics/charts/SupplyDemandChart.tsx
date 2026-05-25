import React from 'react';
import type { SupplyDemandChartConfig } from '@/types/economics-charts';
import { ChartFrame, Curve, EquilibriumDot, toX, toY } from './chart-utils';

const PMAX = 10;
const QMAX = 10;

function demandPoints(shift: number): string {
  const q0 = 2 + shift;
  const q1 = 9 + shift;
  return `${toX(q0, QMAX)},${toY(9, PMAX)} ${toX(q1, QMAX)},${toY(1, PMAX)}`;
}

function supplyPoints(shift: number): string {
  const q0 = 1 + shift;
  const q1 = 8 + shift;
  return `${toX(q0, QMAX)},${toY(1, PMAX)} ${toX(q1, QMAX)},${toY(9, PMAX)}`;
}

const SupplyDemandChart: React.FC<{ config: SupplyDemandChartConfig }> = ({ config }) => {
  const { stateId, caption } = config;
  const eqQ = 5.5;
  const eqP = 5;

  const render = () => {
    switch (stateId) {
      case 'demand-curve':
        return <Curve color="#059669" label="Demand (D)" points={demandPoints(0)} />;
      case 'movement-along-demand':
        return (
          <>
            <Curve color="#059669" label="Demand (D)" points={demandPoints(0)} />
            <circle cx={toX(4, QMAX)} cy={toY(7, PMAX)} r={4} className="fill-emerald-600" />
            <circle cx={toX(7, QMAX)} cy={toY(3, PMAX)} r={4} className="fill-emerald-400" />
            <text x={toX(5.5, QMAX)} y={toY(8, PMAX)} className="fill-emerald-800 text-[9px]">Higher P → less Q</text>
          </>
        );
      case 'demand-shift-right':
        return (
          <>
            <Curve color="#94a3b8" label="D₁" points={demandPoints(0)} dashed />
            <Curve color="#059669" label="D₂" points={demandPoints(1.5)} />
            <text x={toX(8, QMAX)} y={toY(2, PMAX)} className="fill-emerald-700 text-[9px]">→ shift</text>
          </>
        );
      case 'demand-shift-left':
        return (
          <>
            <Curve color="#94a3b8" label="D₁" points={demandPoints(0)} dashed />
            <Curve color="#059669" label="D₂" points={demandPoints(-1.5)} />
            <text x={toX(3, QMAX)} y={toY(8, PMAX)} className="fill-emerald-700 text-[9px]">← shift</text>
          </>
        );
      case 'supply-curve':
        return <Curve color="#0d9488" label="Supply (S)" points={supplyPoints(0)} />;
      case 'movement-along-supply':
        return (
          <>
            <Curve color="#0d9488" label="Supply (S)" points={supplyPoints(0)} />
            <circle cx={toX(3, QMAX)} cy={toY(3, PMAX)} r={4} className="fill-teal-600" />
            <circle cx={toX(6, QMAX)} cy={toY(7, PMAX)} r={4} className="fill-teal-400" />
          </>
        );
      case 'supply-shift-right':
        return (
          <>
            <Curve color="#94a3b8" label="S₁" points={supplyPoints(0)} dashed />
            <Curve color="#0d9488" label="S₂" points={supplyPoints(1.5)} />
          </>
        );
      case 'supply-shift-left':
        return (
          <>
            <Curve color="#94a3b8" label="S₁" points={supplyPoints(0)} dashed />
            <Curve color="#0d9488" label="S₂" points={supplyPoints(-1.5)} />
          </>
        );
      case 'equilibrium':
        return (
          <>
            <Curve color="#059669" label="D" points={demandPoints(0)} />
            <Curve color="#0d9488" label="S" points={supplyPoints(0)} />
            <EquilibriumDot x={toX(eqQ, QMAX)} y={toY(eqP, PMAX)} />
          </>
        );
      case 'shortage':
        return (
          <>
            <Curve color="#059669" label="D" points={demandPoints(0)} />
            <Curve color="#0d9488" label="S" points={supplyPoints(0)} />
            <line x1={toX(eqQ, QMAX)} y1={toY(3, PMAX)} x2={toX(eqQ, QMAX)} y2={toY(eqP, PMAX)} stroke="#dc2626" strokeWidth={2} strokeDasharray="4 2" />
            <text x={toX(eqQ + 0.5, QMAX)} y={toY(4, PMAX)} className="fill-red-600 text-[9px] font-medium">Shortage</text>
          </>
        );
      case 'surplus':
        return (
          <>
            <Curve color="#059669" label="D" points={demandPoints(0)} />
            <Curve color="#0d9488" label="S" points={supplyPoints(0)} />
            <line x1={toX(eqQ, QMAX)} y1={toY(eqP, PMAX)} x2={toX(eqQ, QMAX)} y2={toY(8, PMAX)} stroke="#2563eb" strokeWidth={2} strokeDasharray="4 2" />
            <text x={toX(eqQ + 0.5, QMAX)} y={toY(7.5, PMAX)} className="fill-blue-600 text-[9px] font-medium">Surplus</text>
          </>
        );
      case 'demand-increase-equilibrium':
        return (
          <>
            <Curve color="#94a3b8" label="D₁" points={demandPoints(0)} dashed />
            <Curve color="#059669" label="D₂" points={demandPoints(1.2)} />
            <Curve color="#0d9488" label="S" points={supplyPoints(0)} />
            <EquilibriumDot x={toX(6.2, QMAX)} y={toY(5.8, PMAX)} />
          </>
        );
      case 'supply-increase-equilibrium':
        return (
          <>
            <Curve color="#059669" label="D" points={demandPoints(0)} />
            <Curve color="#94a3b8" label="S₁" points={supplyPoints(0)} dashed />
            <Curve color="#0d9488" label="S₂" points={supplyPoints(1.2)} />
            <EquilibriumDot x={toX(6.5, QMAX)} y={toY(4.2, PMAX)} />
          </>
        );
      default:
        return null;
    }
  };

  return <ChartFrame caption={caption}>{render()}</ChartFrame>;
};

export default SupplyDemandChart;
