'use client'

import React from 'react'

export interface IHiddenPropsContext {
  backfill?: boolean
  recoveryBackfillInputValue?: (handler: (inputValue: string) => void) => void
}

export const HiddenPropsContext = React.createContext<IHiddenPropsContext>({})
