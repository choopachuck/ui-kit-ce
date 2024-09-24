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
]

export const TreeSizes: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gridRowGap: 8 }}>
      <Tree dataSource={dataSource} size="xs" />
      <Tree dataSource={dataSource} size="sm" />
      <Tree dataSource={dataSource} size="md" />
    </div>
  )
}
