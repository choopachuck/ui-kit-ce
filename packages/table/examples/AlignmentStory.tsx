import * as React from 'react'
import { Table, ColumnProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string; age: number }>

export const AlignmentStory = (): JSX.Element => {
  const dataSource: DataSource[] = [
    { name: 'Vasya', role: 'developer', age: 25, key: 1 },
    { name: 'Slava', role: 'developer', age: 30, key: 2 },
    { name: 'Anton', role: 'manager', age: 24, key: 3 },
    { name: 'Artem', role: 'designer', age: 25, key: 4 },
    { name: 'Fillip', role: 'designer', age: 30, key: 5 },
  ]

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      align: 'right',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
      align: 'center',
    },
    {
      key: 'age',
      dataIndex: 'age',
      title: 'Age',
      align: 'left',
    },
  ]

  return <Table dataSource={dataSource} columns={columns} />
}

export default AlignmentStory
