from flask import Flask, request, jsonify
import psycopg2
import numpy as np
import json
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# PostgreSQL Database configuration
DB_CONFIG = {
    'dbname': 'postgres',
    'user': 'postgres',
    'password': 'rakesh33',
    'host': 'localhost',
    'port': '5432'
}

# Connect to PostgreSQL Database
def get_db_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    return conn

# Helper function to vectorize profiles based on predefined attributes
def create_profile_vector(profile, attributes):
    vector = []
    for attribute in attributes:
        if attribute == 'skills':  # Handle skills as binary
            vector.extend([1 if skill in profile['skills'] else 0 for skill in attributes['skills']])
        elif attribute == 'location':  # Handle location with one-hot encoding
            vector.extend([1 if profile['location'] == loc else 0 for loc in attributes['location']])
        else:
            vector.append(profile[attribute])  # Directly append numeric attributes (experience, cognitive_stage, etc.)
    return np.array(vector)


# Cosine similarity function
def calculate_cosine_similarity(caregiver_vector, carerecipient_vector):
    return cosine_similarity([caregiver_vector], [carerecipient_vector])[0][0]

# API route to match caregivers based on carerecipient requirements
@app.route('/match_caregivers', methods=['POST'])
def match_caregivers():
    # Parse carerecipient's requirements from request
    care_recipient_data = request.json
    print("care_recipient_data", care_recipient_data)
    # data  = json.loads(str(care_recipient_data))
    # print("data", data)
    carerecipient_vector = create_profile_vector(care_recipient_data, ATTRIBUTE_LIST)
    
    # Connect to the database and fetch caregiver profiles
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM caregivers")  # Modify this query based on your table structure
    caregivers = cursor.fetchall()

    # Define the column names as keys
    columns = ['id', 'experience', 'skills', 'location', 'cognitive_stage']

    # Convert the list of tuples to a list of dictionaries
    caregivers = [dict(zip(columns, record)) for record in caregivers]
    print("caregivers", caregivers)
#     caregivers = [
#     {'id': 1, 'experience': 5, 'skills': ['mobility assistance', 'medication'], 'location': 'Austin', 'cognitive_stage': 3},
#     {'id': 2, 'experience': 3, 'skills': ['companionship', 'mobility assistance'], 'location': 'San Marcos', 'cognitive_stage': 2}
# ]

    
    caregiver_profiles = []
    for caregiver in caregivers:
        # Assume the caregiver profile structure matches the care_recipient_data's attribute keys
        print("caregiver", caregiver)
        # caregiver_profile = {
        #     'id': caregiver[0],  # Adjust index based on your database table structure
        #     'experience': caregiver[1],
        #     'skills': caregiver[2].split(','),  # Assuming skills are stored as comma-separated strings
        #     'location': caregiver[3],
        #     'cognitive_stage': caregiver[4],
        # }
        caregiver_profile = {
          'id': caregiver['id'],
          'experience': caregiver['experience'],
          'skills': caregiver['skills'],
          'location': caregiver['location'],
          'cognitive_stage': caregiver['cognitive_stage']
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

    return jsonify(result)

# Define attributes for vectorization
ATTRIBUTE_LIST = {
    'experience': 'experience',  # Numeric attribute
    'skills': ['mobility assistance', 'medication', 'companionship'],  # Example list of skills
    'location': 'location',
    'cognitive_stage': 'cognitive_stage'  # Numeric attribute
    
}

if __name__ == '__main__':
    app.run(debug=True)
