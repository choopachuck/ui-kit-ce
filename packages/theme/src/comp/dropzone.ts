import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDropzone = (theme: Theme, compatibilityMode?: boolean) => ({
  // Color
  colorBackground: 'transparent',
  colorBackgroundHover: compatibilityMode
    ? theme.colourway.bar.light.mn02
    : theme.sys.color.onBackgroundOverlayHover,
  colorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  colorBorder: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,
  colorBorderHover: compatibilityMode
    ? theme.colourway.mono06
    : theme.sys.color.neutralBeta,
  colorBorderActive: compatibilityMode
    ? theme.colourway.mono07
    : theme.sys.color.neutralGamma,
  contentColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,

  // Color/disabled
  colorBackgroundDisabled: 'transparent',
  colorBorderDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  contentColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,

  // Color/error
  colorBorderError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,

  // Color/dragEnter
  colorBackgroundDragEnter: compatibilityMode
    ? theme.colourway.primaryHighlight
    : theme.sys.color.primaryOverlayHover,
  colorBorderDragEnter: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,

  // Color/focus
  colorBorderFocus: compatibilityMode
    ? theme.colourway.focusPocus
    : theme.sys.color.focusPocus,
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,

  // Shape
  shapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  // Typography
  contentTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.headings
    : theme.sys.typography.bodyLg.fontFamily,
  contentTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body1
    : theme.sys.typography.bodyLg.fontSize,
  contentTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body1
    : theme.sys.typography.bodyLg.lineHeight,
  contentTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyLg.fontWeight,
  contentTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body1
    : theme.sys.typography.bodyLg.letterSpacing,
})
