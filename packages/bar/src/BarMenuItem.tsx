'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { BarKinds, DarkColors, LightColors } from './constants'
import { BarItem, BarItemProps } from './BarItem'
import { BarContext } from './BarContext'

const useStyles = createUseStyles((theme) => ({
  menuItem: {
    borderTopLeftRadius: theme.comp.barMenuItem.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.barMenuItem.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.barMenuItem.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.barMenuItem.shapeBorderRadiusBottomRight,

    '&:focus': {
      outline: 'none',
    },

    '&:not($disabled)': {
      cursor: 'pointer',
    },
  },

  text: {
    fontFamily: theme.comp.barMenuItem.typographyFontFamily,
    fontWeight: theme.comp.barMenuItem.typographyFontWeight,
    fontSize: theme.comp.barMenuItem.typographyFontSize,
    lineHeight: theme.comp.barMenuItem.typographyLineHeight,
    letterSpacing: theme.comp.barMenuItem.typographyLetterSpacing,
  },

  vertical: {
    padding: [8, 16, 8, 20],
  },

  dark: {
    color: theme.comp.barMenuItem.colorTextDark,

    '&$disabled': {
      color: theme.comp.barMenuItem.colorTextDarkDisabled,
    },

    '&:not($disabled)': {
      '&:hover': {
        backgroundColor: theme.comp.barMenuItem.colorBackgroundDarkHover,
      },

      '&:hover:active': {
        backgroundColor: theme.comp.barMenuItem.colorBackgroundDarkActive,
      },

      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barMenuItem.colorShadowDarkFocus}`,
      },
    },

    '&$selected': {
      backgroundColor: theme.comp.barMenuItem.colorBackgroundDarkSelected,
      color: theme.comp.barMenuItem.colorTextDarkSelected,

      '&::before': {
        backgroundColor: theme.comp.barMenuItem.indicatorColorBackgroundDark,
      },
    },
  },

  light: {
    color: theme.comp.barMenuItem.colorTextLight,

    '&$disabled': {
      color: theme.comp.barMenuItem.colorTextLightDisabled,
    },

    '&:not($disabled)': {
      '&:hover': {
        backgroundColor: theme.comp.barMenuItem.colorBackgroundLightHover,
      },

      '&:hover:active': {
        backgroundColor: theme.comp.barMenuItem.colorBackgroundLightActive,
      },

      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barMenuItem.colorShadowLightFocus}`,
      },
    },

    '&$selected': {
      backgroundColor: theme.comp.barMenuItem.colorBackgroundLightSelected,
      color: theme.comp.barMenuItem.colorTextLightSelected,

      '&::before': {
        backgroundColor: theme.comp.barMenuItem.indicatorColorBackgroundLight,
      },
    },
  },

  primary: {
    color: theme.comp.barMenuItem.colorTextPrimary,

    '&$disabled': {
      color: theme.comp.barMenuItem.colorTextPrimaryDisabled,
    },

    '&:not($disabled)': {
      '&:hover': {
        backgroundColor: theme.comp.barMenuItem.colorBackgroundPrimaryHover,
      },

      '&:hover:active': {
        backgroundColor: theme.comp.barMenuItem.colorBackgroundPrimaryActive,
      },

      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barMenuItem.colorShadowPrimaryFocus}`,
      },
    },

    '&$selected': {
      backgroundColor: theme.comp.barMenuItem.colorBackgroundPrimarySelected,
      color: theme.comp.barMenuItem.colorTextPrimarySelected,

      '&::before': {
        backgroundColor: theme.comp.barMenuItem.indicatorColorBackgroundPrimary,
      },
    },
  },

  selected: {
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 'auto',
      left: 0,
      right: 0,
      bottom: 0,
      height: 2,
    },

    '&$vertical': {
      '&::before': {
        top: 0,
        right: 'auto',
        width: 2,
        height: 'auto',
      },
    },
  },

  disabled: {},
}))

type InternalClasses = Partial<
  Record<
    'menuItem' | 'selected' | 'disabled' | 'dark' | 'light' | 'primary',
    string
  >
>

type Classes = BarItemProps['classes'] & InternalClasses

export interface BarMenuItemProps extends BarItemProps {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
  /**
   * Применить стили для выбранного элемента
   */
  selected?: boolean
  /**
   * Отключить элемент
   */
  disabled?: boolean
}

export const BarMenuItem = React.forwardRef(
  (
    {
      classes: classesProp,
      selected,
      disabled,
      role = 'button',
      tabIndex = 0,
      onClick,
      ...rest
    }: BarMenuItemProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const barContext = React.useContext(BarContext)

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classesProp)

    const classes: Classes = {
      ...classesMap,
      root: clsx(classesMap?.root, classesMap.menuItem, {
        [classesMap.disabled ?? '']: disabled,
        [classesMap.selected ?? '']: selected && !disabled,
        [classesMap.dark ?? '']: DarkColors.includes(barContext.kind),
        [classesMap.light ?? '']: LightColors.includes(barContext.kind),
        [classesMap.primary ?? '']: barContext.kind === BarKinds.primary,
      }),
      vertical: classesMap.vertical,
      text: classesMap.text,
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick && !disabled) {
        onClick(event)
      }
    }

    return (
      <BarItem
        {...rest}
        ref={ref}
        classes={classes}
        role={role}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={handleClick}
      />
    )
  }
)
