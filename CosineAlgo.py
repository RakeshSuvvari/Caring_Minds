import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from db import get_db_connection

# Helper function to vectorize profiles based on predefined attributes
def create_profile_vector(profile, attributes):
  vector = []
  for attribute, options in attributes.items():
    if attribute in ['skills', 'language', 'dementia_type', 'symptoms', 'care_type']:
      # Multi-hot encoding for multi-select attributes
      vector.extend([1 if option in profile.get(attribute, []) else 0 for option in options])
    elif attribute == 'dementia_stage':
      # Map dementia stage to caregiver experience
      stage_to_experience = {'Mild': 2, 'Moderate': 3, 'Severe': 5}
      vector.append(stage_to_experience.get(profile.get(attribute, 'Mild'), 2))
    elif attribute == 'availability' or attribute == 'gender' or attribute == 'preferred_gender':
      # One-hot encoding for single-select attributes
      vector.extend([1 if profile.get(attribute) == option else 0 for option in options])
    else:
      # Append numeric attributes directly
      vector.append(profile.get(attribute, 0))
  return np.array(vector)


# Cosine similarity function
def calculate_cosine_similarity(caregiver_vector, carerecipient_vector):
  return cosine_similarity([caregiver_vector], [carerecipient_vector])[0][0]

def match_caregivers(care_recipient_data):
  # Parse care recipient's requirements from request
  carerecipient_vector = create_profile_vector(care_recipient_data, ATTRIBUTE_LIST)

  # Connect to the database and fetch caregiver profiles
  conn = get_db_connection()
  cursor = conn.cursor()
  cursor.execute("SELECT * FROM caregivers")
  caregivers = cursor.fetchall()

  # Define the column names to match table structure
  columns = ['id', 'gender', 'language', 'preferred_gender', 'dementia_type', 'symptoms', 
            'experience', 'care_type', 'availability']

  # Convert caregivers to a list of dictionaries
  caregivers = [dict(zip(columns, record)) for record in caregivers]

  # Prepare caregiver profiles for cosine similarity calculation
  caregiver_profiles = []
  for caregiver in caregivers:
    caregiver_profile = {
      'id': caregiver['id'],
      'gender': caregiver['gender'],
      'language': caregiver['language'],
      'preferred_gender': caregiver['preferred_gender'],
      'dementia_type': caregiver['dementia_type'],
      'symptoms': caregiver['symptoms'],
      'experience': caregiver['experience'],
      'care_type': caregiver['care_type'],
      'availability': caregiver['availability']
    }
    caregiver_profiles.append(caregiver_profile)

  # Compute similarity for each caregiver
  matches = []
  for caregiver in caregiver_profiles:
    caregiver_vector = create_profile_vector(caregiver, ATTRIBUTE_LIST)
    similarity_score = calculate_cosine_similarity(caregiver_vector, carerecipient_vector)
    matches.append((caregiver, similarity_score))

  # Sort caregivers by similarity score in descending order
  matches.sort(key=lambda x: x[1], reverse=True)

  # Format the output to include only caregiver information and similarity score
  result = [{
    'caregiver_id': match[0]['id'],
    'similarity_score': match[1],
    'caregiver_details': match[0]
  } for match in matches]

  # Close database connection
  cursor.close()
  conn.close()

  return result

# Define attributes for vectorization
ATTRIBUTE_LIST = {
  'gender': ['Male', 'Female', 'Non-binary', 'No Preference'],  # One-hot encoded
  'language': ['English', 'Spanish', 'French', 'No Preference'],  # Multi-hot encoded
  'preferred_gender': ['Male', 'Female', 'Non-binary', 'No Preference'],  # One-hot encoded
  'dementia_type': [
    "Alzheimer's Disease",
    'Frontotemporal Dementia',
    'Lewy Body Dementia',
    'Vascular Dementia'
  ],  # Multi-hot encoded
  'symptoms': [  # Multi-hot encoded for all symptom categories
    'Mental decline', 'Difficulty thinking or understanding', 'Forgetfulness',
    'Impulsive behaviour', 'Disorientation', 'Lack of consideration for others',
    'Disorganised or illogical thinking', 'Compulsive behaviour', 'Agitation',
    'Difficulty regulating emotions', 'Wandering or getting lost',
    'Loss of interest in activities or people', 'Delusions or paranoia', 'Apathy',
    'Neglect of personal hygiene', 'Excessive sleep or insomnia',
    'Changes in food preferences', 'Sedentary or inactivity',
    'Muscle stiffness or rigidity', 'Restless leg syndrome',
    'Shuffling walk or slow movement', 'Difficulty combining muscle movements',
    'Tremors at rest', 'Balance issues and falls', 'Speaking slowly',
    'Gradual loss of vocabulary', 'Difficulty making correct sounds',
    'Mixing up word order or using incorrect words', 'Visual hallucinations',
    'Urinary incontinence', 'Sensitivity to heat or cold', 'Similar handwriting',
    'Dizziness or fainting', 'Anxiety, depression or apathy'
  ],
  'dementia_stage': ['Mild', 'Moderate', 'Severe'],  # Mapped to experience
  'care_type': [
    'Medication Management', 'Mobility Assistance', 'Daily Living Support',
    'Cognitive Stimulation Activities', 'Specialised Therapies',
    'Meal Preparation and Feeding Assistance', 'In-home Medical Care'
  ],  # Multi-hot encoded
  'availability': ['Full Time', 'Part Time', '24/7']  # One-hot encoded
}

