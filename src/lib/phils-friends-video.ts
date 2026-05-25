import { supabase } from '@/integrations/supabase/client';
import type { PhilsFriendsVideo } from '@/types/phils-friends';

export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function resolveVideoPlayback(
  video: PhilsFriendsVideo
): { kind: 'youtube'; embedUrl: string } | { kind: 'html5'; url: string } | null {
  if (video.source_type === 'mock') return null;

  const youtubeSource = video.source_url || video.youtube_url || '';
  if (video.source_type === 'youtube' && youtubeSource) {
    const videoId = extractYouTubeVideoId(youtubeSource);
    if (videoId) {
      return {
        kind: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1`,
      };
    }
  }

  if (video.storage_path) {
    const { data } = supabase.storage.from('phil-videos').getPublicUrl(video.storage_path);
    if (data.publicUrl) return { kind: 'html5', url: data.publicUrl };
  }

  if (video.video_url) {
    return { kind: 'html5', url: video.video_url };
  }

  if (video.source_url && video.source_type !== 'youtube') {
    return { kind: 'html5', url: video.source_url };
  }

  return null;
}

export function buildYoutubeEmbedWithSegment(
  baseEmbedUrl: string,
  startSec: number,
  endSec?: number
): string {
  const url = new URL(baseEmbedUrl.split('?')[0]);
  url.searchParams.set('playsinline', '1');
  url.searchParams.set('rel', '0');
  url.searchParams.set('modestbranding', '1');
  url.searchParams.set('enablejsapi', '1');
  url.searchParams.set('start', String(Math.floor(startSec)));
  if (endSec != null && endSec > startSec) {
    url.searchParams.set('end', String(Math.floor(endSec)));
  }
  return url.toString();
}
