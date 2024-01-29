'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { BarItem, BarItemProps } from './BarItem'
import { BarContext } from './BarContext'
import { BarKinds, DarkColors, LightColors } from './constants'
import { BarButtonClasses as Classes } from './interfaces/classes'

const useStyles = createUseStyles((theme) => ({
  button: {
    borderTopLeftRadius: theme.comp.barButton.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.barButton.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.barButton.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.barButton.shapeBorderRadiusBottomRight,

    '&:focus': {
      outline: 'none',
    },

    '&:not($disabled)': {
      cursor: 'pointer',
    },
  },

  text: {
    fontFamily: theme.comp.barButton.typographyFontFamily,
    fontWeight: theme.comp.barButton.typographyFontWeight,
    fontSize: theme.comp.barButton.typographyFontSize,
    lineHeight: theme.comp.barButton.typographyLineHeight,
    letterSpacing: theme.comp.barButton.typographyLetterSpacing,
  },

  onlyIcon: {
    padding: 12,
  },

  vertical: {
    padding: [12, 16, 12, 20],
  },

  dark: {
    color: theme.comp.barButton.colorTextDark,

    '&$disabled': {
      color: theme.comp.barButton.colorTextDarkDisabled,
    },

    '&:not($disabled)': {
      '&:hover': {
        backgroundColor: theme.comp.barButton.colorBackgroundDarkHover,
      },

      '&:hover:active': {
        backgroundColor: theme.comp.barButton.colorBackgroundDarkActive,
      },

      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barButton.colorShadowDarkFocus}`,
      },
    },
  },

  light: {
    color: theme.comp.barButton.colorTextLight,

    '&$disabled': {
      color: theme.comp.barButton.colorTextLightDisabled,
    },

    '&:not($disabled)': {
      '&:hover': {
        backgroundColor: theme.comp.barButton.colorBackgroundLightHover,
      },

      '&:hover:active': {
        backgroundColor: theme.comp.barButton.colorBackgroundLightActive,
      },

      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barButton.colorShadowLightFocus}`,
      },
    },
  },

  primary: {
    color: theme.comp.barButton.colorTextPrimary,

    '&$disabled': {
      color: theme.comp.barButton.colorTextPrimaryDisabled,
    },

    '&:not($disabled)': {
      '&:hover': {
        backgroundColor: theme.comp.barButton.colorBackgroundPrimaryHover,
      },

      '&:hover:active': {
        backgroundColor: theme.comp.barButton.colorBackgroundPrimaryActive,
      },

      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barButton.colorShadowPrimaryFocus}`,
      },
    },
  },

  disabled: {},
}))

export interface BarButtonProps extends BarItemProps {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
  /**
   * Отключить элемент
   */
  disabled?: boolean
}

export const BarButton = React.forwardRef(
  (
    {
      classes: classesProp,
      disabled,
      role = 'button',
      tabIndex = 0,
      onClick,
      children,
      ...rest
    }: BarButtonProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const barContext = React.useContext(BarContext)

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classesProp)

    const classes: Classes = {
      ...classesProp,
      root: clsx(classesMap?.root, classesMap.button, {
        [classesMap.disabled]: disabled,
        [classesMap.onlyIcon]: !children,
        [classesMap.dark]: DarkColors.includes(barContext.kind),
        [classesMap.light]: LightColors.includes(barContext.kind),
        [classesMap.primary]: barContext.kind === BarKinds.primary,
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
      >
        {children}
      </BarItem>
    )
  }
)
