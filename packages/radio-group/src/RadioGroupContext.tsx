'use client'

import * as React from 'react'
import { RadioGroupProps } from './interfaces'

export type RadioGroupContextValue<T extends string> = Partial<
  Pick<RadioGroupProps<T>, 'value' | 'onChange' | 'name' | 'disabled'>
>

// eslint-disable-next-line
export function createCtx() {
  const ctx = React.createContext({})

  function useContext<T extends string>() {
    return React.useContext(ctx) as RadioGroupContextValue<T>
  }

  return [useContext, ctx.Provider] as const
}
