'use client'

import * as React from 'react'
import { useTreeContext } from '../../TreeContext'
import { TreeItem } from '../../hooks'
import { TreeBaseComponentProps } from '../../types'
import { clsx } from '@v-uik/theme'

export type TreeNodeIconContainerProps<TItem = TreeItem> =
  TreeBaseComponentProps<TItem> & {
    /**
     * Флаг возможности скрытия/раскрытия узла дерева
     */
    canExpand: boolean
  }

export const TreeNodeIconContainer = <TItem extends unknown = TreeItem>(
  props: TreeNodeIconContainerProps<TItem>
): React.ReactElement | null => {
  const {
    classesMap,
    components: { Icon },
  } = useTreeContext<TItem>()

  return (
    <span
      className={clsx(classesMap.nodeControlContainer, classesMap.nodeIcon)}
    >
      <span className={classesMap.nodeControl}>
        {Icon && <Icon {...props} />}
      </span>
    </span>
  )
}
