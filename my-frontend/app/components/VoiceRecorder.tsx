'use client';
import { useEffect, useRef, useState } from 'react';

interface VoiceRecorderProps {
  isRecording: boolean;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  mode: 'voice2text' | 'voice2voice';
}

export default function VoiceRecorder({ isRecording, setInputValue, setIsRecording, mode }: VoiceRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Establish WebSocket on mount
    const socketUrl = process.env.NEXT_PUBLIC_API_URL?.replace('http', 'ws') + '/ws/voice';
    wsRef.current = new WebSocket(socketUrl || '');
    
    wsRef.current.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 Message from server:", data);

      if (data.text) {
        setInputValue(data.text);
      }

      if (data.audio_url) {
        const audio = new Audio(data.audio_url);
        audio.play();
      }
    };

    return () => {
      wsRef.current?.close();
    };
  }, [setInputValue]);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      setAudioChunks([]); // reset buffer

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setAudioChunks([]);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result?.toString().split(',')[1]; // remove "data:..." prefix
          if (wsRef.current?.readyState === WebSocket.OPEN && base64Audio) {
            wsRef.current.send(JSON.stringify({
              mode,
              audio: base64Audio,
            }));
          } else {
            console.error("❌ WebSocket is not open or base64 is empty");
          }
        };
        reader.readAsDataURL(audioBlob);
      };

      recorder.start();
    } catch (err) {
      console.error('🎙️ Microphone error:', err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
  };

  return null; // UI is handled in ChatInput or elsewhere
}
