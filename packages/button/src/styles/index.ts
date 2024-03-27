import { Theme } from '@v-uik/theme'
import { Styles } from 'react-jss'

import { primary } from './colors/primary'
import { error } from './colors/error'
import { secondary } from './colors/secondary'

export const getStyles = (theme: Theme): Styles => ({
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    textDecoration: 'none',
    minWidth: 64,
    padding: [8, 16],
    borderTopLeftRadius: theme.comp.button.shapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.button.shapeBorderRadiusTopRightMd,
    borderBottomLeftRadius: theme.comp.button.shapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius: theme.comp.button.shapeBorderRadiusBottomRightMd,

    '&:disabled': {
      pointerEvents: 'none',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderStyle: theme.shape.borderStyle,
      borderWidth: 0,
    },
  },

  text: {
    '&$textTypography': {
      fontFamily: theme.comp.button.typographyFontFamily,
      fontWeight: theme.comp.button.typographyFontWeight,
      letterSpacing: theme.comp.button.typographyLetterSpacing,
    },

    width: '100%',
    minHeight: 24,
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    zIndex: 2,
  },

  textSm: {
    fontSize:
      theme.comp.button.typographyFontSize ||
      theme.comp.button.typographyFontSizeSm,
    lineHeight:
      theme.comp.button.typographyLineHeight ||
      theme.comp.button.typographyLineHeightSm,
  },

  textMd: {
    fontSize:
      theme.comp.button.typographyFontSize ||
      theme.comp.button.typographyFontSizeMd,
    lineHeight:
      theme.comp.button.typographyLineHeight ||
      theme.comp.button.typographyLineHeightMd,
  },

  textLg: {
    fontSize:
      theme.comp.button.typographyFontSize ||
      theme.comp.button.typographyFontSizeLg,
    lineHeight:
      theme.comp.button.typographyLineHeight ||
      theme.comp.button.typographyLineHeightLg,
  },

  textTypography: {},

  // Color type styles
  // TODO на подумать — стили для определения цвета отличаются только именем токенов,
  // возможно можно сделать общую функцию и добавить динамическую поддержку цветов
  primary: primary(theme),
  error: error(theme),
  secondary: secondary(theme),

  // Button type styles (order after color styles is important for $disabled styles priority)
  contained: {},
  outlined: {},
  ghost: {},

  fullWidth: {
    width: '100%',
  },

  small: {
    paddingTop: 4,
    paddingBottom: 4,
    borderTopLeftRadius: theme.comp.button.shapeBorderRadiusTopLeftSm,
    borderTopRightRadius: theme.comp.button.shapeBorderRadiusTopRightSm,
    borderBottomLeftRadius: theme.comp.button.shapeBorderRadiusBottomLeftSm,
    borderBottomRightRadius: theme.comp.button.shapeBorderRadiusBottomRightSm,
  },

  medium: {},

  large: {
    paddingTop: 12,
    paddingBottom: 12,
    borderTopLeftRadius: theme.comp.button.shapeBorderRadiusTopLeftLg,
    borderTopRightRadius: theme.comp.button.shapeBorderRadiusTopRightLg,
    borderBottomLeftRadius: theme.comp.button.shapeBorderRadiusBottomLeftLg,
    borderBottomRightRadius: theme.comp.button.shapeBorderRadiusBottomRightLg,
  },
})
