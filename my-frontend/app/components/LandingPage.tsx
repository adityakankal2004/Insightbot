type LandingPageProps = {
  handleStart: () => void;
  quickActions: string[];
};

export default function LandingPage({ handleStart, quickActions }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
      <header className="w-full colorful-gradient shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 modern-card flex items-center justify-center">
              <span className="text-lg font-bold text-purple-700">IB</span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg">Insightbot - A RAG Based AI Assistant</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button className="vibrant-btn text-sm">Log in</button>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-purple-700 mb-8 leading-tight drop-shadow-lg">
            What can I help with?
          </h1>
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask about your documents, generate quizzes..."
                className="w-full px-6 py-4 text-lg border-none modern-card focus:outline-none focus:ring-4 focus:ring-purple-400 pr-16 shadow-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              />
              <button
                onClick={handleStart}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 vibrant-btn shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl sm:max-w-3xl mx-auto mb-8">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="modern-card vibrant-btn text-lg"
              >
                {action}
              </button>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">* Upload a PDF in the chat to use document-based features.</p>
          <div className="text-center text-xs sm:text-sm text-gray-500 space-x-3 sm:space-x-6">
            <span>🤖 Powered by AI</span>
            <span>📄 PDF Analysis</span>
            <span>🎤 Voice Enabled</span>
            <span>🧠 Quiz Generation</span>
          </div>
        </div>
      </main>
    </div>
  );
}