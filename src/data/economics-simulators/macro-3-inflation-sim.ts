/**
 * Inflation: Purchasing Power Lab
 * 
 * Unit 3 Macroeconomics - Students experience how inflation affects
 * purchasing power and learn about its causes and consequences.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const macro3InflationSim: SimulatorConfig = {
  id: 'macro-3-inflation-sim',
  unitId: 'macro-3-inflation',
  title: 'Purchasing Power Lab',
  subtitle: 'Master Inflation',
  description: 'Experience inflation from multiple perspectives: as a consumer watching prices rise, as a saver seeing your money lose value, and as a policy maker trying to control it.',
  icon: '💹',
  theme: {
    primary: 'rose',
    secondary: 'pink',
    accent: 'red',
  },
  
  introNarrative: "Welcome to the Purchasing Power Lab! Inflation is one of the most misunderstood economic forces. It's not just 'prices going up' - it's your money losing value. Today you'll experience inflation's effects and learn how to protect yourself and the economy.",
  philIntro: "Inflation is like a slow leak in your wallet! Every year, the same dollars buy a little less. A 3% inflation rate means your $100 only buys $97 worth of stuff next year. Let's understand why this happens and what to do about it!",
  
  initialMeters: [
    { id: 'inflation', label: 'Inflation Rate', value: 3, min: -2, max: 15, unit: '%', color: 'red', icon: '📈' },
    { id: 'purchasing', label: 'Purchasing Power', value: 100, min: 50, max: 150, unit: 'idx', color: 'green', icon: '🛒' },
    { id: 'expectations', label: 'Inflation Expectations', value: 3, min: 0, max: 10, unit: '%', color: 'amber', icon: '🔮' },
    { id: 'stability', label: 'Economic Stability', value: 70, min: 0, max: 100, unit: '%', color: 'blue', icon: '⚖️' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Understanding Inflation',
      narrative: "First, let's understand what inflation is, how it's measured, and why a little bit is actually normal and healthy.",
      decisions: [
        {
          id: 'r1-d1',
          title: 'Measuring Inflation',
          scenario: "The Consumer Price Index (CPI) tracks a 'basket' of goods. Last year the basket cost $100, this year it costs $103. What's the inflation rate?",
          options: [
            {
              id: 'correct',
              label: '3% Inflation',
              description: '($103 - $100) / $100 = 3%',
              meterChanges: { stability: 5 },
              feedback: 'Correct! The CPI measures the percentage change in the cost of a typical consumer\'s purchases.',
              philInsight: 'The CPI basket includes food, housing, transportation, healthcare, and more. It\'s weighted by how much people actually spend on each category!',
            },
            {
              id: 'wrong-dollar',
              label: '$3 Inflation',
              description: 'Prices went up by $3.',
              meterChanges: { stability: -5 },
              feedback: 'That\'s the dollar change, not the rate. Inflation is expressed as a percentage.',
              philInsight: 'Percentages let us compare across time and countries. $3 on $100 is 3%, but $3 on $1000 would only be 0.3%!',
            },
            {
              id: 'wrong-calc',
              label: '103% Inflation',
              description: 'The new price is 103% of the old price.',
              meterChanges: { stability: -5 },
              feedback: 'That\'s the price level, not the inflation rate. Inflation measures the CHANGE, which is 3%.',
              philInsight: 'Common mistake! 103% is the new price relative to the old. The inflation RATE is the change: 103% - 100% = 3%.',
            },
          ],
          conceptConnection: 'Inflation rate = (New CPI - Old CPI) / Old CPI × 100. It measures how fast prices are rising.',
        },
        {
          id: 'r1-d2',
          title: 'Good Inflation vs. Bad Inflation',
          scenario: "The central bank targets 2% inflation. Why not target 0%? Isn't any inflation bad?",
          options: [
            {
              id: 'target',
              label: '2% is the Sweet Spot',
              description: 'Low positive inflation is actually healthy for the economy.',
              meterChanges: { inflation: -0.5, stability: 10 },
              feedback: 'Correct! A little inflation gives the economy flexibility and keeps us away from dangerous deflation.',
              philInsight: 'Why 2%? It gives room for wages to adjust, encourages spending over hoarding, and provides a buffer against deflation!',
            },
            {
              id: 'zero',
              label: '0% Would Be Better',
              description: 'Stable prices mean stable economy.',
              meterChanges: { stability: -5 },
              feedback: 'Zero inflation sounds good but is risky. It\'s too close to deflation, which is much worse!',
              philInsight: 'At 0% inflation, any negative shock causes deflation. Deflation makes debt more expensive and causes people to delay purchases.',
            },
            {
              id: 'high',
              label: 'Higher Inflation is Fine',
              description: 'As long as wages keep up, who cares?',
              meterChanges: { inflation: 1, expectations: 1, stability: -10 },
              feedback: 'High inflation creates uncertainty, hurts savers, and can spiral out of control.',
              philInsight: 'High inflation distorts price signals, redistributes wealth unfairly, and can become self-fulfilling as expectations rise!',
            },
          ],
          conceptConnection: 'Central banks target low, stable inflation (usually 2%) to balance growth, flexibility, and stability.',
        },
      ],
      roundSummary: 'Inflation is measured by the CPI. A little inflation (2%) is healthy; too much or too little causes problems.',
    },
    {
      roundNumber: 2,
      title: 'Causes of Inflation',
      narrative: "Where does inflation come from? Two main sources: too much demand chasing too few goods (demand-pull), or rising costs pushing prices up (cost-push).",
      decisions: [
        {
          id: 'r2-d1',
          title: 'Demand-Pull Inflation',
          scenario: "The economy is booming! Everyone has jobs and money to spend. But factories can't keep up with demand. Prices are rising. What's happening?",
          options: [
            {
              id: 'demand-pull',
              label: 'Demand-Pull Inflation',
              description: 'Too much money chasing too few goods.',
              meterChanges: { inflation: 1, stability: 5 },
              feedback: 'Exactly! When demand exceeds supply, prices rise. This is demand-pull inflation.',
              philInsight: '"Too much money chasing too few goods" - that\'s the classic definition! It happens when the economy overheats.',
            },
            {
              id: 'cost-push',
              label: 'Cost-Push Inflation',
              description: 'Production costs must be rising.',
              meterChanges: { stability: -5 },
              feedback: 'Not in this case - the scenario describes demand outpacing supply, not rising costs.',
              philInsight: 'Cost-push is when input prices (oil, wages, materials) rise, forcing producers to raise prices. Different cause!',
            },
            {
              id: 'monetary',
              label: 'The Fed Printed Too Much Money',
              description: 'Inflation is always a monetary phenomenon.',
              meterChanges: { stability: 0 },
              feedback: 'Partly true! Excess money supply can cause demand-pull inflation, but the immediate cause is demand exceeding supply.',
              philInsight: 'Milton Friedman said "inflation is always and everywhere a monetary phenomenon." Money supply matters, but so does velocity and output!',
            },
          ],
          conceptConnection: 'Demand-pull inflation occurs when aggregate demand exceeds aggregate supply, often from expansionary policy.',
        },
        {
          id: 'r2-d2',
          title: 'Cost-Push Inflation',
          scenario: "Oil prices doubled due to a supply shock! Transportation and production costs are soaring. Businesses are raising prices to cover costs. What type of inflation is this?",
          options: [
            {
              id: 'cost-push',
              label: 'Cost-Push Inflation',
              description: 'Rising input costs push prices up.',
              meterChanges: { inflation: 2, purchasing: -5, stability: -5 },
              feedback: 'Correct! Cost-push inflation comes from the supply side - rising costs force higher prices.',
              philInsight: 'Cost-push is tricky because it combines inflation WITH reduced output. It\'s "stagflation" - stagnation plus inflation!',
            },
            {
              id: 'demand-pull',
              label: 'Demand-Pull Inflation',
              description: 'People must be buying too much oil.',
              meterChanges: { stability: -5 },
              feedback: 'No - the scenario says it\'s a supply shock, not excess demand. Costs are rising, not demand.',
              philInsight: 'Supply shocks reduce supply and raise costs. Demand-pull would be if everyone suddenly wanted more oil.',
            },
            {
              id: 'both',
              label: 'Both Types Combined',
              description: 'It\'s complicated - could be either.',
              meterChanges: { stability: 0 },
              feedback: 'In this case, it\'s clearly cost-push. The cause is a supply shock raising input costs.',
              philInsight: 'Sometimes both types occur together, but this scenario is textbook cost-push: external shock → higher costs → higher prices.',
            },
          ],
          conceptConnection: 'Cost-push inflation occurs when production costs rise, often from supply shocks like oil price spikes.',
        },
      ],
      roundSummary: 'Demand-pull inflation: too much spending. Cost-push inflation: rising production costs. Each requires different policy responses.',
    },
    {
      roundNumber: 3,
      title: 'Living with Inflation',
      narrative: "Final challenge: how do you protect yourself and the economy from inflation's harmful effects? And what happens if inflation expectations become unanchored?",
      decisions: [
        {
          id: 'r3-d1',
          title: 'Protecting Your Savings',
          scenario: "You have $10,000 in savings. Inflation is 5%. If you keep it in a savings account earning 1%, what happens to your purchasing power?",
          options: [
            {
              id: 'lose',
              label: 'You Lose 4% Purchasing Power',
              description: '1% interest - 5% inflation = -4% real return.',
              meterChanges: { purchasing: -4, stability: 5 },
              feedback: 'Correct! Your real return is negative. After a year, your $10,100 buys less than $10,000 did.',
              philInsight: 'Real interest rate = Nominal rate - Inflation. Negative real rates mean savers lose purchasing power. Inflation is a hidden tax on savings!',
            },
            {
              id: 'gain',
              label: 'You Gain 1%',
              description: 'You earned 1% interest, so you\'re ahead.',
              meterChanges: { purchasing: -8, stability: -5 },
              feedback: 'Nominally yes, but in real terms you lost! Your $10,100 buys less than $10,000 did before inflation.',
              philInsight: 'This is the money illusion! People focus on nominal gains and ignore inflation. Always think in REAL terms.',
            },
            {
              id: 'same',
              label: 'You Break Even',
              description: 'Interest and inflation roughly cancel out.',
              meterChanges: { purchasing: -4, stability: -3 },
              feedback: 'Not quite - 1% interest doesn\'t offset 5% inflation. You lost 4% in real terms.',
              philInsight: 'To break even, your interest rate must MATCH inflation. To gain, it must EXCEED inflation.',
            },
          ],
          conceptConnection: 'Real interest rate = Nominal rate - Inflation. Savers need returns above inflation to maintain purchasing power.',
        },
        {
          id: 'r3-d2',
          title: 'Inflation Expectations',
          scenario: "People expect 8% inflation next year. Workers demand 8% raises. Businesses plan 8% price increases. What happens?",
          options: [
            {
              id: 'self-fulfilling',
              label: 'Expectations Become Self-Fulfilling',
              description: 'If everyone expects 8%, we get 8%.',
              meterChanges: { inflation: 3, expectations: 3, stability: -15 },
              feedback: 'Exactly! Inflation expectations can become self-fulfilling prophecies. That\'s why central banks work hard to anchor them.',
              philInsight: 'This is the inflation expectations spiral! Workers demand raises → costs rise → prices rise → workers demand more raises. Hard to stop!',
            },
            {
              id: 'wrong',
              label: 'People Will Be Wrong',
              description: 'Actual inflation depends on real factors, not expectations.',
              meterChanges: { inflation: 2, expectations: 2, stability: -10 },
              feedback: 'Expectations DO affect actual inflation! When everyone acts on 8% expectations, 8% becomes reality.',
              philInsight: 'Expectations are a "real factor"! They influence wage negotiations, price setting, and investment decisions.',
            },
            {
              id: 'central-bank',
              label: 'The Central Bank Will Stop It',
              description: 'They\'ll raise rates to prevent high inflation.',
              meterChanges: { inflation: 1, expectations: 1, stability: -5 },
              feedback: 'They\'ll try! But once expectations are unanchored, it takes painful rate hikes to bring them back down.',
              philInsight: 'Central bank credibility is crucial! If people trust the 2% target, expectations stay anchored. If not, inflation can spiral.',
            },
          ],
          conceptConnection: 'Inflation expectations can be self-fulfilling. Anchored expectations are crucial for price stability.',
        },
      ],
      roundSummary: 'Inflation erodes purchasing power. Protect savings with real returns above inflation. Keep expectations anchored to prevent spirals.',
    },
  ],
  
  completionThresholds: {
    excellent: { inflation: { min: 1, max: 4 }, purchasing: { min: 90 }, stability: { min: 70 } },
    good: { inflation: { min: 0, max: 6 }, purchasing: { min: 80 }, stability: { min: 55 } },
    passing: { inflation: { max: 8 }, stability: { min: 45 } },
  },
  
  endings: {
    excellent: {
      title: 'Inflation Expert!',
      description: 'You\'ve mastered inflation! You understand its causes, effects, and how to protect against it while maintaining economic stability.',
      philMessage: 'Incredible! You understand that inflation is the silent thief of purchasing power. You know demand-pull from cost-push, real rates from nominal, and why expectations matter. Your wallet is safe!',
    },
    good: {
      title: 'Price Stability Pro',
      description: 'You have a solid understanding of inflation and its effects. You can make smart decisions to protect your purchasing power.',
      philMessage: 'Great work! You understand that 2% inflation is the target, real returns matter more than nominal, and expectations can be self-fulfilling. Keep that knowledge close!',
    },
    passing: {
      title: 'Inflation Aware',
      description: 'You understand the basics of inflation. With more practice, you\'ll develop stronger intuition for managing its effects.',
      philMessage: 'Good start! Remember: inflation = rising prices = falling purchasing power. Protect yourself by earning returns above inflation. You\'re on your way!',
    },
    needsWork: {
      title: 'Keep Learning!',
      description: 'Inflation is tricky. Review the causes, effects, and how to calculate real returns, then try again.',
      philMessage: 'Don\'t give up! The key insight: Real return = Nominal return - Inflation. If inflation is 5% and your savings earn 2%, you\'re losing 3% per year. Try again!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
