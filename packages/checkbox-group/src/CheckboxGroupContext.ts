'use client'

import * as React from 'react'
import { CheckboxGroupProps } from './interfaces'

export type CheckboxGroupContextValue = Partial<
  Pick<CheckboxGroupProps, 'value' | 'disabled'>
> & {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxGroupContext =
  React.createContext<CheckboxGroupContextValue>({})
