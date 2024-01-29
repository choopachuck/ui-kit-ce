import * as React from 'react'
import { Table, ColumnProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{
  name: string
  country: string
  city: string
  role: string
  age: number
}>

const dataSource: DataSource[] = [
  {
    name: 'Ivanov Ivan',
    country: 'Russia',
    city: 'Moscow',
    age: 22,
    role: 'developer',
    key: 1,
  },
  {
    name: 'Petrov Petr',
    country: 'Russia',
    city: 'Saint Petersburg',
    age: 27,
    role: 'developer',
    key: 2,
  },
  {
    name: 'Alex Meret',
    country: 'Britain',
    city: 'London',
    age: 30,
    role: 'manager',
    key: 3,
  },
  {
    name: 'Will Smith',
    country: 'USA',
    city: 'New-York',
    age: 28,
    role: 'designer',
    key: 4,
  },
  {
    name: 'Roman Romanoff',
    country: 'Russia',
    city: 'Moscow',
    age: 25,
    role: 'designer',
    key: 5,
  },
]

const columns: ColumnProps<DataSource>[] = [
  {
    key: 'data',
    dataIndex: 'data',
    title: 'Data',
    children: [
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Name',
      },
      {
        key: 'age',
        dataIndex: 'age',
        title: 'Age',
      },
      {
        key: 'address',
        dataIndex: 'address',
        title: 'Addres',
        children: [
          {
            key: 'country',
            dataIndex: 'country',
            title: 'Country',
          },
          {
            key: 'city',
            dataIndex: 'city',
            title: 'City',
          },
        ],
      },
    ],
  },
  {
    key: 'role',
    dataIndex: 'role',
    title: 'Role',
  },
]

export const MultiRowHeader = (): JSX.Element => {
  return (
    <Table bordered="rows-columns" dataSource={dataSource} columns={columns} />
  )
}
