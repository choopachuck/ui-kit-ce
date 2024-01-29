'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { CommonProps } from '../interfaces'

const useStyles = createUseStyles({
  root: {
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
})

type Classes = Partial<Record<'root', string>>

export type SelectContainerProps<Option> = {
  children: React.ReactNode
  classes: Classes
  innerProps: JSX.IntrinsicElements['div']
  isDisabled?: boolean
  isFocused: boolean
} & CommonProps<Option>

export const SelectContainer = React.forwardRef(
  <Option,>(
    {
      children,
      classes,
      innerProps,
      isDisabled,
      opened,
    }: SelectContainerProps<Option>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    return (
      <div
        ref={ref}
        aria-expanded={opened}
        aria-haspopup="listbox"
        aria-disabled={isDisabled}
        {...innerProps}
        className={clsx(classesMap.root, innerProps?.className)}
      >
        {children}
      </div>
    )
  }
)
