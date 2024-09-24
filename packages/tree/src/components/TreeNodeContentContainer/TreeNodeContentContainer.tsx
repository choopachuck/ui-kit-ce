'use client'

import * as React from 'react'

import { TreeBaseComponentProps, TreeProps } from '../../types'
import { TreeItem } from '../../hooks'
import { useTreeContext } from '../../TreeContext'

export type TreeNodeContentContainerProps<TItem = TreeItem> =
  React.PropsWithChildren<
    TreeBaseComponentProps<TItem> & Pick<TreeProps<TItem>, 'maxContentLines'>
  >

export const TreeNodeContentContainer = <TItem extends unknown = TreeItem>({
  maxContentLines,
  ...rest
}: TreeNodeContentContainerProps<TItem>): React.ReactElement | null => {
  const {
    classesMap,
    components: { Content },
  } = useTreeContext<TItem>()

  return (
    <span className={classesMap.nodeContentContainer}>
      <span
        className={classesMap.nodeContent}
        style={{ WebkitLineClamp: maxContentLines }}
      >
        {Content && <Content {...rest} />}
      </span>
    </span>
  )
}
