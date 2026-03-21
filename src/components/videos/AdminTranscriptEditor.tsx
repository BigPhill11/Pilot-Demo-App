import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Plus,
  Edit,
  Save,
  X,
  Clock,
  Tag,
  FileText
} from 'lucide-react';

interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  confidence: number;
}

interface VideoSegment {
  id: string;
  start_time: number;
  end_time: number;
  title: string;
  description: string;
  keywords: string[];
  segment_type: string;
}

interface AdminTranscriptEditorProps {
  videoId: string;
  videoUrl: string;
  onClose: () => void;
}

const AdminTranscriptEditor: React.FC<AdminTranscriptEditorProps> = ({
  videoId,
  videoUrl,
  onClose
}) => {
  const { toast } = useToast();
  const [transcript, setTranscript] = useState('');
  const [wordTimestamps, setWordTimestamps] = useState<WordTimestamp[]>([]);
  const [segments, setSegments] = useState<VideoSegment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedWords, setHighlightedWords] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState('');
  const [newSegment, setNewSegment] = useState({
    title: '',
    description: '',
    keywords: '',
    start_time: 0,
    end_time: 0
  });
  const [showNewSegment, setShowNewSegment] = useState(false);
  const [startMin, setStartMin] = useState<string>('0');
  const [startSec, setStartSec] = useState<string>('0');
  const [endMin, setEndMin] = useState<string>('0');
  const [endSec, setEndSec] = useState<string>('0');
  const [isQuiz, setIsQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizA, setQuizA] = useState('');
  const [quizB, setQuizB] = useState('');
  const [quizC, setQuizC] = useState('');
  const [quizD, setQuizD] = useState('');
  const [quizCorrectIndex, setQuizCorrectIndex] = useState<number>(0);
  const [transcriptExists, setTranscriptExists] = useState(false);

  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStartMin, setEditStartMin] = useState<string>('0');
  const [editStartSec, setEditStartSec] = useState<string>('0');
  const [editEndMin, setEditEndMin] = useState<string>('0');
  const [editEndSec, setEditEndSec] = useState<string>('0');
  const [editIsQuiz, setEditIsQuiz] = useState(false);
  const [editQuizQuestion, setEditQuizQuestion] = useState('');
  const [editQuizA, setEditQuizA] = useState('');
  const [editQuizB, setEditQuizB] = useState('');
  const [editQuizC, setEditQuizC] = useState('');
  const [editQuizD, setEditQuizD] = useState('');
  const [editCorrectIndex, setEditCorrectIndex] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isYouTube, setIsYouTube] = useState(false);
  const [embedBaseUrl, setEmbedBaseUrl] = useState<string | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTranscriptData();
    fetchSegments();
    // detect youtube and set embed url base
    if (videoUrl && /youtube\.com|youtu\.be/.test(videoUrl)) {
      const idMatch = videoUrl.match(/(?:watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      const id = idMatch ? idMatch[1] : '';
      if (id) {
        setIsYouTube(true);
        setEmbedBaseUrl(`https://www.youtube.com/embed/${id}`);
      }
    } else {
      setIsYouTube(false);
    }
  }, [videoId]);

  useEffect(() => {
    if (searchQuery) {
      highlightSearchResults();
    } else {
      setHighlightedWords([]);
    }
  }, [searchQuery, wordTimestamps]);

  const fetchTranscriptData = async () => {
    try {
      const { data, error } = await supabase
        .from('video_transcripts')
        .select('*')
        .eq('video_id', videoId)
        .maybeSingle();

      if (error) {
        // do not toast on missing transcript
        console.warn('Transcript fetch warning:', error);
        setTranscriptExists(false);
        return;
      }

      if (data) {
        setTranscriptExists(true);
        setTranscript(data.raw_content || '');
        setEditedTranscript(data.raw_content || '');
        setWordTimestamps(Array.isArray(data.word_timestamps) ? data.word_timestamps as unknown as WordTimestamp[] : []);
      } else {
        setTranscriptExists(false);
      }
    } catch (error) {
      console.error('Error fetching transcript:', error);
      // ignore errors here to allow creating a new transcript
    }
  };

  const fetchSegments = async () => {
    try {
      const { data, error } = await supabase
        .from('video_segments')
        .select('*')
        .eq('video_id', videoId)
        .order('start_time');

      if (error) throw error;
      setSegments(data || []);
    } catch (error) {
      console.error('Error fetching segments:', error);
    }
  };

  const highlightSearchResults = () => {
    if (!searchQuery || !wordTimestamps.length) return;

    const query = searchQuery.toLowerCase();
    const matchingIndices: number[] = [];

    wordTimestamps.forEach((wordData, index) => {
      if (wordData.word.toLowerCase().includes(query)) {
        matchingIndices.push(index);
      }
    });

    setHighlightedWords(matchingIndices);
  };

  const handleWordClick = (wordData: WordTimestamp) => {
    const s = Math.floor(wordData.start);
    if (isYouTube && iframeRef.current && embedBaseUrl) {
      iframeRef.current.src = `${embedBaseUrl}?start=${s}&autoplay=1`;
      setCurrentTime(wordData.start);
      return;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = wordData.start;
      setCurrentTime(wordData.start);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const saveTranscript = async () => {
    try {
      if (transcriptExists) {
        const { error } = await supabase
          .from('video_transcripts')
          .update({
            raw_content: editedTranscript,
            searchable_content: editedTranscript.toLowerCase(),
            updated_at: new Date().toISOString()
          })
          .eq('video_id', videoId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('video_transcripts')
          .insert({
            video_id: videoId,
            raw_content: editedTranscript,
            searchable_content: editedTranscript.toLowerCase(),
            transcript_type: 'TXT',
            processing_status: 'completed',
            language_code: 'en',
            confidence_score: 1.0
          });
        if (error) throw error;
        setTranscriptExists(true);
      }

      setTranscript(editedTranscript);
      setIsEditing(false);
      
      toast({
        title: 'Success',
        description: 'Transcript saved successfully'
      });
    } catch (error) {
      console.error('Error saving transcript:', error);
      toast({
        title: 'Error',
        description: 'Failed to save transcript',
        variant: 'destructive'
      });
    }
  };

  const createSegment = async () => {
    try {
      const keywordsArr = newSegment.keywords.split(',').map(k => k.trim()).filter(k => k);
      if (isQuiz) {
        const quizPayload = {
          question: quizQuestion,
          choices: [quizA, quizB, quizC, quizD],
          correctIndex: quizCorrectIndex
        };
        keywordsArr.push(`quiz::${JSON.stringify(quizPayload)}`);
      }
      const { error } = await supabase
        .from('video_segments')
        .insert({
          video_id: videoId,
          start_time: newSegment.start_time,
          end_time: newSegment.end_time,
          title: newSegment.title,
          description: newSegment.description,
          keywords: keywordsArr,
          segment_type: isQuiz ? 'quiz' : 'custom'
        });

      if (error) throw error;

      setNewSegment({
        title: '',
        description: '',
        keywords: '',
        start_time: 0,
        end_time: 0
      });
      setStartMin('0');
      setStartSec('0');
      setEndMin('0');
      setEndSec('0');
      setIsQuiz(false);
      setQuizQuestion('');
      setQuizA('');
      setQuizB('');
      setQuizC('');
      setQuizD('');
      setQuizCorrectIndex(0);
      setShowNewSegment(false);
      fetchSegments();

      toast({
        title: 'Success',
        description: 'Segment created successfully'
      });
    } catch (error) {
      console.error('Error creating segment:', error);
      toast({
        title: 'Error',
        description: 'Failed to create segment',
        variant: 'destructive'
      });
    }
  };

  const jumpToSegment = (segment: VideoSegment) => {
    if (videoRef.current) {
      videoRef.current.currentTime = segment.start_time;
      setCurrentTime(segment.start_time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTranscriptWithHighlights = () => {
    if (!wordTimestamps.length) {
      return (
        <div className="text-muted-foreground">
          {transcript || 'No transcript available'}
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {wordTimestamps.map((wordData, index) => (
          <span
            key={index}
            className={`
              inline-block mr-1 mb-1 px-1 py-0.5 rounded cursor-pointer text-sm
              transition-colors duration-200
              ${highlightedWords.includes(index) 
                ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100' 
                : 'hover:bg-muted'
              }
              ${Math.abs(currentTime - wordData.start) < 0.5 
                ? 'bg-primary/20 text-primary' 
                : ''
              }
            `}
            onClick={() => handleWordClick(wordData)}
            title={`${formatTime(wordData.start)} - ${formatTime(wordData.end)} (${Math.round(wordData.confidence * 100)}% confidence)`}
          >
            {wordData.word}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto p-6">
      {/* Video Player Section */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Video Player
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              {isYouTube ? (
                <iframe
                  ref={iframeRef}
                  src={embedBaseUrl || ''}
                  title="YouTube player"
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full"
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls
                />
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <span className="text-sm text-muted-foreground">
                {formatTime(currentTime)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Segments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Video Segments
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNewSegment(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {segments.map((segment) => (
                <div
                  key={segment.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => jumpToSegment(segment)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{segment.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {formatTime(segment.start_time)} - {formatTime(segment.end_time)}
                    </Badge>
                  </div>
                  {segment.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {segment.description}
                    </p>
                  )}
                  {segment.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {segment.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-end gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        // populate edit fields
                        setEditingSegmentId(segment.id);
                        setEditTitle(segment.title);
                        setEditDescription(segment.description);
                        setEditStartMin(String(Math.floor(segment.start_time / 60)));
                        setEditStartSec(String(Math.floor(segment.start_time % 60)));
                        setEditEndMin(String(Math.floor(segment.end_time / 60)));
                        setEditEndSec(String(Math.floor(segment.end_time % 60)));
                        // parse quiz
                        const quizEntry = segment.keywords.find(k => typeof k === 'string' && k.startsWith('quiz::')) as string | undefined;
                        if (quizEntry) {
                          try {
                            const payload = JSON.parse(quizEntry.substring('quiz::'.length));
                            setEditIsQuiz(true);
                            setEditQuizQuestion(payload.question || '');
                            const arr = Array.isArray(payload.choices) ? payload.choices : [];
                            setEditQuizA(arr[0] || '');
                            setEditQuizB(arr[1] || '');
                            setEditQuizC(arr[2] || '');
                            setEditQuizD(arr[3] || '');
                            setEditCorrectIndex(payload.correctIndex ?? 0);
                          } catch {
                            setEditIsQuiz(false);
                            setEditQuizQuestion('');
                            setEditQuizA(''); setEditQuizB(''); setEditQuizC(''); setEditQuizD('');
                            setEditCorrectIndex(0);
                          }
                        } else {
                          setEditIsQuiz(false);
                          setEditQuizQuestion('');
                          setEditQuizA(''); setEditQuizB(''); setEditQuizC(''); setEditQuizD('');
                          setEditCorrectIndex(0);
                        }
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (!confirm('Delete this segment?')) return;
                        try {
                          const { error } = await supabase
                            .from('video_segments')
                            .delete()
                            .eq('id', segment.id);
                          if (error) throw error;
                          fetchSegments();
                          toast({ title: 'Deleted', description: 'Segment removed' });
                        } catch (err) {
                          console.error(err);
                          toast({ title: 'Error', description: 'Failed to delete segment', variant: 'destructive' });
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>

                  {editingSegmentId === segment.id && (
                    <div className="mt-4 p-3 border rounded-lg space-y-3" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Start mm"
                            type="number"
                            value={editStartMin}
                            onChange={(e) => {
                              const v = e.target.value; setEditStartMin(v);
                            }}
                          />
                          <Input
                            placeholder="Start ss"
                            type="number"
                            value={editStartSec}
                            onChange={(e) => { const v = e.target.value; setEditStartSec(v); }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="End mm"
                            type="number"
                            value={editEndMin}
                            onChange={(e) => { const v = e.target.value; setEditEndMin(v); }}
                          />
                          <Input
                            placeholder="End ss"
                            type="number"
                            value={editEndSec}
                            onChange={(e) => { const v = e.target.value; setEditEndSec(v); }}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">Computed: {formatTime((parseInt(editStartMin)||0)*60 + (parseInt(editStartSec)||0))} - {formatTime((parseInt(editEndMin)||0)*60 + (parseInt(editEndSec)||0))}</div>
                      <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" />
                      <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Description" />

                      <div className="border-t pt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Quiz checkpoint</span>
                          <input type="checkbox" className="h-4 w-4" checked={editIsQuiz} onChange={(e) => setEditIsQuiz(e.target.checked)} />
                        </div>
                        {editIsQuiz && (
                          <div className="space-y-2">
                            <Input placeholder="Quiz question" value={editQuizQuestion} onChange={(e) => setEditQuizQuestion(e.target.value)} />
                            <div className="grid grid-cols-2 gap-2">
                              <Input placeholder="Choice A" value={editQuizA} onChange={(e) => setEditQuizA(e.target.value)} />
                              <Input placeholder="Choice B" value={editQuizB} onChange={(e) => setEditQuizB(e.target.value)} />
                              <Input placeholder="Choice C" value={editQuizC} onChange={(e) => setEditQuizC(e.target.value)} />
                              <Input placeholder="Choice D" value={editQuizD} onChange={(e) => setEditQuizD(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <span>Correct:</span>
                              {[0,1,2,3].map(i => (
                                <label key={i} className="flex items-center gap-1">
                                  <input type="radio" name={`edit-correct-${segment.id}`} checked={editCorrectIndex===i} onChange={() => setEditCorrectIndex(i)} />
                                  <span>{['A','B','C','D'][i]}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingSegmentId(null)}>Cancel</Button>
                        <Button size="sm" onClick={async () => {
                          try {
                            const s = (parseInt(editStartMin)||0)*60 + (parseInt(editStartSec)||0);
                            const e = (parseInt(editEndMin)||0)*60 + (parseInt(editEndSec)||0);
                            const updates: any = {
                              title: editTitle,
                              description: editDescription,
                              start_time: s,
                              end_time: e
                            };
                            // rebuild keywords
                            const baseKeywords = (segment.keywords || []).filter(k => typeof k !== 'string' || !String(k).startsWith('quiz::')) as string[];
                            if (editIsQuiz) {
                              const quizPayload = { question: editQuizQuestion, choices: [editQuizA, editQuizB, editQuizC, editQuizD], correctIndex: editCorrectIndex };
                              baseKeywords.push(`quiz::${JSON.stringify(quizPayload)}`);
                            }
                            updates.keywords = baseKeywords;
                            const { error } = await supabase
                              .from('video_segments')
                              .update(updates)
                              .eq('id', segment.id);
                            if (error) throw error;
                            toast({ title: 'Saved', description: 'Segment updated' });
                            setEditingSegmentId(null);
                            fetchSegments();
                          } catch (err) {
                            console.error(err);
                            toast({ title: 'Error', description: 'Failed to update segment', variant: 'destructive' });
                          }
                        }}>Save</Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {showNewSegment && (
              <div className="mt-4 p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Create New Segment</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowNewSegment(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Start mm"
                      type="number"
                      value={startMin}
                      onChange={(e) => {
                        const v = e.target.value;
                        setStartMin(v);
                        const mm = parseInt(v) || 0;
                        const ss = parseInt(startSec) || 0;
                        setNewSegment(prev => ({ ...prev, start_time: mm * 60 + ss }));
                      }}
                    />
                    <Input
                      placeholder="Start ss"
                      type="number"
                      value={startSec}
                      onChange={(e) => {
                        const v = e.target.value;
                        setStartSec(v);
                        const mm = parseInt(startMin) || 0;
                        const ss = parseInt(v) || 0;
                        setNewSegment(prev => ({ ...prev, start_time: mm * 60 + ss }));
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="End mm"
                      type="number"
                      value={endMin}
                      onChange={(e) => {
                        const v = e.target.value;
                        setEndMin(v);
                        const mm = parseInt(v) || 0;
                        const ss = parseInt(endSec) || 0;
                        setNewSegment(prev => ({ ...prev, end_time: mm * 60 + ss }));
                      }}
                    />
                    <Input
                      placeholder="End ss"
                      type="number"
                      value={endSec}
                      onChange={(e) => {
                        const v = e.target.value;
                        setEndSec(v);
                        const mm = parseInt(endMin) || 0;
                        const ss = parseInt(v) || 0;
                        setNewSegment(prev => ({ ...prev, end_time: mm * 60 + ss }));
                      }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">Computed: {formatTime(newSegment.start_time)} - {formatTime(newSegment.end_time)}</div>
                
                <Input
                  placeholder="Segment title"
                  value={newSegment.title}
                  onChange={(e) => setNewSegment(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                />
                
                <Textarea
                  placeholder="Description"
                  value={newSegment.description}
                  onChange={(e) => setNewSegment(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
                
                <Input
                  placeholder="Keywords (comma-separated)"
                  value={newSegment.keywords}
                  onChange={(e) => setNewSegment(prev => ({
                    ...prev,
                    keywords: e.target.value
                  }))}
                />

                <div className="border-t pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Make this a quiz checkpoint</span>
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={isQuiz}
                      onChange={(e) => setIsQuiz(e.target.checked)}
                    />
                  </div>
                  {isQuiz && (
                    <div className="space-y-2">
                      <Input
                        placeholder="Quiz question"
                        value={quizQuestion}
                        onChange={(e) => setQuizQuestion(e.target.value)}
                      />
                      <Input
                        placeholder="Option A"
                        value={quizA}
                        onChange={(e) => setQuizA(e.target.value)}
                      />
                      <Input
                        placeholder="Option B"
                        value={quizB}
                        onChange={(e) => setQuizB(e.target.value)}
                      />
                      <Input
                        placeholder="Option C"
                        value={quizC}
                        onChange={(e) => setQuizC(e.target.value)}
                      />
                      <Input
                        placeholder="Option D"
                        value={quizD}
                        onChange={(e) => setQuizD(e.target.value)}
                      />
                      <Input
                        placeholder="Correct choice index (0-based)"
                        type="number"
                        value={quizCorrectIndex}
                        onChange={(e) => setQuizCorrectIndex(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  )}
                </div>
                
                <Button
                  size="sm"
                  onClick={createSegment}
                  disabled={!newSegment.title || newSegment.end_time <= newSegment.start_time}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Segment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transcript Section */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Interactive Transcript
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              </Button>
            </CardTitle>
            <CardDescription>
              Click on any word to jump to that timestamp in the video
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transcript..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {highlightedWords.length > 0 && (
              <Alert className="mb-4">
                <AlertDescription>
                  Found {highlightedWords.length} matches for "{searchQuery}"
                </AlertDescription>
              </Alert>
            )}

            <Separator className="mb-4" />

            {/* Transcript Content */}
            <div
              ref={transcriptRef}
              className="max-h-96 overflow-y-auto p-4 border rounded-lg"
            >
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedTranscript}
                    onChange={(e) => setEditedTranscript(e.target.value)}
                    className="min-h-80"
                    placeholder="Edit transcript text..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveTranscript}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setEditedTranscript(transcript);
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                renderTranscriptWithHighlights()
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminTranscriptEditor;