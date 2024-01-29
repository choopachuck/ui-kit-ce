import * as React from 'react'
import { Table, ColumnProps, RecordDataSource, useTheme } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

const dataSource: DataSource[] = [
  { name: 'Vasya', role: 'developer', key: 1 },
  { name: 'Slava', role: 'developer', key: 2 },
  { name: 'Anton', role: 'manager', key: 3 },
  { name: 'Artem', role: 'designer', key: 4 },
  { name: 'Fillip', role: 'designer', key: 5 },
]

export const ExpandableStory = (): JSX.Element => {
  const theme = useTheme()

  const [expandedRows, setExpandedRows] = React.useReducer(
    (state: React.Key[], key: React.Key) => {
      const filtered = state.filter((el) => el !== key)

      return filtered.length === state.length ? state.concat(key) : filtered
    },
    []
  )

  const renderExpandableContent = React.useCallback(
    () => (
      <div
        style={{
          padding: '16px 16px 24px 56px',
          color: theme.sys.color.onBackgroundHigh,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid
        asperiores consequuntur deserunt dolorem eius facilis hic incidunt magni
        nam, omnis quam quia ratione rem repellat tempore temporibus voluptate
        voluptatum.
      </div>
    ),
    []
  )

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'expand',
      kind: 'expand',
      isRowExpanded: ({ row }) => !!row.key && expandedRows.includes(row.key),
      renderExpandableContent,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
    },
  ]

  return (
    <Table
      hoverable
      dataSource={dataSource}
      columns={columns}
      onChange={(params) => {
        if (params.type === 'expand' && params.row.key) {
          setExpandedRows(params.row.key)
        }
      }}
    />
  )
}
