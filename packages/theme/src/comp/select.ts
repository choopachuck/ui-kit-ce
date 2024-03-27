import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createSelect = (theme: Theme, compatibilityMode?: boolean) => ({
  inputColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  inputColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  inputColorBackground: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundComponent,
  inputColorBackgroundDisabled: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.disabledLow,
  inputColorBackgroundHover: '#dadada', // TODO: after implementing overlay add backgroundComponent
  inputColorBackgroundError: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundComponent,
  inputColorBorder: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,
  inputColorBorderHover: compatibilityMode
    ? theme.colourway.mono06
    : theme.sys.color.neutralBeta,
  inputColorBorderError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  inputColorBorderDisabled: compatibilityMode
    ? theme.colourway.disabledMinor
    : theme.sys.color.disabledMedium,
  inputColorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  placeholderColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  alertIconColorText: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  listColorBackground: compatibilityMode
    ? theme.colourway.background01
    : theme.sys.color.backgroundAlpha,
  listColorBorder: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.separationMajor,
  listColorBorderMultiple: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,
  listColorBorderMultipleError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  listColorShadowMultipleFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  listElevationShadow: compatibilityMode
    ? theme.colourway.shadow03
    : theme.sys.elevation.md,
  optionColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  optionColorBackgroundSelected: compatibilityMode
    ? theme.colourway.mono01
    : theme.sys.color.onBackgroundOverlaySelect,

  inputShapeBorderRadiusTopLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  inputShapeBorderRadiusTopRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  inputShapeBorderRadiusBottomLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  inputShapeBorderRadiusBottomRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  inputShapeBorderRadiusTopLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  inputShapeBorderRadiusTopRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  inputShapeBorderRadiusBottomLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  inputShapeBorderRadiusBottomRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,

  inputShapeBorderRadiusTopLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  inputShapeBorderRadiusTopRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  inputShapeBorderRadiusBottomLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  inputShapeBorderRadiusBottomRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,

  //typography (base)
  inputTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  inputTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  inputTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,

  //typography sm
  inputTypographyFontSizeSm: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  inputTypographyLineHeightSm: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,

  //typography md
  inputTypographyFontSizeMd: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  inputTypographyLineHeightMd: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,

  //typography lg
  inputTypographyFontSizeLg: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  inputTypographyLineHeightLg: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,

  //typography (old)
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `inputTypographyFontSizeSm`, `inputTypographyFontSizeMd` или `inputTypographyFontSizeLg`
   */
  inputTypographyFontSize: '',
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `inputTypographyLineHeightSm`, `inputTypographyLineHeightMd` или `inputTypographyLineHeightLg`
   */
  inputTypographyLineHeight: '',

  optionShapeBorderRadiusTopLeftMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  optionShapeBorderRadiusTopRightMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  optionShapeBorderRadiusBottomLeftMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  optionShapeBorderRadiusBottomRightMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  optionShapeBorderRadiusTopLeftSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  optionShapeBorderRadiusTopRightSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  optionShapeBorderRadiusBottomLeftSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  optionShapeBorderRadiusBottomRightSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  optionShapeBorderRadiusTopLeftLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  optionShapeBorderRadiusTopRightLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  optionShapeBorderRadiusBottomLeftLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  optionShapeBorderRadiusBottomRightLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  listShapeBorderRadiusTopLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  listShapeBorderRadiusTopRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  listShapeBorderRadiusBottomLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  listShapeBorderRadiusBottomRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  listShapeBorderRadiusTopLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  listShapeBorderRadiusTopRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  listShapeBorderRadiusBottomLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  listShapeBorderRadiusBottomRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,

  listShapeBorderRadiusTopLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  listShapeBorderRadiusTopRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  listShapeBorderRadiusBottomLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  listShapeBorderRadiusBottomRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
})
