import pickle
import faiss
import numpy as np
import google.generativeai as genai
from sentence_transformers import SentenceTransformer

EMBEDDINGS_FILE = "faiss_index.pkl"
MODEL = SentenceTransformer("all-MiniLM-L6-v2")

def ask_question(question, gemini_key):
    genai.configure(api_key=gemini_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Load FAISS index and chunks
    with open(EMBEDDINGS_FILE, "rb") as f:
        index, chunks = pickle.load(f)

    # Embed the question
    query_embedding = MODEL.encode([question])

    # Search for top 5 similar chunks
    D, I = index.search(np.array(query_embedding), k=5)
    relevant_chunks = [chunks[i] for i in I[0]]

    # Prepare prompt with context
    context = "\n\n".join(relevant_chunks)
    prompt = f"""You are a helpful assistant. Answer the user's question using the context provided from a PDF.\n\nContext:\n{context}\n\nQuestion: {question}"""

    response = model.generate_content(prompt)
    return response.text
