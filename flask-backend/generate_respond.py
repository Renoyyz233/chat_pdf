import os
#set up your api key
os.environ["OPENAI_API_KEY"] = "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"
import os
import openai

def generate_text(openAI_key, prompt, engine="text-davinci-003"):
    openai.api_key = openAI_key
    try:
        completions = openai.Completion.create(
            engine=engine,
            prompt=prompt,
            max_tokens=512,
            n=1,
            stop=None,
            temperature=0.7,
        )
        message = completions.choices[0].text
    except Exception as e:
        message = f'API Error: {str(e)}'
    return message


def generate_answer(question, openAI_key,recommender):
    topn_chunks = recommender(question)
    print("_____",topn_chunks,"_____")
    prompt = ""
    prompt += 'search results:\n\n'
    for c in topn_chunks:
        prompt += c + '\n\n'

    prompt += (
        "Instructions: Compose a comprehensive reply to the query using the search results given. "
        "Cite each reference using [ Page Number] notation (every result has this number at the beginning). "
        "Citation should be done at the end of each sentence. If the search results mention multiple subjects "
        "with the same name, create separate answers for each. Only include information found in the results and "
        "don't add any additional information. Make sure the answer is correct and don't output false content. "
        " Ignore outlier "
        "search results which has nothing to do with the question. Only answer what is asked. The "
        "answer should be short and concise. Answer step-by-step. \n\nQuery: {question}\nAnswer: "
    )

    prompt += f"Query: {question}\nAnswer:"
    answer = generate_text(openAI_key, prompt, "text-davinci-003")
    return answer

def load_openai_key() -> str:
    key = os.environ.get("OPENAI_API_KEY")
    if key is None:
        raise ValueError(
            "[ERROR]: Please pass your OPENAI_API_KEY. Get your key here : https://platform.openai.com/account/api-keys"
        )
    return key


def ask_file(question: str,recommender) -> str:
    openAI_key = load_openai_key()
    return generate_answer(question, openAI_key,recommender)