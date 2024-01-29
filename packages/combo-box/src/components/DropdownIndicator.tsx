'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { ElementSizeType, ElementSize } from '@v-uik/common'
import { CommonProps } from '../interfaces'
import { ComboBoxIcon } from '../assets/ComboBoxIcon'

const useStyles = createUseStyles({
  dropdownIndicator: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },

  arrowIcon: {
    marginLeft: 8,
  },

  opened: {
    transform: 'rotate(180deg)',
  },

  disabled: {
    cursor: 'default',
    pointerEvents: 'none',
  },

  small: {
    width: 16,
    height: 16,
  },
})

type Classes = Partial<
  Record<
    'dropdownIndicator' | 'arrowIcon' | 'opened' | 'disabled' | 'small',
    string
  >
>

export type DropdownIndicatorProps<Option> = {
  children?: React.ReactNode
  classes?: Classes
  innerProps: JSX.IntrinsicElements['div']
  isDisabled?: boolean
  size: ElementSizeType
} & CommonProps<Option>

export const DropdownIndicator = React.forwardRef(
  <Option,>(
    {
      children,
      classes,
      innerProps,
      isDisabled,
      opened,
      size,
    }: DropdownIndicatorProps<Option>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    const className = clsx(classesMap.arrowIcon, {
      [classesMap.opened]: opened,
      [classesMap.disabled]: isDisabled,
      [classesMap.small]: size === ElementSize.sm,
    })

    return (
      <div
        ref={ref}
        aria-disabled={isDisabled}
        aria-label="openPopupButton"
        role="button"
        className={classesMap.dropdownIndicator}
        {...innerProps}
      >
        {children || <ComboBoxIcon className={className} />}
      </div>
    )
  }
)
