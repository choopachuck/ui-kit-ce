'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { CommonProps } from '../interfaces'

const useStyles = createUseStyles({
  valueContainer: {
    boxSizing: 'border-box',
    minHeight: 24,
    alignItems: 'center',
    display: 'grid',

    '&$displayFlex': {
      display: 'flex',
    },

    margin: '0px',
    '&$multitags': {
      margin: '-2px -8px -2px 0px',
    },

    flex: 1,
    flexWrap: 'wrap',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
  },
  displayFlex: {},
  multitags: {},
})

type Classes = Partial<Record<'valueContainer', string>>

export type ValueContainerProps<Option> = {
  children: React.ReactNode
  classes?: Classes
  isDisabled?: boolean
  isFocused: boolean
  withTags: boolean
  disableVisibleSelectedValue: boolean
} & CommonProps<Option>

export const ValueContainer = React.forwardRef(
  <Option,>(
    {
      children,
      classes,
      hasValue,
      isMulti,
      withTags,
      disableVisibleSelectedValue,
    }: ValueContainerProps<Option>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    const className = clsx(classesMap.valueContainer, {
      [classesList.displayFlex]:
        isMulti && hasValue && !disableVisibleSelectedValue,
      [classesList.multitags]: isMulti && hasValue && withTags,
    })

    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }
)
