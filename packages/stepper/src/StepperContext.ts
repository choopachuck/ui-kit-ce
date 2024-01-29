'use client'

import * as React from 'react'
import { DirectionType } from '@v-uik/common'

export type StepperContextValue = {
  activeStep: number
  direction: DirectionType
  clickable?: boolean
  onChange?: (index: number) => void
}

export const StepperContext = React.createContext<StepperContextValue>({
  activeStep: 0,
  direction: 'horizontal',
})
