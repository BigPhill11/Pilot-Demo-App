import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Play, Pause, Square, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AudioRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  maxDuration?: number; // in seconds
  className?: string;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onRecordingComplete, 
  maxDuration = 120,
  className = ""
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const { toast } = useToast();

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
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        onRecordingComplete?.(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      
      toast({
        title: "Recording Started",
        description: "Practice your communication skills!"
      });
      
    } catch (error) {
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      toast({
        title: "Recording Complete",
        description: `Recorded ${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setAudioBlob(null);
    setIsPlaying(false);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={`bg-gradient-to-r from-blue-50 to-purple-50 ${className}`}>
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-purple-700">
            Practice Recording
          </h3>
          
          <div className="mb-6">
            <div className="text-3xl font-mono font-bold text-gray-700 mb-2">
              {formatTime(recordingTime)}
            </div>
            <div className="text-sm text-gray-500">
              Max: {formatTime(maxDuration)}
            </div>
          </div>
          
          <div className="flex justify-center gap-3 mb-4">
            {!isRecording && !audioBlob && (
              <Button 
                onClick={startRecording}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            )}
            
            {isRecording && !isPaused && (
              <>
                <Button 
                  onClick={pauseRecording}
                  variant="outline"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
                <Button 
                  onClick={stopRecording}
                  variant="outline"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
            
            {isPaused && (
              <>
                <Button 
                  onClick={resumeRecording}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Resume
                </Button>
                <Button 
                  onClick={stopRecording}
                  variant="outline"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
            
            {audioBlob && (
              <>
                {!isPlaying ? (
                  <Button 
                    onClick={playRecording}
                    variant="outline"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                ) : (
                  <Button 
                    onClick={pausePlayback}
                    variant="outline"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button 
                  onClick={resetRecording}
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </>
            )}
          </div>
          
          {isRecording && (
            <div className="flex items-center justify-center gap-2 text-red-500">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Recording...</span>
            </div>
          )}
          
          <audio ref={audioRef} className="hidden" />
        </div>
      </CardContent>
    </Card>
  );
};