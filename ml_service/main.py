# ml_service/main.py

import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from pydantic import BaseModel
import json

from models.embedding_model import analyze_consistency
from models.readability_model import analyze_readability
from models.explainability_model import generate_explainability
from models.emotion_model import detect_emotion
from models.style_model import rewrite_with_llm
from models.intent_model import analyze_intent
from models.planner_model import plan_story
from models.script_model import generate_script

app = FastAPI(title="AI-Powered Writer API")


# ============================
# TEXT CLEANER
# ============================

def clean_text(text: str) -> str:
    return " ".join(text.replace("\n", " ").split())


# ============================
# REQUEST MODELS
# ============================

class EnhancementRequest(BaseModel):
    session_id: int
    text: str
    tone: str = "formal"
    level: str = "medium"


class ScriptRequest(BaseModel):
    session_id: int
    prompt: str
    genre: str = "general"
    tone: str = "storyteller"
    length: str = "medium"
    target_words: int | None = None


class WriterRequest(BaseModel):
    session_id: int
    user_input: str


# ============================
# ENHANCEMENT ENDPOINT
# ============================

@app.post("/analyze")
def analyze_content(data: EnhancementRequest):

    readability_before = analyze_readability(data.text)

    enhanced_text = rewrite_with_llm(
        data.text,
        data.tone,
        data.level
    )

    enhanced_text = clean_text(enhanced_text)

    readability_after = analyze_readability(enhanced_text)

    consistency = analyze_consistency(
        enhanced_text,
        data.session_id
    )

    emotion = detect_emotion(enhanced_text)

    explanation = generate_explainability(
        original=data.text,
        enhanced=enhanced_text,
        before=readability_before,
        after=readability_after,
        tone=data.tone,
        level=data.level
    )

    return {
        "mode": "enhancement",
        "enhanced_text": enhanced_text,
        "emotion": emotion,
        "drift_score": consistency["drift_score"],
        "consistency_score": consistency["consistency_score"],
        "readability_before": readability_before,
        "readability_after": readability_after,
        "explanation": explanation
    }


# ============================
# SCRIPT GENERATION ENDPOINT
# ============================

@app.post("/generate")
def generate_content(data: ScriptRequest):

    plan = plan_story(data.prompt, data.genre)

    generated_text = generate_script(
        plan,
        data.tone,
        data.length,
        data.target_words
    )

    generated_text = clean_text(generated_text)

    consistency = analyze_consistency(
        generated_text,
        data.session_id
    )

    emotion = detect_emotion(generated_text)

    readability = analyze_readability(generated_text)

    return {
        "mode": "script_generation",
        "generated_text": generated_text,
        "emotion": emotion,
        "drift_score": consistency["drift_score"],
        "consistency_score": consistency["consistency_score"],
        "readability": readability,
        "plan_used": clean_text(plan)
    }


# ============================
# AUTO ROUTER
# ============================

@app.post("/writer")
def auto_writer(data: WriterRequest):

    intent_raw = analyze_intent(data.user_input)

    try:
        intent = json.loads(intent_raw)
    except:
        return {"error": "Intent parsing failed", "raw_output": intent_raw}

    task_type = intent.get("task_type")

    if task_type == "content_enhancement":

        tone = intent.get("tone", "formal")
        level = intent.get("level", "medium")

        return analyze_content(
            EnhancementRequest(
                session_id=data.session_id,
                text=data.user_input,
                tone=tone,
                level=level
            )
        )

    elif task_type == "script_generation":

        genre = intent.get("genre", "general")
        tone = intent.get("tone", "storyteller")
        length = intent.get("length", "medium")

        return generate_content(
            ScriptRequest(
                session_id=data.session_id,
                prompt=data.user_input,
                genre=genre,
                tone=tone,
                length=length
            )
        )

    return {"error": "Could not determine task type"}