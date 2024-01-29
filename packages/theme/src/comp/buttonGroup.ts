import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createButtonGroup = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  colorTextPrimarySelected: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  colorTextSecondarySelected: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorBackgroundPrimarySelected: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  colorBackgroundSecondarySelected: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
})
