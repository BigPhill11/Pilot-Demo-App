import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Upload, Youtube, AlertCircle, CheckCircle, Loader2, FileVideo, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Soft Skills Sections - matches existing modules
const SOFT_SKILLS_SECTIONS = [
  'Networking Like a Pro',
  'Professional Interviewing Mastery',
  'Business Communication Excellence',
  'Workplace Etiquette',
  'Dress for Success',
  'Working Women Excellence',
  'Black in Business Excellence'
];

// Video Types for General Videos
const VIDEO_TYPES = [
  'Stock Market',
  'Personal Finance',
  'Economics',
  'Other'
];

// Levels for General Videos
const VIDEO_LEVELS = [
  'Beginner',
  'Intermediate',
  'Pro'
];

interface VideoUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoCreated: () => void;
  defaultCategory?: string;
}

const VideoUploadDialog: React.FC<VideoUploadDialogProps> = ({
  open,
  onOpenChange,
  onVideoCreated,
  defaultCategory
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState<'file' | 'youtube'>('file');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    role_tier: '',
    youtube_url: '',
    tags: '',
    publishNow: false,
    company: '',
    speaker_name: '',
    soft_skills_section: '',
    video_type: '',
    level: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: defaultCategory || '',
      role_tier: '',
      youtube_url: '',
      tags: '',
      publishNow: false,
      company: '',
      speaker_name: '',
      soft_skills_section: '',
      video_type: '',
      level: ''
    });
    setSelectedFile(null);
    setThumbnailFile(null);
    setTranscriptFile(null);
    setUploadProgress(0);
  };

  // Set default category when dialog opens
  useEffect(() => {
    if (open && defaultCategory) {
      setFormData(prev => ({ ...prev, category: defaultCategory }));
    }
  }, [open, defaultCategory]);

  const handleClose = () => {
    if (!uploading) {
      resetForm();
      onOpenChange(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a valid video file (MP4, MOV, AVI)',
          variant: 'destructive'
        });
        return;
      }

      // Validate file size (100MB max)
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 100MB',
          variant: 'destructive'
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a valid image file (JPEG, PNG, WebP)',
          variant: 'destructive'
        });
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: 'File too large',
          description: 'Please select an image smaller than 5MB',
          variant: 'destructive'
        });
        return;
      }

      setThumbnailFile(file);
    }
  };

  const handleTranscriptSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['text/plain', 'text/vtt', 'application/x-subrip'];
      const fileExt = file.name.toLowerCase().split('.').pop();
      const validExtensions = ['txt', 'vtt', 'srt'];
      
      if (!validTypes.includes(file.type) && !validExtensions.includes(fileExt || '')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a valid transcript file (TXT, VTT, SRT)',
          variant: 'destructive'
        });
        return;
      }

      // Validate file size (2MB max)
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: 'File too large',
          description: 'Please select a transcript file smaller than 2MB',
          variant: 'destructive'
        });
        return;
      }

      setTranscriptFile(file);
    }
  };

  const validateYouTubeUrl = (url: string) => {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/youtu\.be\/[\w-]+/
    ];
    return patterns.some(pattern => pattern.test(url));
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

  const uploadVideoFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('phil-videos')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    return filePath;
  };

  const uploadThumbnailFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user?.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('video-thumbnails')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('video-thumbnails')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const uploadTranscriptFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user?.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('video-transcripts')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    return filePath;
  };

  const processTranscript = async (videoId: string, transcriptPath: string) => {
    try {
      // Read transcript file content
      const { data: transcriptData } = await supabase.storage
        .from('video-transcripts')
        .download(transcriptPath);

      if (transcriptData) {
        const transcriptText = await transcriptData.text();
        
        // Call AI processing function
        const { error } = await supabase.functions.invoke('process-video-transcript', {
          body: {
            videoId,
            transcript: transcriptText
          }
        });

        if (error) {
          console.error('Transcript processing error:', error);
          throw error;
        }
      }
    } catch (error) {
      console.error('Error processing transcript:', error);
      // Don't throw - video upload should succeed even if transcript processing fails
    }
  };

  const triggerAutoTranscription = async (videoId: string, sourceUrl: string | null, sourceType: string) => {
    try {
      // Call enhanced transcription service
      const { error } = await supabase.functions.invoke('enhanced-transcription', {
        body: {
          videoId,
          sourceUrl,
          sourceType
        }
      });

      if (error) {
        console.error('Auto transcription error:', error);
      }
    } catch (error) {
      console.error('Error triggering auto transcription:', error);
      // Don't throw - video upload should succeed even if transcription fails
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to upload videos',
        variant: 'destructive'
      });
      return;
    }

    // Validation based on category
    const isCareerVideo = formData.category === 'careers-in-finance';
    const isSoftSkillsVideo = formData.category === 'soft-skills';
    const isGeneralVideo = formData.category === 'general';

    if (!formData.title || !formData.category) {
      toast({
        title: 'Missing information',
        description: 'Please fill in title and category',
        variant: 'destructive'
      });
      return;
    }

    if (isCareerVideo && (!formData.role_tier || !formData.company)) {
      toast({
        title: 'Missing information',
        description: 'Please fill in company and role tier for career videos',
        variant: 'destructive'
      });
      return;
    }

    if (isSoftSkillsVideo && (!formData.speaker_name || !formData.company || !formData.soft_skills_section)) {
      toast({
        title: 'Missing information',
        description: 'Please fill in speaker name, company, and soft skills section',
        variant: 'destructive'
      });
      return;
    }

    if (isGeneralVideo && (!formData.level || !formData.video_type)) {
      toast({
        title: 'Missing information',
        description: 'Please fill in level and video type for general videos',
        variant: 'destructive'
      });
      return;
    }

    if (uploadType === 'file' && !selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a video file to upload',
        variant: 'destructive'
      });
      return;
    }

    if (uploadType === 'youtube' && !validateYouTubeUrl(formData.youtube_url)) {
      toast({
        title: 'Invalid YouTube URL',
        description: 'Please enter a valid YouTube video URL',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);

    try {
      let storage_path = null;
      let source_url = null;
      let duration_sec = 0;
      let thumbnail_url = '';
      let transcript_path = null;

      // Upload thumbnail if provided
      if (thumbnailFile) {
        thumbnail_url = await uploadThumbnailFile(thumbnailFile);
      }

      // Upload transcript if provided
      if (transcriptFile) {
        transcript_path = await uploadTranscriptFile(transcriptFile);
      }

      if (uploadType === 'file' && selectedFile) {
        storage_path = await uploadVideoFile(selectedFile);
        // For now, we'll set a default duration. In a real app, you'd extract this from the video
        duration_sec = 300; // 5 minutes default
      } else if (uploadType === 'youtube') {
        source_url = formData.youtube_url;
        // In a real app, you'd fetch video metadata from YouTube API
        duration_sec = 600; // 10 minutes default
        
        // Generate YouTube thumbnail if no custom thumbnail
        if (!thumbnail_url) {
          const videoId = extractYouTubeVideoId(formData.youtube_url);
          if (videoId) {
            thumbnail_url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          }
        }
      }

      // Create video record in database
      const { data: videoData, error: dbError } = await supabase
        .from('phils_friends_videos')
        .insert({
          name: formData.title,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          role_tier: formData.role_tier,
          source_type: uploadType,
          source_url,
          storage_path,
          duration_sec,
          published: transcriptFile ? false : true, // Auto-publish videos without transcript processing
          processing_status: transcriptFile ? 'processing' : 'completed',
          created_by: user.id,
          duration: '5:00', // Default duration string
          company: formData.company || 'Phil\'s Friends',
          // Use the active tab's mapped category (e.g., careers-in-finance, soft-skills, general)
          course_category: defaultCategory || '',
          video_url: source_url || '',
          thumbnail_url
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Process transcript if uploaded or trigger automatic transcription
      if (transcriptFile && transcript_path && videoData) {
        // Process transcript in background
        processTranscript(videoData.id, transcript_path);
      } else if (videoData) {
        // Trigger automatic transcription for all videos
        triggerAutoTranscription(videoData.id, uploadType === 'youtube' ? formData.youtube_url : null, uploadType);
      }

      toast({
        title: 'Video uploaded successfully',
        description: formData.publishNow 
          ? 'Your video has been published and is now live'
          : 'Your video has been saved as a draft'
      });

      resetForm();
      onOpenChange(false);
      onVideoCreated();

    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your video. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Video</DialogTitle>
          <DialogDescription>
            Upload a video file or add a YouTube video to Phil's Friends library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Type Selection */}
          <Tabs value={uploadType} onValueChange={(value) => setUploadType(value as 'file' | 'youtube')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload File
              </TabsTrigger>
              <TabsTrigger value="youtube" className="gap-2">
                <Youtube className="h-4 w-4" />
                YouTube URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="file" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Video File Upload</CardTitle>
                  <CardDescription>
                    Upload MP4, MOV, or AVI files up to 100MB
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="video-file">Select Video File</Label>
                      <Input
                        id="video-file"
                        type="file"
                        accept="video/*"
                        onChange={handleFileSelect}
                        disabled={uploading}
                        className="mt-1"
                      />
                    </div>

                    {selectedFile && (
                      <Alert>
                        <FileVideo className="h-4 w-4" />
                        <AlertDescription>
                          <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
                        </AlertDescription>
                      </Alert>
                    )}

                    <div>
                      <Label htmlFor="thumbnail-file">Thumbnail Image (Optional)</Label>
                      <Input
                        id="thumbnail-file"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailSelect}
                        disabled={uploading}
                        className="mt-1"
                      />
                    </div>

                    {thumbnailFile && (
                      <Alert>
                        <Image className="h-4 w-4" />
                        <AlertDescription>
                          <strong>{thumbnailFile.name}</strong> ({(thumbnailFile.size / 1024 / 1024).toFixed(1)} MB)
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="youtube" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">YouTube Video</CardTitle>
                  <CardDescription>
                    Add a video from YouTube by pasting the URL
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="youtube-url">YouTube URL</Label>
                      <Input
                        id="youtube-url"
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={formData.youtube_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, youtube_url: e.target.value }))}
                        disabled={uploading}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="custom-thumbnail">Custom Thumbnail (Optional)</Label>
                      <Input
                        id="custom-thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailSelect}
                        disabled={uploading}
                        className="mt-1"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Leave empty to use YouTube's default thumbnail
                      </p>
                    </div>

                    {thumbnailFile && (
                      <Alert>
                        <Image className="h-4 w-4" />
                        <AlertDescription>
                          <strong>{thumbnailFile.name}</strong> ({(thumbnailFile.size / 1024 / 1024).toFixed(1)} MB)
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Transcript Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transcript Upload (Optional)</CardTitle>
              <CardDescription>
                Upload a transcript to automatically generate video clips with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="transcript-file">Transcript File</Label>
                <Input
                  id="transcript-file"
                  type="file"
                  accept=".txt,.vtt,.srt"
                  onChange={handleTranscriptSelect}
                  disabled={uploading}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Supports TXT, VTT, and SRT formats. AI will analyze the transcript to create video clips automatically.
                </p>
              </div>

              {transcriptFile && (
                <Alert className="mt-4">
                  <FileVideo className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{transcriptFile.name}</strong> ({(transcriptFile.size / 1024).toFixed(1)} KB)
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Basic Info Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Video Section *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                disabled={uploading}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="careers-in-finance">Careers in Finance</SelectItem>
                  <SelectItem value="soft-skills">Soft Skills</SelectItem>
                  <SelectItem value="general">General Videos</SelectItem>
                </SelectContent>
              </Select>
              {formData.category && (
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.category === 'careers-in-finance' && 'Industry professionals sharing career insights'}
                  {formData.category === 'soft-skills' && 'Professional development and workplace skills'}
                  {formData.category === 'general' && 'General finance and market content'}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter video title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                disabled={uploading}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the video content"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                disabled={uploading}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          {/* Category-Specific Fields */}
          {formData.category && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
              <h3 className="font-medium text-foreground">
                {formData.category === 'careers-in-finance' && 'Career Video Details'}
                {formData.category === 'soft-skills' && 'Soft Skills Video Details'}  
                {formData.category === 'general' && 'General Video Details'}
              </h3>

              {/* Careers in Finance Fields */}
              {formData.category === 'careers-in-finance' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      placeholder="Goldman Sachs, JP Morgan, etc."
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      disabled={uploading}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role_tier">Target Role Level *</Label>
                    <Select 
                      value={formData.role_tier} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, role_tier: value }))}
                      disabled={uploading}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select role level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Intern">Intern</SelectItem>
                        <SelectItem value="Analyst">Analyst</SelectItem>
                        <SelectItem value="Associate">Associate</SelectItem>
                        <SelectItem value="Managing Director">Managing Director</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Soft Skills Fields */}
              {formData.category === 'soft-skills' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="speaker_name">Speaker Name *</Label>
                      <Input
                        id="speaker_name"
                        placeholder="Speaker's full name"
                        value={formData.speaker_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, speaker_name: e.target.value }))}
                        disabled={uploading}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        disabled={uploading}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="soft_skills_section">Soft Skills Section *</Label>
                    <Select 
                      value={formData.soft_skills_section} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, soft_skills_section: value }))}
                      disabled={uploading}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select soft skills section" />
                      </SelectTrigger>
                      <SelectContent>
                        {SOFT_SKILLS_SECTIONS.map(section => (
                          <SelectItem key={section} value={section}>{section}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* General Video Fields */}
              {formData.category === 'general' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="level">Level *</Label>
                    <Select 
                      value={formData.level} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
                      disabled={uploading}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {VIDEO_LEVELS.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="video_type">Video Type *</Label>
                    <Select 
                      value={formData.video_type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, video_type: value }))}
                      disabled={uploading}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select video type" />
                      </SelectTrigger>
                      <SelectContent>
                        {VIDEO_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tags and Publish Options */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                placeholder="finance, career, advice"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                disabled={uploading}
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="publishNow"
                checked={formData.publishNow}
                onChange={(e) => setFormData(prev => ({ ...prev, publishNow: e.target.checked }))}
                disabled={uploading}
                className="h-4 w-4"
              />
              <Label htmlFor="publishNow" className="text-sm">
                Publish immediately (leave unchecked to save as draft)
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={uploading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={uploading} className="gap-2">
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {uploadType === 'file' ? 'Uploading...' : 'Adding...'}
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                {uploadType === 'file' ? 'Upload Video' : 'Add Video'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoUploadDialog;