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
        body: 'Every market sits somewhere on a competition spectrum, and knowing where changes everything about prices and profits. At one end is perfect competition — many sellers offering identical products (like wheat farmers), where nobody can charge extra because customers will just buy next door. At the other end is monopoly: one seller, no alternatives. Between them live monopolistic competition (many sellers with differentiated products, like restaurants) and oligopoly (a few dominant firms, like phone carriers). Your job, your favorite brands, and every stock you might buy all live inside one of these structures.',
        realWorldExample:
          "Farmers can't price corn above the market. Airlines oligopoly-watch each other. Search and social platforms have huge network moats — antitrust debates follow.",
      },
      {
        id: 'monopoly',
        emoji: '🏰',
        title: 'Monopoly: When One Player Rules',
        body: 'A monopoly controls a market because something blocks rivals from entering — and those barriers come in flavors. Patents legally forbid copying for years. Control of scarce resources means competitors can\'t get raw materials. Licenses restrict who\'s allowed to operate. Network effects are the modern giant: every new user makes the product more valuable, so a challenger with a better app but no users still loses. With weak alternatives, monopolies can price well above competitive levels — which is why they earn fat profits and attract regulator attention in equal measure.',
        realWorldExample:
          'Local broadband often feels like a monopoly — limited providers, high bills. Underserved areas may have no fiber at all — a systemic access barrier.',
      },
      {
        id: 'oligopoly',
        emoji: '🤝',
        title: 'Oligopoly: The Few Who Rule',
        body: 'In an oligopoly, a handful of big firms dominate and every move is made while watching the others — like a permanent chess match. Two outcomes are common. Sometimes rivals launch price wars, slashing prices to steal customers until everyone\'s profits bleed. Other times they settle into tacit coordination: without ever meeting in a room (which would be illegal collusion), they mirror each other\'s prices and keep them comfortably high. Airlines, cell carriers, and streaming services all show these patterns. Game theory — predicting how rivals respond to your move — is the core skill.',
        realWorldExample:
          'Big airlines, automakers, and banks move together on fees and rates — competition policy tries to keep consumers protected.',
      },
      {
        id: 'antitrust',
        emoji: '⚖️',
        title: 'Antitrust: The Rules of the Game',
        body: 'Antitrust law is the referee of capitalism. Regulators like the FTC and DOJ block mergers that would kill competition, break up companies that abuse dominant positions, and criminally punish price-fixing conspiracies. But they walk a genuine tightrope: patents deliberately grant temporary monopolies to reward inventors, and big companies sometimes deliver real efficiencies — so the question is never just "is this company big?" but "is its size helping or harming consumers?" When you see headlines about tech giants in court, this innovation-versus-monopoly-rent balance is exactly what\'s being argued.',
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
