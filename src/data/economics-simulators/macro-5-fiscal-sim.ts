/**
 * Fiscal Policy: Budget Director Simulator
 * 
 * Unit 5 Macroeconomics - Students manage government spending and taxation
 * to stabilize the economy and understand fiscal policy trade-offs.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const macro5FiscalSim: SimulatorConfig = {
  id: 'macro-5-fiscal-sim',
  unitId: 'macro-5-fiscal-policy',
  title: 'Budget Director Simulator',
  subtitle: 'Master Fiscal Policy',
  description: 'As Budget Director, you control government spending and taxes. Use fiscal policy to stabilize the economy, but watch the debt! Can you balance growth, stability, and sustainability?',
  icon: '📋',
  theme: {
    primary: 'indigo',
    secondary: 'violet',
    accent: 'purple',
  },
  
  introNarrative: "Welcome, Budget Director! You now control fiscal policy - government spending and taxation. Unlike the Fed, you answer to elected officials and voters. Your challenge: use fiscal tools to stabilize the economy while managing the national debt.",
  philIntro: "Fiscal policy is the government's power of the purse! Spend more or tax less to stimulate; spend less or tax more to cool down. But unlike monetary policy, fiscal policy is political - and debt accumulates. Let's see how you balance it all!",
  
  initialMeters: [
    { id: 'gdpGrowth', label: 'GDP Growth', value: 2, min: -5, max: 8, unit: '%', color: 'green', icon: '📈' },
    { id: 'deficit', label: 'Budget Deficit', value: 3, min: -2, max: 15, unit: '% GDP', color: 'red', icon: '📉' },
    { id: 'debtRatio', label: 'Debt-to-GDP', value: 80, min: 0, max: 150, unit: '%', color: 'amber', icon: '💳' },
    { id: 'publicTrust', label: 'Public Trust', value: 60, min: 0, max: 100, unit: '%', color: 'blue', icon: '🗳️' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Fiscal Policy Basics',
      narrative: "Let's understand how fiscal policy works. Government spending and taxes directly affect aggregate demand, unlike monetary policy which works indirectly through interest rates.",
      decisions: [
        {
          id: 'r1-d1',
          title: 'Expansionary vs. Contractionary',
          scenario: "The economy is in recession. GDP is falling and unemployment is rising. What fiscal policy stance should you take?",
          options: [
            {
              id: 'expand',
              label: 'Expansionary: Spend More, Tax Less',
              description: 'Increase government spending and/or cut taxes.',
              meterChanges: { gdpGrowth: 1.5, deficit: 2, publicTrust: 5 },
              feedback: 'Correct! Expansionary fiscal policy boosts aggregate demand during recessions.',
              philInsight: 'Keynes said government should spend when the private sector won\'t. Your spending becomes someone\'s income, which they spend, creating a multiplier effect!',
            },
            {
              id: 'contract',
              label: 'Contractionary: Spend Less, Tax More',
              description: 'Cut spending and/or raise taxes to reduce the deficit.',
              meterChanges: { gdpGrowth: -1, deficit: -1, publicTrust: -10 },
              feedback: 'Wrong direction! Austerity during a recession makes things worse.',
              philInsight: 'Cutting spending in a recession is "pro-cyclical" - it makes the cycle worse. Counter-cyclical policy means doing the opposite of the cycle!',
            },
            {
              id: 'neutral',
              label: 'Neutral: Keep Current Policy',
              description: 'Don\'t change anything - let the economy self-correct.',
              meterChanges: { gdpGrowth: -0.5, publicTrust: -5 },
              feedback: 'The recession continues. Fiscal policy could have helped.',
              philInsight: 'Automatic stabilizers (unemployment benefits, progressive taxes) provide some stimulus automatically, but discretionary policy can do more.',
            },
          ],
          conceptConnection: 'Expansionary fiscal policy (more spending, less taxes) stimulates demand. Contractionary policy does the opposite.',
        },
        {
          id: 'r1-d2',
          title: 'The Multiplier Effect',
          scenario: "You're planning a $100 billion infrastructure package. Economists estimate the multiplier is 1.5. What's the total impact on GDP?",
          options: [
            {
              id: 'multiplier',
              label: '$150 Billion',
              description: '$100B × 1.5 multiplier = $150B total GDP impact.',
              meterChanges: { gdpGrowth: 0.5, publicTrust: 5 },
              feedback: 'Correct! The multiplier means each dollar of spending generates more than a dollar of GDP.',
              philInsight: 'The multiplier works because your spending is someone\'s income. They spend part of it, which becomes someone else\'s income, and so on!',
            },
            {
              id: 'direct',
              label: '$100 Billion',
              description: 'You spend $100B, GDP goes up $100B.',
              meterChanges: { publicTrust: -3 },
              feedback: 'That ignores the multiplier! The initial spending creates additional rounds of spending.',
              philInsight: 'If the multiplier were 1, fiscal policy would be much less powerful. The multiplier is why Keynesian economics works!',
            },
            {
              id: 'less',
              label: '$50 Billion',
              description: 'Some spending is wasted, so impact is less.',
              meterChanges: { publicTrust: -3 },
              feedback: 'The multiplier is greater than 1, not less! Even with some waste, the ripple effects boost GDP.',
              philInsight: 'The multiplier can be less than 1 in some cases (crowding out), but during recessions with slack, it\'s typically above 1.',
            },
          ],
          conceptConnection: 'The fiscal multiplier means government spending has a magnified effect on GDP through successive rounds of spending.',
        },
      ],
      roundSummary: 'Fiscal policy directly affects aggregate demand. The multiplier amplifies the impact. Use expansionary policy in recessions, contractionary in booms.',
    },
    {
      roundNumber: 2,
      title: 'Deficits and Debt',
      narrative: "Fiscal stimulus is great, but it comes with a cost: budget deficits that add to the national debt. Let's explore the trade-offs.",
      decisions: [
        {
          id: 'r2-d1',
          title: 'The Deficit Dilemma',
          scenario: "Your stimulus worked! The economy is recovering. But the deficit is now 6% of GDP. What do you do?",
          options: [
            {
              id: 'reduce',
              label: 'Gradually Reduce the Deficit',
              description: 'Slowly cut spending and raise taxes as the economy strengthens.',
              meterChanges: { gdpGrowth: -0.3, deficit: -1.5, debtRatio: -2, publicTrust: 5 },
                feedback: "Balanced approach! You're reducing the deficit without killing the recovery.",
              philInsight: 'Counter-cyclical policy means running deficits in bad times and surpluses (or smaller deficits) in good times. You\'re doing it right!',
            },
            {
              id: 'austerity',
              label: 'Aggressive Austerity',
              description: 'Slash spending immediately to balance the budget.',
              meterChanges: { gdpGrowth: -2, deficit: -3, publicTrust: -15 },
              feedback: 'Too fast! The economy slips back toward recession. Austerity during recovery is risky.',
              philInsight: 'The UK tried this after 2010 - "austerity." Growth stalled. Timing matters: reduce deficits when the economy is strong, not recovering.',
            },
            {
              id: 'continue',
              label: 'Keep Stimulating',
              description: 'The recovery isn\'t complete - keep spending.',
              meterChanges: { gdpGrowth: 1, deficit: 1, debtRatio: 3, publicTrust: -5 },
              feedback: 'Growth continues, but debt is rising. At some point, you\'ll need to consolidate.',
              philInsight: 'Stimulus is medicine, not vitamins. Once the patient (economy) is healthy, you should stop. Permanent deficits aren\'t sustainable.',
            },
          ],
          conceptConnection: 'Deficits should be counter-cyclical: larger in recessions, smaller in expansions. Timing the pivot is crucial.',
        },
        {
          id: 'r2-d2',
          title: 'Crowding Out',
          scenario: "Critics say your deficit spending 'crowds out' private investment. The government borrows, pushing up interest rates, making it harder for businesses to borrow. Is this a concern?",
          options: [
            {
              id: 'depends',
              label: 'It Depends on Economic Conditions',
              description: 'Crowding out is minimal in recessions, significant in booms.',
              meterChanges: { publicTrust: 10 },
              feedback: 'Nuanced and correct! When the economy has slack, government borrowing doesn\'t compete much with private borrowing.',
              philInsight: 'In recessions, there\'s plenty of savings looking for borrowers. Government borrowing doesn\'t crowd out much. In booms, it\'s a bigger issue.',
            },
            {
              id: 'always',
              label: 'Always a Problem',
              description: 'Government borrowing always hurts private investment.',
              meterChanges: { publicTrust: -5 },
              feedback: 'Too absolute! Crowding out depends on how much slack is in the economy.',
              philInsight: 'Classical economists worried about crowding out. Keynesians showed it\'s minimal when there\'s unemployment and unused capacity.',
            },
            {
              id: 'never',
              label: 'Never a Problem',
              description: 'Government spending creates growth that benefits everyone.',
              meterChanges: { publicTrust: -5 },
              feedback: 'Too dismissive! Crowding out is real, especially when the economy is at full capacity.',
              philInsight: 'At full employment, government borrowing DOES compete with private borrowing. Crowding out is real in booms.',
            },
          ],
          conceptConnection: 'Crowding out occurs when government borrowing raises interest rates, reducing private investment. It\'s worse in booms than recessions.',
        },
      ],
      roundSummary: 'Deficits add to debt. Crowding out is a concern in booms but not recessions. Counter-cyclical policy means deficits in bad times, consolidation in good times.',
    },
    {
      roundNumber: 3,
      title: 'Fiscal Sustainability',
      narrative: "Final challenge: the long-term fiscal picture. Debt is 80% of GDP and rising. How do you ensure fiscal sustainability while maintaining economic stability?",
      decisions: [
        {
          id: 'r3-d1',
          title: 'The Debt-to-GDP Ratio',
          scenario: "Debt is 80% of GDP. Is this sustainable? What matters more: the absolute debt level or the debt-to-GDP ratio?",
          options: [
            {
              id: 'ratio',
              label: 'The Ratio Matters Most',
              description: 'If GDP grows faster than debt, the ratio falls.',
              meterChanges: { gdpGrowth: 0.5, debtRatio: -2, publicTrust: 10 },
              feedback: 'Correct! A growing economy can handle more debt. The ratio is what matters for sustainability.',
              philInsight: 'Japan has 250% debt-to-GDP but is stable. The US had 120% after WWII but grew out of it. Growth is the best debt reduction strategy!',
            },
            {
              id: 'absolute',
              label: 'Absolute Debt Matters',
              description: '$30 trillion is $30 trillion, regardless of GDP.',
              meterChanges: { publicTrust: -5 },
              feedback: 'Big numbers sound scary, but what matters is whether the economy can service the debt.',
              philInsight: 'A $30 trillion debt in a $25 trillion economy is very different from $30 trillion in a $100 trillion economy. Ratios matter!',
            },
            {
              id: 'zero',
              label: 'We Should Have Zero Debt',
              description: 'Any debt is a burden on future generations.',
              meterChanges: { gdpGrowth: -1, publicTrust: -5 },
              feedback: 'Zero debt would require massive austerity. Some debt is normal and even beneficial.',
              philInsight: 'Government debt is also private sector savings! Treasury bonds are safe assets that people want to hold. Some debt is healthy.',
            },
          ],
          conceptConnection: 'Debt sustainability depends on the debt-to-GDP ratio, not absolute debt. Growth helps reduce the ratio.',
        },
        {
          id: 'r3-d2',
          title: 'Long-Term Fiscal Policy',
          scenario: "Looking ahead 20 years, healthcare and retirement costs will explode as the population ages. How do you prepare?",
          options: [
            {
              id: 'reform',
              label: 'Gradual Entitlement Reform',
              description: 'Slowly adjust benefits and eligibility to match demographics.',
              meterChanges: { deficit: -1, debtRatio: -5, publicTrust: 5 },
              feedback: 'Politically difficult but fiscally responsible. Small changes now prevent big crises later.',
              philInsight: 'The sooner you adjust, the smaller the changes needed. Waiting makes the eventual adjustment more painful.',
            },
            {
              id: 'growth',
              label: 'Focus on Growth',
              description: 'A bigger economy can afford more spending.',
              meterChanges: { gdpGrowth: 1, deficit: 0.5, publicTrust: 5 },
              feedback: 'Growth helps, but demographics are destiny. You can\'t fully grow your way out.',
              philInsight: 'Growth is necessary but not sufficient. If healthcare costs grow faster than GDP, you still have a problem.',
            },
            {
              id: 'ignore',
              label: 'Deal With It Later',
              description: 'Future generations can figure it out.',
              meterChanges: { deficit: 1, debtRatio: 5, publicTrust: -10 },
              feedback: 'Kicking the can down the road. The problem gets worse, and future options get more painful.',
              philInsight: 'This is what most politicians do! But it\'s intergenerational unfairness - today\'s voters benefit, future voters pay.',
            },
          ],
          conceptConnection: 'Long-term fiscal sustainability requires addressing demographic pressures on entitlements. Early action is easier than late action.',
        },
      ],
      roundSummary: 'Fiscal sustainability depends on the debt-to-GDP ratio. Growth helps, but demographic pressures require structural reforms. Plan ahead!',
    },
  ],
  
  completionThresholds: {
    excellent: { gdpGrowth: { min: 2 }, deficit: { max: 4 }, debtRatio: { max: 85 }, publicTrust: { min: 70 } },
    good: { gdpGrowth: { min: 1 }, deficit: { max: 6 }, debtRatio: { max: 95 }, publicTrust: { min: 55 } },
    passing: { gdpGrowth: { min: 0 }, deficit: { max: 8 }, publicTrust: { min: 40 } },
  },
  
  endings: {
    excellent: {
      title: 'Fiscal Policy Master!',
      description: 'You achieved growth, stability, and sustainability! You understand when to stimulate, when to consolidate, and how to manage debt responsibly.',
      philMessage: 'Incredible! You\'ve mastered fiscal policy - the multiplier, crowding out, counter-cyclical timing, and long-term sustainability. The economy and future generations thank you!',
    },
    good: {
      title: 'Capable Budget Director',
      description: 'You navigated fiscal challenges effectively. Growth is solid, debt is manageable, and the public trusts your stewardship.',
      philMessage: 'Great work! You understand that fiscal policy is powerful but must be used wisely. Deficits in bad times, consolidation in good times. Keep it up!',
    },
    passing: {
      title: 'Learning Fiscal Manager',
      description: 'You kept the economy afloat, but there\'s room for improvement in balancing growth and sustainability.',
      philMessage: 'Good effort! Remember: expansionary policy in recessions, contractionary in booms. Watch the debt-to-GDP ratio, not just absolute debt. You\'re getting there!',
    },
    needsWork: {
      title: 'Keep Budgeting!',
      description: 'Fiscal policy is complex. Review the multiplier, crowding out, and debt sustainability, then try again.',
      philMessage: 'Don\'t give up! The key insight: government spending boosts GDP through the multiplier, but debt must be sustainable. Balance short-term stimulus with long-term responsibility!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
