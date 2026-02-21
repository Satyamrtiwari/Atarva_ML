from fastapi import FastAPI
from pipelines.consistency_pipeline import analyze_consistency
from pipelines.structure_pipeline import analyze_readability
from models.emotion_model import detect_emotion
from models.style_model import rewrite_formal

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ML service running"}

@app.post("/analyze")
def analyze(data: dict):
    text = data.get("text")
    session_id = data.get("session_id")

    # Consistency
    consistency = analyze_consistency(text, session_id)

    # Emotion
    emotion = detect_emotion(text)

    # Readability BEFORE
    readability_before = analyze_readability(text)

    # Rewrite
    enhanced_text = rewrite_formal(text)

    # Readability AFTER
    readability_after = analyze_readability(enhanced_text)

    explanation = "Text rewritten into a more formal tone to improve clarity and structure."

    return {
        "drift_score": consistency["drift_score"],
        "consistency_score": consistency["consistency_score"],
        "emotion": emotion,
        "readability_before": readability_before,
        "readability_after": readability_after,
        "enhanced_text": enhanced_text,
        "explanation": explanation
    }