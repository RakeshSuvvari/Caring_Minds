# Caring_Minds

To setup and run frontend of the application:
1. Ensure the following is installed in the system:
	- [Node.js](https://nodejs.org/)	
	- [npm](https://www.npmjs.com/) 
2. Clone the repository:
	 git clone https://git.txstate.edu/kgv34/Caring_Minds.git
3. Navigate to the cloned folder 'Caring_Minds' and right-click to  'open in terminal' or 'open in git bash'
4. then in the terminal, add the command:
	- cd frontend\care-recipient-form
5. install dependency by adding the command;
   	- rm -rf node_modules
	- rm -rf package-lock.json
 	- npm install react-scripts 
	- npm install
7. then add command to open the link:
	- npm start

***********************************************************

A temporary PostgreSQL database was hosted on https://render.com/ \
Database is used for saving the profiles of the care givers.

***********************************************************

To setup and run backend of the application:
Install the packages \
`pip install -r requirements.txt`

Run `app.py` to initiate API router on port `5000`.

API Method: `POST` \
API Hit: `http://127.0.0.1:5000/match_caregivers` \
Sample API Input:
```
{
    "gender": "Female",
    "language": ["English", "Spanish"],
    "preferred_gender": "Male",
    "dementia_type": ["Alzheimer's Disease", "Vascular Dementia"],
    "symptoms": ["Mental decline", "Agitation", "Muscle stiffness or rigidity"],
    "dementia_stage": "Moderate",
    "care_type": ["Medication Management", "Daily Living Support"],
    "availability": "Full Time"
}
```

Sample Output:
```
[
    {
        "caregiver_details": {
            "availability": "Full Time",
            "care_type": [
                "Medication Management",
                "Mobility Assistance"
            ],
            "dementia_type": [
                "Alzheimer's Disease",
                "Vascular Dementia"
            ],
            "experience": 3,
            "gender": "Female",
            "id": 1,
            "language": [
                "English",
                "Spanish"
            ],
            "preferred_gender": "Male",
            "symptoms": [
                "Mental decline",
                "Forgetfulness"
            ]
        },
        "caregiver_id": 1,
        "similarity_score": 0.8451542547285165
    },
    {
        "caregiver_details": {
            "availability": "Full Time",
            "care_type": [
                "Medication Management",
                "Mobility Assistance"
            ],
            "dementia_type": [
                "Alzheimer's Disease",
                "Vascular Dementia"
            ],
            "experience": 3,
            "gender": "Female",
            "id": 5,
            "language": [
                "English",
                "Spanish"
            ],
            "preferred_gender": "Male",
            "symptoms": [
                "Mental decline",
                "Forgetfulness"
            ]
        },
        "caregiver_id": 5,
        "similarity_score": 0.8451542547285165
    },
    {
        "caregiver_details": {
            "availability": "Full Time",
            "care_type": [
                "Daily Living Support"
            ],
            "dementia_type": [
                "Lewy Body Dementia"
            ],
            "experience": 5,
            "gender": "Female",
            "id": 18,
            "language": [
                "English",
                "Spanish"
            ],
            "preferred_gender": "No Preference",
            "symptoms": [
                "Gradual loss of vocabulary",
                "Muscle stiffness or rigidity"
            ]
        },
        "caregiver_id": 18,
        "similarity_score": 0.7262730392025629
    }
]
```
************************************************************
