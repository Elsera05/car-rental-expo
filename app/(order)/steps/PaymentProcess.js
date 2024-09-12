import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';

export default function PaymentProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBank, setSelectedBank] = useState(null);

  return (
    <>
      {activeStep === 0 && (
        <Step1 
          setActiveStep={setActiveStep} 
          setSelectedBank={setSelectedBank}
        />
      )}
      {activeStep === 1 && (
        <Step2 
          setActiveStep={setActiveStep} 
          selectedBank={selectedBank}
        />
      )}
    </>
  );
}