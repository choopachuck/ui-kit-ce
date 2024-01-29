import * as React from 'react'
import { ThemeProvider, light } from '@v-uik/theme'

export const withThemeProvider = (children: React.ReactNode): JSX.Element => {
  return <ThemeProvider theme={light}>{children}</ThemeProvider>
}
