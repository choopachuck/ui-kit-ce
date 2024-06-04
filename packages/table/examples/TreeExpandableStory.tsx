import * as React from 'react'
import {
  Table,
  ColumnProps,
  RecordDataSource,
  TreeExpandButton,
  Text,
  TextKinds,
} from '@v-uik/base'
import { Icon } from './assets/Icon'

type DataSource = RecordDataSource<{ name: string; count?: number }>

const dataSource: DataSource[] = [
  {
    key: 1,
    name: 'Project #1',
  },
  {
    key: 2,
    name: 'V-UIK',
    count: 6,
    children: [
      {
        key: 3,
        name: 'Managers',
        count: 1,
        children: [{ key: 4, name: 'Anton' }],
      },
      {
        key: 5,
        name: 'Developers',
        count: 3,
        children: [
          { key: 6, name: 'Vasya' },
          { key: 7, name: 'Slava' },
          { key: 8, name: 'Pavel' },
        ],
      },
      {
        key: 9,
        name: 'Designers',
        count: 2,
        children: [
          { key: 10, name: 'Artem' },
          { key: 11, name: 'Fillip' },
        ],
      },
    ],
  },
  {
    key: 12,
    name: 'Project #2',
  },
]

export const TreeExpandableStory = (): JSX.Element => {
  const [treeExpandedRows, setTreeExpandedRows] = React.useState<
    Record<number, boolean>
  >({})

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      kind: 'tree',
      width: 500,
      isRowExpanded: ({ row }) =>
        !!row.key && !!treeExpandedRows[row.key as number],
    },
    {
      key: 'count',
      dataIndex: 'count',
      title: 'Count',
    },
  ]

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onChange={(params) => {
        if (params.type === 'treeExpand') {
          const newRows = { ...treeExpandedRows }

          const key = params.row.key as number
          if (key) {
            newRows[key] ? delete newRows[key] : (newRows[key] = true)
          }
          setTreeExpandedRows(newRows)
        }
      }}
    />
  )
}

export const TreeExpandableCustomizedStory = (): JSX.Element => {
  const [treeExpandedRows, setTreeExpandedRows] = React.useState<
    Record<number, boolean>
  >({})

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      kind: 'tree',
      width: 510,
      isRowExpanded: ({ row }) =>
        !!row.key && !!treeExpandedRows[row.key as number],
      renderCellContent: ({ row, cell, originClassName, indentLevel = 0 }) => (
        <>
          <div
            style={{
              paddingLeft: (row.children?.length ? 12 : 44) + indentLevel * 16,
            }}
          />

          {row.children?.length && (
            <TreeExpandButton
              hoverable
              expanded={
                row.key !== undefined
                  ? !!treeExpandedRows[row.key as number]
                  : false
              }
              onClick={(event) => {
                event.stopPropagation()
                const newRows = { ...treeExpandedRows }

                const key = row.key as number
                if (key) {
                  newRows[key] ? delete newRows[key] : (newRows[key] = true)
                }
                setTreeExpandedRows(newRows)
              }}
            />
          )}

          <Icon width={32} style={{ alignSelf: 'center' }} />

          <Text kind={TextKinds.body2} className={originClassName}>
            {cell as string}
          </Text>
        </>
      ),
    },
    {
      key: 'count',
      dataIndex: 'count',
      title: 'Count',
    },
  ]

  return (
    <Table
      size="sm"
      dataSource={dataSource}
      columns={columns}
      onChange={(params) => {
        if (params.type === 'treeExpand') {
          const newRows = { ...treeExpandedRows }

          const key = params.row.key as number
          if (key) {
            newRows[key] ? delete newRows[key] : (newRows[key] = true)
          }
          setTreeExpandedRows(newRows)
        }
      }}
    />
  )
}
