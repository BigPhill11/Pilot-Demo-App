import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import ReelFeed from '@/components/phils-friends/ReelFeed';
import PhilsFriendsLanding from '@/components/phils-friends/PhilsFriendsLanding';
import PhilsFriendsBrowseSheet from '@/components/phils-friends/PhilsFriendsBrowseSheet';
import { reelPageBg } from '@/components/phils-friends/reel-theme';
import {
  isPhilsFriendsFeedCategory,
  type PhilsFriendsFeedCategory,
} from '@/types/phils-friends';

const PhilsFriendsPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const [browseOpen, setBrowseOpen] = useState(false);
  const categoryParam = searchParams.get('category');
  const feedCategory = isPhilsFriendsFeedCategory(categoryParam)
    ? categoryParam
    : null;

  const feedHeight = useMemo(
    () =>
      isMobile
        ? 'calc(100dvh - 4rem - 5.75rem)'
        : 'calc(100dvh - 4rem - 3rem)',
    [isMobile]
  );

  const goToLanding = () => {
    setSearchParams({});
  };

  const startFeed = (category: PhilsFriendsFeedCategory) => {
    setSearchParams({ category });
  };

  if (!feedCategory) {
    return (
      <div
        className={`relative w-full overflow-y-auto ${reelPageBg}`}
        style={{
          backgroundImage: `radial-gradient(circle at 20% 10%, rgba(34, 197, 94, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 90%, rgba(16, 185, 129, 0.06) 0%, transparent 35%)`,
        }}
      >
        <PhilsFriendsLanding onSelectCategory={startFeed} />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${reelPageBg}`}
      style={{
        backgroundImage: `radial-gradient(circle at 20% 10%, rgba(34, 197, 94, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 80% 90%, rgba(16, 185, 129, 0.06) 0%, transparent 35%)`,
      }}
    >
      <div className="relative" style={{ height: feedHeight }}>
        <ReelFeed
          category={feedCategory}
          feedHeight={feedHeight}
          onBack={goToLanding}
          onBrowseClick={() => setBrowseOpen(true)}
        />
      </div>

      <PhilsFriendsBrowseSheet
        open={browseOpen}
        onOpenChange={setBrowseOpen}
        category={feedCategory}
      />
    </div>
  );
};

export default PhilsFriendsPage;
