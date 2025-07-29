const BACKEND_URL = "http://localhost:8000"; // change to your deployed URL later

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BACKEND_URL}/upload-pdf/`, {
    method: "POST",
    body: formData,
  });

  return await res.json(); // expects { message: "success" }
};

export const askQuestion = async (question: string) => {
  const res = await fetch(`${BACKEND_URL}/ask/?question=${encodeURIComponent(question)}`, {
    method: "POST",
  });

  return await res.json(); // expects { answer: "..." }
};
