
import os
import google.generativeai as genai
from dotenv import load_dotenv

def test_api():
    print("--- 🤖 TESTING GEMINI API CONNECTION ---")
    
    # 1. Check .env
    load_dotenv()
    key = os.getenv("GOOGLE_API_KEY")
    
    if not key:
        print("❌ CRITICAL: GOOGLE_API_KEY not found in environment!")
        return

    print(f"✅ API Key found: {key[:5]}...{key[-5:]}")
    
    # 2. Configure
    genai.configure(api_key=key)
    
    # 3. List Models
    print("\n--- Listing Models ---")
    try:
        models = list(genai.list_models())
        print(f"✅ Successfully listed {len(models)} models.")
        for m in models:
            if 'generateContent' in m.supported_generation_methods:
                print(f"   - {m.name}")
    except Exception as e:
         print(f"❌ Failed to list models: {e}")
         return

    # 4. Test Generation
    print("\n--- Testing Content Generation (gemini-2.0-flash) ---")
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content("Hello! Are you working?")
        print(f"✅ Response received: {response.text}")
    except Exception as e:
        print(f"⚠️ 'gemini-2.0-flash' failed: {e}")
        try:
             print("   Trying 'gemini-1.5-flash' fallback...")
             model = genai.GenerativeModel('gemini-1.5-flash')
             response = model.generate_content("Hello fallback!")
             print(f"✅ Fallback Response received: {response.text}")
        except Exception as e2:
             print(f"❌ Fallback also failed: {e2}")

if __name__ == "__main__":
    test_api()
