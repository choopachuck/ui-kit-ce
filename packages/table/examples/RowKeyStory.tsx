import * as React from 'react'
import { Table, ColumnProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

export const RowKeyStory = (): JSX.Element => {
  const dataSource: DataSource[] = [
    { name: 'Vasya', role: 'developer' },
    { name: 'Slava', role: 'developer' },
    { name: 'Anton', role: 'manager' },
    { name: 'Artem', role: 'designer' },
    { name: 'Fillip', role: 'designer' },
  ]

  const columns: ColumnProps<DataSource>[] = [
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

  return <Table dataSource={dataSource} columns={columns} rowKey="name" />
}
