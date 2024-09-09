import * as React from 'react'
import { Tree, TreeItem } from '@v-uik/tree'

const dataSource: TreeItem[] = [
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

export const TreeDisabledFull: React.FC = () => {
  return <Tree disabled dataSource={dataSource} />
}
