import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ResumeTipCard from './ResumeTipCard';
import { RESUME_SECTION_TIPS } from '@/data/career-readiness/resume';
import type { ResumeAdditional } from '@/types/career-readiness';

interface ResumeAdditionalSectionProps {
  additional: ResumeAdditional;
  onChange: (patch: Partial<ResumeAdditional>) => void;
}

const ResumeAdditionalSection: React.FC<ResumeAdditionalSectionProps> = ({
  additional,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <ResumeTipCard tip={RESUME_SECTION_TIPS.additional} />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Additional activities</Label>
          <Textarea
            placeholder="Varsity soccer, finance club (VP), professional fraternity…"
            value={additional.additionalActivities}
            onChange={(e) => onChange({ additionalActivities: e.target.value })}
            className="min-h-[72px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Honors & awards</Label>
          <Textarea
            placeholder="Scholarships, competition wins, recognitions…"
            value={additional.honorsAwards}
            onChange={(e) => onChange({ honorsAwards: e.target.value })}
            className="min-h-[72px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Skills</Label>
          <Textarea
            placeholder="MS Office, Python, CRM tools, languages…"
            value={additional.skills}
            onChange={(e) => onChange({ skills: e.target.value })}
            className="min-h-[72px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Interests</Label>
          <Textarea
            placeholder="A few genuine interests — keep it professional but human"
            value={additional.interests}
            onChange={(e) => onChange({ interests: e.target.value })}
            className="min-h-[60px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeAdditionalSection;
