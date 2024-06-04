'use client'

import * as React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { ClearButton } from '@v-uik/common'
import { PositiveInfinityIcon } from '../../assets/PositiveInfinityIcon'
import { NegativeInfinityIcon } from '../../assets/NegativeInfinityIcon'

const useStyles = createUseStyles({
  clearButton: {
    display: 'flex',
  },
})

export interface Props {
  isInfinity: boolean
  index: 0 | 1
  setSelectedRangeByIndex: (date: number | null, index: 0 | 1) => void
}

const getIcon = (index: 0 | 1): React.ReactNode => {
  if (index) {
    return <PositiveInfinityIcon />
  }

  return <NegativeInfinityIcon />
}

export const InputInfinityButton = (props: Props): JSX.Element => {
  const { isInfinity, index, setSelectedRangeByIndex } = props

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
    <ClearButton
      clearIcon={isInfinity ? undefined : getIcon(index)}
      classes={classesList}
      innerProps={{ onClick: handleClick }}
    />
  )
}

InputInfinityButton.displayName = 'InputInfinityButton'
