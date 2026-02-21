from transformers import pipeline

style_generator = pipeline(
    "text2text-generation",
    model="google/flan-t5-small"
)

def rewrite_formal(text: str):
    prompt = f"Rewrite the following text in a formal tone: {text}"
    result = style_generator(prompt, max_length=128)
    return result[0]["generated_text"]