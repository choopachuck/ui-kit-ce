import * as React from 'react'
import { Stepper, Step } from '@v-uik/base'
import { Icon } from './assets/Icon'
import { IconActive } from './assets/IconActive'

export const CustomIcons = (): React.ReactElement => {
  return (
    <Stepper activeStep={2}>
      {['First', 'Second', 'Third', 'Fourth', 'Fifth'].map((step, index) => (
        <Step
          key={step}
          index={index}
          icon={<Icon />}
          activeIcon={<IconActive />}
          description={`${step} description`}
          error={index === 3}
        >
          {step}
        </Step>
      ))}
    </Stepper>
  )
}
