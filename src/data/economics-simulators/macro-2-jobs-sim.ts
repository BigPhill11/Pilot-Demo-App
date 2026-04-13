/**
 * Unemployment: Job Market Simulator
 * 
 * Unit 2 Macroeconomics - Students manage labor market policies
 * and learn about different types of unemployment and their causes.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const macro2JobsSim: SimulatorConfig = {
  id: 'macro-2-jobs-sim',
  unitId: 'macro-2-unemployment',
  title: 'Job Market Simulator',
  subtitle: 'Tackle Unemployment',
  description: 'As Labor Secretary, you\'ll face different types of unemployment: frictional, structural, and cyclical. Each requires different solutions. Can you get people back to work?',
  icon: '💼',
  theme: {
    primary: 'orange',
    secondary: 'amber',
    accent: 'yellow',
  },
  
  introNarrative: "Congratulations, Labor Secretary! Pandania's unemployment rate is 7%, and the public wants action. But not all unemployment is the same - some is natural and even healthy, while some signals serious problems. Your job: understand the causes and apply the right solutions.",
  philIntro: "Unemployment seems simple - people without jobs, right? But economists see THREE types: frictional (job searching), structural (skills mismatch), and cyclical (recession-caused). Each needs different medicine! Let's diagnose and treat!",
  
  initialMeters: [
    { id: 'unemployment', label: 'Unemployment Rate', value: 7, min: 0, max: 15, unit: '%', color: 'red', icon: '📉' },
    { id: 'laborForce', label: 'Labor Force Participation', value: 65, min: 50, max: 80, unit: '%', color: 'blue', icon: '👷' },
    { id: 'jobMatching', label: 'Job Matching Efficiency', value: 50, min: 0, max: 100, unit: '%', color: 'green', icon: '🎯' },
    { id: 'workerWelfare', label: 'Worker Welfare', value: 60, min: 0, max: 100, unit: '%', color: 'purple', icon: '❤️' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Measuring Unemployment',
      narrative: "First, let's understand how unemployment is measured and what the numbers really mean. Not everyone without a job is 'unemployed' in the economic sense.",
      decisions: [
        {
          id: 'r1-d1',
          title: 'Who Counts as Unemployed?',
          scenario: "Three people: (A) Lost job, actively searching. (B) Lost job, gave up looking. (C) Stay-at-home parent, not looking. Who is officially 'unemployed'?",
          context: 'Unemployed = without a job AND actively looking for work.',
          options: [
            {
              id: 'correct',
              label: 'Only Person A',
              description: 'Must be jobless AND actively searching.',
              meterChanges: { jobMatching: 5 },
              feedback: 'Correct! Person B is a "discouraged worker" (not in labor force), and C is simply not in the labor force.',
              philInsight: 'The official unemployment rate only counts active job seekers. Discouraged workers who gave up aren\'t counted - that\'s a limitation!',
            },
            {
              id: 'all',
              label: 'All Three',
              description: 'Anyone without a job is unemployed.',
              meterChanges: { jobMatching: -5 },
              feedback: 'Not quite! Only those actively looking count. Retirees, students, and stay-at-home parents aren\'t "unemployed."',
              philInsight: 'The labor force = employed + unemployed. People not looking for work aren\'t in the labor force at all.',
            },
            {
              id: 'ab',
              label: 'A and B',
              description: 'Both lost their jobs.',
              meterChanges: { jobMatching: -3 },
              feedback: 'Close! But B stopped looking, so they\'re a "discouraged worker" - not counted in unemployment.',
              philInsight: 'Discouraged workers are a hidden form of unemployment. The official rate can understate the true problem.',
            },
          ],
          conceptConnection: 'Unemployment rate = (Unemployed ÷ Labor Force) × 100. Only active job seekers count as unemployed.',
        },
        {
          id: 'r1-d2',
          title: 'The Natural Rate',
          scenario: "Economists say some unemployment is 'natural' - even in a healthy economy. What's the natural rate, and why does it exist?",
          options: [
            {
              id: 'natural',
              label: '4-5% is Natural',
              description: 'Frictional and structural unemployment always exist.',
              meterChanges: { unemployment: -0.5, workerWelfare: 5 },
              feedback: 'Correct! Even in a booming economy, people change jobs (frictional) and skills mismatch exists (structural).',
              philInsight: 'The natural rate of unemployment is the level when the economy is at full employment. It\'s NOT zero because job searching takes time!',
            },
            {
              id: 'zero',
              label: '0% is the Goal',
              description: 'Everyone who wants a job should have one.',
              meterChanges: { workerWelfare: -5 },
              feedback: 'Zero unemployment is impossible and undesirable! Some job searching is healthy for matching workers to jobs.',
              philInsight: 'If unemployment were 0%, workers couldn\'t search for better jobs and employers couldn\'t find workers. Some friction is good!',
            },
            {
              id: 'high',
              label: '10% is Acceptable',
              description: 'High unemployment keeps wages down.',
              meterChanges: { workerWelfare: -15, laborForce: -5 },
              feedback: 'That\'s way above natural! High unemployment means wasted human potential and suffering.',
              philInsight: 'Unemployment above the natural rate means the economy isn\'t reaching its potential. That\'s a problem to solve!',
            },
          ],
          conceptConnection: 'The natural rate of unemployment (4-5%) includes frictional and structural unemployment. Cyclical unemployment is the problem.',
        },
      ],
      roundSummary: 'Unemployment is measured as the percentage of the labor force actively seeking work. Some unemployment (4-5%) is natural; above that signals problems.',
    },
    {
      roundNumber: 2,
      title: 'Types of Unemployment',
      narrative: "Now let's diagnose the different types of unemployment in Pandania and apply the right treatments. Each type has different causes and solutions.",
      decisions: [
        {
          id: 'r2-d1',
          title: 'Frictional Unemployment',
          scenario: "Recent college graduates are taking 3-6 months to find jobs. They have skills, jobs exist, but matching takes time. How do you help?",
          options: [
            {
              id: 'matching',
              label: 'Improve Job Matching',
              description: 'Fund job boards, career services, and networking events.',
              meterChanges: { unemployment: -0.5, jobMatching: 15, workerWelfare: 5 },
              feedback: 'Perfect! Reducing search time helps workers find jobs faster without distorting the market.',
              philInsight: 'Frictional unemployment is about information and search. Better matching technology (like LinkedIn!) reduces it.',
            },
            {
              id: 'benefits',
              label: 'Extend Unemployment Benefits',
              description: 'Give graduates more time to find the right job.',
              meterChanges: { unemployment: 0.3, workerWelfare: 10 },
              feedback: 'Generous, but longer benefits can extend job searches. Trade-off between security and speed.',
              philInsight: 'Unemployment insurance is important but can increase frictional unemployment by reducing urgency to accept jobs.',
            },
            {
              id: 'mandate',
              label: 'Mandate Hiring Quotas',
              description: 'Require companies to hire a percentage of new graduates.',
              meterChanges: { unemployment: -1, jobMatching: -10, workerWelfare: -5 },
              feedback: 'Unemployment drops, but forced matches are often bad matches. Productivity suffers.',
              philInsight: 'Mandates can reduce unemployment numbers but create inefficient matches. The market usually matches better!',
            },
          ],
          conceptConnection: 'Frictional unemployment occurs during job transitions. It\'s reduced by better information and matching, not by force.',
        },
        {
          id: 'r2-d2',
          title: 'Structural Unemployment',
          scenario: "A major factory closed. 5,000 workers have manufacturing skills, but new jobs require tech skills. They can't just 'find a job' - their skills don't match.",
          options: [
            {
              id: 'retrain',
              label: 'Fund Retraining Programs',
              description: 'Help workers learn new skills for growing industries.',
              meterChanges: { unemployment: -1, jobMatching: 10, workerWelfare: 10 },
              feedback: 'Excellent! Retraining addresses the root cause of structural unemployment: skills mismatch.',
              philInsight: 'Structural unemployment requires structural solutions. You can\'t just stimulate demand - you need to change supply (worker skills)!',
            },
            {
              id: 'relocate',
              label: 'Relocation Assistance',
              description: 'Help workers move to where manufacturing jobs exist.',
              meterChanges: { unemployment: -0.5, laborForce: -3, workerWelfare: 5 },
              feedback: 'Some workers find jobs elsewhere, but many can\'t or won\'t move. Partial solution.',
              philInsight: 'Geographic mismatch is part of structural unemployment. Mobility helps, but retraining is often better.',
            },
            {
              id: 'subsidize',
              label: 'Subsidize the Factory',
              description: 'Pay to keep the factory open and jobs intact.',
              meterChanges: { unemployment: -2, jobMatching: -5, workerWelfare: 5 },
              feedback: 'Jobs saved for now, but you\'re fighting market forces. When subsidies end, the problem returns.',
              philInsight: 'Subsidizing dying industries delays structural adjustment. Sometimes it\'s better to help workers adapt than to preserve old jobs.',
            },
          ],
          conceptConnection: 'Structural unemployment comes from skills or geographic mismatch. Retraining and education are the solutions.',
        },
      ],
      roundSummary: 'Frictional unemployment needs better matching. Structural unemployment needs retraining. Each type requires different policy tools.',
    },
    {
      roundNumber: 3,
      title: 'Cyclical Unemployment',
      narrative: "A recession has hit! GDP is falling and businesses are laying off workers. This is cyclical unemployment - caused by the business cycle downturn. What's your response?",
      decisions: [
        {
          id: 'r3-d1',
          title: 'Fighting the Recession',
          scenario: "Unemployment has jumped from 5% to 9%. Businesses aren't hiring because demand is low. Demand is low because people are unemployed. It's a vicious cycle!",
          options: [
            {
              id: 'stimulus',
              label: 'Fiscal Stimulus',
              description: 'Government spending to boost demand and create jobs.',
              meterChanges: { unemployment: -2, workerWelfare: 15 },
              feedback: 'Keynesian economics in action! Government spending fills the demand gap and breaks the cycle.',
              philInsight: 'Cyclical unemployment responds to demand-side policies. When private spending falls, government can step in!',
            },
            {
              id: 'wait',
              label: 'Let Markets Adjust',
              description: 'Wages will fall, making hiring attractive again.',
              meterChanges: { unemployment: -0.5, workerWelfare: -10 },
              feedback: 'Eventually markets adjust, but it takes years and causes tremendous suffering.',
              philInsight: 'Classical economists said wages would adjust. Keynes showed this takes too long - "in the long run, we\'re all dead!"',
            },
            {
              id: 'retrain',
              label: 'Focus on Retraining',
              description: 'Use the downturn to upgrade worker skills.',
              meterChanges: { unemployment: -0.5, jobMatching: 10, workerWelfare: 5 },
              feedback: 'Retraining helps with structural unemployment, but cyclical unemployment needs demand stimulus.',
              philInsight: 'Wrong medicine! Cyclical unemployment isn\'t about skills - it\'s about insufficient demand. Retraining doesn\'t create jobs.',
            },
          ],
          conceptConnection: 'Cyclical unemployment is caused by recessions and requires demand-side stimulus (fiscal or monetary policy).',
        },
        {
          id: 'r3-d2',
          title: 'The Costs of Unemployment',
          scenario: "Critics say 'unemployment benefits are too generous - people should just get jobs.' How do you respond?",
          options: [
            {
              id: 'costs',
              label: 'Highlight the True Costs',
              description: 'Unemployment causes lost output, skill erosion, and human suffering.',
              meterChanges: { workerWelfare: 10 },
              feedback: 'Important perspective! Unemployment isn\'t just about lazy people - it has real economic and human costs.',
              philInsight: 'Unemployment costs include: lost GDP, skill atrophy, health problems, family stress, and social unrest. It\'s not just about money!',
            },
            {
              id: 'cut',
              label: 'Cut Benefits to Motivate',
              description: 'Make unemployment uncomfortable to encourage job seeking.',
              meterChanges: { unemployment: -0.5, workerWelfare: -15 },
              feedback: 'Some people find jobs faster, but many suffer needlessly. Benefits also stabilize consumer spending.',
              philInsight: 'Unemployment insurance is an "automatic stabilizer" - it maintains spending during recessions. Cutting it can make recessions worse!',
            },
            {
              id: 'extend',
              label: 'Extend Benefits During Recession',
              description: 'Longer benefits when jobs are scarce.',
              meterChanges: { unemployment: 0.5, workerWelfare: 15 },
              feedback: 'Humane policy! When jobs don\'t exist, punishing the unemployed doesn\'t help.',
              philInsight: 'During recessions, there literally aren\'t enough jobs. Extended benefits help families survive until recovery.',
            },
          ],
          conceptConnection: 'Unemployment has economic costs (lost output) and human costs (suffering). Policy should address both.',
        },
      ],
      roundSummary: 'Cyclical unemployment requires demand stimulus. Unemployment has real costs - economic and human. Good policy balances incentives with compassion.',
    },
  ],
  
  completionThresholds: {
    excellent: { unemployment: { max: 5 }, jobMatching: { min: 70 }, workerWelfare: { min: 70 } },
    good: { unemployment: { max: 6 }, jobMatching: { min: 55 }, workerWelfare: { min: 55 } },
    passing: { unemployment: { max: 7 }, workerWelfare: { min: 45 } },
  },
  
  endings: {
    excellent: {
      title: 'Labor Market Champion!',
      description: 'Pandania\'s job market is thriving! You understood the different types of unemployment and applied the right solutions to each.',
      philMessage: 'Amazing work! You\'ve mastered the three types of unemployment: frictional (job searching), structural (skills mismatch), and cyclical (recession). Each needs different medicine, and you prescribed correctly!',
    },
    good: {
      title: 'Effective Labor Secretary',
      description: 'Unemployment is under control and workers are finding good matches. You\'ve made solid policy choices.',
      philMessage: 'Great job! You understand that not all unemployment is the same. Matching helps frictional, retraining helps structural, and stimulus helps cyclical. Keep up the good work!',
    },
    passing: {
      title: 'Learning the Ropes',
      description: 'The job market is stable, but there\'s room for improvement. You\'re developing your understanding of labor economics.',
      philMessage: 'Good start! Remember: some unemployment is natural (4-5%). Above that, diagnose the type and apply the right treatment. You\'re getting there!',
    },
    needsWork: {
      title: 'Keep Working!',
      description: 'Labor markets are complex. Review the types of unemployment and their solutions, then try again.',
      philMessage: 'Don\'t give up! The key is matching the solution to the problem: better information for frictional, retraining for structural, stimulus for cyclical. Try again!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
