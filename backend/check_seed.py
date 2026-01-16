import requests
import sys

def check_and_seed():
    base_url = "http://127.0.0.1:8000"
    
    try:
        # Check levels
        print("Checking levels...")
        response = requests.get(f"{base_url}/levels")
        if response.status_code != 200:
            print(f"Error fetching levels: {response.status_code}")
            return

        levels = response.json()
        print(f"Found {len(levels)} levels.")

        if len(levels) == 0:
            print("Database is empty. Seeding data...")
            seed_response = requests.post(f"{base_url}/seed")
            if seed_response.status_code == 200:
                print("Seed successful!")
                print("Response:", seed_response.json())
            else:
                print(f"Seed failed: {seed_response.status_code}")
        else:
            print("Levels already exist. No action needed.")

    except Exception as e:
        print(f"Connection failed: {e}")
        print("Make sure the backend server is running!")

if __name__ == "__main__":
    check_and_seed()
