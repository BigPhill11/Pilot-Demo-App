import React from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  Rocket,
  BarChart3,
  CreditCard,
  Shield,
  PieChart,
} from 'lucide-react';

export interface CareerLevel {
  id: number;
  title: string;
  description: string;
}

export interface CareerVideo {
  id: string;
  title: string;
  speaker: 'intern' | 'professional' | 'professor';
  duration: string;
  description: string;
  thumbnailUrl?: string;
}

export interface FinanceCareerData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  levels: CareerLevel[];
  videos: CareerVideo[];
  category: 'sell-side' | 'buy-side' | 'advisory' | 'corporate';
  kidFriendlyDescription: string;
}

const PLACEHOLDER = 'Content coming soon';

function levels(titles: string[]): CareerLevel[] {
  return titles.map((title, index) => ({
    id: index + 1,
    title,
    description: PLACEHOLDER,
  }));
}

export const financeCareerData: FinanceCareerData[] = [
  {
    id: 'investment-banking',
    name: 'Investment Banking',
    description: 'Help companies raise capital and execute strategic transactions',
    kidFriendlyDescription: 'Help companies get money and make big business deals happen!',
    category: 'sell-side',
    icon: Building2,
    color: 'from-blue-500 to-indigo-600',
    levels: levels([
      'What is Investment Banking?',
      'Investment Banking Process',
      'Financial Modeling & Analysis',
      'Deal Types & Structures',
      'Industry Sectors & Specialization',
      'Career Development',
      'Advanced Topics',
    ]),
    videos: [],
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    description: 'Invest in and improve private companies',
    kidFriendlyDescription: 'Buy companies, help them grow, and sell them for more money!',
    category: 'buy-side',
    icon: TrendingUp,
    color: 'from-purple-500 to-violet-600',
    levels: levels([
      'Introduction to Private Equity',
      'Investment Strategies & Deal Types',
      'Due Diligence & Valuation',
      'Value Creation & Portfolio Management',
      'Exit Strategies & Returns',
      'Fund Management & Investor Relations',
      'Advanced Topics & Future Trends',
    ]),
    videos: [],
  },
  {
    id: 'management-consulting',
    name: 'Management Consulting',
    description: 'Advise companies on strategy, operations, and transformation',
    kidFriendlyDescription: 'Help companies solve big problems and make smart decisions!',
    category: 'advisory',
    icon: Users,
    color: 'from-rose-500 to-pink-600',
    levels: levels([
      'Consulting Foundations',
      'Problem-Solving Fundamentals',
      'Strategic Analysis',
      'Operations Excellence',
      'Digital Transformation',
      'Change Management',
      'Strategic Leadership',
    ]),
    videos: [],
  },
  {
    id: 'hedge-funds',
    name: 'Hedge Funds',
    description: 'Use advanced strategies to generate returns for investors',
    kidFriendlyDescription: 'Use clever strategies to grow money for wealthy investors!',
    category: 'buy-side',
    icon: BarChart3,
    color: 'from-amber-500 to-orange-600',
    levels: levels([
      'Hedge Fund Fundamentals',
      'Investment Strategies',
      'Research & Analysis',
      'Risk Management',
      'Trading & Execution',
      'Performance & Operations',
      'Advanced Topics',
    ]),
    videos: [],
  },
  {
    id: 'venture-capital',
    name: 'Venture Capital',
    description: 'Fund high-growth startups and emerging companies',
    kidFriendlyDescription: 'Invest in cool new startups and help them become successful!',
    category: 'buy-side',
    icon: Rocket,
    color: 'from-fuchsia-500 to-purple-600',
    levels: levels([
      'Venture Capital Ecosystem',
      'Deal Sourcing & Evaluation',
      'Due Diligence Process',
      'Investment Decision Making',
      'Portfolio Support & Value Add',
      'Exit Strategies & Returns',
      'Industry Trends & Future',
    ]),
    videos: [],
  },
  {
    id: 'commercial-banking',
    name: 'Commercial Banking',
    description: 'Provide lending, treasury, and financial services to businesses',
    kidFriendlyDescription: 'Help businesses borrow money and manage their finances!',
    category: 'sell-side',
    icon: CreditCard,
    color: 'from-slate-500 to-gray-600',
    levels: levels([
      'Commercial Banking Overview',
      'Credit Analysis & Underwriting',
      'Relationship Management',
      'Treasury & Cash Management',
      'Specialized Lending',
      'Risk Management & Compliance',
      'Digital Innovation & Future',
    ]),
    videos: [],
  },
  {
    id: 'corporate-finance',
    name: 'Corporate Finance',
    description: 'Manage financial planning, capital, and strategy inside companies',
    kidFriendlyDescription: 'Help companies decide how to spend and save their money wisely!',
    category: 'corporate',
    icon: Building2,
    color: 'from-teal-500 to-cyan-600',
    levels: levels([
      'Corporate Finance Fundamentals',
      'Financial Planning & Analysis',
      'Capital Allocation & Investment',
      'Treasury Management',
      'M&A and Strategic Finance',
      'Risk Management & Controls',
      'Advanced Topics & Leadership',
    ]),
    videos: [],
  },
  {
    id: 'sales-trading',
    name: 'Sales & Trading',
    description: 'Execute trades and provide market insights to institutional clients',
    kidFriendlyDescription: 'Buy and sell stocks super fast and help clients make smart trades!',
    category: 'sell-side',
    icon: BarChart3,
    color: 'from-orange-500 to-red-600',
    levels: levels([
      'Sales & Trading Overview',
      'Market Structure & Operations',
      'Trading Strategies & Risk',
      'Client Sales & Coverage',
      'Derivatives & Structured Products',
      'Technology & Analytics',
      'Career Development & Future',
    ]),
    videos: [],
  },
  {
    id: 'wealth-management',
    name: 'Wealth Management',
    description: 'Provide financial planning and investment services to clients',
    kidFriendlyDescription: 'Help families protect and grow their money for generations!',
    category: 'buy-side',
    icon: Shield,
    color: 'from-emerald-500 to-green-600',
    levels: levels([
      'Wealth Management Fundamentals',
      'Financial Planning Process',
      'Investment Management',
      'Tax & Estate Planning',
      'Risk Management & Protection',
      'Family Dynamics & Governance',
      'Advanced Strategies & Trends',
    ]),
    videos: [],
  },
  {
    id: 'asset-management',
    name: 'Asset Management',
    description: 'Manage investment portfolios and funds for clients',
    kidFriendlyDescription: 'Invest money wisely for lots of different people and organizations!',
    category: 'buy-side',
    icon: PieChart,
    color: 'from-cyan-500 to-blue-600',
    levels: levels([
      'Asset Management Industry',
      'Investment Research & Analysis',
      'Portfolio Construction',
      'Risk Management',
      'Client Relations & Sales',
      'Operations & Technology',
      'Industry Evolution & Trends',
    ]),
    videos: [],
  },
];

export const getCareerById = (id: string): FinanceCareerData | undefined =>
  financeCareerData.find((career) => career.id === id);
