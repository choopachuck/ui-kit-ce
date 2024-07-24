import { Theme } from '@v-uik/theme'
import { JssStyle } from 'jss'

export const error = (theme: Theme): JssStyle => ({
  '&$contained': {
    color: theme.comp.button.colorTextContainedError,
    backgroundColor: theme.comp.button.colorBackgroundContainedError,

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,

      '&::after': {
        borderWidth: theme.shape.borderWidth,
        borderColor: theme.comp.button.colorBorderFocus,
      },
    },

    '&:hover': {
      backgroundColor: theme.comp.button.colorBackgroundContainedErrorHover,
    },

    '&:active': {
      backgroundColor: theme.comp.button.colorBackgroundContainedErrorActive,
    },

    '&$disabled': {
      color: theme.comp.button.colorTextContainedErrorDisabled,
      backgroundColor: theme.comp.button.colorBackgroundContainedErrorDisabled,
    },
  },

  '&$outlined': {
    color: theme.comp.button.colorTextOutlinedError,

    '&::after': {
      borderWidth: theme.shape.borderWidth,
      borderColor: theme.comp.button.colorBorderOutlinedError,
    },

    '&:focus-visible': {
      color: theme.comp.button.colorTextOutlinedErrorFocus,
      backgroundColor: theme.comp.button.colorBackgroundOutlinedErrorFocus,
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,

      '&::after': {
        borderWidth: theme.shape.borderWidth,
        borderColor: theme.comp.button.colorBorderFocus,
      },
    },

    '&:hover': {
      color: theme.comp.button.colorTextOutlinedErrorHover,
      backgroundColor: theme.comp.button.colorBackgroundOutlinedErrorHover,

      '&::after': {
        borderWidth: 0,
      },
    },

    '&:active': {
      color: theme.comp.button.colorTextOutlinedErrorActive,
      backgroundColor: theme.comp.button.colorBackgroundOutlinedErrorActive,

      '&::after': {
        borderWidth: 0,
      },
    },

    '&$disabled': {
      color: theme.comp.button.colorTextOutlinedErrorDisabled,

      '&::after': {
        borderColor: theme.comp.button.colorBorderOutlinedErrorDisabled,
      },
    },
  },

  '&$ghost': {
    color: theme.comp.button.colorTextGhostError,

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,
    },

    '&:hover': {
      color: theme.comp.button.colorTextGhostErrorHover,
      backgroundColor: theme.comp.button.colorBackgroundGhostErrorHover,
    },

    '&:active': {
      color: theme.comp.button.colorTextGhostErrorActive,
      backgroundColor: theme.comp.button.colorBackgroundGhostErrorActive,
    },

    '&$disabled': {
      color: theme.comp.button.colorTextGhostErrorDisabled,
    },
  },
})
