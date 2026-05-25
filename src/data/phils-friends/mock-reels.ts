import type { ReelCourseCategory, ReelFeedItem, PhilsFriendsVideo, VideoClip } from '@/types/phils-friends';
import { normalizeCourseCategory } from '@/types/phils-friends';

interface MockReelDef {
  id: string;
  courseCategory: string;
  thumbnail: string;
  speaker: string;
  company: string;
  role: string;
  industry: string;
  title: string;
  excerpt: string;
  durationSec: number;
}

const MOCK_REELS: MockReelDef[] = [
  {
    id: 'mock-pf-1',
    courseCategory: 'personal-finance',
    thumbnail: '/market-intelligence/ownership/time-is-your-ally/hero.png',
    speaker: 'Jordan K.',
    company: 'BrightPath Wealth',
    role: 'Analyst',
    industry: 'Wealth Management',
    title: 'Your first paycheck playbook',
    excerpt: 'I break down what I wish someone told me at 16 about splitting income before spending.',
    durationSec: 58,
  },
  {
    id: 'mock-pf-2',
    courseCategory: 'personal-finance',
    thumbnail: '/market-intelligence/ownership/time-is-your-ally/connect-pf.png',
    speaker: 'Maya Chen',
    company: 'Community Credit Union',
    role: 'Associate',
    industry: 'Other',
    title: 'Credit scores without the scare tactics',
    excerpt: 'Think of your score like a report card lenders peek at — here is what actually moves it.',
    durationSec: 62,
  },
  {
    id: 'mock-pf-3',
    courseCategory: 'personal-finance',
    thumbnail: '/market-intelligence/ownership/the-patience-game/connect-pf.png',
    speaker: 'Devon Ellis',
    company: 'FutureFund Advisors',
    role: 'Intern',
    industry: 'Asset Management',
    title: 'Compound interest in plain English',
    excerpt: 'Snowball vs avalanche is not just debt talk — it is how small habits stack over decades.',
    durationSec: 55,
  },
  {
    id: 'mock-mi-1',
    courseCategory: 'market-intelligence',
    thumbnail: '/market-intelligence/language-finance/balance-sheet-basics/hero.png',
    speaker: 'Priya Nair',
    company: 'Harbor Street Research',
    role: 'Analyst',
    industry: 'Investment Banking',
    title: 'Balance sheet in 60 seconds',
    excerpt: 'Assets, liabilities, equity — I use a lemonade stand so the equation finally clicks.',
    durationSec: 60,
  },
  {
    id: 'mock-mi-2',
    courseCategory: 'market-intelligence',
    thumbnail: '/market-intelligence/language-finance/balance-sheet-basics/connect-career.png',
    speaker: 'Marcus Webb',
    company: 'Summit Equity Partners',
    role: 'Associate',
    industry: 'Private Equity',
    title: 'Why headlines move stock prices',
    excerpt: 'Markets react to surprises, not just good or bad news — here is how I read a headline fast.',
    durationSec: 57,
  },
  {
    id: 'mock-mi-3',
    courseCategory: 'market-intelligence',
    thumbnail: '/market-intelligence/language-finance/income-statement-decoded/hero.png',
    speaker: 'Elena Ruiz',
    company: 'Northline Capital',
    role: 'Professional',
    industry: 'Hedge Funds',
    title: 'Revenue vs profit — know the difference',
    excerpt: 'A company can sell a ton and still lose money. I walk through one real-style example.',
    durationSec: 63,
  },
  {
    id: 'mock-career-1',
    courseCategory: 'careers-in-finance',
    thumbnail: '/market-intelligence/ownership/own-a-piece/hero.png',
    speaker: 'Alex Turner',
    company: 'Riverside Trading',
    role: 'Analyst',
    industry: 'Sales & Trading',
    title: 'What sales & trading actually does',
    excerpt: 'Movies show yelling on a floor — today it is screens, risk limits, and fast decisions.',
    durationSec: 59,
  },
  {
    id: 'mock-career-2',
    courseCategory: 'careers-in-finance',
    thumbnail: '/market-intelligence/ownership/own-a-piece/connect-career.png',
    speaker: 'Samira Okonkwo',
    company: 'Atlas Venture',
    role: 'Associate',
    industry: 'Venture Capital',
    title: 'Day in the life: venture capital',
    excerpt: 'We bet on founders early. My job is pattern-spotting, not memorizing spreadsheets.',
    durationSec: 61,
  },
  {
    id: 'mock-career-3',
    courseCategory: 'careers-in-finance',
    thumbnail: '/market-intelligence/ownership/mistakes-that-matter/connect-career.png',
    speaker: 'Chris Delgado',
    company: 'Metro IB Group',
    role: 'Managing Director',
    industry: 'Investment Banking',
    title: 'How I broke into banking from high school',
    excerpt: 'Clubs, mock interviews, and curiosity mattered more than fancy internships at first.',
    durationSec: 64,
  },
  {
    id: 'mock-ss-1',
    courseCategory: 'soft-skills',
    thumbnail: '/market-intelligence/language-finance/ethics-in-accounting/hero.png',
    speaker: 'Taylor Brooks',
    company: 'Greenline Consulting',
    role: 'Professional',
    industry: 'Other',
    title: 'Interview answers that sound human',
    excerpt: 'Stop memorizing scripts — structure your story so recruiters remember you.',
    durationSec: 56,
  },
  {
    id: 'mock-ss-2',
    courseCategory: 'soft-skills',
    thumbnail: '/market-intelligence/language-finance/ethics-in-accounting/connect-career.png',
    speaker: 'Riley Park',
    company: 'First Impression Coaching',
    role: 'Analyst',
    industry: 'Wealth Management',
    title: 'Networking without being cringe',
    excerpt: 'DMs, alumni chats, and career fairs — small genuine notes beat mass copy-paste.',
    durationSec: 58,
  },
  {
    id: 'mock-ss-3',
    courseCategory: 'soft-skills',
    thumbnail: '/market-intelligence/language-finance/ethics-in-accounting/connect-pf.png',
    speaker: 'Jordan Lee',
    company: 'Campus Leadership Lab',
    role: 'Intern',
    industry: 'Other',
    title: 'Email tone that gets replies',
    excerpt: 'Subject lines, sign-offs, and one clear ask — how I email busy professionals.',
    durationSec: 54,
  },
];

function buildMockItem(def: MockReelDef): ReelFeedItem {
  const videoId = `video-${def.id}`;
  const video: PhilsFriendsVideo = {
    id: videoId,
    title: def.title,
    name: def.speaker,
    description: def.excerpt,
    category: def.industry,
    role_tier: def.role,
    duration_sec: def.durationSec,
    thumbnail_url: def.thumbnail,
    source_type: 'mock',
    source_url: null,
    youtube_url: null,
    video_url: null,
    storage_path: null,
    published: true,
    company: def.company,
    speaker_name: def.speaker,
    course_category: def.courseCategory,
    soft_skills_section: null,
    level: 'Beginner',
  };

  const clip: VideoClip = {
    id: def.id,
    video_id: videoId,
    title: def.title,
    excerpt: def.excerpt,
    start_sec: 0,
    end_sec: def.durationSec,
    clip_order: 0,
    published: true,
    thumbnail_url: def.thumbnail,
  };

  return { type: 'clip', clip, video };
}

export function getMockReelCount(category: ReelCourseCategory): number {
  return getMockReelItems(category).length;
}

export function getMockReelItems(category: ReelCourseCategory): ReelFeedItem[] {
  const filtered =
    category === 'all'
      ? MOCK_REELS
      : MOCK_REELS.filter(
          (d) => normalizeCourseCategory(d.courseCategory) === category
        );

  return filtered.map(buildMockItem);
}

export function isMockReelItem(item: ReelFeedItem): boolean {
  const video = item.type === 'clip' ? item.video : item.video;
  return video.source_type === 'mock';
}
