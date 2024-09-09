import * as React from 'react'
import {
  Tree,
  TreeNodeCheckboxProps,
  TreeItem,
  TreeNodeContentProps,
  TreeNodeIconProps,
  TreeNodeExpandButtonProps,
  TreeNodeExpandIconProps,
  TreeNodeItem,
  TreeNodeLoadingIndicatorProps,
} from '@v-uik/tree'

const dataSource: TreeItem[] = [
  {
    key: 'node-0',
    label: 'node-0',
    loadable: true,
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

const Content: React.FC<TreeNodeContentProps> = ({ children }) => {
  return <i>{children}</i>
}

const Icon: React.FC<TreeNodeIconProps> = ({ canExpand }) => {
  return <span>{canExpand ? '☗' : '☖'}</span>
}

const ExpandButton: React.FC<TreeNodeExpandButtonProps> = ({
  nodeKey,
  children,
  onClick,
}) => {
  return (
    <div
      role="button"
      aria-label={`Expand node ${nodeKey}`}
      style={{ display: 'flex', alignSelf: 'center' }}
      onClick={onClick as unknown as React.MouseEventHandler<HTMLDivElement>}
    >
      {children}
    </div>
  )
}

const ExpandIcon: React.FC<TreeNodeExpandIconProps> = ({ expanded }) => {
  return <span>{expanded ? '⇣' : '⇢'}</span>
}

const LoadingIndicator: React.FC<TreeNodeLoadingIndicatorProps> = () => {
  return <i>Loading...</i>
}

const Checkbox: React.FC<TreeNodeCheckboxProps> = ({
  nodeKey,
  data,
  indeterminate,
  checked,
  onChange,
}) => {
  const handleRef = (el: HTMLInputElement | null) => {
    if (el && indeterminate) {
      el.indeterminate = true
    }
  }

  return (
    <input
      key={`${nodeKey}-${String(indeterminate)}`}
      ref={handleRef}
      type="checkbox"
      checked={checked}
      aria-label={`Checkbox for ${String(data.label)}`}
      onChange={onChange}
    />
  )
}

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

export const TreeCustomComponents: React.FC = () => {
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

  return (
    <Tree
      checkable
      showIcons
      components={{
        Checkbox,
        Content,
        Icon,
        ExpandButton,
        ExpandIcon,
        LoadingIndicator,
      }}
      dataSource={dataSourceForLoading}
      onLoadData={handleLoadData}
    />
  )
}
