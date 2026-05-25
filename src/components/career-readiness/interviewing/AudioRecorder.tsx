import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Pause, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface AudioRecorderProps {
  onTranscription: (text: string) => void;
  placeholder?: string;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onTranscription, placeholder }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        toast.success('Recording saved! Tap "Use Recording" to add a practice note.');
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      toast.error('Microphone access denied. Check browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const deleteRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
  };

  const useRecording = () => {
    const text =
      `[Practice recording — ${new Date().toLocaleTimeString()}] ` +
      (placeholder ?? 'Describe your answer using STAR (Situation, Task, Action, Result).');
    onTranscription(text);
    toast.success('Practice note added to your response.');
  };

  return (
    <div className="space-y-3 p-4 border rounded-xl bg-emerald-50/50 border-emerald-100">
      <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
        <Mic className="h-4 w-4" />
        Optional voice practice
      </div>
      <div className="flex flex-wrap gap-2">
        {!isRecording && !audioBlob && (
          <Button onClick={startRecording} size="sm" className="bg-red-600 hover:bg-red-700">
            <Mic className="h-4 w-4 mr-1" />
            Record
          </Button>
        )}
        {isRecording && (
          <Button onClick={stopRecording} size="sm" variant="destructive">
            <MicOff className="h-4 w-4 mr-1" />
            Stop
          </Button>
        )}
        {audioBlob && (
          <>
            <Button onClick={playRecording} size="sm" variant="outline">
              {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={deleteRecording} size="sm" variant="outline">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button onClick={useRecording} size="sm" className="bg-emerald-700 hover:bg-emerald-800">
              Use Recording
            </Button>
          </>
        )}
      </div>
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
      )}
      <p className="text-xs text-muted-foreground">
        Recordings stay on this device for playback. Your written reflection is what we save to progress.
      </p>
    </div>
  );
};

export default AudioRecorder;
