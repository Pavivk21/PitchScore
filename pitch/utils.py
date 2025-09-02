import openai
import matplotlib.pyplot as plt
from reportlab.pdfgen import canvas

openai.api_key = "YOUR_API_KEY"

def analyze_pitch(text):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": f"Analyze this pitch and return a score 0-100: {text}"}],
    )
    score = float(response.choices[0].message.content.split()[0])
    return score


def plot_scores(scores, filename="score.png"):
    categories = [s['category'] for s in scores]
    values = [s['score'] for s in scores]

    plt.barh(categories, values, color='skyblue')
    plt.xlim(0, 100)
    plt.savefig(filename)
    plt.close()

def create_pdf_report(company_name, overall_score, filename="report.pdf"):
    c = canvas.Canvas(filename)
    c.setFont("Helvetica", 20)
    c.drawString(100, 800, f"Pitch Report: {company_name}")
    c.drawString(100, 760, f"Overall Score: {overall_score}")
    c.save()