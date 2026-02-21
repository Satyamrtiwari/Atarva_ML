# ml_service/models/intent_model.py

import os
from groq import Groq


def analyze_intent(text: str):

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        return '{"task_type":"content_enhancement","tone":"formal","level":"medium"}'

    client = Groq(api_key=api_key)

    prompt = f"""
You are an AI intent classification system.

You MUST return ONLY valid JSON.
No explanation.
No markdown.
No extra text.

If the user wants to:
- improve or rewrite text → content_enhancement
- create or generate a story/script → script_generation

Return JSON in one of these formats:

For enhancement:
{{
  "task_type": "content_enhancement",
  "tone": "formal",
  "level": "medium"
}}

For script generation:
{{
  "task_type": "script_generation",
  "genre": "fantasy",
  "tone": "storyteller",
  "length": "medium"
}}

User Input:
{text}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "Strict JSON intent classifier."},
            {"role": "user", "content": prompt}
        ],
        temperature=0,
        max_tokens=200
    )

    return response.choices[0].message.content.strip()