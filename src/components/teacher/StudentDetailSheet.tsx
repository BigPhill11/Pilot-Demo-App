import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Brain,
  Briefcase,
  Flame,
  Layers,
  Loader2,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { useStudentDetail } from '@/hooks/useTeacherDashboard';
import { moduleLabel, trackLabel } from '@/lib/teacherCurriculum';
import { formatLastActive } from '@/lib/teacherMetrics';

interface StudentDetailSheetProps {
  classroomId: string | undefined;
  studentId: string | null;
  onClose: () => void;
}

function groupByType<T extends { module_type: string }>(items: T[]): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const list = map.get(item.module_type) ?? [];
    list.push(item);
    map.set(item.module_type, list);
  }
  return map;
}

const StudentDetailSheet: React.FC<StudentDetailSheetProps> = ({
  classroomId,
  studentId,
  onClose,
}) => {
  const { data, isLoading, error } = useStudentDetail(classroomId, studentId);

  const profile = data?.profile;
  const modulesByType = groupByType(data?.modules ?? []);

  // Concepts this student failed to explain back, most frequent first. This is
  // the one signal the app has about *what* they misunderstand, not just how
  // far they got.
  const conceptGaps = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const session of data?.teach_backs ?? []) {
      for (const fact of session.key_facts_missing ?? []) {
        counts.set(fact, (counts.get(fact) ?? 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [data?.teach_backs]);

  return (
    <Sheet open={!!studentId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : error || !profile ? (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : 'Could not load this student.'}
            </p>
          </div>
        ) : (
          <>
            <SheetHeader className="text-left">
              <SheetTitle>{profile.username ?? 'Unnamed student'}</SheetTitle>
              <SheetDescription>
                Joined {new Date(profile.joined_at ?? profile.created_at ?? '').toLocaleDateString()}
                {' · '}Last active {formatLastActive(profile.last_login_date).toLowerCase()}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Flame, label: 'Streak', value: profile.current_streak, tone: 'text-orange-500' },
                { icon: Sparkles, label: 'XP', value: profile.total_points.toLocaleString(), tone: 'text-amber-500' },
                { icon: Layers, label: 'Modules', value: data.modules.length, tone: 'text-violet-500' },
                { icon: Brain, label: 'Teach-backs', value: profile.teach_backs_completed, tone: 'text-emerald-500' },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl border bg-muted/30 p-3 text-center">
                    <Icon className={`mx-auto mb-1.5 h-4 w-4 ${stat.tone}`} />
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-[11px] text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {conceptGaps.length > 0 && (
              <>
                <Separator className="my-5" />
                <section>
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <TriangleAlert className="h-4 w-4 text-amber-500" />
                    Concepts to revisit
                  </h3>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Points this student could not explain back to Phil.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {conceptGaps.map(([fact, count]) => (
                      <Badge key={fact} variant="outline" className="border-amber-200 bg-amber-50 text-amber-900">
                        {fact}
                        {count > 1 && <span className="ml-1 opacity-60">×{count}</span>}
                      </Badge>
                    ))}
                  </div>
                </section>
              </>
            )}

            <Separator className="my-5" />

            <section>
              <h3 className="mb-3 text-sm font-semibold">Module progress</h3>
              {data.modules.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  This student has not started any modules yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {[...modulesByType.entries()].map(([type, modules]) => (
                    <div key={type}>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {trackLabel(type)}
                      </p>
                      <div className="space-y-2">
                        {modules.map((mod) => (
                          <div key={`${type}-${mod.module_id}`} className="flex items-center gap-3">
                            <span className="w-40 shrink-0 truncate text-sm">
                              {moduleLabel(type, mod.module_id)}
                            </span>
                            <Progress value={mod.progress_percentage} className="h-1.5 flex-1" />
                            <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                              {mod.progress_percentage}%
                            </span>
                            {mod.post_test_score !== null && (
                              <Badge variant="outline" className="shrink-0 text-[10px]">
                                {mod.post_test_score}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {data.careers.length > 0 && (
              <>
                <Separator className="my-5" />
                <section>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Career journeys
                  </h3>
                  <div className="space-y-2">
                    {data.careers.map((career) => (
                      <div key={career.career_id} className="flex items-center gap-3">
                        <span className="w-40 shrink-0 truncate text-sm capitalize">
                          {career.career_id.replace(/-/g, ' ')}
                        </span>
                        <Progress
                          value={Math.min(100, (career.levels_completed / 7) * 100)}
                          className="h-1.5 flex-1"
                        />
                        <span className="w-14 shrink-0 text-right text-xs text-muted-foreground">
                          {career.levels_completed}/7
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {data.recent_xp.length > 0 && (
              <>
                <Separator className="my-5" />
                <section>
                  <h3 className="mb-3 text-sm font-semibold">Recent activity</h3>
                  <ul className="space-y-1.5">
                    {data.recent_xp.slice(0, 10).map((tx, index) => (
                      <li
                        key={`${tx.created_at}-${index}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="truncate capitalize text-muted-foreground">
                          {(tx.source ?? 'activity').replace(/[-_]/g, ' ')}
                        </span>
                        <span className="ml-3 shrink-0 text-xs text-muted-foreground">
                          +{tx.xp_amount} XP · {new Date(tx.created_at).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default StudentDetailSheet;
