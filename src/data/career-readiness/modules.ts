import type { LucideIcon } from 'lucide-react';
import {
  CalendarCheck,
  ClipboardList,
  Handshake,
  Mail,
  Shirt,
  Trophy,
} from 'lucide-react';

export interface CareerModule {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  estimatedMinutes: number;
  badgeId: string;
  learningPoints: string[];
}

export const CAREER_MODULES: CareerModule[] = [
  {
    id: 'interviewing',
    title: 'Interviewing',
    description: 'Prepare, practice, and present your best self.',
    icon: ClipboardList,
    estimatedMinutes: 45,
    badgeId: 'badge-interviewing',
    learningPoints: [
      'Research companies before you apply',
      'Practice common interview questions',
      'Dress and show up with confidence',
    ],
  },
  {
    id: 'email-etiquette',
    title: 'Email Etiquette',
    description: 'Write emails that open doors.',
    icon: Mail,
    estimatedMinutes: 40,
    badgeId: 'badge-email',
    learningPoints: [
      'Match tone to audience — cold, warm, or internal',
      'Build subject lines and bodies that get read',
      'CC, BCC, timing, signatures, and follow-up done right',
    ],
  },
  {
    id: 'business-etiquette',
    title: 'Business Etiquette & Attire',
    description: 'Dress the part. Act the part. Make the right impression.',
    icon: Shirt,
    estimatedMinutes: 35,
    badgeId: 'badge-etiquette',
    learningPoints: [
      'Understand dress codes for different settings',
      'Practice professional body language',
      'Navigate meetings and introductions with ease',
    ],
  },
  {
    id: 'networking',
    title: 'Networking',
    description: 'Build connections that open doors and create opportunities.',
    icon: Handshake,
    estimatedMinutes: 40,
    badgeId: 'badge-networking',
    learningPoints: [
      'Start conversations naturally',
      'Follow up after meeting someone new',
      'Build relationships, not just contacts',
    ],
  },
  {
    id: 'professional-habits',
    title: 'Professional Habits',
    description: 'Develop daily habits that set you up for long-term success.',
    icon: CalendarCheck,
    estimatedMinutes: 25,
    badgeId: 'badge-habits',
    learningPoints: [
      'Show up on time and prepared',
      'Communicate proactively with teammates',
      'Take ownership of your work',
    ],
  },
  {
    id: 'personal-brand',
    title: 'Personal Brand',
    description: 'Discover your strengths and communicate your unique value.',
    icon: Trophy,
    estimatedMinutes: 35,
    badgeId: 'badge-brand',
    learningPoints: [
      'Identify your core strengths',
      'Build a consistent online presence',
      'Tell your story with confidence',
    ],
  },
];

export const TOTAL_CAREER_MODULES = CAREER_MODULES.length;

export function getCareerModuleById(id: string): CareerModule | undefined {
  return CAREER_MODULES.find((m) => m.id === id);
}
