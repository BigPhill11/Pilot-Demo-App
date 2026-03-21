import { CareerStory } from '@/types/career-story';
import { investmentBankingStory } from './investment-banking-story';
import { privateEquityStory } from './private-equity-story';
import { consultingStory } from './consulting-story';

export const careerStories: CareerStory[] = [
  investmentBankingStory,
  privateEquityStory,
  consultingStory
];

export { investmentBankingStory, privateEquityStory, consultingStory };
