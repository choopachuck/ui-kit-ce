import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createInput = (theme: Theme, compatibilityMode?: boolean) => ({
  colorBackground: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundComponent,
  colorBackgroundDisabled: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.disabledLow,
  colorBackgroundError: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundComponent,
  colorBorder: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,
  colorBorderHover: compatibilityMode
    ? theme.colourway.mono06
    : theme.sys.color.neutralBeta,
  colorBorderError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  colorBorderDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  colorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  placeholderColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  placeholderColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  alertIconColorText: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  prefixColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  prefixColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  suffixColorText: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  suffixColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,

  shapeBorderRadiusTopLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusTopRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  shapeBorderRadiusTopLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusTopRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,

  shapeBorderRadiusTopLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  shapeBorderRadiusTopRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  shapeBorderRadiusBottomLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  shapeBorderRadiusBottomRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,

  //typography (base)
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,

  //typography lg
  typographyFontSizeLg: '',
  typographyLineHeightLg: '',

  //typography md
  typographyFontSizeMd: '',
  typographyLineHeightMd: '',

  //typography sm
  typographyFontSizeSm: '',
  typographyLineHeightSm: '',

  //typography (old)
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyFontSizeSm`, `typographyFontSizeMd` или `typographyFontSizeLg`
   */
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyLineHeightSm`, `typographyLineHeightMd` или `typographyLineHeightLg`
   */
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
})
