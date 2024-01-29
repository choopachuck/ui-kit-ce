import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createNotification = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  colorBackground: compatibilityMode
    ? theme.colourway.background01
    : theme.sys.color.backgroundAlpha,
  elevationShadow: compatibilityMode
    ? theme.colourway.shadow01
    : theme.sys.elevation.md,
  indicatorColorBackgroundNeutral: compatibilityMode
    ? theme.colourway.support
    : theme.sys.color.neutralAlpha,
  indicatorColorBackgroundSuccess: compatibilityMode
    ? theme.colourway.success
    : theme.sys.color.successAlpha,
  indicatorColorBackgroundInfo: compatibilityMode
    ? theme.colourway.info
    : theme.sys.color.infoAlpha,
  indicatorColorBackgroundWarning: compatibilityMode
    ? theme.colourway.warning
    : theme.sys.color.warningAlpha,
  indicatorColorBackgroundError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  iconColorTextNeutral: compatibilityMode
    ? theme.colourway.support
    : theme.sys.color.neutralAlpha,
  iconColorTextSuccess: compatibilityMode
    ? theme.colourway.success
    : theme.sys.color.successAlpha,
  iconColorTextInfo: compatibilityMode
    ? theme.colourway.info
    : theme.sys.color.infoAlpha,
  iconColorTextWarning: compatibilityMode
    ? theme.colourway.warning
    : theme.sys.color.warningAlpha,
  iconColorTextError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  closeButtonColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  closeButtonColorTextHover: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,
  closeButtonColorTextActive: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  closeButtonColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  closeButtonColorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  closeButtonColorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,

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

  // Content typography tokens
  contentTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  contentTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.ref.typography.fontWeight.semiBold,
  contentTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  contentTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  contentTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
})
