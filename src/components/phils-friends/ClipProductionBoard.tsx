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
import { toast } from 'sonner';
import {
  PRODUCTION_STATUS_LABELS,
  type ProductionStatus,
} from '@/data/phils-friends/ingest-standards';
import VideoManagementPanel from '@/components/videos/VideoManagementPanel';
import VideoUploadDialog from '@/components/videos/VideoUploadDialog';
import {
  fetchPilotMetrics,
  type PhilsFriendsPilotMetrics,
} from '@/lib/philsFriendsMetrics';
import { CheckCircle, Loader2, Scissors, Upload, Wand2 } from 'lucide-react';
import {
  normalizeCourseCategory,
  REEL_CATEGORIES,
  type PhilsFriendsFeedCategory,
} from '@/types/phils-friends';

const SECTION_IDS = REEL_CATEGORIES
  .filter((category) => category.id !== 'all' && category.id !== 'general')
  .map((category) => category.id as PhilsFriendsFeedCategory);

const SECTION_LABELS = REEL_CATEGORIES.reduce<Record<string, string>>((acc, category) => {
  acc[category.id] = category.label;
  return acc;
}, {});

const getSection = (value: string | null | undefined): PhilsFriendsFeedCategory => {
  const normalized = normalizeCourseCategory(value);
  return SECTION_IDS.includes(normalized as PhilsFriendsFeedCategory)
    ? (normalized as PhilsFriendsFeedCategory)
    : 'careers-in-finance';
};

interface SourceVideo {
  id: string;
  title: string;
  speaker_name: string | null;
  company: string | null;
  course_category: string | null;
  feed_section: string | null;
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
  feed_section: string | null;
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
          'id, title, speaker_name, company, course_category, feed_section, production_status, processing_status, published, duration_sec'
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
      toast.error('Failed to load production board');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const runSegmentation = async (videoId: string) => {
    setProcessingId(videoId);
    try {
      const { error } = await supabase.functions.invoke('ingest-video', {
        body: { videoId },
      });
      if (error) throw error;

      toast.success('Clips suggested', { description: 'Review draft clips below before publishing.' });
      fetchBoard();
    } catch (e) {
      console.error(e);
      toast.error('Segmentation failed', {
        description: e instanceof Error ? e.message : 'Could not run video ingestion.',
      });
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

      // Publishing a clip makes its source video live so the feed can surface it.
      await supabase
        .from('phils_friends_videos')
        .update({ published: true })
        .eq('id', clip.video_id);

      toast.success('Clip published', { description: clip.title });
      fetchBoard();
    } catch (e) {
      console.error(e);
      toast.error('Publish failed');
    }
  };

  const updateClip = async (clipId: string, updates: Partial<DraftClip>) => {
    const { error } = await supabase.from('video_clips').update(updates).eq('id', clipId);
    if (error) {
      toast.error('Update failed');
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
      toast.error('Quiz update failed');
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

  const sectionCounts = SECTION_IDS.reduce<Record<string, number>>((acc, section) => {
    acc[section] = videos.filter((video) => getSection(video.feed_section ?? video.course_category) === section).length;
    return acc;
  }, {});

  const clipSection = (clip: DraftClip): PhilsFriendsFeedCategory => {
    const parent = videos.find((video) => video.id === clip.video_id);
    return getSection(clip.feed_section ?? parent?.feed_section ?? parent?.course_category);
  };

  const groupedFilteredClips = SECTION_IDS.map((section) => ({
    section,
    clips: filteredClips.filter((clip) => clipSection(clip) === section),
  })).filter((group) => group.clips.length > 0);

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
        {SECTION_IDS.map((section) => (
          <Badge key={section} variant="outline">
            {SECTION_LABELS[section]}: {sectionCounts[section] ?? 0}
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
                <div className="space-y-8">
                  {groupedFilteredClips.map(({ section, clips: sectionClips }) => (
                    <div key={section} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{SECTION_LABELS[section]}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {sectionClips.length} draft clip{sectionClips.length === 1 ? '' : 's'}
                        </span>
                      </div>
                      {sectionClips.map((clip) => {
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
                  ))}
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
                    <TableHead>Section</TableHead>
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
                      <TableCell>
                        <Badge variant="secondary">
                          {SECTION_LABELS[getSection(v.feed_section ?? v.course_category)] ?? 'Careers'}
                        </Badge>
                      </TableCell>
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
      />
    </div>
  );
};

export default ClipProductionBoard;
