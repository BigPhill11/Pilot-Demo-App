import React from 'react';

export const CHART_W = 320;
export const CHART_H = 220;
export const PAD = { l: 48, r: 16, t: 24, b: 40 };

export function toX(q: number, qMax: number): number {
  const plotW = CHART_W - PAD.l - PAD.r;
  return PAD.l + (q / qMax) * plotW;
}

export function toY(p: number, pMax: number): number {
  const plotH = CHART_H - PAD.t - PAD.b;
  return PAD.t + plotH - (p / pMax) * plotH;
}

export function AxisLabels() {
  return (
    <>
      <text x={CHART_W / 2} y={CHART_H - 6} textAnchor="middle" className="fill-emerald-700 text-[11px] font-medium">
        Quantity
      </text>
      <text
        x={14}
        y={CHART_H / 2}
        textAnchor="middle"
        transform={`rotate(-90 14 ${CHART_H / 2})`}
        className="fill-emerald-700 text-[11px] font-medium"
      >
        Price
      </text>
    </>
  );
}

interface CurveProps {
  color: string;
  label: string;
  points: string;
  dashed?: boolean;
}

export function Curve({ color, label, points, dashed }: CurveProps) {
  return (
    <>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeDasharray={dashed ? '6 4' : undefined}
      />
      <text x={CHART_W - PAD.r - 4} y={PAD.t + 14} textAnchor="end" className="fill-current text-[10px] font-semibold" style={{ color }}>
        {label}
      </text>
    </>
  );
}

export function EquilibriumDot({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x} cy={y} r={6} className="fill-amber-500 stroke-white stroke-[2]" />
      <text x={x + 10} y={y - 8} className="fill-amber-800 text-[10px] font-bold">
        E
      </text>
    </>
  );
}

export function ChartFrame({ caption, children }: { caption?: string; children: React.ReactNode }) {
  return (
    <figure className="rounded-xl border border-emerald-200 bg-white p-3 shadow-sm">
      <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full h-auto" role="img" aria-hidden={!caption}>
        <rect x={PAD.l} y={PAD.t} width={CHART_W - PAD.l - PAD.r} height={CHART_H - PAD.t - PAD.b} className="fill-emerald-50/50" rx={4} />
        {children}
        <AxisLabels />
      </svg>
      {caption && <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
