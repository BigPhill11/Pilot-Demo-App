import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ResumeTipCard from './ResumeTipCard';
import { RESUME_SECTION_TIPS } from '@/data/career-readiness/resume';
import type { ResumeEducation } from '@/types/career-readiness';

interface ResumeEducationSectionProps {
  education: ResumeEducation;
  onChange: (patch: Partial<ResumeEducation>) => void;
}

const ResumeEducationSection: React.FC<ResumeEducationSectionProps> = ({
  education,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <ResumeTipCard tip={RESUME_SECTION_TIPS.education} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label>School</Label>
          <Input
            placeholder="State University, School of Business"
            value={education.school}
            onChange={(e) => onChange({ school: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            placeholder="City, ST"
            value={education.location}
            onChange={(e) => onChange({ location: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Graduation date</Label>
          <Input
            placeholder="May 2028"
            value={education.graduationDate}
            onChange={(e) => onChange({ graduationDate: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Degree & major(s)</Label>
          <Input
            placeholder="B.S. Business Administration, Finance | Minor: Economics"
            value={education.degree}
            onChange={(e) => onChange({ degree: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>GPA (optional)</Label>
          <Input
            placeholder="3.80/4.00"
            value={education.gpa}
            onChange={(e) => onChange({ gpa: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Relevant courses</Label>
          <Textarea
            placeholder="Accounting, Data Analytics, Corporate Finance, Business Communication"
            value={education.relevantCourses}
            onChange={(e) => onChange({ relevantCourses: e.target.value })}
            className="min-h-[72px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeEducationSection;
