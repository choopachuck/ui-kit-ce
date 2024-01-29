import * as React from 'react'
import { ThemeProvider, Theme } from '@v-uik/base'

export const Wrapper: React.FC<{
  theme: Theme
}> = ({ children, theme }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
