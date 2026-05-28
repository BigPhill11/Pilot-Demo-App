export interface YoutubeTranscriptSegment {
  start: number;
  end: number;
  text: string;
}

const decodeEntities = (value: string): string =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

export function extractYoutubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#/]+)/,
    /youtube\.com\/embed\/([^&\n?#/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

function parseTrackAttributes(track: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const [, key, rawValue] of track.matchAll(/([\w-]+)="([^"]*)"/g)) {
    attrs[key] = decodeEntities(rawValue);
  }
  return attrs;
}

function pickCaptionTrack(listXml: string): Record<string, string> | null {
  const tracks = [...listXml.matchAll(/<track\b[^>]*>/g)].map((match) =>
    parseTrackAttributes(match[0])
  );

  if (!tracks.length) return null;

  return (
    tracks.find((track) => track.lang_code === 'en' && !track.kind) ??
    tracks.find((track) => track.lang_code?.startsWith('en')) ??
    tracks.find((track) => !track.kind) ??
    tracks[0]
  );
}

export async function fetchYoutubeTranscript(
  youtubeUrl: string
): Promise<{ text: string; segments: YoutubeTranscriptSegment[] }> {
  const videoId = extractYoutubeVideoId(youtubeUrl);
  if (!videoId) {
    throw new Error('Could not find a YouTube video ID in the URL.');
  }

  const listUrl = `https://video.google.com/timedtext?type=list&v=${encodeURIComponent(videoId)}`;
  const listResponse = await fetch(listUrl);
  if (!listResponse.ok) {
    throw new Error(`Could not fetch YouTube caption tracks: ${listResponse.status}`);
  }

  const track = pickCaptionTrack(await listResponse.text());
  if (!track?.lang_code) {
    throw new Error('This YouTube video does not expose captions that can be clipped automatically.');
  }

  const captionUrl = new URL('https://video.google.com/timedtext');
  captionUrl.searchParams.set('v', videoId);
  captionUrl.searchParams.set('lang', track.lang_code);
  captionUrl.searchParams.set('fmt', 'json3');
  if (track.name) captionUrl.searchParams.set('name', track.name);
  if (track.kind) captionUrl.searchParams.set('kind', track.kind);

  const captionResponse = await fetch(captionUrl.toString());
  if (!captionResponse.ok) {
    throw new Error(`Could not fetch YouTube captions: ${captionResponse.status}`);
  }

  const data = await captionResponse.json();
  const segments: YoutubeTranscriptSegment[] = (data.events ?? [])
    .filter((event: { segs?: { utf8?: string }[]; tStartMs?: number; dDurationMs?: number }) =>
      Array.isArray(event.segs) && typeof event.tStartMs === 'number'
    )
    .map((event: { segs: { utf8?: string }[]; tStartMs: number; dDurationMs?: number }) => {
      const text = event.segs.map((seg) => seg.utf8 ?? '').join('').replace(/\s+/g, ' ').trim();
      const start = event.tStartMs / 1000;
      const duration = (event.dDurationMs ?? 2500) / 1000;
      return { start, end: start + duration, text };
    })
    .filter((segment) => segment.text.length > 0);

  if (!segments.length) {
    throw new Error('YouTube captions were found, but no transcript text was returned.');
  }

  return {
    text: segments.map((segment) => segment.text).join(' '),
    segments,
  };
}
