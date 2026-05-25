/**
 * Phil's Friends — ingest & export standards for raw interview footage.
 * Use these conventions when uploading via VideoUploadDialog or batch tools.
 */

export const PHILS_FRIENDS_STORAGE_BUCKETS = {
  videos: 'phil-videos',
  thumbnails: 'video-thumbnails',
  transcripts: 'video-transcripts',
} as const;

/** File naming: speaker_topic_YYYYMMDD_takeN */
export function buildIngestFilename(params: {
  speaker: string;
  topic: string;
  date?: string;
  take?: number;
  ext?: string;
}): string {
  const slug = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '')
      .slice(0, 40);
  const date =
    params.date ?? new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const take = params.take != null ? `_take${params.take}` : '';
  const ext = params.ext ?? 'mp4';
  return `${slug(params.speaker)}_${slug(params.topic)}_${date}${take}.${ext}`;
}

export const INGEST_VIDEO_SPECS = {
  /** Full interview archive */
  archive: {
    width: 1920,
    height: 1080,
    maxDurationSec: 25 * 60,
    codecs: ['h264', 'hevc'] as const,
  },
  /** Vertical reel clips (derived or native) */
  reel: {
    width: 1080,
    height: 1920,
    minClipSec: 30,
    maxClipSec: 90,
    targetClipSec: 60,
  },
} as const;

export type ProductionStatus =
  | 'ingested'
  | 'transcribed'
  | 'segmented'
  | 'reviewed'
  | 'published';

export type ClipProductionStatus = 'draft' | 'reviewed' | 'published';

export const PRODUCTION_STATUS_LABELS: Record<ProductionStatus, string> = {
  ingested: 'Ingested',
  transcribed: 'Transcribed',
  segmented: 'Segmented',
  reviewed: 'Reviewed',
  published: 'Published',
};

export const CLIP_STATUS_LABELS: Record<ClipProductionStatus, string> = {
  draft: 'Draft',
  reviewed: 'Reviewed',
  published: 'Published',
};

/** Canonical course_category slugs for feed filters */
export const COURSE_CATEGORY_SLUGS = [
  'personal-finance',
  'market-intelligence',
  'careers-in-finance',
  'soft-skills',
  'general',
] as const;

export type CourseCategorySlug = (typeof COURSE_CATEGORY_SLUGS)[number];

/** Required metadata for a publishable source interview */
export interface IngestVideoMetadata {
  title: string;
  speaker_name: string;
  company: string;
  course_category: CourseCategorySlug;
  role_tier?: string;
  category?: string;
  description?: string;
  duration_sec: number;
  source_type: 'upload' | 'youtube';
  storage_path?: string;
  youtube_url?: string;
}

/** Required fields per derived clip before publish */
export interface IngestClipMetadata {
  title: string;
  excerpt: string;
  start_sec: number;
  end_sec: number;
  clip_order: number;
  feed_category?: CourseCategorySlug;
}

/** Target ratio: 1 interview → 4–6 clips → 4–6 questions */
export const PRODUCTION_TARGETS = {
  clipsPerInterviewMin: 4,
  clipsPerInterviewMax: 6,
  clipDurationMinSec: 30,
  clipDurationMaxSec: 90,
  questionsPerClip: 1,
} as const;
