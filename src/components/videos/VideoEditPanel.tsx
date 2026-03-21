import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Career Industries for Careers in Finance
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

// Video Types for General Videos
const VIDEO_TYPES = [
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
  company: string;
  speaker_name?: string;
  soft_skills_section?: string;
  video_type?: string;
  level?: string;
  tags?: string;
  course_category: string;
}

interface VideoEditPanelProps {
  video: Video | null;
  onVideoUpdated: () => void;
}

const VideoEditPanel: React.FC<VideoEditPanelProps> = ({
  video,
  onVideoUpdated
}) => {
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    role_tier: '',
    company: '',
    speaker_name: '',
    soft_skills_section: '',
    video_type: '',
    level: '',
    tags: '',
    industry: ''
  });

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title || video.name || '',
        description: video.description || '',
        category: video.course_category || '',
        role_tier: video.role_tier || '',
        company: video.company || '',
        speaker_name: video.speaker_name || '',
        soft_skills_section: video.soft_skills_section || '',
        video_type: video.video_type || '',
        level: video.level || '',
        tags: video.tags || '',
        industry: video.category || ''
      });
    }
  }, [video]);

  const handleSubmit = async () => {
    if (!video) return;

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

    if (isCareerVideo && (!formData.industry || !formData.level || !formData.company)) {
      toast({
        title: 'Missing information',
        description: 'Please fill in industry, level, and company for career videos',
        variant: 'destructive'
      });
      return;
    }

    if (isSoftSkillsVideo && (!formData.speaker_name || !formData.company || !formData.soft_skills_section || !formData.level)) {
      toast({
        title: 'Missing information',
        description: 'Please fill in speaker name, company, soft skills section, and level',
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

    setUpdating(true);

    try {
      const { error } = await supabase
        .from('phils_friends_videos')
        .update({
          name: formData.title,
          title: formData.title,
          description: formData.description,
          category: formData.industry || formData.video_type || formData.soft_skills_section || formData.category,
          role_tier: formData.level || formData.role_tier,
          company: formData.company,
          speaker_name: formData.speaker_name || null,
          soft_skills_section: formData.soft_skills_section || null,
          video_type: formData.video_type || null,
          level: formData.level || null,
          tags: formData.tags || null,
          course_category: formData.category
        })
        .eq('id', video.id);

      if (error) throw error;

      toast({
        title: 'Video updated successfully',
        description: 'Video details have been saved'
      });

      onVideoUpdated();

    } catch (error) {
      console.error('Error updating video:', error);
      toast({
        title: 'Update failed',
        description: 'There was an error updating the video. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setUpdating(false);
    }
  };

  const getFilterOptions = () => {
    switch (formData.category) {
      case 'careers-in-finance':
        return CAREER_INDUSTRIES;
      case 'soft-skills':
        return SOFT_SKILLS_SECTIONS;
      case 'general':
        return VIDEO_TYPES;
      default:
        return [];
    }
  };

  const getFilterLabel = () => {
    switch (formData.category) {
      case 'careers-in-finance':
        return 'Industry';
      case 'soft-skills':
        return 'Soft Skills Section';
      case 'general':
        return 'Video Type';
      default:
        return 'Category';
    }
  };

  if (!video) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Video Labeling
          </CardTitle>
          <CardDescription>
            Select a video to edit its labels and categorization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No video selected
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit3 className="h-5 w-5" />
          Video Labeling
        </CardTitle>
        <CardDescription>
          Edit video labels and categorization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Section */}
        <div>
          <Label htmlFor="category">Video Section *</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, industry: '', soft_skills_section: '', video_type: '' }))}
            disabled={updating}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border shadow-lg z-50">
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

        {/* Title */}
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            placeholder="Enter video title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            disabled={updating}
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the video content"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            disabled={updating}
            className="mt-1"
            rows={3}
          />
        </div>

        {/* Category-Specific Fields */}
        {formData.category && (
          <div className="space-y-4 p-3 bg-muted/30 rounded-lg border">
            <h4 className="font-medium text-sm text-foreground">
              {formData.category === 'careers-in-finance' && 'Career Video Details'}
              {formData.category === 'soft-skills' && 'Soft Skills Video Details'}  
              {formData.category === 'general' && 'General Video Details'}
            </h4>

            {/* Category-specific dropdown */}
            <div>
              <Label>{getFilterLabel()} *</Label>
              <Select 
                value={formData.industry || formData.soft_skills_section || formData.video_type} 
                onValueChange={(value) => {
                  if (formData.category === 'careers-in-finance') {
                    setFormData(prev => ({ ...prev, industry: value, soft_skills_section: '', video_type: '' }));
                  } else if (formData.category === 'soft-skills') {
                    setFormData(prev => ({ ...prev, soft_skills_section: value, industry: '', video_type: '' }));
                  } else if (formData.category === 'general') {
                    setFormData(prev => ({ ...prev, video_type: value, industry: '', soft_skills_section: '' }));
                  }
                }}
                disabled={updating}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={`Select ${getFilterLabel().toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-lg z-50">
                  {getFilterOptions().map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level */}
            <div>
              <Label htmlFor="level">Level *</Label>
              <Select 
                value={formData.level} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
                disabled={updating}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border shadow-lg z-50">
                  {ALL_LEVELS.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional fields for specific categories */}
            {(formData.category === 'careers-in-finance' || formData.category === 'soft-skills') && (
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  disabled={updating}
                  className="mt-1"
                />
              </div>
            )}

            {formData.category === 'soft-skills' && (
              <div>
                <Label htmlFor="speaker_name">Speaker Name *</Label>
                <Input
                  id="speaker_name"
                  placeholder="Speaker's full name"
                  value={formData.speaker_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, speaker_name: e.target.value }))}
                  disabled={updating}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            placeholder="finance, career, advice"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            disabled={updating}
            className="mt-1"
          />
        </div>

        {/* Save Button */}
        <Button onClick={handleSubmit} disabled={updating} className="w-full gap-2">
          {updating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Update Video Labels
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoEditPanel;