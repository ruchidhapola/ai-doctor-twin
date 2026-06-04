import re
from pypdf import PdfReader

def extract_text(pdf_path):
    reader = PdfReader(pdf_path)

    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    return text


import re


import re


def find_value(patterns, text, value_type="int"):
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            value = match.group(1)

            try:
                if value_type == "float":
                    return float(value)

                return int(float(value))

            except:
                pass

    return None


def extract_health_data(text):

    age = find_value(
        [
            r"Age\s*[:=]?\s*(\d+)",
            r"Patient Age\s*[:=]?\s*(\d+)",
            r"(\d+)\s*years?\s*old",
            r"(\d+)-year-old",
        ],
        text,
    )

    bmi = find_value(
        [
            r"BMI\s*[:=]?\s*([\d.]+)",
            r"Body Mass Index\s*[:=]?\s*([\d.]+)",
        ],
        text,
        "float",
    )

    glucose = find_value(
        [
            r"Fasting Blood Glucose\s*[:=]?\s*(\d+)",
            r"Blood Glucose\s*[:=]?\s*(\d+)",
            r"Blood Sugar\s*[:=]?\s*(\d+)",
            r"Glucose\s*[:=]?\s*(\d+)",
            r"Glucose.*?(\d+)\s*mg/?dL",
        ],
        text,
    )

    hba1c = find_value(
        [
            r"HbA1c\s*[:=]?\s*([\d.]+)",
            r"A1C\s*[:=]?\s*([\d.]+)",
            r"Glycated Hemoglobin\s*[:=]?\s*([\d.]+)",
        ],
        text,
        "float",
    )

    cholesterol = find_value(
        [
            r"Total Cholesterol\s*[:=]?\s*(\d+)",
            r"Cholesterol\s*[:=]?\s*(\d+)",
            r"Cholesterol.*?(\d+)\s*mg/?dL",
        ],
        text,
    )

    bp_match = re.search(
        r"(?:Blood Pressure|BP)\s*[:=]?\s*(\d+)\s*/\s*(\d+)",
        text,
        re.IGNORECASE,
    )

    systolic = None
    diastolic = None

    if bp_match:
        systolic = int(bp_match.group(1))
        diastolic = int(bp_match.group(2))

    return {
        "age": age,
        "bmi": bmi,
        "glucose": glucose,
        "hba1c": hba1c,
        "cholesterol": cholesterol,
        "blood_pressure_systolic": systolic,
        "blood_pressure_diastolic": diastolic,
    }