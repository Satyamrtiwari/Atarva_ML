from sentence_transformers import SentenceTransformer

# Load model ONCE at startup
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def get_embedding(text: str):
    return embedding_model.encode(text)