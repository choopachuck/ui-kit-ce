import * as React from 'react'
import { Table, ColumnProps, TableProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

export const EventsStory = (): JSX.Element => {
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
      setCellProps({ cell, cellIndex, row, rowIndex }) {
        return {
          onClick(event) {
            // eslint-disable-next-line no-console
            console.log('cell - click', {
              cell,
              cellIndex,
              row,
              rowIndex,
              event,
            })
          },
        }
      },
      setHeaderCellProps({ title, key }) {
        return {
          onClick(event) {
            // eslint-disable-next-line no-console
            console.log('header cell - click', { title, key, event })
          },
        }
      },
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
      setCellProps({ cell, cellIndex, row, rowIndex }) {
        return {
          onClick(event) {
            // eslint-disable-next-line no-console
            console.log('cell — click', {
              cell,
              cellIndex,
              row,
              rowIndex,
              event,
            })
          },
        }
      },
      setHeaderCellProps({ title, key }) {
        return {
          onClick(event) {
            // eslint-disable-next-line no-console
            console.log('header cell — click', { title, key, event })
          },
        }
      },
    },
  ]

  const setRowProps: TableProps<DataSource>['setRowProps'] = ({
    row,
    rowIndex,
  }) => {
    return {
      onClick(event) {
        // eslint-disable-next-line no-console
        console.log('row — click', { row, rowIndex, event })
      },
    }
  }

  return (
    <Table
      hoverable
      dataSource={dataSource}
      columns={columns}
      setRowProps={setRowProps}
    />
  )
}
