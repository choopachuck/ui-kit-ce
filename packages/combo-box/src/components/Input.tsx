'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { CommonProps } from '../interfaces'

const spacingStyle = {
  gridArea: '1 / 2',
  font: 'inherit',
  minWidth: '2px',
  border: 0,
  margin: 0,
  outline: 0,
  padding: 0,
} as const

const useStyles = createUseStyles({
  inputContainer: {
    visibility: 'visible',

    '&$isDisabled': {
      visibility: 'hidden',
    },
    flex: '1 1 0',
    display: 'inline-grid',
    gridArea: '1 / 1 / 2 / 3',
    gridTemplateColumns: '0 auto',
    minWidth: 64,

    '&::after': {
      content: 'attr(data-value) " "',
      visibility: 'hidden',
      whiteSpace: 'pre',
      ...spacingStyle,
    },
  },

  input: {
    color: 'inherit',
    background: 0,
    ...spacingStyle,
  },

  isDisabled: {},
})

type Classes = Partial<Record<'inputContainer' | 'input', string>>

export type InputProps<Option> = {
  classes?: Classes
  innerProps: React.InputHTMLAttributes<HTMLInputElement>
  isDisabled?: boolean
} & CommonProps<Option>

export const Input = React.forwardRef(
  <Option,>(
    { isDisabled, classes, innerProps }: InputProps<Option>,
    ref: React.Ref<HTMLInputElement>
  ): JSX.Element => {
    const classesList = useStyles()

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    return (
      <div
        className={clsx(classesMap.inputContainer, {
          [classesMap.isDisabled]: isDisabled,
        })}
        tabIndex={-1}
      >
        <input
          ref={ref}
          disabled={isDisabled}
          className={clsx(classesMap.input)}
          {...innerProps}
        />
      </div>
    )
  }
)
