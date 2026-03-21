import { BossGameConfig, GameMeters } from '@/types/boss-game';

export const theLongGameBossGame: BossGameConfig = {
  id: 'the-long-game',
  moduleId: 'investing',
  title: 'The Long Game',
  subtitle: 'Investment Strategy Simulator',
  description: 'You are a young investor building wealth over 5 years. Markets will test your patience. Headlines will test your discipline. Your goal is not to get rich quick. Your goal is to stay invested long enough for time to work.',
  totalMonths: 5,
  initialMeters: {
    income: 50,           // Portfolio value (starts at 50%)
    hourlyValue: 40,      // Strategy adherence
    energy: 80,           // Emotional stability
    replaceability: 30,   // Panic level (lower is better)
    optionality: 50,      // Diversification level
  },
  months: [
    // YEAR 1
    {
      month: 1,
      title: 'Year One: The Beginning',
      openingNarration: `You start your investing journey with $5,000 saved from work. The market feels mysterious. Headlines are confusing. Friends give contradictory advice.

A message appears: "Every investor starts here. Few stay long enough to win."`,
      decisions: [
        {
          id: 'y1-allocation',
          category: 'money',
          title: 'Your First Investment',
          description: 'You have money to invest. How do you allocate it?',
          pandaDialogue: 'Everyone seems to have an opinion about what I should buy...',
          options: [
            {
              id: 'single-stock',
              label: 'All in on one hot stock',
              description: 'Your friend made 200% last year',
              meterChanges: { income: 20, optionality: -30, replaceability: 25 },
              storyResponse: 'The stock doubles in a month! You feel like a genius. But your entire future depends on one company now.',
            },
            {
              id: 'diversified-fund',
              label: 'Buy a diversified index fund',
              description: 'Owns hundreds of companies',
              meterChanges: { income: 5, optionality: 20, hourlyValue: 15 },
              storyResponse: 'Boring but effective. Your money is spread across the entire economy. One failure won\'t hurt much.',
              unlocks: ['diversified-start'],
            },
            {
              id: 'split-approach',
              label: 'Index fund core + small stock picks',
              description: 'Balance of stability and excitement',
              meterChanges: { income: 10, optionality: 10, hourlyValue: 10 },
              storyResponse: 'Most money in the fund, some for individual picks. A balanced approach many investors use.',
              unlocks: ['balanced-start'],
            },
          ],
        },
        {
          id: 'y1-strategy',
          category: 'skill',
          title: 'Setting Your Rules',
          description: 'Successful investors have rules. What will yours be?',
          options: [
            {
              id: 'no-rules',
              label: 'Go with your gut each time',
              description: 'Stay flexible and reactive',
              meterChanges: { hourlyValue: -10, replaceability: 15 },
              storyResponse: 'No rules means every decision starts from scratch. Emotions will be your guide.',
            },
            {
              id: 'monthly-auto',
              label: 'Invest the same amount every month',
              description: 'Automatic, no thinking required',
              meterChanges: { hourlyValue: 20, energy: 10, replaceability: -10 },
              storyResponse: 'You set up automatic investing. Discipline is now built into the system.',
              unlocks: ['auto-investor'],
            },
            {
              id: 'time-rules',
              label: 'Never sell before 5 years',
              description: 'Long-term commitment',
              meterChanges: { hourlyValue: 15, optionality: -5 },
              storyResponse: 'A simple rule that prevents panic selling. Your hands are tied in a good way.',
              unlocks: ['time-lock'],
            },
          ],
        },
        {
          id: 'y1-learning',
          category: 'skill',
          title: 'Building Knowledge',
          description: 'How will you learn about investing?',
          options: [
            {
              id: 'social-media',
              label: 'Follow investing influencers',
              description: 'Quick tips and hot takes',
              meterChanges: { replaceability: 20, hourlyValue: -5 },
              storyResponse: 'The tips are exciting but contradictory. You\'re getting information, but is it wisdom?',
            },
            {
              id: 'books-courses',
              label: 'Read books about long-term investing',
              description: 'Slow but solid foundation',
              meterChanges: { hourlyValue: 15, energy: -10, optionality: 5 },
              storyResponse: 'The books are dense but patterns emerge. You start to understand how wealth actually builds.',
              unlocks: ['knowledge-base'],
            },
            {
              id: 'learn-by-doing',
              label: 'Learn by making small investments',
              description: 'Real money teaches real lessons',
              meterChanges: { income: -5, hourlyValue: 10 },
              storyResponse: 'You make mistakes but they\'re small and educational. Experience is a teacher.',
              unlocks: ['experiential-learning'],
            },
          ],
        },
      ],
      closingNarration: 'Year 1 ends. You\'ve made your first moves. The game has begun.',
    },
    // YEAR 2
    {
      month: 2,
      title: 'Year Two: The First Test',
      openingNarration: 'Markets have been flat. Nothing exciting happened. Some friends stopped investing because "it\'s not working." Patience is already being tested.',
      decisions: [
        {
          id: 'y2-flat-market',
          category: 'work',
          title: 'The Boring Period',
          description: 'Your investments are up only 3% after a full year. Friends in crypto made 50%.',
          pandaDialogue: 'Maybe I\'m doing this wrong...',
          options: [
            {
              id: 'chase-returns',
              label: 'Switch to what\'s hot',
              description: 'Follow the winners',
              meterChanges: { income: 15, optionality: -20, replaceability: 25, hourlyValue: -15 },
              storyResponse: 'You catch the tail end of the trend. A small gain, then the crash. You\'re back where you started.',
            },
            {
              id: 'stay-course',
              label: 'Stay the course',
              description: 'Trust the process',
              meterChanges: { hourlyValue: 10, energy: 5 },
              storyResponse: 'Your friends\' hot investments crash 60% the next month. Your boring strategy looks smart now.',
              unlocks: ['patience-tested'],
            },
            {
              id: 'add-more',
              label: 'Double down on your strategy',
              description: 'Invest more while prices are low',
              meterChanges: { income: 10, hourlyValue: 15, energy: -5 },
              storyResponse: 'You bought when others lost interest. These shares will grow from a lower base.',
              unlocks: ['buy-the-boring'],
            },
          ],
        },
        {
          id: 'y2-headlines',
          category: 'negotiation',
          title: 'The Scary Headlines',
          description: 'News says a recession is coming. Experts predict market crash. Fear is everywhere.',
          options: [
            {
              id: 'sell-fear',
              label: 'Sell everything and wait',
              description: 'Preserve capital',
              meterChanges: { income: -15, replaceability: 30, hourlyValue: -20 },
              storyResponse: 'You sold. The recession never came. Markets went up 20% while you were in cash.',
            },
            {
              id: 'ignore-headlines',
              label: 'Ignore the noise',
              description: 'Headlines are entertainment',
              meterChanges: { hourlyValue: 15, energy: 10, replaceability: -10 },
              storyResponse: 'A year later, no one remembers those headlines. Your investments kept growing.',
              unlocks: ['headline-immune'],
            },
            {
              id: 'research-claim',
              label: 'Research the recession claim',
              description: 'Verify before reacting',
              meterChanges: { hourlyValue: 10, energy: -10 },
              storyResponse: 'You learned that recession predictions are often wrong. Critical thinking > headlines.',
              unlocks: ['research-habit'],
            },
          ],
        },
        {
          id: 'y2-rebalance',
          category: 'money',
          title: 'Portfolio Drift',
          description: 'One investment grew 50% while others stayed flat. Your allocation is now unbalanced.',
          options: [
            {
              id: 'let-ride',
              label: 'Let the winner ride',
              description: 'Winners keep winning',
              meterChanges: { income: 10, optionality: -15, replaceability: 10 },
              storyResponse: 'The winner becomes 60% of your portfolio. You\'re now concentrated again.',
            },
            {
              id: 'rebalance',
              label: 'Rebalance to original allocation',
              description: 'Sell some winners, buy laggards',
              meterChanges: { optionality: 15, hourlyValue: 10 },
              storyResponse: 'You sold high and bought low. This discipline protects against reversals.',
              unlocks: ['rebalancing-habit'],
            },
            {
              id: 'partial-rebalance',
              label: 'Trim the winner slightly',
              description: 'Take some off the table',
              meterChanges: { optionality: 10, income: 5 },
              storyResponse: 'A moderate approach. Some profits locked, some growth potential kept.',
            },
          ],
        },
      ],
      closingNarration: 'Year 2 ends. You\'ve survived boredom and fear. Many have quit. You\'re still here.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.replaceability > 60,
          event: 'Your constant checking and worrying is affecting your sleep. A friend asks if you\'re okay.',
        },
      ],
    },
    // YEAR 3
    {
      month: 3,
      title: 'Year Three: The Big Drop',
      openingNarration: 'This is the year that breaks most investors. Markets crash 35%. Headlines scream disaster. Social media is pure panic. Everything you\'ve built seems to be disappearing.',
      decisions: [
        {
          id: 'y3-crash',
          category: 'work',
          title: 'The 35% Drop',
          description: 'Your portfolio is down 35% from its peak. Every day brings more red. Friends are selling.',
          pandaDialogue: 'I can\'t watch this anymore. Maybe I should just sell and stop the pain.',
          options: [
            {
              id: 'panic-sell',
              label: 'Sell everything',
              description: 'Stop the bleeding',
              meterChanges: { income: -35, replaceability: 40, hourlyValue: -30, energy: -20 },
              storyResponse: 'You sold at the bottom. The market recovered 50% the next year. You missed all of it.',
            },
            {
              id: 'hold-dont-look',
              label: 'Hold and stop checking',
              description: 'What you don\'t see can\'t hurt you',
              meterChanges: { hourlyValue: 20, energy: 15, replaceability: -15 },
              storyResponse: 'You deleted the app for 3 months. When you came back, recovery had begun. Patience wins.',
              unlocks: ['survived-crash'],
            },
            {
              id: 'buy-crash',
              label: 'Invest more aggressively',
              description: 'Stocks are on sale',
              meterChanges: { income: 25, hourlyValue: 25, replaceability: -20, energy: -15 },
              storyResponse: 'Buying during a crash is emotionally brutal but mathematically brilliant. Future you will celebrate.',
              unlocks: ['bought-the-dip', 'crash-investor'],
            },
          ],
        },
        {
          id: 'y3-friends',
          category: 'negotiation',
          title: 'Social Pressure',
          description: 'A friend who sold says you\'re foolish for staying in. They\'re relieved to be in cash.',
          options: [
            {
              id: 'follow-friend',
              label: 'Maybe they\'re right...',
              description: 'Sell and join them in cash',
              meterChanges: { income: -20, replaceability: 20, hourlyValue: -15 },
              storyResponse: 'You sold because of social pressure. They never got back in. Neither did you.',
            },
            {
              id: 'politely-disagree',
              label: 'Smile and stay invested',
              description: 'They have their strategy, you have yours',
              meterChanges: { hourlyValue: 10, energy: 5 },
              storyResponse: 'A year later, they regret selling. You\'re up 40% from the bottom. Discipline > opinions.',
              unlocks: ['independent-thinker'],
            },
            {
              id: 'explain-strategy',
              label: 'Explain why you\'re staying',
              description: 'Share your reasoning',
              meterChanges: { hourlyValue: 5, energy: -10 },
              storyResponse: 'They didn\'t listen, but articulating your strategy strengthened your conviction.',
            },
          ],
        },
        {
          id: 'y3-opportunity',
          category: 'money',
          title: 'Crisis Opportunity',
          description: 'Quality companies are at multi-year lows. You have some extra cash.',
          options: [
            {
              id: 'keep-cash',
              label: 'Keep cash for safety',
              description: 'What if it drops more?',
              meterChanges: { energy: 5, optionality: 5 },
              storyResponse: 'Safe choice. But safe money doesn\'t grow. The opportunity passed.',
            },
            {
              id: 'invest-extra',
              label: 'Invest the extra cash',
              description: 'Great businesses at low prices',
              meterChanges: { income: 20, optionality: 10, energy: -10 },
              storyResponse: 'You bought when others couldn\'t stomach it. These purchases will look brilliant in 5 years.',
              unlocks: ['opportunistic-buyer'],
            },
            {
              id: 'dollar-cost-average',
              label: 'Invest a little each week',
              description: 'Spread it out in case of more drops',
              meterChanges: { income: 15, hourlyValue: 10 },
              storyResponse: 'Systematic buying during the crash. Not trying to time the bottom, just staying consistent.',
            },
          ],
        },
      ],
      closingNarration: 'Year 3 ends. The crash tested everything. Those who sold locked in losses. Those who stayed are positioned for recovery.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.income < 20,
          event: 'Your portfolio has fallen dramatically. But remember: you only lose money when you sell. The businesses you own still exist.',
        },
        {
          condition: (meters: GameMeters, unlocks: string[]) => unlocks.includes('crash-investor'),
          event: 'You bought during the crash. This is how generational wealth is built. Warren Buffett did the same thing.',
        },
      ],
    },
    // YEAR 4
    {
      month: 4,
      title: 'Year Four: The Recovery',
      openingNarration: 'Markets recovered faster than anyone expected. Your patience is being rewarded. Friends who sold are now asking if they should get back in.',
      decisions: [
        {
          id: 'y4-recovery',
          category: 'work',
          title: 'Back to New Highs',
          description: 'Your portfolio passed its previous peak. Some say the market is "too high" now.',
          options: [
            {
              id: 'sell-high',
              label: 'Sell and take profits',
              description: 'Lock in the gains',
              meterChanges: { income: -10, hourlyValue: -15, replaceability: 15 },
              storyResponse: 'You sold. Markets went up another 30%. Timing exits is as hard as timing entries.',
            },
            {
              id: 'stay-invested',
              label: 'Stay invested for the long term',
              description: 'New highs lead to newer highs',
              meterChanges: { income: 15, hourlyValue: 15 },
              storyResponse: 'You kept your shares. Over time, the market makes new highs regularly. That\'s the point.',
              unlocks: ['long-term-holder'],
            },
            {
              id: 'trim-slightly',
              label: 'Trim positions and rebalance',
              description: 'Take some gains, stay mostly invested',
              meterChanges: { income: 5, optionality: 10, hourlyValue: 10 },
              storyResponse: 'A little profit-taking, mostly staying the course. Balanced approach.',
            },
          ],
        },
        {
          id: 'y4-fomo-friends',
          category: 'negotiation',
          title: 'Friends Want Back In',
          description: 'Friends who sold during the crash are now asking for advice. They want to know if it\'s too late.',
          pandaDialogue: 'They sold at the bottom and now want back in at the top...',
          options: [
            {
              id: 'say-too-late',
              label: 'Tell them it\'s too late',
              description: 'They missed their chance',
              meterChanges: { energy: -5 },
              storyResponse: 'They felt worse. And it wasn\'t even true - long-term, time in market beats timing.',
            },
            {
              id: 'encourage-start',
              label: 'Encourage them to start now',
              description: 'The best time was then, second best is now',
              meterChanges: { energy: 5, hourlyValue: 5 },
              storyResponse: 'Some started investing again. The lesson learned will make them stronger investors.',
            },
            {
              id: 'share-lesson',
              label: 'Share what staying invested taught you',
              description: 'The crash was the teacher',
              meterChanges: { hourlyValue: 10, energy: 0 },
              storyResponse: 'You shared your experience. Some understood. Others will need to learn themselves.',
            },
          ],
        },
        {
          id: 'y4-complexity',
          category: 'skill',
          title: 'Strategy Evolution',
          description: 'You\'ve been investing for 4 years. Should you make your strategy more complex?',
          options: [
            {
              id: 'add-complexity',
              label: 'Add more strategies and assets',
              description: 'Sophistication = success',
              meterChanges: { hourlyValue: -10, energy: -15, optionality: 10 },
              storyResponse: 'More complexity, more decisions, more mistakes. Simple often beats sophisticated.',
            },
            {
              id: 'keep-simple',
              label: 'Keep your simple strategy',
              description: 'If it works, don\'t fix it',
              meterChanges: { hourlyValue: 15, energy: 10 },
              storyResponse: 'Simple investing, simple life. Your strategy works. Why change it?',
              unlocks: ['simplicity-master'],
            },
            {
              id: 'minor-tweaks',
              label: 'Small refinements only',
              description: 'Optimize without overcomplicating',
              meterChanges: { hourlyValue: 10, optionality: 5 },
              storyResponse: 'Minor improvements based on experience. Evolution, not revolution.',
            },
          ],
        },
      ],
      closingNarration: 'Year 4 ends. Recovery complete. Those who stayed invested are ahead. Those who panicked are trying to catch up.',
    },
    // YEAR 5
    {
      month: 5,
      title: 'Year Five: The Compound Effect',
      openingNarration: 'Five years of investing. Your portfolio has grown significantly, not from any single decision, but from thousands of small decisions to stay invested, stay consistent, and stay disciplined.',
      decisions: [
        {
          id: 'y5-reflection',
          category: 'skill',
          title: 'Five Year Review',
          description: 'Looking back at 5 years of investing. What matters most?',
          options: [
            {
              id: 'regret-choices',
              label: 'Focus on mistakes made',
              description: 'I could have done better',
              meterChanges: { energy: -15, hourlyValue: -5 },
              storyResponse: 'Dwelling on mistakes ignores the wins. You stayed invested through a crash. That\'s rare.',
            },
            {
              id: 'celebrate-discipline',
              label: 'Celebrate staying the course',
              description: 'The discipline was the win',
              meterChanges: { energy: 15, hourlyValue: 15, income: 10 },
              storyResponse: 'You did what most can\'t: nothing during chaos. That discipline created wealth.',
              unlocks: ['five-year-veteran'],
            },
            {
              id: 'analyze-learn',
              label: 'Analyze and document lessons',
              description: 'Turn experience into wisdom',
              meterChanges: { hourlyValue: 20, energy: 5 },
              storyResponse: 'You wrote down what worked. These lessons will guide the next 5 years.',
              unlocks: ['wisdom-documented'],
            },
          ],
        },
        {
          id: 'y5-next-phase',
          category: 'money',
          title: 'The Next Chapter',
          description: 'Five years complete. What now?',
          pandaDialogue: 'This is just the beginning, isn\'t it?',
          options: [
            {
              id: 'cash-out',
              label: 'Cash out and enjoy',
              description: 'Take the money and celebrate',
              meterChanges: { income: -20, hourlyValue: -20 },
              storyResponse: 'You stopped the compounding machine. What took 5 years to build will take longer to rebuild.',
            },
            {
              id: 'continue-growing',
              label: 'Continue for another 5 years',
              description: 'Let compounding accelerate',
              meterChanges: { income: 25, hourlyValue: 20, optionality: 15 },
              storyResponse: 'The next 5 years will likely grow more than the first 5. That\'s how compounding works.',
              unlocks: ['decade-investor'],
            },
            {
              id: 'increase-contributions',
              label: 'Increase regular contributions',
              description: 'Feed the machine more fuel',
              meterChanges: { income: 30, hourlyValue: 15, energy: -10 },
              storyResponse: 'More fuel for the compound engine. Your future self will thank you.',
              unlocks: ['accelerated-growth'],
            },
          ],
        },
        {
          id: 'y5-legacy',
          category: 'skill',
          title: 'Sharing Knowledge',
          description: 'Younger investors ask how you stayed calm during the crash.',
          options: [
            {
              id: 'keep-private',
              label: 'Keep your strategy private',
              description: 'This is your edge',
              meterChanges: { hourlyValue: 5 },
              storyResponse: 'Your strategy isn\'t really secret. It\'s just discipline. Everyone knows it; few do it.',
            },
            {
              id: 'mentor-others',
              label: 'Mentor newer investors',
              description: 'Share what you learned',
              meterChanges: { hourlyValue: 15, energy: 5, optionality: 10 },
              storyResponse: 'Teaching reinforces your own discipline. And maybe you\'ll help someone avoid panic selling.',
              unlocks: ['mentor'],
            },
            {
              id: 'write-it-down',
              label: 'Write an investing journal',
              description: 'Document for yourself and others',
              meterChanges: { hourlyValue: 20 },
              storyResponse: 'Your journal captures 5 years of real experience. This is more valuable than any book.',
              unlocks: ['author'],
            },
          ],
        },
      ],
      closingNarration: 'Five years complete. You survived boredom, panic, euphoria, and doubt. The market tested everything. You passed.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.hourlyValue > 80,
          event: 'Your discipline score is exceptional. You\'ve mastered the hardest part of investing: doing nothing when everything screams to act.',
        },
        {
          condition: (meters: GameMeters, unlocks: string[]) => unlocks.includes('crash-investor') && unlocks.includes('decade-investor'),
          event: 'You bought during the crash AND committed to another decade. This is exactly how wealth compounds across generations.',
        },
      ],
    },
  ],
  endings: [
    {
      id: 'compound-master',
      title: 'The Compound Master',
      description: 'You stayed invested through everything. Time and discipline did the heavy lifting.',
      trajectory: 'momentum',
      futureSnapshot: 'Twenty years later, your consistent investing created wealth that surprises everyone who watched you "do nothing" all those years. You never picked a winning stock. You just never stopped buying and never panic sold.',
      conditions: (meters: GameMeters, unlocks: string[]) => 
        meters.income >= 70 && meters.hourlyValue >= 70 && unlocks.includes('survived-crash'),
    },
    {
      id: 'disciplined-investor',
      title: 'The Disciplined Investor',
      description: 'You followed rules when others followed emotions. Your strategy held.',
      trajectory: 'growing',
      futureSnapshot: 'Your portfolio grows steadily. You rarely check it. Life happens while your money compounds in the background. The greatest luxury isn\'t what you buy - it\'s not having to worry.',
      conditions: (meters: GameMeters) => 
        meters.hourlyValue >= 60 && meters.replaceability <= 40,
    },
    {
      id: 'recovered-learner',
      title: 'The Recovered Learner',
      description: 'You made mistakes but learned from them. The education was expensive but valuable.',
      trajectory: 'balanced',
      futureSnapshot: 'Some early panic sales taught you lessons no book could. Now you understand why discipline matters. The next decade will be different because you lived through the hard lessons.',
      conditions: (meters: GameMeters) => 
        meters.income >= 40 && meters.income < 70,
    },
    {
      id: 'timing-trap',
      title: 'The Timing Trap',
      description: 'You tried to outsmart the market. The market won.',
      trajectory: 'stuck',
      futureSnapshot: 'Years of trying to time entries and exits left you behind simple buy-and-hold investors. The lesson is clear: time in market beats timing the market. Maybe next cycle you\'ll just stay invested.',
      conditions: (meters: GameMeters) => 
        meters.hourlyValue < 40 || meters.replaceability > 60,
    },
    {
      id: 'burned-out',
      title: 'The Burned Out Investor',
      description: 'The stress became too much. Investing became a burden instead of a tool.',
      trajectory: 'burnout',
      futureSnapshot: 'Constant checking, reacting, and worrying drained the joy from investing. You have money, but you\'re exhausted. Maybe a simpler, more automated approach would have been better.',
      conditions: (meters: GameMeters) => 
        meters.energy < 30,
    },
  ],
};
