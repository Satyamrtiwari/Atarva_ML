# ml_service/models/explainability_model.py

def generate_explainability(original, enhanced, before, after, tone, level):

    return {
        "tone_applied": tone,
        "enhancement_level": level,
        "readability_change": round(after - before, 2),
        "structural_change": "Refinement applied based on selected level."
    }