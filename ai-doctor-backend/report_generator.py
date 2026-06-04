from fileinput import filename

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet


def generate_pdf_report(health_data, risk_result, summary, filename):

    pdf = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph("AI Digital Doctor Health Report", styles["Title"])
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(f"Age: {health_data['age']}", styles["BodyText"])
    )

    content.append(
        Paragraph(f"BMI: {health_data['bmi']}", styles["BodyText"])
    )

    content.append(
        Paragraph(
            f"Glucose: {health_data['glucose']}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"Cholesterol: {health_data['cholesterol']}",
            styles["BodyText"]
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(
            f"Risk Score: {risk_result['risk_score']}",
            styles["Heading2"]
        )
    )

    content.append(
        Paragraph(
            f"Status: {risk_result['status']}",
            styles["Heading2"]
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph("AI Summary", styles["Heading1"])
    )

    content.append(
        Paragraph(summary, styles["BodyText"])
    )

    pdf.build(content)

    return filename