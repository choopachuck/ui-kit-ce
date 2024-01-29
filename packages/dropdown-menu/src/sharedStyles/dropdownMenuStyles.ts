import { Theme } from '@v-uik/theme'
import { Styles } from 'react-jss'

export const dropdownMenuStyles = (theme: Theme): Styles => ({
  list: {
    backgroundColor: theme.comp.dropdownMenu.colorBackground,
    borderColor: theme.comp.dropdownMenu.colorBorder,
    borderWidth: theme.shape.borderWidth,
    borderStyle: theme.shape.borderStyle,
    borderTopLeftRadius: theme.comp.dropdownMenu.shapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.dropdownMenu.shapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.dropdownMenu.shapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.dropdownMenu.shapeBorderRadiusBottomRightMd,
    boxShadow: theme.comp.dropdownMenu.elevationShadow,

    '&$small': {
      borderTopLeftRadius: theme.comp.dropdownMenu.shapeBorderRadiusTopLeftSm,
      borderTopRightRadius: theme.comp.dropdownMenu.shapeBorderRadiusTopRightSm,
      borderBottomLeftRadius:
        theme.comp.dropdownMenu.shapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.dropdownMenu.shapeBorderRadiusBottomRightSm,
    },

    '&$large': {
      borderTopLeftRadius: theme.comp.dropdownMenu.shapeBorderRadiusTopLeftLg,
      borderTopRightRadius: theme.comp.dropdownMenu.shapeBorderRadiusTopRightLg,
      borderBottomLeftRadius:
        theme.comp.dropdownMenu.shapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.dropdownMenu.shapeBorderRadiusBottomRightLg,
    },
  },

  small: {},
  large: {},
})
