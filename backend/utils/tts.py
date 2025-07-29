import requests

def text_to_speech(text):
    # Dummy endpoint - replace this with ElevenLabs, Google TTS, or similar
    response = requests.post("https://api.example.com/tts", json={"text": text})
    audio_url = response.json().get("audio_url")
    return audio_url
