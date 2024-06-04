import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTable = (theme: Theme, compatibilityMode?: boolean) => ({
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,
  colorBorder: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.separationMinor,
  cellElevationShadowFixedStart: compatibilityMode
    ? `inset 6px 0 6px -5px ${theme.colourway.mono02}`
    : 'inset 6px 0 6px -4px rgba(28, 45, 51, 0.12)', // imitation of sys.elevation.md
  cellElevationShadowFixedEnd: compatibilityMode
    ? `inset -6px 0 6px -5px ${theme.colourway.mono02}`
    : 'inset -6px 0 6px -4px rgba(28, 45, 51, 0.12)', // imitation of sys.elevation.md
  headerColorBackground: compatibilityMode
    ? theme.colourway.background03
    : theme.sys.color.backgroundGamma,
  headerColorBorder: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.separationMinor,
  headerCellElevationShadowFixed: compatibilityMode
    ? `inset 0 8px 6px -6px ${theme.colourway.mono02}`
    : 'inset 0 8px 6px -5px rgba(28, 45, 51, 0.12)', // imitation of sys.elevation.md
  headerCellColorBackgroundSortableHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  sorterColorBackground: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  sorterColorBackgroundHover: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  sorterUpArrowColorBackgroundAscHover: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  sorterUpArrowColorBackgroundDesc: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  sorterDownArrowColorBackgroundAsc: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  sorterUpDownColorBackgroundDescHover: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  treeExpandButtonColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  treeExpandButtonColorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  treeExpandButtonColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  expandButtonColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  expandButtonColorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  expandButtonColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  bodyRowColorBackgroundHasFixedColumnsHover: compatibilityMode
    ? theme.colourway.background03
    : theme.sys.color.onBackgroundOverlayHover,
  bodyRowColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  bodyRowColorBackgroundHasFixedColumnsStripe: compatibilityMode
    ? theme.colourway.background02
    : theme.sys.color.onBackgroundOverlayToning,
  bodyRowColorBackgroundStripe: compatibilityMode
    ? theme.colourway.mono01
    : theme.sys.color.onBackgroundOverlayToning,
  bodyCellFixedColorBackground: compatibilityMode
    ? theme.colourway.background01
    : theme.sys.color.backgroundAlpha,
  bodyCellFixedColorBackgroundHover: compatibilityMode
    ? theme.colourway.background03
    : 'rgb(224, 224, 224)', // onOverlayHover without opacity
  bodyCellFixedColorBackgroundStripe: compatibilityMode
    ? theme.colourway.background02
    : 'rgb(245, 245, 245)', // onOverlayToning without opacity
  paginationColorText: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,
  paginationColorBorderBottom: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.separationMinor,
  paginationColorBorderTop: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.separationMinor,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  // Типографика для компонента HeadWrapperComponent в компоненте Head
  headerTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.titleSm.fontFamily,
  headerTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.subtitle2
    : theme.sys.typography.titleSm.fontSize,
  headerTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.subtitle2
    : theme.sys.typography.titleSm.lineHeight,
  headerTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.subtitle2
    : theme.sys.typography.titleSm.letterSpacing,
  headerTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.sys.typography.titleSm.fontWeight,

  // Типографика для компонента BodyWrapperComponent в body
  bodyTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  bodyTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  bodyTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  bodyTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
  bodyTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,

  // Типографика для TablePagination
  paginationTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  paginationTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  paginationTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  paginationTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
  paginationTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.sys.typography.bodyMd.fontWeight,
})
