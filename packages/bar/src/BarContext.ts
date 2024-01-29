'use client'

import * as React from 'react'
import { BarProps, SubBarProps } from './interfaces'
import { BarKinds } from './constants'

export type BarContextValue = Partial<
  Pick<BarProps, 'direction' | 'expanded'>
> & {
  kind: Exclude<BarProps['kind'] | SubBarProps['kind'], undefined>
}

export const BarContext = React.createContext<BarContextValue>({
  kind: BarKinds.dark,
})
