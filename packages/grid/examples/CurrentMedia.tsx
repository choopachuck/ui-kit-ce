import * as React from 'react'
import { Tag, useMediaQuery } from '@v-uik/base'

export const CurrentMedia = (): JSX.Element => {
  const screen = useMediaQuery()

  return (
    <div>
      Current screen size — <Tag>{screen}</Tag>
    </div>
  )
}
