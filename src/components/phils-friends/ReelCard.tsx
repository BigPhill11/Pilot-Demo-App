import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReelFeedItem } from '@/types/phils-friends';
import { getReelItemId } from '@/types/phils-friends';
import { isMockReelItem } from '@/data/phils-friends/mock-reels';
import {
  buildYoutubeEmbedWithSegment,
  resolveVideoPlayback,
} from '@/lib/phils-friends-video';
import ReelOverlay from './ReelOverlay';
import ReelActions from './ReelActions';

interface ReelCardProps {
  item: ReelFeedItem;
  isActive: boolean;
  liked: boolean;
  bookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  /** 0–100 watch progress for quiz unlock */
  onWatchProgress?: (percent: number) => void;
  onComplete: () => void;
}

const MOCK_AUTO_ADVANCE_MS = 8000;

const ReelCard: React.FC<ReelCardProps> = ({
  item,
  isActive,
  liked,
  bookmarked,
  onLike,
  onBookmark,
  onWatchProgress,
  onComplete,
}) => {
  const video = item.type === 'clip' ? item.video : item.video;
  const startSec = item.type === 'clip' ? item.clip.start_sec : 0;
  const endSec =
    item.type === 'clip'
      ? item.clip.end_sec
      : video.duration_sec ?? undefined;

  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [showPlayHint, setShowPlayHint] = useState(true);

  const isMock = isMockReelItem(item);
  const playback = resolveVideoPlayback(video);
  const itemId = getReelItemId(item);
  const poster = item.type === 'clip' ? item.clip.thumbnail_url : video.thumbnail_url;
  const isPlaceholder = isMock || (!playback && !!poster);

  const youtubeSrc =
    playback?.kind === 'youtube'
      ? buildYoutubeEmbedWithSegment(playback.embedUrl, startSec, endSec)
      : null;

  useEffect(() => {
    completedRef.current = false;
    setShowPlayHint(true);
    setPlaying(false);
  }, [itemId]);

  useEffect(() => {
    if (!isActive || playback?.kind !== 'youtube' || completedRef.current) return;

    const duration =
      item.type === 'clip'
        ? (item.clip.end_sec - item.clip.start_sec) * 1000
        : (video.duration_sec ?? 60) * 1000;

    const timer = window.setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, Math.max(duration, 5000));

    return () => window.clearTimeout(timer);
  }, [isActive, playback?.kind, item, video.duration_sec, onComplete, itemId]);

  useEffect(() => {
    if (!isActive || !isPlaceholder || completedRef.current) return;

    const timer = window.setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, MOCK_AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [isActive, isPlaceholder, onComplete, itemId]);

  useEffect(() => {
    if (isActive && isPlaceholder) {
      setPlaying(true);
      setShowPlayHint(false);
    }
  }, [isActive, isPlaceholder]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || playback?.kind !== 'html5') return;

    if (isActive) {
      el.currentTime = startSec;
      el.muted = muted;
      el.play()
        .then(() => {
          setPlaying(true);
          setShowPlayHint(false);
        })
        .catch(() => {
          setPlaying(false);
          setShowPlayHint(true);
        });
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [isActive, muted, playback?.kind, startSec, itemId]);

  const reportWatchPercent = useCallback(
    (currentSec: number, totalSec: number) => {
      if (!onWatchProgress || totalSec <= 0) return;
      const pct = Math.min(100, Math.round((currentSec / totalSec) * 100));
      onWatchProgress(pct);
    },
    [onWatchProgress]
  );

  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || !isActive) return;

    const clipDur =
      item.type === 'clip'
        ? item.clip.end_sec - item.clip.start_sec
        : video.duration_sec ?? el.duration;
    const watched =
      item.type === 'clip'
        ? Math.max(0, el.currentTime - startSec)
        : el.currentTime;
    reportWatchPercent(watched, clipDur);

    if (endSec != null && el.currentTime >= endSec - 0.25) {
      el.pause();
      el.currentTime = startSec;
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    } else if (
      item.type === 'short_video' &&
      video.duration_sec &&
      el.currentTime / video.duration_sec >= 0.9 &&
      !completedRef.current
    ) {
      completedRef.current = true;
      onComplete();
    }
  }, [
    isActive,
    endSec,
    startSec,
    onComplete,
    item.type,
    item,
    video.duration_sec,
    reportWatchPercent,
  ]);

  const togglePlay = () => {
    if (isPlaceholder) {
      setPlaying((p) => {
        const next = !p;
        setShowPlayHint(!next);
        return next;
      });
      return;
    }

    const el = videoRef.current;
    if (!el) return;

    if (playing) {
      el.pause();
      setPlaying(false);
      setShowPlayHint(true);
    } else {
      el.muted = muted;
      el.play()
        .then(() => {
          setPlaying(true);
          setShowPlayHint(false);
        })
        .catch(() => setShowPlayHint(true));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  return (
    <section
      className="relative h-full w-full min-h-0 bg-green-50 overflow-hidden"
      aria-label={video.title}
    >
      {isPlaceholder && poster && (
        <>
          <img
            src={poster}
            alt=""
            className={cn(
              'absolute inset-0 h-full w-full object-cover object-center',
              isActive && playing && 'animate-reel-ken-burns'
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40 pointer-events-none" />
          {isMock && (
            <span className="absolute top-14 left-3 z-20 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary shadow-sm ring-1 ring-green-200">
              Preview
            </span>
          )}
        </>
      )}

      {playback?.kind === 'html5' && (
        <video
          ref={videoRef}
          src={playback.url}
          className="absolute inset-0 h-full w-full object-cover object-center"
          playsInline
          muted={muted}
          loop={item.type === 'clip'}
          poster={poster ?? undefined}
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
        />
      )}

      {playback?.kind === 'youtube' && isActive && youtubeSrc && (
        <iframe
          key={`${itemId}-${isActive}`}
          src={youtubeSrc}
          title={video.title}
          className="absolute inset-0 h-full w-full pointer-events-none object-cover"
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      {playback?.kind === 'youtube' && !isActive && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-green-100"
          style={{
            backgroundImage: poster ? `url(${poster})` : undefined,
          }}
        />
      )}

      {!playback && !poster && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-100 text-green-700/70 text-sm px-8 text-center">
          Video unavailable
        </div>
      )}

      <div
        className="absolute inset-0 z-[5]"
        onClick={togglePlay}
        role="presentation"
      />

      {showPlayHint && isActive && (playback || isPlaceholder) && (
        <div className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none">
          <span
            className={cn(
              'rounded-full p-4 shadow-lg ring-2 ring-green-200/80',
              playing && isPlaceholder ? 'bg-primary/20 animate-pulse' : 'bg-white/95'
            )}
          >
            <Play
              className={cn(
                'h-12 w-12 fill-current',
                playing && isPlaceholder ? 'text-primary' : 'text-primary'
              )}
            />
          </span>
        </div>
      )}

      {playback?.kind === 'html5' && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute top-14 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-green-800 shadow-md ring-1 ring-green-100"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}

      <ReelOverlay item={item} />
      <ReelActions
        itemId={itemId}
        video={video}
        liked={liked}
        bookmarked={bookmarked}
        onLike={onLike}
        onBookmark={onBookmark}
      />
    </section>
  );
};

export default ReelCard;
