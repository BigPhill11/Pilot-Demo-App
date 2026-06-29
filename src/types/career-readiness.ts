/** Career Readiness module content & progress types */

import { safeRandomUUID } from '@/lib/uuid';

export type CareerPhaseId = 'prepare' | 'practice' | 'follow-up' | 'finish';

export type InterviewLessonId = 'prepare' | 'practice' | 'follow-up';

export type InterviewLessonStepId = 'context' | 'example' | 'practice' | 'test';

export const INTERVIEW_LESSON_ORDER: InterviewLessonId[] = [
  'prepare',
  'practice',
  'follow-up',
];

export const INTERVIEW_STEP_ORDER: InterviewLessonStepId[] = [
  'context',
  'example',
  'practice',
  'test',
];

export type CareerActivityId =
  | 'research-sprint'
  | 'signal-noise'
  | 'why-role-builder'
  | 'question-planner'
  | 'star-builder'
  | 'behavioral-deck'
  | 'answer-coach'
  | 'mock-recorder'
  | 'finance-fit'
  | 'thank-you-email'
  | 'follow-up-timing'
  | 'question-recovery'
  | 'tone-check';

export interface CareerPhase {
  id: CareerPhaseId;
  title: string;
  subtitle: string;
  activityIds: CareerActivityId[];
}

export interface MockCompanyCard {
  id: string;
  name: string;
  role: string;
  sector: string;
  facts: { id: string; text: string; isUseful: boolean; category: string }[];
}

export interface SignalNoiseItem {
  id: string;
  text: string;
  correctBucket: 'use' | 'nice' | 'ignore';
  explanation: string;
}

export interface BehavioralQuestion {
  id: string;
  question: string;
  lookingFor: string;
  tip: string;
}

export interface AnswerCoachScenario {
  id: string;
  question: string;
  weak: string;
  okay: string;
  strong: string;
  correctChoice: 'weak' | 'okay' | 'strong';
  feedback: string;
}

export interface FinanceFitQuestion {
  id: string;
  question: string;
  placeholder: string;
  minLength: number;
}

export interface FollowUpTimingScenario {
  id: string;
  situation: string;
  options: { id: string; label: string; isCorrect: boolean; feedback: string }[];
}

export interface ToneCheckScenario {
  id: string;
  context: string;
  emails: { id: string; subject: string; body: string; rating: 'vague' | 'pushy' | 'professional' }[];
  correctId: string;
  feedback: string;
}

export interface StarStory {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface InterviewModuleAnswers {
  selectedResearchFacts?: string[];
  signalNoiseSorts?: Record<string, 'use' | 'nice' | 'ignore'>;
  whyRole?: {
    company: string;
    role: string;
    interest: string;
    specificReason: string;
  };
  plannedQuestions?: string[];
  starStories?: StarStory[];
  behavioralAnswers?: Record<string, string>;
  answerCoachResults?: Record<string, string>;
  mockReflections?: Record<string, string>;
  financeFitAnswers?: Record<string, string>;
  thankYouEmail?: {
    subject: string;
    greeting: string;
    specificReference: string;
    interestRestatement: string;
    close: string;
  };
  followUpTimingResults?: Record<string, string>;
  recoveryQuestions?: string;
  toneCheckResults?: Record<string, string>;
  /** Reflection prompts after context steps */
  lessonReflections?: Record<string, string>;
  /** Test checkpoint answers keyed by lessonId */
  testCheckpointResults?: Record<string, string | string[]>;
}

export interface InterviewModuleDetails {
  currentLessonId: InterviewLessonId;
  currentStepId: InterviewLessonStepId;
  /** Index within the practice step when a lesson has multiple activities */
  currentPracticeActivityIndex: number;
  /** Keys like "prepare:context", "prepare:test" */
  completedLessonSteps: string[];
  completedLessons: InterviewLessonId[];
  completedActivityIds: CareerActivityId[];
  answers: InterviewModuleAnswers;
  /** @deprecated migrated to currentLessonId/currentStepId */
  currentPhaseId?: CareerPhaseId;
  currentActivityIndex?: number;
}

export interface CareerReadinessProgressState {
  modules: Record<string, number>;
  badgesEarned: string[];
  details: Record<string, InterviewModuleDetails | Record<string, unknown>>;
}

export const INTERVIEW_PHASES: CareerPhase[] = [
  {
    id: 'prepare',
    title: 'Preparation Lab',
    subtitle: 'Research, plan, and walk in ready',
    activityIds: ['research-sprint', 'signal-noise', 'why-role-builder', 'question-planner'],
  },
  {
    id: 'practice',
    title: 'Mock Interview Studio',
    subtitle: 'STAR stories, behavioral practice, and finance fit',
    activityIds: ['star-builder', 'behavioral-deck', 'answer-coach', 'mock-recorder', 'finance-fit'],
  },
  {
    id: 'follow-up',
    title: 'Follow-Up Workshop',
    subtitle: 'Thank-you notes, timing, and professional tone',
    activityIds: ['thank-you-email', 'follow-up-timing', 'question-recovery', 'tone-check'],
  },
];

export const PREP_REQUIRED: CareerActivityId[] = [
  'research-sprint',
  'signal-noise',
  'why-role-builder',
];
export const PRACTICE_REQUIRED: CareerActivityId[] = [
  'star-builder',
  'behavioral-deck',
  'mock-recorder',
];
export const FOLLOWUP_REQUIRED: CareerActivityId[] = ['thank-you-email', 'follow-up-timing'];

export function lessonStepKey(
  lessonId: InterviewLessonId,
  stepId: InterviewLessonStepId
): string {
  return `${lessonId}:${stepId}`;
}

export function getDefaultInterviewDetails(): InterviewModuleDetails {
  return {
    currentLessonId: 'prepare',
    currentStepId: 'context',
    currentPracticeActivityIndex: 0,
    completedLessonSteps: [],
    completedLessons: [],
    completedActivityIds: [],
    answers: {},
  };
}

const REQUIRED_ACTIVITIES: CareerActivityId[] = [
  ...PREP_REQUIRED,
  ...PRACTICE_REQUIRED,
  ...FOLLOWUP_REQUIRED,
];

export function calculateInterviewProgress(details: InterviewModuleDetails): number {
  const lessonsDone = details.completedLessons.length;
  if (lessonsDone >= 3) return 100;

  const stepKeys = INTERVIEW_LESSON_ORDER.flatMap((lessonId) =>
    INTERVIEW_STEP_ORDER.map((stepId) => lessonStepKey(lessonId, stepId))
  );
  const stepsDone = stepKeys.filter((k) =>
    details.completedLessonSteps.includes(k)
  ).length;
  const totalSteps = stepKeys.length;
  const fromSteps = Math.round((stepsDone / totalSteps) * 100);

  const completed = REQUIRED_ACTIVITIES.filter((id) =>
    details.completedActivityIds.includes(id)
  ).length;
  const fromActivities = Math.round((completed / REQUIRED_ACTIVITIES.length) * 100);

  return Math.max(fromSteps, fromActivities);
}

export function isLessonComplete(
  lessonId: InterviewLessonId,
  completedLessonSteps: string[]
): boolean {
  return INTERVIEW_STEP_ORDER.every((stepId) =>
    completedLessonSteps.includes(lessonStepKey(lessonId, stepId))
  );
}

export function isPhaseComplete(
  phaseId: CareerPhaseId,
  completedIds: CareerActivityId[]
): boolean {
  switch (phaseId) {
    case 'prepare':
      return PREP_REQUIRED.every((id) => completedIds.includes(id));
    case 'practice':
      return PRACTICE_REQUIRED.every((id) => completedIds.includes(id));
    case 'follow-up':
      return FOLLOWUP_REQUIRED.every((id) => completedIds.includes(id));
    case 'finish':
      return true;
    default:
      return false;
  }
}

export function isInterviewModuleComplete(details: InterviewModuleDetails): boolean {
  if (details.completedLessons.length >= 3) return true;
  const allLessonsBySteps = INTERVIEW_LESSON_ORDER.every((id) =>
    isLessonComplete(id, details.completedLessonSteps)
  );
  if (allLessonsBySteps) return true;
  return (
    isPhaseComplete('prepare', details.completedActivityIds) &&
    isPhaseComplete('practice', details.completedActivityIds) &&
    isPhaseComplete('follow-up', details.completedActivityIds)
  );
}

/** Migrate legacy progress (phase + activity index) into lesson-step model */
export function normalizeInterviewDetails(
  raw: Partial<InterviewModuleDetails> | null | undefined
): InterviewModuleDetails {
  const base = getDefaultInterviewDetails();
  if (!raw || typeof raw !== 'object') return base;

  const merged: InterviewModuleDetails = {
    ...base,
    ...raw,
    answers: { ...base.answers, ...(raw.answers ?? {}) },
    completedActivityIds: raw.completedActivityIds ?? [],
    completedLessonSteps: raw.completedLessonSteps ?? [],
    completedLessons: raw.completedLessons ?? [],
    currentLessonId: raw.currentLessonId ?? base.currentLessonId,
    currentStepId: raw.currentStepId ?? base.currentStepId,
    currentPracticeActivityIndex: raw.currentPracticeActivityIndex ?? 0,
  };

  if (merged.completedLessonSteps.length > 0 || merged.completedLessons.length > 0) {
    return merged;
  }

  const completed = new Set(merged.completedActivityIds);
  const completedSteps: string[] = [];

  const markLessonFromActivities = (
    lessonId: InterviewLessonId,
    required: CareerActivityId[],
    allActivities: CareerActivityId[]
  ) => {
    const requiredDone = required.every((id) => completed.has(id));
    const anyDone = allActivities.some((id) => completed.has(id));
    if (requiredDone) {
      INTERVIEW_STEP_ORDER.forEach((stepId) => {
        completedSteps.push(lessonStepKey(lessonId, stepId));
      });
      if (!merged.completedLessons.includes(lessonId)) {
        merged.completedLessons.push(lessonId);
      }
    } else if (anyDone) {
      completedSteps.push(lessonStepKey(lessonId, 'context'));
      completedSteps.push(lessonStepKey(lessonId, 'example'));
    }
  };

  markLessonFromActivities(
    'prepare',
    PREP_REQUIRED,
    INTERVIEW_PHASES[0].activityIds
  );
  markLessonFromActivities(
    'practice',
    PRACTICE_REQUIRED,
    INTERVIEW_PHASES[1].activityIds
  );
  markLessonFromActivities(
    'follow-up',
    FOLLOWUP_REQUIRED,
    INTERVIEW_PHASES[2].activityIds
  );

  merged.completedLessonSteps = [...new Set([...merged.completedLessonSteps, ...completedSteps])];

  if (raw.currentPhaseId && !raw.currentLessonId) {
    const phase = raw.currentPhaseId;
    if (phase === 'finish' || merged.completedLessons.length >= 3) {
      merged.currentLessonId = 'follow-up';
      merged.currentStepId = 'test';
    } else if (phase === 'prepare' || phase === 'practice' || phase === 'follow-up') {
      merged.currentLessonId = phase;
      const phaseDef = INTERVIEW_PHASES.find((p) => p.id === phase);
      const idx = raw.currentActivityIndex ?? 0;
      if (phaseDef && idx > 0) {
        merged.currentStepId = 'practice';
        merged.currentPracticeActivityIndex = idx;
      } else if (completedSteps.includes(lessonStepKey(phase, 'context'))) {
        merged.currentStepId = completedSteps.includes(lessonStepKey(phase, 'example'))
          ? 'practice'
          : 'example';
      }
    }
  }

  return merged;
}

export function getNextLessonStep(
  lessonId: InterviewLessonId,
  stepId: InterviewLessonStepId
): { lessonId: InterviewLessonId; stepId: InterviewLessonStepId } | 'finish' {
  const stepIdx = INTERVIEW_STEP_ORDER.indexOf(stepId);
  if (stepIdx < INTERVIEW_STEP_ORDER.length - 1) {
    return { lessonId, stepId: INTERVIEW_STEP_ORDER[stepIdx + 1] };
  }
  const lessonIdx = INTERVIEW_LESSON_ORDER.indexOf(lessonId);
  if (lessonIdx < INTERVIEW_LESSON_ORDER.length - 1) {
    const nextLesson = INTERVIEW_LESSON_ORDER[lessonIdx + 1];
    return { lessonId: nextLesson, stepId: 'context' };
  }
  return 'finish';
}

export function canAccessLessonStep(
  details: InterviewModuleDetails,
  lessonId: InterviewLessonId,
  stepId: InterviewLessonStepId
): boolean {
  const lessonIdx = INTERVIEW_LESSON_ORDER.indexOf(lessonId);
  for (let i = 0; i < lessonIdx; i++) {
    const prev = INTERVIEW_LESSON_ORDER[i];
    if (!isLessonComplete(prev, details.completedLessonSteps)) return false;
  }

  const stepIdx = INTERVIEW_STEP_ORDER.indexOf(stepId);
  for (let j = 0; j < stepIdx; j++) {
    const prevStep = INTERVIEW_STEP_ORDER[j];
    if (!details.completedLessonSteps.includes(lessonStepKey(lessonId, prevStep))) {
      return false;
    }
  }
  return true;
}

/** True if user may open this step (first visit or review of completed step). */
export function canReviewLessonStep(
  details: InterviewModuleDetails,
  lessonId: InterviewLessonId,
  stepId: InterviewLessonStepId
): boolean {
  const key = lessonStepKey(lessonId, stepId);
  if (details.completedLessonSteps.includes(key)) return canNavigateToLesson(details, lessonId);
  return canAccessLessonStep(details, lessonId, stepId);
}

export function canNavigateToLesson(
  details: InterviewModuleDetails,
  lessonId: InterviewLessonId
): boolean {
  const lessonIdx = INTERVIEW_LESSON_ORDER.indexOf(lessonId);
  if (lessonIdx <= 0) return true;
  const prev = INTERVIEW_LESSON_ORDER[lessonIdx - 1];
  return (
    isLessonComplete(prev, details.completedLessonSteps) ||
    details.completedLessons.includes(prev)
  );
}

// --- Email Etiquette ---

export const EMAIL_MODULE_ID = 'email-etiquette';
export const EMAIL_BADGE_ID = 'badge-email';

export type EmailLessonId = 'audience' | 'construct' | 'send' | 'followthrough';

export type EmailActivityId =
  | 'recipient-id'
  | 'contact-type-sorter'
  | 'subject-line-surgeon'
  | 'email-anatomy-builder'
  | 'tone-calibrator'
  | 'length-editor'
  | 'cc-bcc-simulator'
  | 'timing-picker'
  | 'signature-builder'
  | 'followup-timing-simulator'
  | 'thankyou-email-builder'
  | 'tone-check-advanced';

export const EMAIL_LESSON_ORDER: EmailLessonId[] = [
  'audience',
  'construct',
  'send',
  'followthrough',
];

export interface EmailEtiquetteModuleAnswers {
  recipientIdResults?: Record<string, string>;
  contactTypeSorts?: Record<string, 'cold' | 'warm' | 'internal'>;
  subjectLineRewrites?: Record<string, string>;
  emailAnatomyDraft?: {
    subjectLine: string;
    openingHook: string;
    whyYouWhyThem: string;
    theAsk: string;
    professionalClose: string;
  };
  toneCalibrationResults?: Record<string, 'too-casual' | 'too-formal' | 'just-right'>;
  lengthEditResult?: string;
  ccBccSimulatorResults?: Record<string, 'individual' | 'cc' | 'bcc'>;
  timingRankingResult?: string[];
  signatureDraft?: {
    fullName: string;
    schoolOrRole: string;
    email: string;
    linkedIn?: string;
  };
  followupTimingResults?: Record<string, string>;
  thankYouEmailDraft?: {
    subjectLine: string;
    specificReference: string;
    whyItMattered: string;
    reinstateInterest: string;
    close: string;
  };
  toneCheckAdvancedResults?: Record<string, string>;
  lessonReflections?: Record<string, string>;
  testCheckpointResults?: Record<string, string | string[]>;
}

export interface EmailEtiquetteModuleDetails {
  currentLessonId: EmailLessonId;
  currentStepId: InterviewLessonStepId; // same 4-step flow: context | example | practice | test
  currentPracticeActivityIndex: number;
  completedLessonSteps: string[];
  completedLessons: EmailLessonId[];
  completedActivityIds: EmailActivityId[];
  answers: EmailEtiquetteModuleAnswers;
}

export const EMAIL_REQUIRED_ACTIVITIES: Record<EmailLessonId, EmailActivityId[]> = {
  audience: ['recipient-id', 'contact-type-sorter'],
  construct: ['email-anatomy-builder', 'tone-calibrator'],
  send: ['cc-bcc-simulator', 'signature-builder'],
  followthrough: ['followup-timing-simulator', 'thankyou-email-builder'],
};

export function emailLessonStepKey(
  lessonId: EmailLessonId,
  stepId: InterviewLessonStepId
): string {
  return `${lessonId}:${stepId}`;
}

export function getDefaultEmailEtiquetteDetails(): EmailEtiquetteModuleDetails {
  return {
    currentLessonId: 'audience',
    currentStepId: 'context',
    currentPracticeActivityIndex: 0,
    completedLessonSteps: [],
    completedLessons: [],
    completedActivityIds: [],
    answers: {},
  };
}

export function normalizeEmailEtiquetteDetails(
  raw: Partial<EmailEtiquetteModuleDetails> | null | undefined
): EmailEtiquetteModuleDetails {
  const base = getDefaultEmailEtiquetteDetails();
  if (!raw || typeof raw !== 'object') return base;
  return {
    ...base,
    ...raw,
    answers: { ...base.answers, ...(raw.answers ?? {}) },
    completedActivityIds: raw.completedActivityIds ?? [],
    completedLessonSteps: raw.completedLessonSteps ?? [],
    completedLessons: raw.completedLessons ?? [],
    currentLessonId: raw.currentLessonId ?? base.currentLessonId,
    currentStepId: raw.currentStepId ?? base.currentStepId,
    currentPracticeActivityIndex: raw.currentPracticeActivityIndex ?? 0,
  };
}

export function isEmailLessonComplete(
  lessonId: EmailLessonId,
  completedLessonSteps: string[]
): boolean {
  return INTERVIEW_STEP_ORDER.every((stepId) =>
    completedLessonSteps.includes(emailLessonStepKey(lessonId, stepId))
  );
}

export function calculateEmailEtiquetteProgress(
  details: EmailEtiquetteModuleDetails
): number {
  const lessonsDone = details.completedLessons.length;
  if (lessonsDone >= EMAIL_LESSON_ORDER.length) return 100;

  const stepKeys = EMAIL_LESSON_ORDER.flatMap((lessonId) =>
    INTERVIEW_STEP_ORDER.map((stepId) => emailLessonStepKey(lessonId, stepId))
  );
  const stepsDone = stepKeys.filter((k) =>
    details.completedLessonSteps.includes(k)
  ).length;
  const fromSteps = Math.round((stepsDone / stepKeys.length) * 100);

  const allRequired = EMAIL_LESSON_ORDER.flatMap((id) => EMAIL_REQUIRED_ACTIVITIES[id]);
  const completedRequired = allRequired.filter((id) =>
    details.completedActivityIds.includes(id)
  ).length;
  const fromActivities = allRequired.length === 0
    ? 0
    : Math.round((completedRequired / allRequired.length) * 100);

  return Math.max(fromSteps, fromActivities);
}

export function isEmailEtiquetteModuleComplete(
  details: EmailEtiquetteModuleDetails
): boolean {
  if (details.completedLessons.length >= EMAIL_LESSON_ORDER.length) return true;
  return EMAIL_LESSON_ORDER.every((id) =>
    isEmailLessonComplete(id, details.completedLessonSteps)
  );
}

export function getNextEmailLessonStep(
  lessonId: EmailLessonId,
  stepId: InterviewLessonStepId
): { lessonId: EmailLessonId; stepId: InterviewLessonStepId } | 'finish' {
  const stepIdx = INTERVIEW_STEP_ORDER.indexOf(stepId);
  if (stepIdx < INTERVIEW_STEP_ORDER.length - 1) {
    return { lessonId, stepId: INTERVIEW_STEP_ORDER[stepIdx + 1] };
  }
  const lessonIdx = EMAIL_LESSON_ORDER.indexOf(lessonId);
  if (lessonIdx < EMAIL_LESSON_ORDER.length - 1) {
    return { lessonId: EMAIL_LESSON_ORDER[lessonIdx + 1], stepId: 'context' };
  }
  return 'finish';
}

export function canAccessEmailLessonStep(
  details: EmailEtiquetteModuleDetails,
  lessonId: EmailLessonId,
  stepId: InterviewLessonStepId
): boolean {
  const lessonIdx = EMAIL_LESSON_ORDER.indexOf(lessonId);
  for (let i = 0; i < lessonIdx; i++) {
    if (!isEmailLessonComplete(EMAIL_LESSON_ORDER[i], details.completedLessonSteps)) {
      return false;
    }
  }
  const stepIdx = INTERVIEW_STEP_ORDER.indexOf(stepId);
  for (let j = 0; j < stepIdx; j++) {
    if (!details.completedLessonSteps.includes(emailLessonStepKey(lessonId, INTERVIEW_STEP_ORDER[j]))) {
      return false;
    }
  }
  return true;
}

export function canReviewEmailLessonStep(
  details: EmailEtiquetteModuleDetails,
  lessonId: EmailLessonId,
  stepId: InterviewLessonStepId
): boolean {
  const key = emailLessonStepKey(lessonId, stepId);
  if (details.completedLessonSteps.includes(key)) {
    return canNavigateToEmailLesson(details, lessonId);
  }
  return canAccessEmailLessonStep(details, lessonId, stepId);
}

export function canNavigateToEmailLesson(
  details: EmailEtiquetteModuleDetails,
  lessonId: EmailLessonId
): boolean {
  const lessonIdx = EMAIL_LESSON_ORDER.indexOf(lessonId);
  if (lessonIdx <= 0) return true;
  const prev = EMAIL_LESSON_ORDER[lessonIdx - 1];
  return (
    isEmailLessonComplete(prev, details.completedLessonSteps) ||
    details.completedLessons.includes(prev)
  );
}

// --- Resume Builder ---

export const RESUME_MODULE_ID = 'resume-builder';
export const RESUME_BADGE_ID = 'badge-resume';

export type ResumeSectionId =
  | 'contact'
  | 'education'
  | 'experience'
  | 'leadership'
  | 'additional'
  | 'preview';

export const RESUME_SECTION_ORDER: ResumeSectionId[] = [
  'contact',
  'education',
  'experience',
  'leadership',
  'additional',
  'preview',
];

export interface ResumeContact {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
}

export interface ResumeEducation {
  school: string;
  location: string;
  degree: string;
  graduationDate: string;
  gpa: string;
  relevantCourses: string;
}

export interface ResumeBullet {
  id: string;
  text: string;
}

export interface ResumeRoleEntry {
  id: string;
  organization: string;
  location: string;
  title: string;
  dateRange: string;
  bullets: ResumeBullet[];
}

export interface ResumeAdditional {
  additionalActivities: string;
  honorsAwards: string;
  skills: string;
  interests: string;
}

export interface ResumeBuilderAnswers {
  contact: ResumeContact;
  education: ResumeEducation;
  experience: ResumeRoleEntry[];
  leadership: ResumeRoleEntry[];
  additional: ResumeAdditional;
}

export interface ResumeBuilderDetails {
  currentSectionId: ResumeSectionId;
  completedSections: ResumeSectionId[];
  answers: ResumeBuilderAnswers;
  isComplete: boolean;
}

export interface ResumeBulletCheckChecks {
  actionVerb: boolean;
  quantification: boolean;
  clarity: boolean;
  relevance: boolean;
  format: boolean;
}

export interface ResumeBulletCheckResult {
  score: number;
  checks: ResumeBulletCheckChecks;
  issues: string[];
  improvedBullet: string;
  storySignal: string;
}

export function createEmptyResumeAnswers(): ResumeBuilderAnswers {
  return {
    contact: { fullName: '', email: '', phone: '', linkedIn: '' },
    education: {
      school: '',
      location: '',
      degree: '',
      graduationDate: '',
      gpa: '',
      relevantCourses: '',
    },
    experience: [createResumeRoleEntry()],
    leadership: [createResumeRoleEntry()],
    additional: {
      additionalActivities: '',
      honorsAwards: '',
      skills: '',
      interests: '',
    },
  };
}

export function getDefaultResumeDetails(): ResumeBuilderDetails {
  return {
    currentSectionId: 'contact',
    completedSections: [],
    answers: createEmptyResumeAnswers(),
    isComplete: false,
  };
}

export function createResumeRoleEntry(): ResumeRoleEntry {
  return {
    id: safeRandomUUID(),
    organization: '',
    location: '',
    title: '',
    dateRange: '',
    bullets: [{ id: safeRandomUUID(), text: '' }],
  };
}

export function createResumeBullet(): ResumeBullet {
  return { id: safeRandomUUID(), text: '' };
}

function isContactComplete(contact: ResumeContact): boolean {
  return (
    contact.fullName.trim().length >= 2 &&
    contact.email.trim().includes('@') &&
    contact.phone.trim().length >= 7
  );
}

function isEducationComplete(education: ResumeEducation): boolean {
  return (
    education.school.trim().length >= 2 &&
    education.degree.trim().length >= 2 &&
    education.graduationDate.trim().length >= 4
  );
}

function isRoleListComplete(entries: ResumeRoleEntry[]): boolean {
  if (entries.length === 0) return false;
  return entries.every(
    (e) =>
      e.organization.trim().length >= 2 &&
      e.title.trim().length >= 2 &&
      e.dateRange.trim().length >= 4 &&
      e.bullets.some((b) => b.text.trim().length >= 20)
  );
}

function isAdditionalComplete(additional: ResumeAdditional): boolean {
  return (
    additional.skills.trim().length >= 5 ||
    additional.honorsAwards.trim().length >= 5
  );
}

export function isResumeSectionComplete(
  sectionId: ResumeSectionId,
  answers: ResumeBuilderAnswers
): boolean {
  switch (sectionId) {
    case 'contact':
      return isContactComplete(answers.contact);
    case 'education':
      return isEducationComplete(answers.education);
    case 'experience':
      return isRoleListComplete(answers.experience);
    case 'leadership':
      return isRoleListComplete(answers.leadership);
    case 'additional':
      return isAdditionalComplete(answers.additional);
    case 'preview':
      return (
        isContactComplete(answers.contact) &&
        isEducationComplete(answers.education) &&
        isRoleListComplete(answers.experience)
      );
    default:
      return false;
  }
}

export function calculateResumeProgress(details: ResumeBuilderDetails): number {
  const formSections = RESUME_SECTION_ORDER.filter((s) => s !== 'preview');
  const done = formSections.filter((s) =>
    details.completedSections.includes(s) || isResumeSectionComplete(s, details.answers)
  ).length;
  if (details.isComplete) return 100;
  return Math.round((done / formSections.length) * 100);
}

export function isResumeModuleComplete(details: ResumeBuilderDetails): boolean {
  return details.isComplete || calculateResumeProgress(details) >= 100;
}

export function canAccessResumeSection(
  details: ResumeBuilderDetails,
  sectionId: ResumeSectionId
): boolean {
  const idx = RESUME_SECTION_ORDER.indexOf(sectionId);
  if (idx <= 0) return true;
  for (let i = 0; i < idx; i++) {
    const prev = RESUME_SECTION_ORDER[i];
    if (prev === 'preview') continue;
    if (
      !details.completedSections.includes(prev) &&
      !isResumeSectionComplete(prev, details.answers)
    ) {
      return false;
    }
  }
  return true;
}

export function normalizeResumeDetails(
  raw: Partial<ResumeBuilderDetails> | null | undefined
): ResumeBuilderDetails {
  const base = getDefaultResumeDetails();
  if (!raw || typeof raw !== 'object') return base;
  return {
    ...base,
    ...raw,
    answers: {
      ...base.answers,
      ...(raw.answers ?? {}),
      contact: { ...base.answers.contact, ...(raw.answers?.contact ?? {}) },
      education: { ...base.answers.education, ...(raw.answers?.education ?? {}) },
      additional: { ...base.answers.additional, ...(raw.answers?.additional ?? {}) },
      experience: raw.answers?.experience ?? base.answers.experience,
      leadership: raw.answers?.leadership ?? base.answers.leadership,
    },
    completedSections: raw.completedSections ?? base.completedSections,
    currentSectionId: raw.currentSectionId ?? base.currentSectionId,
    isComplete: raw.isComplete ?? base.isComplete,
  };
}
