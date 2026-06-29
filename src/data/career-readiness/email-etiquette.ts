import type {
  LessonContextContent,
  LessonExampleContent,
  LessonTestItem,
} from '@/data/career-readiness/interviewing';
import type {
  EmailActivityId,
  EmailLessonId,
} from '@/types/career-readiness';

export const EMAIL_MODULE_ID = 'email-etiquette';
export const EMAIL_BADGE_ID = 'badge-email';

export interface EmailLessonConfig {
  id: EmailLessonId;
  title: string;
  subtitle: string;
  iconLabel: string;
  context: LessonContextContent;
  example: LessonExampleContent;
  practiceActivityIds: EmailActivityId[];
  test: {
    title: string;
    description: string;
    minCorrect: number;
    items: LessonTestItem[];
  };
}

export const EMAIL_ACTIVITY_LABELS: Record<EmailActivityId, { title: string; description: string }> = {
  'recipient-id': {
    title: 'Recipient ID',
    description: 'Read each scenario and label the contact as cold, warm, or internal.',
  },
  'contact-type-sorter': {
    title: 'Contact Type Sorter',
    description: 'Drop each situation into the right bucket — cold, warm, or internal.',
  },
  'subject-line-surgeon': {
    title: 'Subject Line Surgeon',
    description: 'Rewrite weak subject lines so they actually get opened.',
  },
  'email-anatomy-builder': {
    title: 'Email Anatomy Builder',
    description: 'Build a cold email piece by piece and watch it assemble live.',
  },
  'tone-calibrator': {
    title: 'Tone Calibrator',
    description: 'Swipe each excerpt: too casual, too formal, or just right.',
  },
  'length-editor': {
    title: 'Length Editor',
    description: 'Cut a bloated email down to four sentences without losing the message.',
  },
  'cc-bcc-simulator': {
    title: 'CC vs. BCC Simulator',
    description: 'Pick individual, CC, or BCC for each scenario — and see the fallout.',
  },
  'timing-picker': {
    title: 'Timing Picker',
    description: 'Rank emails by likelihood of being seen based on when they were sent.',
  },
  'signature-builder': {
    title: 'Signature Builder',
    description: 'Build a clean, professional signature that looks the part.',
  },
  'followup-timing-simulator': {
    title: 'Follow-Up Timing',
    description: 'When to send now, when to wait, and when to back off.',
  },
  'thankyou-email-builder': {
    title: 'Thank-You Email Builder',
    description: 'Write the message that gets you remembered after a meeting.',
  },
  'tone-check-advanced': {
    title: 'Tone Check — Pro Level',
    description: 'Spot the follow-up tone that lands — not pushy, not passive.',
  },
};

export const EMAIL_LESSONS: EmailLessonConfig[] = [
  {
    id: 'audience',
    title: 'Know Your Audience',
    subtitle: 'Understand who you’re writing to before you write a word',
    iconLabel: '1',
    context: {
      headline: 'The person on the other end changes everything',
      intro:
        'Every professional email you send lands in front of a real person with a real inbox. Whether you are reaching out cold or following up with someone you have already met, the relationship determines the rules — tone, length, how you open, and how you close. Getting this right is what separates emails that get responses from ones that never get opened.',
      significance: [
        'Sending the wrong tone to the wrong person is one of the most common ways to end a conversation before it starts.',
        'Knowing your audience lets you decide how formal to be, what to reference, and how much context to give.',
        'Cold contacts need more context and a sharper hook. Existing contacts need warmth and a clear ask.',
      ],
      keyTerms: [
        {
          term: 'Cold contact',
          definition:
            'Someone you have never communicated with before who does not know who you are.',
        },
        {
          term: 'Warm contact',
          definition:
            'Someone you have met, been introduced to, or previously corresponded with.',
        },
        {
          term: 'Internal contact',
          definition:
            'A colleague, teammate, or classmate at the same organization as you.',
        },
      ],
      reflectionPrompt:
        'Think about the last message you sent to someone you did not know. What did you lead with — and was it the right move?',
      reflectionKey: 'audience-context-reflection',
    },
    example: {
      headline: 'Same ask, three very different emails',
      scenario:
        'You want to ask someone about career opportunities in investment banking.',
      walkthrough: [
        {
          label: 'Cold contact (never met)',
          detail:
            'Short, specific, low-ask. Open with who you are in one sentence. Explain why them specifically. Make the ask tiny — 15 minutes, not a favor. No attachments.',
        },
        {
          label: 'Warm contact (met at an event)',
          detail:
            'Reference the connection immediately. Be warmer, slightly longer. You can ask for a bit more because they already know you exist.',
        },
        {
          label: 'Internal contact (same school/org)',
          detail:
            'Casual is okay. You can be direct. Still professional — but you don’t need to explain who you are.',
        },
      ],
      takeaway:
        'Cold emails earn attention. Warm emails build on it. Knowing which one you are writing changes your entire opening.',
    },
    practiceActivityIds: ['recipient-id', 'contact-type-sorter', 'subject-line-surgeon'],
    test: {
      title: 'Audience check',
      description: 'Pick the right move for each situation.',
      minCorrect: 2,
      items: [
        {
          id: 'audience-q1',
          prompt:
            'You want to connect with a VP at a bank you have never spoken to. What should your subject line include?',
          options: [
            {
              id: 'a',
              label: 'Your name, your ask, and a specific reason you chose them',
              isCorrect: true,
              feedback:
                'Exactly. Cold subject lines that signal who, what, and why get opened.',
            },
            {
              id: 'b',
              label: '“Hi there”',
              isCorrect: false,
              feedback: 'Vague subject lines get deleted on sight.',
            },
            {
              id: 'c',
              label: '“Important: Please read”',
              isCorrect: false,
              feedback: 'Reads as spammy and presumptuous.',
            },
            {
              id: 'd',
              label: '“Opportunity for you”',
              isCorrect: false,
              feedback: 'Sounds like a sales pitch. You haven’t earned that framing yet.',
            },
          ],
        },
        {
          id: 'audience-q2',
          prompt:
            'You met a recruiter at a career fair last week. Your email should open with…',
          options: [
            {
              id: 'a',
              label: 'A reference to where you met',
              isCorrect: true,
              feedback:
                'Yes — anchor the email in the shared moment so they remember you.',
            },
            {
              id: 'b',
              label: 'Your GPA',
              isCorrect: false,
              feedback: 'Save credentials for later in the email or your attached resume.',
            },
            {
              id: 'c',
              label: 'A compliment about their company',
              isCorrect: false,
              feedback: 'Generic praise is forgettable and skippable.',
            },
            {
              id: 'd',
              label: 'A question about salary',
              isCorrect: false,
              feedback: 'Way too early. Compensation comes after the conversation.',
            },
          ],
        },
        {
          id: 'audience-q3',
          prompt: 'A cold email should be…',
          options: [
            {
              id: 'a',
              label: 'Short, specific, one clear ask',
              isCorrect: true,
              feedback: 'Right. Cold emails earn attention; they don’t demand it.',
            },
            {
              id: 'b',
              label: 'Detailed and thorough',
              isCorrect: false,
              feedback: 'Long cold emails feel like work. They get skipped.',
            },
            {
              id: 'c',
              label: 'Aggressive and confident',
              isCorrect: false,
              feedback:
                'Aggression reads as entitlement when they don’t know you yet.',
            },
            {
              id: 'd',
              label: 'Formatted like a cover letter',
              isCorrect: false,
              feedback:
                'A cover letter is for an application, not for cold outreach.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'construct',
    title: 'Build the Email',
    subtitle: 'Tone, structure, length — how to put it all together',
    iconLabel: '2',
    context: {
      headline: 'A good email is architecture, not just words',
      intro:
        'Professional emails that get responses follow a structure. There is a reason to open it (subject line), a reason to keep reading (your first sentence), a clear ask (one thing you want), and a clean close. Everything else is noise. The right tone is not too stiff and not too casual — it is confident and direct.',
      significance: [
        'Your subject line is the door. If it does not open the door, nothing else matters.',
        'Most professional emails should be under 150 words. If you can not say it in five sentences, you haven’t thought it through yet.',
        'Tone is not about sounding smart — it’s about making the other person comfortable enough to say yes.',
      ],
      keyTerms: [
        {
          term: 'Subject line',
          definition:
            'The first thing they see; determines whether the email gets opened.',
        },
        {
          term: 'Tone',
          definition:
            'The feeling your word choices create — formal, casual, urgent, warm.',
        },
        {
          term: 'The ask',
          definition:
            'The one specific thing you want the reader to do or respond to.',
        },
      ],
      reflectionPrompt:
        'When you get an email from someone you don’t know, what makes you want to respond? What makes you ignore it?',
      reflectionKey: 'construct-context-reflection',
    },
    example: {
      headline: 'Anatomy of a cold email that actually works',
      scenario:
        'A student emails a financial analyst they found on LinkedIn to ask for a 15-minute call.',
      walkthrough: [
        {
          label: 'Weak',
          detail:
            'Subject: “Hi” — Body: a long paragraph about themselves, a vague ask, signed with just their name. Why it fails: no hook, no specific reason why this person, no clear ask.',
        },
        {
          label: 'Okay',
          detail:
            'Subject: “Aspiring Finance Student” — Body: introduces themselves, mentions the company, asks for advice. Better, but still generic and too long.',
        },
        {
          label: 'Strong',
          detail:
            'Subject: “15-Minute Call — Undergrad Interested in Corporate Finance at [Firm]” — Body: one sentence on who they are, one sentence on why this person specifically, one sentence on the exact ask, polite close. Fast, specific, low-commitment.',
        },
      ],
      takeaway:
        'Get to the ask in three sentences. Be specific about why them. Make it easy to say yes.',
    },
    practiceActivityIds: ['email-anatomy-builder', 'tone-calibrator', 'length-editor'],
    test: {
      title: 'Build check',
      description: 'Spot the email a busy professional would actually respond to.',
      minCorrect: 2,
      items: [
        {
          id: 'construct-q1',
          prompt: 'The most important job of your subject line is…',
          options: [
            {
              id: 'a',
              label: 'Get the email opened',
              isCorrect: true,
              feedback:
                'Yes. The subject line is the door. Everything else only matters if it opens.',
            },
            {
              id: 'b',
              label: 'Show how smart you are',
              isCorrect: false,
              feedback:
                'Cleverness is not the goal — clarity is. Smart-sounding subject lines often confuse people.',
            },
            {
              id: 'c',
              label: 'Include every detail',
              isCorrect: false,
              feedback: 'A long subject line gets truncated in mobile inboxes.',
            },
            {
              id: 'd',
              label: 'Match the body length',
              isCorrect: false,
              feedback:
                'Length isn’t the point — the subject just needs to make them want to click.',
            },
          ],
        },
        {
          id: 'construct-q2',
          prompt: 'A cold email to someone you admire should be…',
          options: [
            {
              id: 'a',
              label: 'Short, specific, one clear ask',
              isCorrect: true,
              feedback: 'Exactly. Earn the response by making it easy to give one.',
            },
            {
              id: 'b',
              label: 'Long and detailed so they know you are serious',
              isCorrect: false,
              feedback: 'Long emails from strangers usually go unread.',
            },
            {
              id: 'c',
              label: 'Casual and funny',
              isCorrect: false,
              feedback: 'Humor with strangers is risky and easy to misread.',
            },
            {
              id: 'd',
              label: 'Sent with your resume attached',
              isCorrect: false,
              feedback:
                'An attachment to a stranger usually triggers caution. Lead with a conversation.',
            },
          ],
        },
        {
          id: 'construct-q3',
          prompt: 'Which subject line is strongest?',
          options: [
            {
              id: 'a',
              label:
                '“10-Minute Call Request — Junior Interested in Goldman’s Public Finance Group”',
              isCorrect: true,
              feedback:
                'Specific role, specific group, specific ask, specific time. Top tier.',
            },
            {
              id: 'b',
              label: '“Hi”',
              isCorrect: false,
              feedback: 'Says nothing. Deleted.',
            },
            {
              id: 'c',
              label: '“Following Up On Our Future Relationship”',
              isCorrect: false,
              feedback:
                'Presumes a relationship that doesn’t exist yet. Reads as awkward.',
            },
            {
              id: 'd',
              label: '“Question”',
              isCorrect: false,
              feedback:
                'Generic and vague. The recipient has no reason to open it.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'send',
    title: 'Send It Right',
    subtitle: 'Timing, CC, BCC, scheduling, and your signature',
    iconLabel: '3',
    context: {
      headline: 'Hitting send is a decision, not just a button',
      intro:
        'When and how you send an email says something about you before the person even reads it. Sending at the right time increases the chance it gets seen. Using CC and BCC correctly protects relationships. Scheduling emails makes you look strategic. And an email signature tells a professional who you are without you having to explain it.',
      significance: [
        'Emails sent Tuesday through Thursday between 8am and 10am consistently see higher open rates in professional environments.',
        'CC means everyone can see everyone. BCC means only you know who else received it. Using them wrong can damage trust.',
        'A clean email signature with your name, school or role, and LinkedIn is a small thing that makes a big impression.',
      ],
      keyTerms: [
        {
          term: 'CC (Carbon Copy)',
          definition:
            'Adds recipients who should be aware but are not the primary audience — everyone can see who was CC’d.',
        },
        {
          term: 'BCC (Blind Carbon Copy)',
          definition:
            'Adds recipients privately — no one else can see they received it.',
        },
        {
          term: 'Scheduled send',
          definition: 'Queuing an email to send at a specific future time.',
        },
        {
          term: 'Email signature',
          definition:
            'A block of identifying information automatically appended to your emails.',
        },
      ],
      reflectionPrompt:
        'Have you ever been CC’d or BCC’d on something? How did it feel — and what did it tell you about the sender?',
      reflectionKey: 'send-context-reflection',
    },
    example: {
      headline: 'CC vs. BCC — the scenarios that trip people up',
      scenario:
        'You are reaching out to three people at the same company about the same opportunity.',
      walkthrough: [
        {
          label: 'Wrong (BCC all three)',
          detail:
            'They all think they are the only one receiving it. If they talk to each other, trust is gone immediately.',
        },
        {
          label: 'Wrong (CC all three)',
          detail:
            'They can all see each other’s names and emails without consent. Creates awkwardness and looks careless.',
        },
        {
          label: 'Right',
          detail:
            'Send three individual emails. Personalize each one. If you need to group them, ask permission first.',
        },
      ],
      takeaway:
        'Default to individual emails for cold outreach. CC is for keeping someone in the loop. BCC is for protecting privacy on group sends — use sparingly.',
    },
    practiceActivityIds: ['cc-bcc-simulator', 'timing-picker', 'signature-builder'],
    test: {
      title: 'Send check',
      description: 'Choose the right move for each sending situation.',
      minCorrect: 2,
      items: [
        {
          id: 'send-q1',
          prompt:
            'You want to send the same cold email to 10 people without them knowing about each other. You should…',
          options: [
            {
              id: 'a',
              label: 'Send 10 individual emails',
              isCorrect: true,
              feedback:
                'Right. Individual sends let you personalize and avoid any privacy risk.',
            },
            {
              id: 'b',
              label: 'BCC all 10',
              isCorrect: false,
              feedback:
                'BCC works for hiding addresses but feels impersonal — and if anyone replies-all, it gets messy.',
            },
            {
              id: 'c',
              label: 'CC all 10',
              isCorrect: false,
              feedback:
                'Exposes everyone’s addresses without consent and looks careless.',
            },
            {
              id: 'd',
              label: 'Send a group email with everyone’s address visible',
              isCorrect: false,
              feedback:
                'Same problem as CC — privacy violation and clearly mass-sent.',
            },
          ],
        },
        {
          id: 'send-q2',
          prompt:
            'The best time to send a professional email to maximize the chance it gets opened is…',
          options: [
            {
              id: 'a',
              label: 'Tuesday–Thursday, morning',
              isCorrect: true,
              feedback:
                'Yes. Mid-week mornings consistently lead inbox opens in professional settings.',
            },
            {
              id: 'b',
              label: 'Friday afternoon',
              isCorrect: false,
              feedback:
                'Most people are mentally checked out by Friday afternoon.',
            },
            {
              id: 'c',
              label: 'Sunday night',
              isCorrect: false,
              feedback:
                'Will get buried under Monday-morning inbox triage.',
            },
            {
              id: 'd',
              label: 'Any time, it doesn’t matter',
              isCorrect: false,
              feedback:
                'Timing measurably changes open rates — it absolutely matters.',
            },
          ],
        },
        {
          id: 'send-q3',
          prompt: 'Your email signature should include…',
          options: [
            {
              id: 'a',
              label: 'Your full name, school or role, and a way to reach or find you',
              isCorrect: true,
              feedback:
                'Exactly. Identity, context, and a way to connect — clean and professional.',
            },
            {
              id: 'b',
              label: 'A motivational quote',
              isCorrect: false,
              feedback:
                'Quotes feel personal-blog, not professional. Skip them.',
            },
            {
              id: 'c',
              label: 'Your GPA',
              isCorrect: false,
              feedback:
                'GPA belongs on your resume, not on every email you send.',
            },
            {
              id: 'd',
              label: 'A photo of yourself',
              isCorrect: false,
              feedback:
                'Photos in signatures often render as attachments and look spammy.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'followthrough',
    title: 'Follow Through',
    subtitle: 'Follow-up emails, thank-you notes, and closing strong',
    iconLabel: '4',
    context: {
      headline:
        'The email you send after is sometimes more important than the first one',
      intro:
        'Most people send the first email and wait. The professionals who build real networks follow up — once, on time, with purpose. Whether you are following up on a cold outreach, a job application, or an informational interview, the follow-up and thank-you email are where relationships get built. This is where most students drop the ball. You won’t.',
      significance: [
        '80% of professional connections require more than one touchpoint before a response happens.',
        'A follow-up sent too soon feels pushy. Too late feels like you forgot. The sweet spot is 5–7 business days after no response.',
        'A thank-you email after an informational interview or meeting is not optional — it is the move that separates the students who get remembered from the ones who don’t.',
      ],
      keyTerms: [
        {
          term: 'Follow-up email',
          definition:
            'A second message sent after no response, or after a meeting, to move a conversation forward.',
        },
        {
          term: 'Thank-you email',
          definition:
            'A message sent after a meeting, interview, or opportunity to express gratitude and reinforce interest.',
        },
        {
          term: 'Touchpoint',
          definition:
            'Any moment of contact between you and a professional connection.',
        },
      ],
      reflectionPrompt:
        'Have you ever not heard back from someone and just moved on? What would have happened if you had followed up?',
      reflectionKey: 'followthrough-context-reflection',
    },
    example: {
      headline: 'Follow-up vs. thank-you — they are not the same thing',
      scenario:
        'You had a 20-minute informational interview with an analyst at a company you want to work for. A week passes with no email from them.',
      walkthrough: [
        {
          label: 'What most students do',
          detail: 'Nothing. They assume silence means no.',
        },
        {
          label: 'Wrong follow-up',
          detail:
            '“Just checking in to see if you had a chance to respond…” — passive, vague, adds no value.',
        },
        {
          label: 'Right follow-up',
          detail:
            'Reference something specific from the conversation. Add one sentence of new value (an article, a question you forgot to ask). Restate your ask in one sentence. Keep it under 100 words.',
        },
        {
          label: 'Thank-you (within 24 hours of a meeting)',
          detail:
            'Specific reference to something they said. One sentence of why it mattered to you. Reinstate your interest or next step. Clean close.',
        },
      ],
      takeaway:
        'Follow up with purpose, not just persistence. Thank-you emails are not formalities — they are your last impression.',
    },
    practiceActivityIds: [
      'followup-timing-simulator',
      'thankyou-email-builder',
      'tone-check-advanced',
    ],
    test: {
      title: 'Follow-through check',
      description: 'Choose the right move for each follow-up situation.',
      minCorrect: 2,
      items: [
        {
          id: 'followthrough-q1',
          prompt:
            'After an informational interview, when should you send a thank-you email?',
          options: [
            {
              id: 'a',
              label: 'Within 24 hours',
              isCorrect: true,
              feedback:
                'Right. Same-day or next-morning lands while the conversation is fresh.',
            },
            {
              id: 'b',
              label: 'Within a week',
              isCorrect: false,
              feedback:
                'A week is too late — by then they’ve forgotten the details that made you stand out.',
            },
            {
              id: 'c',
              label: 'Only if they asked you to',
              isCorrect: false,
              feedback:
                'A thank-you is yours to send; no permission required.',
            },
            {
              id: 'd',
              label: 'After you hear back about next steps',
              isCorrect: false,
              feedback:
                'Waiting can mean never sending one. Lead with gratitude, not patience.',
            },
          ],
        },
        {
          id: 'followthrough-q2',
          prompt: 'The best follow-up email after no response…',
          options: [
            {
              id: 'a',
              label:
                'References something specific and adds a small amount of new value',
              isCorrect: true,
              feedback:
                'Yes. Specificity and value re-earn the recipient’s attention.',
            },
            {
              id: 'b',
              label: 'Says “just following up” with no new content',
              isCorrect: false,
              feedback: 'Adds noise without adding value. Often ignored.',
            },
            {
              id: 'c',
              label: 'Apologizes for bothering them',
              isCorrect: false,
              feedback:
                'Apologizing erodes your standing. Be warm, not sorry.',
            },
            {
              id: 'd',
              label: 'Resends the original email',
              isCorrect: false,
              feedback:
                'Plain resends feel automated and lazy. Add something new.',
            },
          ],
        },
        {
          id: 'followthrough-q3',
          prompt:
            'You sent a cold email 3 days ago and haven’t heard back. You should…',
          options: [
            {
              id: 'a',
              label:
                'Wait until 5–7 business days have passed, then send one follow-up',
              isCorrect: true,
              feedback:
                'Right. Give them time, then nudge once with purpose.',
            },
            {
              id: 'b',
              label: 'Send another email immediately',
              isCorrect: false,
              feedback: 'Reads as pushy and overeager.',
            },
            {
              id: 'c',
              label: 'Give up',
              isCorrect: false,
              feedback:
                'Most replies happen on a follow-up. Don’t leave them on the table.',
            },
            {
              id: 'd',
              label: 'Call their office',
              isCorrect: false,
              feedback:
                'Escalating from cold email to phone call without permission feels invasive.',
            },
          ],
        },
      ],
    },
  },
];

export const EMAIL_LESSON_STEP_LABELS = {
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
} as const;

export function getEmailLessonConfig(lessonId: EmailLessonId): EmailLessonConfig {
  const lesson = EMAIL_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) return EMAIL_LESSONS[0];
  return lesson;
}
