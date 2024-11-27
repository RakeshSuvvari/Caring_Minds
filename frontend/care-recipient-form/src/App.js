import React from 'react';
import './App.css';
import CareRecipientForm from './CareRecipientForm';

function App() {
  return (
    // <div className="App">
    //   <h1> Personalized Dementia Care Information</h1>
    //   <CareRecipientForm />
    // </div>
    <div className="App">
    <header className="App-header" style={{textAlign: 'center'}}>
      <h1>Personalized Dementia Care Information</h1>
    </header>
  
    <div className="container">
      <CareRecipientForm />
    </div>
  </div>
  );
}

export default App;
