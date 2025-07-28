import { useRef } from 'react';

export default function Header({ uploadedFile, handleFileUpload, setIsStarted }) {
  const fileInputRef = useRef(null);

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-lg sm:text-xl font-semibold text-gray-900">Insightbot - RAG AI</span>
          {uploadedFile && (
            <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              📄 {uploadedFile.name}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            📎 Upload
          </button>
          <button
            onClick={() => setIsStarted(false)}
            className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            New chat
          </button>
        </div>
      </div>
    </header>
  );
}