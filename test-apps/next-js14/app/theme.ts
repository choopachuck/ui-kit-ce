'use client'

import { createTheme } from '@v-uik/base'

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
