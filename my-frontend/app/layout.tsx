import './globals.css';

export const metadata = {
  title: 'Insightbot - RAG AI Chat',
  description: 'A PDF QnA and quiz generation assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  );
}