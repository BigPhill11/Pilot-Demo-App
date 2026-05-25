import type { ResumeSectionId } from '@/types/career-readiness';

export const RESUME_SECTION_LABELS: Record<
  ResumeSectionId,
  { title: string; subtitle: string }
> = {
  contact: {
    title: 'Contact Header',
    subtitle: 'Name, email, phone, and LinkedIn',
  },
  education: {
    title: 'Education',
    subtitle: 'School, degree, GPA, and relevant courses',
  },
  experience: {
    title: 'Work Experience',
    subtitle: 'Roles with impact-driven bullet points',
  },
  leadership: {
    title: 'Leadership & Community',
    subtitle: 'Clubs, fellowships, and campus involvement',
  },
  additional: {
    title: 'Additional Information',
    subtitle: 'Activities, honors, skills, and interests',
  },
  preview: {
    title: 'Preview & Finish',
    subtitle: 'Review your formatted resume',
  },
};

export const RESUME_SECTION_TIPS: Record<ResumeSectionId, string> = {
  contact:
    'Keep it clean: one line with email, phone, and LinkedIn. Use a professional email (school or personal, not silly nicknames).',
  education:
    'List school and location on one line, degree and graduation date on the next. Add GPA if 3.5+ and courses that match the role you want.',
  experience:
    'Lead with strong action verbs and numbers. Each bullet should show what you did and the result (%, $, count, or scale).',
  leadership:
    'Treat leadership like work experience: organization, role, dates, then bullets that show initiative and measurable impact.',
  additional:
    'Use this section for extras that do not fit above: honors, skills (tools + languages), and 3–5 genuine interests.',
  preview:
    'Read your resume out loud. If a bullet does not sound impressive when spoken, tighten the verb or add a number.',
};

export const RESUME_BULLET_EXAMPLES = {
  experience: [
    'Researched 50+ publicly traded companies across five sectors, producing weekly equity summaries used by 3 senior analysts',
    'Built financial models in Excel to forecast revenue and margins for 10 client portfolios, improving report turnaround by 20%',
  ],
  leadership: [
    'Led a 12-person finance club through bi-weekly case competitions, increasing member participation by 40% over one semester',
    'Selected as 1 of 15 program participants (acceptance rate <8%), completing a 6-week investment banking curriculum',
  ],
};
