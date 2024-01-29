import * as React from 'react'
import {
  createTheme,
  ThemeProvider,
  createUseStyles,
  Button,
  ButtonProps,
} from '@v-uik/base'

declare module '@v-uik/base' {
  interface Theme {
    additionalColors: {
      burgundy: string
    }
  }
}

const theme = createTheme({
  additionalColors: {
    burgundy: '#800020',
  },
})

const useStyles = createUseStyles((theme) => ({
  burgundyButton: {
    '&$contained': {
      backgroundColor: theme.additionalColors.burgundy,
    },
  },
  contained: {},
}))

const BurgundyButton = (props: ButtonProps) => {
  const classnames = useStyles()

  return (
    <Button
      {...props}
      classes={{
        primary: classnames.burgundyButton,
        contained: classnames.contained,
      }}
    />
  )
}

export function CustomTokens() {
  return (
    <ThemeProvider theme={theme}>
      <BurgundyButton>Кнопка</BurgundyButton>
    </ThemeProvider>
  )
}
