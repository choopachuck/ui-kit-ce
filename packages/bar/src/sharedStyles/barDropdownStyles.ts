import { Theme } from '@v-uik/theme'
import { Styles } from 'react-jss'

export const barDropdownStyles = (theme: Theme): Styles => ({
  menuItem: {
    padding: [12, 10, 12, 16],
  },

  vertical: {
    padding: [8, 16, 8, 20],

    '& $arrow': {
      marginLeft: 'auto',
    },
  },

  text: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },

  arrow: {
    marginLeft: 8,
  },

  dark: {
    '& $list': {
      backgroundColor: theme.comp.barDropdown.listColorBackgroundDark,
      border: `1px solid ${theme.comp.barDropdown.listColorBorderDark}`,
    },
  },

  light: {
    '& $list': {
      backgroundColor: theme.comp.barDropdown.listColorBackgroundLight,
      border: `1px solid ${theme.comp.barDropdown.listColorBorderLight}`,
    },
  },

  primary: {
    '& $list': {
      backgroundColor: theme.comp.barDropdown.listColorBackgroundPrimary,
      border: `1px solid ${theme.comp.barDropdown.listColorBorderPrimary}`,
    },
  },

  list: {
    borderTopLeftRadius: theme.comp.barDropdown.listShapeBorderRadiusTopLeftMd,
    borderTopRightRadius:
      theme.comp.barDropdown.listShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.barDropdown.listShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.barDropdown.listShapeBorderRadiusBottomRightMd,

    '&$small': {
      borderTopLeftRadius:
        theme.comp.barDropdown.listShapeBorderRadiusTopLeftSm,
      borderTopRightRadius:
        theme.comp.barDropdown.listShapeBorderRadiusTopRightSm,
      borderBottomLeftRadius:
        theme.comp.barDropdown.listShapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.barDropdown.listShapeBorderRadiusBottomRightSm,
    },

    '&$large': {
      borderTopLeftRadius:
        theme.comp.barDropdown.listShapeBorderRadiusTopLeftLg,
      borderTopRightRadius:
        theme.comp.barDropdown.listShapeBorderRadiusTopRightLg,
      borderBottomLeftRadius:
        theme.comp.barDropdown.listShapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.barDropdown.listShapeBorderRadiusBottomRightLg,
    },
  },

  small: {},
  large: {},
})
