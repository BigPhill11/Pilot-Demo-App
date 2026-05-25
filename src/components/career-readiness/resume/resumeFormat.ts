import type { ResumeBuilderAnswers } from '@/types/career-readiness';

export function formatResumePlainText(answers: ResumeBuilderAnswers): string {
  const lines: string[] = [];
  const { contact, education, experience, leadership, additional } = answers;

  if (contact.fullName) {
    lines.push(contact.fullName.toUpperCase());
    const contactLine = [contact.email, contact.phone, contact.linkedIn]
      .filter(Boolean)
      .join(' • ');
    if (contactLine) lines.push(contactLine);
    lines.push('');
  }

  if (education.school || education.degree) {
    lines.push('EDUCATION');
    if (education.school) {
      const schoolLine = [education.school, education.location].filter(Boolean).join(' ');
      lines.push(schoolLine);
    }
    if (education.degree) {
      const degreeLine = [education.degree, education.graduationDate].filter(Boolean).join(' ');
      lines.push(degreeLine);
    }
    if (education.gpa) lines.push(`Cumulative GPA: ${education.gpa}`);
    if (education.relevantCourses) {
      lines.push(`Relevant Courses: ${education.relevantCourses}`);
    }
    lines.push('');
  }

  const formatRoles = (title: string, roles: typeof experience) => {
    if (roles.length === 0) return;
    lines.push(title);
    for (const role of roles) {
      if (!role.organization && !role.title) continue;
      const header = [role.organization, role.location].filter(Boolean).join(' ');
      if (header) lines.push(header);
      const roleLine = [role.title, role.dateRange].filter(Boolean).join(' ');
      if (roleLine) lines.push(roleLine);
      for (const bullet of role.bullets) {
        if (bullet.text.trim()) lines.push(`• ${bullet.text.trim()}`);
      }
      lines.push('');
    }
  };

  formatRoles('WORK EXPERIENCE', experience);
  formatRoles('LEADERSHIP & COMMUNITY INVOLVEMENT', leadership);

  if (
    additional.additionalActivities ||
    additional.honorsAwards ||
    additional.skills ||
    additional.interests
  ) {
    lines.push('ADDITIONAL INFORMATION');
    if (additional.additionalActivities) {
      lines.push(`Additional Activities: ${additional.additionalActivities}`);
    }
    if (additional.honorsAwards) {
      lines.push(`Honors & Awards: ${additional.honorsAwards}`);
    }
    if (additional.skills) lines.push(`Skills: ${additional.skills}`);
    if (additional.interests) lines.push(`Interests: ${additional.interests}`);
  }

  return lines.join('\n').trim();
}
