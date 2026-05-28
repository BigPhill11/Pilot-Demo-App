import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type {
  PhilsFriendsVideo,
  ReelCourseCategory,
  ReelFeedItem,
  VideoClip,
} from '@/types/phils-friends';
import {
  normalizeCourseCategory,
  SHORT_VIDEO_MAX_SEC,
} from '@/types/phils-friends';
import { getMockReelItems } from '@/data/phils-friends/mock-reels';

type ClipRow = VideoClip & {
  phils_friends_videos: PhilsFriendsVideo | null;
};

function getFeedSection(video: PhilsFriendsVideo, clipFeedSection?: string | null): string {
  return normalizeCourseCategory(clipFeedSection ?? video.feed_section ?? video.course_category);
}

function matchesCategory(
  video: PhilsFriendsVideo,
  category: ReelCourseCategory,
  clipFeedSection?: string | null
): boolean {
  if (category === 'all') return true;
  return getFeedSection(video, clipFeedSection) === category;
}

function sortClips(a: VideoClip, b: VideoClip): number {
  const orderA = a.clip_order ?? 999;
  const orderB = b.clip_order ?? 999;
  if (orderA !== orderB) return orderA - orderB;
  return 0;
}

export function useReelFeed(category: ReelCourseCategory) {
  const [items, setItems] = useState<ReelFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockFeed, setIsMockFeed] = useState(false);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: clipRows, error: clipsError } = await supabase
        .from('video_clips')
        .select(
          `
          id,
          video_id,
          title,
          excerpt,
          start_sec,
          end_sec,
          clip_order,
          published,
          feed_section,
          thumbnail_url,
          phils_friends_videos (
            id,
            title,
            name,
            description,
            category,
            role_tier,
            duration_sec,
            thumbnail_url,
            source_type,
            source_url,
            youtube_url,
            video_url,
            storage_path,
            published,
            company,
            speaker_name,
            feed_section,
            course_category,
            soft_skills_section,
            level
          )
        `
        )
        .eq('published', true)
        .order('clip_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (clipsError) throw clipsError;

      const clipItems: ReelFeedItem[] = [];
      const videoIdsWithClips = new Set<string>();

      for (const row of (clipRows || []) as ClipRow[]) {
        const video = row.phils_friends_videos;
        if (!video) continue;
        if (!matchesCategory(video, category, row.feed_section)) continue;

        videoIdsWithClips.add(video.id);
        const clip: VideoClip = {
          id: row.id,
          video_id: row.video_id,
          title: row.title,
          excerpt: row.excerpt,
          start_sec: Number(row.start_sec),
          end_sec: Number(row.end_sec),
          clip_order: row.clip_order,
          published: row.published,
          thumbnail_url: row.thumbnail_url,
          feed_section: row.feed_section,
        };
        clipItems.push({ type: 'clip', clip, video });
      }

      clipItems.sort((a, b) => {
        if (a.type !== 'clip' || b.type !== 'clip') return 0;
        return sortClips(a.clip, b.clip);
      });

      const videoQuery = supabase
        .from('phils_friends_videos')
        .select(
          `
          id,
          title,
          name,
          description,
          category,
          role_tier,
          duration_sec,
          thumbnail_url,
          source_type,
          source_url,
          youtube_url,
          video_url,
          storage_path,
          published,
          company,
          speaker_name,
          feed_section,
          course_category,
          soft_skills_section,
          level
        `
        )
        .eq('published', true)
        .lte('duration_sec', SHORT_VIDEO_MAX_SEC)
        .order('created_at', { ascending: false });

      const { data: shortVideos, error: videosError } = await videoQuery;
      if (videosError) throw videosError;

      const shortItems: ReelFeedItem[] = (shortVideos || [])
        .filter((v) => {
          const video = v as PhilsFriendsVideo;
          if (videoIdsWithClips.has(video.id)) return false;
          if (!matchesCategory(video, category)) return false;
          const dur = video.duration_sec ?? 0;
          return dur > 0 && dur <= SHORT_VIDEO_MAX_SEC;
        })
        .map((video) => ({
          type: 'short_video' as const,
          video: video as PhilsFriendsVideo,
        }));

      const live = [...clipItems, ...shortItems];
      if (live.length > 0) {
        setItems(live);
        setIsMockFeed(false);
      } else {
        setItems(getMockReelItems(category));
        setIsMockFeed(true);
      }
    } catch (e) {
      console.error('useReelFeed:', e);
      setError('Could not load videos. Try again soon.');
      setItems(getMockReelItems(category));
      setIsMockFeed(true);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return { items, loading, error, isMockFeed, refetch: fetchFeed };
}
