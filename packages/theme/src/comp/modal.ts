import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createModal = (theme: Theme, compatibilityMode?: boolean) => ({
  colorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  colorBackground: compatibilityMode
    ? theme.colourway.background01
    : theme.sys.color.backgroundAlpha,
  elevationShadow: compatibilityMode
    ? theme.colourway.shadow03
    : theme.sys.elevation.xl,
  backdropColorBackground: compatibilityMode
    ? theme.colourway.mono06
    : theme.sys.color.backdropColorBackground,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusXl,

  colorBorder: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.separationMajor,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createModalHeader = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  subtitleColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,

  /** @deprecated используйте токены `comp.closeButton.colorText` */
  closeButtonColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  /** @deprecated используйте токены `comp.closeButton.colorTextHover` */
  closeButtonColorTextHover: compatibilityMode
    ? theme.colourway.onBackgroundMedium
    : theme.sys.color.onBackgroundMedium,
  /** @deprecated используйте токены `comp.closeButton.colorTextActive` */
  closeButtonColorTextActive: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  /** @deprecated используйте токены `comp.closeButton.colorBackgroundHover` */
  closeButtonColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  /** @deprecated используйте токены `comp.closeButton.colorBackgroundActive` */
  closeButtonColorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,

  // Типографика для subtitle в ModalHeader
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

  // Типографика для ModalHeader
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
})
