import { Theme } from '@v-uik/theme'
import { JssStyle } from 'jss'

export const secondary = (theme: Theme): JssStyle => ({
  '&$contained': {
    color: theme.comp.button.colorTextContainedSecondary,
    backgroundColor: theme.comp.button.colorBackgroundContainedSecondary,

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,

      '&::after': {
        borderWidth: theme.shape.borderWidth,
        borderColor: theme.comp.button.colorBorderFocus,
      },
    },

    '&:hover': {
      backgroundColor: theme.comp.button.colorBackgroundContainedSecondaryHover,
    },

    '&:active': {
      backgroundColor:
        theme.comp.button.colorBackgroundContainedSecondaryActive,
    },

    '&:disabled': {
      color: theme.comp.button.colorTextContainedSecondaryDisabled,
      backgroundColor:
        theme.comp.button.colorBackgroundContainedSecondaryDisabled,
    },
  },

  '&$outlined': {
    color: theme.comp.button.colorTextOutlinedSecondary,

    '&::after': {
      borderWidth: theme.shape.borderWidth,
      borderColor: theme.comp.button.colorBorderOutlinedSecondary,
    },

    '&:focus-visible': {
      color: theme.comp.button.colorTextOutlinedSecondaryFocus,
      backgroundColor: theme.comp.button.colorBackgroundOutlinedSecondaryFocus,
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,

      '&::after': {
        borderWidth: theme.shape.borderWidth,
        borderColor: theme.comp.button.colorBorderFocus,
      },
    },

    '&:hover': {
      color: theme.comp.button.colorTextOutlinedSecondaryHover,
      backgroundColor: theme.comp.button.colorBackgroundOutlinedSecondaryHover,

      '&::after': {
        borderWidth: 0,
      },
    },

    '&:active': {
      color: theme.comp.button.colorTextOutlinedSecondaryActive,
      backgroundColor: theme.comp.button.colorBackgroundOutlinedSecondaryActive,

      '&::after': {
        borderWidth: 0,
      },
    },

    '&:disabled': {
      color: theme.comp.button.colorTextOutlinedSecondaryDisabled,

      '&::after': {
        borderColor: theme.comp.button.colorBorderOutlinedSecondaryDisabled,
      },
    },
  },

  '&$ghost': {
    color: theme.comp.button.colorTextGhostSecondary,

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.button.colorShadowFocus}`,
    },

    '&:hover': {
      color: theme.comp.button.colorTextGhostSecondaryHover,
      backgroundColor: theme.comp.button.colorBackgroundGhostSecondaryHover,
    },

    '&:active': {
      color: theme.comp.button.colorTextGhostSecondaryActive,
      backgroundColor: theme.comp.button.colorBackgroundGhostSecondaryActive,
    },

    '&:disabled': {
      color: theme.comp.button.colorTextGhostSecondaryDisabled,
    },
  },
})
