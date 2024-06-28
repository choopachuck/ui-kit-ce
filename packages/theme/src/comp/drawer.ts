import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDrawer = (theme: Theme, compatibilityMode?: boolean) => ({
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  colorBackground: compatibilityMode
    ? theme.colourway.background01
    : theme.sys.color.backgroundAlpha,
  colorBorder: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.separationMajor,
  backdropColorBackground: compatibilityMode
    ? theme.colourway.mono06
    : theme.sys.color.backdropColorBackground,
  elevationShadow: compatibilityMode
    ? theme.colourway.shadow03
    : theme.sys.elevation.lg,

  shapeBorderRadiusTopLeftPlacementTop: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightPlacementTop: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftPlacementTop: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightPlacementTop: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  shapeBorderRadiusTopLeftPlacementBottom: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightPlacementBottom: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftPlacementBottom: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightPlacementBottom: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  shapeBorderRadiusTopLeftPlacementLeft: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightPlacementLeft: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftPlacementLeft: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightPlacementLeft: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  shapeBorderRadiusTopLeftPlacementRight: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightPlacementRight: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftPlacementRight: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightPlacementRight: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDrawerHeader = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  subtitleColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  /** @deprecated используйте `comp.closeButton.colorText` */
  closeButtonColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  /** @deprecated используйте `comp.closeButton.colorTextHover` */
  closeButtonColorTextHover: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,
  /** @deprecated используйте `comp.closeButton.colorTextActive` */
  closeButtonColorTextActive: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  /** @deprecated используйте `comp.closeButton.colorBackgroundHover` */
  closeButtonColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  /** @deprecated используйте `comp.closeButton.colorBackgroundActive` */
  closeButtonColorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,

  dividerColorBorder: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.separationMinor,

  // Типографика для DrawerHeader
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.headings
    : theme.sys.typography.titleLg.fontFamily,
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.h6
    : theme.sys.typography.titleLg.fontSize,
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.h6
    : theme.sys.typography.titleLg.lineHeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.h6
    : theme.sys.typography.titleLg.letterSpacing,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.sys.typography.titleLg.fontWeight,

  // Типографика для subtitle в DrawerHeader
  subtitleTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.titleMd.fontFamily,
  subtitleTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.subtitle1
    : theme.sys.typography.titleMd.fontSize,
  subtitleTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.subtitle1
    : theme.sys.typography.titleMd.lineHeight,
  subtitleTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.subtitle1
    : theme.sys.typography.titleMd.letterSpacing,
  subtitleTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.titleMd.fontWeight,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDrawerFooter = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  dividerColorBorder: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.separationMinor,
})
