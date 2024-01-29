import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createLink = (theme: Theme, compatibilityMode?: boolean) => ({
  colorText: compatibilityMode
    ? theme.colourway.link
    : theme.ref.palette.electricBlue50,
  colorTextHover: compatibilityMode
    ? theme.colourway.linkHover
    : theme.ref.palette.electricBlue40,
  colorTextActive: compatibilityMode
    ? theme.colourway.linkActive
    : theme.ref.palette.electricBlue30,
  colorTextDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  colorTextVisited: compatibilityMode
    ? theme.colourway.linkVisited
    : theme.ref.palette.orchid40,
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRight: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
})
