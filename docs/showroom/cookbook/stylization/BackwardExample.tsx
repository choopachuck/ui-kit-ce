import * as React from 'react'
import { createTheme, ThemeProvider, Button } from '@v-uik/base'

const noBackwardTheme = createTheme({
  comp: {
    backwardCompatibilityMode: false,
  },
})

export const BackwardExample = () => (
  <div>
    <Button style={{ marginRight: 15 }}>Старые токены</Button>

    <ThemeProvider theme={noBackwardTheme}>
      <Button>Новые токены</Button>
    </ThemeProvider>
  </div>
)
