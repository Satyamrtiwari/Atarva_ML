# ml_service/models/planner_model.py

import os
from groq import Groq


def plan_story(user_input: str, genre: str):

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return user_input

    client = Groq(api_key=api_key)

    prompt = f"""
Create a structured story plan.

Genre: {genre}

Based on:
{user_input}

Return bullet point outline.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "Story planner."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=400
    )

    return response.choices[0].message.content.strip()