import type {
  MockCompanyCard,
  SignalNoiseItem,
  BehavioralQuestion,
  AnswerCoachScenario,
  FinanceFitQuestion,
  FollowUpTimingScenario,
  ToneCheckScenario,
  CareerActivityId,
  InterviewLessonId,
  InterviewLessonStepId,
} from '@/types/career-readiness';

export const INTERVIEW_MODULE_ID = 'interviewing';
export const INTERVIEW_BADGE_ID = 'badge-interviewing';

export const ACTIVITY_LABELS: Record<CareerActivityId, { title: string; description: string }> = {
  'research-sprint': {
    title: 'Company Research Sprint',
    description: 'Pick the facts that actually help you in a business or finance interview.',
  },
  'signal-noise': {
    title: 'Signal vs. Noise',
    description: 'Sort research notes into what to use, what is nice to know, and what to skip.',
  },
  'why-role-builder': {
    title: 'Why This Role',
    description: 'Build a specific answer for why you want this company and role.',
  },
  'question-planner': {
    title: 'Question Planner',
    description: 'Draft three smart questions to ask your interviewer.',
  },
  'star-builder': {
    title: 'STAR Story Builder',
    description: 'Structure one strong behavioral story using Situation, Task, Action, Result.',
  },
  'behavioral-deck': {
    title: 'Behavioral Question Deck',
    description: 'Practice answers to common finance and business interview questions.',
  },
  'answer-coach': {
    title: 'Answer Quality Coach',
    description: 'Spot what makes an interview answer weak, okay, or strong.',
  },
  'mock-recorder': {
    title: 'Mock Response Recorder',
    description: 'Record or write a practice answer and reflect on your delivery.',
  },
  'finance-fit': {
    title: 'Finance Fit Practice',
    description: 'Answer role-specific questions about finance interest and market awareness.',
  },
  'thank-you-email': {
    title: 'Thank-You Email Builder',
    description: 'Write a professional thank-you note that references the conversation.',
  },
  'follow-up-timing': {
    title: 'Follow-Up Timing Simulator',
    description: 'Choose the right follow-up move for different post-interview situations.',
  },
  'question-recovery': {
    title: 'Question Recovery',
    description: 'Write thoughtful follow-up questions you forgot to ask live.',
  },
  'tone-check': {
    title: 'Tone Check',
    description: 'Pick which email sounds professional—not vague or pushy.',
  },
};

export const MOCK_COMPANY: MockCompanyCard = {
  id: 'greenfield-capital',
  name: 'Greenfield Capital Partners',
  role: 'Summer Analyst — Business & Finance',
  sector: 'Investment research & advisory',
  facts: [
    { id: 'f1', text: 'Led a $420M renewable energy bond for a regional utility in Q1', isUseful: true, category: 'Recent deals' },
    { id: 'f2', text: 'CEO posted a vacation photo on Instagram last week', isUseful: false, category: 'Social media' },
    { id: 'f3', text: 'Culture emphasizes mentorship: every analyst paired with a VP sponsor', isUseful: true, category: 'Culture' },
    { id: 'f4', text: 'Competitors include Meridian Advisory and Northbridge Partners', isUseful: true, category: 'Market position' },
    { id: 'f5', text: 'Office building was renovated in 2019', isUseful: false, category: 'Facilities' },
    { id: 'f6', text: 'Clients are mid-market companies ($50M–$500M revenue)', isUseful: true, category: 'Clients' },
    { id: 'f7', text: 'Stock price of an unrelated tech company dropped 3%', isUseful: false, category: 'Noise' },
    { id: 'f8', text: 'Recent hire from your university’s finance club—shows campus recruiting', isUseful: true, category: 'Recruiting' },
  ],
};

export const SIGNAL_NOISE_ITEMS: SignalNoiseItem[] = [
  { id: 'sn1', text: 'Recent transaction the firm advised on', correctBucket: 'use', explanation: 'Shows you did real homework and can connect to their work.' },
  { id: 'sn2', text: 'Generic mission statement copied from the website', correctBucket: 'ignore', explanation: 'Everyone says this. It does not differentiate you.' },
  { id: 'sn3', text: 'How feedback is delivered on the team', correctBucket: 'use', explanation: 'Great question material and shows you think about growth.' },
  { id: 'sn4', text: 'CEO’s college major from 1998', correctBucket: 'ignore', explanation: 'Interesting trivia, not interview leverage.' },
  { id: 'sn5', text: 'Competitor landscape in their niche', correctBucket: 'use', explanation: 'Demonstrates business awareness.' },
  { id: 'sn6', text: 'Office snack options', correctBucket: 'nice', explanation: 'Fine for small talk, not for “why us.”' },
  { id: 'sn7', text: 'Salary range on Glassdoor (before offer stage)', correctBucket: 'ignore', explanation: 'Do not lead with compensation in early interviews.' },
  { id: 'sn8', text: 'Team structure for the role you want', correctBucket: 'use', explanation: 'Helps you ask smart questions and show fit.' },
];

export const BEHAVIORAL_QUESTIONS: BehavioralQuestion[] = [
  {
    id: 'bq1',
    question: 'Tell me about a time you failed.',
    lookingFor: 'Self-awareness, what you learned, and how you improved.',
    tip: 'Pick a real setback with a clear lesson—not “I never fail.”',
  },
  {
    id: 'bq2',
    question: 'Describe a leadership experience under pressure.',
    lookingFor: 'Decision-making, composure, and how you supported the team.',
    tip: 'Quantify the outcome when you can (grade, dollars, time saved).',
  },
  {
    id: 'bq3',
    question: 'Give an example of effective teamwork.',
    lookingFor: 'Collaboration, your specific contribution, and shared success.',
    tip: 'Credit the team while highlighting your role.',
  },
  {
    id: 'bq4',
    question: 'How do you handle conflict?',
    lookingFor: 'Professional communication, listening, and resolution.',
    tip: 'Avoid blaming others; focus on the process you used.',
  },
  {
    id: 'bq5',
    question: 'Why this firm specifically?',
    lookingFor: 'Genuine research, cultural fit, and specific reasons beyond prestige.',
    tip: 'Mention a deal, client type, or value that matches your interests.',
  },
];

export const ANSWER_COACH_SCENARIOS: AnswerCoachScenario[] = [
  {
    id: 'ac1',
    question: 'Tell me about a time you showed leadership.',
    weak: 'I am a natural leader and people always look to me.',
    okay: 'In a group project I organized meetings and we finished on time.',
    strong: 'When our project lead quit two weeks before the deadline, I set daily check-ins, reassigned tasks, and we delivered a 92% client score.',
    correctChoice: 'strong',
    feedback: 'Strong answers use STAR structure, specific actions, and a measurable result.',
  },
  {
    id: 'ac2',
    question: 'Why do you want to work in finance?',
    weak: 'Finance pays well and sounds prestigious.',
    okay: 'I like numbers and want to learn about markets.',
    strong: 'After analyzing my school’s budget as treasurer, I saw how capital allocation drives outcomes—that pulled me toward advisory work and real deal research.',
    correctChoice: 'strong',
    feedback: 'Connect a real experience to the role. Avoid prestige-only answers.',
  },
];

export const FINANCE_FIT_QUESTIONS: FinanceFitQuestion[] = [
  {
    id: 'ff1',
    question: 'Why are you interested in business or finance?',
    placeholder: 'Start with a specific moment or project that sparked your interest…',
    minLength: 80,
  },
  {
    id: 'ff2',
    question: 'Tell me about a company or market trend you follow.',
    placeholder: 'Name the company/trend, why it matters, and one thing you would watch…',
    minLength: 60,
  },
  {
    id: 'ff3',
    question: 'Explain a financial concept you know in plain English.',
    placeholder: 'e.g. EBITDA, cash flow, or compound interest—define it like you would to a friend.',
    minLength: 50,
  },
];

export const FOLLOW_UP_TIMING_SCENARIOS: FollowUpTimingScenario[] = [
  {
    id: 'ft1',
    situation: 'Interview ended yesterday afternoon. No instructions yet.',
    options: [
      { id: 'a', label: 'Send a thank-you email within 24 hours', isCorrect: true, feedback: 'Yes—prompt, professional gratitude while you are still fresh in their mind.' },
      { id: 'b', label: 'Wait two weeks in case they are busy', isCorrect: false, feedback: 'Too long for a thank-you. Send within 24 hours.' },
      { id: 'c', label: 'Ask about salary in the thank-you note', isCorrect: false, feedback: 'Keep the thank-you focused on appreciation and fit, not compensation.' },
    ],
  },
  {
    id: 'ft2',
    situation: 'One week passed. They said they would decide “soon” but you have not heard back.',
    options: [
      { id: 'a', label: 'Send a brief, polite check-in referencing your interest', isCorrect: true, feedback: 'A short follow-up is appropriate after about a week.' },
      { id: 'b', label: 'Email every day until they respond', isCorrect: false, feedback: 'Multiple daily emails feel pushy and unprofessional.' },
      { id: 'c', label: 'Assume rejection and post about it online', isCorrect: false, feedback: 'Stay professional privately and in public.' },
    ],
  },
  {
    id: 'ft3',
    situation: 'You received a rejection email.',
    options: [
      { id: 'a', label: 'Reply graciously, thank them, and leave the door open', isCorrect: true, feedback: 'Finance is relationship-driven. A gracious reply can help future opportunities.' },
      { id: 'b', label: 'Argue that they made the wrong decision', isCorrect: false, feedback: 'Never debate a rejection—it burns bridges.' },
      { id: 'c', label: 'Ignore the email completely', isCorrect: false, feedback: 'A brief gracious reply shows maturity.' },
    ],
  },
];

export const TONE_CHECK_SCENARIOS: ToneCheckScenario[] = [
  {
    id: 'tc1',
    context: 'Thank-you email after a first-round interview',
    emails: [
      { id: 'e1', subject: 'Thanks', body: 'Thanks for the interview.', rating: 'vague' },
      { id: 'e2', subject: 'Following up — Summer Analyst', body: 'Dear Ms. Rivera, Thank you for discussing Greenfield’s renewable bond work today. Our conversation about analyst mentorship reinforced my interest in the Summer Analyst role. I appreciate your time and look forward to next steps. Best, Jordan', rating: 'professional' },
      { id: 'e3', subject: 'URGENT: Need decision ASAP', body: 'I need to know if I got the job by Friday or I will accept another offer.', rating: 'pushy' },
    ],
    correctId: 'e2',
    feedback: 'Professional thank-yous are specific, concise, and warm—not vague or demanding.',
  },
];

export const RESEARCH_SPRINT_MIN_SELECTIONS = 4;
export const SIGNAL_NOISE_MIN_CORRECT = 6;
export const BEHAVIORAL_MIN_ANSWERS = 2;
export const STAR_MIN_FIELDS = 4;

export interface LessonContextContent {
  headline: string;
  intro: string;
  significance: string[];
  keyTerms: { term: string; definition: string }[];
  reflectionPrompt: string;
  reflectionKey: string;
}

export interface LessonExampleContent {
  headline: string;
  scenario: string;
  walkthrough: { label: string; detail: string }[];
  takeaway: string;
}

export interface LessonTestItem {
  id: string;
  prompt: string;
  options: { id: string; label: string; isCorrect: boolean; feedback: string }[];
}

export interface InterviewLessonConfig {
  id: InterviewLessonId;
  title: string;
  subtitle: string;
  iconLabel: string;
  context: LessonContextContent;
  example: LessonExampleContent;
  practiceActivityIds: CareerActivityId[];
  test: {
    title: string;
    description: string;
    minCorrect: number;
    items: LessonTestItem[];
  };
}

export const INTERVIEW_LESSONS: InterviewLessonConfig[] = [
  {
    id: 'prepare',
    title: 'Prepare',
    subtitle: 'Research the firm, filter signal from noise, and plan your story',
    iconLabel: '1',
    context: {
      headline: 'Why preparation changes the interview',
      intro:
        'Interviewers in business and finance assume you did homework. Preparation is not memorizing their website—it is building 3–5 specific proof points you can weave into answers and questions.',
      significance: [
        'Shows genuine interest beyond “I need a job.”',
        'Helps you ask questions that sound like a future colleague, not a tourist.',
        'Reduces panic when they ask “Why us?” or “What do you know about our clients?”',
      ],
      keyTerms: [
        {
          term: 'Signal',
          definition: 'Facts you can use in answers: deals, clients, culture, competitors, team structure.',
        },
        {
          term: 'Noise',
          definition: 'Trivia that sounds impressive but does not help you answer or ask better questions.',
        },
        {
          term: 'Question bank',
          definition: '2–3 thoughtful questions you prepare before the interview—not invented on the spot.',
        },
      ],
      reflectionPrompt:
        'In one sentence: what would make you sound unprepared in a finance interview?',
      reflectionKey: 'prepare-context-reflection',
    },
    example: {
      headline: 'Example: Turning research into an answer',
      scenario:
        'You are interviewing at Greenfield Capital Partners for a Summer Analyst role. You found eight facts—only some belong in your “Why us?” answer.',
      walkthrough: [
        {
          label: 'Strong signal',
          detail:
            '“Greenfield advised on a $420M renewable energy bond—aligns with my interest in project finance and ESG-linked capital markets.”',
        },
        {
          label: 'Weak noise',
          detail: '“The CEO posted a vacation photo last week.” — Interesting, but not interview leverage.',
        },
        {
          label: 'Smart question',
          detail:
            '“How do analysts get exposure to live deals in the first 90 days?” — Shows you thought about the role.',
        },
      ],
      takeaway:
        'Pick facts that connect to your story. Skip trivia. End with a question that only someone who researched the firm would ask.',
    },
    practiceActivityIds: [
      'research-sprint',
      'signal-noise',
      'why-role-builder',
      'question-planner',
    ],
    test: {
      title: 'Preparation checkpoint',
      description: 'Confirm you can spot interview-ready research vs. noise.',
      minCorrect: 2,
      items: [
        {
          id: 'prep-t1',
          prompt: 'Which fact belongs in a “Why Greenfield?” answer?',
          options: [
            {
              id: 'a',
              label: 'Recent $420M renewable energy bond the firm advised on',
              isCorrect: true,
              feedback: 'Yes—specific, relevant, and ties to business work.',
            },
            {
              id: 'b',
              label: 'Office building renovated in 2019',
              isCorrect: false,
              feedback: 'Facilities trivia rarely differentiates candidates.',
            },
            {
              id: 'c',
              label: 'Unrelated tech stock dropped 3% yesterday',
              isCorrect: false,
              feedback: 'Market noise unless you are applying to that company.',
            },
          ],
        },
        {
          id: 'prep-t2',
          prompt: 'Best question to ask near the end of round one?',
          options: [
            {
              id: 'a',
              label: 'What is the salary range for this role?',
              isCorrect: false,
              feedback: 'Save compensation for later stages.',
            },
            {
              id: 'b',
              label: 'How is feedback delivered between analysts and VPs?',
              isCorrect: true,
              feedback: 'Shows culture awareness and growth mindset.',
            },
            {
              id: 'c',
              label: 'Did I get the job?',
              isCorrect: false,
              feedback: 'Too direct for a first conversation.',
            },
          ],
        },
        {
          id: 'prep-t3',
          prompt: 'Generic mission statement copied from the website is…',
          options: [
            {
              id: 'a',
              label: 'High-signal research',
              isCorrect: false,
              feedback: 'Everyone can quote this—it does not differentiate you.',
            },
            {
              id: 'b',
              label: 'Noise for early-round interviews',
              isCorrect: true,
              feedback: 'Right—replace with specifics: deals, clients, culture.',
            },
            {
              id: 'c',
              label: 'Required to memorize word-for-word',
              isCorrect: false,
              feedback: 'Parroting marketing copy sounds robotic.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'practice',
    title: 'Practice',
    subtitle: 'Structure stories, rehearse answers, and build finance fluency',
    iconLabel: '2',
    context: {
      headline: 'Why practice beats cramming',
      intro:
        'Strong interview answers are structured stories with evidence—not lists of adjectives. Practice helps you sound natural when nerves spike.',
      significance: [
        'STAR format keeps behavioral answers under 2 minutes and memorable.',
        'Finance interviews test how you think, not whether you memorized definitions.',
        'Recording yourself reveals filler words, pace issues, and vague claims.',
      ],
      keyTerms: [
        {
          term: 'STAR',
          definition: 'Situation, Task, Action, Result—a framework for behavioral answers.',
        },
        {
          term: 'Behavioral question',
          definition: '“Tell me about a time…” — interviewers predict future performance from past behavior.',
        },
        {
          term: 'Finance fit',
          definition: 'Questions about markets, interest in finance, and explaining concepts plainly.',
        },
      ],
      reflectionPrompt:
        'Which matters more in a behavioral answer: sounding confident, or giving a specific result?',
      reflectionKey: 'practice-context-reflection',
    },
    example: {
      headline: 'Example: Weak vs. strong behavioral answer',
      scenario: 'Interviewer asks: “Tell me about a time you showed leadership under pressure.”',
      walkthrough: [
        {
          label: 'Weak',
          detail: '“I am a natural leader and people always look to me.” — No evidence, no outcome.',
        },
        {
          label: 'Okay',
          detail: '“I organized meetings on a group project and we finished on time.” — Better, but vague.',
        },
        {
          label: 'Strong (STAR)',
          detail:
            '“When our project lead quit two weeks before the deadline, I ran daily check-ins, reassigned tasks, and we delivered a 92% client score.”',
        },
      ],
      takeaway:
        'Lead with a real situation, your specific action, and a measurable result. Credit the team, but own your contribution.',
    },
    practiceActivityIds: [
      'star-builder',
      'behavioral-deck',
      'answer-coach',
      'mock-recorder',
      'finance-fit',
    ],
    test: {
      title: 'Practice checkpoint',
      description: 'Spot the answer a finance interviewer would remember.',
      minCorrect: 2,
      items: ANSWER_COACH_SCENARIOS.slice(0, 2).map((s) => ({
        id: `practice-${s.id}`,
        prompt: s.question,
        options: [
          {
            id: 'weak',
            label: `Weak: ${s.weak.slice(0, 72)}${s.weak.length > 72 ? '…' : ''}`,
            isCorrect: s.correctChoice === 'weak',
            feedback:
              s.correctChoice === 'weak' ? s.feedback : 'Too vague or prestige-only—add specifics.',
          },
          {
            id: 'okay',
            label: `Okay: ${s.okay.slice(0, 72)}${s.okay.length > 72 ? '…' : ''}`,
            isCorrect: s.correctChoice === 'okay',
            feedback:
              s.correctChoice === 'okay' ? s.feedback : 'Better than weak, but still needs a clear result.',
          },
          {
            id: 'strong',
            label: `Strong: ${s.strong.slice(0, 72)}${s.strong.length > 72 ? '…' : ''}`,
            isCorrect: s.correctChoice === 'strong',
            feedback:
              s.correctChoice === 'strong' ? s.feedback : 'Strong answers use STAR, actions, and measurable results.',
          },
        ],
      })),
    },
  },
  {
    id: 'follow-up',
    title: 'Follow Up',
    subtitle: 'Thank-you notes, timing, and professional tone after the interview',
    iconLabel: '3',
    context: {
      headline: 'Why follow-up is part of the interview',
      intro:
        'Your work is not done when the Zoom ends. Thank-you notes and thoughtful follow-ups signal professionalism—and finance is relationship-driven.',
      significance: [
        'Thank-you emails keep you top-of-mind while interviewers debrief.',
        'Timing matters: prompt gratitude vs. pushy check-ins.',
        'Tone can reinforce fit—or raise red flags about judgment.',
      ],
      keyTerms: [
        {
          term: 'Thank-you note',
          definition: 'Sent within 24 hours; references something specific from the conversation.',
        },
        {
          term: 'Check-in',
          definition: 'Brief, polite note after ~1 week if you have not heard back.',
        },
        {
          term: 'Recovery question',
          definition: 'A thoughtful question you forgot to ask—can be included in follow-up email.',
        },
      ],
      reflectionPrompt:
        'What is worse after an interview: no thank-you, or a pushy daily email?',
      reflectionKey: 'followup-context-reflection',
    },
    example: {
      headline: 'Example: Professional thank-you vs. red flags',
      scenario: 'First-round interview ended yesterday. You need to send a thank-you email.',
      walkthrough: [
        {
          label: 'Vague',
          detail: 'Subject: “Thanks” — Body: “Thanks for the interview.” — Feels generic and rushed.',
        },
        {
          label: 'Professional',
          detail:
            'References the renewable bond discussion and mentorship—restates interest, warm close.',
        },
        {
          label: 'Pushy',
          detail: '“URGENT: Need decision by Friday or I accept another offer.” — Creates pressure, not fit.',
        },
      ],
      takeaway:
        'Be specific, concise, and warm. Never negotiate salary or demand timelines in a thank-you.',
    },
    practiceActivityIds: [
      'thank-you-email',
      'follow-up-timing',
      'question-recovery',
      'tone-check',
    ],
    test: {
      title: 'Follow-up checkpoint',
      description: 'Choose the right move for each post-interview situation.',
      minCorrect: 2,
      items: FOLLOW_UP_TIMING_SCENARIOS.slice(0, 2).map((s) => ({
        id: `followup-${s.id}`,
        prompt: s.situation,
        options: s.options.map((o) => ({
          id: o.id,
          label: o.label,
          isCorrect: o.isCorrect,
          feedback: o.feedback,
        })),
      })),
    },
  },
];

export const LESSON_STEP_LABELS: Record<
  InterviewLessonStepId,
  { label: string; shortLabel: string; ctaContinue: string; ctaStart: string }
> = {
  context: {
    label: 'Context & Significance',
    shortLabel: 'Context',
    ctaStart: 'Start lesson',
    ctaContinue: 'Continue to example',
  },
  example: {
    label: 'Example',
    shortLabel: 'Example',
    ctaStart: 'View example',
    ctaContinue: 'Start practice simulations',
  },
  practice: {
    label: 'Practice & Simulations',
    shortLabel: 'Practice',
    ctaStart: 'Begin simulations',
    ctaContinue: 'Take lesson checkpoint',
  },
  test: {
    label: 'Test & Finish',
    shortLabel: 'Test',
    ctaStart: 'Take checkpoint',
    ctaContinue: 'Complete lesson',
  },
};

export function getLessonConfig(lessonId: InterviewLessonId): InterviewLessonConfig {
  const lesson = INTERVIEW_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) return INTERVIEW_LESSONS[0];
  return lesson;
}
