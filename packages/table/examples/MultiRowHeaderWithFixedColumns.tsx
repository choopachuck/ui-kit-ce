import * as React from 'react'
import { Table, ColumnProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{
  name: string
  clientId: string
  subCol1: string
  subCol2: string
  subCol3: string
  subCol4: string
  subCol5: string
  subCol6: string
}>

const data: DataSource[] = [
  {
    name: 'name1',
    clientId: 'clientId1',
    subCol1: 'subCol1 1',
    subCol2: 'subCol2 1',
    subCol3: 'subCol3 1',
    subCol4: 'subCol4 1',
    subCol5: 'subCol5 1',
    subCol6: 'subCol6 1',
  },
  {
    name: 'name2',
    clientId: 'clientId2',
    subCol1: 'subCol1 2',
    subCol2: 'subCol2 2',
    subCol3: 'subCol3 2',
    subCol4: 'subCol4 2',
    subCol5: 'subCol5 2',
    subCol6: 'subCol6 2',
  },
]

const columns: ColumnProps<DataSource>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    width: 255,
    fixed: 'start',
    title: 'Name',
  },
  {
    key: 'clientId',
    dataIndex: 'clientId',
    width: 100,
    title: 'ID клиента',
  },
  {
    key: 'group1',
    dataIndex: 'group1',
    width: 468,
    title: 'group1',
    align: 'center',
    children: [
      {
        key: 'subCol1',
        dataIndex: 'subCol1',
        title: 'subCol1',
        width: 156,
      },
      {
        key: 'subCol2',
        dataIndex: 'subCol2',
        title: 'subCol2',
        width: 156,
      },
      {
        key: 'subCol3',
        dataIndex: 'subCol3',
        title: 'subCol3',
        width: 156,
      },
    ],
  },
  {
    key: 'group2',
    dataIndex: 'group2',
    width: 468,
    title: 'group2',
    align: 'center',
    children: [
      {
        key: 'subCol4',
        dataIndex: 'subCol4',
        width: 156,
        title: 'subCol4',
      },
      {
        key: 'subCol5',
        dataIndex: 'subCol5',
        width: 156,
        title: 'subCol5',
      },
      {
        key: 'subCol6',
        dataIndex: 'subCol6',
        width: 156,
        title: 'subCol6',
      },
    ],
  },
  {
    key: 'actions',
    title: 'actions',
    align: 'center',
    dataIndex: 'actions',
    fixed: 'end',
    width: 100,
  },
]

export function MultiRowHeaderWithFixedColumns() {
  return (
    <Table
      fixedHeader
      bordered="rows-columns"
      dataSource={data}
      columns={columns}
    />
  )
}
