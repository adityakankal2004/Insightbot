// app/components/Header.tsx
'use client';
import { useRef } from 'react';

interface HeaderProps {
  uploadedFile: File | null;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ uploadedFile, handleFileUpload, setIsStarted }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null); // Typed ref for file input

  const handleReset = () => {
    setIsStarted(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear file input
    }
  };

  return (
    <header className="colorful-gradient p-6 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-lg">InsightBot</h1>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="vibrant-btn cursor-pointer"
        >
          Upload PDF
        </label>
        {uploadedFile && (
          <button
            onClick={handleReset}
            className="vibrant-btn bg-gradient-to-r from-pink-500 to-yellow-400"
          >
            Reset
          </button>
        )}
      </div>
    </header>
  );
}