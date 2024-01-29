import { Theme } from '@v-uik/theme'
import { JssStyle } from 'jss'

export const primary = (theme: Theme): JssStyle => ({
  '&$contained': {
    color: theme.comp.button.colorTextContainedPrimary,
    backgroundColor: theme.comp.button.colorBackgroundContainedPrimary,

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,

      '&::after': {
        borderWidth: theme.shape.borderWidth,
        borderColor: theme.comp.button.colorBorderFocus,
      },
    },

    '&:hover': {
      backgroundColor: theme.comp.button.colorBackgroundContainedPrimaryHover,
    },

    '&:active': {
      backgroundColor: theme.comp.button.colorBackgroundContainedPrimaryActive,
    },

    '&:disabled': {
      color: theme.comp.button.colorTextContainedPrimaryDisabled,
      backgroundColor:
        theme.comp.button.colorBackgroundContainedPrimaryDisabled,
    },
  },

  '&$outlined': {
    color: theme.comp.button.colorTextOutlinedPrimary,

    '&::after': {
      borderWidth: theme.shape.borderWidth,
      borderColor: theme.comp.button.colorBorderOutlinedPrimary,
    },

    '&:focus-visible': {
      color: theme.comp.button.colorTextOutlinedPrimaryFocus,
      backgroundColor: theme.comp.button.colorBackgroundOutlinedPrimaryFocus,
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,

      '&::after': {
        borderWidth: theme.shape.borderWidth,
        borderColor: theme.comp.button.colorBorderFocus,
      },
    },

    '&:hover': {
      color: theme.comp.button.colorTextOutlinedPrimaryHover,
      backgroundColor: theme.comp.button.colorBackgroundOutlinedPrimaryHover,

      '&::after': {
        borderWidth: 0,
      },
    },

    '&:active': {
      color: theme.comp.button.colorTextOutlinedPrimaryActive,
      backgroundColor: theme.comp.button.colorBackgroundOutlinedPrimaryActive,

      '&::after': {
        borderWidth: 0,
      },
    },

    '&:disabled': {
      color: theme.comp.button.colorTextOutlinedPrimaryDisabled,

      '&::after': {
        borderColor: theme.comp.button.colorBorderOutlinedPrimaryDisabled,
      },
    },
  },

  '&$ghost': {
    color: theme.comp.button.colorTextGhostPrimary,

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,
    },

    '&:hover': {
      color: theme.comp.button.colorTextGhostPrimaryHover,
      backgroundColor: theme.comp.button.colorBackgroundGhostPrimaryHover,
    },

    '&:active': {
      color: theme.comp.button.colorTextGhostPrimaryActive,
      backgroundColor: theme.comp.button.colorBackgroundGhostPrimaryActive,
    },

    '&:disabled': {
      color: theme.comp.button.colorTextGhostPrimaryDisabled,
    },
  },
})
