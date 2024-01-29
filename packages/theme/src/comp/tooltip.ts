import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTooltip = (theme: Theme, compatibilityMode?: boolean) => ({
  colorBackground: compatibilityMode
    ? theme.colourway.inverse
    : theme.sys.color.inverseBackgroundAlpha,
  colorText: compatibilityMode
    ? theme.colourway.onInverseHigh
    : theme.sys.color.inverseOnBackgroundHigh,
  colorBorder: compatibilityMode
    ? theme.colourway.inverseOverlaySelected
    : theme.sys.color.inverseSeparationMajor,
  indicatorColorBackground: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  arrowColorBorder: compatibilityMode
    ? theme.colourway.inverseOverlaySelected
    : theme.sys.color.inverseSeparationMajor,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusTopRight: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,

  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
})
