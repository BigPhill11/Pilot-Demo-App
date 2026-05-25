/**
 * UnifiedCategoryBrowser — Section/lesson picker for the Flashcards hub.
 *
 * Sections: Personal Finance (always open) | Markets | Careers & Finance
 *  - Markets + Careers show per-subcategory unlock status; locked decks show
 *    a "Complete [Lesson] to unlock" overlay instead of a "Coming Soon" wall.
 */

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  getAllUnifiedFlashcards,
  type UnifiedFlashcard,
} from '@/data/unified-flashcards';
import {
  getSubcategoryUnlockStatus,
  getAvailableFlashcards,
} from '@/data/flashcards/flashcardUnlockStore';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  BookOpen,
  Briefcase,
  TrendingUp,
  ChevronLeft,
  Play,
  ChevronRight,
  Lock,
  Star,
  Sparkles,
} from 'lucide-react';

interface UnifiedCategoryBrowserProps {
  onSelectCards: (cards: UnifiedFlashcard[], title: string) => void;
}

type SourceType = 'personal-finance' | 'market-intelligence' | 'careers';
type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

// ── Bamboo-leaf colour palette ────────────────────────────────────────────────
const SECTION_STYLES: Record<
  SourceType,
  {
    gradient: string;
    border: string;
    badge: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  }
> = {
  'personal-finance': {
    gradient: 'from-emerald-500/20 to-teal-400/10',
    border: 'border-emerald-400/50 hover:border-emerald-500',
    badge: 'bg-emerald-600 text-white',
    icon: <BookOpen className="h-8 w-8 text-emerald-700" />,
    title: 'Personal Finance',
    description: 'Budgeting, saving, investing and credit fundamentals',
  },
  'market-intelligence': {
    gradient: 'from-teal-500/20 to-cyan-400/10',
    border: 'border-teal-400/50 hover:border-teal-500',
    badge: 'bg-teal-600 text-white',
    icon: <TrendingUp className="h-8 w-8 text-teal-700" />,
    title: 'Markets',
    description: 'Stocks, earnings, financial statements and market moves',
  },
  careers: {
    gradient: 'from-amber-400/20 to-yellow-300/10',
    border: 'border-amber-400/50 hover:border-amber-500',
    badge: 'bg-amber-600 text-white',
    icon: <Briefcase className="h-8 w-8 text-amber-700" />,
    title: 'Careers & Finance',
    description: 'Investment banking, PE, consulting and interview prep',
  },
};

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'bg-emerald-500 text-white',
  intermediate: 'bg-yellow-500 text-white',
  advanced: 'bg-red-500 text-white',
};

const SECTION_ORDER: SourceType[] = [
  'personal-finance',
  'market-intelligence',
  'careers',
];

// ── Component ─────────────────────────────────────────────────────────────────
const UnifiedCategoryBrowser: React.FC<UnifiedCategoryBrowserProps> = ({
  onSelectCards,
}) => {
  const isMobile = useIsMobile();
  const [selectedSource, setSelectedSource] = useState<SourceType | null>(null);
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>('all');

  const allCards = useMemo(() => getAllUnifiedFlashcards(), []);

  // Per-section summary stats (total + unlocked counts)
  const sectionStats = useMemo(() => {
    const out: Record<
      SourceType,
      { total: number; unlocked: number; difficulties: Record<string, number> }
    > = {
      'personal-finance': { total: 0, unlocked: 0, difficulties: {} },
      'market-intelligence': { total: 0, unlocked: 0, difficulties: {} },
      careers: { total: 0, unlocked: 0, difficulties: {} },
    };

    SECTION_ORDER.forEach((src) => {
      const all = allCards.filter((c) => c.sourceModule === src);
      const available =
        src === 'personal-finance'
          ? all
          : getAvailableFlashcards(src, allCards);
      out[src].total = all.length;
      out[src].unlocked = available.length;
      available.forEach((c) => {
        out[src].difficulties[c.difficulty] =
          (out[src].difficulties[c.difficulty] ?? 0) + 1;
      });
    });

    return out;
  }, [allCards]);

  // Featured deck: Investing sub-category in PF
  const featuredDeck = useMemo(() => {
    const cards = allCards.filter(
      (c) =>
        c.sourceModule === 'personal-finance' && c.category === 'Investing'
    );
    if (cards.length > 0)
      return { title: 'Investing', icon: '📈', cards };
    const pf = allCards.filter((c) => c.sourceModule === 'personal-finance');
    if (pf.length > 0) {
      const cat = pf[0].category;
      return { title: cat, icon: pf[0].icon, cards: pf.filter((c) => c.category === cat) };
    }
    return null;
  }, [allCards]);

  // Subcategory list for the selected section
  const subcategoryStatuses = useMemo(() => {
    if (!selectedSource) return [];

    if (selectedSource === 'personal-finance') {
      const map = new Map<string, UnifiedFlashcard[]>();
      let cards = allCards.filter((c) => c.sourceModule === 'personal-finance');
      if (difficultyFilter !== 'all')
        cards = cards.filter((c) => c.difficulty === difficultyFilter);
      cards.forEach((c) => {
        const key = c.subcategory ?? c.category;
        map.set(key, [...(map.get(key) ?? []), c]);
      });
      return [...map.entries()].map(([sub, cards]) => ({
        subcategory: sub,
        cards,
        unlocked: true,
        unlockCta: '',
      }));
    }

    // Markets or Careers: use unlock store
    const unlockStatuses = getSubcategoryUnlockStatus(selectedSource, allCards);
    if (difficultyFilter === 'all') return unlockStatuses;
    return unlockStatuses.map((s) => ({
      ...s,
      cards: s.cards.filter((c) => c.difficulty === difficultyFilter),
    }));
  }, [selectedSource, allCards, difficultyFilter]);

  // ── Main section picker ──────────────────────────────────────────────────
  if (!selectedSource) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-1">Flashcards</h2>
          <p className="text-muted-foreground text-sm">
            Choose a section — swipe right to master, swipe left to review later
          </p>
        </div>

        {/* Featured Deck Spotlight */}
        {featuredDeck && (
          <div
            className="rounded-2xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-50 via-yellow-50 to-emerald-50 dark:from-amber-950/30 dark:to-emerald-950/30 shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer p-5"
            onClick={() => onSelectCards(featuredDeck.cards, featuredDeck.title)}
          >
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="text-5xl">{featuredDeck.icon}</div>
                <Star className="h-5 w-5 absolute -top-1 -right-1 text-amber-500 fill-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] uppercase tracking-wide">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Featured Deck
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {featuredDeck.cards.length} cards
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {featuredDeck.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Compound interest, asset allocation, and the concepts that
                  quietly do the heaviest lifting.
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
            </div>
          </div>
        )}

        {/* Section tiles */}
        <div className="space-y-4">
          {SECTION_ORDER.map((src) => {
            const style = SECTION_STYLES[src];
            const stats = sectionStats[src];
            const isPF = src === 'personal-finance';
            const hasAny = stats.total > 0;

            return (
              <div
                key={src}
                role="button"
                tabIndex={0}
                className={`rounded-2xl border-2 ${style.border} bg-gradient-to-r ${style.gradient} p-5 cursor-pointer hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200`}
                onClick={() => setSelectedSource(src)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedSource(src)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-background/50 backdrop-blur shrink-0">
                    {style.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {style.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {style.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {isPF ? (
                        <Badge className={style.badge}>
                          {stats.total} cards
                        </Badge>
                      ) : (
                        <>
                          {stats.unlocked > 0 ? (
                            <Badge className={style.badge}>
                              {stats.unlocked} unlocked
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-muted-foreground"
                            >
                              <Lock className="h-3 w-3 mr-1" />
                              Complete lessons to unlock
                            </Badge>
                          )}
                          {hasAny && (
                            <Badge variant="secondary" className="text-xs">
                              {stats.total} total
                            </Badge>
                          )}
                        </>
                      )}
                      {Object.entries(stats.difficulties).map(([diff, count]) =>
                        count > 0 ? (
                          <Badge
                            key={diff}
                            className={`text-[10px] ${DIFFICULTY_COLOR[diff] ?? 'bg-muted'}`}
                          >
                            {count}
                          </Badge>
                        ) : null
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Study All PF shortcut */}
        {sectionStats['personal-finance'].total > 0 && (
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-400/5 border-2 border-emerald-400/30 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-emerald-600" />
              <div>
                <h3 className="font-bold">Study All Personal Finance</h3>
                <p className="text-sm text-muted-foreground">
                  {sectionStats['personal-finance'].total} cards
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() =>
                onSelectCards(
                  allCards.filter((c) => c.sourceModule === 'personal-finance'),
                  'Personal Finance'
                )
              }
            >
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          </div>
        )}
      </div>
    );
  }

  // ── Subcategory / lesson deck view ────────────────────────────────────────
  const style = SECTION_STYLES[selectedSource];
  const isPF = selectedSource === 'personal-finance';
  const unlockedSubcats = subcategoryStatuses.filter((s) => s.unlocked);
  const totalUnlocked = unlockedSubcats.reduce(
    (sum, s) => sum + s.cards.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedSource(null)}
          className="shrink-0"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {style.icon}
          <h2 className="text-xl font-bold text-foreground truncate">
            {style.title}
          </h2>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground self-center">Level:</span>
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(
          (diff) => (
            <Badge
              key={diff}
              variant={difficultyFilter === diff ? 'default' : 'outline'}
              className={`cursor-pointer transition-all ${
                difficultyFilter === diff
                  ? diff === 'beginner'
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : diff === 'intermediate'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : diff === 'advanced'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                  : 'hover:bg-muted'
              }`}
              onClick={() => setDifficultyFilter(diff)}
            >
              {diff === 'all'
                ? 'All Levels'
                : diff.charAt(0).toUpperCase() + diff.slice(1)}
            </Badge>
          )
        )}
      </div>

      {/* Study All unlocked */}
      {totalUnlocked > 0 && (
        <div
          className={`rounded-2xl border-2 bg-gradient-to-r ${style.gradient} ${style.border.replace('hover:', '')} p-4 flex items-center justify-between`}
        >
          <div>
            <h3 className="font-semibold">
              Study All Unlocked ({totalUnlocked} cards)
            </h3>
            <p className="text-sm text-muted-foreground">{style.title}</p>
          </div>
          <Button
            onClick={() =>
              onSelectCards(
                unlockedSubcats.flatMap((s) => s.cards),
                style.title
              )
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
        </div>
      )}

      {/* Deck tiles */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        {subcategoryStatuses.map((status) => {
          const isLocked = !status.unlocked;

          return (
            <div
              key={status.subcategory}
              role={isLocked ? 'listitem' : 'button'}
              tabIndex={isLocked ? -1 : 0}
              onClick={() => {
                if (!isLocked && status.cards.length > 0) {
                  onSelectCards(status.cards, status.subcategory);
                }
              }}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !isLocked &&
                  status.cards.length > 0
                ) {
                  onSelectCards(status.cards, status.subcategory);
                }
              }}
              className={`relative rounded-2xl border-2 p-4 transition-all duration-200 ${
                isLocked
                  ? 'border-border bg-muted/30 opacity-60 cursor-default'
                  : 'border-emerald-300/50 bg-white dark:bg-card hover:border-emerald-400 hover:shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isLocked && (
                <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] z-10 p-3 text-center">
                  <Lock className="h-6 w-6 text-muted-foreground mb-2" />
                  <p className="text-xs font-medium text-muted-foreground line-clamp-2">
                    {status.unlockCta}
                  </p>
                </div>
              )}

              {/* Tile content */}
              <div className="flex items-start justify-between mb-2">
                <div className="text-2xl">
                  {status.cards[0]?.icon ?? '📚'}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {isLocked ? `${status.cards.length} cards` : `${status.cards.length} cards`}
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                {status.subcategory}
              </h3>
              {!isPF && !isLocked && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map(
                    (diff) => {
                      const count = status.cards.filter(
                        (c) => c.difficulty === diff
                      ).length;
                      if (count === 0) return null;
                      return (
                        <Badge
                          key={diff}
                          className={`text-[10px] ${DIFFICULTY_COLOR[diff]}`}
                        >
                          {count} {diff.charAt(0).toUpperCase()}
                        </Badge>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {subcategoryStatuses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {isPF ? (
            <>
              <p>No cards match your filter.</p>
              <Button variant="link" onClick={() => setDifficultyFilter('all')}>
                Clear filter
              </Button>
            </>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-emerald-300/40 p-8">
              <Lock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-2">
                No decks unlocked yet
              </p>
              <p className="text-sm">
                Complete {style.title} lessons to unlock flashcard decks.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UnifiedCategoryBrowser;
