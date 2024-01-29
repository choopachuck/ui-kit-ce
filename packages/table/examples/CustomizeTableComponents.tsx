import * as React from 'react'
import { ColumnProps, RecordDataSource, Table } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

type Props = React.ComponentPropsWithoutRef<'div'>

const TableComponent: React.FC<Props> = (props) => (
  <div {...props} style={{ height: 'auto' }} />
)

const RowComponent: React.FC<Props> = (props) => (
  <div {...props} style={{ display: 'flex' }} />
)

const CellComponent: React.FC<Props> = (props) => (
  <div {...props} style={{ flex: 1 }} />
)

const DivComponent = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  <div ref={ref} {...props} />
))

export const CustomizeTableComponents = (): JSX.Element => {
  const dataSource: DataSource[] = [
    { name: 'Vasya', role: 'developer', key: 1 },
    { name: 'Slava', role: 'developer', key: 2 },
    { name: 'Anton', role: 'manager', key: 3 },
    { name: 'Artem', role: 'designer', key: 4 },
    { name: 'Fillip', role: 'designer', key: 5 },
  ]

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'expand',
      dataIndex: 'key',
      title: 'Key',
    },
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

  return (
    <Table
      components={{
        table: TableComponent,
        head: {
          wrapper: DivComponent,
          row: RowComponent,
          cell: CellComponent,
        },
        body: {
          wrapper: DivComponent,
          row: RowComponent,
          cell: CellComponent,
        },
      }}
      dataSource={dataSource}
      columns={columns}
    />
  )
}
