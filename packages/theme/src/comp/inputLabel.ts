import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createInputLabel = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  colorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  descriptionColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  descriptionColorTextDisabled: compatibilityMode
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

  descriptionTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodySm.fontFamily,
  descriptionTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodySm.fontWeight,
  descriptionTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  descriptionTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,
  descriptionTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.caption
    : theme.sys.typography.bodySm.letterSpacing,

  requiredColorText: theme.sys.color.errorAlpha,
})
