from chatbot import (
    get_health_answer,
    generate_health_summary
)
latest_health_data = None
latest_risk_result = None
latest_summary = None

from fastapi.responses import FileResponse
from report_generator import generate_pdf_report
from chatbot import generate_health_summary
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from prediction import HealthData, predict_risk
from report_parser import extract_text, extract_health_data

app = FastAPI(title="AI Digital Doctor Twin")

latest_health_data = None
latest_risk_result = None
latest_summary = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Digital Doctor Twin Backend Running"
    }


@app.post("/predict")
def predict(data: HealthData):
    return predict_risk(data)


@app.post("/upload-report")
async def upload_report(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    report_text = extract_text(file_path)
    print(report_text)
    health_data = extract_health_data(report_text)

    risk_result = predict_risk(
        HealthData(
            age=health_data["age"],
            bmi=health_data["bmi"],
            blood_pressure=health_data["blood_pressure_systolic"],
            glucose=health_data["glucose"]
        )
    )

    summary = generate_health_summary(health_data)

    global latest_health_data
    global latest_risk_result
    global latest_summary

    latest_health_data = health_data
    latest_risk_result = risk_result
    latest_summary = summary

    return {
    "filename": file.filename,
    "health_data": health_data,
    "risk_prediction": risk_result,
    "summary": summary
        }


from pydantic import BaseModel
from chatbot import get_health_answer

class ChatRequest(BaseModel):
    question: str
    health_data: dict

@app.post("/chat")
def chat(request: ChatRequest):

    answer = get_health_answer(
        request.question,
        request.health_data
    )

    return {
        "answer": answer
    }

@app.get("/download-report")
def download_report():

    pdf_path = "health_report.pdf"

    generate_pdf_report(
        latest_health_data,
        latest_risk_result,
        latest_summary,
        pdf_path
    )

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="health_report.pdf"
    )