'use client'

import * as React from 'react'
import { TreeBaseComponentProps } from '../../types'
import { TreeItem } from '../../hooks'
import { CircularProgress } from '@v-uik/progress'

export type TreeNodeLoadingIndicatorProps<TItem extends unknown = TreeItem> =
  TreeBaseComponentProps<TItem>

export const TreeNodeLoadingIndicator = <
  TItem extends unknown = TreeItem
  // eslint-disable-next-line no-empty-pattern
>({}: TreeNodeLoadingIndicatorProps<TItem>) => {
  return <CircularProgress size="sm" />
}
