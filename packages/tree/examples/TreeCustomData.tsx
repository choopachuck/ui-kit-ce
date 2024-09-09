import * as React from 'react'
import { Tree, TreeNodeItem } from '@v-uik/tree'

type MyItem = {
  id: string
  name: string
  inactive?: boolean
  inactiveToCheck?: boolean
  inactiveToSelect?: boolean
  loadingState?: boolean
  subItems?: MyItem[]
}

const dataSource: MyItem[] = [
  {
    id: 'node-0',
    name: 'node-0',
    subItems: [
      {
        id: 'node-0-0',
        name: 'node-0-0',
        loadingState: true,
      },
      {
        id: 'node-0-1',
        name: 'node-0-1',
        subItems: [
          {
            id: 'node-0-1-0',
            name: 'node-0-1-0',
            inactiveToCheck: true,
          },
          {
            id: 'node-0-1-1',
            name: 'node-0-1-1',
          },
        ],
      },
    ],
  },
  {
    id: 'node-1',
    name: 'node-1',
    inactiveToSelect: true,
    subItems: [
      {
        id: 'node-1-0',
        name: 'node-1-0',
        subItems: [
          {
            id: 'node-1-0-0',
            name: 'node-1-0-0',
          },
          {
            id: 'node-1-0-1',
            name: 'node-1-0-1',
          },
        ],
      },
      {
        id: 'node-1-1',
        name: 'node-1-1',
        subItems: [
          {
            id: 'node-1-1-0',
            name: 'node-1-1-0',
          },
          {
            id: 'node-1-1-1',
            name: 'node-1-1-1',
          },
        ],
      },
    ],
  },
]

const updateTreeData = (
  existingNodes: MyItem[],
  key: React.Key,
  newChildren: MyItem[]
): MyItem[] =>
  existingNodes.map((node) => {
    if (node.id === key) {
      return {
        ...node,
        subItems: newChildren,
      }
    }
    if (node.subItems) {
      return {
        ...node,
        subItems: updateTreeData(node.subItems, key, newChildren),
      }
    }

    return node
  })

const delay = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const TreeCustomData: React.FC = () => {
  const [dataSourceForLoading, setDataSourceForLoading] =
    React.useState(dataSource)

  const handleLoadData = async (item: TreeNodeItem<MyItem>) => {
    await delay(1000)

    const newTree = updateTreeData(dataSourceForLoading, item.id, [
      {
        id: `${item.id}-0`,
        name: `${item.id}-0`,
      },
      {
        id: `${item.id}-1`,
        name: `${item.id}-1`,
        loadingState: true,
        subItems: [
          {
            id: `${item.id}-1-0`,
            name: `${item.id}-1-0`,
          },
        ],
      },
    ])
    setDataSourceForLoading(newTree)
  }

  return (
    <Tree
      checkable
      selectable
      getters={{
        getTreeItemKey: (node) => node.id,
        getTreeItemLabel: (node) => node.name,
        getTreeItemChildren: (node) => node.subItems,
        getTreeItemLoadable: (node) => !!node.loadingState,
        getTreeItemCheckDisabled: (node) => !!node.inactiveToCheck,
        getTreeItemSelectDisabled: (node) => !!node.inactiveToSelect,
        getTreeItemDisabled: (node) => !!node.inactive,
      }}
      dataSource={dataSourceForLoading}
      defaultExpandedKeys={['node-0', 'node-0-1']}
      onLoadData={handleLoadData}
    />
  )
}
