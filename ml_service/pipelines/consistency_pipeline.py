import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from models.embedding_model import get_embedding

# Temporary in-memory session memory
session_memory = {}

def analyze_consistency(text: str, session_id: int):

    embedding = get_embedding(text)

    if session_id not in session_memory:
        session_memory[session_id] = embedding
        return {
            "drift_score": 0.0,
            "consistency_score": 1.0
        }

    previous_embedding = session_memory[session_id]

    similarity = cosine_similarity(
        [embedding],
        [previous_embedding]
    )[0][0]

    drift = 1 - similarity

    # Update session memory (running average)
    session_memory[session_id] = (previous_embedding + embedding) / 2

    return {
        "drift_score": float(drift),
        "consistency_score": float(similarity)
    }