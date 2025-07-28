import { useRef, useEffect } from 'react';

export default function ChatInput({ inputValue, isRecording, setInputValue, handleSend, handleKeyPress, setIsRecording }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [inputValue]);

  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message Insightbot..."
            rows={1}
            className="w-full resize-none border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 pr-12 sm:pr-20 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            style={{ minHeight: '40px', maxHeight: '150px' }}
          />
          <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 flex items-center space-x-0.5 sm:space-x-1">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-1 sm:p-2 rounded-lg transition-all ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-gray-900`}
            >
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-1 sm:p-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}