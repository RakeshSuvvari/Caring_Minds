# Caring_Minds

Install the packages \
`python3 -m pip install flask psycopg2-binary numpy scikit-learn`

Run `CosineAlgo.py` to initiate API router on port `5000`. \

API Method: `POST` \
API Hit: `http://127.0.0.1:5000/match_caregivers` \
Sample API Input (depends on the final questionnaire): \
`
{
    "id": 1,
    "experience": 4,
    "skills": [
        "mobility assistance"
    ],
    "cognitive_stage": 3,
    "location": "Austin"
}
`

Sample Output (depends on the final questionnaire): \
`
[
    {
        "caregiver_details": {
            "cognitive_stage": 3,
            "experience": 5,
            "id": 1,
            "location": "Austin",
            "skills": [
                "mobility assistance",
                "medication"
            ]
        },
        "caregiver_id": 1,
        "similarity_score": 0.9805806756909203
    },
    {
        "caregiver_details": {
            "cognitive_stage": 2,
            "experience": 3,
            "id": 2,
            "location": "San Marcos",
            "skills": [
                "companionship",
                "mobility assistance"
            ]
        },
        "caregiver_id": 2,
        "similarity_score": 0.9621023987294833
    }
]
`