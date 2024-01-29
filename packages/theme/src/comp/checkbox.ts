import { Theme } from '../interface'

//TODO: удалить все токены для iconColorText в 2.0
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCheckbox = (theme: Theme, compatibilityMode?: boolean) => ({
  // Unchecked
  colorBackground: 'transparent',
  colorBackgroundHover: 'transparent',
  colorBackgroundActive: 'transparent',
  colorBackgroundDisabled: 'transparent',
  /**
   * @deprecated будет удалено, используйте `colorMark`
   */
  iconColorText: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorMark: '',
  colorBorder: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorBorderHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  colorBorderActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  colorBorderDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,

  // Checked
  colorBackgroundChecked: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorBackgroundCheckedHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  colorBackgroundCheckedActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  colorBackgroundCheckedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  colorBorderChecked: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorBorderCheckedHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  colorBorderCheckedActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  colorBorderCheckedDisabled: 'transparent',
  /**
   * @deprecated будет удалено, используйте `colorMarkChecked`
   */
  iconColorTextChecked: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorMarkChecked: '',
  /**
   * @deprecated будет удалено, используйте `colorMarkCheckedHover`
   */
  iconColorTextCheckedHover: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorMarkCheckedHover: '',
  /**
   * @deprecated будет удалено, используйте `colorMarkCheckedActive`
   */
  iconColorTextCheckedActive: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorMarkCheckedActive: '',
  /**
   * @deprecated будет удалено, используйте `colorMarkCheckedDisabled`
   */
  iconColorTextCheckedDisabled: compatibilityMode
    ? theme.colourway.onSecondaryHigh
    : theme.sys.color.onSecondaryHigh,
  colorMarkCheckedDisabled: '',
  /**
   * Indeterminate
   */
  /**
   * @deprecated будет удалено, используйте `colorMarkIndeterminate`
   */
  iconColorTextIndeterminate: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorMarkIndeterminate: '',
  /**
   * @deprecated будет удалено, используйте `colorMarkIndeterminateHover`
   */
  iconColorTextIndeterminateHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  colorMarkIndeterminateHover: '',
  /**
   * @deprecated будет удалено, используйте `colorMarkIndeterminateActive`
   */
  iconColorTextIndeterminateActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  colorMarkIndeterminateActive: '',
  /**
   * @deprecated будет удалено, используйте `colorMarkIndeterminateDisabled`
   */
  iconColorTextIndeterminateDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  colorMarkIndeterminateDisabled: '',
  /**
   * Focus
   */
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,
})
