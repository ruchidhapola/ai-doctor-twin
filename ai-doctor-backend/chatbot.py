def get_health_answer(question, health_data):

    q = question.lower()

    if "glucose" in q:
        return (
            f"Your glucose level is {health_data['glucose']} mg/dL. "
            "This is above the normal fasting range and may indicate impaired blood sugar control. "
            "Regular monitoring and medical consultation are recommended."
        )

    if "bmi" in q:
        return (
            f"Your BMI is {health_data['bmi']}. "
            "A higher BMI may increase the risk of diabetes, hypertension, and cardiovascular disease."
        )

    if "cholesterol" in q:
        return (
            f"Your cholesterol level is {health_data['cholesterol']} mg/dL. "
            "Elevated cholesterol can increase the risk of heart disease over time."
        )

    if "blood pressure" in q:
        return (
            f"Your blood pressure is "
            f"{health_data['blood_pressure_systolic']}/"
            f"{health_data['blood_pressure_diastolic']} mmHg. "
            "Maintaining healthy blood pressure helps reduce cardiovascular risk."
        )

    if "summary" in q or "health" in q:
        return generate_health_summary(health_data)

    return (
        "Based on your uploaded report, some health indicators may require attention. "
        "Please consult a healthcare professional for personalized medical advice."
    )


def generate_health_summary(health_data):

    summary = []

    if (
        health_data.get("glucose") is not None
        and health_data["glucose"] > 125
    ):
        summary.append(
            "Glucose levels are elevated and may indicate diabetes risk."
        )

    if (
        health_data.get("bmi") is not None
        and health_data["bmi"] > 25
    ):
        summary.append(
            "BMI is above the healthy range."
        )

    if (
        health_data.get("cholesterol") is not None
        and health_data["cholesterol"] > 200
    ):
        summary.append(
            "Cholesterol is elevated and may increase heart disease risk."
        )

    if (
        health_data.get("blood_pressure_systolic") is not None
        and health_data["blood_pressure_systolic"] > 140
    ):
        summary.append(
            "Blood pressure is elevated and should be monitored."
        )

    if not summary:
        summary.append(
            "Most health indicators appear within normal limits."
        )

    return " ".join(summary)