import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createNotification = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  /** @deprecated используйте токены titleColorText* и contentColorText* */
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,

  titleColorTextError: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  titleColorTextWarning: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  titleColorTextSuccess: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  titleColorTextNeutral: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  titleColorTextInfo: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,

  contentColorTextError: '',
  contentColorTextWarning: '',
  contentColorTextSuccess: '',
  contentColorTextNeutral: '',
  contentColorTextInfo: '',

  colorBorderError: 'transparent',
  colorBorderWarning: 'transparent',
  colorBorderSuccess: 'transparent',
  colorBorderInfo: 'transparent',
  colorBorderNeutral: 'transparent',

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
  /** @deprecated используйте токены comp.closeButton */
  closeButtonColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  /** @deprecated используйте токены comp.closeButton */
  closeButtonColorTextHover: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,
  /** @deprecated используйте токены comp.closeButton */
  closeButtonColorTextActive: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  /** @deprecated используйте токены comp.closeButton */
  closeButtonColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  /** @deprecated используйте токены comp.closeButton */
  closeButtonColorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  /** @deprecated используйте токены comp.closeButton */
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
  titleTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  titleTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.ref.typography.fontWeight.semiBold,
  titleTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  titleTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  titleTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,

  next_contentTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  next_contentTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  next_contentTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  next_contentTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  next_contentTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,

  /** @deprecated */
  contentTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  /** @deprecated */
  contentTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.ref.typography.fontWeight.semiBold,
  /** @deprecated */
  contentTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  /** @deprecated */
  contentTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  /** @deprecated */
  contentTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
})
