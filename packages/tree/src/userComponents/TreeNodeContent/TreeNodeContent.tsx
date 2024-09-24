'use client'

import * as React from 'react'
import { TreeItem } from '../../hooks'
import { TreeBaseComponentProps } from '../../types'

export type TreeNodeContentProps<TItem = TreeItem> = React.PropsWithChildren<
  TreeBaseComponentProps<TItem>
>

export const TreeNodeContent = <TItem extends unknown = TreeItem>({
  children,
}: TreeNodeContentProps<TItem>): React.ReactElement | null => {
  return <span>{children}</span>
}
