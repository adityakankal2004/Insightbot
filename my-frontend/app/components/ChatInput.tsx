'use client';

import { useRef, useEffect } from 'react';
import VoiceRecorder from './VoiceRecorder';

interface ChatInputProps {
  inputValue: string;
  isRecording: boolean;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatInput({
  inputValue,
  isRecording,
  setInputValue,
  handleSend,
  handleKeyPress,
  setIsRecording,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [inputValue]);

  return (
    <div className="p-6 modern-card border-t">
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={isRecording ? 'Recording... Speak now 🎙️' : 'Type your message...'}
        className="w-full p-4 border-none rounded-xl resize-none bg-white disabled:bg-gray-200 shadow-lg"
        disabled={isRecording}
      />
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={handleSend}
          className="vibrant-btn"
          disabled={isRecording}
        >
          Send
        </button>
      </div>
    </div>
  );
}
