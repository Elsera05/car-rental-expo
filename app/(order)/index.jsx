import { View, Text } from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import React, { useState } from "react";

export default function index() {
  const [activeStep, setActiveStep] = useState(0)
  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps  activeStep={activeStep}>
        <ProgressStep label="Pilih Metode" removeBtnRow={true}>
          <Step1 setActiveStep={setActiveStep}/>
        </ProgressStep>
        <ProgressStep label="Bayar" removeBtnRow={true}>
          <Step2 setActiveStep={setActiveStep}/>
        </ProgressStep>
        <ProgressStep label="Tiket" removeBtnRow={true}>
          <Step3 setActiveStep={setActiveStep}/>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}
