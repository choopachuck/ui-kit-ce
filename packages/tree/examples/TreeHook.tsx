import * as React from 'react'
import { useTree, UseTreeReturnProps } from '@v-uik/tree'

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
            checkDisabled: true,
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

export const TreeHook: React.FC = () => {
  const {
    tree,
    getIsChecked,
    getIsExpanded,
    getIsIndeterminate,
    toggleCheck,
    toggleExpand,
  } = useTree({
    dataSource,
    defaultExpandedKeys: ['node-0', 'node-0-0', 'node-0-1'],
    defaultCheckedKeys: ['node-0-0'],
  })

  const renderTree = (tree: UseTreeReturnProps['tree']) =>
    tree.map((treeItem) => {
      const {
        $meta: { depth },
        label,
        children,
        key,
        disabled,
        checkDisabled,
      } = treeItem
      const isExpanded = getIsExpanded(key)

      return (
        <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '4px 0px',
            }}
          >
            <div style={{ marginLeft: 30 * depth }} />
            <div style={{ width: 30 }}>
              {children?.length && (
                <button disabled={disabled} onClick={() => toggleExpand(key)}>
                  {isExpanded ? '⇣' : '⇢'}
                </button>
              )}
            </div>
            <input
              key={String(getIsIndeterminate(key))}
              ref={(el) => {
                if (el && getIsIndeterminate(key)) {
                  el.indeterminate = true
                }
              }}
              aria-label={String(label)}
              disabled={disabled || checkDisabled}
              type="checkbox"
              checked={getIsChecked(key)}
              onChange={() => toggleCheck(key)}
            />
            {label}
          </div>
          {children?.length && isExpanded && renderTree(children)}
        </div>
      )
    })

  return <div>{renderTree(tree)}</div>
}
