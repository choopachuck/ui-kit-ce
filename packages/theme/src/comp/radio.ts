import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRadio = (theme: Theme, compatibilityMode?: boolean) => ({
  // Unchecked
  next_colorBackground: 'transparent',
  next_colorBackgroundHover: 'transparent',
  next_colorBackgroundActive: 'transparent',
  next_colorBackgroundDisabled: 'transparent',
  colorBorder: '',
  colorBorderHover: '',
  colorBorderActive: '',
  colorBorderDisabled: '',

  // Checked
  colorBackgroundChecked: 'transparent',
  colorBackgroundCheckedHover: 'transparent',
  colorBackgroundCheckedActive: 'transparent',
  colorBackgroundCheckedDisabled: 'transparent',
  colorBorderChecked: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorBorderCheckedHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  colorBorderCheckedActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  colorBorderCheckedDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
  colorMark: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  colorMarkHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  colorMarkActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  colorMarkDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,

  // Focus
  colorShadowFocus: compatibilityMode
    ? theme.colourway.focus
    : theme.sys.color.focus,

  // Uncheched (old)
  /**
   * @deprecated будет удалено, используйте токен `colorBorder`
   */
  colorBackground: compatibilityMode
    ? theme.colourway.secondary
    : theme.sys.color.secondaryAlpha,
  /**
   * @deprecated будет удалено, используйте токен `colorBorderHover`
   */
  colorBackgroundHover: compatibilityMode
    ? theme.colourway.secondaryHover
    : theme.sys.color.secondaryBeta,
  /**
   * @deprecated будет удалено, используйте токен `colorBorderActive`
   */
  colorBackgroundActive: compatibilityMode
    ? theme.colourway.secondaryActive
    : theme.sys.color.secondaryGamma,
  /**
   * @deprecated будет удалено, используйте токен `colorBorderDisabled`
   */
  colorBackgroundDisabled: compatibilityMode
    ? theme.colourway.disabledMajor
    : theme.sys.color.disabledHigh,
})
