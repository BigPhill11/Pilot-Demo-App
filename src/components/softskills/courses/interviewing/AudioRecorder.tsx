
import React, { useState, useRef } from 'react';
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
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        
        // Simulate transcription (in a real app, you'd send to a speech-to-text service)
        toast.success("Recording saved! Click 'Use Recording' to add it to your response.");
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started!");
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error("Error accessing microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped!");
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
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
    toast.success("Recording deleted!");
  };

  const useRecording = () => {
    // In a real implementation, you would transcribe the audio
    // For now, we'll add a placeholder text
    const transcriptionText = `[Audio Response Recorded - ${new Date().toLocaleTimeString()}] ` + 
                             (placeholder || "Please describe your experience using the STAR method (Situation, Task, Action, Result)...");
    onTranscription(transcriptionText);
    toast.success("Audio response added to your answer!");
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex items-center space-x-2">
        <Mic className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium">Audio Response</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {!isRecording && !audioBlob && (
          <Button onClick={startRecording} size="sm" className="bg-red-500 hover:bg-red-600">
            <Mic className="h-4 w-4 mr-1" />
            Start Recording
          </Button>
        )}
        
        {isRecording && (
          <Button onClick={stopRecording} size="sm" variant="destructive">
            <MicOff className="h-4 w-4 mr-1" />
            Stop Recording
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
            
            <Button onClick={useRecording} size="sm" className="bg-green-500 hover:bg-green-600">
              Use Recording
            </Button>
          </>
        )}
      </div>
      
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}
      
      <p className="text-xs text-gray-600">
        Record your response and it will be added to your written answer. In a full implementation, 
        this would be automatically transcribed to text.
      </p>
    </div>
  );
};

export default AudioRecorder;
