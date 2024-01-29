import * as React from 'react'
import { Stepper as DefaultStepper, Step } from '@v-uik/base'

export const Stepper = (): React.ReactElement => {
  return (
    <DefaultStepper activeStep={1} style={{ marginTop: '8px' }}>
      {['First', 'Second', 'Third', 'Fourth'].map((step, index) => (
        <Step
          key={step}
          index={index}
          description={`${step} description`}
          error={index === 3}
        >
          {step}
        </Step>
      ))}
    </DefaultStepper>
  )
}
