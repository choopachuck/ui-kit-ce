import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDivider = (theme: Theme, compatibilityMode?: boolean) => ({
  colorBorder: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.separationMinor,
  widthBorder: theme.shape.borderWidth,
  styleBorder: theme.shape.borderStyle,
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,

  // Typography tokens
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
