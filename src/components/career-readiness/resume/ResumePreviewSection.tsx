import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ResumeTipCard from './ResumeTipCard';
import { RESUME_SECTION_TIPS } from '@/data/career-readiness/resume';
import { formatResumePlainText } from './resumeFormat';
import type { ResumeBuilderAnswers } from '@/types/career-readiness';

interface ResumePreviewSectionProps {
  answers: ResumeBuilderAnswers;
}

const ResumePreviewSection: React.FC<ResumePreviewSectionProps> = ({ answers }) => {
  const [copied, setCopied] = useState(false);
  const plain = formatResumePlainText(answers);
  const { contact, education, experience, leadership, additional } = answers;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-4">
      <ResumeTipCard tip={RESUME_SECTION_TIPS.preview} />

      <Card className="rounded-2xl border-emerald-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 px-4 py-2 flex justify-between items-center">
            <span className="text-xs font-medium text-emerald-100">Live preview</span>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="h-7 text-xs"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy text
                </>
              )}
            </Button>
          </div>

          <div className="p-5 sm:p-6 font-serif text-[13px] leading-snug text-foreground bg-white max-h-[70vh] overflow-y-auto">
            {contact.fullName && (
              <header className="text-center border-b border-emerald-100 pb-3 mb-4">
                <h1 className="text-lg font-bold tracking-wide uppercase">
                  {contact.fullName}
                </h1>
                <p className="text-xs mt-1 text-muted-foreground">
                  {[contact.email, contact.phone, contact.linkedIn]
                    .filter(Boolean)
                    .join(' • ')}
                </p>
              </header>
            )}

            {(education.school || education.degree) && (
              <section className="mb-4">
                <h2 className="text-xs font-bold border-b border-foreground/30 pb-0.5 mb-2 tracking-wider">
                  EDUCATION
                </h2>
                {education.school && (
                  <p className="font-semibold flex justify-between gap-2 flex-wrap">
                    <span>{education.school}</span>
                    {education.location && (
                      <span className="font-normal">{education.location}</span>
                    )}
                  </p>
                )}
                {education.degree && (
                  <p className="flex justify-between gap-2 flex-wrap">
                    <span>{education.degree}</span>
                    {education.graduationDate && (
                      <span>{education.graduationDate}</span>
                    )}
                  </p>
                )}
                {education.gpa && (
                  <p>Cumulative GPA: {education.gpa}</p>
                )}
                {education.relevantCourses && (
                  <p>
                    <span className="font-semibold">Relevant Courses: </span>
                    {education.relevantCourses}
                  </p>
                )}
              </section>
            )}

            {experience.length > 0 && experience.some((e) => e.organization || e.title) && (
              <section className="mb-4">
                <h2 className="text-xs font-bold border-b border-foreground/30 pb-0.5 mb-2 tracking-wider">
                  WORK EXPERIENCE
                </h2>
                {experience.map((role) =>
                  role.organization || role.title ? (
                    <div key={role.id} className="mb-3">
                      <p className="font-semibold flex justify-between gap-2 flex-wrap">
                        <span>{role.organization}</span>
                        {role.location && <span className="font-normal">{role.location}</span>}
                      </p>
                      <p className="flex justify-between gap-2 flex-wrap italic">
                        <span>{role.title}</span>
                        {role.dateRange && <span>{role.dateRange}</span>}
                      </p>
                      <ul className="mt-1 space-y-0.5 list-none pl-0">
                        {role.bullets
                          .filter((b) => b.text.trim())
                          .map((b) => (
                            <li key={b.id} className="pl-3 relative before:content-['•'] before:absolute before:left-0">
                              {b.text.trim()}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </section>
            )}

            {leadership.length > 0 && leadership.some((e) => e.organization || e.title) && (
              <section className="mb-4">
                <h2 className="text-xs font-bold border-b border-foreground/30 pb-0.5 mb-2 tracking-wider">
                  LEADERSHIP & COMMUNITY INVOLVEMENT
                </h2>
                {leadership.map((role) =>
                  role.organization || role.title ? (
                    <div key={role.id} className="mb-3">
                      <p className="font-semibold flex justify-between gap-2 flex-wrap">
                        <span>{role.organization}</span>
                        {role.location && <span className="font-normal">{role.location}</span>}
                      </p>
                      <p className="flex justify-between gap-2 flex-wrap italic">
                        <span>{role.title}</span>
                        {role.dateRange && <span>{role.dateRange}</span>}
                      </p>
                      <ul className="mt-1 space-y-0.5 list-none pl-0">
                        {role.bullets
                          .filter((b) => b.text.trim())
                          .map((b) => (
                            <li key={b.id} className="pl-3 relative before:content-['•'] before:absolute before:left-0">
                              {b.text.trim()}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </section>
            )}

            {(additional.additionalActivities ||
              additional.honorsAwards ||
              additional.skills ||
              additional.interests) && (
              <section>
                <h2 className="text-xs font-bold border-b border-foreground/30 pb-0.5 mb-2 tracking-wider">
                  ADDITIONAL INFORMATION
                </h2>
                {additional.additionalActivities && (
                  <p>
                    <span className="font-semibold">Additional Activities: </span>
                    {additional.additionalActivities}
                  </p>
                )}
                {additional.honorsAwards && (
                  <p>
                    <span className="font-semibold">Honors & Awards: </span>
                    {additional.honorsAwards}
                  </p>
                )}
                {additional.skills && (
                  <p>
                    <span className="font-semibold">Skills: </span>
                    {additional.skills}
                  </p>
                )}
                {additional.interests && (
                  <p>
                    <span className="font-semibold">Interests: </span>
                    {additional.interests}
                  </p>
                )}
              </section>
            )}

            {!contact.fullName && !education.school && (
              <p className="text-muted-foreground text-center py-8 text-sm font-sans">
                Fill in sections above to see your resume preview here.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumePreviewSection;
