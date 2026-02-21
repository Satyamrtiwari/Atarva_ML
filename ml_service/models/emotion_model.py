# ml_service/models/emotion_model.py

import os
from groq import Groq

ALLOWED_EMOTIONS = [
    "joy", "sadness", "anger",
    "fear", "surprise", "disgust",
    "neutral"
]


def detect_emotion(text: str):

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return "neutral"

    client = Groq(api_key=api_key)

    prompt = f"""
Classify the dominant emotion.

Allowed emotions:
{", ".join(ALLOWED_EMOTIONS)}

Return ONLY one word.

Text:
{text}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "Emotion classifier."},
            {"role": "user", "content": prompt}
        ],
        temperature=0,
        max_tokens=10
    )

    emotion = response.choices[0].message.content.strip().lower()

    if emotion not in ALLOWED_EMOTIONS:
        return "neutral"

    return emotion