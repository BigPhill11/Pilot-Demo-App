import React, { useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useActivity } from '@/hooks/useTeacherDashboard';
import type { RosterEntry } from '@/integrations/supabase/teacherTypes';

interface EngagementHeatmapProps {
  classroomId: string | undefined;
  roster: RosterEntry[];
  onSelectStudent: (studentId: string) => void;
}

/** Local calendar dates for the trailing `days` window, oldest first. */
function recentDates(days: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    );
  }
  return out;
}

const WINDOWS = [14, 30] as const;

/**
 * Students down the rows, days across the columns — the most direct answer to
 * "how often is each student actually opening the app". Patterns like a student
 * who only ever signs in on class days are obvious at a glance here in a way
 * they are not in an aggregate number.
 */
const EngagementHeatmap: React.FC<EngagementHeatmapProps> = ({
  classroomId,
  roster,
  onSelectStudent,
}) => {
  const [days, setDays] = useState<number>(14);
  const { data, isLoading } = useActivity(classroomId, days);

  const dates = useMemo(() => recentDates(days), [days]);

  const active = useMemo(() => {
    const set = new Set<string>();
    for (const entry of data ?? []) {
      // login_date can arrive as a full timestamp depending on the driver.
      set.add(`${entry.student_id}::${String(entry.login_date).slice(0, 10)}`);
    }
    return set;
  }, [data]);

  const monthBoundaries = useMemo(() => {
    const labels = new Map<number, string>();
    dates.forEach((date, index) => {
      const day = date.slice(8);
      if (index === 0 || day === '01') {
        labels.set(
          index,
          new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { month: 'short' })
        );
      }
    });
    return labels;
  }, [dates]);

  return (
    <section className="rounded-2xl border bg-card">
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Daily activity</h2>
        </div>
        <Tabs value={String(days)} onValueChange={(v) => setDays(Number(v))}>
          <TabsList>
            {WINDOWS.map((w) => (
              <TabsTrigger key={w} value={String(w)} className="text-xs">
                {w} days
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <p className="p-8 text-center text-sm text-muted-foreground">Loading activity…</p>
      ) : roster.length === 0 ? (
        <p className="p-8 text-center text-sm text-muted-foreground">
          Activity appears once students join the class.
        </p>
      ) : (
        <div className="overflow-x-auto p-3 sm:p-4">
          <table className="border-separate border-spacing-[3px]">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-card pr-3" />
                {dates.map((date, index) => (
                  <th
                    key={date}
                    className="h-4 w-4 text-[9px] font-normal text-muted-foreground"
                  >
                    {monthBoundaries.get(index) ?? ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roster.map((student) => (
                <tr key={student.student_id}>
                  <td className="sticky left-0 z-10 bg-card pr-3">
                    <button
                      type="button"
                      onClick={() => onSelectStudent(student.student_id)}
                      className="max-w-[6.5rem] truncate text-left text-xs hover:text-primary hover:underline sm:max-w-[10rem]"
                    >
                      {student.username ?? 'Unnamed'}
                    </button>
                  </td>
                  {dates.map((date) => {
                    const wasActive = active.has(`${student.student_id}::${date}`);
                    return (
                      <td key={date}>
                        <div
                          className={cn(
                            'h-4 w-4 rounded-[3px]',
                            wasActive ? 'bg-emerald-500' : 'bg-muted'
                          )}
                          title={`${student.username ?? 'Unnamed'} · ${date}: ${
                            wasActive ? 'signed in' : 'no activity'
                          }`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-[3px] bg-emerald-500" /> Signed in
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-[3px] bg-muted" /> No activity
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default EngagementHeatmap;
