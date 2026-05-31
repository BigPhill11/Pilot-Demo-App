import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Upload, Youtube, CheckCircle, Loader2, FileVideo, Image } from 'lucide-react';
import { toast } from 'sonner';
import type { PhilsFriendsFeedCategory } from '@/types/phils-friends';

const PHILS_FRIENDS_SECTIONS: {
  value: PhilsFriendsFeedCategory;
  label: string;
  description: string;
}[] = [
  {
    value: 'personal-finance',
    label: 'Personal Finance',
    description: 'Paychecks, credit, saving, investing, taxes, and money habits.',
  },
  {
    value: 'market-intelligence',
    label: 'Business / Market Intelligence',
    description: 'Markets, companies, headlines, valuation, and business models.',
  },
  {
    value: 'careers-in-finance',
    label: 'Careers in Finance',
    description: 'Finance professionals explaining roles, recruiting, and day-to-day work.',
  },
  {
    value: 'career-readiness',
    label: 'Career Readiness',
    description: 'Interviews, resumes, workplace skills, and career launch advice.',
  },
];

const DEFAULT_CATEGORY: PhilsFriendsFeedCategory = 'careers-in-finance';
const VIDEO_MAX_BYTES = 500 * 1024 * 1024;

const getFileBaseName = (fileName: string) =>
  fileName.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ').trim();

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

  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState<'file' | 'youtube'>('file');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    youtube_url: '',
    tags: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: defaultCategory || DEFAULT_CATEGORY,
      youtube_url: '',
      tags: '',
    });
    setSelectedFile(null);
    setThumbnailFile(null);
  };

  // Set default category when dialog opens
  useEffect(() => {
    if (open) {
      setFormData(prev => ({
        ...prev,
        category: defaultCategory || prev.category || DEFAULT_CATEGORY,
      }));
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
      const validExtensions = ['mp4', 'mov', 'avi'];
      const fileExt = file.name.toLowerCase().split('.').pop();
      if (!validTypes.includes(file.type) && !validExtensions.includes(fileExt || '')) {
        toast.error('Invalid file type', { description: 'Please select a valid video file (MP4, MOV, AVI)' });
        return;
      }

      // Validate file size (500MB max, matching the storage bucket limit).
      if (file.size > VIDEO_MAX_BYTES) {
        toast.error('File too large', { description: 'Please select a file smaller than 500MB' });
        return;
      }

      setSelectedFile(file);
      setFormData(prev => ({
        ...prev,
        title: prev.title || getFileBaseName(file.name),
      }));
    }
  };

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type', { description: 'Please select a valid image file (JPEG, PNG, WebP)' });
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File too large', { description: 'Please select an image smaller than 5MB' });
        return;
      }

      setThumbnailFile(file);
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

  const triggerIngestion = async (videoId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('ingest-video', {
        body: { videoId }
      });

      if (error) throw error;

      if (data?.status === 'pending_transcript') {
        toast.info('Transcription in progress', {
          description: data.message ?? 'Open the Production Board in a few minutes and click Segment to finish.',
          duration: 8000,
        });
        return;
      }

      if (data?.success) {
        toast.success(`${data.clipsCreated ?? 0} clips generated`, {
          description: 'Review and publish them from the Production Board.',
        });
      }
    } catch (err) {
      console.error('Error triggering ingestion:', err);
      toast.warning('Video saved — clipping did not start', {
        description: err instanceof Error ? err.message : 'Open the Production Board and click Segment to retry.',
      });
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Authentication required', { description: 'Please sign in to upload videos' });
      return;
    }

    const normalizedTitle =
      formData.title.trim() ||
      (selectedFile ? getFileBaseName(selectedFile.name) : '') ||
      'Phil\'s Friends Interview';
    const normalizedSection = (formData.category || DEFAULT_CATEGORY) as PhilsFriendsFeedCategory;

    if (!normalizedTitle || !normalizedSection) {
      toast.error('Missing information', { description: 'Please fill in title and section' });
      return;
    }

    if (uploadType === 'file' && !selectedFile) {
      toast.error('No file selected', { description: 'Please select a video file to upload' });
      return;
    }

    if (uploadType === 'youtube' && !validateYouTubeUrl(formData.youtube_url)) {
      toast.error('Invalid YouTube URL', { description: 'Please enter a valid YouTube video URL' });
      return;
    }

    setUploading(true);

    try {
      let storage_path = null;
      let source_url = null;
      let duration_sec = 0;
      let thumbnail_url = '';

      // Upload thumbnail if provided
      if (thumbnailFile) {
        thumbnail_url = await uploadThumbnailFile(thumbnailFile);
      }

      if (uploadType === 'file' && selectedFile) {
        storage_path = await uploadVideoFile(selectedFile);
        duration_sec = 300; // 5 minutes default
      } else if (uploadType === 'youtube') {
        source_url = formData.youtube_url;
        duration_sec = 600; // 10 minutes default
        
        // Generate YouTube thumbnail if no custom thumbnail
        if (!thumbnail_url) {
          const videoId = extractYouTubeVideoId(formData.youtube_url);
          if (videoId) {
            thumbnail_url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          }
        }
      }

      const sourceType = uploadType === 'file' ? 'upload' : 'youtube';

      // Create video record in database
      const { data: videoData, error: dbError } = await supabase
        .from('phils_friends_videos')
        .insert({
          name: normalizedTitle,
          title: normalizedTitle,
          description: formData.description,
          source_type: sourceType,
          source_url,
          youtube_url: sourceType === 'youtube' ? source_url : null,
          storage_path,
          duration_sec,
          published: false,
          processing_status: 'pending',
          created_by: user.id,
          feed_section: normalizedSection,
          tags: formData.tags,
          video_url: source_url || '',
          thumbnail_url
        })
        .select()
        .single();

      if (dbError) throw dbError;

      if (videoData) {
        await triggerIngestion(videoData.id);
      }

      toast.success('Video uploaded successfully', {
        description: 'Your source video is saved and ready for clip review.',
      });

      resetForm();
      onOpenChange(false);
      onVideoCreated();

    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Upload failed', {
        description: error instanceof Error ? error.message : 'There was an error uploading your video. Please try again.',
      });
    } finally {
      setUploading(false);
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
                    Upload MP4, MOV, or AVI files up to 500MB
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
                  {PHILS_FRIENDS_SECTIONS.map((module) => (
                    <SelectItem key={module.value} value={module.value}>
                      {module.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.category && (
                <p className="text-sm text-muted-foreground mt-1">
                  {PHILS_FRIENDS_SECTIONS.find((module) => module.value === formData.category)?.description}
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

          {/* Tags */}
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