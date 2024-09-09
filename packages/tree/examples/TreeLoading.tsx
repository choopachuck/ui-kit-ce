import * as React from 'react'
import { Tree, TreeItem, TreeNodeItem } from '@v-uik/tree'

const dataSource: TreeItem[] = [
  { key: 'node-0', label: 'node-0', loadable: true },
  {
    key: 'node-0',
    label: 'node-0',
    children: [
      { key: 'node-0-0', label: 'node-0-0' },
      { key: 'node-0-1', label: 'node-0-1', loadable: true },
    ],
  },
]

const updateTreeData = (
  existingNodes: TreeItem[],
  key: React.Key,
  newChildren: TreeItem[]
): TreeItem[] =>
  existingNodes.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children: newChildren,
      }
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, newChildren),
      }
    }

    return node
  })

const delay = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const TreeLoading: React.FC = () => {
  const [dataSourceForLoading, setDataSourceForLoading] =
    React.useState(dataSource)

  const handleLoadData = async (item: TreeNodeItem<TreeItem>) => {
    await delay(1000)

    const newTree = updateTreeData(dataSourceForLoading, item.key, [
      {
        key: `${item.key}-0`,
        label: `${item.key}-0`,
      },
      {
        key: `${item.key}-1`,
        label: `${item.key}-1`,
        loadable: true,
        children: [
          {
            key: `${item.key}-1-0`,
            label: `${item.key}-1-0`,
          },
        ],
      },
    ])
    setDataSourceForLoading(newTree)
  }

  return <Tree dataSource={dataSourceForLoading} onLoadData={handleLoadData} />
}
