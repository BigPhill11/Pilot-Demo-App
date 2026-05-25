import type { VillageLesson } from '@/types/village-lesson';

export const businessEconomicsCompetitionLessons: VillageLesson[] = [
  {
    id: 'be-2-market-power',
    moduleId: 'business-economics',
    section: 'Competition',
    unitLabel: 'Unit 1: Market Power',
    title: 'When Companies Have All the Power',
    estimatedMinutes: 9,
    hook: {
      question: 'Why does your internet provider charge whatever it wants — and you just... pay it?',
      philMessage:
        "Not all markets are equal. Some companies have so much power they can charge almost anything. Let's understand why — and what stops them.",
    },
    concepts: [
      {
        id: 'spectrum',
        emoji: '🎯',
        title: 'The Competition Spectrum',
        body: 'Markets range from perfect competition (many sellers, no pricing power) to monopoly (one seller). Between: monopolistic competition (differentiated products) and oligopoly (few dominant firms). Your career and investing sit inside these structures.',
        realWorldExample:
          "Farmers can't price corn above the market. Airlines oligopoly-watch each other. Search and social platforms have huge network moats — antitrust debates follow.",
      },
      {
        id: 'monopoly',
        emoji: '🏰',
        title: 'Monopoly: When One Player Rules',
        body: 'A monopoly controls a market with high barriers to entry — patents, resources, licenses, network effects. They can price above competitive levels because alternatives are weak.',
        realWorldExample:
          'Local broadband often feels like a monopoly — limited providers, high bills. Underserved areas may have no fiber at all — a systemic access barrier.',
      },
      {
        id: 'oligopoly',
        emoji: '🤝',
        title: 'Oligopoly: The Few Who Rule',
        body: 'Few firms dominate and watch each other. Outcomes: price wars or tacit coordination (prices stay high without formal collusion). Strategy and game theory matter here.',
        realWorldExample:
          'Big airlines, automakers, and banks move together on fees and rates — competition policy tries to keep consumers protected.',
      },
      {
        id: 'antitrust',
        emoji: '⚖️',
        title: 'Antitrust: The Rules of the Game',
        body: 'Antitrust law blocks mergers that kill competition and punishes price-fixing. Regulators balance innovation (patents) vs. consumer harm (monopoly rent).',
        realWorldExample:
          'AT&T breakup, EU fines on big tech, suits over acquisitions — careers in law, policy, and compliance grow from these fights.',
      },
    ],
    simulator: {
      title: 'Telecom Tycoon',
      intro:
        "You're CEO of the only internet provider in a mid-sized city. The council is watching. How do you use market power?",
      scenario:
        'Monopoly broadband: cost $25/customer, charge $85, 60% subscribe. Competitor or regulator may change the game.',
      meters: [
        { id: 'profit', label: 'Profit Margin', emoji: '💰', initial: 60, color: 'green' },
        { id: 'subscribers', label: 'Subscribers', emoji: '👥', initial: 60, color: 'blue' },
        { id: 'regulation_risk', label: 'Regulation Risk', emoji: '⚠️', initial: 30, color: 'red' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'A fiber startup applies for permits to compete. What do you do?',
          choices: [
            {
              id: 'lobby',
              label: 'Lobby to delay their permits',
              description: 'Use political connections.',
              effects: { profit: +10, subscribers: 0, regulation_risk: +25 },
              feedback:
                'Short win — investigation risk rises. Anti-competitive tactics invite antitrust attention.',
            },
            {
              id: 'improve',
              label: 'Upgrade network before they arrive',
              description: 'Compete on quality.',
              effects: { profit: -10, subscribers: +15, regulation_risk: -10 },
              feedback:
                'Real competition through innovation — healthier for consumers and regulators.',
            },
            {
              id: 'nothing',
              label: 'Do nothing — bet on slow rollout',
              description: 'Complacency.',
              effects: { profit: +5, subscribers: -5, regulation_risk: +5 },
              feedback:
                'Customers defect when rival launches — monopoly power erodes without a moat.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'Board wants $120/month to hit quarterly targets.',
          choices: [
            {
              id: 'raise',
              label: 'Raise to $120 — no competition',
              description: 'Extract rent.',
              effects: { profit: +20, subscribers: -20, regulation_risk: +30 },
              feedback:
                '30% cancel; utility-style regulation proposed — consumers bear monopoly pricing until policy steps in.',
            },
            {
              id: 'raise_slow',
              label: 'Small increase + premium tier',
              description: 'Justify with features.',
              effects: { profit: +10, subscribers: -5, regulation_risk: +10 },
              feedback:
                'Better optics; still tests how much power one firm can wield.',
            },
            {
              id: 'hold',
              label: 'Hold price — invest in retention',
              description: 'Long game.',
              effects: { profit: -5, subscribers: +10, regulation_risk: -15 },
              feedback:
                'Avoids regulatory backlash — competition strategy is not only price.',
            },
          ],
        },
      ],
      endMessage:
        'Market power shapes prices you pay and industries you might work in. Competition policy exists because unchecked power hurts communities.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'A monopoly is characterized by:',
        options: [
          { id: 'a', text: 'Many identical sellers' },
          { id: 'b', text: 'One seller with no close substitutes' },
          { id: 'c', text: 'Government owning all firms' },
          { id: 'd', text: 'Zero profit' },
        ],
        correctId: 'b',
        explanation: 'One dominant seller + barriers to entry = monopoly power.',
      },
      {
        id: 'q2',
        question: 'Four major airlines competing is an example of:',
        options: [
          { id: 'a', text: 'Perfect competition' },
          { id: 'b', text: 'Monopoly' },
          { id: 'c', text: 'Oligopoly' },
          { id: 'd', text: 'No market structure' },
        ],
        correctId: 'c',
        explanation: 'Few firms, mutual dependence — oligopoly.',
      },
      {
        id: 'q3',
        question: 'Antitrust law primarily:',
        options: [
          { id: 'a', text: 'Promotes competition and limits abuse' },
          { id: 'b', text: 'Sets your salary' },
          { id: 'c', text: 'Eliminates all patents' },
          { id: 'd', text: 'Bans all mergers always' },
        ],
        correctId: 'a',
        explanation: 'Keeps markets contestable — mergers and conduct face scrutiny.',
      },
      {
        id: 'q4',
        question: 'Patents create temporary monopoly power by:',
        options: [
          { id: 'a', text: 'Blocking rivals from selling the same invention' },
          { id: 'b', text: 'Lowering all prices' },
          { id: 'c', text: 'Removing incentives' },
          { id: 'd', text: 'Ending competition forever' },
        ],
        correctId: 'a',
        explanation: 'Exclusive rights ~20 years — trade-off between innovation reward and competition.',
      },
      {
        id: 'q5',
        question: 'Network effects hurt competition when:',
        options: [
          { id: 'a', text: 'Leaving a platform costs connections and data' },
          { id: 'b', text: 'Prices are always low' },
          { id: 'c', text: 'There are infinite substitutes' },
          { id: 'd', text: 'No one uses the product' },
        ],
        correctId: 'a',
        explanation: 'Value rises with users — switching costs lock people in.',
      },
    ],
    rewards: { xp: 130, bamboo: 18 },
  },
];
