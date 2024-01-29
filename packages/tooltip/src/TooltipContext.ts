'use client'

import * as React from 'react'

export type TooltipContextValue = {
  close?: () => void
}

export const TooltipContext: React.Context<TooltipContextValue> =
  React.createContext({})
