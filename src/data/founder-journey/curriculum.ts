import type { FounderModule, FounderSection } from '@/types/founder-journey';

export const FOUNDER_SECTIONS: FounderSection[] = [
  { id: 'discover', title: 'Discover Real Demand', description: 'Find a problem, test a small solution, and listen to customers.' },
  { id: 'business', title: 'Build a Viable Business', description: 'Understand the money, choose funding, and earn your first sales.' },
  { id: 'launch', title: 'Launch with Purpose', description: 'Build a reliable team, run a launch, and learn from the results.' },
];

export const FOUNDER_MODULES: FounderModule[] = [
  { id: 'idea-and-mvp', sectionId: 'discover', title: 'From Idea to MVP', description: 'Choose a meaningful problem and test a useful first version.', lessonIds: ['idea-to-mvp', 'problem-discovery', 'design-first-test'] },
  { id: 'customer-validation', sectionId: 'discover', title: 'Validating Customers', description: 'Ask better questions and turn behavior into evidence.', lessonIds: ['validating-customers', 'interview-customers', 'evidence-and-pivots'] },
  { id: 'money-and-funding', sectionId: 'business', title: 'Money & Funding', description: 'Protect cash, understand costs, and compare funding tradeoffs.', lessonIds: ['funding-the-business', 'costs-and-cash', 'funding-tradeoffs'] },
  { id: 'pricing-and-sales', sectionId: 'business', title: 'Pricing & First Sales', description: 'Build an offer, reach buyers, and earn repeat business.', lessonIds: ['price-your-offer', 'make-first-sale', 'keep-customers'] },
  { id: 'first-team', sectionId: 'launch', title: 'Building Your First Team', description: 'Fill a skill gap and agree on how the team works.', lessonIds: ['building-the-team', 'roles-and-expectations', 'healthy-teamwork'] },
  { id: 'launch-and-learn', sectionId: 'launch', title: 'Launch & Learn', description: 'Run a small launch, read the evidence, and choose your next move.', lessonIds: ['plan-your-launch', 'measure-and-improve', 'founder-next-step'] },
];

export const getFounderModule = (lessonId: string) =>
  FOUNDER_MODULES.find((module) => module.lessonIds.some((id) => id === lessonId));
