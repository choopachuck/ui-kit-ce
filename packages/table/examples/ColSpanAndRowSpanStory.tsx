import * as React from 'react'
import { Table, ColumnProps, CellProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

export const ColSpanAndRowSpanStory = (): JSX.Element => {
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
      setCellProps({ cellIndex, rowIndex }) {
        const props: CellProps = {}

        if (cellIndex === 1 && rowIndex === 0) {
          props.rowSpan = 2
        }

        if (cellIndex === 1 && rowIndex === 1) {
          props.rowSpan = 0
          props.colSpan = 0
        }

        if (cellIndex === 1 && rowIndex === 3) {
          props.rowSpan = 2
        }

        if (cellIndex === 1 && rowIndex === 4) {
          props.rowSpan = 0
          props.colSpan = 0
        }

        return props
      },
    },
  ]

  return (
    <Table bordered="rows-columns" dataSource={dataSource} columns={columns} />
  )
}
