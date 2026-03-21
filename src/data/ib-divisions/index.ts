import { InteractiveLessonContent } from '../investment-banking-lessons';
import { maDivisionLessons } from './ma-division-lessons';
import { dcmDivisionLessons } from './dcm-division-lessons';
import { ecmDivisionLessons } from './ecm-division-lessons';
import { levFinDivisionLessons } from './leveraged-finance-lessons';
import { secondariesDivisionLessons } from './secondaries-division-lessons';
import { restructuringDivisionLessons } from './restructuring-division-lessons';

export interface IBDivision {
  id: string;
  name: string;
  description: string;
  icon: string;
  lessons: InteractiveLessonContent[];
  estimatedTime: string;
  difficulty: 'intermediate' | 'advanced';
}

export const ibDivisions: IBDivision[] = [
  {
    id: 'ma',
    name: 'M&A (Mergers & Acquisitions)',
    description: 'Master the art of corporate combinations, from strategic acquisitions to hostile takeovers and complex deal structures',
    icon: '🤝',
    lessons: maDivisionLessons,
    estimatedTime: '6-8 hours',
    difficulty: 'intermediate'
  },
  {
    id: 'dcm',
    name: 'Debt Capital Markets',
    description: 'Navigate the world of corporate bonds, from investment grade to high yield, and master debt syndication processes',
    icon: '💳',
    lessons: dcmDivisionLessons,
    estimatedTime: '5-7 hours', 
    difficulty: 'intermediate'
  },
  {
    id: 'ecm',
    name: 'Equity Capital Markets',
    description: 'Explore IPOs, follow-on offerings, and alternative public market strategies like SPACs and direct listings',
    icon: '📈',
    lessons: ecmDivisionLessons,
    estimatedTime: '5-7 hours',
    difficulty: 'intermediate'
  },
  {
    id: 'leveraged-finance',
    name: 'Leveraged Finance',
    description: 'Understand high-risk lending, LBO financing, and complex debt structures for highly leveraged companies',
    icon: '⚖️',
    lessons: levFinDivisionLessons,
    estimatedTime: '6-8 hours',
    difficulty: 'advanced'
  },
  {
    id: 'secondaries',
    name: 'Sales & Trading (Secondaries)',
    description: 'Master secondary markets, from market making to algorithmic trading and high-frequency strategies',
    icon: '📊',
    lessons: secondariesDivisionLessons,
    estimatedTime: '5-7 hours',
    difficulty: 'advanced'
  },
  {
    id: 'restructuring',
    name: 'Restructuring',
    description: 'Navigate financial distress, bankruptcy processes, and complex workouts to maximize creditor recoveries',
    icon: '🔧',
    lessons: restructuringDivisionLessons,
    estimatedTime: '6-8 hours',
    difficulty: 'advanced'
  }
];