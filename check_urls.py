import time
import requests

# URLs to check
url1 = "https://caring-minds.onrender.com/"
url2 = "https://caring-minds-backend.onrender.com/match_caregivers"

data = {
  "availability": "Full Time",
  "behaviouralSymptoms": ["Mental decline"],
  "careType": ["Medication Management", "Daily Living Support"],
  "dementiaStage": "Moderate",
  "dementiaType": ["Alzheimer's Disease", "Vascular Dementia"],
  "emotionalSymptoms": ["Agitation"],
  "gender": "Do not wish to disclose",
  "genderPreference": "Female",
  "languagePreference": ["English"],
  "languageSymptoms": [],
  "lifestyleChanges": [],
  "movementSymptoms": ["Muscle stiffness or rigidity"],
  "otherSymptoms": []
}

headers = {"Content-Type": "application/json"}

def check_urls():
  try:
    response1 = requests.get(url1)
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {url1} - Status: {response1.status_code}")
  except Exception as e:
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {url1} - Error: {e}")

  try:
    response2 = requests.post(url2, headers=headers, json=data)
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {url2} - Status: {response2.status_code}")
  except Exception as e:
      print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {url2} - Error: {e}")

if __name__ == "__main__":
  while True:
    check_urls()
    time.sleep(60)  # wait for 1 minute
