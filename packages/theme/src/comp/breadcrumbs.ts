import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createBreadcrumbs = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  //tokens TODO: <name>LastChild -> currentPage<name>
  colorTextLastChild: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  dividerColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,

  //tokens TODO: <name>LastChild -> currentPage<name>
  typographyFontFamilyLastChild: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  typographyFontWeightLastChild: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  typographyFontSizeLastChild: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  typographyLineHeightLastChild: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  typographyLetterSpacingLastChild: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,

  dividerTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  dividerTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  dividerTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  dividerTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  dividerTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
})
