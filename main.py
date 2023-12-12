# main.py
from fastapi import FastAPI,Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import copy
from model import process_answer


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates/")

@app.get("/")
def form_post(request: Request):
    results = "What is Your Query"
    return templates.TemplateResponse('index.html', context={'request': request, 'results': results})
 
@app.get('/lamini')
async def model(question : str):
    res = process_answer(question)
    result = copy.deepcopy(res)
    return result