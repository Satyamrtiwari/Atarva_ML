import textstat

def analyze_readability(text: str):
    score = textstat.flesch_reading_ease(text)
    return float(score)