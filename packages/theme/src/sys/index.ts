import { Theme } from '../interface'
import { createColor } from './color'
import { createElevation } from './elevation'
import { createShape } from './shape'
import { createTypography } from './typography'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createSys = (theme: Theme) => ({
  color: createColor(theme),
  elevation: createElevation(theme),
  shape: createShape(theme),
  typography: createTypography(theme),
})

export type Sys = ReturnType<typeof createSys>
