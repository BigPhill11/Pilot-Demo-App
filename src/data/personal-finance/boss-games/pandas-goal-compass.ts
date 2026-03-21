import { BossGameConfig, GameMeters } from '@/types/boss-game';

export const pandasGoalCompassGame: BossGameConfig = {
  id: 'pandas-goal-compass',
  moduleId: 'financial-planning',
  title: "Panda's Goal Compass",
  subtitle: 'Direction Before Speed',
  description: 'You are a young panda who just received a windfall. Without direction, money flows toward comfort. With a compass, every choice becomes clearer.',
  totalMonths: 5,
  initialMeters: {
    income: 50,          // Alignment score
    hourlyValue: 30,     // Clarity level
    energy: 70,          // Mental energy
    replaceability: 50,  // Distraction level (lower is better)
    optionality: 30,     // Progress toward goals
  },
  months: [
    // MONTH 1 - Setting Direction
    {
      month: 1,
      title: 'The Windfall',
      openingNarration: `A distant relative leaves you 10,000 bamboo coins. It arrives without instructions.

Your friends have suggestions. Social media shows what others bought. Your wants list grows by the hour.

A wise old panda appears: "Before you spend a single coin, ask: what is this money FOR?"`,
      decisions: [
        {
          id: 'm1-direction',
          category: 'skill',
          title: 'Choose Your North Star',
          description: 'The compass requires a destination. What do you truly want this money to create?',
          pandaDialogue: 'So many options... how do I even choose?',
          options: [
            {
              id: 'goal-freedom',
              label: 'Financial Freedom',
              description: 'Build toward never needing to worry about money',
              meterChanges: { income: 20, hourlyValue: 25, energy: 5, replaceability: -15 },
              storyResponse: 'The compass locks onto Freedom. Every future choice will ask: "Does this bring independence closer?" Clarity washes over you.',
              unlocks: ['freedom-path'],
            },
            {
              id: 'goal-experience',
              label: 'A Dream Experience',
              description: 'Fund an adventure or milestone you\'ve always wanted',
              meterChanges: { income: 15, hourlyValue: 20, energy: 10, replaceability: -10 },
              storyResponse: 'The compass points toward Experience. The path is shorter but vivid. You can almost taste the adventure already.',
              unlocks: ['experience-path'],
            },
            {
              id: 'goal-security',
              label: 'Unshakeable Security',
              description: 'Create a safety net that removes fear',
              meterChanges: { income: 20, hourlyValue: 20, energy: 0, replaceability: -15 },
              storyResponse: 'The compass settles on Security. Peace of mind becomes your metric. The anxiety in your chest begins to fade.',
              unlocks: ['security-path'],
            },
          ],
        },
        {
          id: 'm1-constraint',
          category: 'money',
          title: 'Lock a Constraint',
          description: 'To strengthen your compass, you must close one door permanently. What limit will you set?',
          options: [
            {
              id: 'no-debt-spending',
              label: 'No spending that creates debt',
              description: 'Anything purchased must be with money you have',
              meterChanges: { income: 10, hourlyValue: 15, replaceability: -20 },
              storyResponse: 'Constraint locked. Future temptations that require borrowing disappear automatically. Your decision load drops.',
              unlocks: ['no-debt-rule'],
            },
            {
              id: 'goal-first',
              label: 'Goal funding happens first, not last',
              description: '30% goes to your goal before anything else',
              meterChanges: { income: 15, hourlyValue: 10, optionality: 20 },
              storyResponse: 'Constraint locked. Leftover money no longer determines progress. Your goal gets fed first, every time.',
              unlocks: ['auto-fund-rule'],
            },
            {
              id: 'pause-rule',
              label: '48-hour pause on any purchase over 500 coins',
              description: 'Impulse prevention',
              meterChanges: { hourlyValue: 20, energy: 10, replaceability: -15 },
              storyResponse: 'Constraint locked. The pause gives your compass time to speak. Most impulses fade within hours.',
              unlocks: ['pause-rule'],
            },
          ],
        },
        {
          id: 'm1-first-test',
          category: 'money',
          title: 'The First Test',
          description: 'A friend calls with an "amazing opportunity" - invest 2,000 coins now for guaranteed returns.',
          pandaDialogue: 'They sound so confident... but my compass is quiet.',
          options: [
            {
              id: 'invest-impulse',
              label: 'Jump on the opportunity',
              description: 'Don\'t miss out',
              meterChanges: { income: -20, hourlyValue: -10, optionality: -15, replaceability: 10 },
              storyResponse: 'The money vanishes. Three weeks later, so does the "opportunity." Your compass was silent because this didn\'t serve your goal.',
            },
            {
              id: 'check-compass',
              label: 'Check: does this align with my goal?',
              description: 'Consult your direction',
              meterChanges: { income: 10, hourlyValue: 10, energy: 5 },
              storyResponse: 'The compass says no. You decline politely. Your friend is disappointed. Your goal is protected.',
              unlocks: ['compass-trusted'],
            },
            {
              id: 'research-first',
              label: 'Ask for details and time to think',
              description: 'Gather information',
              meterChanges: { hourlyValue: 5, energy: -5, replaceability: -5 },
              storyResponse: 'The pressure increases. "It\'s now or never!" Red flag confirmed. You decline.',
            },
          ],
        },
      ],
      closingNarration: 'Week 1 ends. Your compass is calibrated. The first test is passed. But the real challenges haven\'t arrived yet.',
    },
    // MONTH 2 - Time Horizons
    {
      month: 2,
      title: 'The Timeline Question',
      openingNarration: 'Your goal is set. But when does it need to happen? A friend wants you to join a trip next month. Your goal requires patience. The conflict begins.',
      decisions: [
        {
          id: 'm2-timeline',
          category: 'skill',
          title: 'Assign Your Horizon',
          description: 'When does your goal actually need to be achieved? Not want—need.',
          options: [
            {
              id: 'short-term',
              label: '6 months - make it happen fast',
              description: 'Aggressive timeline',
              meterChanges: { hourlyValue: 10, energy: -20, optionality: 20 },
              storyResponse: 'Short horizon set. This means saying no to almost everything else. The pressure is intense but clarifying.',
              unlocks: ['short-horizon'],
            },
            {
              id: 'medium-term',
              label: '2 years - steady progress',
              description: 'Balanced timeline',
              meterChanges: { hourlyValue: 15, energy: 5, optionality: 15 },
              storyResponse: 'Medium horizon set. Room to breathe, room to grow. Each month contributes without desperation.',
              unlocks: ['medium-horizon'],
            },
            {
              id: 'long-term',
              label: '5+ years - compound growth',
              description: 'Patient timeline',
              meterChanges: { hourlyValue: 20, energy: 10, optionality: 10 },
              storyResponse: 'Long horizon set. Time becomes your ally. Small consistent actions compound into something powerful.',
              unlocks: ['long-horizon'],
            },
          ],
        },
        {
          id: 'm2-conflict',
          category: 'money',
          title: 'The Trip Invitation',
          description: 'Your friend\'s trip costs 3,000 coins. It conflicts with your goal timeline.',
          pandaDialogue: 'But everyone else is going...',
          options: [
            {
              id: 'take-trip',
              label: 'Take the trip - life is short',
              description: 'Experience now, goal later',
              meterChanges: { income: -15, energy: 10, optionality: -20, replaceability: 15 },
              storyResponse: 'Amazing memories. Empty savings. Your goal timeline extends by 8 months. Was it worth it? Maybe.',
            },
            {
              id: 'decline-focus',
              label: 'Decline - stay focused on your goal',
              description: 'Delayed gratification',
              meterChanges: { income: 10, hourlyValue: 10, optionality: 15, energy: -5 },
              storyResponse: 'Your friends go without you. FOMO hits hard. But your goal timeline stays intact. The compass approves.',
              unlocks: ['focus-proven'],
            },
            {
              id: 'negotiate-cheaper',
              label: 'Propose a budget alternative',
              description: 'Creative middle ground',
              meterChanges: { income: -5, energy: 5, optionality: -5 },
              storyResponse: 'You join for part of the trip at half the cost. Connection maintained. Goal slightly delayed. Balance achieved.',
            },
          ],
        },
        {
          id: 'm2-reallocation',
          category: 'money',
          title: 'New Information',
          description: 'Your job announces potential layoffs in 6 months. Your goal suddenly competes with survival.',
          options: [
            {
              id: 'pause-goal',
              label: 'Pause goal, build emergency fund',
              description: 'Security before dreams',
              meterChanges: { income: 15, energy: 10, optionality: -10, replaceability: -20 },
              storyResponse: 'Goal paused. Emergency fund grows. The layoff threat weighs on you, but you have a cushion now.',
              unlocks: ['emergency-priority'],
            },
            {
              id: 'stay-course',
              label: 'Stay the course - probably fine',
              description: 'Optimism wins',
              meterChanges: { income: -10, energy: -15, replaceability: 20 },
              storyResponse: 'You ignore the warning. The stress builds silently. Your compass flickers—uncertainty clouds clarity.',
            },
            {
              id: 'split-focus',
              label: 'Split: 50% goal, 50% emergency',
              description: 'Hedge your bets',
              meterChanges: { hourlyValue: 5, energy: -5, optionality: 5 },
              storyResponse: 'Both pots grow slowly. Neither reaches critical mass quickly. But you\'re covering bases.',
            },
          ],
        },
      ],
      closingNarration: 'Month 2 ends. Timelines are real. Tradeoffs are unavoidable. Your compass grows stronger through conflict.',
    },
    // MONTH 3 - Wants vs Needs vs Targets
    {
      month: 3,
      title: 'The Sorting',
      openingNarration: 'Money keeps flowing out. Where does it go? You start tracking. The results are uncomfortable. Comfort spending hides in "necessity" clothing.',
      decisions: [
        {
          id: 'm3-audit',
          category: 'money',
          title: 'The Spending Audit',
          description: 'You review last month. 40% went to things labeled "necessary" that weren\'t.',
          pandaDialogue: 'How did I not see this?',
          options: [
            {
              id: 'honest-labels',
              label: 'Relabel everything honestly',
              description: 'Truth hurts but helps',
              meterChanges: { income: 20, hourlyValue: 20, energy: -10, replaceability: -20 },
              storyResponse: 'The truth emerges. Half your "needs" are wants. The guilt fades as clarity grows. Now you can choose deliberately.',
              unlocks: ['honest-spending'],
            },
            {
              id: 'partial-relabel',
              label: 'Adjust the obvious ones only',
              description: 'Some truth is enough',
              meterChanges: { income: 10, hourlyValue: 10 },
              storyResponse: 'Some categories shift. But gray areas remain. The leak slows but doesn\'t stop.',
            },
            {
              id: 'justify-all',
              label: 'Everything I bought was needed',
              description: 'Defend current behavior',
              meterChanges: { income: -10, hourlyValue: -10, replaceability: 15 },
              storyResponse: 'The lie feels comfortable. But your goal progress stalls. The compass dims slightly.',
            },
          ],
        },
        {
          id: 'm3-subscription',
          category: 'money',
          title: 'Subscription Audit',
          description: 'You have 8 subscriptions totaling 200 coins/month. Time to sort them.',
          options: [
            {
              id: 'cut-half',
              label: 'Cancel 4 subscriptions',
              description: 'Keep only what you actively use',
              meterChanges: { income: 15, hourlyValue: 10, optionality: 15, energy: 5 },
              storyResponse: 'Four services vanish. You don\'t miss them. 100 coins/month now flow to your goal instead.',
              unlocks: ['subscription-trim'],
            },
            {
              id: 'keep-most',
              label: 'Cancel 1, keep watching others',
              description: 'Small step forward',
              meterChanges: { income: 5, hourlyValue: 5 },
              storyResponse: 'Token gesture. The leak continues. But one small victory is better than none.',
            },
            {
              id: 'add-new',
              label: 'Actually, there\'s a new one you want...',
              description: 'Lifestyle creep wins',
              meterChanges: { income: -10, optionality: -10, replaceability: 10 },
              storyResponse: 'The new subscription joins the pile. Your goal timeline extends again. The pattern repeats.',
            },
          ],
        },
        {
          id: 'm3-target-first',
          category: 'skill',
          title: 'Payday Strategy',
          description: 'Payday arrives. How will you allocate before spending begins?',
          options: [
            {
              id: 'target-first-method',
              label: 'Fund goal first, then needs, then wants',
              description: 'Goal gets priority',
              meterChanges: { income: 20, hourlyValue: 15, optionality: 25, replaceability: -15 },
              storyResponse: 'Your goal is fed before temptation appears. Leftover money becomes intentional want-spending. No guilt.',
              unlocks: ['target-first'],
            },
            {
              id: 'needs-first-method',
              label: 'Needs first, then goal, then wants',
              description: 'Survival prioritized',
              meterChanges: { income: 10, hourlyValue: 10, optionality: 10 },
              storyResponse: 'Bills are paid. Goal gets some. Wants take the rest. Progress happens, but slower.',
            },
            {
              id: 'flow-method',
              label: 'See how the month goes',
              description: 'Flexible approach',
              meterChanges: { income: -5, hourlyValue: -5, replaceability: 10 },
              storyResponse: 'The month happens. Money flows outward. At month-end, your goal got nothing. Again.',
            },
          ],
        },
      ],
      closingNarration: 'Month 3 ends. The spending leaks are found. Some are plugged. The compass grows brighter as clarity increases.',
    },
    // MONTH 4 - Priority Stacking
    {
      month: 4,
      title: 'The Stack',
      openingNarration: 'You now have three goals competing for attention. Your main goal, a new opportunity, and an obligation. Something has to wait.',
      decisions: [
        {
          id: 'm4-stack',
          category: 'skill',
          title: 'Rank Your Goals',
          description: 'Three goals cannot all be #1. Which deserves focus right now?',
          pandaDialogue: 'But they all matter...',
          options: [
            {
              id: 'focus-one',
              label: 'Original goal stays #1',
              description: 'Finish what you started',
              meterChanges: { income: 20, hourlyValue: 15, optionality: 20, energy: 5 },
              storyResponse: 'Focus locked. The other goals are queued, not abandoned. Your original goal accelerates dramatically.',
              unlocks: ['stack-discipline'],
            },
            {
              id: 'new-shiny',
              label: 'Switch to the new opportunity',
              description: 'It feels more exciting',
              meterChanges: { income: -15, hourlyValue: -10, optionality: -10, replaceability: 20 },
              storyResponse: 'Goal ADHD. Your original progress sits at 60%. New goal starts from 0. Neither completes this year.',
            },
            {
              id: 'obligation-first',
              label: 'Handle the obligation first',
              description: 'Clear the must-do',
              meterChanges: { income: 5, hourlyValue: 5, energy: -10 },
              storyResponse: 'Obligation cleared. But it wasn\'t actually urgent. You gave it priority it didn\'t need.',
            },
          ],
        },
        {
          id: 'm4-momentum',
          category: 'money',
          title: 'The 80% Mark',
          description: 'Your main goal hits 80% funded. You\'re almost there.',
          options: [
            {
              id: 'finish-strong',
              label: 'Push to 100% before anything else',
              description: 'Finish what you started',
              meterChanges: { income: 20, hourlyValue: 20, optionality: 25, energy: 5 },
              storyResponse: 'GOAL COMPLETE! The feeling of finishing compounds. You attack the next goal with proven confidence.',
              unlocks: ['goal-complete'],
            },
            {
              id: 'start-next',
              label: 'Start the next goal while finishing this one',
              description: 'Multi-tasking momentum',
              meterChanges: { income: 10, optionality: 10, energy: -10 },
              storyResponse: 'Divided attention. The first goal takes 3 extra months. Neither feels like a clear win.',
            },
            {
              id: 'celebrate-early',
              label: 'Take a break - you deserve it',
              description: '80% is basically done',
              meterChanges: { income: -10, energy: 15, optionality: -15 },
              storyResponse: 'The break extends. 80% becomes the permanent stopping point. So close, yet incomplete.',
            },
          ],
        },
        {
          id: 'm4-external',
          category: 'negotiation',
          title: 'External Pressure',
          description: 'Family hints heavily about helping with a cousin\'s wedding. It\'s not your goal.',
          pandaDialogue: 'But family is family...',
          options: [
            {
              id: 'give-in',
              label: 'Contribute significantly',
              description: 'Keep family harmony',
              meterChanges: { income: -15, hourlyValue: -5, optionality: -20, energy: -10 },
              storyResponse: 'Family is happy. Your goal timeline extends by 6 months. Was the harmony worth half a year?',
            },
            {
              id: 'boundary-kind',
              label: 'Give a token amount, explain your situation',
              description: 'Boundary with care',
              meterChanges: { income: -5, hourlyValue: 5, energy: 5 },
              storyResponse: 'You contribute something. You explain your goal. Some family understands. Some don\'t. Your timeline holds.',
              unlocks: ['boundary-set'],
            },
            {
              id: 'decline-fully',
              label: 'Decline - your goal comes first',
              description: 'Strong boundary',
              meterChanges: { income: 5, hourlyValue: 10, optionality: 10, energy: -15 },
              storyResponse: 'Family tension rises. But your goal stays protected. Boundaries are uncomfortable but necessary.',
            },
          ],
        },
      ],
      closingNarration: 'Month 4 ends. Focus works. Completion creates momentum. The stack is clear. One goal at a time.',
    },
    // MONTH 5 - Measuring Progress
    {
      month: 5,
      title: 'The True Measure',
      openingNarration: 'You scroll through social media. Everyone seems ahead. Bigger houses. Better vacations. Newer things. Your compass wavers. The comparison trap opens.',
      decisions: [
        {
          id: 'm5-comparison',
          category: 'skill',
          title: 'The Comparison Moment',
          description: 'A friend posts about their investment returns. You feel behind. Your plan is working, but theirs looks better.',
          pandaDialogue: 'Maybe I should change my approach...',
          options: [
            {
              id: 'compare-despair',
              label: 'Compare yourself to them',
              description: 'Let the feeling sink in',
              meterChanges: { income: -15, hourlyValue: -20, energy: -25, replaceability: 25 },
              storyResponse: 'You spent hours down a rabbit hole. Their situation is incomparable—different timeline, income, risk. You abandoned your working plan.',
            },
            {
              id: 'check-own',
              label: 'Check YOUR progress metrics instead',
              description: 'Measure against yourself',
              meterChanges: { income: 20, hourlyValue: 20, energy: 10, replaceability: -20 },
              storyResponse: 'You check your alignment score: 85%. You\'re ahead of your own schedule. Their journey is irrelevant to yours.',
              unlocks: ['self-measure'],
            },
            {
              id: 'scroll-past',
              label: 'Scroll past without engaging',
              description: 'Protect your peace',
              meterChanges: { hourlyValue: 10, energy: 5 },
              storyResponse: 'You notice the trigger and move on. No spiral. No comparison. Just continued focus.',
            },
          ],
        },
        {
          id: 'm5-measurement',
          category: 'skill',
          title: 'Choose Your Metric',
          description: 'How will you measure success going forward?',
          options: [
            {
              id: 'alignment-metric',
              label: 'Alignment Score: Do my actions match my goal?',
              description: 'Consistency over amount',
              meterChanges: { income: 20, hourlyValue: 25, optionality: 20, replaceability: -15 },
              storyResponse: 'Alignment becomes your north star. Small consistent actions score higher than sporadic big moves. Peace follows.',
              unlocks: ['alignment-master'],
            },
            {
              id: 'dollar-metric',
              label: 'Dollar Amount: How much have I saved?',
              description: 'Hard numbers only',
              meterChanges: { income: 10, hourlyValue: 10, optionality: 10 },
              storyResponse: 'Numbers don\'t lie. But they also don\'t show context. Early months look weak. Discouragement lurks.',
            },
            {
              id: 'feeling-metric',
              label: 'Feeling: Do I feel on track?',
              description: 'Trust your gut',
              meterChanges: { hourlyValue: 5, energy: 10, replaceability: 10 },
              storyResponse: 'Feelings fluctuate daily. Yesterday felt great. Today feels terrible. The metric provides no stability.',
            },
          ],
        },
        {
          id: 'm5-final',
          category: 'money',
          title: 'The Final Test',
          description: 'A "once in a lifetime" opportunity appears. Invest everything now for potential 3x returns. Your goal is 90% complete.',
          options: [
            {
              id: 'chase-returns',
              label: 'Go all in - 3x would be amazing',
              description: 'Risk everything',
              meterChanges: { income: -30, hourlyValue: -20, optionality: -25, replaceability: 30 },
              storyResponse: 'It wasn\'t 3x. It was 0x. Your 90% progress vanishes. You start from zero. The compass tried to warn you.',
            },
            {
              id: 'stay-course-final',
              label: 'Stay the course - 10% left to go',
              description: 'Finish what you started',
              meterChanges: { income: 25, hourlyValue: 25, optionality: 30, replaceability: -20 },
              storyResponse: 'You finish. GOAL COMPLETE. The "opportunity" fails for others. Your compass protected you. Direction before speed.',
              unlocks: ['final-goal-complete'],
            },
            {
              id: 'small-bet',
              label: 'Invest a small amount, keep most safe',
              description: 'Hedge your bets',
              meterChanges: { income: 10, hourlyValue: 10, optionality: 10 },
              storyResponse: 'The small bet loses. But your goal still completes next month. Reasonable risk, protected progress.',
            },
          ],
        },
      ],
      closingNarration: 'The journey ends—or rather, transforms. The compass is now part of you. Direction guides every future choice. Comparison fades. Your path is clear.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.income >= 80 && meters.hourlyValue >= 80,
          event: 'The wise old panda returns: "You learned what most never do. Direction before speed. Alignment over comparison. Well done."',
        },
      ],
    },
  ],
  endings: [
    {
      id: 'compass-master',
      title: 'The Compass Master',
      description: 'You completed your goal and built a system that will serve you for life.',
      trajectory: 'momentum',
      futureSnapshot: `Three years later, your second major goal is complete. The third is 60% funded. Each goal took less time than the last because your compass never wavers.

When friends ask how you stay focused, you smile: "Direction before speed. Every time."

The windfall was never about the money. It was about learning to choose.`,
      conditions: (meters: GameMeters, unlocks: string[]) => 
        meters.income >= 75 && meters.hourlyValue >= 75 && meters.optionality >= 70 && unlocks.includes('final-goal-complete'),
    },
    {
      id: 'steady-navigator',
      title: 'The Steady Navigator',
      description: 'You made real progress with only minor detours.',
      trajectory: 'growing',
      futureSnapshot: `Three years later, your goal is complete—six months later than planned but complete. You learned to balance ambition with life.

The compass isn\'t perfect, but it\'s reliable. You trust your direction even when the path gets foggy.`,
      conditions: (meters: GameMeters) => 
        meters.income >= 50 && meters.hourlyValue >= 50 && meters.optionality >= 40,
    },
    {
      id: 'comparison-trapped',
      title: 'The Comparison Trap',
      description: 'You kept changing direction based on what others were doing.',
      trajectory: 'stuck',
      futureSnapshot: `Three years later, you have five partially-completed goals. Each seemed urgent at the time. None are finished.

You watch others complete things and feel behind. But they weren\'t comparing themselves to you—they were following their own compass.`,
      conditions: (meters: GameMeters) => 
        meters.replaceability >= 60 && meters.hourlyValue < 50,
    },
    {
      id: 'burnout-reset',
      title: 'The Burnout Reset',
      description: 'You pushed too hard and had to start over.',
      trajectory: 'burnout',
      futureSnapshot: `Three years later, you\'re rebuilding. The aggressive timeline broke something. But this time, you\'re going slower.

"Sustainable beats fast," you tell yourself. The compass is recalibrating.`,
      conditions: (meters: GameMeters) => 
        meters.energy < 30,
    },
    {
      id: 'balanced-path',
      title: 'The Balanced Path',
      description: 'You found harmony between goals and life.',
      trajectory: 'balanced',
      futureSnapshot: `Three years later, progress is steady. Not dramatic, but consistent. You have a goal, a life, and a compass that guides both.

Sometimes you detour. But you always return. The destination is clear.`,
      conditions: () => true, // Default ending
    },
  ],
};
