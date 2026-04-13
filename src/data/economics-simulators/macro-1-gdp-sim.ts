/**
 * GDP & Economic Growth: Economy Builder
 * 
 * Unit 1 Macroeconomics - Students manage a small nation's economy
 * and learn how GDP is measured and what drives economic growth.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const macro1GdpSim: SimulatorConfig = {
  id: 'macro-1-gdp-sim',
  unitId: 'macro-1-gdp-growth',
  title: 'Economy Builder',
  subtitle: 'Grow Your Nation\'s GDP',
  description: 'Take charge of a small nation\'s economy. Make decisions that affect consumption, investment, government spending, and trade. Watch GDP grow (or shrink) based on your choices.',
  icon: '🏗️',
  theme: {
    primary: 'sky',
    secondary: 'blue',
    accent: 'indigo',
  },
  
  introNarrative: "Welcome, Economic Advisor! You're now in charge of Pandania, a small but growing nation. Your job is to guide economic policy to maximize GDP growth while maintaining stability. Remember: GDP = C + I + G + (X - M). Let's build prosperity!",
  philIntro: "GDP is like a report card for the whole economy! It measures the total value of everything produced. Today you'll learn what makes GDP grow and how to measure economic health. Let's make Pandania prosperous!",
  
  initialMeters: [
    { id: 'gdp', label: 'GDP (Billions)', value: 100, min: 50, max: 200, unit: 'B', color: 'green', icon: '📊' },
    { id: 'growth', label: 'GDP Growth Rate', value: 2, min: -5, max: 10, unit: '%', color: 'blue', icon: '📈' },
    { id: 'inflation', label: 'Inflation Rate', value: 2, min: 0, max: 10, unit: '%', color: 'amber', icon: '💹' },
    { id: 'confidence', label: 'Economic Confidence', value: 60, min: 0, max: 100, unit: '%', color: 'purple', icon: '🎯' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Understanding GDP',
      narrative: "Your first quarter as advisor! Let's understand what GDP measures and how different sectors contribute. GDP = Consumption + Investment + Government Spending + Net Exports.",
      decisions: [
        {
          id: 'r1-d1',
          title: 'Measuring the Economy',
          scenario: "The statistics office reports: Consumer spending is $60B, Business investment is $20B, Government spending is $15B, Exports are $10B, Imports are $5B. What's our GDP?",
          context: 'GDP = C + I + G + (X - M)',
          options: [
            {
              id: 'correct',
              label: '$100 Billion',
              description: '60 + 20 + 15 + (10 - 5) = 100',
              meterChanges: { confidence: 10 },
              feedback: 'Correct! You understand the GDP formula. Consumption is the largest component in most economies.',
              philInsight: 'You got it! GDP adds up all final goods and services. Notice that imports are SUBTRACTED because they\'re produced elsewhere.',
            },
            {
              id: 'wrong-add',
              label: '$110 Billion',
              description: '60 + 20 + 15 + 10 + 5 = 110',
              meterChanges: { confidence: -5 },
              feedback: 'Close, but imports should be subtracted, not added! They represent spending on foreign production.',
              philInsight: 'Remember: imports are spending that goes to OTHER countries\' GDP, not ours. Subtract them!',
            },
            {
              id: 'wrong-exclude',
              label: '$95 Billion',
              description: '60 + 20 + 15 = 95 (ignoring trade)',
              meterChanges: { confidence: -5 },
              feedback: 'You forgot net exports! Trade is part of GDP - exports add, imports subtract.',
              philInsight: 'Net exports (X - M) can be positive or negative. It\'s the trade balance component of GDP.',
            },
          ],
          conceptConnection: 'GDP = C + I + G + (X - M). It measures the total market value of all final goods and services produced in a country.',
        },
        {
          id: 'r1-d2',
          title: 'Real vs. Nominal GDP',
          scenario: "Last year GDP was $100B. This year it's $105B. But prices rose 3%. Did the economy really grow by 5%?",
          options: [
            {
              id: 'real',
              label: 'Real Growth is About 2%',
              description: 'Adjust for inflation: 5% nominal - 3% inflation ≈ 2% real',
              meterChanges: { growth: 0, confidence: 10 },
              feedback: 'Exactly! Real GDP strips out inflation to show actual production growth.',
              philInsight: 'Real GDP is what matters! Nominal GDP can rise just from higher prices. Real GDP measures actual stuff produced.',
            },
            {
              id: 'nominal',
              label: 'Yes, We Grew 5%',
              description: 'The numbers don\'t lie - $105B > $100B.',
              meterChanges: { confidence: -5, inflation: 1 },
              feedback: 'That\'s nominal growth, but some of it is just inflation. Real growth is lower.',
              philInsight: 'Nominal GDP includes price increases. If prices doubled but production stayed the same, nominal GDP would double but real GDP wouldn\'t change!',
            },
            {
              id: 'deflate',
              label: 'We Actually Shrank',
              description: 'Inflation ate all the growth.',
              meterChanges: { confidence: -5 },
              feedback: 'Not quite - 5% nominal minus 3% inflation still leaves about 2% real growth.',
              philInsight: 'Inflation reduces real growth but doesn\'t eliminate it unless inflation exceeds nominal growth.',
            },
          ],
          conceptConnection: 'Real GDP adjusts for inflation to measure actual production growth. Nominal GDP can be misleading.',
        },
      ],
      roundSummary: 'GDP measures total production. Real GDP (adjusted for inflation) is the true measure of economic growth. Now let\'s see what drives growth!',
    },
    {
      roundNumber: 2,
      title: 'Drivers of Growth',
      narrative: "Now that you understand GDP, let's explore what makes it grow. Investment in capital, human capital, technology, and institutions all play a role.",
      decisions: [
        {
          id: 'r2-d1',
          title: 'Investment Priority',
          scenario: "You have $5B to invest in long-term growth. Where do you allocate it?",
          options: [
            {
              id: 'education',
              label: 'Education & Training',
              description: 'Invest in human capital - skills and knowledge.',
              meterChanges: { gdp: 3, growth: 1, confidence: 10 },
              feedback: 'Smart! Human capital is a key driver of productivity and long-term growth.',
              philInsight: 'Human capital - the skills and knowledge of workers - is crucial for growth. Educated workers are more productive!',
            },
            {
              id: 'infrastructure',
              label: 'Infrastructure',
              description: 'Build roads, bridges, and broadband networks.',
              meterChanges: { gdp: 5, growth: 0.5, confidence: 5 },
              feedback: 'Infrastructure boosts productivity by reducing transportation and communication costs.',
              philInsight: 'Physical capital like infrastructure enables economic activity. It\'s the foundation for growth!',
            },
            {
              id: 'research',
              label: 'Research & Development',
              description: 'Fund innovation and new technologies.',
              meterChanges: { gdp: 2, growth: 1.5, confidence: 8 },
              feedback: 'R&D drives technological progress - the ultimate engine of long-term growth!',
              philInsight: 'Technology is the magic ingredient! It lets us produce more with the same inputs. That\'s productivity growth!',
            },
          ],
          conceptConnection: 'Long-term growth comes from investment in physical capital, human capital, and technology.',
        },
        {
          id: 'r2-d2',
          title: 'The Business Cycle',
          scenario: "Economic indicators are mixed. Consumer confidence is falling, but unemployment is still low. Are we heading into a recession?",
          options: [
            {
              id: 'prepare',
              label: 'Prepare for Downturn',
              description: 'Build reserves and plan stimulus measures.',
              meterChanges: { gdp: -1, confidence: 5 },
              feedback: 'Prudent! Recessions are normal parts of the business cycle. Preparation helps.',
              philInsight: 'The business cycle has four phases: expansion, peak, contraction (recession), and trough. Being prepared for each is wise!',
            },
            {
              id: 'stimulate',
              label: 'Stimulate Now',
              description: 'Boost spending before the downturn hits.',
              meterChanges: { gdp: 3, growth: 1, inflation: 1, confidence: -5 },
              feedback: 'Aggressive! You might prevent a recession, but risk overheating if the downturn doesn\'t come.',
              philInsight: 'Counter-cyclical policy means spending more in bad times, less in good times. But timing is tricky!',
            },
            {
              id: 'wait',
              label: 'Wait and See',
              description: 'Don\'t overreact to mixed signals.',
              meterChanges: { confidence: -10 },
              feedback: 'The economy did slow down. Your inaction made the downturn worse.',
              philInsight: 'Economic indicators are leading (predict future), coincident (show present), or lagging (confirm past). Watch the leading ones!',
            },
          ],
          conceptConnection: 'The business cycle consists of expansions and contractions. Policy can smooth these fluctuations.',
        },
      ],
      roundSummary: 'Growth comes from investment in capital, human capital, and technology. The business cycle creates ups and downs, but smart policy can help smooth them.',
    },
    {
      roundNumber: 3,
      title: 'GDP & Living Standards',
      narrative: "Final challenge: GDP is important, but is it everything? Let's explore what GDP measures well and what it misses.",
      decisions: [
        {
          id: 'r3-d1',
          title: 'GDP Per Capita',
          scenario: "Pandania's GDP grew 4%, but population grew 3%. How much did living standards improve?",
          options: [
            {
              id: 'per-capita',
              label: 'About 1% Improvement',
              description: 'GDP per capita growth = GDP growth - population growth.',
              meterChanges: { growth: 1, confidence: 10 },
              feedback: 'Correct! GDP per capita is a better measure of living standards than total GDP.',
              philInsight: 'A country can have high GDP but low living standards if the population is huge. Per capita is what matters for individuals!',
            },
            {
              id: 'total',
              label: '4% Improvement',
              description: 'GDP grew 4%, so we\'re 4% better off.',
              meterChanges: { confidence: -5 },
              feedback: 'Total GDP grew 4%, but with 3% more people, each person only got about 1% more.',
              philInsight: 'If GDP doubles but population triples, people are actually WORSE off on average!',
            },
            {
              id: 'none',
              label: 'No Improvement',
              description: 'Population growth ate all the gains.',
              meterChanges: { confidence: -5 },
              feedback: 'Not quite - GDP grew faster than population, so per capita income did rise.',
              philInsight: 'GDP per capita rises when GDP grows faster than population. It fell in this case, but not to zero.',
            },
          ],
          conceptConnection: 'GDP per capita (GDP ÷ population) better measures average living standards than total GDP.',
        },
        {
          id: 'r3-d2',
          title: 'Beyond GDP',
          scenario: "Critics say GDP misses important things: leisure time, environmental quality, inequality, and unpaid work. Should we use a different measure?",
          options: [
            {
              id: 'supplement',
              label: 'Supplement GDP with Other Measures',
              description: 'Use GDP plus HDI, Gini coefficient, environmental indicators.',
              meterChanges: { gdp: 0, confidence: 15 },
              feedback: 'Balanced approach! GDP is useful but incomplete. Multiple measures give a fuller picture.',
              philInsight: 'The Human Development Index (HDI) adds health and education. The Gini coefficient measures inequality. Use them together!',
            },
            {
              id: 'replace',
              label: 'Replace GDP Entirely',
              description: 'Switch to a happiness or well-being index.',
              meterChanges: { confidence: 5 },
              feedback: 'Interesting idea, but hard to measure. GDP is imperfect but practical.',
              philInsight: 'Bhutan uses "Gross National Happiness"! But subjective measures are hard to compare across countries and time.',
            },
            {
              id: 'keep',
              label: 'GDP is Fine',
              description: 'It measures what it measures. Don\'t overcomplicate.',
              meterChanges: { confidence: -5 },
              feedback: 'GDP is useful, but ignoring its limitations leads to bad policy.',
              philInsight: 'GDP doesn\'t count unpaid work, environmental damage, or leisure. A country could have high GDP but miserable people!',
            },
          ],
          conceptConnection: 'GDP measures market production but misses leisure, environment, inequality, and non-market activities.',
        },
      ],
      roundSummary: 'GDP per capita matters more than total GDP for living standards. But GDP has limitations - supplement it with other measures for a complete picture.',
    },
  ],
  
  completionThresholds: {
    excellent: { gdp: { min: 115 }, growth: { min: 3 }, confidence: { min: 70 } },
    good: { gdp: { min: 105 }, growth: { min: 2 }, confidence: { min: 55 } },
    passing: { gdp: { min: 95 }, confidence: { min: 45 } },
  },
  
  endings: {
    excellent: {
      title: 'Master Economist!',
      description: 'Pandania thrives under your guidance! You understand GDP, its components, and its limitations. You\'ve built a foundation for sustainable growth.',
      philMessage: 'Incredible! You\'ve mastered GDP - what it measures, what drives it, and what it misses. You know that real GDP per capita is the key metric, and that growth comes from investment in capital, people, and technology. Pandania is lucky to have you!',
    },
    good: {
      title: 'Capable Advisor',
      description: 'Pandania is growing steadily. You understand the basics of GDP and economic growth, and make sound policy decisions.',
      philMessage: 'Great work! You\'ve got a solid grasp of GDP. Remember: GDP = C + I + G + (X-M), real GDP adjusts for inflation, and per capita is what matters for living standards. Keep building!',
    },
    passing: {
      title: 'Learning Leader',
      description: 'Pandania is stable, if not booming. You\'re learning the complexities of economic management.',
      philMessage: 'Good start! GDP can be confusing, but you\'re getting there. The key insight: GDP measures production, but growth comes from investing in the future. Keep studying!',
    },
    needsWork: {
      title: 'Keep Growing!',
      description: 'Economic management is challenging. Review the GDP formula and the drivers of growth, then try again.',
      philMessage: 'Don\'t give up! Remember: GDP = Consumption + Investment + Government + Net Exports. Real GDP adjusts for inflation. Growth comes from capital, human capital, and technology. You\'ve got this!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
