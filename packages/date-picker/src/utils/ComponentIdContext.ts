'use client'

import React from 'react'

export const ComponentIdContext = React.createContext<string | undefined>(
  undefined
)

export const useComponentIdContext = (): string | undefined => {
  return React.useContext(ComponentIdContext)
}
