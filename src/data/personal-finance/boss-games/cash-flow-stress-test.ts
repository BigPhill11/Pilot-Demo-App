import { BossGameConfig, GameMeters } from '@/types/boss-game';

export const cashFlowStressTestGame: BossGameConfig = {
  id: 'cash-flow-stress-test',
  moduleId: 'saving',
  title: "The Cash Flow Stress Test",
  subtitle: 'Saving System Simulator',
  description: 'The boss is not one big emergency. The boss is a series of small disruptions arriving at bad times. Each event on its own is manageable. Together, they test whether your saving system was designed to survive real life instead of ideal conditions.',
  totalMonths: 5,
  initialMeters: {
    income: 60,          // Represents savings buffer (starts at $400 of target $600+)
    hourlyValue: 50,     // Represents system stability
    energy: 70,          // Represents stress level (higher = less stressed)
    replaceability: 30,  // Represents debt risk (lower is better)
    optionality: 50,     // Represents consistency/habit strength
  },
  months: [
    // PHASE 1: THE CONFIDENCE TEST
    {
      month: 1,
      title: 'The Confidence Test',
      openingNarration: `You start with:
• Monthly income: $1,200
• Fixed expenses: $750
• Variable spending average: $300
• Emergency fund: $400
• Automated savings: $50 per month

Your saving rule is already active. You cannot change it unless the rules allow you to.

Then something unexpected happens. A bonus lands in your account.`,
      decisions: [
        {
          id: 'phase1-bonus',
          category: 'money',
          title: 'Unexpected Bonus',
          description: 'You receive a one-time bonus of $200. How will you handle this windfall?',
          pandaDialogue: 'Extra money! This feels like a reward for hard work...',
          options: [
            {
              id: 'spend-bonus',
              label: 'Spend the bonus on comfort',
              description: 'You deserve something nice',
              meterChanges: { energy: 10, optionality: -10, income: -5 },
              storyResponse: 'The purchase was satisfying. But the bonus is gone, and your buffer is exactly where it was. Next surprise will hit the same way.',
            },
            {
              id: 'save-bonus',
              label: 'Save the full bonus',
              description: 'Add to emergency fund',
              meterChanges: { income: 20, hourlyValue: 10, optionality: 10 },
              storyResponse: 'Your emergency fund jumps to $600. The next disruption will feel smaller. Protection compounds.',
              unlocks: ['bonus-saved'],
            },
            {
              id: 'split-bonus',
              label: 'Split the bonus between spending and saving',
              description: 'Balance reward and protection',
              meterChanges: { income: 10, energy: 5, optionality: 5 },
              storyResponse: 'A treat and a boost. Neither extreme, but both feel intentional. Progress without deprivation.',
              unlocks: ['bonus-split'],
            },
          ],
        },
      ],
      closingNarration: 'The game recorded how you treat unexpected income. This decision adjusts your stress tolerance for what comes next.',
    },

    // PHASE 2: THE TIMING PROBLEM
    {
      month: 2,
      title: 'The Timing Problem',
      openingNarration: `Things were going well. Then your hours get reduced for one week.

Income drops by $150 this month.

Your saving rule is still set to $50 per month. The math suddenly feels tighter.`,
      decisions: [
        {
          id: 'phase2-income-drop',
          category: 'money',
          title: 'Reduced Income',
          description: 'Your hours were cut. Income is down $150. How do you handle your saving rule?',
          pandaDialogue: 'The numbers do not add up the way they did last week...',
          options: [
            {
              id: 'maintain-saving',
              label: 'Maintain your saving rule',
              description: 'Push through with $50 savings',
              meterChanges: { energy: -20, hourlyValue: 5, optionality: 5 },
              storyResponse: 'You saved, but the month felt painful. Stress spiked. If this repeats, something will break.',
              unlocks: ['pushed-hard'],
            },
            {
              id: 'pause-saving',
              label: 'Pause saving for this month',
              description: 'Skip the $50 transfer',
              meterChanges: { energy: 10, optionality: -15, hourlyValue: -10 },
              storyResponse: 'Pressure released. But zero progress was made. Pausing too often breaks momentum.',
            },
            {
              id: 'use-emergency',
              label: 'Withdraw from emergency fund to keep saving',
              description: 'Use buffer to fund savings',
              meterChanges: { income: -15, replaceability: 15, optionality: -20 },
              storyResponse: 'You moved money in a circle. Emergency funds weakened without protecting anything. Misuse creates false progress.',
            },
          ],
        },
      ],
      closingNarration: 'Your consistency score updates. Your emergency fund integrity was tested. The next phase raises the stakes.',
    },

    // PHASE 3: THE REAL EMERGENCY
    {
      month: 3,
      title: 'The Real Emergency',
      openingNarration: `An unexpected expense hits. $300. No warning. No flexibility.

Your phone screen cracked. It cannot be delayed. Work requires a functioning phone.

This is the moment your earlier decisions either protect you or expose you.`,
      decisions: [
        {
          id: 'phase3-emergency',
          category: 'money',
          title: 'Phone Repair Emergency',
          description: 'An unexpected $300 expense arrives. This cannot wait.',
          pandaDialogue: 'This is exactly what the emergency fund was for... right?',
          options: [
            {
              id: 'use-fund',
              label: 'Use your emergency fund',
              description: 'Draw $300 from savings',
              meterChanges: { income: -25, energy: 15, hourlyValue: 10 },
              storyResponse: 'The fund absorbed the hit. Bills stayed on time. No debt created. This is protection working exactly as designed.',
              unlocks: ['fund-used-correctly'],
            },
            {
              id: 'use-credit',
              label: 'Put it on a credit card',
              description: 'Borrow and pay later',
              meterChanges: { replaceability: 25, energy: -15, optionality: -15 },
              storyResponse: 'The phone is fixed. But now you owe more than $300 once interest kicks in. One problem created another problem.',
              unlocks: ['debt-created'],
            },
            {
              id: 'delay-expense',
              label: 'Delay a fixed expense to cover it',
              description: 'Skip a bill this month',
              meterChanges: { replaceability: 20, energy: -10, optionality: -20 },
              storyResponse: 'Phone fixed. But now late fees loom. Delaying obligations triggers penalties that compound the original cost.',
              unlocks: ['late-fees-pending'],
            },
          ],
        },
      ],
      closingNarration: 'The game shows whether your earlier choices made this event manageable or damaging. Real emergencies reveal system strength.',
    },

    // PHASE 4: THE TRADEOFF TRAP
    {
      month: 4,
      title: 'The Tradeoff Trap',
      openingNarration: `Life continues. You are still recovering from the emergency.

Then an invitation arrives. A friend's birthday trip costs $120. Missing it has social downsides.

This is not a crisis. This is a choice.`,
      decisions: [
        {
          id: 'phase4-social',
          category: 'money',
          title: 'Social Spending Pressure',
          description: 'You are invited to an event that costs $120. Missing it has social costs.',
          pandaDialogue: 'I want to go. But my system is still recovering...',
          options: [
            {
              id: 'spend-ignore',
              label: 'Spend without adjusting anything',
              description: 'Go and figure it out later',
              meterChanges: { income: -10, energy: 5, optionality: -15 },
              storyResponse: 'The event was fun. But spending without adjustment means something else suffers. Regret appears later.',
              unlocks: ['unplanned-spending'],
            },
            {
              id: 'spend-adjust',
              label: 'Spend but reduce future variable spending',
              description: 'Go and cut back elsewhere',
              meterChanges: { income: -5, energy: 0, hourlyValue: 10 },
              storyResponse: 'You went. You adjusted. The system stayed intact because you made a conscious tradeoff instead of ignoring it.',
              unlocks: ['conscious-tradeoff'],
            },
            {
              id: 'skip-event',
              label: 'Skip the event and preserve savings',
              description: 'Protect the system',
              meterChanges: { income: 5, energy: -10, optionality: 5 },
              storyResponse: 'Money stayed. But isolation has costs too. Skipping without reflection lowers long-term satisfaction.',
            },
          ],
        },
      ],
      closingNarration: 'Your opportunity cost awareness score updates. Conscious tradeoffs build stronger systems than avoidance.',
    },

    // PHASE 5: THE SYSTEM CHECK
    {
      month: 5,
      title: 'The System Check',
      openingNarration: `One month passes with no emergencies.

Bills are paid. Stress is lower. Your emergency fund is partially recovered.

Now you face the question that determines long-term success: What do you do when nothing is wrong?`,
      decisions: [
        {
          id: 'phase5-system',
          category: 'money',
          title: 'System Maintenance',
          description: 'A quiet month. No disruptions. What adjustment do you make?',
          pandaDialogue: 'Things feel stable. Is it time to push harder or let the system breathe?',
          options: [
            {
              id: 'increase-savings',
              label: 'Increase savings',
              description: 'Raise monthly savings by $25',
              meterChanges: { hourlyValue: 15, optionality: 10, income: 10 },
              storyResponse: 'Good timing. When capacity is high, increasing savings accelerates progress without stress. System durability rises.',
              unlocks: ['savings-increased'],
            },
            {
              id: 'hold-steady',
              label: 'Hold savings steady',
              description: 'Maintain current rule',
              meterChanges: { hourlyValue: 10, energy: 5, optionality: 5 },
              storyResponse: 'Consistency reinforced. The habit stays strong. Sometimes holding steady is the smartest move after disruption.',
              unlocks: ['held-steady'],
            },
            {
              id: 'reduce-savings',
              label: 'Reduce savings',
              description: 'Decrease to recover faster',
              meterChanges: { energy: 10, hourlyValue: -10, optionality: -10 },
              storyResponse: 'Pressure released. But reducing without a clear trigger weakens habit strength. Progress slows.',
            },
          ],
        },
      ],
      closingNarration: 'Your system durability score locks in. The boss fight is complete.',
    },
  ],
  endings: [
    {
      id: 'perfect-win',
      title: 'System Mastery',
      description: 'Your saving system survived and grew stronger.',
      trajectory: 'momentum',
      futureSnapshot: `Your emergency fund is fully recovered. Savings increased sustainably. No debt was created. No withdrawal cycle occurred.

You learned that saving systems must be built for pressure, not perfection. The habits you protected will compound for years.

Unlocked: Investing Module access, Advanced automation options, Higher-stakes decision scenarios.`,
      conditions: (meters: GameMeters, unlocks: string[]) => 
        meters.replaceability < 40 && 
        meters.optionality > 60 && 
        meters.hourlyValue > 60 &&
        !unlocks.includes('debt-created'),
    },
    {
      id: 'good-win',
      title: 'Protected Progress',
      description: 'Your system bent but did not break.',
      trajectory: 'growing',
      futureSnapshot: `You handled disruptions without major damage. Some stress occurred, but no long-term setbacks.

The key insight: saving systems need maintenance, not just motivation.

Unlocked: Investing Module access, Emergency fund expansion tools.`,
      conditions: (meters: GameMeters, unlocks: string[]) => 
        meters.replaceability < 50 && 
        meters.optionality > 40 &&
        !unlocks.includes('debt-created'),
    },
    {
      id: 'struggled',
      title: 'Learning Under Pressure',
      description: 'The system showed cracks, but you saw them.',
      trajectory: 'balanced',
      futureSnapshot: `Stress was higher than ideal. Some decisions weakened your position. But you finished the test with awareness.

The lesson: systems fail when they ignore reality. Adaptation preserves progress.

Unlocked: Saving system review tools.`,
      conditions: (meters: GameMeters, unlocks: string[]) => 
        meters.replaceability < 60 && 
        meters.energy > 30,
    },
    {
      id: 'debt-cycle',
      title: 'The Debt Trap',
      description: 'Short-term choices created long-term drag.',
      trajectory: 'stuck',
      futureSnapshot: `Debt replaced savings repeatedly. Emergency funds were misused or depleted. The saving habit weakened under pressure.

The insight: systems built for good weeks fail during bad weeks. Protection must come first.

Review recommended before advancing.`,
      conditions: (meters: GameMeters, unlocks: string[]) => 
        unlocks.includes('debt-created') || meters.replaceability > 70,
    },
    {
      id: 'burnout',
      title: 'System Overload',
      description: 'Pushing too hard broke the system.',
      trajectory: 'burnout',
      futureSnapshot: `Saving continued, but at too high a cost. Stress accumulated. The habit feels like punishment instead of protection.

The lesson: saving too aggressively is not discipline. It is pressure that eventually breaks.

Recovery recommended before advancing.`,
      conditions: (meters: GameMeters) => 
        meters.energy < 25,
    },
  ],
};



