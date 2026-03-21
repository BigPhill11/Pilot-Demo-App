// The Shield Builder - Insurance Module Boss Game
// A multi-month simulation where you build protection layers while facing various threats

export interface ShieldBuilderState {
  month: number;
  assets: number;
  protectionLevel: number;
  securityScore: number;
  stressLevel: number;
  insuranceCoverage: {
    health: boolean;
    auto: boolean;
    renters: boolean;
    liability: boolean;
  };
  emergencyFund: number;
  digitalSecurityScore: number;
  hasPasswordManager: boolean;
  has2FA: boolean;
}

export interface ShieldBuilderEvent {
  id: string;
  title: string;
  description: string;
  type: 'emergency' | 'scam' | 'legal' | 'digital' | 'opportunity';
  choices: ShieldBuilderChoice[];
}

export interface ShieldBuilderChoice {
  id: string;
  label: string;
  requirements?: {
    hasInsurance?: keyof ShieldBuilderState['insuranceCoverage'];
    minEmergencyFund?: number;
    minProtectionLevel?: number;
    hasPasswordManager?: boolean;
    has2FA?: boolean;
  };
  outcome: {
    assetChange: number;
    protectionChange: number;
    securityChange: number;
    stressChange: number;
    emergencyFundChange?: number;
    feedback: string;
  };
}

export const shieldBuilderConfig = {
  title: 'The Shield Builder',
  description: 'Build your protection fortress over 6 months while life throws challenges your way. Balance spending on protection with maintaining your assets.',
  
  initialState: {
    month: 1,
    assets: 5000,
    protectionLevel: 20,
    securityScore: 30,
    stressLevel: 20,
    insuranceCoverage: {
      health: false,
      auto: false,
      renters: false,
      liability: false
    },
    emergencyFund: 500,
    digitalSecurityScore: 25,
    hasPasswordManager: false,
    has2FA: false
  } as ShieldBuilderState,

  monthlyEvents: [
    // Month 1: Foundation Building
    {
      id: 'month-1-insurance-choice',
      title: 'Insurance Assessment',
      description: 'A financial advisor offers to review your insurance needs. Time to think about protection.',
      type: 'opportunity' as const,
      choices: [
        {
          id: 'get-basic-coverage',
          label: 'Get health and auto insurance ($200/month)',
          outcome: {
            assetChange: -200,
            protectionChange: 25,
            securityChange: 10,
            stressChange: -15,
            feedback: 'You established essential coverage. Major medical and auto accidents are now protected.'
          }
        },
        {
          id: 'get-full-coverage',
          label: 'Get comprehensive coverage ($350/month)',
          outcome: {
            assetChange: -350,
            protectionChange: 40,
            securityChange: 20,
            stressChange: -25,
            feedback: 'Full protection in place. Health, auto, renters, and liability all covered.'
          }
        },
        {
          id: 'skip-for-now',
          label: 'Skip insurance for now',
          outcome: {
            assetChange: 0,
            protectionChange: 0,
            securityChange: -5,
            stressChange: 5,
            feedback: 'Saved money but you remain exposed to major risks.'
          }
        }
      ]
    },
    // Month 2: Digital Security
    {
      id: 'month-2-digital-security',
      title: 'Digital Security Upgrade',
      description: 'You hear about friends getting hacked. Time to assess your digital protection.',
      type: 'digital' as const,
      choices: [
        {
          id: 'full-security-setup',
          label: 'Set up password manager + 2FA everywhere ($5/month)',
          outcome: {
            assetChange: -5,
            protectionChange: 15,
            securityChange: 30,
            stressChange: -10,
            feedback: 'Excellent security posture. Your digital life is well protected.'
          }
        },
        {
          id: 'basic-security',
          label: 'Just enable 2FA on important accounts',
          outcome: {
            assetChange: 0,
            protectionChange: 10,
            securityChange: 15,
            stressChange: -5,
            feedback: 'Good first step. Key accounts have extra protection.'
          }
        },
        {
          id: 'ignore-security',
          label: 'Keep using the same passwords',
          outcome: {
            assetChange: 0,
            protectionChange: 0,
            securityChange: -10,
            stressChange: 0,
            feedback: 'Risky choice. Your accounts remain vulnerable.'
          }
        }
      ]
    },
    // Month 3: Emergency Fund
    {
      id: 'month-3-emergency-fund',
      title: 'Building the Buffer',
      description: 'You have some extra income this month. How do you use it?',
      type: 'opportunity' as const,
      choices: [
        {
          id: 'boost-emergency-fund',
          label: 'Add $500 to emergency fund',
          outcome: {
            assetChange: -500,
            protectionChange: 10,
            securityChange: 5,
            stressChange: -10,
            emergencyFundChange: 500,
            feedback: 'Your safety net grows stronger. Unexpected expenses are less scary.'
          }
        },
        {
          id: 'invest-extra',
          label: 'Invest the extra money',
          outcome: {
            assetChange: 50,
            protectionChange: 0,
            securityChange: 0,
            stressChange: 0,
            feedback: 'Growth potential, but no added protection if emergencies hit.'
          }
        },
        {
          id: 'spend-it',
          label: 'Spend it on wants',
          outcome: {
            assetChange: 0,
            protectionChange: -5,
            securityChange: 0,
            stressChange: 5,
            feedback: 'Enjoyed the moment, but your buffer remains thin.'
          }
        }
      ]
    },
    // Month 4: Scam Attempt
    {
      id: 'month-4-scam-attempt',
      title: 'Suspicious Message',
      description: 'You receive an urgent email claiming your bank account was compromised. Click to verify.',
      type: 'scam' as const,
      choices: [
        {
          id: 'click-link',
          label: 'Click the link and enter your info',
          outcome: {
            assetChange: -800,
            protectionChange: 0,
            securityChange: -20,
            stressChange: 30,
            feedback: 'Phishing attack! Scammers accessed your account. Months of recovery ahead.'
          }
        },
        {
          id: 'verify-directly',
          label: 'Call your bank directly to verify',
          outcome: {
            assetChange: 0,
            protectionChange: 5,
            securityChange: 10,
            stressChange: 5,
            feedback: 'Smart move! Bank confirmed it was a scam. Your verification habit paid off.'
          }
        },
        {
          id: 'delete-ignore',
          label: 'Delete and ignore the message',
          outcome: {
            assetChange: 0,
            protectionChange: 5,
            securityChange: 5,
            stressChange: 0,
            feedback: 'Good instinct. You avoided the trap entirely.'
          }
        }
      ]
    },
    // Month 5: Medical Emergency
    {
      id: 'month-5-medical-emergency',
      title: 'Unexpected Injury',
      description: 'You twist your ankle badly and need medical care. ER visit costs $2,500.',
      type: 'emergency' as const,
      choices: [
        {
          id: 'use-insurance',
          label: 'Use health insurance (if you have it)',
          requirements: {
            hasInsurance: 'health'
          },
          outcome: {
            assetChange: -250,
            protectionChange: 0,
            securityChange: 5,
            stressChange: 10,
            feedback: 'Insurance covered most of it. You only paid your deductible.'
          }
        },
        {
          id: 'use-emergency-fund',
          label: 'Pay from emergency fund',
          requirements: {
            minEmergencyFund: 1000
          },
          outcome: {
            assetChange: 0,
            protectionChange: -10,
            securityChange: 0,
            stressChange: 15,
            emergencyFundChange: -1500,
            feedback: 'Emergency fund absorbed the cost. That\'s what it\'s for.'
          }
        },
        {
          id: 'payment-plan',
          label: 'Set up a payment plan',
          outcome: {
            assetChange: -200,
            protectionChange: 0,
            securityChange: 0,
            stressChange: 25,
            feedback: 'Monthly payments for the next year. Interest adds to the total.'
          }
        }
      ]
    },
    // Month 6: Legal Situation
    {
      id: 'month-6-legal-situation',
      title: 'Property Damage Claim',
      description: 'A neighbor claims your actions caused damage to their property. They want $3,000.',
      type: 'legal' as const,
      choices: [
        {
          id: 'use-liability-insurance',
          label: 'File a liability insurance claim',
          requirements: {
            hasInsurance: 'liability'
          },
          outcome: {
            assetChange: -100,
            protectionChange: 5,
            securityChange: 5,
            stressChange: 10,
            feedback: 'Insurance handled the claim. You only paid the deductible.'
          }
        },
        {
          id: 'negotiate-directly',
          label: 'Negotiate a settlement directly',
          outcome: {
            assetChange: -1500,
            protectionChange: 0,
            securityChange: 0,
            stressChange: 20,
            feedback: 'Settled for half, but still a significant hit to your assets.'
          }
        },
        {
          id: 'dispute-claim',
          label: 'Dispute the claim entirely',
          outcome: {
            assetChange: -500,
            protectionChange: -5,
            securityChange: -5,
            stressChange: 30,
            feedback: 'Legal fees mounted. The stress was significant regardless of outcome.'
          }
        }
      ]
    }
  ] as ShieldBuilderEvent[],

  winConditions: {
    excellent: {
      minAssets: 4000,
      minProtection: 70,
      minSecurity: 60,
      maxStress: 40,
      title: 'Master Protector',
      message: 'You built an excellent protection fortress! Assets preserved, stress managed, security strong.'
    },
    good: {
      minAssets: 3000,
      minProtection: 50,
      minSecurity: 40,
      maxStress: 60,
      title: 'Solid Defender',
      message: 'Good protection strategy! You weathered most challenges well.'
    },
    passing: {
      minAssets: 2000,
      minProtection: 30,
      minSecurity: 25,
      maxStress: 80,
      title: 'Surviving Guardian',
      message: 'You made it through, but some better protection would have helped.'
    }
  },

  xpRewards: {
    excellent: 150,
    good: 100,
    passing: 60,
    failing: 30
  },

  coinRewards: {
    excellent: 75,
    good: 50,
    passing: 30,
    failing: 15
  }
};

export type ShieldBuilderConfig = typeof shieldBuilderConfig;
