import * as React from 'react'
import { Step, Stepper } from '@v-uik/base'

export const Basic = (): JSX.Element => {
  const [activeStep, setActiveStep] = React.useState(2)

  return (
    <Stepper clickable activeStep={activeStep} onChange={setActiveStep}>
      {['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Disabled'].map(
        (step, index) => (
          <Step
            key={step}
            completed={activeStep > index}
            index={index}
            description={`${step} description`}
            error={index === 3}
            disabled={step === 'Disabled'}
          >
            {step}
          </Step>
        )
      )}
    </Stepper>
  )
}

export default Basic
