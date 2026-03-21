import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useLocalStorage } from '@/hooks/use-local-storage';
import VideoEditPanel from '@/components/videos/VideoEditPanel';
import { 
  Play, 
  Clock, 
  User, 
  Building, 
  Target, 
  Calendar,
  Youtube,
  FileVideo,
  Award,
  TrendingUp,
  Eye,
  Star,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  storage_path?: string;
  company: string;
  speaker_name?: string;
  soft_skills_section?: string;
  video_type?: string;
  level?: string;
  tags?: string;
  course_category: string;
}

interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  confidence: number;
}

interface ViewerSegment {
  id: string;
  start_time: number;
  end_time: number;
  title: string;
  description: string;
  keywords: string[];
  segment_type: string;
}

interface VideoDetailDialogProps {
  video: Video | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VideoDetailDialog: React.FC<VideoDetailDialogProps> = ({
  video,
  open,
  onOpenChange
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  // Admin check temporarily disabled - will be reimplemented later
  const isAdmin = false;
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [embedBaseUrl, setEmbedBaseUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  const [wordTimestamps, setWordTimestamps] = useState<WordTimestamp[]>([]);
  const [segments, setSegments] = useState<ViewerSegment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeQuizSeg, setActiveQuizSeg] = useState<ViewerSegment | null>(null);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizChoices, setQuizChoices] = useState<string[]>([]);
  const [quizCorrectIndex, setQuizCorrectIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [answeredQuizIds, setAnsweredQuizIds] = useState<string[]>([]);

  const [adminSettings] = useLocalStorage('phils_friends_admin_settings', {
    autoTranscriptionEnabled: true,
    autoPublishAfterTranscription: true,
    viewerTranscriptEnabled: true,
    viewerChaptersEnabled: true,
    enableComments: false,
    points: { start: 5, watch50: 10, complete: 10 }
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (video && open) {
      loadVideoUrl();
      fetchTranscriptData();
      fetchSegments();
      trackVideoView();
    }
  }, [video, open]);

  useEffect(() => {
    if (!searchQuery || wordTimestamps.length === 0) {
      setHighlightedIndices([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches: number[] = [];
    wordTimestamps.forEach((w, i) => {
      if (w.word.toLowerCase().includes(q)) matches.push(i);
    });
    setHighlightedIndices(matches);
  }, [searchQuery, wordTimestamps]);

  const loadVideoUrl = async () => {
    if (!video) return;

    try {
      if (video.source_type === 'youtube' && video.source_url) {
        // Convert YouTube URL to embed URL
        const videoId = extractYouTubeVideoId(video.source_url);
        if (videoId) {
          const base = `https://www.youtube.com/embed/${videoId}`;
          setEmbedBaseUrl(base);
          setVideoUrl(base);
        }
      } else if (video.storage_path) {
        // Get signed URL for uploaded video
        const { data } = supabase.storage
          .from('phil-videos')
          .getPublicUrl(video.storage_path);
        
        setVideoUrl(data.publicUrl);
      }
    } catch (error) {
      console.error('Error loading video URL:', error);
      toast({
        title: 'Error loading video',
        description: 'Unable to load video content',
        variant: 'destructive'
      });
    }
  };

  const parseQuizFromSegment = (seg: ViewerSegment) => {
    if (!seg) return null;
    // Prefer keywords entry quiz::JSON
    const keywords = (seg as any).keywords as string[] | undefined;
    if (Array.isArray(keywords)) {
      const quizEntry = keywords.find(k => typeof k === 'string' && k.startsWith('quiz::')) as string | undefined;
      if (quizEntry) {
        try {
          const json = quizEntry.substring('quiz::'.length);
          const payload = JSON.parse(json);
          if (payload && Array.isArray(payload.choices)) {
            return payload as { question: string; choices: string[]; correctIndex: number };
          }
        } catch (_) {
          // ignore
        }
      }
    }
    return null;
  };

  const fetchTranscriptData = async () => {
    if (!video) return;
    try {
      const { data, error } = await supabase
        .from('video_transcripts')
        .select('*')
        .eq('video_id', video.id)
        .single();
      if (error) return; // gracefully ignore if none yet
      setTranscript(data?.raw_content || '');
      setWordTimestamps(Array.isArray(data?.word_timestamps) ? data.word_timestamps as unknown as WordTimestamp[] : []);
    } catch (e) {
      // ignore
    }
  };

  const fetchSegments = async () => {
    if (!video) return;
    try {
      const { data, error } = await supabase
        .from('video_segments')
        .select('*')
        .eq('video_id', video.id)
        .order('start_time');
      if (error) return;
      setSegments((data || []) as unknown as ViewerSegment[]);
    } catch (e) {
      // ignore
    }
  };

  const extractYouTubeVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const seekTo = (seconds: number) => {
    if (!video) return;
    const s = Math.max(0, Math.floor(seconds));
    if (video.source_type === 'youtube') {
      if (embedBaseUrl && iframeRef.current) {
        const autoplayUrl = `${embedBaseUrl}?start=${s}&autoplay=1`;
        iframeRef.current.src = autoplayUrl;
      }
    } else if (videoRef.current) {
      videoRef.current.currentTime = s;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleWordClick = (w: WordTimestamp) => {
    seekTo(w.start);
  };

  const jumpToSegment = (seg: ViewerSegment) => {
    const quiz = parseQuizFromSegment(seg);
    if (quiz && !answeredQuizIds.includes(seg.id)) {
      pausePlayback();
      setActiveQuizSeg(seg);
      setQuizQuestion(quiz.question);
      setQuizChoices(quiz.choices);
      setQuizCorrectIndex(quiz.correctIndex ?? 0);
      setSelectedChoice(null);
      setShowQuiz(true);
      return;
    }
    seekTo(seg.start_time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const pausePlayback = () => {
    if (video?.source_type === 'youtube') {
      if (embedBaseUrl && iframeRef.current) {
        iframeRef.current.src = embedBaseUrl; // reload without autoplay
      }
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const onTimeUpdate = () => {
    if (!videoRef.current || !video) return;
    const t = videoRef.current.currentTime;
    setCurrentTime(t);
    // If we reach a quiz segment start and not answered, trigger quiz
    const pending = segments.find(seg => (seg as any).segment_type === 'quiz' && !answeredQuizIds.includes(seg.id) && t >= seg.start_time && t < seg.start_time + 0.5);
    if (pending) {
      const quiz = parseQuizFromSegment(pending);
      if (quiz) {
        pausePlayback();
        setActiveQuizSeg(pending);
        setQuizQuestion(quiz.question);
        setQuizChoices(quiz.choices);
        setQuizCorrectIndex(quiz.correctIndex ?? 0);
        setSelectedChoice(null);
        setShowQuiz(true);
      }
    }
  };

  const awardPoints = async (eventType: string, points: number) => {
    try {
      if (!video || !user) return;
      await supabase
        .from('video_points')
        .insert({
          user_id: user.id,
          video_id: video.id,
          event_type: eventType,
          points_earned: points
        });
    } catch (_) {
      // ignore
    }
  };

  const handleQuizSubmit = async () => {
    if (selectedChoice == null || !activeQuizSeg) return;
    const isCorrect = selectedChoice === quizCorrectIndex;
    if (isCorrect) {
      setAnsweredQuizIds(prev => [...prev, activeQuizSeg.id]);
      setShowQuiz(false);
      toast({ title: 'Correct!', description: 'Great job, continuing...' });
      await awardPoints('QUIZ_CORRECT', adminSettings?.points?.watch50 ?? 10);
      // Resume playback from segment start
      seekTo(activeQuizSeg.start_time);
    } else {
      toast({ title: 'Try again', description: 'Please select the correct answer', variant: 'destructive' });
    }
  };

  const trackVideoView = async () => {
    if (!video || !user) return;

    try {
      // Track video started event
      await supabase
        .from('video_analytics')
        .insert({
          user_id: user.id,
          video_id: video.id,
          event_type: 'VIDEO_STARTED',
          progress_pct: 0
        });

      // Award points for starting video
      await supabase
        .from('video_points')
        .insert({
          user_id: user.id,
          video_id: video.id,
          event_type: 'VIDEO_STARTED',
          points_earned: adminSettings?.points?.start ?? 5
        });

    } catch (error) {
      console.error('Error tracking video view:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">{video.name}</DialogTitle>
          <DialogDescription className="text-base">
            {video.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {videoUrl ? (
                video.source_type === 'youtube' ? (
                  <iframe
                    ref={iframeRef}
                    src={videoUrl}
                    title={video.name}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    className="w-full h-full"
                    poster={video.thumbnail_url}
                    onTimeUpdate={onTimeUpdate}
                    onEnded={async () => {
                      await awardPoints('VIDEO_COMPLETED', adminSettings?.points?.complete ?? 10);
                      toast({ title: 'Completed!', description: 'You earned completion points.' });
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    {video.source_type === 'youtube' ? (
                      <Youtube className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    ) : (
                      <FileVideo className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    )}
                    <p className="text-muted-foreground">Loading video...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className={getRoleTierColor(video.role_tier)}>
                  <Target className="h-3 w-3 mr-1" />
                  {video.role_tier}
                </Badge>
                <Badge variant="outline" className={getIndustryColor(video.category)}>
                  <Building className="h-3 w-3 mr-1" />
                  {video.category}
                </Badge>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDuration(video.duration_sec)}
                </Badge>
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(video.created_at)}
                </Badge>
              </div>

              {!video.published && isAdmin && (
                <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      Draft Video
                    </span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    This video is not published and only visible to admins.
                  </p>
                </div>
              )}
            </div>

            {/* Transcript */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Transcript</CardTitle>
                  <CardDescription>Click words to jump to that moment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-3">
                    <Input
                      placeholder="Search transcript..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-3"
                    />
                  </div>
                  <div className="max-h-64 overflow-y-auto border rounded p-3">
                    {wordTimestamps.length > 0 ? (
                      <div className="space-y-1">
                        {wordTimestamps.map((w, i) => (
                          <span
                            key={i}
                            className={`inline-block mr-1 mb-1 px-1 py-0.5 rounded cursor-pointer text-sm ${highlightedIndices.includes(i) ? 'bg-yellow-200 dark:bg-yellow-800' : 'hover:bg-muted'}`}
                            title={`${formatTime(w.start)} - ${formatTime(w.end)}`}
                            onClick={() => handleWordClick(w)}
                          >
                            {w.word}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {transcript || 'Transcript will appear here once available.'}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chapters / Segments */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Chapters</CardTitle>
                  <CardDescription>Jump to key sections</CardDescription>
                </CardHeader>
                <CardContent>
                  {segments.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No chapters yet.</div>
                  ) : (
                    <div className="space-y-2">
                      {segments.map((seg) => (
                        <div
                          key={seg.id}
                          className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => jumpToSegment(seg)}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{seg.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {formatTime(seg.start_time)} - {formatTime(seg.end_time)}
                            </Badge>
                          </div>
                          {seg.description && (
                            <p className="text-xs text-muted-foreground mt-1">{seg.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Views</span>
                    <Badge variant="secondary">
                      <Eye className="h-3 w-3 mr-1" />
                      0
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <Badge variant="secondary">
                      <Star className="h-3 w-3 mr-1" />
                      N/A
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Comments</span>
                    <Badge variant="secondary">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      0
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Gamification */}
              <Card className="mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Earn Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Watch 50%</span>
                    <Badge variant="outline">
                      <Award className="h-3 w-3 mr-1" />
                      +10 pts
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Complete video</span>
                    <Badge variant="outline">
                      <Award className="h-3 w-3 mr-1" />
                      +10 pts
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily streak</span>
                    <Badge variant="outline">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5 pts
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Videos */}
              <Card className="mt-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Related Videos</CardTitle>
                  <CardDescription>
                    More videos in {video.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Coming soon - personalized recommendations
                  </p>
                </CardContent>
              </Card>
            </ScrollArea>
        </div>

        {/* Video Edit Panel - Bottom Right */}
        {isAdmin && (
          <div className="absolute bottom-4 right-4 z-10">
            <VideoEditPanel 
              video={video} 
              onVideoUpdated={() => setRefreshTrigger(prev => prev + 1)} 
            />
          </div>
        )}

          {/* Video Edit Panel - Bottom Right */}
          {isAdmin && (
            <div className="absolute bottom-4 right-4 z-10">
              <VideoEditPanel 
                video={video} 
                onVideoUpdated={() => setRefreshTrigger(prev => prev + 1)} 
              />
            </div>
          )}
        </div>

        {/* Quiz Modal (simple) */}
        {showQuiz && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background border rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2">Checkpoint Quiz</h3>
              <p className="mb-4">{quizQuestion}</p>
              <div className="space-y-2">
                {quizChoices.map((choice, idx) => (
                  <label key={idx} className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${selectedChoice === idx ? 'bg-muted' : ''} ${showQuiz && selectedChoice != null ? (idx === quizCorrectIndex ? 'border-green-500' : selectedChoice === idx ? 'border-red-500' : '') : ''}`}>
                    <input
                      type="radio"
                      name="quiz-choice"
                      checked={selectedChoice === idx}
                      onChange={() => setSelectedChoice(idx)}
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowQuiz(false)}>Cancel</Button>
                <Button onClick={handleQuizSubmit}>Submit</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoDetailDialog;