import type { ComponentType } from 'react';
import type { EmailActivityId } from '@/types/career-readiness';
import type { EmailActivityProps } from './types';
import RecipientIdActivity from './RecipientIdActivity';
import ContactTypeSorterActivity from './ContactTypeSorterActivity';
import SubjectLineSurgeonActivity from './SubjectLineSurgeonActivity';
import EmailAnatomyBuilderActivity from './EmailAnatomyBuilderActivity';
import ToneCalibatorActivity from './ToneCalibatorActivity';
import LengthEditorActivity from './LengthEditorActivity';
import CcBccSimulatorActivity from './CcBccSimulatorActivity';
import TimingPickerActivity from './TimingPickerActivity';
import SignatureBuilderActivity from './SignatureBuilderActivity';
import FollowupTimingSimulatorActivity from './FollowupTimingSimulatorActivity';
import ThankyouEmailBuilderActivity from './ThankyouEmailBuilderActivity';
import ToneCheckAdvancedActivity from './ToneCheckAdvancedActivity';

export const ACTIVITY_COMPONENTS: Record<EmailActivityId, ComponentType<EmailActivityProps>> = {
  'recipient-id': RecipientIdActivity,
  'contact-type-sorter': ContactTypeSorterActivity,
  'subject-line-surgeon': SubjectLineSurgeonActivity,
  'email-anatomy-builder': EmailAnatomyBuilderActivity,
  'tone-calibrator': ToneCalibatorActivity,
  'length-editor': LengthEditorActivity,
  'cc-bcc-simulator': CcBccSimulatorActivity,
  'timing-picker': TimingPickerActivity,
  'signature-builder': SignatureBuilderActivity,
  'followup-timing-simulator': FollowupTimingSimulatorActivity,
  'thankyou-email-builder': ThankyouEmailBuilderActivity,
  'tone-check-advanced': ToneCheckAdvancedActivity,
};
