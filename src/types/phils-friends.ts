export type ReelCourseCategory =
  | 'all'
  | 'personal-finance'
  | 'market-intelligence'
  | 'careers-in-finance'
  | 'general';

export interface PhilsFriendsVideo {
  id: string;
  title: string;
  name: string | null;
  description: string | null;
  category: string | null;
  role_tier: string | null;
  duration_sec: number | null;
  thumbnail_url: string | null;
  /** `mock` = placeholder image card (no playback URL) */
  source_type: string | null;
  source_url: string | null;
  youtube_url: string | null;
  video_url: string | null;
  storage_path: string | null;
  published: boolean | null;
  company: string | null;
  speaker_name: string | null;
  course_category: string | null;
  soft_skills_section: string | null;
  level: string | null;
}

export interface VideoClip {
  id: string;
  video_id: string;
  title: string;
  excerpt: string | null;
  start_sec: number;
  end_sec: number;
  clip_order: number | null;
  published: boolean | null;
  thumbnail_url: string | null;
}

export type ReelFeedItem =
  | { type: 'clip'; clip: VideoClip; video: PhilsFriendsVideo }
  | { type: 'short_video'; video: PhilsFriendsVideo };

export const REEL_CATEGORIES: {
  id: ReelCourseCategory;
  label: string;
  courseCategory: string | null;
}[] = [
  { id: 'all', label: 'All', courseCategory: null },
  { id: 'personal-finance', label: 'Personal Finance', courseCategory: 'personal-finance' },
  { id: 'market-intelligence', label: 'Market Intel', courseCategory: 'market-intelligence' },
  { id: 'careers-in-finance', label: 'Careers', courseCategory: 'careers-in-finance' },
];

/** Categories users pick on the landing page (no "All") */
export const PHILS_FRIENDS_LANDING_CATEGORIES = REEL_CATEGORIES.filter((c) => c.id !== 'all');

export type PhilsFriendsFeedCategory = Exclude<ReelCourseCategory, 'all' | 'general'>;

const FEED_CATEGORY_IDS: PhilsFriendsFeedCategory[] = [
  'personal-finance',
  'market-intelligence',
  'careers-in-finance',
];

export function isPhilsFriendsFeedCategory(
  value: string | null | undefined
): value is PhilsFriendsFeedCategory {
  return !!value && (FEED_CATEGORY_IDS as string[]).includes(value);
}

export function getReelCategoryLabel(id: ReelCourseCategory): string {
  return REEL_CATEGORIES.find((c) => c.id === id)?.label ?? 'Clips';
}

/** Map legacy/general DB values to canonical course_category */
export function normalizeCourseCategory(raw: string | null | undefined): string {
  if (!raw) return 'general';
  const lower = raw.toLowerCase().trim();
  if (lower === 'careers' || lower === 'careers-in-finance') return 'careers-in-finance';
  if (lower === 'personal finance' || lower === 'personal-finance') return 'personal-finance';
  if (lower === 'market intelligence' || lower === 'market-intelligence' || lower === 'companies')
    return 'market-intelligence';
  return lower;
}

export function getLearnMorePath(courseCategory: string | null | undefined): string {
  const cat = normalizeCourseCategory(courseCategory);
  switch (cat) {
    case 'personal-finance':
      return '/learn?tab=personal-finance';
    case 'market-intelligence':
      return '/learn?tab=companies';
    case 'careers-in-finance':
      return '/learn?tab=careers';
    default:
      return '/learn';
  }
}

export function getReelItemId(item: ReelFeedItem): string {
  return item.type === 'clip' ? `clip-${item.clip.id}` : `video-${item.video.id}`;
}

export const SHORT_VIDEO_MAX_SEC = 90;

export type ProductionStatus =
  | 'ingested'
  | 'transcribed'
  | 'segmented'
  | 'reviewed'
  | 'published';

export type ClipProductionStatus = 'draft' | 'reviewed' | 'published';

export interface ClipQuizQuestion {
  id: string;
  clip_id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
  difficulty: string | null;
  published: boolean | null;
}

export interface ClipQuizAttempt {
  id: string;
  clip_id: string;
  question_id: string;
  selected_index: number;
  is_correct: boolean;
  watch_percent: number | null;
  answered_at: string;
}

/** Clip row with optional production fields */
export interface VideoClipExtended extends VideoClip {
  production_status?: ClipProductionStatus | null;
  feed_category?: string | null;
  speaker_display_name?: string | null;
  learn_more_path?: string | null;
}
