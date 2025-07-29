from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle

EMBEDDINGS_FILE = "faiss_index.pkl"
MODEL = SentenceTransformer("all-MiniLM-L6-v2")

def process_pdf(file):
    reader = PdfReader(file.file)
    text = ""
    for page in reader.pages:
        content = page.extract_text()
        if content:
            text += content + "\n"

    # Chunk the text into ~500-character pieces
    chunks = [text[i:i + 500] for i in range(0, len(text), 500)]

    # Embed the chunks
    embeddings = MODEL.encode(chunks)

    # Build FAISS index
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(np.array(embeddings))

    # Save the FAISS index and chunks
    with open(EMBEDDINGS_FILE, "wb") as f:
        pickle.dump((index, chunks), f)

    return {"status": "PDF processed", "chunks": len(chunks)}
