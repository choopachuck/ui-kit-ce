import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDatePicker = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  dropdownColorBackground: compatibilityMode
    ? theme.colourway.background01
    : theme.sys.color.backgroundAlpha,
  dropdownColorBorder: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.separationMajor,
  dropdownElevationShadow: compatibilityMode
    ? theme.colourway.shadow03
    : theme.sys.elevation.md,

  dropdownShapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  dropdownShapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  dropdownShapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  dropdownShapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRangePicker = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  dropdownColorBackground: compatibilityMode
    ? theme.colourway.background01
    : theme.sys.color.backgroundAlpha,
  dropdownColorBorder: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.separationMajor,
  dropdownElevationShadow: compatibilityMode
    ? theme.colourway.shadow03
    : theme.sys.elevation.md,
  inputColorBackground: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundComponent,
  inputColorBackgroundError: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.backgroundComponent,
  inputColorBackgroundDisabled: compatibilityMode
    ? theme.colourway.backgroundComponent
    : theme.sys.color.disabledLow,
  inputColorBorder: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,
  inputColorBorderHover: compatibilityMode
    ? theme.colourway.mono06
    : theme.sys.color.neutralBeta,
  inputColorBorderError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  inputColorBorderDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  inputColorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  dividerColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  dividerColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  iconColorText: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  iconColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  // DEPRECATED, REMOVE AFTER REFACTORING RANGE PICKER
  infinityPanelColorBackground: compatibilityMode
    ? theme.colourway.background02
    : theme.sys.color.backgroundBeta,
  infinityPanelColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,

  inputShapeBorderRadiusTopLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  inputShapeBorderRadiusTopRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  inputShapeBorderRadiusBottomLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  inputShapeBorderRadiusBottomRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  inputShapeBorderRadiusTopLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  inputShapeBorderRadiusTopRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  inputShapeBorderRadiusBottomLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  inputShapeBorderRadiusBottomRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,

  inputShapeBorderRadiusTopLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  inputShapeBorderRadiusTopRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  inputShapeBorderRadiusBottomLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  inputShapeBorderRadiusBottomRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,

  dropdownShapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  dropdownShapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  dropdownShapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  dropdownShapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCalendarPicker = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  monthButtonColorTextSelected: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  monthButtonColorBackgroundSelected: compatibilityMode
    ? theme.colourway.mono03
    : theme.sys.color.onBackgroundOverlaySelect,
  yearButtonColorTextSelected: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  yearButtonColorBackgroundSelected: compatibilityMode
    ? theme.colourway.mono03
    : theme.sys.color.onBackgroundOverlaySelect,
  /**
   * @deprecated Будет удалено. Скругление наследуется из компонента `Button`
   */
  buttonShapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  /**
   * @deprecated Будет удалено. Скругление наследуется из компонента `Button`
   */
  buttonShapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  /**
   * @deprecated Будет удалено. Скругление наследуется из компонента `Button`
   */
  buttonShapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  /**
   * @deprecated Будет удалено. Скругление наследуется из компонента `Button`
   */
  buttonShapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTimeView = () => ({
  timeButtonTypographyFontSize: '', // dayView.dayButtonTypographyFontSize
  timeButtonTypographyFontFamily: '', // dayView.dayButtonTypographyFontFamily
  timeButtonTypographyFontWeight: '', // dayView.dayButtonTypographyFontWeight
  timeButtonTypographyLineHeight: '', // dayView.dayButtonTypographyLineHeight
  timeButtonTypographyLetterSpacing: '', // dayView.dayButtonTypographyLetterSpacing
  timeButtonColorBackgroundHover: '', // dayView.dayButtonColorBackgroundHover
  timeButtonColorTextDisabled: '', // dayView.dayButtonColorTextDisabled
  timeButtonColorShadowFocus: '', // dayView.dayButtonColorShadowFocus
  timeButtonColorBackgroundActive: '', // dayView.dayButtonColorBackgroundActive
  timeButtonColorBackgroundSelectedHover: '', // dayView.dayButtonColorBackgroundSelectedHover
  timeButtonColorBackgroundSelectedActive: '', // dayView.dayButtonColorBackgroundSelectedActive
  timeButtonColorBorderFocus: '', // dayView.dayButtonColorBorderFocus
  dividerColorBorder: '', //dayView.dividerColorBorder
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDayView = (theme: Theme, compatibilityMode?: boolean) => ({
  weekDayColorText: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  dayButtonColorText: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.onBackgroundHigh,
  dayButtonColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  dayButtonColorTextSelected: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  dayButtonColorTextSelectedDisabled: compatibilityMode
    ? theme.colourway.onPrimaryLow
    : theme.sys.color.disabledHigh,
  dayButtonColorTextToday: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  dayButtonColorTextTodayDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  dayButtonColorTextTodaySelected: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  dayButtonColorTextNotInMonth: compatibilityMode
    ? theme.colourway.onBackgroundLow
    : theme.sys.color.onBackgroundLow,
  dayButtonColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  dayButtonColorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  dayButtonColorBackgroundSelected: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  dayButtonColorBackgroundSelectedHover: compatibilityMode
    ? theme.colourway.primaryHover
    : theme.sys.color.primaryBeta,
  dayButtonColorBackgroundSelectedActive: compatibilityMode
    ? theme.colourway.primaryActive
    : theme.sys.color.primaryGamma,
  dayButtonColorBackgroundSelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  dayButtonColorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  dayButtonColorBorderFocus: compatibilityMode
    ? theme.colourway.focusPocus
    : theme.sys.color.focusPocus,
  dayButtonColorBackgroundWithinRange: compatibilityMode
    ? theme.colourway.primaryHighlight
    : theme.sys.color.primaryOverlaySelect,
  dayButtonColorBackgroundWithinRangeHover: compatibilityMode
    ? 'rgba(42, 114, 248, 0.24)'
    : theme.sys.color.primaryOverlayHover,
  dayButtonColorBorderHover: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  dividerColorBorder: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.separationMajor,
  dayButtonShapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  dayButtonShapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  dayButtonShapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  dayButtonShapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  // типографика для weekDay в DayView
  weekDayTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.titleMd.fontFamily,
  weekDayTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.subtitle1
    : theme.sys.typography.titleMd.fontSize,
  weekDayTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.subtitle1
    : theme.sys.typography.titleMd.lineHeight,
  weekDayTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.subtitle1
    : theme.sys.typography.titleMd.letterSpacing,
  weekDayTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.titleMd.fontWeight,

  // типографика для day в DayView
  dayButtonTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  dayButtonTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  dayButtonTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  dayButtonTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
  dayButtonTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRangeDayView = () => ({
  //TODO: удалить в 2.0
  weekDayColorText: '',
  dayButtonColorTextToday: '',
  dayButtonColorTextTodayDisabled: '',
  dayButtonColorTextTodaySelected: '',
  dayButtonColorTextNotInMonth: '',
  dayButtonColorBackgroundWithinRange: '',
  dayButtonColorBackgroundWithinRangeHover: '',
  dayButtonColorBorderHover: '',
  dividerColorBorder: '',
  dayButtonShapeBorderRadiusTopLeft: '',
  dayButtonShapeBorderRadiusTopRight: '',
  dayButtonShapeBorderRadiusBottomLeft: '',
  dayButtonShapeBorderRadiusBottomRight: '',
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createMonthView = (theme: Theme, compatibilityMode?: boolean) => ({
  monthButtonColorText: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.onBackgroundHigh,
  monthButtonColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  monthButtonColorTextSelected: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  monthButtonColorTextSelectedDisabled: compatibilityMode
    ? theme.colourway.onPrimaryLow
    : theme.sys.color.disabledHigh,
  monthButtonColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  monthButtonColorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  monthButtonColorBackgroundSelected: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  monthButtonColorBackgroundSelectedHover: compatibilityMode
    ? theme.colourway.primaryHover
    : theme.sys.color.primaryBeta,
  monthButtonColorBackgroundSelectedActive: compatibilityMode
    ? theme.colourway.primaryActive
    : theme.sys.color.primaryGamma,
  monthButtonColorBackgroundSelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  monthButtonColorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  monthButtonColorBorderFocus: compatibilityMode
    ? theme.colourway.focusPocus
    : theme.sys.color.focusPocus,
  monthButtonColorBorderHover: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  monthButtonColorBackgroundWithinRange: compatibilityMode
    ? theme.colourway.primaryHighlight
    : theme.sys.color.primaryOverlaySelect,
  monthButtonColorBackgroundWithinRangeHover: compatibilityMode
    ? 'rgba(42, 114, 248, 0.24)'
    : theme.sys.color.primaryOverlayHover,
  monthButtonShapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  monthButtonShapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  monthButtonShapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  monthButtonShapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  // типографика для month в MonthView
  monthButtonTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  monthButtonTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  monthButtonTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  monthButtonTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
  monthButtonTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createYearView = (theme: Theme, compatibilityMode?: boolean) => ({
  yearButtonColorText: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.onBackgroundHigh,
  yearButtonColorTextDisabled: compatibilityMode
    ? theme.colourway.onBackgroundDisabled
    : theme.sys.color.disabledHigh,
  yearButtonColorTextSelected: compatibilityMode
    ? theme.colourway.onPrimaryHigh
    : theme.sys.color.onPrimaryHigh,
  yearButtonColorTextSelectedDisabled: compatibilityMode
    ? theme.colourway.onPrimaryLow
    : theme.sys.color.disabledHigh,
  yearButtonColorBackgroundHover: compatibilityMode
    ? theme.colourway.mono02
    : theme.sys.color.onBackgroundOverlayHover,
  yearButtonColorBackgroundActive: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.onBackgroundOverlayActive,
  yearButtonColorBackgroundSelected: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  yearButtonColorBackgroundSelectedHover: compatibilityMode
    ? theme.colourway.primaryHover
    : theme.sys.color.primaryBeta,
  yearButtonColorBackgroundSelectedActive: compatibilityMode
    ? theme.colourway.primaryActive
    : theme.sys.color.primaryGamma,
  yearButtonColorBackgroundSelectedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledMedium,
  yearButtonColorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
  yearButtonColorBorderFocus: compatibilityMode
    ? theme.colourway.focusPocus
    : theme.sys.color.focusPocus,
  yearButtonColorBorderHover: compatibilityMode
    ? theme.colourway.primary
    : theme.sys.color.primaryAlpha,
  yearButtonColorBackgroundWithinRange: compatibilityMode
    ? theme.colourway.primaryHighlight
    : theme.sys.color.primaryOverlaySelect,
  yearButtonColorBackgroundWithinRangeHover: compatibilityMode
    ? 'rgba(42, 114, 248, 0.24)'
    : theme.sys.color.primaryOverlayHover,
  yearButtonShapeBorderRadiusTopLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  yearButtonShapeBorderRadiusTopRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  yearButtonShapeBorderRadiusBottomLeft: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  yearButtonShapeBorderRadiusBottomRight: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  // типографика для year в YearView
  yearButtonTypographyFontFamily: compatibilityMode
    ? theme.typography.fontFamily.text
    : theme.sys.typography.bodyMd.fontFamily,
  yearButtonTypographyFontSize: compatibilityMode
    ? theme.typography.fontSize.body2
    : theme.sys.typography.bodyMd.fontSize,
  yearButtonTypographyLineHeight: compatibilityMode
    ? theme.typography.lineHeight.body2
    : theme.sys.typography.bodyMd.lineHeight,
  yearButtonTypographyLetterSpacing: compatibilityMode
    ? theme.typography.letterSpacing.body2
    : theme.sys.typography.bodyMd.letterSpacing,
  yearButtonTypographyFontWeight: compatibilityMode
    ? theme.typography.fontWeight.regular
    : theme.sys.typography.bodyMd.fontWeight,
})
