from transformers import pipeline

emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=1
)

def detect_emotion(text: str):
    result = emotion_classifier(text)[0]
    return result[0]["label"]