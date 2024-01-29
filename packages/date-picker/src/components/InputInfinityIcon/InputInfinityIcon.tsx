'use client'

import * as React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { ClearIcon } from '../../assets/ClearIcon'
import { PositiveInfinityIcon } from '../../assets/PositiveInfinityIcon'
import { NegativeInfinityIcon } from '../../assets/NegativeInfinityIcon'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    cursor: 'pointer',
  },
})

export interface Props extends React.ComponentPropsWithoutRef<'div'> {
  isInfinity: boolean
  index: 0 | 1
  setSelectedRangeByIndex: (date: number | null, index: 0 | 1) => void
}

const getIcon = (isInfinity: boolean, index: 0 | 1): JSX.Element => {
  if (isInfinity) {
    return <ClearIcon />
  }

  if (index) {
    return <PositiveInfinityIcon />
  }

  return <NegativeInfinityIcon />
}

export const InputInfinityIcon = (props: Props): JSX.Element => {
  const { isInfinity, index, setSelectedRangeByIndex, ...rest } = props

  const classesList = useStyles()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    if (isInfinity) {
      setSelectedRangeByIndex(null, index)
    } else {
      setSelectedRangeByIndex(index ? Infinity : -Infinity, index)
    }
  }

  return (
    <div {...rest} className={classesList.root} onClick={handleClick}>
      {getIcon(isInfinity, index)}
    </div>
  )
}

InputInfinityIcon.displayName = 'InputInfinityIcon'
