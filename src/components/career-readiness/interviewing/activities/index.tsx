import type { ComponentType } from 'react';
import type { CareerActivityId } from '@/types/career-readiness';
import type { InterviewActivityProps } from './types';
import ResearchSprintActivity from './ResearchSprintActivity';
import SignalNoiseActivity from './SignalNoiseActivity';
import WhyRoleBuilderActivity from './WhyRoleBuilderActivity';
import QuestionPlannerActivity from './QuestionPlannerActivity';
import StarBuilderActivity from './StarBuilderActivity';
import BehavioralDeckActivity from './BehavioralDeckActivity';
import AnswerCoachActivity from './AnswerCoachActivity';
import MockRecorderActivity from './MockRecorderActivity';
import FinanceFitActivity from './FinanceFitActivity';
import ThankYouEmailActivity from './ThankYouEmailActivity';
import FollowUpTimingActivity from './FollowUpTimingActivity';
import QuestionRecoveryActivity from './QuestionRecoveryActivity';
import ToneCheckActivity from './ToneCheckActivity';

export const ACTIVITY_COMPONENTS: Record<
  CareerActivityId,
  ComponentType<InterviewActivityProps>
> = {
  'research-sprint': ResearchSprintActivity,
  'signal-noise': SignalNoiseActivity,
  'why-role-builder': WhyRoleBuilderActivity,
  'question-planner': QuestionPlannerActivity,
  'star-builder': StarBuilderActivity,
  'behavioral-deck': BehavioralDeckActivity,
  'answer-coach': AnswerCoachActivity,
  'mock-recorder': MockRecorderActivity,
  'finance-fit': FinanceFitActivity,
  'thank-you-email': ThankYouEmailActivity,
  'follow-up-timing': FollowUpTimingActivity,
  'question-recovery': QuestionRecoveryActivity,
  'tone-check': ToneCheckActivity,
};
