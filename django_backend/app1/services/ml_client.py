import requests

BASE_ML_URL = "http://127.0.0.1:8001"


def call_analyze(text, session_id, tone, level):
    try:
        response = requests.post(
            f"{BASE_ML_URL}/analyze",
            json={
                "text": text,
                "session_id": session_id,
                "tone": tone,
                "level": level
            },
            timeout=180
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


def call_generate(session_id, prompt, genre, tone, length,
                  target_words=None, target_sentences=None):

    try:
        response = requests.post(
            f"{BASE_ML_URL}/generate",
            json={
                "session_id": session_id,
                "prompt": prompt,
                "genre": genre,
                "tone": tone,
                "length": length,
                "target_words": target_words,
                "target_sentences": target_sentences
            },
            timeout=180
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


def call_writer(session_id, user_input,
                target_words=None, target_sentences=None):

    try:
        response = requests.post(
            f"{BASE_ML_URL}/writer",
            json={
                "session_id": session_id,
                "user_input": user_input,
                "target_words": target_words,
                "target_sentences": target_sentences
            },
            timeout=180
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}