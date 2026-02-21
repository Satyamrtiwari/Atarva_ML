# ml_service/models/style_model.py

import os
from groq import Groq


def rewrite_with_llm(text: str, tone: str, level: str):

    api_key = os.getenv("GROQ_API_KEY")

    # Safety fallback
    if not api_key or api_key.strip() == "":
        print("⚠ GROQ_API_KEY missing in rewrite_with_llm")
        return text

    try:
        client = Groq(api_key=api_key)

        prompt = f"""
Rewrite the following text.

Tone: {tone}
Enhancement level: {level}

Preserve original meaning.

Text:
{text}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "Professional writing assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=400
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("⚠ LLM rewrite error:", str(e))
        return text