import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStep = (theme: Theme, compatibilityMode?: boolean) => ({
  iconColorText: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,
  iconColorTextError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  iconColorTextErrorHover: compatibilityMode
    ? theme.colourway.errorHover
    : theme.sys.color.errorBeta,
  iconColorTextErrorActive: compatibilityMode
    ? theme.colourway.errorActive
    : theme.sys.color.errorGamma,
  iconColorTextCurrent: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  iconColorTextCompleted: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  iconColorTextCompletedHover: compatibilityMode
    ? theme.colourway.primaryHover
    : theme.sys.color.primaryBeta,
  iconColorTextCompletedActive: compatibilityMode
    ? theme.colourway.primaryActive
    : theme.sys.color.primaryGamma,
  iconColorTextDisabled: compatibilityMode
    ? theme.colourway.disabledMinor
    : theme.sys.color.disabledHigh,
  iconNumberColorTextCurrent: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  labelColorText: compatibilityMode
    ? theme.colourway.onBackgroundHigh
    : theme.sys.color.onBackgroundHigh,
  labelColorTextError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  labelColorTextErrorHover: compatibilityMode
    ? theme.colourway.errorHover
    : theme.sys.color.errorBeta,
  labelColorTextErrorActive: compatibilityMode
    ? theme.colourway.errorActive
    : theme.sys.color.errorGamma,
  labelColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  badgeColorBackgroundError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  badgeColorBackgroundErrorHover: compatibilityMode
    ? theme.colourway.errorHover
    : theme.sys.color.errorBeta,
  badgeColorBackgroundErrorActive: compatibilityMode
    ? theme.colourway.errorActive
    : theme.sys.color.errorGamma,
  badgeColorBackgroundDisabled: compatibilityMode
    ? theme.colourway.disabledMinor
    : theme.sys.color.disabledHigh,
  connectorColorBackground: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,
  connectorColorBackgroundError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  connectorColorBackgroundErrorHover: compatibilityMode
    ? theme.colourway.errorHover
    : theme.sys.color.errorBeta,
  connectorColorBackgroundErrorActive: compatibilityMode
    ? theme.colourway.errorActive
    : theme.sys.color.errorGamma,
  connectorColorBackgroundCompleted: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  connectorColorBackgroundCompletedHover: compatibilityMode
    ? theme.colourway.primaryHover
    : theme.sys.color.primaryBeta,
  connectorColorBackgroundCompletedActive: compatibilityMode
    ? theme.colourway.primaryActive
    : theme.sys.color.primaryGamma,
  connectorColorBackgroundDisabled: compatibilityMode
    ? theme.colourway.disabledMinor
    : theme.sys.color.disabledHigh,
  descriptionColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  descriptionColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,

  shapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  // Step text colors

  /**
   * @deprecated Будет удалено, для задания цвета используйте `descriptionColorText` и `labelColorText`
   */
  colorText: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  /**
   * @deprecated Будет удалено, для задания цвета используйте `descriptionColorText` и `labelColorText`
   */
  colorTextHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  /**
   * @deprecated Будет удалено, для задания цвета используйте `descriptionColorText` и `labelColorText`
   */
  colorTextActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  /**
   * @deprecated Будет удалено, для задания цвета используйте `descriptionColorTextDisabled` и `labelColorTextDisabled`
   */
  colorTextDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  /**
   * @deprecated Будет удалено, для задания цвета используйте  `labelColorTextError`
   */
  colorTextError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  /**
   * @deprecated Будет удалено, для задания цвета используйте  `labelColorTextErrorActive`
   */
  colorTextErrorActive: compatibilityMode
    ? theme.colourway.errorActive
    : theme.sys.color.errorGamma,
  /**
   * @deprecated Будет удалено, для задания цвета используйте  `labelColorTextErrorDisabled`
   */
  colorTextErrorDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  /**
   * @deprecated Будет удалено, для задания цвета используйте  `labelColorTextErrorHover`
   */
  colorTextErrorHover: compatibilityMode
    ? theme.colourway.errorHover
    : theme.sys.color.errorBeta,

  // Step shadow colors
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,

  // Step background colors
  colorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  colorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  colorBackgroundErrorActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  colorBackgroundErrorHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,

  // Button step typography
  iconNumberTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.uiTextMd.fontFamily,
  iconNumberTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.button
    : theme.sys.typography.uiTextMd.fontSize,
  iconNumberTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.button
    : theme.sys.typography.uiTextMd.lineHeight,
  iconNumberTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.button
    : theme.sys.typography.uiTextMd.letterSpacing,
  iconNumberTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.sys.typography.uiTextMd.fontWeight,

  // Label step typography
  labelTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.titleSm.fontFamily,
  labelTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.subtitle2
    : theme.sys.typography.titleSm.fontSize,
  labelTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.subtitle2
    : theme.sys.typography.titleSm.lineHeight,
  labelTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.subtitle2
    : theme.sys.typography.titleSm.letterSpacing,
  labelTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.semibold
    : theme.sys.typography.titleSm.fontWeight,

  // Description step typography
  descriptionTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodySm.fontFamily,
  descriptionTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.caption
    : theme.sys.typography.bodySm.fontSize,
  descriptionTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.caption
    : theme.sys.typography.bodySm.lineHeight,
  descriptionTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.caption
    : theme.sys.typography.bodySm.letterSpacing,
  descriptionTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodySm.fontWeight,
})
