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
        body: 'Shareholders elect the board of directors. The board hires and oversees the CEO and executive team. Management runs daily operations. Ownership control flows down; accountability flows back up.',
        realWorldExample:
          'When activists buy a large stake, they push for board seats to influence strategy. That is ownership power in action.',
      },
      {
        id: 'principal_agent',
        emoji: '⚖️',
        title: 'Principal-Agent Conflict',
        body: 'Managers (agents) may chase bonuses, headlines, or empire-building instead of long-term shareholder value (principal). Good governance aligns incentives with owners.',
        realWorldExample:
          'CEOs rewarded only for short-term earnings might cut R&D that hurts growth five years later. Boards are supposed to police that tradeoff.',
      },
      {
        id: 'cap_table',
        emoji: '📋',
        title: 'Cap Tables',
        body: 'A capitalization table shows who owns what percentage: founders, employees, venture investors, and public shareholders. Dilution happens when new shares are issued.',
        realWorldExample:
          'A startup founder might drop from 60% to 40% after Series A funding. They traded ownership for growth capital.',
      },
      {
        id: 'retail_rights',
        emoji: '🗳️',
        title: 'What Retail Owners Can Do',
        body: 'Even small shareholders have vote rights on major events (mergers, board elections). Proxy voting lets you participate without flying to meetings.',
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
