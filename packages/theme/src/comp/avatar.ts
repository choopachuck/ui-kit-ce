import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createAvatar = (theme: Theme, compatibilityMode?: boolean) => ({
  // ----------------------------------
  // ------------- AVATAR -------------
  // ----------------------------------

  // Background
  colorBackground: compatibilityMode
    ? theme.colourway.support
    : theme.sys.color.neutralAlpha,

  // Text
  colorText: compatibilityMode
    ? theme.colourway.onSupportHigh
    : theme.sys.color.onNeutralHigh,

  // Border
  colorBorder: compatibilityMode
    ? theme.colourway.bar.light.mn02
    : theme.sys.color.separationMinor,

  // Shadow
  elevationShadow: compatibilityMode
    ? theme.colourway.shadow01
    : theme.sys.elevation.sm,

  // Shape (circle)
  shapeBorderRadiusTopLeftCircle: compatibilityMode
    ? 9999
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusTopRightCircle: compatibilityMode
    ? 9999
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomLeftCircle: compatibilityMode
    ? 9999
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomRightCircle: compatibilityMode
    ? 9999
    : theme.sys.shape.borderRadiusCircle,

  // Shape (rounded)
  shapeBorderRadiusTopLeftRounded: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusTopRightRounded: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusBottomLeftRounded: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusBottomRightRounded: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,

  // Shape (square)
  shapeBorderRadiusTopLeftSquare: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightSquare: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftSquare: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightSquare: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  // Typography (base)
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.uiTextMd.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.sys.typography.uiTextMd.fontWeight,

  // ----------------------------------
  // ---------- AVATAR GROUP ----------
  // ----------------------------------

  // Border
  avatarGroupColorBorder: compatibilityMode
    ? theme.colourway.bar.light.bg01
    : theme.sys.color.backgroundAlpha,
})
