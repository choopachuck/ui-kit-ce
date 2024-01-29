'use client'

import { createTheme } from '../createTheme'
import { palette } from '../parts/palette'

export const light = createTheme({
  colors: {
    primary: palette.green,
    success: palette.green,
    monochrome: palette.greyWarm,

    warn: palette.yellow,
    error: palette.red,
    info: palette.blue,
  },
})
