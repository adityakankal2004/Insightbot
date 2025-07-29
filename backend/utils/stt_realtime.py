# utils/stt_realtime.py
import requests

def speech_to_text(file, api_key: str) -> str:
    response = requests.post(
        "https://api.deepgram.com/v1/listen",
        headers={
            "Authorization": f"Token {api_key}",
            "Content-Type": "audio/wav"
        },
        data=file
    )

    if response.status_code == 200:
        return response.json()["results"]["channels"][0]["alternatives"][0]["transcript"]
    else:
        return "Speech recognition failed"
