import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  PRODUCTION_STATUS_LABELS,
  type ProductionStatus,
} from '@/data/phils-friends/ingest-standards';
import VideoManagementPanel from '@/components/videos/VideoManagementPanel';
import VideoUploadDialog from '@/components/videos/VideoUploadDialog';
import { PHILS_FRIENDS_REWARDS } from '@/config/philsFriendsRewards';
import {
  fetchPilotMetrics,
  type PhilsFriendsPilotMetrics,
} from '@/lib/philsFriendsMetrics';
import { CheckCircle, Loader2, Scissors, Upload, Wand2 } from 'lucide-react';

interface SourceVideo {
  id: string;
  title: string;
  speaker_name: string | null;
  company: string | null;
  course_category: string | null;
  production_status: string | null;
  processing_status: string | null;
  published: boolean | null;
  duration_sec: number | null;
}

interface DraftClip {
  id: string;
  video_id: string;
  title: string;
  excerpt: string | null;
  start_sec: number;
  end_sec: number;
  published: boolean | null;
  production_status: string | null;
  clip_order: number | null;
}

interface DraftQuiz {
  id: string;
  clip_id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
  published: boolean | null;
}

const ClipProductionBoard: React.FC = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<SourceVideo[]>([]);
  const [clips, setClips] = useState<DraftClip[]>([]);
  const [quizzes, setQuizzes] = useState<Record<string, DraftQuiz>>({});
  const [loading, setLoading] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [pilotMetrics, setPilotMetrics] = useState<PhilsFriendsPilotMetrics | null>(null);

  const fetchBoard = useCallback(async () => {
    setLoading(true);
    try {
      const { data: videoData, error: vErr } = await supabase
        .from('phils_friends_videos')
        .select(
          'id, title, speaker_name, company, course_category, production_status, processing_status, published, duration_sec'
        )
        .order('created_at', { ascending: false });

      if (vErr) throw vErr;
      setVideos((videoData as SourceVideo[]) ?? []);

      const { data: clipData, error: cErr } = await supabase
        .from('video_clips')
        .select('*')
        .order('clip_order', { ascending: true });

      if (cErr) throw cErr;
      setClips((clipData as DraftClip[]) ?? []);

      const { data: quizData } = await supabase
        .from('clip_quiz_questions')
        .select('*');

      const quizMap: Record<string, DraftQuiz> = {};
      for (const q of quizData ?? []) {
        const opts = Array.isArray(q.options)
          ? (q.options as string[])
          : typeof q.options === 'string'
            ? JSON.parse(q.options)
            : [];
        quizMap[q.clip_id] = { ...q, options: opts } as DraftQuiz;
      }
      setQuizzes(quizMap);

      const metrics = await fetchPilotMetrics();
      setPilotMetrics(metrics);
    } catch (e) {
      console.error(e);
      toast({ title: 'Failed to load production board', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const runSegmentation = async (videoId: string) => {
    setProcessingId(videoId);
    try {
      const { data: transcriptRow } = await supabase
        .from('video_transcripts')
        .select('raw_content')
        .eq('video_id', videoId)
        .maybeSingle();

      let transcript = transcriptRow?.raw_content;

      if (!transcript) {
        const { data: video } = await supabase
          .from('phils_friends_videos')
          .select('storage_path, source_type, source_url, youtube_url')
          .eq('id', videoId)
          .single();

        const { error: txError } = await supabase.functions.invoke('enhanced-transcription', {
          body: {
            videoId,
            sourceType: video?.source_type ?? 'upload',
            sourceUrl: video?.source_url || video?.youtube_url,
            storagePath: video?.storage_path,
          },
        });
        if (txError) throw txError;
        await fetchBoard();
        const { data: retry } = await supabase
          .from('video_transcripts')
          .select('raw_content')
          .eq('video_id', videoId)
          .maybeSingle();
        transcript = retry?.raw_content;
      }

      if (!transcript) {
        toast({
          title: 'Transcript required',
          description: 'Upload a transcript file or use a smaller video for auto-transcription.',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase.functions.invoke('process-video-transcript', {
        body: { videoId, transcript, generateQuizzes: true },
      });
      if (error) throw error;

      toast({ title: 'Clips suggested', description: 'Review draft clips below before publishing.' });
      fetchBoard();
    } catch (e) {
      console.error(e);
      toast({ title: 'Segmentation failed', variant: 'destructive' });
    } finally {
      setProcessingId(null);
    }
  };

  const publishClipBundle = async (clip: DraftClip) => {
    try {
      const { error: clipErr } = await supabase
        .from('video_clips')
        .update({ published: true, production_status: 'published' })
        .eq('id', clip.id);
      if (clipErr) throw clipErr;

      const quiz = quizzes[clip.id];
      if (quiz) {
        await supabase
          .from('clip_quiz_questions')
          .update({ published: true })
          .eq('clip_id', clip.id);
      }

      toast({ title: 'Clip published', description: clip.title });
      fetchBoard();
    } catch (e) {
      console.error(e);
      toast({ title: 'Publish failed', variant: 'destructive' });
    }
  };

  const updateClip = async (clipId: string, updates: Partial<DraftClip>) => {
    const { error } = await supabase.from('video_clips').update(updates).eq('id', clipId);
    if (error) {
      toast({ title: 'Update failed', variant: 'destructive' });
      return;
    }
    fetchBoard();
  };

  const updateQuiz = async (clipId: string, updates: Partial<DraftQuiz>) => {
    const quiz = quizzes[clipId];
    if (!quiz) return;
    const { error } = await supabase
      .from('clip_quiz_questions')
      .update({
        question: updates.question ?? quiz.question,
        options: updates.options ?? quiz.options,
        correct_index: updates.correct_index ?? quiz.correct_index,
        explanation: updates.explanation ?? quiz.explanation,
      })
      .eq('clip_id', clipId);
    if (error) {
      toast({ title: 'Quiz update failed', variant: 'destructive' });
      return;
    }
    fetchBoard();
  };

  const draftClips = clips.filter((c) => !c.published);
  const filteredClips = selectedVideoId
    ? draftClips.filter((c) => c.video_id === selectedVideoId)
    : draftClips;

  const statusCounts = videos.reduce(
    (acc, v) => {
      const s = (v.production_status ?? 'ingested') as ProductionStatus;
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Phil&apos;s Friends Production</h2>
          <p className="text-muted-foreground text-sm">
            Ingest interviews → segment clips → review → publish with quiz
          </p>
        </div>
        <Button onClick={() => setUploadOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload interview
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(PRODUCTION_STATUS_LABELS).map(([key, label]) => (
          <Badge key={key} variant="outline">
            {label}: {statusCounts[key] ?? 0}
          </Badge>
        ))}
        <Badge variant="secondary">Draft clips: {draftClips.length}</Badge>
        {pilotMetrics && (
          <>
            <Badge variant="outline">
              Pilot clips: {pilotMetrics.publishedClips}
            </Badge>
            <Badge variant="outline">
              Quiz attempts: {pilotMetrics.quizAttempts} ({pilotMetrics.correctAttempts} correct)
            </Badge>
            <Badge variant="outline">
              Participation: {pilotMetrics.quizParticipationRate}%
            </Badge>
          </>
        )}
      </div>

      <Tabs defaultValue="review">
        <TabsList>
          <TabsTrigger value="review">Review queue</TabsTrigger>
          <TabsTrigger value="sources">Source videos</TabsTrigger>
          <TabsTrigger value="library">Full library</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-5 w-5" />
                Draft clips awaiting publish
              </CardTitle>
              <CardDescription>
                Approve timing, copy, and quiz before clips go live in the reel feed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredClips.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No draft clips. Run segmentation on a source video below.
                </p>
              ) : (
                <div className="space-y-6">
                  {filteredClips.map((clip) => {
                    const quiz = quizzes[clip.id];
                    const parent = videos.find((v) => v.id === clip.video_id);
                    return (
                      <Card key={clip.id} className="border-green-100">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <CardTitle className="text-base">{clip.title}</CardTitle>
                              <CardDescription>
                                {parent?.speaker_name} · {Math.round(clip.start_sec)}s–
                                {Math.round(clip.end_sec)}s
                              </CardDescription>
                            </div>
                            <Button size="sm" onClick={() => publishClipBundle(clip)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Publish
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="grid gap-3 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Hook title</Label>
                            <Input
                              value={clip.title}
                              onChange={(e) =>
                                setClips((prev) =>
                                  prev.map((c) =>
                                    c.id === clip.id ? { ...c, title: e.target.value } : c
                                  )
                                )
                              }
                              onBlur={() => updateClip(clip.id, { title: clip.title })}
                            />
                            <Label>Excerpt</Label>
                            <Textarea
                              value={clip.excerpt ?? ''}
                              rows={2}
                              onChange={(e) =>
                                setClips((prev) =>
                                  prev.map((c) =>
                                    c.id === clip.id ? { ...c, excerpt: e.target.value } : c
                                  )
                                )
                              }
                              onBlur={() => updateClip(clip.id, { excerpt: clip.excerpt })}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label>Start (sec)</Label>
                                <Input
                                  type="number"
                                  value={clip.start_sec}
                                  onChange={(e) =>
                                    setClips((prev) =>
                                      prev.map((c) =>
                                        c.id === clip.id
                                          ? { ...c, start_sec: Number(e.target.value) }
                                          : c
                                      )
                                    )
                                  }
                                  onBlur={() =>
                                    updateClip(clip.id, {
                                      start_sec: clip.start_sec,
                                      end_sec: clip.end_sec,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <Label>End (sec)</Label>
                                <Input
                                  type="number"
                                  value={clip.end_sec}
                                  onChange={(e) =>
                                    setClips((prev) =>
                                      prev.map((c) =>
                                        c.id === clip.id
                                          ? { ...c, end_sec: Number(e.target.value) }
                                          : c
                                      )
                                    )
                                  }
                                  onBlur={() =>
                                    updateClip(clip.id, {
                                      start_sec: clip.start_sec,
                                      end_sec: clip.end_sec,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          {quiz ? (
                            <div className="space-y-2 rounded-lg bg-muted/40 p-3">
                              <Label>Quiz question</Label>
                              <Input
                                value={quiz.question}
                                onChange={(e) =>
                                  setQuizzes((prev) => ({
                                    ...prev,
                                    [clip.id]: { ...quiz, question: e.target.value },
                                  }))
                                }
                                onBlur={() => updateQuiz(clip.id, { question: quiz.question })}
                              />
                              {quiz.options.map((opt, i) => (
                                <Input
                                  key={i}
                                  value={opt}
                                  placeholder={`Option ${i + 1}`}
                                  onChange={(e) => {
                                    const next = [...quiz.options];
                                    next[i] = e.target.value;
                                    setQuizzes((prev) => ({
                                      ...prev,
                                      [clip.id]: { ...quiz, options: next },
                                    }));
                                  }}
                                  onBlur={() => updateQuiz(clip.id, { options: quiz.options })}
                                />
                              ))}
                              <Label>Correct option (0–3)</Label>
                              <Input
                                type="number"
                                min={0}
                                max={3}
                                value={quiz.correct_index}
                                onChange={(e) =>
                                  setQuizzes((prev) => ({
                                    ...prev,
                                    [clip.id]: {
                                      ...quiz,
                                      correct_index: Number(e.target.value),
                                    },
                                  }))
                                }
                                onBlur={() =>
                                  updateQuiz(clip.id, { correct_index: quiz.correct_index })
                                }
                              />
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              No quiz generated — re-run segmentation or add manually.
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Source interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell>
                        <button
                          type="button"
                          className="text-left font-medium hover:underline"
                          onClick={() => setSelectedVideoId(v.id)}
                        >
                          {v.speaker_name || v.title}
                        </button>
                      </TableCell>
                      <TableCell>{v.course_category ?? '—'}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {PRODUCTION_STATUS_LABELS[
                            (v.production_status ?? 'ingested') as ProductionStatus
                          ] ?? v.production_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={processingId === v.id}
                          onClick={() => runSegmentation(v.id)}
                        >
                          {processingId === v.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Wand2 className="h-4 w-4 mr-1" />
                          )}
                          Segment
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library">
          <VideoManagementPanel onVideoUpdate={fetchBoard} />
        </TabsContent>
      </Tabs>

      <VideoUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onVideoCreated={() => {
          setUploadOpen(false);
          fetchBoard();
        }}
        defaultCategory={PHILS_FRIENDS_REWARDS.pilotCategory}
      />
    </div>
  );
};

export default ClipProductionBoard;
