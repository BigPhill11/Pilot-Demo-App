/**
 * Careers & Finance flashcard extractor.
 *
 * Sources:
 *  - Investment Banking terms (level 1-7) → grouped by category/level
 *  - Private Equity lesson keyTerms → resolved against privateEquityTerms dict
 *  - Management Consulting lesson keyTerms → resolved against consultingTerms dict
 *  - Venture Capital terms (level1/level2)
 *  - Career Readiness interviewing inline keyTerms
 */

import type { UnifiedFlashcard } from '@/data/unified-flashcards';
import { getIBTermsForLevel, type IBTerm } from '@/data/investment-banking-terms';
import { privateEquityTerms, type PETerm } from '@/data/private-equity-terms';
import { privateEquityLessons } from '@/data/private-equity-lessons';
import { managementConsultingLessons } from '@/data/management-consulting-lessons';
import { consultingTerms, type ConsultingTerm } from '@/data/management-consulting-terms';
import { vcTerms } from '@/data/venture-capital-terms';
import { INTERVIEW_LESSONS } from '@/data/career-readiness/interviewing';

const ibDifficulty = (level: number): UnifiedFlashcard['difficulty'] => {
  if (level <= 2) return 'beginner';
  if (level <= 4) return 'intermediate';
  return 'advanced';
};

const ibCategoryLabel = (cat: IBTerm['category']): string => {
  const map: Record<IBTerm['category'], string> = {
    basics: 'IB Basics',
    ib_services: 'IB Services',
    ib_process: 'IB Process',
    ib_documents: 'IB Documents',
    ma: 'M&A',
    capital_markets: 'Capital Markets',
    trading: 'Trading',
    compliance: 'Compliance',
    technology: 'FinTech',
  };
  return map[cat] ?? 'Investment Banking';
};

function extractIBFlashcards(): UnifiedFlashcard[] {
  const allTerms = getIBTermsForLevel(7);
  return Object.entries(allTerms).map(([slug, term]) => ({
    id: `careers-ib-${slug}`,
    term: term.term,
    definition: term.definition,
    philExample: term.analogy,
    sourceModule: 'careers' as const,
    sourceLesson: 'Investment Banking',
    category: 'Investment Banking',
    subcategory: ibCategoryLabel(term.category),
    difficulty: ibDifficulty(term.level),
    tags: ['Careers', 'Investment Banking', ibCategoryLabel(term.category)],
    icon: '🏦',
  }));
}

function extractPEFlashcards(): UnifiedFlashcard[] {
  const seen = new Set<string>();
  const cards: UnifiedFlashcard[] = [];

  privateEquityLessons.forEach((lesson) => {
    lesson.keyTerms.forEach((slug) => {
      if (seen.has(slug)) return;
      const term = (privateEquityTerms as Record<string, PETerm>)[slug];
      if (!term) return;
      seen.add(slug);
      cards.push({
        id: `careers-pe-${slug}`,
        term: term.term,
        definition: term.definition,
        philExample: term.analogy,
        sourceModule: 'careers',
        sourceLesson: lesson.title,
        category: 'Private Equity',
        subcategory: lesson.title,
        difficulty: term.difficulty,
        tags: ['Careers', 'Private Equity', lesson.title],
        icon: '💼',
      });
    });
  });

  return cards;
}

const consultingDifficulty = (level: number): UnifiedFlashcard['difficulty'] => {
  if (level <= 2) return 'beginner';
  if (level <= 4) return 'intermediate';
  return 'advanced';
};

function extractConsultingFlashcards(): UnifiedFlashcard[] {
  const seen = new Set<string>();
  const cards: UnifiedFlashcard[] = [];

  managementConsultingLessons.forEach((lesson) => {
    const levelNum = lesson.level ?? 1;
    // terminology is also a valid source of slugs
    const slugs: string[] = [
      ...(lesson.keyTerms ?? []),
      ...((lesson as { terminology?: string[] }).terminology ?? []),
    ];

    slugs.forEach((slug) => {
      if (seen.has(slug)) return;
      const term = (consultingTerms as Record<string, ConsultingTerm>)[slug];
      if (!term) return;
      seen.add(slug);
      cards.push({
        id: `careers-consulting-${slug}`,
        term: term.term,
        definition: term.definition,
        philExample: term.analogy,
        sourceModule: 'careers',
        sourceLesson: lesson.title,
        category: 'Management Consulting',
        subcategory: lesson.title,
        difficulty: consultingDifficulty(levelNum),
        tags: ['Careers', 'Management Consulting', lesson.title],
        icon: '📊',
      });
    });
  });

  return cards;
}

function extractVCFlashcards(): UnifiedFlashcard[] {
  const cards: UnifiedFlashcard[] = [];
  const levels: [typeof vcTerms.level1, UnifiedFlashcard['difficulty']][] = [
    [vcTerms.level1, 'beginner'],
    [vcTerms.level2, 'intermediate'],
  ];

  levels.forEach(([terms, difficulty]) => {
    terms.forEach((term, i) => {
      cards.push({
        id: `careers-vc-${difficulty}-${i}`,
        term: term.term,
        definition: term.definition,
        philExample: (term as { analogy?: string }).analogy,
        sourceModule: 'careers',
        sourceLesson: 'Venture Capital',
        category: 'Venture Capital',
        subcategory: `VC ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
        difficulty,
        tags: ['Careers', 'Venture Capital'],
        icon: '🚀',
      });
    });
  });

  return cards;
}

function extractInterviewFlashcards(): UnifiedFlashcard[] {
  const cards: UnifiedFlashcard[] = [];
  INTERVIEW_LESSONS.forEach((lesson) => {
    lesson.context.keyTerms.forEach((kt, i) => {
      cards.push({
        id: `careers-interview-${lesson.id}-${i}`,
        term: kt.term,
        definition: kt.definition,
        sourceModule: 'careers',
        sourceLesson: `Interview — ${lesson.title}`,
        category: 'Career Readiness',
        subcategory: lesson.title,
        difficulty: 'beginner',
        tags: ['Careers', 'Interviewing'],
        icon: '🎯',
      });
    });
  });
  return cards;
}

let _cached: UnifiedFlashcard[] | null = null;

export function extractCareersFlashcards(): UnifiedFlashcard[] {
  if (_cached) return _cached;
  _cached = [
    ...extractIBFlashcards(),
    ...extractPEFlashcards(),
    ...extractConsultingFlashcards(),
    ...extractVCFlashcards(),
    ...extractInterviewFlashcards(),
  ];
  return _cached;
}

export function invalidateCareersCache(): void {
  _cached = null;
}
