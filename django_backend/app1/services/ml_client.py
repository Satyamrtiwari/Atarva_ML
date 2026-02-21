import requests

ML_SERVICE_URL = "http://127.0.0.1:8001/analyze"

def analyze_text_with_ml(text, session_id):
    try:
        response = requests.post(
            ML_SERVICE_URL,
            json={
                "text": text,
                "session_id": session_id
            },
            timeout=60
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}