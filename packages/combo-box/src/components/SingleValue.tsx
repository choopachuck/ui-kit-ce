'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { CommonProps } from '../interfaces'

const useStyles = createUseStyles({
  singleValue: {
    gridArea: '1 / 1 / 2 / 3',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  ellipsis: {
    marginRight: 5,
    maxWidth: '100%',
    '&$isSearchable': {
      maxWidth: '65%',
    },
  },

  isSearchable: {},
})

type Classes = Partial<Record<'singleValue', string>>

export type SingleValueProps<Option> = {
  children: React.ReactNode
  classes?: Classes
  isDisabled?: boolean
  isSearchable?: boolean
} & CommonProps<Option>

export const SingleValue = React.forwardRef(
  <Option,>(
    {
      children,
      classes,
      isDisabled,
      isMulti,
      isSearchable,
      withTags,
    }: SingleValueProps<Option>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    const className = clsx(classesMap.singleValue, {
      [classesMap.ellipsis]: !withTags && isMulti,
      [classesMap.isSearchable]: isSearchable,
    })

    return (
      <div ref={ref} className={className} aria-disabled={isDisabled}>
        {children}
      </div>
    )
  }
)
