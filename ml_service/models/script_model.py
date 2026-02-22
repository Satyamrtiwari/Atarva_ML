# ml_service/models/script_model.py

import os
from groq import Groq


def generate_script(plan, tone, length, target_words=None, target_sentences=None):

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return plan

    try:
        client = Groq(api_key=api_key)

        # -------------------------
        # Length Instruction Logic
        # -------------------------
        length_instruction = ""

        if target_words:
            length_instruction += f"Write approximately {target_words} words. "

        if target_sentences:
            length_instruction += f"Use about {target_sentences} sentences. "

        # -------------------------
        # Final Prompt
        # -------------------------
        final_prompt = f"""
You are a professional creative writer.

Write a {tone} story.

Preset length level: {length}.

{length_instruction}

Ensure:
- Strong narrative flow
- Emotional depth
- Coherent structure
- No formatting symbols
- No bullet points

Story Plan:
{plan}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You write cinematic high-quality stories."},
                {"role": "user", "content": final_prompt}
            ],
            temperature=0.8,
            max_tokens=900
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("⚠ Script generation error:", str(e))
        return plan