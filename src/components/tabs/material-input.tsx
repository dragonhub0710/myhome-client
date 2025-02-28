"use client";

import { useState } from "react";
import { InputForm } from "../material-input/input-form";
import { DesignTheme } from "../material-input/design-theme";
import { RoomUpgrade } from "../material-input/room-upgrade";

export default function MaterialInputTab() {
  const [currentStep, setCurrentStep] = useState(0);
  const componentsList = [
    <InputForm
      key={0}
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
    />,
    <DesignTheme
      key={1}
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
    />,
    <RoomUpgrade key={2} />,
  ];

  return (
    <div className="w-full p-5 bg-white rounded-lg shadow-md">
      {componentsList[currentStep]}
    </div>
  );
}
