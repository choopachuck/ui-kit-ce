import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createBadge = (theme: Theme, compatibilityMode?: boolean) => ({
  colorShadow: compatibilityMode
    ? theme.colourway.background01
    : theme.sys.color.backgroundAlpha,
  colorBackgroundSuccess: compatibilityMode
    ? theme.colourway.success
    : theme.sys.color.successAlpha,
  colorBackgroundError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  colorBackgroundNeutral: compatibilityMode
    ? theme.colourway.support
    : theme.sys.color.neutralAlpha,
  colorBackgroundInfo: compatibilityMode
    ? theme.colourway.info
    : theme.sys.color.infoAlpha,
  colorBackgroundWarning: compatibilityMode
    ? theme.colourway.warning
    : theme.sys.color.warningAlpha,
  colorBackgroundDisabled: compatibilityMode
    ? theme.colourway.disabledOpaque
    : theme.sys.color.disabledMedium,
  colorTextSuccess: compatibilityMode
    ? theme.colourway.onSuccessHigh
    : theme.sys.color.onSuccessHigh,
  colorTextError: compatibilityMode
    ? theme.colourway.onErrorHigh
    : theme.sys.color.onErrorHigh,
  colorTextNeutral: compatibilityMode
    ? theme.colourway.onSupportHigh
    : theme.sys.color.onNeutralHigh,
  colorTextInfo: compatibilityMode
    ? theme.colourway.onInfoHigh
    : theme.sys.color.onInfoHigh,
  colorTextWarning: compatibilityMode
    ? theme.colourway.onWarningHigh
    : theme.sys.color.onWarningHigh,
  colorTextDisabled: compatibilityMode
    ? theme.colourway.onWarningLow
    : theme.sys.color.disabledHigh,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? 16
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusTopRight: compatibilityMode
    ? 16
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? 16
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? 16
    : theme.sys.shape.borderRadiusCircle,

  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodySm.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.ref.typography.fontWeight.semiBold,
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.caption
    : theme.sys.typography.bodySm.letterSpacing,

  dotShapeBorderRadiusTopLeft: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  dotShapeBorderRadiusTopRight: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  dotShapeBorderRadiusBottomLeft: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  dotShapeBorderRadiusBottomRight: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
})
