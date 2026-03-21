import React from 'react';
import { Brain, Building2, TrendingUp, Banknote, Shield, Stethoscope, Laptop, Car, Home, Wrench } from 'lucide-react';
import { IndustryJourneyData } from './industry-journeys';

export const extendedIndustryJourneys: IndustryJourneyData[] = [
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence Revolution',
    description: 'Deep dive into AI companies, machine learning applications, and the future of intelligent technology.',
    icon: Brain,
    color: 'from-purple-500 to-pink-600',
    estimatedTime: '60 minutes',
    difficulty: 'Advanced',
    prerequisites: ['Technology Sector Knowledge', 'Understanding of Data Analytics'],
    learningObjectives: [
      'Understand AI business models and revenue streams',
      'Analyze leading AI companies and their competitive advantages',
      'Evaluate the investment potential of AI technologies'
    ],
    levels: [
      {
        id: 1,
        title: 'AI Fundamentals',
        description: 'Understanding the basics of artificial intelligence',
        content: 'Artificial Intelligence represents one of the most transformative technologies of our time...',
        keyTakeaways: ['AI is transforming industries', 'Multiple AI applications exist', 'Investment opportunities are growing']
      }
    ]
  }
];
