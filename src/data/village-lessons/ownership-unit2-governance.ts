import type { VillageLesson } from '@/types/village-lesson';
import { ownershipSimulator } from './ownership-lesson-helpers';

export const ownershipUnit2Lessons: VillageLesson[] = [
  {
    id: 'own-u2-governance',
    moduleId: 'ownership',
    section: 'Asset Ownership',
    unitLabel: 'Unit 2.1',
    title: 'Fiduciary Chain and Cap Tables',
    estimatedMinutes: 10,
    simulatorType: 'governance-sort',
    hook: {
      question:
        'Who actually gets to fire a CEO: customers, the board, or anyone with a brokerage app?',
      philMessage:
        'Ownership is a chain of command. Shareholders, directors, and executives each have different jobs. Mix them up and your rights get blurry.',
    },
    concepts: [
      {
        id: 'cascade',
        emoji: '🏛️',
        title: 'Corporate Governance Cascade',
        body: 'A public company runs on a three-layer chain of command. At the top sit the shareholders — the actual owners — who elect the board of directors to represent their interests. The board hires (and can fire) the CEO, sets executive pay, and approves big strategic moves. The CEO and management team then run the company day to day. Control flows downward — owners to board to management — while accountability flows back up: managers answer to the board, and the board answers to the owners. When you buy a share, you join the top of that chain.',
        realWorldExample:
          'When activists buy a large stake, they push for board seats to influence strategy. That is ownership power in action.',
      },
      {
        id: 'principal_agent',
        emoji: '⚖️',
        title: 'Principal-Agent Conflict',
        body: 'The principal-agent problem is the central tension of corporate life: the owners (principals) hire managers (agents) to run the company, but managers are human — they may chase short-term bonuses, flashy headlines, or empire-building acquisitions that grow their own power rather than long-term shareholder value. Good governance exists to close that gap: performance-based pay tied to multi-year results, independent board members who ask hard questions, and transparent reporting that lets owners see what\'s really happening. When incentives align, everyone rows the same direction.',
        realWorldExample:
          'CEOs rewarded only for short-term earnings might cut R&D that hurts growth five years later. Boards are supposed to police that tradeoff.',
      },
      {
        id: 'cap_table',
        emoji: '📋',
        title: 'Cap Tables',
        body: 'A capitalization table (cap table) is the master ledger of who owns what percentage of a company: founders, early employees with stock options, venture investors, and eventually public shareholders. It matters because ownership percentages change. When a company issues new shares to raise money, every existing owner\'s slice of the pie shrinks — that\'s dilution. Owning 10% of a company that doubles in value while diluting you to 4% can leave you worse off than it sounds. Serious owners always ask not just "how many shares do I have?" but "what percentage do they represent?"',
        realWorldExample:
          'A startup founder might drop from 60% to 40% after Series A funding. They traded ownership for growth capital.',
      },
      {
        id: 'retail_rights',
        emoji: '🗳️',
        title: 'What Retail Owners Can Do',
        body: 'Owning even one share makes you a voter. Shareholders get a say on the company\'s biggest decisions: electing board members, approving mergers, executive pay packages, and shareholder proposals on everything from climate policy to buybacks. You don\'t need to fly to the annual meeting — proxy voting lets you cast your ballot online or by mail, and your broker emails you the materials automatically each spring. Most small investors throw these away, which concentrates power with big institutions. Voting your shares is how ownership becomes voice, not just a ticker in an app.',
        realWorldExample:
          'Index fund investors collectively hold huge voting power in large companies, making stewardship a real force.',
      },
    ],
    simulator: ownershipSimulator(
      'Governance Router',
      'Route corporate decisions to shareholders, the board, or management.',
      'Practice who has authority over pay, strategy, and share issuance.',
      'Know your place in the chain and you know your power as an owner.'
    ),
    quiz: [
      {
        id: 'q1',
        question: 'Who typically hires and oversees the CEO?',
        options: [
          { id: 'a', text: 'Board of directors' },
          { id: 'b', text: 'Store customers' },
          { id: 'c', text: 'Social media followers' },
          { id: 'd', text: 'Bond traders only' },
        ],
        correctId: 'a',
        explanation: 'The board represents shareholders and oversees executive leadership.',
      },
      {
        id: 'q2',
        question: 'Principal-agent conflict means:',
        options: [
          { id: 'a', text: 'Managers may pursue goals that differ from owners' },
          { id: 'b', text: 'Bonds always beat stocks' },
          { id: 'c', text: 'Inflation is zero' },
          { id: 'd', text: 'CEOs own 100% of every company' },
        ],
        correctId: 'a',
        explanation: 'Agents (management) might not always act in principals\' (owners) best interest.',
      },
      {
        id: 'q3',
        question: 'A cap table shows:',
        options: [
          { id: 'a', text: 'Ownership percentages across stakeholders' },
          { id: 'b', text: 'Daily stock price only' },
          { id: 'c', text: 'Employee lunch menus' },
          { id: 'd', text: 'GDP growth' },
        ],
        correctId: 'a',
        explanation: 'Cap tables map equity splits among founders, investors, and other owners.',
      },
      {
        id: 'q4',
        question: 'Issuing new shares to raise money often:',
        options: [
          { id: 'a', text: 'Dilutes existing owners' },
          { id: 'b', text: 'Eliminates the board' },
          { id: 'c', text: 'Guarantees profit' },
          { id: 'd', text: 'Removes voting rights' },
        ],
        correctId: 'a',
        explanation: 'More shares spread ownership thinner unless everyone buys proportionally.',
      },
      {
        id: 'q5',
        question: 'Shareholders usually vote on:',
        options: [
          { id: 'a', text: 'Major mergers and board elections' },
          { id: 'b', text: 'Daily office supply orders' },
          { id: 'c', text: 'Individual employee schedules' },
          { id: 'd', text: 'Weather forecasts' },
        ],
        correctId: 'a',
        explanation: 'Big structural decisions go to owners; operations stay with management.',
      },
    ],
    rewards: { xp: 130, bamboo: 16 },
  },
];
