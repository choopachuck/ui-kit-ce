import * as React from 'react'
import {
  Table as DefaultTable,
  ColumnProps,
  RecordDataSource,
} from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

export const Table = (): JSX.Element => {
  const dataSource: DataSource[] = [
    { name: 'Вася', role: 'developer', key: 1 },
    { name: 'Слава', role: 'developer', key: 2 },
  ]

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Имя',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Роль',
    },
  ]

  return (
    <DefaultTable
      style={{ marginTop: '8px' }}
      dataSource={dataSource}
      columns={columns}
    />
  )
}
