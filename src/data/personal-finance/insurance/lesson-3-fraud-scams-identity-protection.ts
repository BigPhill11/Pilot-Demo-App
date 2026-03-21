import { Lesson } from '@/types/personal-finance';

export const lesson3FraudScamsIdentityProtection: Lesson = {
  id: 'fraud-scams-identity-protection',
  title: 'Fraud, Scams, and Identity Protection',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains how fraud and scams work and why identity protection matters. You learn common scam patterns, how identity theft happens, and how simple habits reduce risk.',
  realityHook: 'You receive a message that looks official and urgent. It asks for personal information or a quick payment. Someone you know already fell for a similar message and lost money overnight. Digital risks move fast and often target people who are busy or stressed.',
  outcomePreview: 'You will understand how scams rely on pressure and urgency, how fraud targets information and access, how identity theft creates long-term damage, and how simple habits reduce exposure.',
  microLesson: `Fraud happens when someone uses deception to steal money or information. Scams often create urgency or fear to push quick decisions. Messages may look real, but their goal is access.

Identity theft happens when someone uses your personal information to open accounts or make purchases. The damage lasts because fixing identity problems takes time and effort. Prevention matters more than recovery.

Most scams succeed because people feel rushed or distracted. Slowing down reduces mistakes. Verifying sources protects information. Strong habits reduce risk across many situations.

Protecting identity protects future opportunities. Credit, jobs, and financial access depend on trust and accuracy.`,
  flashcards: [
    {
      term: 'Fraud',
      definition: 'Fraud is intentional deception used to gain money or information unfairly. Fraud often uses fake messages, accounts, or offers.',
      philsAnalogy: 'A fake payment request that looks like a real company email.'
    },
    {
      term: 'Scam',
      definition: 'A scam is a planned trick designed to pressure someone into sending money or information. Scams rely on urgency and emotion.',
      philsAnalogy: 'A message claiming an account will close unless you act immediately.'
    },
    {
      term: 'Identity Theft',
      definition: 'Identity theft occurs when someone uses your personal information without permission. This can lead to financial and legal problems.',
      philsAnalogy: 'Someone opening a credit account using stolen personal details.'
    },
    {
      term: 'Personal Information',
      definition: 'Personal information includes data that identifies you, such as full name, address, and account numbers. Protecting this information limits damage.',
      philsAnalogy: 'Keeping social security numbers and passwords private.'
    },
    {
      term: 'Verification',
      definition: 'Verification means confirming information before acting. Verification reduces mistakes and prevents fraud.',
      philsAnalogy: 'Calling a company directly instead of clicking a message link.'
    }
  ],
  simulatorGame: {
    title: 'Spot the Scam',
    description: 'You receive messages and offers with mixed signals. Learn to identify real from fake and protect your information.',
    initialState: {
      weeklyIncome: 900,
      hourlyWage: 22,
      workHours: 40,
      fatigue: 20,
      freeTime: 30,
      skillLevel: 50
    },
    scenarios: [
      {
        id: 'urgent-email',
        title: 'Urgent Bank Email',
        description: 'You receive an email: "URGENT: Your account has been compromised. Click here to verify your identity immediately."',
        choices: [
          {
            id: 'click-link',
            label: 'Click the link and enter information',
            outcome: {
              incomeChange: -500,
              fatigueChange: 25,
              freeTimeChange: -15,
              skillChange: -10,
              feedback: 'It was a phishing scam. Your information was stolen and used fraudulently.'
            }
          },
          {
            id: 'verify-directly',
            label: 'Call your bank directly using their official number',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 15,
              feedback: 'Smart move! Your bank confirmed they never sent that email. You avoided a scam.'
            }
          },
          {
            id: 'ignore-email',
            label: 'Delete the email and ignore it',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Safe choice. The email was fake. Ignoring suspicious messages protects you.'
            }
          }
        ]
      },
      {
        id: 'prize-winner',
        title: 'Congratulations Winner!',
        description: 'A text says you won a $1,000 gift card. Just pay $25 shipping to claim it.',
        choices: [
          {
            id: 'pay-shipping',
            label: 'Pay the $25 shipping fee',
            outcome: {
              incomeChange: -25,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: -10,
              feedback: 'Classic scam. There is no prize. You lost $25 and gave them your payment info.'
            }
          },
          {
            id: 'research-first',
            label: 'Research the company online first',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 10,
              feedback: 'Good instinct. A quick search revealed many complaints about this scam.'
            }
          },
          {
            id: 'delete-message',
            label: 'Delete - you didn\'t enter any contest',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 10,
              feedback: 'Correct thinking. You can\'t win a contest you never entered.'
            }
          }
        ]
      },
      {
        id: 'family-emergency',
        title: 'Family Emergency Call',
        description: 'Someone calls claiming to be a relative in jail who needs $500 bail money sent via gift cards immediately.',
        choices: [
          {
            id: 'send-gift-cards',
            label: 'Rush to buy and send gift cards',
            outcome: {
              incomeChange: -500,
              fatigueChange: 20,
              freeTimeChange: -10,
              skillChange: -15,
              feedback: 'Scam. Real emergencies don\'t require gift cards. No legitimate authority accepts them.'
            }
          },
          {
            id: 'hang-up-verify',
            label: 'Hang up and call the family member directly',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: 15,
              feedback: 'Excellent! You called your actual relative who was fine. Scam avoided.'
            }
          },
          {
            id: 'ask-questions',
            label: 'Ask personal questions only real family would know',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 10,
              feedback: 'The caller couldn\'t answer and hung up. Verification exposed the fraud.'
            }
          }
        ]
      },
      {
        id: 'password-breach',
        title: 'Password Breach Alert',
        description: 'A legitimate security service alerts you that your email password appeared in a data breach.',
        choices: [
          {
            id: 'ignore-alert',
            label: 'Ignore it - probably fake',
            outcome: {
              incomeChange: -200,
              fatigueChange: 15,
              freeTimeChange: -10,
              skillChange: -10,
              feedback: 'It was real. Someone accessed your accounts before you acted.'
            }
          },
          {
            id: 'change-passwords',
            label: 'Change passwords on important accounts',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 15,
              feedback: 'Good response. You secured your accounts before any damage occurred.'
            }
          },
          {
            id: 'enable-2fa',
            label: 'Change passwords AND enable two-factor authentication',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -15,
              skillChange: 20,
              feedback: 'Best response. Multiple layers of security now protect your accounts.'
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
    question: 'What signals help you recognize a scam quickly?',
    followUp: 'Have you or someone you know ever encountered a scam attempt?'
  },
  quiz: [
    {
      question: 'Fraud usually involves:',
      options: ['Honest mistakes', 'Deception', 'Market risk', 'Poor planning'],
      correctIndex: 1,
      explanation: 'Fraud is intentional deception designed to steal money or information.'
    },
    {
      question: 'Scammers often use urgency to:',
      options: ['Reduce your thinking time', 'Help victims decide', 'Improve security', 'Build trust'],
      correctIndex: 0,
      explanation: 'Urgency prevents you from thinking clearly or verifying the situation.'
    },
    {
      question: 'Identity theft affects:',
      options: ['Only money', 'Only credit', 'Short periods only', 'Many life areas'],
      correctIndex: 3,
      explanation: 'Identity theft can impact credit, employment, housing, and more.'
    },
    {
      question: 'Personal information should be:',
      options: ['Shared widely', 'Stored publicly', 'Protected carefully', 'Ignored'],
      correctIndex: 2,
      explanation: 'Protecting personal information limits what thieves can do.'
    },
    {
      question: 'Verification helps because:',
      options: ['It slows progress', 'It confirms truth before acting', 'It increases speed', 'It removes emotion'],
      correctIndex: 1,
      explanation: 'Verification confirms whether information is real before you respond.'
    }
  ],
  powerMove: 'Pause before acting on any urgent financial message and verify the source.',
  realLifeAction: 'Review your online accounts and strengthen passwords where needed.'
};
