import { Lesson } from '@/types/personal-finance';

export const lesson5DigitalSecurityProtectionHabits: Lesson = {
  id: 'digital-security-protection-habits',
  title: 'Digital Security and Long-term Protection Habits',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains how digital security protects assets over the long term. You learn why online habits matter, how small mistakes create big risks, and how simple routines protect your future.',
  realityHook: 'You lose access to an email account you have used for years. That email connects to banking apps, school platforms, and personal accounts. One weak password creates problems across many parts of life. Digital protection now matters as much as physical protection.',
  outcomePreview: 'You will understand how digital access equals asset access, how small habits prevent large damage, how security requires consistency, and how protection compounds over time.',
  microLesson: `Digital accounts control access to money, identity, and opportunities. Email, passwords, and devices act like keys. When those keys are weak, everything behind them becomes vulnerable.

Most digital damage comes from repeated small mistakes. Reused passwords, ignored updates, and rushed clicks create openings. Strong habits close those openings before problems appear.

Security works best when habits stay consistent. Using strong passwords, updating software, and monitoring accounts reduces long-term risk. These actions feel small but protect valuable systems.

Digital protection is not about fear. Digital protection is about responsibility. Strong habits today protect options years into the future.`,
  flashcards: [
    {
      term: 'Digital Security',
      definition: 'Digital security is the practice of protecting online accounts, devices, and information from unauthorized access. Digital security protects financial and personal assets.',
      philsAnalogy: 'Securing banking and school accounts with strong passwords and extra verification.'
    },
    {
      term: 'Password Hygiene',
      definition: 'Password hygiene refers to using strong, unique passwords and updating them regularly. Good hygiene prevents easy access by attackers.',
      philsAnalogy: 'Using different passwords for email, banking, and social media accounts.'
    },
    {
      term: 'Two-Factor Authentication',
      definition: 'Two-factor authentication adds a second verification step beyond a password. This reduces the chance of unauthorized access.',
      philsAnalogy: 'Receiving a code on your phone before logging into an account.'
    },
    {
      term: 'Account Monitoring',
      definition: 'Account monitoring means regularly checking activity for unusual behavior. Early detection limits damage.',
      philsAnalogy: 'Reviewing bank and app activity weekly.'
    },
    {
      term: 'Digital Footprint',
      definition: 'A digital footprint is the trail of information you leave online. Larger footprints increase exposure to risk.',
      philsAnalogy: 'Limiting personal details shared publicly on social media.'
    }
  ],
  simulatorGame: {
    title: 'Secure the System',
    description: 'Manage digital accounts over time while threats appear randomly. Build security habits that compound.',
    initialState: {
      weeklyIncome: 900,
      hourlyWage: 22,
      workHours: 40,
      fatigue: 15,
      freeTime: 35,
      skillLevel: 50
    },
    scenarios: [
      {
        id: 'password-management',
        title: 'Password Strategy',
        description: 'You have 20+ online accounts. How do you manage passwords?',
        choices: [
          {
            id: 'same-password',
            label: 'Use the same password everywhere',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: -15,
              feedback: 'Convenient but dangerous. One breach exposes all your accounts.'
            }
          },
          {
            id: 'variations',
            label: 'Use variations of one password',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Slightly better, but patterns are easy for attackers to guess.'
            }
          },
          {
            id: 'password-manager',
            label: 'Use a password manager with unique passwords',
            outcome: {
              incomeChange: -3,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 20,
              feedback: 'Best practice. One master password protects unique passwords for every account.'
            }
          }
        ]
      },
      {
        id: 'software-update',
        title: 'Update Notification',
        description: 'Your phone and laptop both have security updates available. They take 20 minutes each.',
        choices: [
          {
            id: 'skip-updates',
            label: 'Ignore updates, too busy',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 10,
              skillChange: -10,
              feedback: 'Saved time now, but unpatched security holes remain vulnerable.'
            }
          },
          {
            id: 'update-one',
            label: 'Update one device, skip the other',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Partial protection. The unupdated device remains at risk.'
            }
          },
          {
            id: 'update-both',
            label: 'Update both devices',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 15,
              feedback: 'Good habit. Security updates patch known vulnerabilities.'
            }
          }
        ]
      },
      {
        id: 'two-factor-setup',
        title: 'Two-Factor Authentication',
        description: 'Your bank offers two-factor authentication (2FA). It adds an extra step when logging in.',
        choices: [
          {
            id: 'skip-2fa',
            label: 'Skip it, too inconvenient',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: -10,
              feedback: 'Faster logins, but if your password leaks, nothing else protects your account.'
            }
          },
          {
            id: 'text-2fa',
            label: 'Enable text message 2FA',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 10,
              feedback: 'Good step. Text-based 2FA is better than nothing, though not the strongest.'
            }
          },
          {
            id: 'authenticator-app',
            label: 'Use an authenticator app',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 20,
              feedback: 'Best option. Authenticator apps are more secure than text messages.'
            }
          }
        ]
      },
      {
        id: 'breach-detected',
        title: 'Data Breach Alert',
        description: 'A service you use was breached. Your email and password may be exposed.',
        choices: [
          {
            id: 'do-nothing',
            label: 'Wait and see if anything happens',
            outcome: {
              incomeChange: -300,
              fatigueChange: 20,
              freeTimeChange: -15,
              skillChange: -15,
              feedback: 'Attackers used your credentials before you acted. Accounts compromised.'
            }
          },
          {
            id: 'change-that-password',
            label: 'Change the password on that site',
            outcome: {
              incomeChange: -50,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: 5,
              feedback: 'Good, but if you reused that password elsewhere, those accounts are still at risk.'
            }
          },
          {
            id: 'change-all-shared',
            label: 'Change passwords on all accounts that shared that password',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -15,
              skillChange: 20,
              feedback: 'Thorough response. You secured all potentially affected accounts.'
            }
          }
        ]
      },
      {
        id: 'public-wifi',
        title: 'Coffee Shop WiFi',
        description: 'You need to check your bank account but you\'re on public WiFi.',
        choices: [
          {
            id: 'use-public-wifi',
            label: 'Log in on the public network',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: -10,
              feedback: 'Risky. Public networks can be monitored. Your login could be intercepted.'
            }
          },
          {
            id: 'use-mobile-data',
            label: 'Switch to mobile data instead',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 15,
              feedback: 'Smart choice. Your phone\'s data connection is more secure than public WiFi.'
            }
          },
          {
            id: 'wait-until-home',
            label: 'Wait until you\'re on a trusted network',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 10,
              feedback: 'Safe approach. Patience protects sensitive information.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 600,
      maxFatigue: 60
    }
  },
  miniReflection: {
    question: 'Which digital habit would protect your future the most if you improved it now?',
    followUp: 'What one step could you take this week to improve it?'
  },
  quiz: [
    {
      question: 'Digital security fails most often because:',
      options: ['Habits slip', 'Technology breaks', 'Laws change', 'Markets fall'],
      correctIndex: 0,
      explanation: 'Most breaches come from human habits, not technology failures.'
    },
    {
      question: 'Two-factor authentication helps because:',
      options: ['It looks professional', 'It adds another barrier to access', 'It speeds logins', 'It removes passwords'],
      correctIndex: 1,
      explanation: '2FA requires something you know (password) AND something you have (phone).'
    },
    {
      question: 'Account monitoring matters because:',
      options: ['It finds problems early', 'It increases stress', 'It predicts attacks', 'It replaces insurance'],
      correctIndex: 0,
      explanation: 'Early detection limits damage before it spreads.'
    },
    {
      question: 'A large digital footprint increases:',
      options: ['Popularity', 'Convenience', 'Income', 'Risk exposure'],
      correctIndex: 3,
      explanation: 'More information online means more data that could be misused.'
    },
    {
      question: 'Long-term protection works best when habits are:',
      options: ['Occasional', 'Perfect', 'Consistent', 'Complex'],
      correctIndex: 2,
      explanation: 'Consistency beats perfection. Regular habits build strong protection over time.'
    }
  ],
  powerMove: 'Enable two-factor authentication on one important account this week.',
  realLifeAction: 'List three online accounts that would cause the most damage if compromised.'
};
