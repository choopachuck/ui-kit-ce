import * as React from 'react'
import { Table, ColumnProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

export const EmptyDataStory = (): JSX.Element => {
  const dataSource: DataSource[] = []

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

  return <Table dataSource={dataSource} columns={columns} />
}
