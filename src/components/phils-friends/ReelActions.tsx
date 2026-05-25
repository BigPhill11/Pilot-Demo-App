import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bookmark, Share2, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLearnMorePath } from '@/types/phils-friends';
import type { PhilsFriendsVideo } from '@/types/phils-friends';
import { toast } from 'sonner';

interface ReelActionsProps {
  itemId: string;
  video: PhilsFriendsVideo;
  liked: boolean;
  bookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
}

const actionCircle =
  'flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md shadow-md ring-1 ring-green-100 transition-transform active:scale-90';

const ReelActions: React.FC<ReelActionsProps> = ({
  video,
  liked,
  bookmarked,
  onLike,
  onBookmark,
}) => {
  const navigate = useNavigate();

  const handleShare = async () => {
    const title = video.speaker_name || video.title;
    const text = video.description?.slice(0, 120) ?? "Watch on Phil's Friends";
    const url = `${window.location.origin}/phils-friends`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied!');
    } catch {
      toast.error('Could not share');
    }
  };

  const actionBtn =
    'flex flex-col items-center gap-1 min-h-[44px] min-w-[44px] justify-center touch-manipulation';

  return (
    <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-4">
      <button type="button" onClick={onLike} className={actionBtn} aria-label="Like">
        <span
          className={cn(
            actionCircle,
            liked ? 'bg-red-500 text-white ring-red-200' : 'bg-white/95 text-green-800'
          )}
        >
          <Heart className={cn('h-6 w-6', liked && 'fill-current')} />
        </span>
        <span className="text-[10px] font-medium text-green-800">Like</span>
      </button>

      <button type="button" onClick={onBookmark} className={actionBtn} aria-label="Save">
        <span
          className={cn(
            actionCircle,
            bookmarked ? 'bg-primary text-primary-foreground ring-primary/30' : 'bg-white/95 text-green-800'
          )}
        >
          <Bookmark className={cn('h-6 w-6', bookmarked && 'fill-current')} />
        </span>
        <span className="text-[10px] font-medium text-green-800">Save</span>
      </button>

      <button type="button" onClick={handleShare} className={actionBtn} aria-label="Share">
        <span className={cn(actionCircle, 'bg-white/95 text-green-800')}>
          <Share2 className="h-6 w-6" />
        </span>
        <span className="text-[10px] font-medium text-green-800">Share</span>
      </button>

      <button
        type="button"
        onClick={() => navigate(getLearnMorePath(video.course_category))}
        className={actionBtn}
        aria-label="Learn more"
      >
        <span className={cn(actionCircle, 'bg-primary text-primary-foreground ring-primary/30')}>
          <GraduationCap className="h-6 w-6" />
        </span>
        <span className="text-[10px] font-medium text-green-800 text-center max-w-[52px] leading-tight">
          Learn more
        </span>
      </button>
    </div>
  );
};

export default ReelActions;
