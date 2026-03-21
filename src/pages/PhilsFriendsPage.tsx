import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { Search, Play, Plus, Edit, Clock, Users, Filter, Video, Award, Target, Briefcase, Heart, MessageCircle } from 'lucide-react';
import VideoUploadDialog from '@/components/videos/VideoUploadDialog';
import VideoDetailDialog from '@/components/videos/VideoDetailDialog';
import VideoManagementPanel from '@/components/videos/VideoManagementPanel';

// Career Industries
const CAREER_INDUSTRIES = [
  'Asset Management',
  'Investment Banking', 
  'Private Equity',
  'Venture Capital',
  'Hedge Funds',
  'Wealth Management',
  'Other'
];

// Soft Skills Sections
const SOFT_SKILLS_SECTIONS = [
  'Networking Like a Pro',
  'Professional Interviewing Mastery',
  'Business Communication Excellence',
  'Workplace Etiquette',
  'Dress for Success',
  'Working Women Excellence',
  'Black in Business Excellence'
];

// General Video Types
const GENERAL_VIDEO_TYPES = [
  'Stock Market',
  'Personal Finance',
  'Economics',
  'Other'
];

// All Levels
const ALL_LEVELS = [
  'Beginner',
  'Intermediate',
  'Pro'
];

interface Video {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  role_tier: string;
  duration_sec: number;
  thumbnail_url?: string;
  source_type: string;
  source_url?: string;
  published: boolean;
  created_at: string;
  video_url?: string;
  company: string;
  course_category: string;
}

const PhilsFriendsPage: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  // Admin check temporarily disabled - will be reimplemented later
  const isAdmin = false;
  
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('careers');
  const [currentCategory, setCurrentCategory] = useState('');

  const fetchVideos = async (category?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('phils_friends_videos')
        .select('*');

      // Only show published videos to non-admin users
      if (!isAdmin) {
        query = query.eq('published', true);
      }

      // Filter by tab category
      const tabCategory = category || getTabCategory(activeTab);
      if (tabCategory) {
        query = query.eq('course_category', tabCategory);
      }

      // Apply filters
      if (selectedFilter !== 'all') {
        query = query.eq('category', selectedFilter);
      }
      
      if (selectedLevel !== 'all') {
        query = query.eq('role_tier', selectedLevel);
      }

      // Apply search
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'recent':
          query = query.order('created_at', { ascending: false });
          break;
        case 'duration':
          query = query.order('duration_sec', { ascending: true });
          break;
        case 'title':
          query = query.order('title', { ascending: true });
          break;
      }

      const { data, error } = await query;

      if (error) throw error;

      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTabCategory = (tab: string) => {
    switch (tab) {
      case 'careers': return 'careers-in-finance';
      case 'softskills': return 'soft-skills';
      case 'general': return 'general';
      default: return '';
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [selectedFilter, selectedLevel, searchQuery, sortBy, isAdmin, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentCategory(getTabCategory(tab));
    // Reset filters when changing tabs
    setSelectedFilter('all');
    setSelectedLevel('all');
  };

  const getFilterOptions = () => {
    switch (activeTab) {
      case 'careers':
        return CAREER_INDUSTRIES;
      case 'softskills':
        return SOFT_SKILLS_SECTIONS;
      case 'general':
        return GENERAL_VIDEO_TYPES;
      default:
        return [];
    }
  };

  const getFilterLabel = () => {
    switch (activeTab) {
      case 'careers':
        return 'All Industries';
      case 'softskills':
        return 'All Modules';
      case 'general':
        return 'All Types';
      default:
        return 'All Categories';
    }
  };

  const handleAddVideo = () => {
    setCurrentCategory(getTabCategory(activeTab));
    setShowUploadDialog(true);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setShowDetailDialog(true);
  };

  const getRoleTierColor = (tier: string) => {
    const colors = {
      'Intern': 'bg-green-500/10 text-green-700 dark:text-green-300',
      'Analyst': 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
      'Associate': 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
      'Managing Director': 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
      'Professional': 'bg-red-500/10 text-red-700 dark:text-red-300'
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
  };

  const getIndustryColor = (industry: string) => {
    const colors = {
      'Asset Management': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      'Investment Banking': 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
      'Private Equity': 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
      'Venture Capital': 'bg-pink-500/10 text-pink-700 dark:text-pink-300',
      'Hedge Funds': 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
      'Wealth Management': 'bg-teal-500/10 text-teal-700 dark:text-teal-300',
      'Other': 'bg-gray-500/10 text-gray-700 dark:text-gray-300'
    };
    return colors[industry as keyof typeof colors] || 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">Please sign in to access Phil's Friends</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Phil's Friends</h1>
              <p className="text-muted-foreground mt-2">
                Learn from industry experts with exclusive video content and insights
              </p>
            </div>
            {isAdmin && (
              <Button onClick={handleAddVideo} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Video
              </Button>
            )}
          </div>

          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="careers" className="gap-2">
                <Briefcase className="h-4 w-4" />
                Careers in Finance
              </TabsTrigger>
              <TabsTrigger value="softskills" className="gap-2">
                <Heart className="h-4 w-4" />
                Soft Skills
              </TabsTrigger>
              <TabsTrigger value="general" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                General Videos
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48 bg-background border-border">
                <SelectValue placeholder={getFilterLabel()} />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-lg z-50">
                <SelectItem value="all">{getFilterLabel()}</SelectItem>
                {getFilterOptions().map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full md:w-48 bg-background border-border">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-lg z-50">
                <SelectItem value="all">All Levels</SelectItem>
                {ALL_LEVELS.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-32 bg-background border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-lg z-50">
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No videos found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedFilter !== 'all' || selectedLevel !== 'all'
                ? 'Try adjusting your filters to see more content.'
                : 'Check back soon for new content!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Card 
                key={video.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative">
                   <div className="aspect-video bg-muted flex items-center justify-center">
                     {video.thumbnail_url ? (
                       <img 
                         src={video.thumbnail_url} 
                         alt={video.name}
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           const target = e.target as HTMLImageElement;
                           target.style.display = 'none';
                           target.nextElementSibling?.classList.remove('hidden');
                         }}
                       />
                     ) : null}
                     {!video.thumbnail_url && (
                       <Video className="h-12 w-12 text-muted-foreground" />
                     )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration_sec)}
                  </div>
                  {!video.published && isAdmin && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Draft
                    </div>
                  )}
                </div>

                <CardHeader className="p-4">
                  <CardTitle className="text-base line-clamp-2">{video.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary" className={getRoleTierColor(video.role_tier)}>
                      {video.role_tier}
                    </Badge>
                    <Badge variant="outline" className={getIndustryColor(video.category)}>
                      {video.category}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* Admin Management Panel */}
        {isAdmin && (
          <div className="mt-12">
            <VideoManagementPanel onVideoUpdate={fetchVideos} />
          </div>
        )}

        {/* Dialogs */}
        <VideoUploadDialog 
          open={showUploadDialog}
          onOpenChange={setShowUploadDialog}
          onVideoCreated={() => fetchVideos()}
          defaultCategory={currentCategory}
        />

        <VideoDetailDialog
          video={selectedVideo}
          open={showDetailDialog}
          onOpenChange={setShowDetailDialog}
        />
      </div>
    </div>
  );
};

export default PhilsFriendsPage;