import * as React from 'react'
import {
  createUseStyles,
  Table,
  ColumnProps,
  RecordDataSource,
  HeaderCellProps,
} from '@v-uik/base'

const useStyles = createUseStyles({
  table: {
    width: 1400,
  },
})

type DataSource = RecordDataSource<{
  name: string
  phone: string
  address: string
  info: string
}>

const dataSource = [
  {
    key: 1,
    name: 'Ivanov Ivan',
    phone: '+7(999)123-45-67',
    address: 'Moscow',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 2,
    name: 'Petrov Petr',
    phone: '+7(999)111-22-33',
    address: 'Saint Petersburg',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 3,
    name: 'Pavel Pavlovich',
    phone: '8(800)555-35-35',
    address: 'Kazan',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 4,
    name: 'Alex Alexandrov',
    phone: '8(800)555-35-35',
    address: 'Sochi',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 5,
    name: 'Fedor Fedorov',
    phone: '8(800)555-35-35',
    address: 'Kazan',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 6,
    name: 'Fedor Fedorov',
    phone: '8(800)555-35-35',
    address: 'Kazan',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 7,
    name: 'Anton Antonov',
    phone: '8(800)555-35-35',
    address: 'Murmansk',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 8,
    name: 'Sergey Sergeev',
    phone: '8(800)555-35-35',
    address: 'Norilsk',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 9,
    name: 'Oleg Olegovich',
    phone: '8(800)555-35-35',
    address: 'Vladivostok',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 10,
    name: 'Isak Isaev',
    phone: '8(800)555-35-35',
    address: 'Omsk',
    info: 'Lorem ipsum dolor sit amet.',
  },
  {
    key: 11,
    name: 'Fedor Fedorov',
    phone: '8(800)555-35-35',
    address: 'Moscow',
    info: 'Lorem ipsum dolor sit amet.',
  },
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
    fixed: 'start',
    width: 150,
    setHeaderCellProps,
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Phone',
    fixed: 'start',
    width: 160,
    setHeaderCellProps,
  },
  {
    key: 'address',
    dataIndex: 'address',
    title: 'Address',
    width: 160,
    setHeaderCellProps,
  },
  {
    key: 'info1',
    dataIndex: 'info',
    title: 'Info 1',
    setHeaderCellProps,
  },
  {
    key: 'info2',
    dataIndex: 'info',
    title: 'Info 2',
    setHeaderCellProps,
  },
  {
    key: 'info3',
    dataIndex: 'info',
    title: 'Info 3',
    setHeaderCellProps,
  },
  {
    key: 'info4',
    dataIndex: 'info',
    title: 'Info 4',
    fixed: 'end',
    width: 230,
    setHeaderCellProps,
  },
]

export const FixedColumnsStory = (): JSX.Element => {
  const classesList = useStyles()

  return (
    <Table
      fixedHeader
      height={400}
      classes={{
        table: classesList.table,
      }}
      dataSource={dataSource}
      columns={columns}
    />
  )
}
