import * as React from 'react'
import { Tree, TreeItem, UseTreeReturnProps, TreeNodeItem } from '@v-uik/tree'

const dataSource = [
  {
    key: 'node-0',
    label: 'node-0',
    children: [
      {
        key: 'node-0-0',
        label: 'node-0-0',
        children: [
          {
            key: 'node-0-0-0',
            label: 'node-0-0-0',
          },
          {
            key: 'node-0-0-1',
            label: 'node-0-0-1',
          },
        ],
      },
      {
        key: 'node-0-1',
        label: 'node-0-1',
        children: [
          {
            key: 'node-0-1-0',
            label: 'node-0-1-0',
          },
          {
            key: 'node-0-1-1',
            label: 'node-0-1-1',
          },
        ],
      },
    ],
  },
  {
    key: 'node-1',
    label: 'node-1',
    children: [
      {
        key: 'node-1-0',
        label: 'node-1-0',
        children: [
          {
            key: 'node-1-0-0',
            label: 'node-1-0-0',
          },
          {
            key: 'node-1-0-1',
            label: 'node-1-0-1',
          },
        ],
      },
      {
        key: 'node-1-1',
        label: 'node-1-1',
        children: [
          {
            key: 'node-1-1-0',
            label: 'node-1-1-0',
          },
          {
            key: 'node-1-1-1',
            label: 'node-1-1-1',
          },
        ],
      },
    ],
  },
]

type TreeHandlers = Pick<
  UseTreeReturnProps<TreeItem>,
  'toggleCheck' | 'toggleExpand' | 'toggleSelect' | 'toggleSelectRange'
>

export const TreeCustomKeyboard: React.FC = () => {
  const handleTreeKeyDown = (
    event: React.KeyboardEvent<HTMLUListElement>,
    node: TreeNodeItem<TreeItem>,
    { toggleCheck, toggleExpand, toggleSelect }: TreeHandlers
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault()

      toggleCheck(node.key)

      return true
    }

    if (event.key === ' ') {
      event.preventDefault()

      toggleExpand(node.key)

      return true
    }

    if (event.key === 's') {
      event.preventDefault()
      event.stopPropagation()

      toggleSelect(node.key)

      return true
    }
  }

  return (
    <Tree
      checkable
      selectable
      dataSource={dataSource}
      defaultExpandedKeys={['node-0', 'node-0-0', 'node-0-1']}
      onTreeKeyDown={handleTreeKeyDown}
    />
  )
}
