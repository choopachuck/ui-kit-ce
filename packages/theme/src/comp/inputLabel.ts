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

  descriptionTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodySm.fontFamily,
  descriptionTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodySm.fontWeight,
  descriptionTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.caption
    : theme.sys.typography.bodySm.letterSpacing,

  //typography sm
  typographyFontSizeSm: '',
  typographyLineHeightSm: '',

  descriptionTypographyFontSizeSm: '',
  descriptionTypographyLineHeightSm: '',

  //typography md
  typographyFontSizeMd: '',
  typographyLineHeightMd: '',

  descriptionTypographyFontSizeMd: '',
  descriptionTypographyLineHeightMd: '',

  //typography lg
  typographyFontSizeLg: '',
  typographyLineHeightLg: '',

  descriptionTypographyFontSizeLg: '',
  descriptionTypographyLineHeightLg: '',

  //typography (old)
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyFontSizeSm`, `typographyFontSizeMd` или `typographyFontSizeLg`
   */
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `descriptionTypographyFontSizeSm`, `descriptionTypographyFontSizeMd` или `descriptionTypographyFontSizeLg`
   */
  descriptionTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyLineHeightSm`, `typographyLineHeightMd` или `typographyLineHeightLg`
   */
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `descriptionTypographyLineHeightSm`, `descriptionTypographyLineHeightMd` или `descriptionTypographyLineHeightLg`
   */
  descriptionTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,

  requiredColorText: theme.sys.color.errorAlpha,
})
