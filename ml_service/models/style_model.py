from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

device = torch.device("cpu")

tokenizer = AutoTokenizer.from_pretrained("Vamsi/T5_Paraphrase_Paws")
model = AutoModelForSeq2SeqLM.from_pretrained("Vamsi/T5_Paraphrase_Paws").to(device)

def rewrite_formal(text: str):

    prompt = "paraphrase: " + text + " </s>"

    encoding = tokenizer(
        prompt,
        padding="longest",
        max_length=256,
        truncation=True,
        return_tensors="pt"
    ).to(device)

    with torch.no_grad():
        outputs = model.generate(
            input_ids=encoding.input_ids,
            attention_mask=encoding.attention_mask,
            max_length=256,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            temperature=1.2,
            num_return_sequences=1
        )

    rewritten = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return rewritten.strip()





























#     from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# import torch

# device = torch.device("cpu")

# tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
# model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base").to(device)

# def rewrite_formal(text: str):

#     prompt = (
#         "Rewrite the following text in a clear, formal, and professional academic tone. "
#         "Improve vocabulary and structure while preserving meaning:\n\n"
#         f"{text}"
#     )

#     inputs = tokenizer(
#         prompt,
#         return_tensors="pt",
#         truncation=True,
#         max_length=512
#     ).to(device)

#     with torch.no_grad():
#         outputs = model.generate(
#             **inputs,
#             max_length=256,
#             num_beams=4,
#             length_penalty=1.0,
#             early_stopping=True
#         )

#     rewritten = tokenizer.decode(outputs[0], skip_special_tokens=True)

#     return rewritten