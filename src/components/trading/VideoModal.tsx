
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  User, 
  Award, 
  Clock, 
  Eye, 
  MessageCircle,
  ThumbsUp,
  Send
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

interface TradingVideo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  instructor_name: string;
  instructor_bio: string | null;
  instructor_credentials: string | null;
  topic_category: string;
  difficulty_level: string;
  duration: number | null;
  view_count: number;
}

interface VideoModalProps {
  video: TradingVideo;
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  helpful_votes: number;
  user_id: string;
  parent_comment_id: string | null;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [userRating, setUserRating] = useState({
    clarity_rating: 0,
    usefulness_rating: 0,
    entertainment_rating: 0,
    difficulty_rating: 0
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [hasRated, setHasRated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && video) {
      fetchComments();
      if (user) {
        checkExistingRating();
        incrementViewCount();
      }
    }
  }, [isOpen, video, user]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('video_comments')
        .select('*')
        .eq('video_id', video.id)
        .is('parent_comment_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const checkExistingRating = async () => {
    try {
      const { data, error } = await supabase
        .from('video_ratings')
        .select('*')
        .eq('video_id', video.id)
        .eq('user_id', user!.id)
        .single();

      if (data) {
        setUserRating({
          clarity_rating: data.clarity_rating,
          usefulness_rating: data.usefulness_rating,
          entertainment_rating: data.entertainment_rating,
          difficulty_rating: data.difficulty_rating
        });
        setHasRated(true);
      }
    } catch (error) {
      // No existing rating found, which is fine
    }
  };

  const incrementViewCount = async () => {
    try {
      await supabase
        .from('trading_videos')
        .update({ view_count: video.view_count + 1 })
        .eq('id', video.id);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const handleRatingSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to rate videos');
      return;
    }

    if (Object.values(userRating).some(rating => rating === 0)) {
      toast.error('Please rate all categories');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('video_ratings')
        .upsert({
          video_id: video.id,
          user_id: user.id,
          ...userRating
        });

      if (error) throw error;

      setHasRated(true);
      toast.success('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to comment');
      return;
    }

    if (!newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from('video_comments')
        .insert({
          video_id: video.id,
          user_id: user.id,
          content: newComment.trim()
        })
        .select()
        .single();

      if (error) throw error;

      setComments(prev => [data, ...prev]);
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment');
    }
  };

  const renderStarRating = (category: keyof typeof userRating, label: string) => {
    return (
      <div className="space-y-2">
        <label className={`text-sm font-medium ${isMobile ? 'text-xs' : ''}`}>{label}</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer transition-colors ${
                star <= userRating[category]
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
              onClick={() => setUserRating(prev => ({ ...prev, [category]: star }))}
            />
          ))}
        </div>
      </div>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-4xl max-h-[90vh]'} overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-emerald-800`}>
            {video.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Embed */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            {video.video_url.includes('youtube.com') || video.video_url.includes('youtu.be') ? (
              <iframe
                src={video.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            ) : video.video_url.includes('vimeo.com') ? (
              <iframe
                src={video.video_url.replace('vimeo.com/', 'player.vimeo.com/video/')}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white text-center">
                <div>
                  <p className={`${isMobile ? 'text-sm' : ''} mb-2`}>Video Player</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-300 mb-4`}>
                    {video.video_url}
                  </p>
                  <Button 
                    onClick={() => window.open(video.video_url, '_blank')}
                    variant="secondary"
                    size="sm"
                  >
                    Open Video
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={getDifficultyColor(video.difficulty_level)}>
                {video.difficulty_level}
              </Badge>
              <Badge variant="outline">
                {video.topic_category.replace('-', ' ')}
              </Badge>
            </div>

            <div className={`flex items-center gap-4 ${isMobile ? 'text-sm' : ''} text-muted-foreground`}>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{video.instructor_name}</span>
                {video.instructor_credentials && (
                  <Award className="h-3 w-3 text-emerald-600" />
                )}
              </div>
              {video.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{Math.round(video.duration / 60)} min</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{video.view_count} views</span>
              </div>
            </div>

            <p className={`${isMobile ? 'text-sm' : ''} text-muted-foreground`}>
              {video.description}
            </p>

            {video.instructor_bio && (
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className={`font-semibold text-emerald-800 mb-2 ${isMobile ? 'text-sm' : ''}`}>
                  About the Instructor
                </h4>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-700`}>
                  {video.instructor_bio}
                </p>
                {video.instructor_credentials && (
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-emerald-600 mt-1 font-medium`}>
                    Credentials: {video.instructor_credentials}
                  </p>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Rating Section */}
          {user && (
            <div className="space-y-4">
              <h3 className={`font-semibold text-emerald-800 ${isMobile ? 'text-base' : 'text-lg'}`}>
                Rate This Video
              </h3>
              
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6'}`}>
                {renderStarRating('clarity_rating', 'Clarity')}
                {renderStarRating('usefulness_rating', 'Usefulness')}
                {renderStarRating('entertainment_rating', 'Entertainment')}
                {renderStarRating('difficulty_rating', 'Difficulty')}
              </div>

              <Button
                onClick={handleRatingSubmit}
                disabled={loading || hasRated}
                className="bg-emerald-600 hover:bg-emerald-700"
                size={isMobile ? 'sm' : 'default'}
              >
                {hasRated ? 'Rating Updated' : 'Submit Rating'}
              </Button>
            </div>
          )}

          <Separator />

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-emerald-800 flex items-center gap-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
              <MessageCircle className="h-5 w-5" />
              Comments ({comments.length})
            </h3>

            {user && (
              <div className="space-y-3">
                <Textarea
                  placeholder="Share your thoughts about this video..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border-emerald-200 focus:border-emerald-400"
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!newComment.trim()}
                  size={isMobile ? 'sm' : 'default'}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Post Comment
                </Button>
              </div>
            )}

            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className={`flex items-center justify-between mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>User</span>
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`${isMobile ? 'text-sm' : ''} mb-2`}>{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      <span className={isMobile ? 'text-xs' : 'text-sm'}>
                        {comment.helpful_votes}
                      </span>
                    </Button>
                  </div>
                </div>
              ))}

              {comments.length === 0 && (
                <p className={`text-center text-muted-foreground ${isMobile ? 'text-sm' : ''} py-4`}>
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
