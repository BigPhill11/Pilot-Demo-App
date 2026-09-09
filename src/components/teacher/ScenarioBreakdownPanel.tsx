import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, ChevronDown, Loader2, Target, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuestionBreakdown } from '@/hooks/useTeacherDashboard';
import { lessonLabel, trackLabel } from '@/lib/teacherCurriculum';
import type { QuestionBreakdown } from '@/integrations/supabase/teacherTypes';

interface Props {
  classroomId: string | undefined;
  onSelectStudent?: (studentId: string) => void;
}

// The tracks that record answers, which is narrower than the matrix's columns:
// the MI catalog is a progress surface with no graded questions of its own.
const TRACKS = [
  { value: 'all', label: 'All tracks' },
  { value: 'personal-finance', label: 'Personal Finance' },
  { value: 'market-intelligence', label: 'Market Intelligence' },
  { value: 'economics', label: 'Economics' },
  { value: 'career-readiness', label: 'Career Readiness' },
];

function accuracy(row: QuestionBreakdown): number {
  if (row.response_count === 0) return 0;
  return Math.round((row.correct_count / row.response_count) * 100);
}

/**
 * What each student picked, per scenario.
 *
 * A score tells a teacher that the class missed a question. The option a
 * student chose tells them *why*: if eight of twelve land on the same wrong
 * answer, that is one misconception to address, not eight students to chase.
 * Questions are ordered by how many students missed them, so the top of this
 * list is the lesson plan for tomorrow.
 */
const ScenarioBreakdownPanel: React.FC<Props> = ({ classroomId, onSelectStudent }) => {
  const [track, setTrack] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const query = useQuestionBreakdown(classroomId, track === 'all' ? undefined : track);

  const rows = useMemo(() => query.data ?? [], [query.data]);
  const missedRows = rows.filter((r) => r.correct_count < r.response_count);

  return (
    <Card>
      <CardHeader className="p-4 pb-3 sm:p-6 sm:pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-primary" />
              Where students went wrong
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Every scenario the class has answered, hardest first, with the answer each
              student chose.
            </p>
          </div>
          <Select value={track} onValueChange={setTrack}>
            <SelectTrigger className="w-full sm:w-[190px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRACKS.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        {query.isLoading ? (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading answers…
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-xl border border-dashed py-10 text-center">
            <p className="text-sm font-medium">No scenario answers yet</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              Answers appear here as students work through lesson knowledge checks. Nothing
              recorded before the class started using the app will show up.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>
                <strong className="text-foreground">{rows.length}</strong> questions answered
              </span>
              <span>
                <strong className="text-foreground">{missedRows.length}</strong> with at least
                one wrong answer
              </span>
            </div>

            <ul className="space-y-3">
              {rows.map((row) => {
                const key = `${row.module_type}:${row.lesson_id}:${row.item_id}`;
                const isOpen = expanded === key;
                const pct = accuracy(row);
                const missed = row.response_count - row.correct_count;

                return (
                  <li key={key} className="rounded-xl border">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : key)}
                      className="flex w-full items-start gap-2.5 p-3 text-left hover:bg-muted/40 sm:gap-3 sm:p-4"
                    >
                      <div
                        className={cn(
                          'mt-0.5 flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg text-[11px] font-bold sm:h-11 sm:w-11 sm:text-xs',
                          pct >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : pct >= 50
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                        )}
                      >
                        {pct}%
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug">
                          {row.prompt ?? row.item_id}
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="text-[11px] font-normal">
                            {trackLabel(row.module_type)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {lessonLabel(row.lesson_id)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {row.correct_count} of {row.response_count} correct
                          </span>
                          {missed > 0 && (
                            <span className="text-xs font-medium text-rose-600">
                              {missed} missed
                            </span>
                          )}
                        </div>
                      </div>

                      <ChevronDown
                        className={cn(
                          'mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="space-y-2 border-t bg-muted/20 p-3 sm:p-4">
                        {row.options.map((option) => {
                          const share =
                            row.response_count === 0
                              ? 0
                              : Math.round((option.count / row.response_count) * 100);
                          return (
                            <div
                              key={option.label}
                              className={cn(
                                'rounded-lg border p-3',
                                option.is_correct
                                  ? 'border-emerald-200 bg-emerald-50/60'
                                  : 'border-rose-200 bg-rose-50/50'
                              )}
                            >
                              <div className="flex items-start gap-2">
                                {option.is_correct ? (
                                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                ) : (
                                  <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                                )}
                                <p className="min-w-0 flex-1 text-sm">{option.label}</p>
                                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                                  {option.count} · {share}%
                                </span>
                              </div>

                              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                                <div
                                  className={cn(
                                    'h-full rounded-full',
                                    option.is_correct ? 'bg-emerald-500' : 'bg-rose-400'
                                  )}
                                  style={{ width: `${share}%` }}
                                />
                              </div>

                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {option.students.map((student) => (
                                  <Button
                                    key={student.student_id}
                                    variant="outline"
                                    size="sm"
                                    className="h-6 rounded-full bg-background px-2.5 text-[11px] font-normal"
                                    onClick={() => onSelectStudent?.(student.student_id)}
                                  >
                                    {student.username}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          );
                        })}

                        {row.correct_label && (
                          <p className="pt-1 text-xs text-muted-foreground">
                            Correct answer: {row.correct_label}
                          </p>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ScenarioBreakdownPanel;
