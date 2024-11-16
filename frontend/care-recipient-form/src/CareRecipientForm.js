import React, { useState } from 'react';

function CareRecipientForm() {
  const [formData, setFormData] = useState({
    dementiaType: [],
    symptoms: [],
    dementiaStage: '',
    careType: [],
    genderPreference: '',
    availability: '',
    gender: '',
    languagePreference: [],
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleBoxToggle = (field, value) => {
    setFormData((prevData) => {
      const selectedValues = prevData[field];
      const isSelected = selectedValues.includes(value);

      // Toggle selection
      const newSelectedValues = isSelected
        ? selectedValues.filter((item) => item !== value)  // Remove if selected
        : [...selectedValues, value];  // Add if not selected

      return {
        ...prevData,
        [field]: newSelectedValues,  // Update the state with new selected values
      };
    });
  };
  const handleRadioChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value, // Update the field with the selected value
    }));
  };
  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Form Data Submitted:', formData);
    // Send formData to the backend API
  };

  const isSelected = (field, value) => formData[field].includes(value);

  const boxStyle = (field, value) => ({
    padding: '10px',
    margin: '5px',
    border: isSelected(field, value) ? '2px solid #007BFF' : '2px solid #ccc',
    borderRadius: '5px',
    backgroundColor: isSelected(field, value) ? '#007BFF' : '#f9f9f9',
    color: isSelected(field, value) ? '#fff' : '#333',
    cursor: 'pointer',
    textAlign: 'center',
  });

  return (
    <div
      style={{
        maxHeight: '80vh',
        overflowY: 'auto',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        maxWidth: '600px',
        margin: '20px auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <form onSubmit={handleSubmit}>
        

        {/* Step 1 */}
        {/*gender/ */}
        {currentStep === 1 && (
          <>
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <h3>Please choose your gender</h3>
          <div
         style={{
         display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two columns
        gap: '10px', // Space between items
       justifyContent: 'center',
       alignItems: 'center',
       }}
  >
    {['Male', 'Female', 'Non-binary', 'Do not wish to disclose'].map((gender) => (
      <div
        key={gender}
        style={{
          padding: '10px',
          border: '2px solid',
          borderColor: formData.gender === gender ? '#007BFF' : '#ccc', // Highlight selected
          backgroundColor: formData.gender === gender ? '#E0F7FA' : '#fff', // Highlight background
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handleRadioChange('gender', gender)}
      >
        {gender}
      </div>
    ))}
  </div>
</div>
    {/* Language preference*/ }
  <div style={{ textAlign: 'center', marginBottom: '15px' }}>
  <h3>Please choose your language preference</h3>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // Two columns
      gap: '10px', // Space between items
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {['English', 'Spanish', 'French', 'No Preference'].map((lang) => (
      <div
        key={lang}
        style={{
          padding: '10px',
          border: '2px solid',
          borderColor: formData.languagePreference.includes(lang) ? '#007BFF' : '#ccc', // Highlight selected
          backgroundColor: formData.languagePreference.includes(lang) ? '#E0F7FA' : '#fff', // Highlight background
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handleBoxToggle('languagePreference', lang)}
      >
        {lang}
      </div>
    ))}
  </div>
</div>
{/*Gender Preference*/}
<div style={{ textAlign: 'center', marginBottom: '15px' }}>
  <h3>Please choose your gender preference</h3>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // Two columns
      gap: '10px', // Space between items
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {['Male', 'Female', 'Non-binary', 'No Preference'].map((preference) => (
      <div
        key={preference}
        style={{
          padding: '10px',
          border: '2px solid',
          borderColor: formData.genderPreference === preference ? '#007BFF' : '#ccc', // Highlight selected
          backgroundColor: formData.genderPreference === preference ? '#E0F7FA' : '#fff', // Highlight background
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handleRadioChange('genderPreference', preference)}
      >
        {preference}
      </div>
    ))}
  </div>
</div>
            <button
              onClick={handleNext}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                backgroundColor: '#5597B4',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Next
            </button>
          </>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <>
 {/* Dementia Type Selection */}
<div style={{ textAlign: 'center', marginBottom: '15px' }}>
  <h3>Please choose the type of dementia</h3>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // Create two columns
      gap: '10px', // Space between the options
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {[
      "Alzheimer's Disease",
      'Frontotemporal Dementia',
      'Lewy Body Dementia',
      'Vascular Dementia',
    ].map((type, index) => (
      <div
        key={type}
        style={{
          padding: '10px',
          border: '2px solid',
          borderColor: formData.dementiaType.includes(type) ? '#007BFF' : '#ccc', // Highlight selected
          backgroundColor: formData.dementiaType.includes(type) ? '#E0F7FA' : '#fff', // Highlight background
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handleBoxToggle('dementiaType', type)}
      >
        {type}
      </div>
    ))}
  </div>
</div>
{/* Symptoms Selection */}
<div style={{ textAlign: 'center', marginBottom: '15px' }}>
  <h3>Please choose the symptoms</h3>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // Two columns
      gap: '10px', // Space between the options
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {[
      "Alzheimer's Disease",
      'Frontotemporal Dementia',
      'Lewy Body Dementia',
      'Vascular Dementia',
    ].map((symptom) => (
      <div
        key={symptom}
        style={{
          padding: '10px',
          border: '2px solid',
          borderColor: formData.symptoms.includes(symptom) ? '#007BFF' : '#ccc', // Highlight selected
          backgroundColor: formData.symptoms.includes(symptom) ? '#E0F7FA' : '#fff', // Highlight background
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handleBoxToggle('symptoms', symptom)}
      >
        {symptom}
      </div>
    ))}
  </div>
</div>
{/* Dementia Stage Selection */}
<div style={{ textAlign: 'center', marginBottom: '15px' }}>
  <h3>Please choose the dementia stage</h3>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // Two columns
      gap: '10px', // Space between the options
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {['Mild', 'Moderate', 'Severe'].map((stage) => (
      <div
        key={stage}
        style={{
          padding: '10px',
          border: '2px solid',
          borderColor: formData.dementiaStage === stage ? '#007BFF' : '#ccc', // Highlight selected
          backgroundColor: formData.dementiaStage === stage ? '#E0F7FA' : '#fff', // Highlight background
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handleRadioChange('dementiaStage', stage)}
      >
        {stage}
      </div>
    ))}
  </div>
</div>



            <button
              onClick={handleNext}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                backgroundColor: '#5597B4',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Next
            </button>
          </>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <>
         
{/* Care Type Selection */}
<div style={{ textAlign: 'center', marginBottom: '20px' }}>
  <h3>Choose type of care</h3>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // Two columns
      gap: '15px', // Space between items
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '800px',
      margin: '0 auto', // Center the grid
    }}
  >
    {[
      {
        label: 'Medication Management',
        byline: 'Administering prescribed medications',
      },
      {
        label: 'Mobility Assistance',
        byline: 'Helping patient move, wheelchair transfers',
      },
      {
        label: 'Daily Living Support',
        byline: 'Assistance with dressing, bathing',
      },
      {
        label: 'Cognitive Stimulation Activities',
        byline: 'Memory games, mental exercises',
      },
      {
        label: 'Specialised Therapies',
        byline: 'Physical therapy, speech therapy',
      },
      {
        label: 'Meal Preparation and Feeding Assistance',
        byline: 'Includes meal prep and feeding',
      },
      {
        label: 'In-home Medical Care',
        byline: 'Wound care, injections',
      },
    ].map((care) => (
      <div
        key={care.label}
        style={{
          padding: '20px',
          border: '2px solid',
          borderColor: formData.careType.includes(care.label)
            ? '#007BFF'
            : '#ccc', // Highlight selected
          backgroundColor: formData.careType.includes(care.label)
            ? '#E0F7FA'
            : '#fff', // Highlight background
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: formData.careType.includes(care.label)
            ? '0 4px 8px rgba(0, 123, 255, 0.3)' // Add shadow when selected
            : '0 4px 8px rgba(0, 0, 0, 0.1)', // Default shadow
          transition: 'all 0.3s ease', // Smooth transition for hover and selection
        }}
        onClick={() => handleBoxToggle('careType', care.label)}
      >
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{care.label}</div>
        {care.byline && (
          <small style={{ fontStyle: 'italic', color: '#555', marginTop: '8px' }}>
            {care.byline}
          </small>
        )}
      </div>
    ))}
  </div>
</div>
{/* Availability Selection */}
<div style={{ textAlign: 'center', marginBottom: '20px' }}>
  <h3>Please choose availability of caregiver</h3>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr', // Three columns for each option
      gap: '15px', // Space between items
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '600px',
      margin: '0 auto', // Center the grid
    }}
  >
    {['Full Time', 'Part Time', '24/7'].map((availabilityOption) => (
      <div
        key={availabilityOption}
        style={{
          padding: '15px',
          border: '2px solid',
          borderColor: formData.availability === availabilityOption
            ? '#007BFF'
            : '#ccc', // Highlight selected
          backgroundColor: formData.availability === availabilityOption
            ? '#E0F7FA'
            : '#fff', // Highlight background
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease', // Smooth transition
        }}
        onClick={() => handleRadioChange('availability', availabilityOption)}
      >
        {availabilityOption}
      </div>
    ))}
  </div>
</div>



            <button
              type="submit"
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                backgroundColor: '#5597B4',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default CareRecipientForm;
