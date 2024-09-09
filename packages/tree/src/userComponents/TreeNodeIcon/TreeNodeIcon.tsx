import * as React from 'react'
import { TreeItem } from '../../hooks'
import { FolderIcon, FileIcon } from '../../assets'
import { TreeBaseComponentProps } from '../../types'

export type TreeNodeIconProps<TItem = TreeItem> =
  TreeBaseComponentProps<TItem> & {
    /**
     * Флаг возможности скрытия/раскрытия узла дерева
     */
    canExpand: boolean
  }

export const TreeNodeIcon = <ITtem extends unknown = TreeItem>({
  canExpand,
}: TreeNodeIconProps<ITtem>): React.ReactElement | null => {
  if (canExpand) {
    return <FolderIcon />
  }

  return <FileIcon />
}
