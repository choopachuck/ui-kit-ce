import * as React from 'react'
import { Table, ColumnProps, RecordDataSource, RowProps } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

export const TableLayoutStory = (): JSX.Element => {
  const dataSource: DataSource[] = [
    { name: 'Vasya', role: 'developer', key: 1 },
    { name: 'Slava', role: 'developer', key: 2 },
    { name: 'Anton', role: 'manager', key: 3 },
    { name: 'Artem', role: 'designer', key: 4 },
    { name: 'Fillip', role: 'designer', key: 5 },
  ]

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      width: 300,
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
    },
  ]

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      tableLayout="fixed"
      setRowProps={(params) => {
        return {
          'data-name': params.row.name,
        } as RowProps
      }}
    />
  )
}
