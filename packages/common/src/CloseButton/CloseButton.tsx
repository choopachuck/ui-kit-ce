'use client'

/* eslint-disable react/prop-types  */ // TODO: Багует eslint при использовании нативных props из элементов React

import React, { FC } from 'react'
import { useButtonReset } from '@v-uik/hooks'
import { createUseStyles } from 'react-jss'
import { clsx, useTheme, Theme } from '@v-uik/theme'
import { IconClose } from './IconClose'
import { overrideTokens } from '@v-uik/utils'

type CloseButtonTokens = Omit<
  Theme['comp']['closeButton'],
  'backwardCompatibilityMode'
>

const useStyles = createUseStyles((comp: CloseButtonTokens) => ({
  closeButton: {
    flex: '0 0 40px',
    minWidth: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: comp.shapeBorderRadiusTopLeft,
    borderTopRightRadius: comp.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: comp.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: comp.shapeBorderRadiusBottomRight,
    color: comp.colorText,
    cursor: 'pointer',
    backgroundColor: comp.colorBackground,

    '&:hover': {
      color: comp.colorTextHover,
      backgroundColor: comp.colorBackgroundHover,
    },

    '&:active': {
      color: comp.colorTextActive,
      backgroundColor: comp.colorBackgroundActive,
    },

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${comp.colorShadowFocus}`,
    },
  },
  disabled: {
    color: comp.colorTextDisabled,
    backgroundColor: comp.colorBackgroundDisabled,
  },
}))

export type CloseButtonProps = {
  tokens?: CloseButtonTokens
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const CloseButton: FC<CloseButtonProps> = ({
  tokens,
  className,
  children,
  disabled,
  ...props
}) => {
  const defaultComp: CloseButtonTokens = useTheme().comp.closeButton
  const comp = overrideTokens(defaultComp, tokens ?? {})
  const classes = useStyles({ theme: comp })
  const buttonClasses = useButtonReset()

  return (
    <button
      type="button"
      className={clsx(
        buttonClasses.resetButton,
        classes.closeButton,
        className,
        { [classes.disabled]: disabled }
      )}
      {...props}
    >
      {children || <IconClose />}
    </button>
  )
}
