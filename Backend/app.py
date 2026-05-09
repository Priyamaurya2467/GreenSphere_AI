from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PIL import Image
import os
import json
from google import genai

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found. Add it inside .env file.")

client = genai.Client(api_key=api_key)


def clean_json(text):
    text = text.strip()
    text = text.replace("```json", "")
    text = text.replace("```", "")
    return text.strip()


def analyze_image_with_gemini(image_file):
    image = Image.open(image_file).convert("RGB")

    prompt = """
    You are EcoSnap waste analyzer.

    Analyze this waste image carefully.

    Return ONLY valid JSON. Do not write extra text.

    JSON format:
    {
      "object": "name of detected waste object",
      "material": "plastic / paper / glass / metal / organic / e-waste / mixed waste / unknown",
      "composition": "explain in simple human language what this item is made of",
      "decompositionTime": "estimated decomposition time in simple words",
      "recycleProcess": [
        "step 1 in simple language",
        "step 2 in simple language",
        "step 3 in simple language",
        "step 4 in simple language"
      ],
      "ecoTip": "one useful eco friendly tip"
    }

    Use easy English. Explanation should be understandable by normal people.
    If image is unclear, still give best possible answer.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=[prompt, image]
    )

    text = clean_json(response.text)

    try:
        return json.loads(text)
    except Exception:
        return {
            "object": "Unknown waste object",
            "material": "unknown",
            
            "decompositionTime": "Not available",
            "recycleProcess": [
                "Capture a clearer image.",
                "Keep only one waste object in the frame.",
                "Try again in good lighting."
            ],
            "ecoTip": "Separate dry waste and wet waste before disposal."
        }


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "EcoSnap Gemini backend running"
    })


@app.route("/analyze-waste", methods=["GET", "POST"])
def analyze_waste():
    if request.method == "GET":
        return jsonify({
            "message": "Send image using POST request with key name 'image'."
        })

    try:
        if "image" not in request.files:
            return jsonify({
                "error": "No image uploaded. Send image with key name 'image'."
            }), 400

        image_file = request.files["image"]
        print("Image received:", image_file.filename)

        gemini_data = analyze_image_with_gemini(image_file)

        return jsonify({
            "object": gemini_data.get("object", "Unknown"),
            "material": gemini_data.get("material", "unknown"),
           
            "composition": gemini_data.get("composition", "Not available"),
            "decompositionTime": gemini_data.get("decompositionTime", "Not available"),
            "recycleProcess": gemini_data.get("recycleProcess", []),
            "ecoTip": gemini_data.get("ecoTip", "Reduce, reuse, and recycle.")
        })

    except Exception as e:
        print("Main route error:", e)
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    print("Starting EcoSnap Gemini Flask backend...")
    app.run(debug=True, host="0.0.0.0", port=5000)