# ml_service/models/script_model.py

import os
from groq import Groq


def generate_script(plan: str, tone: str, length: str):

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return plan

    client = Groq(api_key=api_key)

    prompt = f"""
Write a story using this plan.

Tone: {tone}
Length: {length}

Plan:
{plan}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "Creative writer."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.8,
        max_tokens=800
    )

    return response.choices[0].message.content.strip()