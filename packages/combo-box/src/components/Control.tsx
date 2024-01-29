'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { ElementSize, ElementSizeType } from '@v-uik/common'
import { useClassList, useMergedRefs } from '@v-uik/hooks'
import { CommonProps } from '../interfaces'

const useStyles = createUseStyles((theme) => ({
  rootControl: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    position: 'relative',

    maxWidth: '100%',
    padding: [8, 16],
    outline: 0,

    fontFamily: theme.comp.comboBox.inputTypographyFontFamily,
    fontSize: theme.comp.comboBox.inputTypographyFontSize,
    lineHeight: theme.comp.comboBox.inputTypographyLineHeight,
    letterSpacing: theme.comp.comboBox.inputTypographyLetterSpacing,
    fontWeight: theme.comp.comboBox.inputTypographyFontWeight,

    color: theme.comp.comboBox.inputColorText,
    backgroundColor: theme.comp.comboBox.inputColorBackground,
    borderTopLeftRadius: theme.comp.comboBox.inputShapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.comboBox.inputShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.comboBox.inputShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.comboBox.inputShapeBorderRadiusBottomRightMd,

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderColor: theme.comp.comboBox.inputColorBorder,
      borderStyle: theme.shape.borderStyle,
      borderWidth: theme.shape.borderWidth,
    },

    '&:hover': {
      backgroundColor: theme.comp.comboBox.inputColorBackgroundHover,
      '&$isSearchable': {
        backgroundColor:
          theme.comp.comboBox.inputColorBackgroundSearchableHover,
      },

      '&::after': {
        borderColor: theme.comp.comboBox.inputColorBorderHover,
      },
    },

    '&$small': {
      paddingTop: 4,
      paddingBottom: 4,
      borderTopLeftRadius: theme.comp.comboBox.inputShapeBorderRadiusTopLeftSm,
      borderTopRightRadius:
        theme.comp.comboBox.inputShapeBorderRadiusTopRightSm,
      borderBottomLeftRadius:
        theme.comp.comboBox.inputShapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.comboBox.inputShapeBorderRadiusBottomRightSm,
    },

    '&$large': {
      paddingTop: 12,
      paddingBottom: 12,
      borderTopLeftRadius: theme.comp.comboBox.inputShapeBorderRadiusTopLeftLg,
      borderTopRightRadius:
        theme.comp.comboBox.inputShapeBorderRadiusTopRightLg,
      borderBottomLeftRadius:
        theme.comp.comboBox.inputShapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.comboBox.inputShapeBorderRadiusBottomRightLg,
    },

    '&$focused': {
      boxShadow: `0 0 0 2px ${theme.comp.comboBox.inputColorShadowFocus}`,

      '&::after': {
        borderWidth: 0,
      },
    },

    '&$disabled': {
      cursor: 'default',
      pointerEvents: 'none',
      color: theme.comp.comboBox.inputColorTextDisabled,
      backgroundColor: theme.comp.comboBox.inputColorBackgroundDisabled,

      '&::after': {
        borderColor: theme.comp.comboBox.inputColorBorderDisabled,
      },

      '& $focused': {
        boxShadow: 'none',

        '&::after': {
          borderWidth: theme.shape.borderWidth,
        },
      },
    },

    '&$error': {
      '&::after': {
        borderColor: theme.comp.comboBox.inputColorBorderError,
      },
    },
  },

  focused: {},

  disabled: {},

  error: {},

  small: {},

  large: {},

  isSearchable: {},
}))

type Classes = Partial<
  Record<
    'rootControl' | 'disabled' | 'error' | 'small' | 'large' | 'focused',
    string
  >
>

export type ControlProps<Option> = {
  children: React.ReactNode
  classes?: Classes
  innerProps: JSX.IntrinsicElements['div']
  isDisabled?: boolean
  isFocused: boolean
  isSearchable?: boolean
  size: ElementSizeType
} & CommonProps<Option>

export const Control = React.forwardRef(
  <Option,>(
    {
      children,
      classes,
      error,
      innerProps,
      isDisabled,
      isFocused,
      isSearchable,
      size,
    }: ControlProps<Option>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null)

    const mergedRootRefs = useMergedRefs([rootRef, ref])

    const classesList = useStyles()

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    const className = clsx(classesMap.rootControl, innerProps.className, {
      [classesMap.small]: size === ElementSize.sm,
      [classesMap.large]: size === ElementSize.lg,
      [classesMap.disabled]: isDisabled,
      [classesMap.error]: !isFocused && error,
      [classesMap.focused]: !isDisabled && isFocused,
      [classesMap.isSearchable]: isSearchable,
    })

    return (
      <div ref={mergedRootRefs} className={className} {...innerProps}>
        {children}
      </div>
    )
  }
)
