import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTextarea = (theme: Theme, compatibilityMode?: boolean) => ({
  colorBackground: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundComponent,
  colorBackgroundDisabled: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.disabledLow,
  colorBorder: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,
  colorBorderDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  colorBorderHover: compatibilityMode
    ? theme.colourway.mono06
    : theme.sys.color.neutralBeta,
  colorBorderError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  colorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  placeholderColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  placeholderColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
})
