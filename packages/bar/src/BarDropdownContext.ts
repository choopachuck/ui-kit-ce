import * as React from 'react'

export type BarDropdownContextValue = {
  close?: () => void
}

export const BarDropdownContext: React.Context<BarDropdownContextValue> =
  React.createContext({})
