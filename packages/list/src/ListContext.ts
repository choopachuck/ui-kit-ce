'use client'

import * as React from 'react'
import { ListOwnProps } from './List'

export type ListContextValue = Pick<
  ListOwnProps,
  'size' | 'interactive' | 'stripe'
> & {
  selectedItemRef?: React.RefObject<HTMLElement>
}

export const ListContext: React.Context<ListContextValue> = React.createContext(
  {}
)
