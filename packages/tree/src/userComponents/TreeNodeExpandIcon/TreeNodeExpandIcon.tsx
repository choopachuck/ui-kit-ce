'use client'

import * as React from 'react'
import { TreeBaseComponentProps } from '../../types'
import { TreeItem } from '../../hooks'
import { ExpandIcon, FoldIcon } from '../../assets'

export type TreeNodeExpandIconProps<TItem extends unknown = TreeItem> =
  TreeBaseComponentProps<TItem>

export const TreeNodeExpandIcon = <TItem extends unknown = TreeItem>({
  expanded,
}: TreeNodeExpandIconProps<TItem>): React.ReactElement | null => {
  const Icon = expanded ? FoldIcon : ExpandIcon

  return <Icon />
}
