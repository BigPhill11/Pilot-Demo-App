import React from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, Info } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { LearningMomentum } from '@/integrations/supabase/teacherTypes';
import { cn } from '@/lib/utils';

interface LearningMomentumPanelProps {
  momentum: LearningMomentum | undefined;
  loading?: boolean;
}

function shortDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const LearningMomentumPanel: React.FC<LearningMomentumPanelProps> = ({ momentum, loading }) => {
  if (loading) {
    return (
      <Card data-tutorial="teacher-momentum">
        <CardContent className="space-y-4 p-5 sm:p-6">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  const change = momentum?.week_over_week_change ?? null;
  const threshold = 3;
  const direction = change === null ? 'unknown' : change >= threshold ? 'up' : change <= -threshold ? 'down' : 'flat';
  const DirectionIcon =
    direction === 'up' ? ArrowUpRight : direction === 'down' ? ArrowDownRight : ArrowRight;
  const chartData = (momentum?.weeks ?? []).map((week) => ({
    ...week,
    label: shortDate(week.ends_on),
  }));
  const current = momentum?.current_score ?? null;

  return (
    <Card className="overflow-hidden" data-tutorial="teacher-momentum">
      <CardHeader className="border-b bg-gradient-to-r from-emerald-950 to-emerald-800 p-5 text-white sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BrainCircuit className="h-5 w-5 text-emerald-300" />
              Learning Momentum
            </CardTitle>
            <p className="mt-1 max-w-2xl text-sm text-emerald-100/80">
              Are the same students demonstrating more understanding than they did last week?
            </p>
          </div>
          <div className="flex items-end gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-200/70">Current score</p>
              <p className="text-3xl font-bold tabular-nums">{current === null ? '—' : current}</p>
            </div>
            <Badge
              className={cn(
                'mb-1 gap-1 border-0',
                direction === 'up' && 'bg-emerald-300 text-emerald-950',
                direction === 'down' && 'bg-rose-200 text-rose-900',
                direction === 'flat' && 'bg-white/15 text-white',
                direction === 'unknown' && 'bg-white/10 text-white/70'
              )}
            >
              <DirectionIcon className="h-3.5 w-3.5" />
              {change === null ? 'Gathering evidence' : `${change > 0 ? '+' : ''}${change} pts`}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {chartData.every((week) => week.score === null) ? (
          <div className="flex min-h-44 items-center justify-center text-center">
            <div className="max-w-md">
              <p className="font-medium">No learning evidence yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This fills in after students answer at least three scenario questions or complete
                an Ask Phil teach-back.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="momentum-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={0.34} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === 'score' ? `${value}/100` : value,
                    name === 'score' ? 'Learning score' : name,
                  ]}
                  labelFormatter={(_, payload) => {
                    const row = payload?.[0]?.payload;
                    return row
                      ? `${shortDate(row.starts_on)}–${shortDate(row.ends_on)} · ${row.students} students`
                      : '';
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#16a34a"
                  strokeWidth={3}
                  fill="url(#momentum-fill)"
                  connectNulls={false}
                  dot={{ r: 4, fill: '#fff', stroke: '#16a34a', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="mt-3 flex items-start gap-2 border-t pt-4 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <p>
            Each student counts once per week. Their score blends scenario accuracy (70%) with
            Ask Phil teach-back understanding (30%); either source stands alone when the other is
            missing. Week-over-week change uses only the{' '}
            <strong className="text-foreground">{momentum?.paired_students ?? 0} students</strong>{' '}
            with enough evidence in both weeks. Fewer than{' '}
            {momentum?.minimum_paired_students ?? 3} paired students shows “Gathering evidence”
            instead of an unreliable trend.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningMomentumPanel;
