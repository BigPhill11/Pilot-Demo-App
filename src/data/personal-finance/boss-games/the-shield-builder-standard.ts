import { BossGameConfig, GameMeters } from '@/types/boss-game';

export const theShieldBuilderBossGame: BossGameConfig = {
  id: 'the-shield-builder',
  moduleId: 'insurance',
  title: 'The Shield Builder',
  subtitle: 'Build Your Protection Fortress',
  description: 'You are starting to build real wealth. But wealth without protection is fragile. Over 6 months, you will learn to protect yourself from fraud, secure your digital life, and build proper insurance coverage.',
  totalMonths: 6,
  initialMeters: {
    income: 50,           // Asset Protection Level
    hourlyValue: 30,      // Insurance Coverage
    energy: 80,           // Security Score
    replaceability: 40,   // Vulnerability (lower is better)
    optionality: 40,      // Resilience
  },
  months: [
    // Month 1: Insurance Foundation
    {
      month: 1,
      title: 'Month One: Insurance Assessment',
      openingNarration: `You have $10,000 in savings and a decent job. Life feels stable. But a friend just got hit with a $50,000 medical bill after an accident. They had no insurance. Their savings are gone. Their credit is ruined.

A message appears: "Protection is not about fear. It is about freedom from catastrophic risk."`,
      decisions: [
        {
          id: 'm1-health-insurance',
          category: 'money',
          title: 'Health Insurance Decision',
          description: 'Your employer offers health insurance. The premium is $200/month from your paycheck.',
          pandaDialogue: 'I feel healthy. Do I really need to pay $200 every month?',
          options: [
            {
              id: 'skip-health',
              label: 'Skip health insurance',
              description: 'Save the $200/month',
              meterChanges: { income: 5, hourlyValue: -20, replaceability: 30 },
              storyResponse: 'You saved money but one ER visit could cost $10,000+. You are playing with fire.',
            },
            {
              id: 'basic-health',
              label: 'Get the basic plan',
              description: '$200/month, high deductible',
              meterChanges: { hourlyValue: 15, replaceability: -15, optionality: 10 },
              storyResponse: 'Protected from catastrophic costs. The high deductible means you still pay for small things.',
              unlocks: ['health-insured'],
            },
            {
              id: 'full-health',
              label: 'Get the comprehensive plan',
              description: '$350/month, low deductible',
              meterChanges: { income: -5, hourlyValue: 25, replaceability: -25, optionality: 15 },
              storyResponse: 'Full coverage. Doctor visits, prescriptions, and emergencies all covered with minimal out-of-pocket.',
              unlocks: ['health-insured', 'comprehensive-health'],
            },
          ],
        },
        {
          id: 'm1-auto-insurance',
          category: 'skill',
          title: 'Auto Insurance',
          description: 'Your state requires auto insurance. How much coverage do you get?',
          options: [
            {
              id: 'minimum-auto',
              label: 'State minimum only',
              description: 'Cheapest option, $50/month',
              meterChanges: { hourlyValue: 5, replaceability: 10 },
              storyResponse: 'You are legal but barely protected. An at-fault accident could still bankrupt you.',
            },
            {
              id: 'standard-auto',
              label: 'Standard coverage',
              description: '$100/month with reasonable limits',
              meterChanges: { income: -5, hourlyValue: 15, replaceability: -10, optionality: 5 },
              storyResponse: 'Good protection for most scenarios. Major accidents are covered.',
              unlocks: ['auto-insured'],
            },
            {
              id: 'full-auto',
              label: 'Full coverage with umbrella',
              description: '$150/month, includes umbrella liability',
              meterChanges: { income: -10, hourlyValue: 25, replaceability: -20, optionality: 10 },
              storyResponse: 'Maximum protection. Even a major lawsuit would not touch your assets.',
              unlocks: ['auto-insured', 'umbrella-protected'],
            },
          ],
        },
        {
          id: 'm1-renters',
          category: 'money',
          title: 'Renters Insurance',
          description: 'You rent an apartment. Your landlord has insurance on the building but not your stuff.',
          options: [
            {
              id: 'skip-renters',
              label: 'Skip renters insurance',
              description: 'My stuff is not worth that much',
              meterChanges: { replaceability: 15, optionality: -5 },
              storyResponse: 'A fire or theft could cost you thousands to replace everything. Risky bet.',
            },
            {
              id: 'get-renters',
              label: 'Get renters insurance',
              description: 'Only $15/month',
              meterChanges: { hourlyValue: 10, replaceability: -10, optionality: 10 },
              storyResponse: 'Your belongings are protected. Also includes liability if someone gets hurt in your apartment.',
              unlocks: ['renters-insured'],
            },
          ],
        },
      ],
      closingNarration: 'Month 1 ends. You have started building your protection foundation.',
    },
    // Month 2: Digital Security
    {
      month: 2,
      title: 'Month Two: Digital Security',
      openingNarration: 'A friend got hacked. Their email was compromised, and hackers accessed their bank account. They lost $3,000 before catching it. Your digital life is the gateway to your financial life.',
      decisions: [
        {
          id: 'm2-passwords',
          category: 'skill',
          title: 'Password Security',
          description: 'How do you manage your passwords?',
          pandaDialogue: 'I use the same password for everything... that is probably bad.',
          options: [
            {
              id: 'same-passwords',
              label: 'Keep using the same password',
              description: 'It is easy to remember',
              meterChanges: { energy: -20, replaceability: 25 },
              storyResponse: 'One breach exposes everything. Your bank, email, and social media all share the same key.',
            },
            {
              id: 'password-manager',
              label: 'Set up a password manager',
              description: '$3/month for premium features',
              meterChanges: { energy: 25, replaceability: -20, optionality: 10 },
              storyResponse: 'Every account has a unique, strong password. One master password protects them all.',
              unlocks: ['password-managed'],
            },
            {
              id: 'manual-unique',
              label: 'Create unique passwords manually',
              description: 'Write them in a secure notebook',
              meterChanges: { energy: 15, replaceability: -10 },
              storyResponse: 'Better than reuse, but harder to maintain. The effort may not last.',
            },
          ],
        },
        {
          id: 'm2-2fa',
          category: 'skill',
          title: 'Two-Factor Authentication',
          description: 'Many services offer 2FA - requiring a second code to log in.',
          options: [
            {
              id: 'skip-2fa',
              label: 'Skip 2FA - too annoying',
              description: 'Passwords are enough',
              meterChanges: { energy: -15, replaceability: 15 },
              storyResponse: 'Hackers with your password can walk right in. No second barrier.',
            },
            {
              id: 'sms-2fa',
              label: 'Enable SMS-based 2FA',
              description: 'Codes texted to your phone',
              meterChanges: { energy: 15, replaceability: -10 },
              storyResponse: 'Better than nothing, but SMS can be intercepted. Not the strongest option.',
              unlocks: ['2fa-enabled'],
            },
            {
              id: 'app-2fa',
              label: 'Use authenticator app everywhere',
              description: 'Google Authenticator or similar',
              meterChanges: { energy: 25, replaceability: -20, optionality: 5 },
              storyResponse: 'Strong protection. Even if someone has your password, they cannot get in.',
              unlocks: ['2fa-enabled', 'strong-2fa'],
            },
          ],
        },
        {
          id: 'm2-phishing',
          category: 'work',
          title: 'Suspicious Email',
          description: 'You get an email from "your bank" asking you to verify your account by clicking a link.',
          options: [
            {
              id: 'click-link',
              label: 'Click the link and log in',
              description: 'The email looks official',
              meterChanges: { income: -20, energy: -25, replaceability: 30 },
              storyResponse: 'It was a phishing site. Your credentials were stolen. You caught it before major damage but learned an expensive lesson.',
            },
            {
              id: 'ignore-suspicious',
              label: 'Delete and ignore it',
              description: 'Seems suspicious',
              meterChanges: { energy: 10, optionality: 5 },
              storyResponse: 'Good instinct. If your bank needs you, they will not ask via email.',
              unlocks: ['phishing-aware'],
            },
            {
              id: 'verify-directly',
              label: 'Call your bank directly to check',
              description: 'Verify through official channels',
              meterChanges: { energy: 15, replaceability: -10, optionality: 10 },
              storyResponse: 'The bank confirmed it was a scam. You reported it and protected yourself and others.',
              unlocks: ['phishing-aware', 'security-conscious'],
            },
          ],
        },
      ],
      closingNarration: 'Month 2 ends. Your digital fortress is taking shape.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.energy < 40,
          event: 'Your digital security is weak. You are one phishing email away from trouble.',
        },
      ],
    },
    // Month 3: Fraud Protection
    {
      month: 3,
      title: 'Month Three: Fraud and Identity Protection',
      openingNarration: 'Identity theft affects millions every year. Criminals open credit cards, file fake tax returns, and drain accounts. Protection starts with awareness.',
      decisions: [
        {
          id: 'm3-credit-freeze',
          category: 'skill',
          title: 'Credit Freeze',
          description: 'A credit freeze prevents new accounts from being opened in your name.',
          pandaDialogue: 'I did not even know this existed.',
          options: [
            {
              id: 'no-freeze',
              label: 'Skip the credit freeze',
              description: 'Seems like a hassle',
              meterChanges: { replaceability: 15 },
              storyResponse: 'Your credit is open. Anyone with your SSN could apply for credit in your name.',
            },
            {
              id: 'freeze-credit',
              label: 'Freeze credit at all three bureaus',
              description: 'Free and reversible',
              meterChanges: { income: 10, replaceability: -25, optionality: 15 },
              storyResponse: 'Credit locked down. Thieves cannot open accounts in your name.',
              unlocks: ['credit-frozen'],
            },
          ],
        },
        {
          id: 'm3-monitoring',
          category: 'money',
          title: 'Identity Monitoring',
          description: 'Services can monitor for identity theft and alert you to suspicious activity.',
          options: [
            {
              id: 'no-monitoring',
              label: 'Check manually occasionally',
              description: 'Save the subscription cost',
              meterChanges: { optionality: -5 },
              storyResponse: 'You might catch problems eventually, but detection will be slow.',
            },
            {
              id: 'free-monitoring',
              label: 'Use free credit monitoring',
              description: 'Basic alerts from credit bureaus',
              meterChanges: { energy: 10, replaceability: -10, optionality: 5 },
              storyResponse: 'Basic protection. You will know if someone opens credit in your name.',
              unlocks: ['monitoring-enabled'],
            },
            {
              id: 'paid-monitoring',
              label: 'Get comprehensive identity protection',
              description: '$15/month for full monitoring',
              meterChanges: { income: -5, energy: 20, replaceability: -20, optionality: 15 },
              storyResponse: 'Dark web monitoring, recovery assistance, and insurance. Full protection suite.',
              unlocks: ['monitoring-enabled', 'identity-protected'],
            },
          ],
        },
        {
          id: 'm3-document-security',
          category: 'work',
          title: 'Document Security',
          description: 'How do you handle sensitive documents?',
          options: [
            {
              id: 'toss-in-trash',
              label: 'Throw documents in regular trash',
              description: 'Who would dig through trash?',
              meterChanges: { replaceability: 20 },
              storyResponse: 'Dumpster divers find bank statements, pre-approved offers, and more. Identity goldmine.',
            },
            {
              id: 'shred-documents',
              label: 'Shred sensitive documents',
              description: 'Cross-cut shredder',
              meterChanges: { energy: 15, replaceability: -15 },
              storyResponse: 'Sensitive information destroyed properly. No paper trail for thieves.',
              unlocks: ['document-secure'],
            },
            {
              id: 'go-paperless',
              label: 'Switch to paperless + shred existing',
              description: 'Digital statements, minimal paper',
              meterChanges: { energy: 20, replaceability: -20, optionality: 10 },
              storyResponse: 'Less paper means less risk. Digital statements are encrypted and secure.',
              unlocks: ['document-secure', 'paperless'],
            },
          ],
        },
      ],
      closingNarration: 'Month 3 ends. Your identity is better protected than 90% of people.',
    },
    // Month 4: Emergency Preparedness
    {
      month: 4,
      title: 'Month Four: Emergency Preparedness',
      openingNarration: 'Life throws curveballs. Job loss, medical emergencies, car breakdowns. The question is not if something will happen, but when. Are you ready?',
      decisions: [
        {
          id: 'm4-emergency-fund',
          category: 'money',
          title: 'Emergency Fund Strategy',
          description: 'How much emergency fund are you building?',
          pandaDialogue: 'I have about $1,000 saved. Is that enough?',
          options: [
            {
              id: 'minimal-fund',
              label: 'Keep $1,000 emergency fund',
              description: 'That should cover most things',
              meterChanges: { optionality: -10, replaceability: 10 },
              storyResponse: '$1,000 covers a car repair but not a job loss. Minimal cushion.',
            },
            {
              id: 'three-month-fund',
              label: 'Build to 3 months expenses',
              description: 'Aggressive saving for 6 months',
              meterChanges: { income: 10, optionality: 20, replaceability: -15 },
              storyResponse: 'Three months gives you time to find a new job without panic. Solid foundation.',
              unlocks: ['emergency-funded'],
            },
            {
              id: 'six-month-fund',
              label: 'Build to 6 months expenses',
              description: 'Takes longer but provides more security',
              meterChanges: { income: 15, optionality: 30, replaceability: -25, energy: -5 },
              storyResponse: 'Six months means you can be selective about your next job. True security.',
              unlocks: ['emergency-funded', 'fully-funded'],
            },
          ],
        },
        {
          id: 'm4-disability',
          category: 'skill',
          title: 'Disability Insurance',
          description: 'Your income is your biggest asset. What if you cannot work?',
          options: [
            {
              id: 'skip-disability',
              label: 'Skip disability insurance',
              description: 'I am young and healthy',
              meterChanges: { replaceability: 20 },
              storyResponse: 'One accident could end your income. 25% of 20-year-olds become disabled before retirement.',
            },
            {
              id: 'employer-disability',
              label: 'Accept employer short-term coverage',
              description: 'Free basic coverage',
              meterChanges: { hourlyValue: 10, replaceability: -10 },
              storyResponse: '60% of income for 6 months if disabled. Better than nothing.',
              unlocks: ['disability-covered'],
            },
            {
              id: 'supplemental-disability',
              label: 'Add supplemental long-term coverage',
              description: '$50/month for comprehensive protection',
              meterChanges: { income: -5, hourlyValue: 20, replaceability: -20, optionality: 10 },
              storyResponse: 'Protected for years if needed. Your income stream is insured.',
              unlocks: ['disability-covered', 'long-term-protected'],
            },
          ],
        },
        {
          id: 'm4-life-insurance',
          category: 'money',
          title: 'Life Insurance',
          description: 'If anyone depends on your income, life insurance protects them.',
          options: [
            {
              id: 'no-dependents',
              label: 'No dependents - skip for now',
              description: 'Will consider when I have a family',
              meterChanges: { optionality: 5 },
              storyResponse: 'Reasonable if no one depends on you. Revisit when that changes.',
            },
            {
              id: 'term-life',
              label: 'Get term life insurance',
              description: '$20/month for 20-year term',
              meterChanges: { hourlyValue: 15, replaceability: -15, optionality: 10 },
              storyResponse: 'Affordable protection. If something happens, your family is provided for.',
              unlocks: ['life-insured'],
            },
          ],
        },
      ],
      closingNarration: 'Month 4 ends. You are building a fortress against life\'s uncertainties.',
      specialEvents: [
        {
          condition: (meters: GameMeters, unlocks: string[]) => unlocks.includes('fully-funded'),
          event: 'Your 6-month emergency fund gives you incredible peace of mind. You sleep better knowing you could handle almost anything.',
        },
      ],
    },
    // Month 5: Legal Protection
    {
      month: 5,
      title: 'Month Five: Legal Protection',
      openingNarration: 'You are building wealth. Now you need to protect it from lawsuits and legal issues. One accident in your apartment, one car crash, and everything you have built could be at risk.',
      decisions: [
        {
          id: 'm5-liability-review',
          category: 'skill',
          title: 'Liability Coverage Review',
          description: 'Do your insurance policies have adequate liability limits?',
          pandaDialogue: 'I never really thought about someone suing me.',
          options: [
            {
              id: 'minimum-liability',
              label: 'Keep minimum liability limits',
              description: 'Saves money on premiums',
              meterChanges: { replaceability: 20 },
              storyResponse: 'Minimum limits may not cover a serious accident. Your assets are exposed.',
            },
            {
              id: 'increase-limits',
              label: 'Increase liability limits on all policies',
              description: 'Extra $20/month across policies',
              meterChanges: { income: -5, hourlyValue: 15, replaceability: -20 },
              storyResponse: 'Higher limits protect your assets from most scenarios.',
              unlocks: ['higher-limits'],
            },
            {
              id: 'umbrella-policy',
              label: 'Add umbrella liability policy',
              description: '$1M coverage for $20/month',
              meterChanges: { income: -10, hourlyValue: 25, replaceability: -30, optionality: 15 },
              storyResponse: 'Umbrella coverage sits on top of all your policies. Million-dollar protection.',
              unlocks: ['higher-limits', 'umbrella-covered'],
            },
          ],
        },
        {
          id: 'm5-estate-basics',
          category: 'work',
          title: 'Basic Estate Documents',
          description: 'Even young people should have basic legal documents.',
          options: [
            {
              id: 'no-documents',
              label: 'I am too young for that',
              description: 'Will deal with it later',
              meterChanges: { optionality: -10 },
              storyResponse: 'Without documents, courts decide what happens if you are incapacitated. Not ideal.',
            },
            {
              id: 'online-documents',
              label: 'Create basic documents online',
              description: 'Will, POA, healthcare directive for $100',
              meterChanges: { optionality: 15, replaceability: -10 },
              storyResponse: 'Basic documents in place. Someone you trust can make decisions if needed.',
              unlocks: ['estate-docs'],
            },
            {
              id: 'attorney-documents',
              label: 'Work with an estate attorney',
              description: '$500 for comprehensive documents',
              meterChanges: { income: -10, optionality: 25, replaceability: -20 },
              storyResponse: 'Professionally drafted documents. State-specific and properly executed.',
              unlocks: ['estate-docs', 'attorney-advised'],
            },
          ],
        },
        {
          id: 'm5-beneficiaries',
          category: 'money',
          title: 'Beneficiary Review',
          description: 'Have you named beneficiaries on your accounts?',
          options: [
            {
              id: 'no-beneficiaries',
              label: 'Never set any beneficiaries',
              description: 'Did not know I needed to',
              meterChanges: { optionality: -15 },
              storyResponse: 'Without beneficiaries, assets go through probate. Delays and costs for your loved ones.',
            },
            {
              id: 'update-beneficiaries',
              label: 'Review and update all beneficiaries',
              description: 'Bank, retirement, insurance accounts',
              meterChanges: { optionality: 20, replaceability: -10 },
              storyResponse: 'All accounts have named beneficiaries. Assets pass directly without probate.',
              unlocks: ['beneficiaries-set'],
            },
          ],
        },
      ],
      closingNarration: 'Month 5 ends. Legal protection layers are in place.',
    },
    // Month 6: Integration and Testing
    {
      month: 6,
      title: 'Month Six: Testing Your Shield',
      openingNarration: 'Six months of building protection. Time to face the test. Life throws a major challenge your way.',
      decisions: [
        {
          id: 'm6-medical-emergency',
          category: 'work',
          title: 'Medical Emergency',
          description: 'You break your leg in a hiking accident. ER visit, surgery, and 6 weeks of recovery.',
          pandaDialogue: 'This is going to be expensive...',
          options: [
            {
              id: 'face-bills-uninsured',
              label: 'Face the $45,000 bill',
              description: 'Without insurance',
              meterChanges: { income: -40, optionality: -30, replaceability: 30 },
              storyResponse: 'The bill devastates your finances. Years of work erased. Protection matters.',
              requires: [],
            },
            {
              id: 'insurance-covers',
              label: 'Insurance handles most of it',
              description: 'You pay $3,000 out of pocket',
              meterChanges: { income: -10, energy: 10, optionality: 5 },
              storyResponse: 'Insurance covered $42,000. Your deductible and copays were manageable.',
              requires: ['health-insured'],
            },
          ],
        },
        {
          id: 'm6-identity-attempt',
          category: 'skill',
          title: 'Identity Theft Attempt',
          description: 'Someone tries to open a credit card in your name using stolen information.',
          options: [
            {
              id: 'no-protection',
              label: 'Card is approved before you know',
              description: 'No freeze or monitoring',
              meterChanges: { income: -15, energy: -20, replaceability: 20 },
              storyResponse: 'The fraudulent card ran up $8,000 before you caught it. Months of cleanup ahead.',
            },
            {
              id: 'freeze-blocks',
              label: 'Credit freeze blocks the application',
              description: 'Your freeze did its job',
              meterChanges: { energy: 20, optionality: 10 },
              storyResponse: 'The criminal could not open the account. Your credit freeze was an impenetrable barrier.',
              requires: ['credit-frozen'],
            },
          ],
        },
        {
          id: 'm6-job-loss',
          category: 'money',
          title: 'Unexpected Job Loss',
          description: 'Your company announces layoffs. You are affected.',
          options: [
            {
              id: 'panic-mode',
              label: 'Scramble to find any job immediately',
              description: 'Need income now',
              meterChanges: { income: -20, energy: -15, optionality: -20 },
              storyResponse: 'Desperation led to a bad job at lower pay. No leverage, no options.',
            },
            {
              id: 'emergency-fund-works',
              label: 'Use emergency fund strategically',
              description: 'Take time to find the right role',
              meterChanges: { energy: 15, optionality: 20 },
              storyResponse: 'Your 3-6 month cushion let you interview without panic. Found a better job at higher pay.',
              requires: ['emergency-funded'],
            },
          ],
        },
      ],
      closingNarration: 'Month 6 ends. Your shield was tested. The investments in protection paid off.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.replaceability < 25,
          event: 'Your protection layers worked exactly as intended. You weathered the storms with minimal damage.',
        },
        {
          condition: (meters: GameMeters) => meters.replaceability > 60,
          event: 'The gaps in your protection cost you dearly. Consider this an expensive education.',
        },
      ],
    },
  ],
  endings: [
    {
      id: 'shield-master',
      title: 'Shield Master',
      description: 'You built comprehensive protection across all areas.',
      trajectory: 'momentum',
      futureSnapshot: 'Your protection fortress is complete. Health, identity, assets, and income are all secured. Life can throw its worst—you are ready.',
      conditions: (meters: GameMeters, unlocks: string[]) => 
        meters.hourlyValue >= 70 && meters.replaceability <= 25 && meters.optionality >= 60,
    },
    {
      id: 'well-protected',
      title: 'Well Protected',
      description: 'You have solid protection with room for improvement.',
      trajectory: 'growing',
      futureSnapshot: 'Most major risks are covered. A few gaps remain, but you are far ahead of average. Continue building.',
      conditions: (meters: GameMeters) => 
        meters.hourlyValue >= 50 && meters.replaceability <= 40,
    },
    {
      id: 'partially-shielded',
      title: 'Partially Shielded',
      description: 'Some protection in place but significant vulnerabilities remain.',
      trajectory: 'balanced',
      futureSnapshot: 'You started building protection but stopped halfway. Major risks could still hurt you.',
      conditions: (meters: GameMeters) => 
        meters.hourlyValue >= 30 || meters.replaceability <= 50,
    },
    {
      id: 'exposed',
      title: 'Exposed',
      description: 'Your protection gaps left you vulnerable.',
      trajectory: 'stuck',
      futureSnapshot: 'Life tested your shield and found it wanting. Expensive lessons were learned.',
      conditions: (meters: GameMeters) => 
        meters.replaceability > 60,
    },
    {
      id: 'default-path',
      title: 'Learning the Hard Way',
      description: 'Protection requires attention you did not give it.',
      trajectory: 'burnout',
      futureSnapshot: 'Without intentional protection building, you remain exposed to life\'s risks. Consider this a wake-up call.',
      conditions: () => true,
    },
  ],
};
