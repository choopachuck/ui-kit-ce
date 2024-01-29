import React, { useState } from 'react'
import { Step, Stepper } from '@v-uik/base'

export const VerticalStepper = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(2)

  return (
    <Stepper
      clickable
      direction="vertical"
      activeStep={activeStep}
      onChange={setActiveStep}
    >
      {['First', 'Second', 'Third', 'Fourth', 'Fifth'].map((step, index) => (
        <Step
          key={step}
          index={index}
          description={`${step} description`}
          error={index === 3}
        >
          {step}
        </Step>
      ))}
    </Stepper>
  )
}
