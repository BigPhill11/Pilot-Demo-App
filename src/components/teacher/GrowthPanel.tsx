import React, { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Sprout } from 'lucide-react';
import { useClassGrowthTrend } from '@/hooks/useTeacherDashboard';
import { moduleLabel, trackLabel } from '@/lib/teacherCurriculum';

interface GrowthPanelProps {
  classroomId: string | undefined;
}

type Metric = 'knowledge' | 'decision' | 'confidence';

const METRIC_TABS: { id: Metric; label: string }[] = [
  { id: 'knowledge', label: 'Knowledge score' },
  { id: 'decision', label: 'Decision quality' },
  { id: 'confidence', label: 'Confidence gap' },
];

const chartConfig = {
  before: { label: 'Before', color: 'hsl(var(--muted-foreground))' },
  after: { label: 'After', color: 'hsl(var(--primary))' },
};

const GrowthPanel: React.FC<GrowthPanelProps> = ({ classroomId }) => {
  const { data, isLoading } = useClassGrowthTrend(classroomId);
  const [metric, setMetric] = useState<Metric>('knowledge');

  const modules = data?.by_module ?? [];

  const chartData = useMemo(
    () =>
      modules.map((m) => {
        const before =
          metric === 'knowledge'
            ? m.avg_knowledge_pre
            : metric === 'decision'
            ? m.avg_decision_quality_pre
            : m.avg_confidence_gap_pre;
        const after =
          metric === 'knowledge'
            ? m.avg_knowledge_post
            : metric === 'decision'
            ? m.avg_decision_quality_post
            : m.avg_confidence_gap_post;
        return {
          name: moduleLabel(m.module_type, m.module_id),
          track: trackLabel(m.module_type),
          students: m.students_with_growth_data,
          before: before ?? 0,
          after: after ?? 0,
        };
      }),
    [modules, metric]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border bg-card p-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const hasData = chartData.length > 0;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Student growth</h2>
          </div>
          <Tabs value={metric} onValueChange={(v) => setMetric(v as Metric)}>
            <TabsList>
              {METRIC_TABS.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {!hasData ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Once students finish a module that has a warm-up/wrap-up growth check, their
            before-and-after numbers show up here.
          </p>
        ) : (
          <div className="p-4">
            <p className="mb-4 text-sm text-muted-foreground">
              Class average, before the module started vs. after it was finished, per student who
              completed both checks.
            </p>
            <ChartContainer config={chartConfig} className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 12, right: 24 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    domain={metric === 'confidence' ? undefined : [0, 100]}
                    unit={metric === 'confidence' ? undefined : '%'}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={140}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="top" height={28} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="before" name="Before" fill="var(--color-before)" radius={4} />
                  <Bar dataKey="after" name="After" fill="var(--color-after)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-5 grid gap-x-6 gap-y-1.5 border-t pt-4 sm:grid-cols-2">
              {chartData.map((row) => (
                <div key={row.name} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate">
                    {row.name}
                    <span className="ml-1.5 text-xs text-muted-foreground">{row.track}</span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">
                    {row.students} student{row.students === 1 ? '' : 's'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default GrowthPanel;
