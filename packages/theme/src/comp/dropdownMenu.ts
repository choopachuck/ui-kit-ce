import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDropdownMenu = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  colorBackground: compatibilityMode
    ? theme.colourway.background01
    : theme.sys.color.backgroundAlpha,
  colorBorder: compatibilityMode
    ? theme.colourway.mono04
    : theme.sys.color.separationMajor,
  elevationShadow: compatibilityMode
    ? theme.colourway.shadow03
    : theme.sys.elevation.md,

  shapeBorderRadiusTopLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusTopRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomLeftMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,
  shapeBorderRadiusBottomRightMd: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusMd,

  shapeBorderRadiusTopLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusTopRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomLeftSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,
  shapeBorderRadiusBottomRightSm: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusSm,

  shapeBorderRadiusTopLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  shapeBorderRadiusTopRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  shapeBorderRadiusBottomLeftLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
  shapeBorderRadiusBottomRightLg: compatibilityMode
    ? theme.shape.borderRadius
    : theme.sys.shape.borderRadiusLg,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDropdownMenuItem = (
  theme: Theme,
  compatibilityMode?: boolean
) => ({
  //TODO: поменять значение в 2.0
  colorBackground: '',

  //TODO: удалить в 2.0
  colorBorder: '',
  elevationShadow: '',

  shapeBorderRadiusTopLeftMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightMd: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  shapeBorderRadiusTopLeftSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightSm: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,

  shapeBorderRadiusTopLeftLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusTopRightLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomLeftLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
  shapeBorderRadiusBottomRightLg: compatibilityMode
    ? 0
    : theme.sys.shape.borderRadiusNone,
})
