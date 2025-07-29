'use client';
import { useState, useRef, useEffect } from 'react';
import { uploadPDF, askQuestion } from './api';
import Header from './components/Header';
import ChatDisplay from './components/ChatDisplay';
import ChatInput from './components/ChatInput';
import LandingPage from './components/LandingPage';

interface Message {
  id: number;
  role: string;
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [inputValue]);

  const handleStart = () => {
    console.log('handleStart triggered');
    setIsStarted(true);
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: "Hello! I'm your AI assistant. Upload a PDF to ask questions, and I'll fetch answers from it. Let's go!",
        timestamp: new Date(),
      },
    ]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      try {
        await uploadPDF(file);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: 'system',
            content: `📄 Successfully uploaded: ${file.name}`,
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        console.error("PDF upload failed:", err);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: 'system',
            content: `❌ Failed to upload PDF.`,
            timestamp: new Date(),
          },
        ]);
      }
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askQuestion(userMessage.content);
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.answer || "⚠️ No answer received from backend.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Failed to get answer:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: "❌ Failed to fetch answer from backend.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = ["Ask questions about PDFs", "Generate study quizzes", "Document analysis"];

  if (!isStarted) return <LandingPage handleStart={handleStart} quickActions={quickActions} />;

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header
        uploadedFile={uploadedFile}
        handleFileUpload={handleFileUpload}
        setIsStarted={setIsStarted}
      />
      <ChatDisplay messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>} />
      <ChatInput
        inputValue={inputValue}
        isRecording={false}
        setInputValue={setInputValue}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
        setIsRecording={() => {}}
      />
    </div>
  );
}
