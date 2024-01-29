'use client'

import { TableDataContextType } from './types'
import * as React from 'react'
import { TableDataContext } from './context'

export const useTableDataContext = (): TableDataContextType => {
  const ctx = React.useContext(TableDataContext)

  if (!ctx) {
    throw new Error('have not TableDataContext')
  }

  return ctx
}
