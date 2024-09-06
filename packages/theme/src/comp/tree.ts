import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTree = (theme: Theme, compatibilityMode?: boolean) => ({
  //#region Border radius
  shapeBorderRadiusTopLeftMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  shapeBorderRadiusTopLeftSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  shapeBorderRadiusTopLeftXs: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightXs: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftXs: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightXs: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  //#endregion

  //#region Color background
  colorBackground: 'transparent',
  colorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  colorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  colorBackgroundDisabled: 'transparent',
  //#endregion

  //#region Color text
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  colorTextHover: '',
  colorTextActive: '',
  colorTextDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  //#endregion

  //#region Color background selected
  colorBackgroundSelected: compatibilityMode
    ? theme.colourway.mono01
    : theme.sys.color.onBackgroundOverlaySelect,
  colorBackgroundSelectedHover: '',
  colorBackgroundSelectedActive: '',
  colorBackgroundSelectedDisabled: '',
  //#endregion

  //#region Color text selected
  colorTextSelected: '',
  colorTextSelectedHover: '',
  colorTextSelectedActive: '',
  colorTextSelectedDisabled: '',
  //#endregion

  //#region Typography
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,

  typographyFontSizeMd: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  typographyLineHeightMd: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,

  typographyFontSizeSm: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  typographyLineHeightSm: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,

  typographyFontSizeXs: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  typographyLineHeightXs: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  //#endregion

  //#region Expand icon color
  expandIconColor: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  expandIconColorHover: '',
  expandIconColorActive: '',
  expandIconColorDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  //#endregion

  //#region Expand icon color selected
  expandIconColorSelected: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  expandIconColorSelectedHover: '',
  expandIconColorSelectedActive: '',
  expandIconColorSelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  //#endregion

  //#region Icon color
  iconColor: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  iconColorHover: '',
  iconColorActive: '',
  iconColorDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  //#endregion

  //#region Icon color selected
  iconColorSelected: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  iconColorSelectedHover: '',
  iconColorSelectedActive: '',
  iconColorSelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  //#endregion

  //#region Trail
  trailsColor: compatibilityMode ? '#919191' : theme.sys.color.neutralAlpha,
  trailsBorderRadius: 4,
  //#endregion

  //#region Selected indicator
  selectedIndicatorColorBackground: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  selectedIndicatorColorBackgroundHover: '',
  selectedIndicatorColorBackgroundActive: '',
  selectedIndicatorColorBackgroundDisabled: '',

  selectedIndicatorShapeBorderRadiusTopLeft: '',
  selectedIndicatorShapeBorderRadiusTopRight: 2,
  selectedIndicatorShapeBorderRadiusBottomLeft: '',
  selectedIndicatorShapeBorderRadiusBottomRight: 2,
  //#endregion

  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
})
