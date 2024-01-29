'use client'

import React from 'react'
import { useButtonReset } from '@v-uik/button'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { FileItemIconButtonClasses } from './classes'
import { ElementSizeType } from '@v-uik/common'

const useStyles = createUseStyles((theme) => ({
  root: {
    position: 'relative',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',

    border: 'none',
    cursor: 'pointer',
    color: theme.comp.fileItem.buttonColorIcon,

    background: theme.comp.fileItem.buttonColorBackground,

    '&:hover': {
      background: theme.comp.fileItem.buttonColorBackgroundHover,
    },

    '&:active': {
      background: theme.comp.fileItem.buttonColorBackgroundActive,
    },

    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      boxShadow: `inset 0 0 0 2px ${theme.comp.fileItem.buttonShadowFocus}`,
    },
    '&$sm': {
      padding: 8,
      marginTop: -8,
      marginBottom: -8,
    },
    '&$md': {
      padding: 8,
      marginTop: -8,
      marginBottom: -8,
    },
    '&$lg': {
      padding: 12,
      marginTop: -12,
      marginBottom: -12,
    },
  },
  sm: {},
  md: {},
  lg: {},
}))

export interface FileItemIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: ElementSizeType
  children: React.ReactNode
  classes?: FileItemIconButtonClasses
  className?: string
}

export const FileItemIconButton: React.FC<FileItemIconButtonProps> = ({
  size,
  classes,
  children,
  className: classNameProps,
  ...props
}) => {
  const buttonClassName = useButtonReset()
  const classesList = useStyles()

  const classesMap = useClassList(classesList, classes)
  const className = clsx(
    buttonClassName,
    classesMap.root,
    classesMap[size],
    classNameProps
  )

  return (
    <button className={className} {...props} type="button">
      {children}
    </button>
  )
}
