import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createInputHelperText = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  colorTextError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  colorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,

  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodySm.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodySm.fontWeight,
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.caption
    : theme.sys.typography.bodySm.letterSpacing,
})
