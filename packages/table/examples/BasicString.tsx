import * as React from 'react'
import { Table, ColumnProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string; id: number }>

export const BasicString = (): JSX.Element => {
  const dataSource: DataSource[] = [
    { id: 1, name: 'Vasya', role: 'developer', key: 1 },
    { id: 2, name: 'Slava', role: 'developer', key: 2 },
    { id: 3, name: 'Anton', role: 'manager', key: 3 },
    { id: 4, name: 'Artem', role: 'designer', key: 4 },
    { id: 5, name: 'Fillip', role: 'designer', key: 5 },
  ]

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      width: 50,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      width: '150px',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
      width: '30%',
    },
  ]

  return <Table dataSource={dataSource} columns={columns} />
}
