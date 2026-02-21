import re


def count_sentences(text):
    sentences = re.split(r'[.!?]+', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    return max(len(sentences), 1)


def count_words(text):
    words = re.findall(r'\w+', text)
    return max(len(words), 1)


def count_syllables(word):
    word = word.lower()
    vowels = "aeiouy"
    syllables = 0
    prev_char_was_vowel = False

    for char in word:
        if char in vowels:
            if not prev_char_was_vowel:
                syllables += 1
            prev_char_was_vowel = True
        else:
            prev_char_was_vowel = False

    if word.endswith("e"):
        syllables = max(syllables - 1, 1)

    return max(syllables, 1)


def analyze_readability(text: str):

    sentences = count_sentences(text)
    words = re.findall(r'\w+', text)

    total_words = max(len(words), 1)
    total_syllables = sum(count_syllables(word) for word in words)

    asl = total_words / sentences
    asw = total_syllables / total_words

    flesch_score = 206.835 - (1.015 * asl) - (84.6 * asw)

    return round(flesch_score, 2)