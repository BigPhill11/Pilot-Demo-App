
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Play, 
  Clock, 
  Eye, 
  MessageCircle,
  User,
  Award
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import VideoModal from './VideoModal';

interface TradingVideo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string | null;
  instructor_name: string;
  instructor_bio: string | null;
  instructor_credentials: string | null;
  topic_category: string;
  difficulty_level: string;
  duration: number | null;
  view_count: number;
  created_at: string;
}

interface VideoRating {
  avg_clarity: number;
  avg_usefulness: number;
  avg_entertainment: number;
  avg_difficulty: number;
  avg_overall: number;
  total_ratings: number;
}

interface TradingVideoListProps {
  searchTerm: string;
  selectedCategory: string;
  selectedDifficulty: string;
}

const TradingVideoList: React.FC<TradingVideoListProps> = ({
  searchTerm,
  selectedCategory,
  selectedDifficulty
}) => {
  const [videos, setVideos] = useState<TradingVideo[]>([]);
  const [ratings, setRatings] = useState<Record<string, VideoRating>>({});
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<TradingVideo | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchVideos();
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const fetchVideos = async () => {
    try {
      let query = supabase
        .from('trading_videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('topic_category', selectedCategory);
      }

      if (selectedDifficulty !== 'all') {
        query = query.eq('difficulty_level', selectedDifficulty);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,instructor_name.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setVideos(data || []);

      // Fetch ratings for each video
      if (data) {
        const ratingsData: Record<string, VideoRating> = {};
        for (const video of data) {
          const { data: ratingData } = await supabase
            .rpc('get_video_average_ratings', { video_id_param: video.id });
          
          if (ratingData && ratingData.length > 0) {
            ratingsData[video.id] = {
              ...ratingData[0],
              avg_overall: (ratingData[0].avg_clarity + ratingData[0].avg_usefulness + ratingData[0].avg_entertainment + ratingData[0].avg_difficulty) / 4
            };
          }
        }
        setRatings(ratingsData);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'company-analysis': return 'Reading Companies';
      case 'market-psychology': return 'Market Psychology';
      case 'forecasting': return 'Forecasting';
      case 'general': return 'General';
      default: return category;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <Card className="border-emerald-200">
        <CardContent className="text-center py-8">
          <Play className="h-12 w-12 mx-auto mb-4 text-emerald-300" />
          <h3 className="text-lg font-semibold mb-2">No Videos Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters, or be the first to submit a video!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
        {videos.map((video) => {
          const videoRating = ratings[video.id];
          
          return (
            <Card key={video.id} className="border-emerald-200 hover:shadow-lg transition-shadow">
              <CardHeader className={isMobile ? 'pb-3' : ''}>
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant="outline" 
                    className={getDifficultyColor(video.difficulty_level)}
                  >
                    {video.difficulty_level}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {getCategoryLabel(video.topic_category)}
                  </Badge>
                </div>
                
                <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} line-clamp-2`}>
                  {video.title}
                </CardTitle>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{video.instructor_name}</span>
                  {video.instructor_credentials && (
                    <Award className="h-3 w-3 text-emerald-600" />
                  )}
                </div>
              </CardHeader>

              <CardContent className={isMobile ? 'pt-0' : ''}>
                {/* Video Thumbnail Placeholder */}
                <div className={`aspect-video bg-emerald-100 rounded-lg ${isMobile ? 'mb-3' : 'mb-4'} flex items-center justify-center relative group cursor-pointer`}
                     onClick={() => setSelectedVideo(video)}>
                  <Play className="h-12 w-12 text-emerald-600 group-hover:scale-110 transition-transform" />
                </div>

                <p className={`text-muted-foreground ${isMobile ? 'text-xs mb-3' : 'text-sm mb-4'} line-clamp-2`}>
                  {video.description}
                </p>

                {/* Ratings */}
                {videoRating && videoRating.total_ratings > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex">
                        {renderStars(videoRating.avg_overall)}
                      </div>
                      <span className={`text-sm font-medium ${isMobile ? 'text-xs' : ''}`}>
                        {videoRating.avg_overall.toFixed(1)}
                      </span>
                      <span className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        ({videoRating.total_ratings} reviews)
                      </span>
                    </div>
                    
                    <div className={`grid grid-cols-2 gap-1 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      <span>Clarity: {videoRating.avg_clarity.toFixed(1)}</span>
                      <span>Useful: {videoRating.avg_usefulness.toFixed(1)}</span>
                      <span>Fun: {videoRating.avg_entertainment.toFixed(1)}</span>
                      <span>Difficulty: {videoRating.avg_difficulty.toFixed(1)}</span>
                    </div>
                  </div>
                )}

                {/* Video Stats */}
                <div className={`flex items-center justify-between ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mb-4`}>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{video.duration ? `${Math.round(video.duration / 60)} min` : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{video.view_count} views</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setSelectedVideo(video)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  size={isMobile ? 'sm' : 'default'}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Video
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
};

export default TradingVideoList;
