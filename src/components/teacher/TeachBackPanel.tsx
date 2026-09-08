import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, MessageSquareQuote, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTeachBackOverview } from '@/hooks/useTeacherDashboard';
import { lessonLabel } from '@/lib/teacherCurriculum';

interface Props {
  classroomId: string | undefined;
  onSelectStudent?: (studentId: string) => void;
}

/** Understanding scores are 0–100 from the AI grader; these bands match the
 *  70% bar the app already uses to decide whether a teach-back passed. */
function scoreTone(score: number): string {
  if (score >= 80) return 'bg-emerald-100 text-emerald-800';
  if (score >= 60) return 'bg-amber-100 text-amber-800';
  return 'bg-rose-100 text-rose-800';
}

function relativeDay(iso: string | null): string {
  if (!iso) return 'Never';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

/**
 * How well each student explains concepts back to Phil.
 *
 * Teach Phil is the only place a student has to produce an explanation rather
 * than recognise an answer, and the AI grader already scores understanding and
 * records which key facts the explanation left out. That was previously visible
 * only in aggregate across the whole class; this attributes it, so a teacher can
 * see which students can teach a concept and which are still guessing.
 */
const TeachBackPanel: React.FC<Props> = ({ classroomId, onSelectStudent }) => {
  const query = useTeachBackOverview(classroomId);
  const data = query.data;

  if (query.isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading teach-backs…
        </CardContent>
      </Card>
    );
  }

  const summary = data?.summary;
  const students = data?.students ?? [];
  const lessons = data?.lessons ?? [];
  const attempted = students.filter((s) => s.sessions > 0);
  const notStarted = students.filter((s) => s.sessions === 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Mic className="h-4 w-4 text-primary" />
            Teaching concepts back
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Students explain each concept to Phil in their own words and get scored on whether
            the explanation held up. This is the closest measure of real understanding the app
            collects.
          </p>
        </CardHeader>
        <CardContent>
          {!summary || summary.sessions === 0 ? (
            <div className="rounded-xl border border-dashed py-10 text-center">
              <p className="text-sm font-medium">No teach-backs yet</p>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                Teach Phil runs at the end of a lesson. Scores appear here once students reach
                that step.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Sessions', value: summary.sessions },
                { label: 'Students who tried', value: summary.students_attempted },
                { label: 'Avg understanding', value: `${summary.avg_score}%` },
                { label: 'Passed', value: `${summary.pass_rate}%` },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-xl border bg-muted/30 p-3 text-center">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {attempted.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">By student</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-2 font-medium">Student</th>
                    <th className="px-4 py-2 font-medium">Understanding</th>
                    <th className="px-4 py-2 font-medium">Passed</th>
                    <th className="px-4 py-2 font-medium">Lessons</th>
                    <th className="px-4 py-2 font-medium">Last</th>
                    <th className="px-4 py-2 font-medium">Keeps leaving out</th>
                  </tr>
                </thead>
                <tbody>
                  {attempted.map((student) => (
                    <tr
                      key={student.student_id}
                      className="cursor-pointer border-b last:border-0 hover:bg-muted/40"
                      onClick={() => onSelectStudent?.(student.student_id)}
                    >
                      <td className="px-4 py-2.5 font-medium">{student.username}</td>
                      <td className="px-4 py-2.5">
                        <span
                          className={cn(
                            'inline-block rounded-md px-2 py-0.5 text-xs font-semibold',
                            scoreTone(student.avg_score)
                          )}
                        >
                          {student.avg_score}%
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {student.passed_sessions} of {student.sessions}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {student.lessons_attempted}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {relativeDay(student.last_at)}
                      </td>
                      <td className="px-4 py-2.5">
                        {student.top_missed.length === 0 ? (
                          <span className="text-xs text-muted-foreground">Nothing recurring</span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {student.top_missed.slice(0, 2).map((fact) => (
                              <Badge
                                key={fact}
                                variant="outline"
                                className="max-w-[260px] truncate text-[11px] font-normal"
                                title={fact}
                              >
                                {fact}
                              </Badge>
                            ))}
                            {student.top_missed.length > 2 && (
                              <span className="text-[11px] text-muted-foreground">
                                +{student.top_missed.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {notStarted.length > 0 && (
              <p className="border-t px-4 py-3 text-xs text-muted-foreground">
                Not attempted yet: {notStarted.map((s) => s.username).join(', ')}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {lessons.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquareQuote className="h-4 w-4 text-primary" />
              Hardest concepts to explain
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Lessons ranked by how well the class explains them, weakest first, with the facts
              students leave out most often.
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {lessons.map((lesson) => (
                <li key={lesson.lesson_id} className="rounded-xl border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{lessonLabel(lesson.lesson_id)}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'rounded-md px-2 py-0.5 text-xs font-semibold',
                          scoreTone(lesson.avg_score)
                        )}
                      >
                        {lesson.avg_score}% understanding
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {lesson.student_count} student{lesson.student_count === 1 ? '' : 's'} ·{' '}
                        {lesson.pass_rate}% passed
                      </span>
                    </div>
                  </div>

                  {lesson.top_missed.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {lesson.top_missed.map((miss) => (
                        <li
                          key={miss.fact}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-0.5 shrink-0 rounded bg-rose-100 px-1.5 text-[11px] font-semibold text-rose-800">
                            {miss.count}×
                          </span>
                          <span>{miss.fact}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeachBackPanel;
