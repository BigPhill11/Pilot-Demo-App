import { describe, expect, it } from 'vitest';
import { buildClassReport } from '@/lib/teacherReport';
import { renderClassReportDoc } from '@/lib/teacherReportPdf';
import { teacherPreview } from '@/dev/teacherPreview';

/**
 * Renders the real report end to end against the preview fixtures.
 *
 * The layout is hand-positioned, so the failure mode to guard against is a
 * throw partway through — a teacher clicking Report and getting a toast instead
 * of a file. Set WRITE_PDF=1 to drop the output somewhere it can be looked at.
 */
async function renderFixtureReport() {
  const classrooms = await teacherPreview.listClassrooms();
  const classroom = classrooms[0];

  const report = buildClassReport({
    classroom,
    roster: await teacherPreview.getRoster(classroom.id),
    activity: await teacherPreview.getActivity(classroom.id, 28),
    insights: await teacherPreview.getClassInsights(),
    questions: await teacherPreview.getQuestionBreakdown(),
    teachBack: await teacherPreview.getTeachBackOverview(),
    windowDays: 28,
  });

  const doc = await renderClassReportDoc(report, { logoDataUrl: null });
  return { report, doc };
}

describe('class report PDF', () => {
  it('renders every section without throwing', async () => {
    const { doc, report } = await renderFixtureReport();

    expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(3);
    expect(report.actions.length).toBeGreaterThan(0);

    if (process.env.WRITE_PDF) {
      const { writeFileSync } = await import('node:fs');
      writeFileSync('/tmp/teacher-report.pdf', Buffer.from(doc.output('arraybuffer')));
    }
  });

  it('survives a class with no students, no answers and no history', async () => {
    const classrooms = await teacherPreview.listClassrooms();
    const report = buildClassReport({
      classroom: { ...classrooms[0], student_count: 0, active_last_7: 0 },
      roster: [],
      activity: [],
      insights: { modules: [], concept_gaps: [] },
      questions: [],
      teachBack: null,
      windowDays: 28,
    });

    const doc = await renderClassReportDoc(report, { logoDataUrl: null });
    expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(1);
    expect(report.synopsis).toContain('No students have joined');

    if (process.env.WRITE_PDF) {
      const { writeFileSync } = await import('node:fs');
      writeFileSync('/tmp/teacher-report-empty.pdf', Buffer.from(doc.output('arraybuffer')));
    }
  });
});
