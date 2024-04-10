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
  typographyFontSizeSm: '',
  typographyLineHeightSm: '',

  //typography md
  typographyFontSizeMd: '',
  typographyLineHeightMd: '',

  //typography lg
  typographyFontSizeLg: '',
  typographyLineHeightLg: '',

  //typography (old)
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyFontSizeSm`, `typographyFontSizeMd` или `typographyFontSizeLg`
   */
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyLineHeightSm`, `typographyLineHeightMd` или `typographyLineHeightLg`
   */
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,
})
