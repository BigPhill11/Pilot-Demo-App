import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Play, Edit, Trash2, Clock, Eye, EyeOff, Scissors } from 'lucide-react';

interface VideoClip {
  id: string;
  title: string;
  excerpt: string;
  start_sec: number;
  end_sec: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  video_id: string;
  clip_order: number;
  thumbnail_url: string;
}

interface VideoClipManagementProps {
  videoId: string;
  videoTitle: string;
}

const VideoClipManagement: React.FC<VideoClipManagementProps> = ({ videoId, videoTitle }) => {
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClip, setEditingClip] = useState<VideoClip | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchClips();
  }, [videoId]);

  const fetchClips = async () => {
    try {
      const { data, error } = await supabase
        .from('video_clips')
        .select('*')
        .eq('video_id', videoId)
        .order('start_time', { ascending: true });

      if (error) throw error;
      setClips(data || []);
    } catch (error) {
      console.error('Error fetching clips:', error);
      toast({
        title: 'Error loading clips',
        description: 'Failed to load video clips',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleClipPublished = async (clipId: string, isPublished: boolean) => {
    try {
      const { error } = await supabase
        .from('video_clips')
        .update({ published: isPublished })
        .eq('id', clipId);

      if (error) throw error;

      setClips(clips.map(clip => 
        clip.id === clipId ? { ...clip, published: isPublished } : clip
      ));

      toast({
        title: isPublished ? 'Clip published' : 'Clip unpublished',
        description: `Clip has been ${isPublished ? 'published' : 'unpublished'} successfully`
      });
    } catch (error) {
      console.error('Error updating clip:', error);
      toast({
        title: 'Error',
        description: 'Failed to update clip status',
        variant: 'destructive'
      });
    }
  };

  const deleteClip = async (clipId: string) => {
    if (!confirm('Are you sure you want to delete this clip?')) return;

    try {
      const { error } = await supabase
        .from('video_clips')
        .delete()
        .eq('id', clipId);

      if (error) throw error;

      setClips(clips.filter(clip => clip.id !== clipId));
      toast({
        title: 'Clip deleted',
        description: 'Video clip has been deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting clip:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete clip',
        variant: 'destructive'
      });
    }
  };

  const updateClip = async (clipId: string, updates: Partial<VideoClip>) => {
    try {
      const { error } = await supabase
        .from('video_clips')
        .update(updates)
        .eq('id', clipId);

      if (error) throw error;

      setClips(clips.map(clip => 
        clip.id === clipId ? { ...clip, ...updates } : clip
      ));

      setEditingClip(null);
      toast({
        title: 'Clip updated',
        description: 'Video clip has been updated successfully'
      });
    } catch (error) {
      console.error('Error updating clip:', error);
      toast({
        title: 'Error',
        description: 'Failed to update clip',
        variant: 'destructive'
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getClipTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'bg-blue-100 text-blue-800';
      case 'response': return 'bg-green-100 text-green-800';
      case 'insight': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Clips...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          Video Clips for "{videoTitle}"
        </CardTitle>
        <CardDescription>
          Manage auto-generated and manual clips for this video
        </CardDescription>
      </CardHeader>
      <CardContent>
        {clips.length === 0 ? (
          <Alert>
            <AlertDescription>
              No clips found for this video. Upload a transcript to automatically generate clips, or create clips manually.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {clips.length} clips found • {clips.filter(c => c.published).length} published
              </p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Time Range</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clips.map((clip) => (
                  <TableRow key={clip.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{clip.title}</p>
                        {clip.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {clip.excerpt}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {formatTime(clip.start_sec)} - {formatTime(clip.end_sec)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-gray-100 text-gray-800">
                        Video Clip
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {clip.published ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                        <Switch
                          checked={clip.published}
                          onCheckedChange={(checked) => toggleClipPublished(clip.id, checked)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingClip(clip)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Clip</DialogTitle>
                              <DialogDescription>
                                Modify the clip details and timing
                              </DialogDescription>
                            </DialogHeader>
                            {editingClip && (
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="clip-title">Title</Label>
                                  <Input
                                    id="clip-title"
                                    value={editingClip.title}
                                    onChange={(e) => setEditingClip({
                                      ...editingClip,
                                      title: e.target.value
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="clip-description">Excerpt</Label>
                                  <Textarea
                                    id="clip-description"
                                    value={editingClip.excerpt || ''}
                                    onChange={(e) => setEditingClip({
                                      ...editingClip,
                                      excerpt: e.target.value
                                    })}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="start-time">Start Time (seconds)</Label>
                                    <Input
                                      id="start-time"
                                      type="number"
                                      value={editingClip.start_sec}
                                      onChange={(e) => setEditingClip({
                                        ...editingClip,
                                        start_sec: parseInt(e.target.value) || 0
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="end-time">End Time (seconds)</Label>
                                    <Input
                                      id="end-time"
                                      type="number"
                                      value={editingClip.end_sec}
                                      onChange={(e) => setEditingClip({
                                        ...editingClip,
                                        end_sec: parseInt(e.target.value) || 0
                                      })}
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => setEditingClip(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => updateClip(editingClip.id, {
                                      title: editingClip.title,
                                      excerpt: editingClip.excerpt,
                                      start_sec: editingClip.start_sec,
                                      end_sec: editingClip.end_sec
                                    })}
                                  >
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteClip(clip.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoClipManagement;