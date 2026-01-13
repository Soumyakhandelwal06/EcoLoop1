import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
# User needs to set GEMINI_API_KEY in .env or environment
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

async def verify_image_content(image_file: bytes, task_tag: str) -> dict:
    """
    Verifies if the uploaded image matches the required task using Gemini Flash.
    """
    if not api_key:
        # Fallback if no key provided (Mock mode for safety/demo)
        print("WARNING: GEMINI_API_KEY not found. Returning Mock Success.")
        return {
            "is_valid": True, 
            "message": "AI Verification Skipped (No API Key). Assuming success!", 
            "confidence": 1.0
        }

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Prepare the prompt based on the task
        prompt = f"Analyze this image. Does it show {task_tag}? Answer ONLY with a JSON object: {{ 'valid': boolean, 'reason': string }}."
        
        # Convert bytes to a format Gemini accepts (if using Python SDK, it often takes PIL Image or bytes)
        # The new SDK is quite flexible. Let's try passing Part object or just raw data.
        # Actually, standard way is:
        from PIL import Image
        import io
        
        image = Image.open(io.BytesIO(image_file))
        
        response = model.generate_content([prompt, image])
        
        if not response or not hasattr(response, 'text'):
             return {
                "is_valid": False,
                "message": "AI could not process this image. Please try a clearer photo.",
                "confidence": 0.0
            }

        # Parse text response (Naive parsing, expecting JSON-like structure or just simple text if JSON fails)
        text = response.text.replace('```json', '').replace('```', '').strip()
        
        # Simple cleanup if the model creates a block
        import json
        try:
            result = json.loads(text)
            return {
                "is_valid": result.get("valid", False),
                "message": result.get("reason", "Analysis complete."),
                "confidence": 0.95 
            }
        except json.JSONDecodeError:
            # Fallback if response isn't perfect JSON
            is_valid = "true" in text.lower() or "yes" in text.lower()
            return {
                "is_valid": is_valid,
                "message": text,
                "confidence": 0.8
            }

    except Exception as e:
        import traceback
        traceback.print_exc() # Log to console
        print(f"Gemini Error Details: {e}")
        return {
            "is_valid": False, 
            "message": f"AI Error: {str(e)}", 
            "confidence": 0.0
        }
