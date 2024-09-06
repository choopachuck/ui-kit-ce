import * as React from 'react'
import { Tree, TreeItem } from '@v-uik/tree'

const dataSource: TreeItem[] = [
  {
    key: 'item-1-0',
    label: 'item-1-0',
    children: [
      {
        key: 'item-1-0-0',
        label: 'item-1-0-0',
        children: [
          {
            key: 'item-1-0-0-0',
            label: 'item-1-0-0-0',
          },
          {
            key: 'item-1-0-0-1',
            label: 'item-1-0-0-1',
          },
        ],
      },
      {
        key: 'item-1-0-1',
        label: 'item-1-0-1',
        children: [
          {
            key: 'item-1-0-1-0',
            label: 'item-1-0-1-0',
          },
          {
            key: 'item-1-0-0-1-1',
            label: 'item-1-0-0-1-1',
          },
        ],
      },
    ],
  },
  {
    key: 'item-2-0',
    label: 'item-2-0',
    children: [
      {
        key: 'item-2-0-0',
        label: 'item-2-0-0',
        children: [
          {
            key: 'item-2-0-0-0',
            label: 'item-2-0-0-0',
          },
          {
            key: 'item-2-0-0-0-1',
            label: 'item-2-0-0-0-1',
          },
        ],
      },
      {
        key: 'item-2-0-1',
        label: 'item-2-0-1',
        children: [
          {
            key: 'item-2-0-1-0',
            label: 'item-2-0-1-0',
          },
          {
            key: 'item-2-0-0-1-1',
            label: 'item-2-0-0-1-1',
          },
        ],
      },
    ],
  },
]

export const TreeDisabledFull: React.FC = () => {
  return <Tree disabled dataSource={dataSource} />
}
