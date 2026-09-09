/**
 * Turns the dashboard's raw feeds into the story a class report has to tell:
 * how the class is doing, whether that is getting better or worse, what to
 * reteach, what is already working, and what to do next.
 *
 * All of it is pure so the wording and the thresholds can be reasoned about
 * without a PDF in the way.
 */

import type {
  ActivityEntry,
  ClassInsights,
  QuestionBreakdown,
  RosterEntry,
  TeachBackOverview,
  TeacherClassroomSummary,
} from '@/integrations/supabase/teacherTypes';
import { lessonLabel, moduleLabel, trackLabel } from '@/lib/teacherCurriculum';
import { daysSince, studentStatus, summarizeClass } from '@/lib/teacherMetrics';

/** A question is only worth reporting on once a few students have seen it. */
const MIN_RESPONSES = 3;
/** Below this, a question counts as "the class missed this". */
const STRUGGLE_ACCURACY = 60;
/** At or above this, it counts as landed. */
const STRONG_ACCURACY = 85;
/** Days without a sign-in before a student is called dormant. */
const DORMANT_DAYS = 14;

export interface ReportWeek {
  label: string;
  /** Distinct students who signed in at least once that week. */
  activeStudents: number;
  /** Total sign-in days across the class that week. */
  signIns: number;
}

export interface ReportQuestion {
  prompt: string;
  lesson: string;
  track: string;
  accuracy: number;
  responses: number;
  missed: number;
  correctLabel: string | null;
  /** The wrong answer the most students landed on, when there is one. */
  topWrong: { label: string; count: number } | null;
}

export interface ReportModule {
  name: string;
  track: string;
  avgProgress: number;
  started: number;
  completed: number;
}

export interface ReportAction {
  title: string;
  detail: string;
}

export interface ClassReport {
  meta: {
    className: string;
    school: string | null;
    term: string | null;
    joinCode: string;
    generatedAt: Date;
    windowDays: number;
  };
  headline: {
    students: number;
    activeLast7: number;
    avgModulesCompleted: number;
    avgProgress: number;
    avgStreak: number;
    needsAttention: number;
    totalXp: number;
  };
  usage: {
    weeks: ReportWeek[];
    avgDaysActive: number;
    trend: 'up' | 'down' | 'flat' | 'unknown';
    summary: string;
    dormant: Array<{ name: string; days: number | null }>;
  };
  mastery: {
    scenarioAccuracy: number | null;
    questionsAnswered: number;
    answersRecorded: number;
    teachBack: {
      sessions: number;
      students: number;
      avgScore: number;
      passRate: number;
      retryGain: number;
    } | null;
    summary: string;
  };
  struggles: {
    questions: ReportQuestion[];
    concepts: Array<{ fact: string; students: number; misses: number }>;
    modules: ReportModule[];
    lessons: Array<{ lesson: string; avgScore: number; passRate: number; students: number }>;
  };
  strengths: {
    questions: ReportQuestion[];
    modules: ReportModule[];
    students: Array<{ name: string; note: string }>;
    notes: string[];
  };
  roster: Array<{
    name: string;
    status: string;
    lastActive: string;
    daysActive: number;
    modulesCompleted: number;
    avgProgress: number;
    streak: number;
  }>;
  actions: ReportAction[];
  /** Two or three sentences for a teacher who reads nothing else. */
  synopsis: string;
}

export interface ReportInput {
  classroom: TeacherClassroomSummary;
  roster: RosterEntry[];
  activity: ActivityEntry[];
  insights: ClassInsights | null;
  questions: QuestionBreakdown[];
  teachBack: TeachBackOverview | null;
  windowDays?: number;
  now?: Date;
}

function accuracyOf(row: QuestionBreakdown): number {
  if (row.response_count === 0) return 0;
  return Math.round((row.correct_count / row.response_count) * 100);
}

function toReportQuestion(row: QuestionBreakdown): ReportQuestion {
  const wrong = row.options
    .filter((o) => !o.is_correct)
    .sort((a, b) => b.count - a.count)
    .find((o) => o.count > 0);

  return {
    prompt: row.prompt ?? row.item_id,
    lesson: lessonLabel(row.lesson_id),
    track: trackLabel(row.module_type),
    accuracy: accuracyOf(row),
    responses: row.response_count,
    missed: row.response_count - row.correct_count,
    correctLabel: row.correct_label,
    topWrong: wrong ? { label: wrong.label, count: wrong.count } : null,
  };
}

/**
 * Buckets sign-ins into trailing 7-day weeks, newest last.
 *
 * Week-over-week attendance is the only trend the data actually supports:
 * progress is stored as a current value per module with no history, so there is
 * no honest way to chart "the class improved 12% this month". Saying so plainly
 * beats inventing a number.
 */
function buildWeeks(activity: ActivityEntry[], windowDays: number, now: Date): ReportWeek[] {
  const weekCount = Math.max(1, Math.floor(windowDays / 7));
  const weeks: ReportWeek[] = [];
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  for (let i = weekCount - 1; i >= 0; i -= 1) {
    const end = new Date(startOfToday);
    end.setDate(end.getDate() - i * 7);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);

    const students = new Set<string>();
    let signIns = 0;

    for (const entry of activity) {
      const day = new Date(`${String(entry.login_date).slice(0, 10)}T00:00:00`);
      if (Number.isNaN(day.getTime())) continue;
      if (day < start || day > end) continue;
      students.add(entry.student_id);
      signIns += 1;
    }

    weeks.push({
      label:
        i === 0
          ? 'This week'
          : `${start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`,
      activeStudents: students.size,
      signIns,
    });
  }

  return weeks;
}

function describeTrend(weeks: ReportWeek[], students: number): {
  trend: ClassReport['usage']['trend'];
  summary: string;
} {
  const withData = weeks.filter((w) => w.signIns > 0);
  if (withData.length < 2) {
    return {
      trend: 'unknown',
      summary:
        'Not enough history yet to call a trend. Two full weeks of use will make this section meaningful.',
    };
  }

  const latest = weeks[weeks.length - 1];
  const previous = weeks[weeks.length - 2];
  const delta = latest.signIns - previous.signIns;
  const pct = previous.signIns === 0 ? 100 : Math.round((delta / previous.signIns) * 100);

  if (Math.abs(pct) < 10) {
    return {
      trend: 'flat',
      summary: `Use is holding steady: ${latest.signIns} sign-ins this week against ${previous.signIns} last week, with ${latest.activeStudents} of ${students} students showing up.`,
    };
  }

  if (delta > 0) {
    return {
      trend: 'up',
      summary: `Use is up ${pct}% week over week — ${latest.signIns} sign-ins against ${previous.signIns} last week, from ${latest.activeStudents} of ${students} students.`,
    };
  }

  return {
    trend: 'down',
    summary: `Use is down ${Math.abs(pct)}% week over week — ${latest.signIns} sign-ins against ${previous.signIns} last week. Only ${latest.activeStudents} of ${students} students opened the app.`,
  };
}

function buildSynopsis(report: Omit<ClassReport, 'actions' | 'synopsis'>): string {
  const { headline, usage, mastery, struggles } = report;

  if (headline.students === 0) {
    return 'No students have joined this class yet. Share the join code and this report fills in as soon as they start.';
  }

  const parts: string[] = [];
  parts.push(
    `${headline.activeLast7} of ${headline.students} students used the app in the last 7 days, averaging ${usage.avgDaysActive} active days each over the last month and ${headline.avgModulesCompleted} modules completed.`
  );

  if (usage.trend !== 'unknown') {
    parts.push(usage.summary);
  }

  if (struggles.questions.length > 0) {
    const worst = struggles.questions[0];
    parts.push(
      `The weakest spot is ${worst.lesson}, where the class is ${worst.accuracy}% correct.`
    );
  } else if (mastery.scenarioAccuracy !== null) {
    parts.push(
      `Nothing is failing badly enough to flag: scenario accuracy sits at ${mastery.scenarioAccuracy}%.`
    );
  }

  if (headline.needsAttention > 0) {
    parts.push(
      `${headline.needsAttention} student${headline.needsAttention === 1 ? '' : 's'} need${headline.needsAttention === 1 ? 's' : ''} attention — see the roster on the last page.`
    );
  }

  return parts.join(' ');
}

function buildActions(report: Omit<ClassReport, 'actions' | 'synopsis'>): ReportAction[] {
  const actions: ReportAction[] = [];
  const { struggles, usage, mastery, headline, strengths } = report;

  // Hardest question first: it is the most specific thing a teacher can act on.
  const worst = struggles.questions[0];
  if (worst) {
    const wrong = worst.topWrong;
    actions.push({
      title: `Reteach ${worst.lesson} before moving on`,
      detail: wrong
        ? `Only ${worst.accuracy}% of the class got "${worst.prompt}" right, and ${wrong.count} of ${worst.responses} picked "${wrong.label}". That is one misconception to correct, not ${worst.missed} students to chase individually.`
        : `Only ${worst.accuracy}% of the class got "${worst.prompt}" right, across ${worst.responses} answers.`,
    });
  }

  const topConcept = struggles.concepts[0];
  if (topConcept) {
    actions.push({
      title: `Open with "${topConcept.fact}"`,
      detail: `${topConcept.students} student${topConcept.students === 1 ? '' : 's'} left this out when explaining the concept back in their own words. Students can often pick the right answer without being able to say why — this is where that shows up.`,
    });
  }

  if (usage.dormant.length > 0) {
    const names = usage.dormant.slice(0, 6).map((d) => d.name).join(', ');
    const more = usage.dormant.length > 6 ? ` and ${usage.dormant.length - 6} more` : '';
    actions.push({
      title: `Check in with ${usage.dormant.length} student${usage.dormant.length === 1 ? '' : 's'} who stopped`,
      detail: `${names}${more} ${usage.dormant.length === 1 ? 'has' : 'have'} not signed in for more than two weeks. Progress cannot recover on its own from here.`,
    });
  }

  if (usage.trend === 'down') {
    actions.push({
      title: 'Book a short in-class session',
      detail: `${usage.summary} Twenty minutes of class time usually restores the habit faster than a reminder does.`,
    });
  }

  const stalled = struggles.modules.find((m) => m.started >= 2 && m.completed === 0);
  if (stalled) {
    actions.push({
      title: `Unblock ${stalled.name}`,
      detail: `${stalled.started} students started it and none have finished — average progress is ${stalled.avgProgress}%. Something in the middle of this module is stopping them.`,
    });
  }

  if (mastery.teachBack && mastery.teachBack.passRate < 60 && mastery.teachBack.sessions >= 3) {
    actions.push({
      title: 'Practise explanations out loud',
      detail: `Only ${mastery.teachBack.passRate}% of teach-backs passed, averaging ${mastery.teachBack.avgScore}% understanding. Have students explain a concept to a partner before they try it with Phil.`,
    });
  }

  if (headline.students > 0 && headline.activeLast7 === headline.students) {
    actions.push({
      title: 'Keep the current routine',
      detail: `Every student opened the app this week. Whatever the current rhythm is, it is working — the risk now is changing it.`,
    });
  } else if (strengths.students.length > 0 && actions.length < 5) {
    const names = strengths.students.slice(0, 3).map((s) => s.name).join(', ');
    actions.push({
      title: 'Use your strongest students',
      detail: `${names} ${strengths.students.length === 1 ? 'is' : 'are'} well ahead. Pairing them with students who have stalled costs nothing and tends to move both.`,
    });
  }

  return actions.slice(0, 6);
}

export function buildClassReport(input: ReportInput): ClassReport {
  const {
    classroom,
    roster,
    activity,
    insights,
    questions,
    teachBack,
    windowDays = 28,
    now = new Date(),
  } = input;

  const summary = summarizeClass(roster);
  const avgProgress =
    roster.length === 0
      ? 0
      : Math.round(roster.reduce((sum, r) => sum + r.avg_progress, 0) / roster.length);

  const weeks = buildWeeks(activity, windowDays, now);
  const { trend, summary: trendSummary } = describeTrend(weeks, roster.length);

  const dormant = roster
    .filter((r) => {
      const idle = daysSince(r.last_login_date);
      return idle === null || idle > DORMANT_DAYS;
    })
    .map((r) => ({ name: r.username ?? 'Unnamed', days: daysSince(r.last_login_date) }))
    .sort((a, b) => (b.days ?? 9999) - (a.days ?? 9999));

  const avgDaysActive =
    roster.length === 0
      ? 0
      : Math.round((roster.reduce((sum, r) => sum + r.days_active_30, 0) / roster.length) * 10) /
        10;

  // Scenario accuracy across every recorded answer, not an average of averages:
  // one question answered by twelve students should not weigh the same as one
  // answered by two.
  const scored = questions.filter((q) => q.response_count > 0);
  const totalAnswers = scored.reduce((sum, q) => sum + q.response_count, 0);
  const totalCorrect = scored.reduce((sum, q) => sum + q.correct_count, 0);
  const scenarioAccuracy =
    totalAnswers === 0 ? null : Math.round((totalCorrect / totalAnswers) * 100);

  const eligible = scored.filter((q) => q.response_count >= MIN_RESPONSES);
  const strugglingQuestions = eligible
    .filter((q) => accuracyOf(q) < STRUGGLE_ACCURACY)
    .sort((a, b) => accuracyOf(a) - accuracyOf(b) || b.response_count - a.response_count)
    .slice(0, 8)
    .map(toReportQuestion);

  const strongQuestions = eligible
    .filter((q) => accuracyOf(q) >= STRONG_ACCURACY)
    .sort((a, b) => accuracyOf(b) - accuracyOf(a) || b.response_count - a.response_count)
    .slice(0, 5)
    .map(toReportQuestion);

  const modules = (insights?.modules ?? []).map((m) => ({
    name: moduleLabel(m.module_type, m.module_id),
    track: trackLabel(m.module_type),
    avgProgress: m.avg_progress,
    started: m.students_started,
    completed: m.students_completed,
  }));

  const strugglingModules = modules
    .filter((m) => m.started > 0)
    .sort((a, b) => a.avgProgress - b.avgProgress)
    .slice(0, 6);

  const strongModules = modules
    .filter((m) => m.started > 0)
    .sort((a, b) => b.completed - a.completed || b.avgProgress - a.avgProgress)
    .filter((m) => m.completed > 0 || m.avgProgress >= 70)
    .slice(0, 5);

  const teachBackSummary = teachBack?.summary;
  const retryGain =
    teachBack && teachBack.students.length > 0
      ? Math.round(
          teachBack.students.reduce((sum, s) => sum + (s.best_score - s.avg_score), 0) /
            teachBack.students.length
        )
      : 0;

  const hardestLessons = (teachBack?.lessons ?? [])
    .slice()
    .sort((a, b) => a.avg_score - b.avg_score)
    .slice(0, 5)
    .map((l) => ({
      lesson: lessonLabel(l.lesson_id),
      avgScore: l.avg_score,
      passRate: l.pass_rate,
      students: l.student_count,
    }));

  const thriving = roster
    .filter((r) => studentStatus(r) === 'thriving')
    .sort((a, b) => b.modules_completed - a.modules_completed)
    .slice(0, 5)
    .map((r) => ({
      name: r.username ?? 'Unnamed',
      note: `${r.modules_completed} module${r.modules_completed === 1 ? '' : 's'} done · ${r.days_active_30} active days`,
    }));

  const strengthNotes: string[] = [];
  if (summary.activeLast7 > 0) {
    strengthNotes.push(
      `${summary.activeLast7} of ${summary.studentCount} students opened the app in the last 7 days.`
    );
  }
  if (scenarioAccuracy !== null && scenarioAccuracy >= 70) {
    strengthNotes.push(
      `The class is answering ${scenarioAccuracy}% of scenario questions correctly across ${totalAnswers} answers.`
    );
  }
  if (strongModules.length > 0) {
    strengthNotes.push(
      `${strongModules[0].name} is the strongest module: ${strongModules[0].completed} of ${strongModules[0].started} students who started it have finished.`
    );
  }
  if (retryGain >= 5 && teachBackSummary) {
    strengthNotes.push(
      `Students who retry a teach-back score ${retryGain} points higher on their best attempt than on average — they are using the feedback.`
    );
  }

  let masterySummary: string;
  if (scenarioAccuracy === null && !teachBackSummary) {
    masterySummary =
      'No graded answers recorded yet. Scenario questions and teach-backs both start filling this in as soon as students reach a lesson check.';
  } else if (scenarioAccuracy === null) {
    masterySummary = `No scenario answers yet, but ${teachBackSummary?.sessions} teach-back${teachBackSummary?.sessions === 1 ? '' : 's'} came in at ${teachBackSummary?.avg_score}% average understanding.`;
  } else {
    const teachBackPart = teachBackSummary
      ? ` Teach-backs, where students explain a concept in their own words, average ${teachBackSummary.avg_score}% with ${teachBackSummary.pass_rate}% passing.`
      : ' No teach-backs recorded yet, so this measures recognition rather than explanation.';
    masterySummary = `The class answers ${scenarioAccuracy}% of scenario questions correctly across ${totalAnswers} recorded answers on ${scored.length} distinct questions.${teachBackPart}`;
  }

  const base: Omit<ClassReport, 'actions' | 'synopsis'> = {
    meta: {
      className: classroom.name,
      school: classroom.school_name,
      term: classroom.term,
      joinCode: classroom.join_code,
      generatedAt: now,
      windowDays,
    },
    headline: {
      students: summary.studentCount,
      activeLast7: summary.activeLast7,
      avgModulesCompleted: summary.avgModulesCompleted,
      avgProgress,
      avgStreak: summary.avgStreak,
      needsAttention: summary.needsAttention,
      totalXp: summary.totalXp,
    },
    usage: {
      weeks,
      avgDaysActive,
      trend,
      summary: trendSummary,
      dormant,
    },
    mastery: {
      scenarioAccuracy,
      questionsAnswered: scored.length,
      answersRecorded: totalAnswers,
      teachBack: teachBackSummary
        ? {
            sessions: teachBackSummary.sessions,
            students: teachBackSummary.students_attempted,
            avgScore: teachBackSummary.avg_score,
            passRate: teachBackSummary.pass_rate,
            retryGain,
          }
        : null,
      summary: masterySummary,
    },
    struggles: {
      questions: strugglingQuestions,
      concepts: (insights?.concept_gaps ?? [])
        .slice(0, 6)
        .map((g) => ({ fact: g.fact, students: g.student_count, misses: g.miss_count })),
      modules: strugglingModules,
      lessons: hardestLessons,
    },
    strengths: {
      questions: strongQuestions,
      modules: strongModules,
      students: thriving,
      notes: strengthNotes,
    },
    roster: roster.map((r) => ({
      name: r.username ?? 'Unnamed',
      status: studentStatus(r),
      lastActive: r.last_login_date
        ? new Date(r.last_login_date).toLocaleDateString()
        : 'Never',
      daysActive: r.days_active_30,
      modulesCompleted: r.modules_completed,
      avgProgress: r.avg_progress,
      streak: r.current_streak,
    })),
  };

  return { ...base, actions: buildActions(base), synopsis: buildSynopsis(base) };
}
