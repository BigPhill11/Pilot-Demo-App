import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2 } from 'lucide-react';
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

// Role Tiers for Careers in Finance
const ROLE_TIERS = [
  'Beginner',
  'Intermediate', 
  'Pro'
];

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

// Soft Skills Levels
const SOFT_SKILLS_LEVELS = [
  'Beginner',
  'Intermediate',
  'Pro'
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
}

interface VideoEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video | null;
  onVideoUpdated: () => void;
}

const VideoEditDialog: React.FC<VideoEditDialogProps> = ({
  open,
  onOpenChange,
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
    if (video && open) {
      setFormData({
        title: video.title || video.name || '',
        description: video.description || '',
        category: video.category || '',
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
  }, [video, open]);

  const handleClose = () => {
    if (!updating) {
      onOpenChange(false);
    }
  };

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

      onOpenChange(false);
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

  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Video</DialogTitle>
          <DialogDescription>
            Update video details and category-specific information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Video Section *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                disabled={updating}
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
                disabled={updating}
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
                disabled={updating}
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
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Select 
                        value={formData.industry} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                        disabled={updating}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {CAREER_INDUSTRIES.map(industry => (
                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

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
                        <SelectContent>
                          {ROLE_TIERS.map(tier => (
                            <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      placeholder="Goldman Sachs, JP Morgan, etc."
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      disabled={updating}
                      className="mt-1"
                    />
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
                        disabled={updating}
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
                        disabled={updating}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="soft_skills_section">Soft Skills Section *</Label>
                      <Select 
                        value={formData.soft_skills_section} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, soft_skills_section: value }))}
                        disabled={updating}
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
                        <SelectContent>
                          {SOFT_SKILLS_LEVELS.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                      disabled={updating}
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
                      disabled={updating}
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={updating}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={updating} className="gap-2">
            {updating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Update Video
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoEditDialog;