
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    print("No API key found in .env")
else:
    genai.configure(api_key=api_key)
    print(f"Checking models with API Key: {api_key[:5]}...{api_key[-5:]}")
    try:
        print("Listing available models...")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"Name: {m.name} | Display Name: {m.display_name}")
    except Exception as e:
        print(f"Error listing models: {e}")
