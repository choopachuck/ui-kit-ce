import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createSwitch = (theme: Theme, compatibilityMode?: boolean) => ({
  colorBackground: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,
  colorBackgroundHover: compatibilityMode
    ? theme.colourway.mono06
    : theme.sys.color.neutralBeta,
  colorBackgroundActive: compatibilityMode
    ? theme.colourway.mono07
    : theme.sys.color.neutralGamma,
  colorBackgroundDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  colorBorderFocus: compatibilityMode
    ? theme.colourway.focusPocus
    : theme.sys.color.focusPocus,
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  colorBackgroundChecked: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  colorBackgroundCheckedHover: compatibilityMode
    ? theme.colourway.primaryHover
    : theme.sys.color.primaryBeta,
  colorBackgroundCheckedActive: compatibilityMode
    ? theme.colourway.primaryActive
    : theme.sys.color.primaryGamma,
  thumbColorBackground: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  thumbColorBackgroundDisabled: compatibilityMode
    ? theme.colourway.onPrimaryMedium
    : theme.sys.color.disabled,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? '9999px'
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusTopRight: compatibilityMode
    ? '9999px'
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? '9999px'
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? '9999px'
    : theme.sys.shape.borderRadiusCircle,

  thumbShapeBorderRadiusTopLeft: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  thumbShapeBorderRadiusTopRight: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  thumbShapeBorderRadiusBottomLeft: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  thumbShapeBorderRadiusBottomRight: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
})
