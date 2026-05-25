import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ResumeTipCard from './ResumeTipCard';
import { RESUME_SECTION_TIPS } from '@/data/career-readiness/resume';
import type { ResumeContact } from '@/types/career-readiness';

interface ResumeContactSectionProps {
  contact: ResumeContact;
  onChange: (patch: Partial<ResumeContact>) => void;
}

const ResumeContactSection: React.FC<ResumeContactSectionProps> = ({ contact, onChange }) => {
  return (
    <div className="space-y-4">
      <ResumeTipCard tip={RESUME_SECTION_TIPS.contact} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="resume-name">Full name</Label>
          <Input
            id="resume-name"
            placeholder="Alex Johnson"
            value={contact.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resume-email">Email</Label>
          <Input
            id="resume-email"
            type="email"
            placeholder="you@school.edu"
            value={contact.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resume-phone">Phone</Label>
          <Input
            id="resume-phone"
            placeholder="(555) 123-4567"
            value={contact.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="resume-linkedin">LinkedIn (URL or handle)</Label>
          <Input
            id="resume-linkedin"
            placeholder="linkedin.com/in/yourprofile"
            value={contact.linkedIn}
            onChange={(e) => onChange({ linkedIn: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeContactSection;
