from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import openai
import os
import json

from openai import OpenAI

app = Flask(__name__)
CORS(app)

openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)

def extract_text(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

@app.route('/parse', methods=['POST'])
def parse_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join("temp.pdf")
    file.save(file_path)

    extracted_text = extract_text(file_path)

    prompt = f"""
You are an AI assistant helping summarize job offer letters for students.

Your task is to extract the following categories **as clear, bullet-point summaries**, with each bullet starting on a new line:

1. **Job Details**  
   Include: role title, department, reporting manager, work location, start/end dates, hours, remote/hybrid setup, etc.

2. **Compensation**  
   Include: salary, signing bonus, equity (RSUs/stock), and any variable pay.

3. **Benefits**  
   Include: insurance, vacation, wellness programs, tuition reimbursement, etc.

4. **Red Flags**  
   For each category, list any vague, missing, or concerning information. Be honest and cautious.

---

**Return JSON in this exact format**, using `\\n` to separate bullet points:

{{
  "jobDetails": "- Point 1\\n- Point 2\\n- Point 3",
  "compensation": "- Point 1\\n- Point 2",
  "benefits": "- Point 1\\n- Point 2\\n- Point 3",
  "redFlags": {{
    "jobDetails": "- Missing remote policy\\n- No manager named",
    "compensation": "- No mention of equity",
    "benefits": "- No retirement benefits listed"
  }}
}}

Here is the full job offer text to extract from:

\"\"\"
{extracted_text}
\"\"\"
"""



    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )

        content = response.choices[0].message.content.strip()

        try:
            parsed_data = json.loads(content)
        except json.JSONDecodeError:
            print("⚠️ GPT response not valid JSON, returning as raw text.")
            return jsonify({"summary": content})

        return jsonify(parsed_data)

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
