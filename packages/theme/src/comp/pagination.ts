import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createPagination = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  // --------------------------------------
  // ------------- PAGINATION -------------
  // --------------------------------------

  // Text item
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,
  colorTextHover: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,
  colorTextActive: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,
  colorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,

  // Text item selected
  colorTextSelected: '',
  colorTextSelectedHover: '',
  colorTextSelectedActive: '',
  colorTextSelectedDisabled: '',

  // Background item
  colorBackground: 'transparent',
  colorBackgroundHover: compatibilityMode
    ? theme.colourway.bar.light.mn02
    : theme.sys.color.onBackgroundOverlayHover,
  colorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  colorBackgroundDisabled: 'transparent',

  // Background item selected
  colorBackgroundSelected: '',
  colorBackgroundSelectedHover: '',
  colorBackgroundSelectedActive: '',
  colorBackgroundSelectedDisabled: '',

  // Border item
  colorBorder: 'transparent',
  colorBorderHover: '',
  colorBorderActive: '',
  colorBorderDisabled: '',

  // Border item selected
  colorBorderSelected: '',
  colorBorderSelectedHover: '',
  colorBorderSelectedActive: '',
  colorBorderSelectedDisabled: '',

  // Text overflow
  overflowColorText: '',
  overflowColorTextHover: '',
  overflowColorTextActive: '',
  overflowColorTextDisabled: '',

  // Background overflow
  overflowColorBackground: '',
  overflowColorBackgroundHover: '',
  overflowColorBackgroundActive: '',
  overflowColorBackgroundDisabled: '',

  // Border overflow
  overflowColorBorder: '',
  overflowColorBorderHover: '',
  overflowColorBorderActive: '',
  overflowColorBorderDisabled: '',

  // Item's selectedIndicator background
  selectedIndicatorColorBackground: compatibilityMode
    ? theme.colourway.bar.primary.bg01
    : theme.sys.color.primaryAlpha,
  selectedIndicatorColorBackgroundDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,

  // Item's selectedIndicator shape
  selectedIndicatorShapeBorderRadiusTopLeft: 1,
  selectedIndicatorShapeBorderRadiusTopRight: 1,
  selectedIndicatorShapeBorderRadiusBottomLeft: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  selectedIndicatorShapeBorderRadiusBottomRight: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  // Item focus
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,

  // Shape item (small)
  shapeBorderRadiusTopLeftSmall: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusTopRightSmall: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomLeftSmall: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomRightSmall: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,

  // Shape item (medium)
  shapeBorderRadiusTopLeftMedium: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusTopRightMedium: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomLeftMedium: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomRightMedium: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,

  // Shape item (large)
  shapeBorderRadiusTopLeftLarge: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusTopRightLarge: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomLeftLarge: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomRightLarge: compatibilityMode
    ? 4
    : theme.sys.shape.borderRadiusSm,

  // Typography (base)
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.uiTextMd.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.sys.typography.uiTextMd.fontWeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.button
    : theme.sys.typography.uiTextMd.letterSpacing,

  // Typography (small)
  typographyFontSizeSmall: compatibilityMode
    ? theme.typography.fontSize.button
    : theme.sys.typography.uiTextMd.fontSize,
  typographyLineHeightSmall: compatibilityMode
    ? theme.typography.lineHeight.button
    : theme.sys.typography.uiTextMd.lineHeight,

  // Typography (medium)
  typographyFontSizeMedium: compatibilityMode
    ? theme.typography.fontSize.button
    : theme.sys.typography.uiTextMd.fontSize,
  typographyLineHeightMedium: compatibilityMode
    ? theme.typography.lineHeight.button
    : theme.sys.typography.uiTextMd.lineHeight,

  // Typography (large)
  typographyFontSizeLarge: compatibilityMode
    ? theme.typography.fontSize.button
    : theme.sys.typography.uiTextMd.fontSize,
  typographyLineHeightLarge: compatibilityMode
    ? theme.typography.lineHeight.button
    : theme.sys.typography.uiTextMd.lineHeight,
})
