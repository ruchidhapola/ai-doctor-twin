from pydantic import BaseModel

class HealthData(BaseModel):
    age: int
    bmi: float
    blood_pressure: int
    glucose: int

def predict_risk(data):

    risk_score = 0

    if data.bmi > 25:
        risk_score += 20

    if data.blood_pressure > 130:
        risk_score += 30

    if data.glucose > 125:
        risk_score += 50

    if risk_score < 30:
        status = "🟢 Low Risk"

    elif risk_score < 60:
        status = "🟡 Moderate Risk"

    elif risk_score < 90:
        status = "🟠 High Risk"

    else:
        status = "🔴 Very High Risk"

    return {
        "risk_score": risk_score,
        "status": status,
    }