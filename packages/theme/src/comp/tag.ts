import { Theme } from '../interface'
import { setAlphaChannel } from '../utils'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTag = (theme: Theme, compatibilityMode?: boolean) => ({
  //lite
  colorTextLite: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  colorBorderLite: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlaySelect,
  colorBackgroundLiteFocus: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlaySelect,
  colorBackgroundLiteHover: compatibilityMode
    ? theme.colourway.mono03
    : theme.sys.color.onBackgroundOverlayHover,
  colorTextLiteDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  colorBorderLiteDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  colorTextLiteDragged: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  colorBackgroundLiteDragged: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundComponent,
  colorBorderLiteDragged: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  closeButtonColorBackgroundLiteHover: compatibilityMode
    ? theme.colourway.mono03
    : theme.sys.color.onBackgroundOverlayHover,
  closeButtonColorBackgroundLiteActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  closeButtonColorBackgroundLiteSelectedHover: compatibilityMode
    ? theme.colourway.mono03
    : theme.sys.color.onBackgroundOverlayHover,
  closeButtonColorBackgroundLiteSelectedActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  colorBackgroundLiteActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  colorBackgroundLiteSelected: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlaySelect,
  colorTextLiteSelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  colorBackgroundLiteSelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMinor
    : theme.sys.color.disabledMedium,
  colorBackgroundLiteSelectedDragged: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundComponent,
  //secondary
  colorTextSecondary: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorBorderSecondary: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorTextSecondaryFocus: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorBackgroundSecondaryFocus: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorTextSecondaryHover: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorBackgroundSecondaryHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  colorTextSecondaryActive: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorBackgroundSecondaryActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  closeButtonColorBackgroundSecondaryHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  closeButtonColorBackgroundSecondaryActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  closeButtonColorBackgroundSecondarySelectedHover: compatibilityMode
    ? theme.colourway.secondaryOverlayHover
    : theme.sys.color.onSecondaryOverlayHover,
  closeButtonColorBackgroundSecondarySelectedActive: compatibilityMode
    ? theme.colourway.secondaryOverlayActive
    : theme.sys.color.onSecondaryOverlayActive,
  colorTextSecondaryDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  colorBorderSecondaryDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  colorBorderSecondaryDragged: 'transparent',
  colorTextSecondaryDragged: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorBackgroundSecondaryDragged: compatibilityMode
    ? theme.colourway.secondarySelected
    : theme.sys.color.secondaryGamma,
  colorTextSecondarySelected: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorTextSecondarySelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  colorBackgroundSecondarySelected: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorBackgroundSecondarySelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  colorBackgroundSecondarySelectedDragged: compatibilityMode
    ? theme.colourway.secondarySelected
    : theme.sys.color.secondaryGamma,
  //primary
  colorTextPrimary: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  colorBorderPrimary: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  colorTextPrimaryFocus: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  colorBackgroundPrimaryFocus: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  colorTextPrimaryHover: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  colorBackgroundPrimaryHover: compatibilityMode
    ? theme.colourway.primaryHover
    : theme.sys.color.primaryBeta,
  colorTextPrimaryActive: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  colorBackgroundPrimaryActive: compatibilityMode
    ? theme.colourway.primaryActive
    : theme.sys.color.primaryGamma,
  closeButtonColorBackgroundPrimaryHover: compatibilityMode
    ? theme.colourway.primaryHover
    : theme.sys.color.primaryBeta,
  closeButtonColorBackgroundPrimaryActive: compatibilityMode
    ? theme.colourway.primaryActive
    : theme.sys.color.primaryGamma,
  closeButtonColorBackgroundPrimarySelectedHover: compatibilityMode
    ? theme.colourway.primaryOverlayHover
    : theme.sys.color.onPrimaryOverlayHover,
  closeButtonColorBackgroundPrimarySelectedActive: compatibilityMode
    ? theme.colourway.primaryOverlayActive
    : theme.sys.color.onPrimaryOverlayActive,
  colorTextPrimaryDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  colorBorderPrimaryDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  colorBorderPrimaryDragged: 'transparent',
  colorTextPrimaryDragged: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onPrimaryHigh,
  colorBackgroundPrimaryDragged: compatibilityMode
    ? theme.colourway.primarySelected
    : theme.sys.color.primaryGamma,
  colorTextPrimarySelected: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  colorTextPrimarySelectedDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  colorBackgroundPrimarySelected: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  colorBackgroundPrimarySelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  colorBackgroundPrimarySelectedDragged: compatibilityMode
    ? theme.colourway.primarySelected
    : theme.sys.color.primaryGamma,
  //coloured
  colorTextRed: compatibilityMode
    ? theme.colourway.onRed
    : theme.ref.palette.red20,
  colorBackgroundRed: compatibilityMode
    ? theme.colourway.red
    : setAlphaChannel(theme.ref.palette.red80, theme.ref.alpha.channel70),
  colorTextYellow: compatibilityMode
    ? theme.colourway.onYellow
    : theme.ref.palette.sunny20,
  colorBackgroundYellow: compatibilityMode
    ? theme.colourway.yellow
    : setAlphaChannel(theme.ref.palette.sunny80, theme.ref.alpha.channel70),
  colorTextGreen: compatibilityMode
    ? theme.colourway.onGreen
    : theme.ref.palette.green20,
  colorBackgroundGreen: compatibilityMode
    ? theme.colourway.green
    : setAlphaChannel(theme.ref.palette.green80, theme.ref.alpha.channel70),
  colorTextAzure: compatibilityMode
    ? theme.colourway.onAzure
    : theme.ref.palette.skyBlue20,
  colorBackgroundAzure: compatibilityMode
    ? theme.colourway.azure
    : setAlphaChannel(theme.ref.palette.skyBlue80, theme.ref.alpha.channel70),
  colorTextBlue: compatibilityMode
    ? theme.colourway.onBlue
    : theme.ref.palette.electricBlue20,
  colorBackgroundBlue: compatibilityMode
    ? theme.colourway.blue
    : setAlphaChannel(
        theme.ref.palette.electricBlue80,
        theme.ref.alpha.channel70
      ),
  colorTextViolet: compatibilityMode
    ? theme.colourway.onViolet
    : theme.ref.palette.orchid20,
  colorBackgroundViolet: compatibilityMode
    ? theme.colourway.violet
    : setAlphaChannel(theme.ref.palette.orchid80, theme.ref.alpha.channel70),
  colorTextGray: compatibilityMode
    ? theme.colourway.onGray
    : theme.ref.palette.gray20,
  colorBackgroundGray: compatibilityMode
    ? theme.colourway.gray
    : setAlphaChannel(theme.ref.palette.gray80, theme.ref.alpha.channel70),
  //global
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  colorBorderFocus: compatibilityMode
    ? theme.colourway.focusPocus
    : theme.sys.color.focusPocus,
  elevationShadowDragged: compatibilityMode
    ? theme.colourway.shadow02
    : theme.sys.elevation.md,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? '24px'
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusTopRight: compatibilityMode
    ? '24px'
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? '24px'
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? '24px'
    : theme.sys.shape.borderRadiusCircle,

  closeButtonShapeBorderRadiusTopLeft: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  closeButtonShapeBorderRadiusTopRight: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  closeButtonShapeBorderRadiusBottomLeft: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,
  closeButtonShapeBorderRadiusBottomRight: compatibilityMode
    ? '50%'
    : theme.sys.shape.borderRadiusCircle,

  //typography (base)
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,

  //typography xs
  typographyFontSizeXs: '',
  typographyLineHeightXs: '',

  //typography sm
  typographyFontSizeSm: '',
  typographyLineHeightSm: '',

  //typography md
  typographyFontSizeMd: '',
  typographyLineHeightMd: '',

  //typography lg
  typographyFontSizeLg: '',
  typographyLineHeightLg: '',

  //typography (old)
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyFontSizeXs`, `typographyFontSizeSm`, `typographyFontSizeMd` или `typographyFontSizeLg`
   */
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyLineHeightXs`, `typographyLineHeightSm`, `typographyLineHeightMd` или `typographyLineHeightLg`
   */
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTagInput = (theme: Theme, compatibilityMode?: boolean) => ({
  containerColorBorder: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.neutralAlpha,
  containerColorBorderDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  containerColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  containerColorBorderFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  tagColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  tagColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  inputColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  inputPlaceholderColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  inputColorBackground: compatibilityMode
    ? 'transparent'
    : theme.sys.color.backgroundComponent,
  iconColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  iconColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  iconColorTextFocusEmpty: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? '24px'
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusTopRight: compatibilityMode
    ? '24px'
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? '24px'
    : theme.sys.shape.borderRadiusCircle,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? '24px'
    : theme.sys.shape.borderRadiusCircle,

  shapeBorderRadiusTopLeftFocused: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusTopRightFocused: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomLeftFocused: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomRightFocused: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,

  //typography (base)
  typographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  typographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
  typographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,

  //typography xs
  typographyFontSizeXs: '',
  typographyLineHeightXs: '',

  //typography sm
  typographyFontSizeSm: '',
  typographyLineHeightSm: '',

  //typography xs
  typographyFontSizeMd: '',
  typographyLineHeightMd: '',

  //typography xs
  typographyFontSizeLg: '',
  typographyLineHeightLg: '',

  //typography (old)
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyFontSizeXs`, `typographyFontSizeSm`, `typographyFontSizeMd` или `typographyFontSizeLg`
   */
  typographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  /**
   * @deprecated Используйте соответствующие токены, в зависимости от нужного размера: `typographyLineHeightXs`, `typographyLineHeightSm`, `typographyLineHeightMd` или `typographyLineHeightLg`
   */
  typographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
})
