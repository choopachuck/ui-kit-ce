import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createListItem = (theme: Theme, compatibilityMode?: boolean) => ({
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  colorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  colorTextCritical: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  colorTextCriticalHover: compatibilityMode
    ? theme.colourway.onErrorHigh
    : theme.sys.color.onErrorHigh,
  colorTextCriticalActive: compatibilityMode
    ? theme.colourway.onErrorHigh
    : theme.sys.color.onErrorHigh,
  colorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  colorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  colorBackgroundCriticalHover: compatibilityMode
    ? theme.colourway.errorHover
    : theme.sys.color.errorBeta,
  colorBackgroundCriticalActive: compatibilityMode
    ? theme.colourway.errorActive
    : theme.sys.color.errorGamma,
  colorBorder: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.separationMinor,

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

  shapeBorderRadiusTopLeftLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  // Типографика для ListItem
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createListItemGroup = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,

  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodySm.fontFamily,
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.caption
    : theme.sys.typography.bodySm.letterSpacing,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodySm.fontWeight,
})
