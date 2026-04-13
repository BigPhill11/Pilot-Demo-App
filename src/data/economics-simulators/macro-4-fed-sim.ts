/**
 * Monetary Policy: Fed Chair Simulator
 * 
 * Unit 4 Macroeconomics - Students take the role of Federal Reserve Chair
 * and learn how monetary policy affects the economy.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const macro4FedSim: SimulatorConfig = {
  id: 'macro-4-fed-sim',
  unitId: 'macro-4-monetary-policy',
  title: 'Fed Chair Simulator',
  subtitle: 'Control the Money Supply',
  description: 'Step into the shoes of the Federal Reserve Chair. Use interest rates and other tools to maintain price stability and maximum employment. Can you achieve the dual mandate?',
  icon: '🏦',
  theme: {
    primary: 'emerald',
    secondary: 'green',
    accent: 'teal',
  },
  
  introNarrative: "Congratulations, Chair! You now lead the Federal Reserve, the most powerful economic institution in the world. Your dual mandate: stable prices (2% inflation) and maximum employment. Your tools: interest rates, open market operations, and forward guidance. The economy awaits your decisions.",
  philIntro: "The Fed is like the economy's thermostat! Too hot (inflation)? Raise rates to cool it down. Too cold (recession)? Lower rates to warm it up. But there's a lag - your actions today affect the economy 6-18 months from now. No pressure!",
  
  initialMeters: [
    { id: 'fedRate', label: 'Fed Funds Rate', value: 2.5, min: 0, max: 10, unit: '%', color: 'green', icon: '📊' },
    { id: 'inflation', label: 'Inflation Rate', value: 2.5, min: 0, max: 10, unit: '%', color: 'red', icon: '📈' },
    { id: 'unemployment', label: 'Unemployment Rate', value: 4.5, min: 2, max: 12, unit: '%', color: 'blue', icon: '👷' },
    { id: 'credibility', label: 'Fed Credibility', value: 70, min: 0, max: 100, unit: '%', color: 'purple', icon: '🎯' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Understanding Monetary Policy',
      narrative: "Your first FOMC meeting! Let's understand how the Fed's tools work and how they affect the economy.",
      decisions: [
        {
          id: 'r1-d1',
          title: 'The Transmission Mechanism',
          scenario: "You're considering raising the federal funds rate. Walk through how this affects the economy.",
          context: 'The fed funds rate is the rate banks charge each other for overnight loans.',
          options: [
            {
              id: 'correct',
              label: 'Higher Rates → Less Borrowing → Less Spending → Lower Inflation',
              description: 'The standard transmission mechanism.',
              meterChanges: { credibility: 10 },
              feedback: 'Exactly! Higher rates make borrowing more expensive, reducing investment and consumption, which cools inflation.',
              philInsight: 'The transmission mechanism: Fed rate → bank rates → borrowing costs → spending → aggregate demand → inflation. It takes 6-18 months!',
            },
            {
              id: 'direct',
              label: 'Higher Rates → Directly Lower Prices',
              description: 'The Fed controls prices directly.',
              meterChanges: { credibility: -5 },
              feedback: 'The Fed doesn\'t set prices directly! It influences them indirectly through interest rates and spending.',
              philInsight: 'The Fed has no direct price controls. It works through the banking system and credit markets to influence aggregate demand.',
            },
            {
              id: 'wrong',
              label: 'Higher Rates → More Saving → More Investment → Growth',
              description: 'Higher rates encourage saving and investment.',
              meterChanges: { credibility: -5 },
              feedback: 'Higher rates do encourage saving, but they DISCOURAGE investment (borrowing is more expensive). Net effect is contractionary.',
              philInsight: 'Higher rates help savers but hurt borrowers. Since investment requires borrowing, higher rates reduce investment and slow the economy.',
            },
          ],
          conceptConnection: 'Monetary policy works through interest rates → borrowing → spending → aggregate demand → inflation/employment.',
        },
        {
          id: 'r1-d2',
          title: 'The Dual Mandate',
          scenario: "Congress gave the Fed two goals: stable prices (2% inflation) and maximum employment. Right now, inflation is 3% and unemployment is 4%. What do you do?",
          options: [
            {
              id: 'raise',
              label: 'Raise Rates Slightly',
              description: 'Inflation is above target; unemployment is fine.',
              meterChanges: { fedRate: 0.25, inflation: -0.3, unemployment: 0.2, credibility: 5 },
              feedback: 'Balanced approach! You're addressing inflation while being mindful of employment.',
              philInsight: 'With unemployment at 4% (near natural rate), you have room to focus on inflation. Gradual rate hikes signal commitment to the 2% target.',
            },
            {
              id: 'aggressive',
              label: 'Raise Rates Aggressively',
              description: 'Crush inflation now before it gets worse.',
              meterChanges: { fedRate: 1, inflation: -0.8, unemployment: 1, credibility: 0 },
              feedback: 'Inflation drops, but unemployment spikes. You may have overreacted to a small deviation.',
              philInsight: 'Aggressive moves can overshoot. The economy responds with a lag, so by the time you see results, you may have done too much.',
            },
            {
              id: 'hold',
              label: 'Hold Rates Steady',
              description: '3% inflation isn\'t that bad; don\'t risk jobs.',
              meterChanges: { inflation: 0.3, credibility: -10 },
              feedback: 'Inflation drifts higher. Markets question your commitment to the 2% target.',
              philInsight: 'Letting inflation drift above target risks unanchoring expectations. The Fed\'s credibility depends on defending the target!',
            },
          ],
          conceptConnection: 'The dual mandate requires balancing inflation and employment. When they conflict, the Fed must make tough trade-offs.',
        },
      ],
      roundSummary: 'The Fed influences the economy through interest rates. The dual mandate (stable prices + maximum employment) sometimes requires trade-offs.',
    },
    {
      roundNumber: 2,
      title: 'Fighting Inflation',
      narrative: "Inflation has risen to 6%! The public is angry about rising prices. You need to act decisively, but raising rates too fast could cause a recession.",
      decisions: [
        {
          id: 'r2-d1',
          title: 'The Inflation Crisis',
          scenario: "Inflation is 6%, well above your 2% target. Unemployment is 3.5%, below the natural rate. The economy is overheating. What's your move?",
          options: [
            {
              id: 'hike',
              label: 'Aggressive Rate Hikes',
              description: 'Raise rates by 0.75% at each meeting until inflation falls.',
              meterChanges: { fedRate: 2, inflation: -2, unemployment: 1.5, credibility: 10 },
              feedback: 'Bold action! Inflation starts falling, but unemployment rises. This is the painful medicine needed.',
              philInsight: 'Paul Volcker did this in 1980-82. Painful in the short run (recession), but it broke inflation and restored credibility for decades!',
            },
            {
              id: 'gradual',
              label: 'Gradual Rate Increases',
              description: 'Raise rates by 0.25% per meeting - slow and steady.',
              meterChanges: { fedRate: 0.5, inflation: -0.5, unemployment: 0.3, credibility: -5 },
              feedback: 'Inflation falls slowly, but expectations may become unanchored. Markets question your resolve.',
              philInsight: 'Gradualism risks falling behind the curve. If inflation expectations rise, you\'ll need even higher rates later.',
            },
            {
              id: 'wait',
              label: 'Wait for Supply Chains to Heal',
              description: 'Inflation is transitory - it will resolve itself.',
              meterChanges: { inflation: 1, credibility: -15 },
              feedback: 'Inflation gets worse. Your "transitory" call was wrong, and credibility suffers.',
              philInsight: 'The "transitory" bet is risky. If you\'re wrong, you lose credibility and need even more aggressive action later.',
            },
          ],
          conceptConnection: 'Fighting inflation requires raising rates, which slows the economy. The Fed must balance speed against recession risk.',
        },
        {
          id: 'r2-d2',
          title: 'Forward Guidance',
          scenario: "Markets are nervous. They don't know how high you'll raise rates. Should you provide forward guidance about your plans?",
          options: [
            {
              id: 'guidance',
              label: 'Clear Forward Guidance',
              description: '"We will raise rates until inflation reaches 2%."',
              meterChanges: { inflation: -0.5, credibility: 10 },
              feedback: 'Markets calm down. Clear communication helps expectations adjust smoothly.',
              philInsight: 'Forward guidance is a powerful tool! By telling markets your plans, you can influence long-term rates and expectations without even acting.',
            },
            {
              id: 'vague',
              label: 'Stay Vague',
              description: '"We will be data-dependent and adjust as needed."',
              meterChanges: { credibility: -5 },
              feedback: 'Markets remain uncertain. Volatility increases as everyone guesses your next move.',
              philInsight: 'Some flexibility is good, but too much vagueness creates uncertainty. Markets price in worst-case scenarios.',
            },
            {
              id: 'surprise',
              label: 'Keep Markets Guessing',
              description: 'Surprise moves have more impact.',
              meterChanges: { credibility: -10 },
              feedback: 'Surprise rate moves cause market chaos. Volatility spikes and confidence falls.',
              philInsight: 'The Fed learned that surprises are bad. Predictable, well-communicated policy is more effective than shock tactics.',
            },
          ],
          conceptConnection: 'Forward guidance helps the Fed influence expectations and long-term rates through communication, not just action.',
        },
      ],
      roundSummary: 'Fighting inflation requires decisive action and clear communication. Forward guidance helps manage expectations.',
    },
    {
      roundNumber: 3,
      title: 'Fighting Recession',
      narrative: "The economy has slowed sharply. Unemployment is rising and inflation is falling below target. Time to stimulate!",
      decisions: [
        {
          id: 'r3-d1',
          title: 'The Recession Response',
          scenario: "Unemployment has jumped to 8%. Inflation has fallen to 1%. GDP is shrinking. What's your policy response?",
          options: [
            {
              id: 'cut',
              label: 'Cut Rates Aggressively',
              description: 'Lower the fed funds rate toward zero.',
              meterChanges: { fedRate: -2, inflation: 0.5, unemployment: -1, credibility: 5 },
              feedback: 'Lower rates stimulate borrowing and spending. The economy starts to recover.',
              philInsight: 'In recessions, the Fed cuts rates to make borrowing cheap. This encourages investment and consumption, boosting aggregate demand.',
            },
            {
              id: 'qe',
              label: 'Quantitative Easing (QE)',
              description: 'Buy bonds to inject money and lower long-term rates.',
              meterChanges: { fedRate: -1, inflation: 0.8, unemployment: -1.5, credibility: 5 },
              feedback: 'QE provides additional stimulus when rates are already low. Effective but controversial.',
              philInsight: 'When rates hit zero (the "zero lower bound"), the Fed can still stimulate by buying bonds. This is unconventional monetary policy!',
            },
            {
              id: 'hold',
              label: 'Hold Steady',
              description: 'The economy will recover on its own.',
              meterChanges: { unemployment: 1, credibility: -10 },
              feedback: 'The recession deepens. Your inaction prolongs the suffering.',
              philInsight: 'Doing nothing in a recession is a choice - a bad one. The Fed exists to stabilize the economy!',
            },
          ],
          conceptConnection: 'In recessions, the Fed cuts rates and may use QE to stimulate the economy when rates hit zero.',
        },
        {
          id: 'r3-d2',
          title: 'The Exit Strategy',
          scenario: "The economy is recovering. Unemployment is falling and inflation is rising toward 2%. When do you start raising rates again?",
          options: [
            {
              id: 'early',
              label: 'Raise Rates Early',
              description: 'Start tightening before inflation exceeds 2%.',
              meterChanges: { fedRate: 0.5, inflation: -0.3, unemployment: 0.5, credibility: 5 },
              feedback: 'Preemptive tightening! You prevent overheating but risk slowing the recovery too soon.',
              philInsight: 'The Fed often raises rates before inflation hits target because of the lag. By the time you see inflation, it\'s too late!',
            },
            {
              id: 'wait',
              label: 'Wait for Full Employment',
              description: 'Keep rates low until unemployment reaches 4%.',
              meterChanges: { fedRate: 0, inflation: 0.5, unemployment: -1, credibility: 0 },
              feedback: 'Strong job growth, but inflation starts creeping up. You may be behind the curve.',
              philInsight: 'Waiting too long risks overheating. The Fed tries to be forward-looking, not reactive.',
            },
            {
              id: 'overshoot',
              label: 'Let Inflation Overshoot',
              description: 'After years below target, let it run above 2% for a while.',
              meterChanges: { fedRate: 0, inflation: 1, unemployment: -1.5, credibility: -5 },
              feedback: 'This is "average inflation targeting" - controversial but has theoretical support.',
              philInsight: 'The Fed adopted this in 2020! If inflation was below 2% for years, letting it run above 2% keeps the AVERAGE at target.',
            },
          ],
          conceptConnection: 'Exiting stimulus requires judgment about timing. Move too early and kill the recovery; too late and cause inflation.',
        },
      ],
      roundSummary: 'The Fed fights recessions by cutting rates and using QE. Timing the exit is crucial - too early or too late both cause problems.',
    },
  ],
  
  completionThresholds: {
    excellent: { inflation: { min: 1.5, max: 2.5 }, unemployment: { max: 5 }, credibility: { min: 75 } },
    good: { inflation: { min: 1, max: 4 }, unemployment: { max: 6 }, credibility: { min: 60 } },
    passing: { inflation: { max: 5 }, unemployment: { max: 8 }, credibility: { min: 45 } },
  },
  
  endings: {
    excellent: {
      title: 'Legendary Fed Chair!',
      description: 'You achieved the dual mandate with flying colors! Inflation is at target, employment is strong, and your credibility is unquestioned.',
      philMessage: 'You\'re the next Paul Volcker or Janet Yellen! You understand that monetary policy works with lags, credibility matters, and the dual mandate requires balance. The economy is in great hands!',
    },
    good: {
      title: 'Effective Central Banker',
      description: 'You navigated challenging conditions and kept the economy stable. The dual mandate is mostly achieved.',
      philMessage: 'Great work, Chair! You understand the tools (rates, QE, forward guidance) and the goals (stable prices, maximum employment). Keep refining your timing!',
    },
    passing: {
      title: 'Learning Central Banker',
      description: 'You kept the economy from disaster, but there\'s room for improvement. Monetary policy is an art as much as a science.',
      philMessage: 'Good effort! Remember: raise rates to fight inflation, cut rates to fight recession, and always communicate clearly. The lags make timing tricky!',
    },
    needsWork: {
      title: 'Keep Studying!',
      description: 'Central banking is hard! Review how interest rates affect the economy and the importance of credibility.',
      philMessage: 'Don\'t give up! The key insight: the Fed controls short-term rates, which influence borrowing, spending, and ultimately inflation and employment. Try again!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
