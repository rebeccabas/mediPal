from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = OllamaLLM(model="llama3")


memory = ConversationBufferMemory()

template = """You are a compassionate and knowledgeable mental health consultant. 
Your role is to provide supportive and insightful responses to users seeking mental health advice. 
Always maintain a professional and empathetic tone. If you suspect the user is in crisis, 
gently suggest they seek immediate professional help.

Current conversation:
{history}
Human: {input}
AI:"""

prompt = ChatPromptTemplate.from_template(template)

conversation = ConversationChain(
    llm=llm,
    memory=memory,
    prompt=prompt
)

class Message(BaseModel):
    text: str

@app.post("/chat")
async def chat(message: Message):
    response = conversation.predict(input=message.text)
    return {"response": response}

@app.get("/")
async def root():
    return {"message": "Mental Health Chatbot API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)