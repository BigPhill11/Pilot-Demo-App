
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Video, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const VideoSubmissionForm = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: '',
    instructor_name: '',
    instructor_bio: '',
    instructor_credentials: '',
    topic_category: 'general',
    difficulty_level: 'beginner',
    duration_minutes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to submit a video');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('trading_videos')
        .insert({
          title: formData.title,
          description: formData.description,
          video_url: formData.video_url,
          thumbnail_url: formData.thumbnail_url || null,
          instructor_name: formData.instructor_name,
          instructor_bio: formData.instructor_bio || null,
          instructor_credentials: formData.instructor_credentials || null,
          topic_category: formData.topic_category,
          difficulty_level: formData.difficulty_level,
          duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
          submitted_by: user.id
        });

      if (error) throw error;

      setSubmitted(true);
      toast.success('Video submitted successfully! It will be reviewed before going live.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        video_url: '',
        thumbnail_url: '',
        instructor_name: '',
        instructor_bio: '',
        instructor_credentials: '',
        topic_category: 'general',
        difficulty_level: 'beginner',
        duration_minutes: ''
      });

    } catch (error) {
      console.error('Error submitting video:', error);
      toast.error('Failed to submit video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="border-emerald-200">
        <CardContent className="text-center py-8">
          <Video className="h-12 w-12 mx-auto mb-4 text-emerald-300" />
          <h3 className="text-lg font-semibold mb-2">Login Required</h3>
          <p className="text-muted-foreground">
            You need to be logged in to submit educational videos.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (submitted) {
    return (
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="text-center py-8">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-emerald-600" />
          <h3 className="text-xl font-semibold mb-2 text-emerald-800">Video Submitted Successfully!</h3>
          <p className="text-emerald-700 mb-4">
            Thank you for contributing to Phil's Trading Academy! Your video will be reviewed and published soon.
          </p>
          <Button 
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
          >
            Submit Another Video
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle className="text-emerald-700 flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Submit Educational Video
        </CardTitle>
        <CardDescription>
          Share your trading knowledge with Phil's community! Videos are reviewed before going live.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Video Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-800">Video Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Video Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Reading Balance Sheets Like Phil Reads Bamboo Menus"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="border-emerald-200 focus:border-emerald-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what students will learn from this video..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="border-emerald-200 focus:border-emerald-400 min-h-[100px]"
              />
            </div>

            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}>
              <div className="space-y-2">
                <Label htmlFor="topic_category">Topic Category *</Label>
                <select
                  id="topic_category"
                  value={formData.topic_category}
                  onChange={(e) => handleInputChange('topic_category', e.target.value)}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:border-emerald-400"
                  required
                >
                  <option value="general">General</option>
                  <option value="company-analysis">Reading Companies</option>
                  <option value="market-psychology">Market Psychology</option>
                  <option value="forecasting">Forecasting</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty_level">Difficulty Level *</Label>
                <select
                  id="difficulty_level"
                  value={formData.difficulty_level}
                  onChange={(e) => handleInputChange('difficulty_level', e.target.value)}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:border-emerald-400"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}>
              <div className="space-y-2">
                <Label htmlFor="video_url">Video URL *</Label>
                <Input
                  id="video_url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.video_url}
                  onChange={(e) => handleInputChange('video_url', e.target.value)}
                  className="border-emerald-200 focus:border-emerald-400"
                  type="url"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                <Input
                  id="duration_minutes"
                  placeholder="15"
                  value={formData.duration_minutes}
                  onChange={(e) => handleInputChange('duration_minutes', e.target.value)}
                  className="border-emerald-200 focus:border-emerald-400"
                  type="number"
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail_url">Thumbnail URL (optional)</Label>
              <Input
                id="thumbnail_url"
                placeholder="https://example.com/thumbnail.jpg"
                value={formData.thumbnail_url}
                onChange={(e) => handleInputChange('thumbnail_url', e.target.value)}
                className="border-emerald-200 focus:border-emerald-400"
                type="url"
              />
            </div>
          </div>

          {/* Instructor Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-800">Instructor Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="instructor_name">Instructor Name *</Label>
              <Input
                id="instructor_name"
                placeholder="Your name or professional name"
                value={formData.instructor_name}
                onChange={(e) => handleInputChange('instructor_name', e.target.value)}
                className="border-emerald-200 focus:border-emerald-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor_bio">Instructor Bio</Label>
              <Textarea
                id="instructor_bio"
                placeholder="Tell us about your background and experience..."
                value={formData.instructor_bio}
                onChange={(e) => handleInputChange('instructor_bio', e.target.value)}
                className="border-emerald-200 focus:border-emerald-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor_credentials">Credentials (optional)</Label>
              <Input
                id="instructor_credentials"
                placeholder="CFA, MBA, 10+ years experience, etc."
                value={formData.instructor_credentials}
                onChange={(e) => handleInputChange('instructor_credentials', e.target.value)}
                className="border-emerald-200 focus:border-emerald-400"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Submit Video for Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VideoSubmissionForm;
