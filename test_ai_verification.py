
import asyncio
import os
from dotenv import load_dotenv
from backend import ai_service

# Load env for API key
load_dotenv()

async def test_verification():
    print("Testing AI Verification...")
    
    # Create a dummy image
    from PIL import Image
    img = Image.new('RGB', (100, 100), color = 'red')
    img_path = "test_image.jpg"
    img.save(img_path)
    
    try:
        # Test with a prompt that should FAIL (Red square is not a tree)
        print("Test 1: Verifying 'Red Square' against 'Tree' (Should be Invalid)")
        result = await ai_service.verify_task_content(img_path, "image/jpeg", "tree")
        print(f"Result: {result}")
        
        if result['is_valid']:
            print("❌ FAILURE: Red square was accepted as a tree! (Bypass active?)")
        else:
            print("✅ SUCCESS: Red square was rejected.")

        # Test with a prompt involving the image content (Red Color)
        print("\nTest 2: Verifying 'Red Square' against 'Something Red' (Should be Valid)")
        result = await ai_service.verify_task_content(img_path, "image/jpeg", "red color")
        print(f"Result: {result}")
        
        if result['is_valid']:
             print("✅ SUCCESS: Red square was active.")
        else:
             print("❌ FAILURE: Red square was rejected for 'red color'.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if os.path.exists(img_path):
            os.remove(img_path)

if __name__ == "__main__":
    asyncio.run(test_verification())
