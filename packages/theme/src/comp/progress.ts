import { Theme } from '../interface'
import { setAlphaChannel } from '../utils'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createLinearProgress = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  pathColorBackground: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  trackColorBackground: compatibilityMode
    ? theme.colourway.mono02
    : setAlphaChannel(theme.sys.color.neutralAlpha, theme.ref.alpha.channel45),
  pathShapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusNone,
  pathShapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusNone,
  pathShapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusNone,
  pathShapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusNone,
  trackShapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusCircle,
  trackShapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusCircle,
  trackShapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusCircle,
  trackShapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusCircle,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCircularProgress = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  pathColorBackground: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  trackColorBackground: compatibilityMode
    ? theme.colourway.mono02
    : setAlphaChannel(theme.sys.color.neutralAlpha, theme.ref.alpha.channel45),

  //typography percentage
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.headings
    : theme.sys.typography.bodyLg.fontFamily,
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body1
    : theme.sys.typography.bodyLg.fontSize,
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body1
    : theme.sys.typography.bodyLg.lineHeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body1
    : theme.sys.typography.bodyLg.letterSpacing,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyLg.fontWeight,
})
