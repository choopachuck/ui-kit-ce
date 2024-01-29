import * as React from 'react'
import {
  Table,
  ColumnProps,
  RecordDataSource,
  HeaderCellProps,
} from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; count: number }>

const dataSource = [
  { name: 'Project #1', count: 4, key: 1 },
  { name: 'Project #2', count: 3, key: 2 },
  { name: 'Project #3', count: 7, key: 3 },
  { name: 'Project #4', count: 12, key: 4 },
  { name: 'Project #5', count: 3, key: 5 },
  { name: 'Project #6', count: 9, key: 6 },
  { name: 'Project #7', count: 8, key: 7 },
  { name: 'Project #8', count: 15, key: 8 },
  { name: 'Project #9', count: 21, key: 9 },
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
    title: 'Project',
    setHeaderCellProps,
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: 'Count',
    setHeaderCellProps,
  },
]

export const FixedHeaderStory = (): JSX.Element => {
  return (
    <Table fixedHeader height={200} dataSource={dataSource} columns={columns} />
  )
}
