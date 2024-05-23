import { Theme } from '../interface'
import { setAlphaChannel } from '../utils'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createSlider = (theme: Theme, compatibilityMode?: boolean) => ({
  trackColorBackground: compatibilityMode
    ? theme.colourway.mono05
    : setAlphaChannel(theme.sys.color.neutralAlpha, theme.ref.alpha.channel45),
  trackColorBackgroundDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  rangeColorBackground: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  rangeColorBackgroundActive: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  rangeColorBackgroundDisabled: 'transparent',
  tooltipColorBackground: '',
  tooltipColorText: '',
  tooltipColorBorder: '',
  tickColorBackground: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundBeta,
  tickLabelColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  markerColorBackground: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  markerColorBackgroundHover: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  markerColorBackgroundActive: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  markerColorBackgroundFocus: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  markerColorBackgroundDisabled: compatibilityMode
    ? theme.colourway.disabledOpaque
    : theme.sys.color.disabled,
  markerColorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  markerColorBorderShadowFocus: compatibilityMode
    ? theme.colourway.focusPocus
    : theme.sys.color.focusPocus,

  trackShapeBorderRadiusTopLeft: compatibilityMode
    ? 2
    : theme.sys.shape.borderRadiusCircle,
  trackShapeBorderRadiusTopRight: compatibilityMode
    ? 2
    : theme.sys.shape.borderRadiusCircle,
  trackShapeBorderRadiusBottomLeft: compatibilityMode
    ? 2
    : theme.sys.shape.borderRadiusCircle,
  trackShapeBorderRadiusBottomRight: compatibilityMode
    ? 2
    : theme.sys.shape.borderRadiusCircle,
  markerShapeBorderRadiusTopLeft: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  markerShapeBorderRadiusTopRight: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  markerShapeBorderRadiusBottomLeft: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  markerShapeBorderRadiusBottomRight: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,

  // Content typography
  tickLabelTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodySm.fontFamily,
  tickLabelTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  tickLabelTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,
  tickLabelTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.caption
    : theme.sys.typography.bodySm.letterSpacing,
  tickLabelTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodySm.fontWeight,
})
