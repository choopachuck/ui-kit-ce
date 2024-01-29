import * as React from 'react'
import { Table, ColumnProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

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
  },
  {
    key: 'role',
    dataIndex: 'role',
    title: 'Role',
  },
]

export const SmallSizeStory = (): JSX.Element => {
  return <Table dataSource={dataSource} columns={columns} size="sm" />
}

export const MediumSizeStory = (): JSX.Element => {
  return <Table dataSource={dataSource} columns={columns} />
}

export const LargeSizeStory = (): JSX.Element => {
  return <Table dataSource={dataSource} columns={columns} size="lg" />
}
