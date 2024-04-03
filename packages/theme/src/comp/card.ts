import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCard = (theme: Theme, compatibilityMode?: boolean) => ({
  elevationShadow: 'none',
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,

  // color background
  colorBackgroundContainer: compatibilityMode
    ? theme.colourway.bar.light.bg01
    : theme.sys.color.backgroundAlpha,

  colorBackgroundClickable: compatibilityMode
    ? theme.colourway.bar.light.bg01
    : theme.sys.color.backgroundAlpha,
  colorBackgroundClickableHover: '#EFEFEF',
  colorBackgroundClickableActive: '#D6D6D6',
  colorBackgroundClickableDisabled: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.disabledLow,

  colorBackgroundSelectable: compatibilityMode
    ? theme.colourway.bar.light.bg01
    : theme.sys.color.backgroundAlpha,
  colorBackgroundSelectableHover: '#EFEFEF',
  colorBackgroundSelectableActive: '#D6D6D6',
  colorBackgroundSelectableDisabled: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.disabledLow,

  colorBackgroundSelectableChecked: compatibilityMode
    ? theme.colourway.bar.light.bg01
    : theme.sys.color.backgroundAlpha,
  colorBackgroundSelectableCheckedHover: '#EFEFEF',
  colorBackgroundSelectableCheckedActive: '#D6D6D6',
  colorBackgroundSelectableCheckedDisabled: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.disabledLow,

  // color text
  bodyColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  headerColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  subtitleColorText: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,

  headerColorTextDisabled: compatibilityMode
    ? theme.colourway.bar.light.onBgDisabled
    : theme.sys.color.disabledHigh,
  subtitleColorTextDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  bodyColorTextDisabled: compatibilityMode
    ? theme.colourway.bar.light.onBgDisabled
    : theme.sys.color.disabledHigh,

  // color border
  colorBorderContainer: compatibilityMode
    ? theme.colourway.bar.light.mn03
    : theme.sys.color.separationMinor,

  colorBorderClickable: compatibilityMode
    ? theme.colourway.bar.light.mn03
    : theme.sys.color.separationMinor,
  colorBorderClickableHover: compatibilityMode
    ? theme.colourway.bar.light.mn03
    : theme.sys.color.separationMinor,
  colorBorderClickableActive: compatibilityMode
    ? theme.colourway.bar.light.mn03
    : theme.sys.color.separationMinor,
  colorBorderClickableDisabled: compatibilityMode
    ? 'rgba(0, 0, 0, 0.08)'
    : theme.sys.color.disabledMedium,

  colorBorderSelectable: compatibilityMode
    ? theme.colourway.bar.light.mn03
    : theme.sys.color.separationMinor,
  colorBorderSelectableHover: compatibilityMode
    ? theme.colourway.bar.light.mn03
    : theme.sys.color.separationMinor,
  colorBorderSelectableActive: compatibilityMode
    ? theme.colourway.bar.light.mn03
    : theme.sys.color.separationMinor,
  colorBorderSelectableDisabled: compatibilityMode
    ? 'rgba(0, 0, 0, 0.08)'
    : theme.sys.color.disabledMedium,

  colorBorderSelectableChecked: compatibilityMode
    ? '#2B2B2B'
    : theme.sys.color.secondaryAlpha,
  colorBorderSelectableCheckedHover: compatibilityMode
    ? '#2B2B2B'
    : theme.sys.color.secondaryAlpha,
  colorBorderSelectableCheckedActive: compatibilityMode
    ? '#2B2B2B'
    : theme.sys.color.secondaryAlpha,
  colorBorderSelectableCheckedDisabled: compatibilityMode
    ? 'rgba(0, 0, 0, 0.08)'
    : theme.sys.color.disabledMedium,

  // shape border
  shapeBorderRadiusTopLeft: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusTopRight: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,

  //typography (body)
  bodyTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  bodyTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  bodyTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
  bodyTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  bodyTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,

  //typography (header)
  headerTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.h6
    : theme.sys.typography.titleLg.fontSize,
  headerTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.sys.typography.titleLg.fontWeight,
  headerTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.h6
    : theme.sys.typography.titleLg.letterSpacing,
  headerTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.h6
    : theme.sys.typography.titleLg.lineHeight,
  headerTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.headings
    : theme.sys.typography.titleLg.fontFamily,

  //typography (subtitle)
  subtitleTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.subtitle1
    : theme.sys.typography.titleMd.fontSize,
  subtitleTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.titleMd.fontWeight,
  subtitleTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.subtitle1
    : theme.sys.typography.titleMd.letterSpacing,
  subtitleTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.subtitle1
    : theme.sys.typography.titleMd.lineHeight,
  subtitleTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.titleMd.fontFamily,
})
