from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from transformers import pipeline
import torch
from langchain.llms import HuggingFacePipeline
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain

persist_directory = 'db'

checkpoint = "./LaMini-T5-738M"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
base_model = AutoModelForSeq2SeqLM.from_pretrained(checkpoint,device_map='cpu',torch_dtype=torch.float32)

def llm_pipeline():

    pipe = pipeline(
        'text2text-generation',
        model = base_model,
        tokenizer = tokenizer,
        max_length = 512,
        do_sample=True,
        temperature=0.3,
        top_p=0.95
    )
    local_llm = HuggingFacePipeline(pipeline=pipe)
    return local_llm

def qa_llm():
    llm = llm_pipeline()
    embedding = SentenceTransformerEmbeddings(model_name="all-mpnet-base-v2")
    vectordb = Chroma(persist_directory=persist_directory, embedding_function=embedding)
    retriever = vectordb.as_retriever()
    qa = ConversationalRetrievalChain.from_llm(llm=llm,chain_type="stuff",retriever=retriever)
    return qa

chat_history = []
def process_answer(prompt:str):
    question = prompt
    qa = qa_llm()
    generated_text = qa({"question":question, "chat_history": chat_history})
    answer = generated_text["answer"]
    chat_history.append((question, generated_text["answer"]))
    return answer
