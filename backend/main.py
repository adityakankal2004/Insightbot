from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import io
import base64

# Load .env
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")

# Utils
from utils.pdf_handler import process_pdf
from utils.rag_pipeline import ask_question
from utils.tts import text_to_speech
from utils.stt_realtime import speech_to_text  # <- uses same speech_to_text func

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === HTTP ROUTES ===

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    return process_pdf(file)
@app.post("/ask/")
async def ask_qna(question: str):
    answer = ask_question(question, GEMINI_API_KEY)
    return {"answer": answer}
@app.get("/test")
async def test_endpoint():
    return {"message": "This is a test endpoint"}

@app.post("/stt/")
async def speech_to_text_endpoint(file: UploadFile = File(...)):
    return {"text": speech_to_text(file, DEEPGRAM_API_KEY)}

@app.post("/tts/")
async def text_to_speech_endpoint(text: str):
    return {"audio_url": text_to_speech(text)}

# === SINGLE UNIFIED WEBSOCKET ===
@app.websocket("/ws/voice")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Receive base64 encoded audio and interaction mode
            data = await websocket.receive_json()
            audio_base64 = data.get("audio")
            mode = data.get("mode")  # "voice2text" or "voice2voice"

            if not audio_base64:
                await websocket.send_json({"error": "No audio received"})
                continue

            # Decode audio
            audio_bytes = base64.b64decode(audio_base64)
            file_like = io.BytesIO(audio_bytes)

            # Convert speech to text
            text = speech_to_text(file_like, DEEPGRAM_API_KEY)

            if mode == "voice2text":
                await websocket.send_json({"text": text})

            elif mode == "voice2voice":
                ai_response = ask_question(text, GEMINI_API_KEY)
                audio_url = text_to_speech(ai_response)
                await websocket.send_json({
                    "text": ai_response,
                    "audio_url": audio_url
                })

            else:
                await websocket.send_json({"error": "Invalid mode"})

    except WebSocketDisconnect:
        print("WebSocket client disconnected")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)

