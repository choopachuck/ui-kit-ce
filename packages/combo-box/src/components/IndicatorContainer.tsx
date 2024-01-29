'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { CommonProps } from '../interfaces'

const useStyles = createUseStyles({
  indicatorContainer: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexShrink: 0,
    zIndex: 2,
  },
})

type Classes = Partial<Record<'indicatorContainer', string>>

export type IndicatorContainerProps<Option> = {
  children: React.ReactNode
  classes?: Classes
  isDisabled?: boolean
} & CommonProps<Option>

export const IndicatorContainer = React.forwardRef(
  <Option,>(
    { children, classes, isDisabled }: IndicatorContainerProps<Option>,
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
        className={clsx(classesMap.indicatorContainer)}
        aria-disabled={isDisabled}
      >
        {children}
      </div>
    )
  }
)
