import { Theme } from '../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createUnderlay = (theme: Theme, compatibilityMode?: boolean) => ({
  // shared
  shapeBorderRadiusTopLeft: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusTopRight: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusBottomLeft: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,
  shapeBorderRadiusBottomRight: compatibilityMode
    ? 8
    : theme.sys.shape.borderRadiusXl,

  // outlined
  colorBackgroundOutlined: 'transparent',
  colorBorderOutlinedError: compatibilityMode
    ? theme.colourway.error
    : theme.sys.color.errorAlpha,
  colorBorderOutlinedWarning: compatibilityMode
    ? theme.colourway.warning
    : theme.sys.color.warningAlpha,
  colorBorderOutlinedSuccess: compatibilityMode
    ? theme.colourway.success
    : theme.sys.color.successAlpha,
  colorBorderOutlinedInfo: compatibilityMode
    ? theme.colourway.info
    : theme.sys.color.infoAlpha,
  colorBorderOutlinedNeutral: compatibilityMode
    ? theme.colourway.mono05
    : theme.sys.color.neutralAlpha,

  // filled
  colorBackgroundFilledError: '#FDDFDD',
  colorBackgroundFilledWarning: '#FEF2C0',
  colorBackgroundFilledSuccess: '#DCFAE2',
  colorBackgroundFilledInfo: '#E8F5FE',
  colorBackgroundFilledNeutral: '#F3F3F3',

  colorBorderFilledError: 'transparent',
  colorBorderFilledWarning: 'transparent',
  colorBorderFilledSuccess: 'transparent',
  colorBorderFilledInfo: 'transparent',
  colorBorderFilledNeutral: 'transparent',
})
