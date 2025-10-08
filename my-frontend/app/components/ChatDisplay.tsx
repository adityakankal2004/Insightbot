// app/components/ChatDisplay.tsx
import { useEffect } from 'react';

interface Message {
  id: number;
  role: string;
  content: string;
  timestamp: Date;
}

export default function ChatDisplay({
  messages,
  isLoading,
  messagesEndRef,
}: {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef?: React.RefObject<HTMLDivElement> | null; // Already correct
}) {
  useEffect(() => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, messagesEndRef]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((msg) => (
        <div key={msg.id} className={`modern-card ${msg.role === 'user' ? 'border-l-8 border-blue-400' : 'border-l-8 border-purple-400'} shadow-lg`}>
          <p className="text-lg font-medium mb-2">{msg.content}</p>
          <small className="text-gray-600">{msg.timestamp.toLocaleTimeString()}</small>
        </div>
      ))}
      {isLoading && <div className="modern-card text-purple-600">Loading...</div>}
      {messagesEndRef && <div ref={messagesEndRef} />}
    </div>
  );
}