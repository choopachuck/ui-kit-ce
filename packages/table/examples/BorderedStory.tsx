import * as React from 'react'
import {
  Table,
  ColumnProps,
  RecordDataSource,
  HeaderCellProps,
} from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

const dataSource: DataSource[] = [
  { name: 'Vasya', role: 'developer', key: 1 },
  { name: 'Slava', role: 'developer', key: 2 },
  { name: 'Anton', role: 'manager', key: 3 },
  { name: 'Artem', role: 'designer', key: 4 },
  { name: 'Fillip', role: 'designer', key: 5 },
]

const setHeaderCellProps = (): HeaderCellProps => ({
  style: {
    backgroundColor: '#fff',
  },
})

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

const borderedNoneColumns = columns.map((column) => ({
  ...column,
  setHeaderCellProps,
}))

export const BorderedRowsStory = (): JSX.Element => {
  return <Table bordered="rows" dataSource={dataSource} columns={columns} />
}

export const BorderedBothStory = (): JSX.Element => {
  return (
    <Table bordered="rows-columns" dataSource={dataSource} columns={columns} />
  )
}

export const BorderedNoneStory = (): JSX.Element => {
  return (
    <Table
      bordered="none"
      dataSource={dataSource}
      columns={borderedNoneColumns}
    />
  )
}
