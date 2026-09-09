import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Loader2, TrendingDown, TriangleAlert } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useClassInsights } from '@/hooks/useTeacherDashboard';
import { moduleLabel, trackLabel } from '@/lib/teacherCurriculum';

interface ClassInsightsPanelProps {
  classroomId: string | undefined;
}

const chartConfig = {
  avgProgress: { label: 'Average progress', color: 'hsl(var(--chart-1))' },
};

/** Red below a third, amber below two thirds, green above. */
function barColor(percent: number): string {
  if (percent < 34) return 'hsl(var(--destructive))';
  if (percent < 67) return 'hsl(38 92% 50%)';
  return 'hsl(var(--primary))';
}

const ClassInsightsPanel: React.FC<ClassInsightsPanelProps> = ({ classroomId }) => {
  const { data, isLoading } = useClassInsights(classroomId);
  const isMobile = useIsMobile();

  // Weakest modules first — a teacher opens this view to find what to reteach,
  // not to admire what already landed.
  const chartData = useMemo(
    () =>
      (data?.modules ?? [])
        .slice()
        .sort((a, b) => a.avg_progress - b.avg_progress)
        .slice(0, 10)
        .map((m) => ({
          name: moduleLabel(m.module_type, m.module_id),
          track: trackLabel(m.module_type),
          avgProgress: m.avg_progress,
          started: m.students_started,
          completed: m.students_completed,
        })),
    [data?.modules]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border bg-card p-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const hasModules = chartData.length > 0;
  const gaps = data?.concept_gaps ?? [];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card">
        <div className="flex items-center gap-2 border-b p-4">
          <TrendingDown className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Where the class is stuck</h2>
        </div>

        {!hasModules ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Once students start working through modules, the weakest areas show up here.
          </p>
        ) : (
          <div className="p-4">
            <p className="mb-4 text-sm text-muted-foreground">
              Average progress across every student who has started each module, lowest first.
            </p>
            <ChartContainer
              config={chartConfig}
              className="h-[280px] w-full sm:h-[320px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ left: isMobile ? 0 : 12, right: isMobile ? 8 : 24 }}
                >
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} unit="%" tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    // Long module names would eat a phone's entire width, so the
                    // label column shrinks and the list below carries the detail.
                    width={isMobile ? 78 : 140}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="avgProgress" radius={4}>
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={barColor(entry.avgProgress)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* The chart already shows depth of progress; this adds the
                headcount behind each bar, which the chart cannot. */}
            <div className="mt-5 grid gap-x-6 gap-y-2 border-t pt-4 sm:grid-cols-2">
              {chartData.map((row) => (
                <div key={row.name} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate">
                    {row.name}
                    <span className="ml-1.5 text-xs text-muted-foreground">{row.track}</span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">
                    {row.completed} of {row.started} finished
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="rounded-2xl border bg-card">
        <div className="flex items-center gap-2 border-b p-4">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <h2 className="font-semibold">Concepts the class keeps missing</h2>
        </div>

        {gaps.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Nothing yet. This fills in as students work through Teach Phil sessions.
          </p>
        ) : (
          <div className="p-4">
            <p className="mb-4 text-sm text-muted-foreground">
              Points students could not explain back to Phil. These are worth reteaching before
              moving on.
            </p>
            <ul className="space-y-2">
              {gaps.map((gap) => (
                <li
                  key={gap.fact}
                  className="flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2"
                >
                  <span className="flex min-w-0 items-center gap-2 text-sm">
                    <TriangleAlert className="h-4 w-4 shrink-0 text-amber-500" />
                    <span className="truncate">{gap.fact}</span>
                  </span>
                  <Badge variant="outline" className="shrink-0 border-amber-300 bg-white text-amber-900">
                    {gap.student_count} student{gap.student_count === 1 ? '' : 's'}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default ClassInsightsPanel;
