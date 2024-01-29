'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { CommonProps } from '../interfaces'

const useStyles = createUseStyles((theme) => ({
  placeholder: {
    gridArea: '1 / 1 / 2 / 3',
    color: theme.comp.comboBox.placeholderColorText,
  },

  disabled: {
    color: theme.comp.comboBox.inputColorTextDisabled,
  },
}))

type Classes = Partial<Record<'placeholder' | 'disabled', string>>

export type PlaceholderProps<Option> = {
  children: React.ReactNode
  classes?: Classes
  isDisabled?: boolean
} & CommonProps<Option>

export const Placeholder = React.forwardRef(
  <Option,>(
    { children, classes, isDisabled }: PlaceholderProps<Option>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    const className = clsx(classesMap.placeholder, {
      [classesMap.disabled]: isDisabled,
    })

    return (
      <div ref={ref} className={className} aria-disabled={isDisabled}>
        {children}
      </div>
    )
  }
)
