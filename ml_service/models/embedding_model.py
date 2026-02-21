from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load model once
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Session memory (simple in-memory store)
session_memory = {}


def analyze_consistency(text: str, session_id: int):

    # Generate embedding
    embedding = model.encode([text])

    if session_id not in session_memory:
        session_memory[session_id] = []

    previous_embeddings = session_memory[session_id]

    if not previous_embeddings:
        # First paragraph → fully consistent
        session_memory[session_id].append(embedding[0])
        return {
            "drift_score": 0.0,
            "consistency_score": 1.0
        }

    # Compare with last paragraph
    last_embedding = previous_embeddings[-1].reshape(1, -1)

    similarity = cosine_similarity(last_embedding, embedding)[0][0]

    drift_score = 1 - similarity
    consistency_score = similarity

    # Store current embedding
    session_memory[session_id].append(embedding[0])

    return {
        "drift_score": float(drift_score),
        "consistency_score": float(consistency_score)
    }


    