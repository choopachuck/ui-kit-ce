'use client'
import { ThemeProvider, createTheme } from '@v-uik/theme'

export const theme = createTheme({
  sys: {
    color: {
      primaryAlpha: 'red',
    },
  },
  comp: {
    backwardCompatibilityMode: false,
  },
})

export const CustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
