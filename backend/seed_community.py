import requests

def seed_community():
    base_url = "http://127.0.0.1:8000"
    try:
        print("Seeding Community Feed...")
        response = requests.post(f"{base_url}/seed-full")
        if response.status_code == 200:
            print("Seed successful!")
            print("Response:", response.json())
        else:
            print(f"Seed failed: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    seed_community()
