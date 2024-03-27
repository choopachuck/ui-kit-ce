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

  //typography (base)
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodySm.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodySm.fontWeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.caption
    : theme.sys.typography.bodySm.letterSpacing,

  //typography sm
  typographyFontSizeSm: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  typographyLineHeightSm: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,

  //typography md
  typographyFontSizeMd: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  typographyLineHeightMd: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,

  //typography lg
  typographyFontSizeLg: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  typographyLineHeightLg: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,

  //typography (old)
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyFontSizeSm`, `typographyFontSizeMd` или `typographyFontSizeLg`
   */
  typographyFontSize: '',
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyLineHeightSm`, `typographyLineHeightMd` или `typographyLineHeightLg`
   */
  typographyLineHeight: '',
})
