import { useEffect } from 'react';

export default function ChatDisplay({ messages, isLoading, messagesEndRef }) {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {messages.map((message) => (
          <div key={message.id} className="mb-4 sm:mb-8">
            <div className="flex items-start space-x-1 sm:space-x-2">
              <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' ? 'bg-blue-500' : 
                message.role === 'system' ? 'bg-green-100' : 
                'bg-gray-100'
              }`}>
                {message.role === 'user' ? (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                ) : message.role === 'system' ? (
                  <span className="text-xs sm:text-sm">ℹ️</span>
                ) : (
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-sm"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                  {message.role === 'user' ? 'You' : message.role === 'system' ? 'System' : 'Insightbot'}
                </div>
                <div className={`prose prose-sm max-w-none ${
                  message.role === 'system' ? 'text-green-700 bg-green-50 p-2 sm:p-3 rounded-lg' : 'text-gray-800'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed mb-0 text-xs sm:text-sm">
                    {message.content || 'No content available'}
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                  {message.timestamp?.toLocaleTimeString() || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="mb-4 sm:mb-8">
            <div className="flex items-start space-x-1 sm:space-x-2">
              <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-sm"></div>
              </div>
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">Insightbot</div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="flex space-x-0.5 sm:space-x-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}