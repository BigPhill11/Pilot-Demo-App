import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReelFeed } from '@/hooks/useReelFeed';
import { useReelEngagement } from '@/hooks/useReelEngagement';
import { useClipQuiz, useClipQuizSubmit } from '@/hooks/useClipQuiz';
import { PHILS_FRIENDS_REWARDS } from '@/config/philsFriendsRewards';
import type { ReelCourseCategory, ReelFeedItem } from '@/types/phils-friends';
import { getReelItemId } from '@/types/phils-friends';
import { isMockReelItem } from '@/data/phils-friends/mock-reels';
import ReelCard from './ReelCard';
import ReelClipQuiz from './ReelClipQuiz';
import ReelEmptyState from './ReelEmptyState';
import ReelProgressDots from './ReelProgressDots';
import ReelScrollHint, { markReelSwipeHintSeen } from './ReelScrollHint';
import ReelFeedToolbar from './ReelFeedToolbar';
import ReelViewport from './ReelViewport';
import { reelFeedLoading, reelSlideActive, reelSlideInactive, reelSlideOuter } from './reel-theme';

interface ReelFeedProps {
  category: ReelCourseCategory;
  feedHeight: string;
  onBack: () => void;
  onBrowseClick?: () => void;
  onMockFeedChange?: (isMock: boolean) => void;
}

const ReelFeed: React.FC<ReelFeedProps> = ({
  category,
  feedHeight,
  onBack,
  onBrowseClick,
  onMockFeedChange,
}) => {
  const { items, loading, error, isMockFeed } = useReelFeed(category);
  const {
    toggleLike,
    toggleBookmark,
    trackClipComplete,
    awardWatchComplete,
    awardQuizResult,
    isLiked,
    isBookmarked,
  } = useReelEngagement();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const [quizItem, setQuizItem] = useState<ReelFeedItem | null>(null);
  const [quizWatchPercent, setQuizWatchPercent] = useState(0);
  const watchPercentByItemRef = useRef<Record<string, number>>({});

  const clipIdForQuiz =
    quizItem?.type === 'clip' && !isMockReelItem(quizItem) ? quizItem.clip.id : null;
  const { question: quizQuestion, loading: quizLoading } = useClipQuiz(clipIdForQuiz);
  const { submitAnswer, submitting } = useClipQuizSubmit();

  useEffect(() => {
    onMockFeedChange?.(isMockFeed);
  }, [isMockFeed, onMockFeedChange]);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || items.length === 0) return;
    const slideHeight = el.clientHeight;
    if (slideHeight <= 0) return;
    const index = Math.round(el.scrollTop / slideHeight);
    const next = Math.min(Math.max(0, index), items.length - 1);
    setActiveIndex((prev) => {
      if (next > 0 && prev === 0) {
        markReelSwipeHintSeen();
        setHintVisible(false);
      }
      return next;
    });
    setQuizItem(null);
  }, [items.length]);

  useEffect(() => {
    setActiveIndex(0);
    setHintVisible(true);
    setQuizItem(null);
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [category]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      const h = el.clientHeight;
      if (e.key === 'ArrowDown') el.scrollBy({ top: h, behavior: 'smooth' });
      else if (e.key === 'ArrowUp') el.scrollBy({ top: -h, behavior: 'smooth' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleWatchProgress = useCallback((item: ReelFeedItem, percent: number) => {
    const id = getReelItemId(item);
    const prev = watchPercentByItemRef.current[id] ?? 0;
    if (percent > prev) {
      watchPercentByItemRef.current[id] = percent;
    }
  }, []);

  const handleWatchComplete = useCallback(
    async (item: ReelFeedItem) => {
      const itemId = getReelItemId(item);
      const watchPercent = watchPercentByItemRef.current[itemId] ?? 100;

      if (isMockReelItem(item)) {
        await trackClipComplete(item);
        return;
      }

      await awardWatchComplete(item, watchPercent);

      if (item.type === 'clip') {
        setQuizWatchPercent(watchPercent);
        setQuizItem(item);
      } else {
        await trackClipComplete(item);
      }
    },
    [awardWatchComplete, trackClipComplete]
  );

  const handleQuizSubmit = useCallback(
    async (selectedIndex: number) => {
      if (!quizItem || quizItem.type !== 'clip' || !quizQuestion) return;

      await submitAnswer({
        clipId: quizItem.clip.id,
        questionId: quizQuestion.id,
        selectedIndex,
        correctIndex: quizQuestion.correct_index,
        watchPercent: quizWatchPercent,
      });

      await awardQuizResult(
        quizItem,
        selectedIndex === quizQuestion.correct_index,
        quizWatchPercent
      );
    },
    [quizItem, quizQuestion, quizWatchPercent, submitAnswer, awardQuizResult]
  );

  const dismissQuiz = useCallback(() => {
    if (quizItem) {
      trackClipComplete(quizItem);
    }
    setQuizItem(null);
  }, [quizItem, trackClipComplete]);

  if (loading) {
    return (
      <div className="relative" style={{ height: feedHeight }}>
        <ReelFeedToolbar category={category} onBack={onBack} onBrowseClick={onBrowseClick} />
        <div className={reelFeedLoading} style={{ height: feedHeight }}>
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="relative" style={{ height: feedHeight }}>
        <ReelFeedToolbar category={category} onBack={onBack} />
        <div
          className="flex items-center justify-center bg-green-50 px-6 text-center text-sm text-green-800"
          style={{ height: feedHeight }}
        >
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-green-200 max-w-xs">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="relative" style={{ height: feedHeight }}>
        <ReelFeedToolbar category={category} onBack={onBack} />
        <div style={{ height: feedHeight }}>
          <ReelEmptyState category={category} />
        </div>
      </div>
    );
  }

  const showQuizOverlay =
    quizItem &&
    quizItem.type === 'clip' &&
    !quizLoading &&
    quizQuestion &&
    (quizWatchPercent >= PHILS_FRIENDS_REWARDS.minWatchPercentForQuiz ||
      watchPercentByItemRef.current[getReelItemId(quizItem)] >=
        PHILS_FRIENDS_REWARDS.minWatchPercentForQuiz);

  return (
    <div className="relative" style={{ height: feedHeight }}>
      <ReelFeedToolbar
        category={category}
        onBack={onBack}
        onBrowseClick={onBrowseClick}
        showDemoBadge={isMockFeed}
      />

      <ReelProgressDots count={items.length} activeIndex={activeIndex} />

      <ReelScrollHint
        visible={hintVisible && activeIndex === 0}
        onDismiss={() => setHintVisible(false)}
      />

      {showQuizOverlay && quizQuestion && (
        <ReelClipQuiz
          question={quizQuestion}
          onSubmit={handleQuizSubmit}
          onSkip={dismissQuiz}
          submitting={submitting}
        />
      )}

      {quizItem && !quizLoading && !quizQuestion && (
        <div className="absolute bottom-24 left-4 right-4 z-30">
          <button
            type="button"
            onClick={dismissQuiz}
            className="w-full rounded-xl bg-white/95 py-3 text-sm font-semibold text-green-800 shadow-lg ring-1 ring-green-200"
          >
            Continue
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide overscroll-y-contain scroll-smooth"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {items.map((item, index) => {
          const id = getReelItemId(item);
          const isActive = index === activeIndex;
          return (
            <div
              key={id}
              style={{ height: feedHeight }}
              className={cn(
                reelSlideOuter,
                isActive ? reelSlideActive : reelSlideInactive,
                'transition-opacity duration-300'
              )}
            >
              <ReelViewport className="h-full w-full max-w-lg md:max-w-none">
                <ReelCard
                  item={item}
                  isActive={isActive}
                  liked={isLiked(id)}
                  bookmarked={isBookmarked(id)}
                  onLike={() => toggleLike(id)}
                  onBookmark={() => toggleBookmark(id)}
                  onWatchProgress={(pct) => handleWatchProgress(item, pct)}
                  onComplete={() => handleWatchComplete(item)}
                />
              </ReelViewport>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReelFeed;
