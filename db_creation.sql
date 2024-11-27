DROP TABLE caregivers;

CREATE TABLE caregivers (
    id SERIAL PRIMARY KEY,
    gender VARCHAR(20),
    language TEXT[], -- Array to store multiple languages
    preferred_gender VARCHAR(20),
    dementia_type TEXT[], -- Array to store multiple dementia types
    symptoms TEXT[], -- Array to store multiple symptoms
    experience INTEGER, -- Matches dementia_stage (Mild=2, Moderate=3, Severe=5)
    care_type TEXT[], -- Array to store multiple care types
    availability VARCHAR(20) -- Full Time, Part Time, 24/7
);

-- Caregiver records
INSERT INTO caregivers (gender, language, preferred_gender, dementia_type, symptoms, experience, care_type, availability)
VALUES 
('Female', ARRAY['English', 'Spanish'], 'Male', ARRAY['Alzheimer''s Disease', 'Vascular Dementia'], 
 ARRAY['Mental decline', 'Forgetfulness'], 3, ARRAY['Medication Management', 'Mobility Assistance'], 'Full Time'),
('Male', ARRAY['English'], 'No Preference', ARRAY['Lewy Body Dementia'], 
 ARRAY['Muscle stiffness or rigidity', 'Shuffling walk or slow movement'], 5, ARRAY['Daily Living Support', 'In-home Medical Care'], 'Part Time'),
('Male', ARRAY['English', 'French'], 'Male', ARRAY['Lewy Body Dementia', 'Vascular Dementia'], 
 ARRAY['Wandering or getting lost', 'Forgetfulness', 'Speaking slowly'], 5, ARRAY['Specialised Therapies', 'In-home Medical Care'], 'Part Time'),
('Male', ARRAY['English'], 'No Preference', ARRAY['Lewy Body Dementia'], 
 ARRAY['Muscle stiffness or rigidity', 'Shuffling walk or slow movement'], 5, ARRAY['Daily Living Support', 'In-home Medical Care'], 'Part Time');


SELECT * FROM caregivers;


INSERT INTO caregivers (gender, language, preferred_gender, dementia_type, symptoms, experience, care_type, availability)
VALUES
-- Record 1-10
('Female', ARRAY['English', 'Spanish'], 'Male', ARRAY['Alzheimer''s Disease', 'Vascular Dementia'], 
 ARRAY['Mental decline', 'Forgetfulness'], 3, ARRAY['Medication Management', 'Mobility Assistance'], 'Full Time'),
('Male', ARRAY['English'], 'No Preference', ARRAY['Lewy Body Dementia'], 
 ARRAY['Muscle stiffness or rigidity', 'Shuffling walk or slow movement'], 5, ARRAY['Daily Living Support', 'In-home Medical Care'], 'Part Time'),
('Male', ARRAY['English', 'French'], 'Male', ARRAY['Lewy Body Dementia', 'Vascular Dementia'], 
 ARRAY['Wandering or getting lost', 'Forgetfulness', 'Speaking slowly'], 5, ARRAY['Specialised Therapies', 'In-home Medical Care'], 'Part Time'),
('Female', ARRAY['Spanish', 'French'], 'Female', ARRAY['Frontotemporal Dementia'], 
 ARRAY['Disorientation', 'Apathy'], 3, ARRAY['Cognitive Stimulation Activities', 'Daily Living Support'], 'Full Time'),
('Male', ARRAY['English'], 'Female', ARRAY['Alzheimer''s Disease'], 
 ARRAY['Mental decline', 'Gradual loss of vocabulary'], 2, ARRAY['Mobility Assistance'], '24/7'),
('Female', ARRAY['French'], 'No Preference', ARRAY['Vascular Dementia'], 
 ARRAY['Agitation', 'Difficulty regulating emotions'], 5, ARRAY['Specialised Therapies', 'Meal Preparation and Feeding Assistance'], 'Full Time'),
('Non-binary', ARRAY['English', 'Spanish'], 'No Preference', ARRAY['Lewy Body Dementia'], 
 ARRAY['Tremors at rest', 'Balance issues and falls'], 4, ARRAY['In-home Medical Care', 'Cognitive Stimulation Activities'], 'Part Time'),
('Male', ARRAY['Spanish'], 'Female', ARRAY['Alzheimer''s Disease'], 
 ARRAY['Impulsive behaviour', 'Forgetfulness'], 3, ARRAY['Daily Living Support'], 'Full Time'),
('Female', ARRAY['English'], 'Male', ARRAY['Vascular Dementia'], 
 ARRAY['Wandering or getting lost', 'Disorientation'], 4, ARRAY['Mobility Assistance', 'Daily Living Support'], 'Part Time'),
('Male', ARRAY['English', 'Spanish'], 'No Preference', ARRAY['Lewy Body Dementia'], 
 ARRAY['Muscle stiffness or rigidity', 'Difficulty combining muscle movements'], 5, ARRAY['In-home Medical Care', 'Mobility Assistance'], 'Full Time'),

-- Record 11-20
('Female', ARRAY['English'], 'Female', ARRAY['Frontotemporal Dementia'], 
 ARRAY['Compulsive behaviour', 'Difficulty regulating emotions'], 3, ARRAY['Specialised Therapies'], 'Full Time'),
('Non-binary', ARRAY['French'], 'Male', ARRAY['Alzheimer''s Disease'], 
 ARRAY['Forgetfulness', 'Visual hallucinations'], 2, ARRAY['Medication Management', 'Daily Living Support'], 'Part Time'),
('Male', ARRAY['Spanish'], 'Female', ARRAY['Vascular Dementia'], 
 ARRAY['Mental decline', 'Dizziness or fainting'], 4, ARRAY['Mobility Assistance', 'In-home Medical Care'], '24/7'),
('Female', ARRAY['English', 'Spanish'], 'No Preference', ARRAY['Lewy Body Dementia'], 
 ARRAY['Gradual loss of vocabulary', 'Muscle stiffness or rigidity'], 5, ARRAY['Daily Living Support'], 'Full Time'),
('Male', ARRAY['English'], 'Male', ARRAY['Alzheimer''s Disease', 'Vascular Dementia'], 
 ARRAY['Apathy', 'Difficulty making correct sounds'], 3, ARRAY['Cognitive Stimulation Activities'], 'Full Time'),
('Non-binary', ARRAY['French'], 'Female', ARRAY['Lewy Body Dementia'], 
 ARRAY['Mixing up word order or using incorrect words', 'Compulsive behaviour'], 4, ARRAY['Specialised Therapies'], 'Part Time'),
('Female', ARRAY['English', 'Spanish'], 'No Preference', ARRAY['Alzheimer''s Disease'], 
 ARRAY['Forgetfulness', 'Loss of interest in activities or people'], 5, ARRAY['Mobility Assistance', 'Daily Living Support'], '24/7'),
('Male', ARRAY['Spanish'], 'Female', ARRAY['Frontotemporal Dementia'], 
 ARRAY['Mental decline', 'Shuffling walk or slow movement'], 2, ARRAY['Daily Living Support'], 'Part Time'),
('Female', ARRAY['English'], 'No Preference', ARRAY['Vascular Dementia'], 
 ARRAY['Disorientation', 'Difficulty regulating emotions'], 3, ARRAY['In-home Medical Care'], 'Full Time'),
('Male', ARRAY['English', 'Spanish'], 'Male', ARRAY['Alzheimer''s Disease'], 
 ARRAY['Wandering or getting lost', 'Compulsive behaviour'], 4, ARRAY['Specialised Therapies', 'Cognitive Stimulation Activities'], '24/7')
