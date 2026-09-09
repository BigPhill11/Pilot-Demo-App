/**
 * Renders a ClassReport as a branded PDF.
 *
 * A CSV is a pile of numbers a teacher has to interpret; this is meant to be
 * read start to finish, printed, or handed to a department head. The layout
 * follows the same order as the dashboard — how the class is doing, what to
 * reteach, what is working, what to do next — and sticks to the Phil's
 * Financials green palette throughout.
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { ClassReport } from '@/lib/teacherReport';

type RGB = [number, number, number];

const BRAND = {
  deep: [6, 95, 70] as RGB,
  green: [22, 163, 74] as RGB,
  leaf: [74, 222, 128] as RGB,
  wash: [240, 253, 244] as RGB,
  mist: [209, 250, 229] as RGB,
  amber: [245, 158, 11] as RGB,
  amberWash: [255, 251, 235] as RGB,
  ink: [30, 41, 59] as RGB,
  muted: [100, 116, 139] as RGB,
  line: [226, 232, 240] as RGB,
  white: [255, 255, 255] as RGB,
};

const PAGE = { width: 612, height: 792, margin: 46 };
const CONTENT_WIDTH = PAGE.width - PAGE.margin * 2;

/** Reads the app logo and shrinks it — the source PNG is over a megabyte. */
async function loadLogo(): Promise<string | null> {
  try {
    const response = await fetch('/logo.png');
    if (!response.ok) return null;
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, size, size);
    return canvas.toDataURL('image/png');
  } catch {
    // A missing logo should never cost a teacher their report.
    return null;
  }
}

class ReportDoc {
  readonly doc: jsPDF;
  y = PAGE.margin;

  constructor() {
    this.doc = new jsPDF({ unit: 'pt', format: 'letter' });
    this.doc.setFont('helvetica', 'normal');
  }

  setFill(color: RGB) {
    this.doc.setFillColor(color[0], color[1], color[2]);
  }

  setText(color: RGB) {
    this.doc.setTextColor(color[0], color[1], color[2]);
  }

  setStroke(color: RGB) {
    this.doc.setDrawColor(color[0], color[1], color[2]);
  }

  /** Starts a new page when the next block will not fit. */
  ensure(height: number) {
    if (this.y + height <= PAGE.height - 64) return;
    this.doc.addPage();
    this.y = PAGE.margin;
  }

  /**
   * `minSpace` keeps a heading with the block that follows it: without it a
   * section title can land at the foot of a page and its table start on the
   * next one.
   */
  sectionTitle(title: string, subtitle?: string, minSpace = 0) {
    this.ensure(Math.max(subtitle ? 62 : 44, minSpace));
    this.setFill(BRAND.green);
    this.doc.roundedRect(PAGE.margin, this.y, 4, 16, 2, 2, 'F');

    this.setText(BRAND.deep);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(14);
    this.doc.text(title, PAGE.margin + 14, this.y + 13);
    this.y += 24;

    if (subtitle) {
      this.setText(BRAND.muted);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(9.5);
      const lines = this.doc.splitTextToSize(subtitle, CONTENT_WIDTH);
      this.doc.text(lines, PAGE.margin, this.y);
      this.y += lines.length * 12 + 4;
    }

    this.y += 6;
  }

  paragraph(text: string, options: { size?: number; color?: RGB; gap?: number } = {}) {
    const size = options.size ?? 10;
    // splitTextToSize measures with the *current* font, so the size has to be
    // set before wrapping or the text wraps to the wrong width.
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(size);
    const lines = this.doc.splitTextToSize(text, CONTENT_WIDTH);
    this.ensure(lines.length * (size + 3) + 8);
    this.setText(options.color ?? BRAND.ink);
    this.doc.text(lines, PAGE.margin, this.y);
    this.y += lines.length * (size + 3) + (options.gap ?? 8);
  }

  /** A tinted callout box; returns nothing but advances the cursor. */
  calloutBox(text: string, tone: 'green' | 'amber') {
    const fill = tone === 'green' ? BRAND.wash : BRAND.amberWash;
    const edge = tone === 'green' ? BRAND.mist : BRAND.amber;
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    const lines = this.doc.splitTextToSize(text, CONTENT_WIDTH - 28);
    const height = lines.length * 13 + 24;

    this.ensure(height + 10);
    this.setFill(fill);
    this.setStroke(edge);
    this.doc.setLineWidth(0.8);
    this.doc.roundedRect(PAGE.margin, this.y, CONTENT_WIDTH, height, 8, 8, 'FD');

    this.setText(BRAND.ink);
    this.doc.text(lines, PAGE.margin + 14, this.y + 17);
    this.y += height + 14;
  }
}

function drawCoverHeader(rd: ReportDoc, report: ClassReport, logo: string | null) {
  const { doc } = rd;
  const bandHeight = 128;

  rd.setFill(BRAND.deep);
  doc.rect(0, 0, PAGE.width, bandHeight, 'F');

  // The same soft wash the dashboard hero uses. Both circles stay inside the
  // band; one drifting past its edge reads as a printing artefact.
  rd.setFill(BRAND.green);
  doc.circle(PAGE.width - 34, 6, 58, 'F');
  rd.setFill([16, 122, 87]);
  doc.circle(PAGE.width - 96, 26, 26, 'F');

  if (logo) {
    try {
      doc.addImage(logo, 'PNG', PAGE.margin, 26, 40, 40);
    } catch {
      /* An unreadable logo is not worth failing the download over. */
    }
  }

  const textLeft = logo ? PAGE.margin + 54 : PAGE.margin;

  rd.setText(BRAND.leaf);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text("PHIL'S FINANCIALS  ·  CLASS REPORT", textLeft, 42);

  rd.setText(BRAND.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(23);
  doc.text(doc.splitTextToSize(report.meta.className, CONTENT_WIDTH - 60)[0], textLeft, 66);

  const metaBits = [
    report.meta.school,
    report.meta.term,
    `Code ${report.meta.joinCode}`,
    `${report.headline.students} student${report.headline.students === 1 ? '' : 's'}`,
  ].filter(Boolean);

  rd.setText([190, 242, 216]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(metaBits.join('   ·   '), textLeft, 84);
  doc.text(
    `Generated ${report.meta.generatedAt.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}  ·  Last ${report.meta.windowDays} days`,
    textLeft,
    99
  );

  rd.y = bandHeight + 26;
}

function drawKpiRow(rd: ReportDoc, report: ClassReport) {
  const { doc } = rd;
  const items = [
    { label: 'Students', value: String(report.headline.students) },
    { label: 'Active this week', value: String(report.headline.activeLast7) },
    { label: 'Avg modules done', value: String(report.headline.avgModulesCompleted) },
    { label: 'Avg progress', value: `${report.headline.avgProgress}%` },
    { label: 'Need attention', value: String(report.headline.needsAttention) },
  ];

  const gap = 10;
  const cardWidth = (CONTENT_WIDTH - gap * (items.length - 1)) / items.length;
  const cardHeight = 58;

  rd.ensure(cardHeight + 16);

  items.forEach((item, index) => {
    const x = PAGE.margin + index * (cardWidth + gap);
    const attention = item.label === 'Need attention' && report.headline.needsAttention > 0;

    rd.setFill(attention ? BRAND.amberWash : BRAND.wash);
    rd.setStroke(attention ? BRAND.amber : BRAND.mist);
    doc.setLineWidth(0.8);
    doc.roundedRect(x, rd.y, cardWidth, cardHeight, 7, 7, 'FD');

    rd.setText(attention ? [146, 64, 14] : BRAND.deep);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(19);
    doc.text(item.value, x + cardWidth / 2, rd.y + 27, { align: 'center' });

    rd.setText(BRAND.muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.text(doc.splitTextToSize(item.label, cardWidth - 8), x + cardWidth / 2, rd.y + 42, {
      align: 'center',
    });
  });

  rd.y += cardHeight + 20;
}

function drawUsageChart(rd: ReportDoc, report: ClassReport) {
  const { doc } = rd;
  const weeks = report.usage.weeks;
  // An axis of zeroes tells a teacher nothing the sentence below it does not.
  if (weeks.length === 0 || weeks.every((w) => w.signIns === 0)) return;

  const chartHeight = 104;
  rd.ensure(chartHeight + 44);

  const peak = Math.max(1, ...weeks.map((w) => w.signIns));
  const slot = CONTENT_WIDTH / weeks.length;
  const barWidth = Math.min(58, slot - 22);
  const baseline = rd.y + chartHeight;

  rd.setStroke(BRAND.line);
  doc.setLineWidth(0.8);
  doc.line(PAGE.margin, baseline, PAGE.margin + CONTENT_WIDTH, baseline);

  weeks.forEach((week, index) => {
    const centre = PAGE.margin + slot * index + slot / 2;
    const height = Math.max(2, (week.signIns / peak) * (chartHeight - 22));
    const x = centre - barWidth / 2;
    const top = baseline - height;

    // The most recent week is the one being judged, so it carries the accent.
    rd.setFill(index === weeks.length - 1 ? BRAND.green : BRAND.mist);
    doc.roundedRect(x, top, barWidth, height, 3, 3, 'F');

    rd.setText(index === weeks.length - 1 ? BRAND.deep : BRAND.muted);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(String(week.signIns), centre, top - 5, { align: 'center' });

    rd.setText(BRAND.muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(week.label, centre, baseline + 13, { align: 'center' });
    doc.text(`${week.activeStudents} students`, centre, baseline + 24, { align: 'center' });
  });

  rd.y = baseline + 38;
}

function tableTheme(startY: number) {
  return {
    startY,
    margin: { left: PAGE.margin, right: PAGE.margin },
    styles: {
      font: 'helvetica',
      fontSize: 8.5,
      cellPadding: 5,
      textColor: BRAND.ink,
      lineColor: BRAND.line,
      lineWidth: 0.5,
      overflow: 'linebreak' as const,
    },
    headStyles: {
      fillColor: BRAND.deep,
      textColor: BRAND.white,
      fontStyle: 'bold' as const,
      fontSize: 8.5,
    },
    alternateRowStyles: { fillColor: BRAND.wash },
  };
}

function drawFooters(rd: ReportDoc, report: ClassReport) {
  const { doc } = rd;
  const pages = doc.getNumberOfPages();

  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page);
    const y = PAGE.height - 34;

    rd.setStroke(BRAND.line);
    doc.setLineWidth(0.8);
    doc.line(PAGE.margin, y - 12, PAGE.width - PAGE.margin, y - 12);

    rd.setText(BRAND.muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Phil's Financials  ·  ${report.meta.className}`, PAGE.margin, y);
    doc.text(`Page ${page} of ${pages}`, PAGE.width - PAGE.margin, y, { align: 'right' });
  }
}

export interface RenderOptions {
  /** Supplied by tests, which have no fetch or canvas to read the logo with. */
  logoDataUrl?: string | null;
}

export async function renderClassReportDoc(
  report: ClassReport,
  options: RenderOptions = {}
): Promise<jsPDF> {
  const logo = options.logoDataUrl !== undefined ? options.logoDataUrl : await loadLogo();
  const rd = new ReportDoc();
  const { doc } = rd;

  drawCoverHeader(rd, report, logo);

  rd.sectionTitle('The short version');
  rd.calloutBox(report.synopsis, 'green');

  drawKpiRow(rd, report);

  rd.sectionTitle(
    'How often the class is using the app',
    'Sign-ins per week across the class, with the number of different students behind each bar.'
  );
  drawUsageChart(rd, report);
  rd.paragraph(report.usage.summary);

  if (report.headline.students > 0) {
    rd.paragraph(
      `Students average ${report.usage.avgDaysActive} active days each over the last 30. ${
        report.usage.dormant.length === 0
          ? 'Everyone has signed in within the last two weeks.'
          : `${report.usage.dormant.length} student${report.usage.dormant.length === 1 ? ' has' : 's have'} not signed in for over two weeks: ${report.usage.dormant
              .map((d) => d.name)
              .join(', ')}.`
      }`,
      { color: BRAND.muted, size: 9.5 }
    );
  }

  rd.sectionTitle('How much of it is sticking');
  rd.paragraph(report.mastery.summary);

  // ---- What to work on -----------------------------------------------------
  rd.y += 6;
  rd.sectionTitle(
    'What the class is struggling with',
    'Questions where fewer than 60% of answers were right, hardest first. The wrong answer most students chose is usually the misconception worth addressing.',
    190
  );

  if (report.struggles.questions.length === 0) {
    rd.calloutBox(
      'No question is failing badly enough to flag yet. Either the class is on top of the material, or not enough scenarios have been answered to tell — check the answers recorded above.',
      'green'
    );
  } else {
    autoTable(doc, {
      ...tableTheme(rd.y),
      head: [['Question', 'Lesson', 'Correct', 'Most common wrong answer']],
      body: report.struggles.questions.map((q) => [
        q.prompt,
        q.lesson,
        `${q.accuracy}%`,
        q.topWrong ? `${q.topWrong.label}  (${q.topWrong.count} of ${q.responses})` : '—',
      ]),
      columnStyles: {
        0: { cellWidth: 186 },
        1: { cellWidth: 92 },
        2: { cellWidth: 46, halign: 'center', fontStyle: 'bold' },
        3: { cellWidth: 'auto' },
      },
    });
    rd.y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;
  }

  if (report.struggles.concepts.length > 0) {
    rd.sectionTitle(
      'Concepts they cannot explain back',
      'Points students left out when explaining a concept to Phil in their own words. A student can pick the right answer without being able to say why; this is where that shows up.',
      170
    );
    autoTable(doc, {
      ...tableTheme(rd.y),
      head: [['Concept left out', 'Students', 'Times missed']],
      body: report.struggles.concepts.map((c) => [c.fact, String(c.students), String(c.misses)]),
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 62, halign: 'center' },
        2: { cellWidth: 76, halign: 'center' },
      },
    });
    rd.y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;
  }

  if (report.struggles.modules.length > 0) {
    rd.sectionTitle(
      'Modules with the least progress',
      'Averaged across the students who started each one.',
      160
    );
    autoTable(doc, {
      ...tableTheme(rd.y),
      head: [['Module', 'Track', 'Avg progress', 'Started', 'Finished']],
      body: report.struggles.modules.map((m) => [
        m.name,
        m.track,
        `${m.avgProgress}%`,
        String(m.started),
        String(m.completed),
      ]),
      columnStyles: {
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center' },
      },
    });
    rd.y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;
  }

  // ---- What is working -----------------------------------------------------
  rd.sectionTitle('What is going well', undefined, 150);

  if (report.strengths.notes.length === 0) {
    rd.paragraph(
      'Not enough activity yet to call anything a strength. This section fills in once students are working through lessons regularly.',
      { color: BRAND.muted }
    );
  } else {
    report.strengths.notes.forEach((note) => {
      rd.ensure(24);
      rd.setFill(BRAND.green);
      doc.circle(PAGE.margin + 3, rd.y - 3, 2.6, 'F');
      rd.setText(BRAND.ink);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(note, CONTENT_WIDTH - 16);
      doc.text(lines, PAGE.margin + 14, rd.y);
      rd.y += lines.length * 13 + 6;
    });
    rd.y += 8;
  }

  if (report.strengths.questions.length > 0) {
    rd.sectionTitle(
      'Questions the class has nailed',
      'At least 85% correct — safe to build on.',
      140
    );
    autoTable(doc, {
      ...tableTheme(rd.y),
      head: [['Question', 'Lesson', 'Correct']],
      body: report.strengths.questions.map((q) => [q.prompt, q.lesson, `${q.accuracy}%`]),
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 120 },
        2: { cellWidth: 52, halign: 'center', fontStyle: 'bold' },
      },
    });
    rd.y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;
  }

  if (report.strengths.students.length > 0) {
    rd.sectionTitle('Students setting the pace', undefined, 130);
    autoTable(doc, {
      ...tableTheme(rd.y),
      head: [['Student', 'Why']],
      body: report.strengths.students.map((s) => [s.name, s.note]),
      columnStyles: { 0: { cellWidth: 150, fontStyle: 'bold' } },
    });
    rd.y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 22;
  }

  // ---- Next steps ----------------------------------------------------------
  rd.y += 6;
  rd.sectionTitle(
    'What to do next',
    'Drawn from the numbers above, most specific first. Each one names the students or the question behind it.',
    200
  );

  if (report.actions.length === 0) {
    rd.paragraph(
      'Nothing to recommend yet — there is not enough activity to base advice on. Get students signing in regularly and this becomes the most useful page of the report.',
      { color: BRAND.muted }
    );
  } else {
    report.actions.forEach((action, index) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      const titleLines = doc.splitTextToSize(action.title, CONTENT_WIDTH - 58);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      const bodyLines = doc.splitTextToSize(action.detail, CONTENT_WIDTH - 58);
      const height = titleLines.length * 14 + bodyLines.length * 12 + 26;

      rd.ensure(height + 12);

      rd.setFill(BRAND.wash);
      rd.setStroke(BRAND.mist);
      doc.setLineWidth(0.8);
      doc.roundedRect(PAGE.margin, rd.y, CONTENT_WIDTH, height, 8, 8, 'FD');

      rd.setFill(BRAND.green);
      doc.circle(PAGE.margin + 22, rd.y + 22, 11, 'F');
      rd.setText(BRAND.white);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(String(index + 1), PAGE.margin + 22, rd.y + 26, { align: 'center' });

      rd.setText(BRAND.deep);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(titleLines, PAGE.margin + 42, rd.y + 22);

      rd.setText(BRAND.ink);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.text(bodyLines, PAGE.margin + 42, rd.y + 22 + titleLines.length * 14);

      rd.y += height + 12;
    });
  }

  // ---- Roster --------------------------------------------------------------
  if (report.roster.length > 0) {
    rd.y += 8;
    rd.sectionTitle(
      'Every student',
      'The same roster as the dashboard, as of the date on this report.',
      170
    );
    autoTable(doc, {
      ...tableTheme(rd.y),
      head: [['Student', 'Status', 'Last active', 'Active days (30d)', 'Modules', 'Progress', 'Streak']],
      body: report.roster.map((s) => [
        s.name,
        s.status === 'nudge' ? 'Needs a nudge' : s.status.charAt(0).toUpperCase() + s.status.slice(1),
        s.lastActive,
        String(s.daysActive),
        String(s.modulesCompleted),
        `${s.avgProgress}%`,
        String(s.streak),
      ]),
      columnStyles: {
        1: { cellWidth: 78 },
        2: { cellWidth: 68 },
        3: { cellWidth: 62, halign: 'center' },
        4: { cellWidth: 52, halign: 'center' },
        5: { cellWidth: 52, halign: 'center' },
        6: { cellWidth: 44, halign: 'center' },
      },
      // Amber for the students who need chasing, matching the dashboard badge.
      didParseCell: (data) => {
        if (data.section !== 'body' || data.column.index !== 1) return;
        const value = String(data.cell.raw);
        if (value === 'Inactive' || value === 'Needs a nudge') {
          data.cell.styles.textColor = [146, 64, 14];
          data.cell.styles.fontStyle = 'bold';
        }
      },
    });
  }

  drawFooters(rd, report);

  return doc;
}

export async function generateClassReportPdf(
  report: ClassReport,
  options: RenderOptions = {}
): Promise<Blob> {
  const doc = await renderClassReportDoc(report, options);
  return doc.output('blob');
}

export function classReportFilename(report: ClassReport): string {
  const slug =
    report.meta.className
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'class';
  const date = report.meta.generatedAt.toISOString().slice(0, 10);
  return `${slug}-class-report-${date}.pdf`;
}
