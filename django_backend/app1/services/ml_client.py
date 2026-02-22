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


def call_writer(session_id, user_input, **kwargs):

    language = kwargs.get("language", "english").lower()
    
    # Simple prompt injection to handle translation in 5 mins
    if language == "hindi":
        user_input = f"[OUTPUT IN HINDI] {user_input}"
    elif language != "english":
        user_input = f"[OUTPUT IN {language.upper()}] {user_input}"

    try:
        payload = {
            "session_id": session_id,
            "user_input": user_input,
            **kwargs
        }
        response = requests.post(
            f"{BASE_ML_URL}/writer",
            json=payload,
            timeout=180
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}