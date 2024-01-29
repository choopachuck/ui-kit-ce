import * as React from 'react'
import {
  Table,
  ColumnProps,
  RecordDataSource,
  SortOrderProp,
  TableEventType,
} from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

const getDataSource: () => DataSource[] = () => [
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
    sortable: true,
  },
]

export const SortableStory = (): JSX.Element => {
  const [sortOrder, setSortOrder] = React.useState<SortOrderProp>('none')

  const handleChangeTable = React.useCallback<
    (params: TableEventType<DataSource>) => void
  >((params) => {
    switch (params.type) {
      case 'sort': {
        setSortOrder(params.sortOrder)
        break
      }

      default: {
        throw new Error(`Invalid param "type=${params.type}"`)
      }
    }
  }, [])

  const sortedData = React.useMemo(() => {
    switch (sortOrder) {
      case 'asc': {
        return getDataSource().sort((a, b) => {
          if (a.role < b.role) {
            return -1
          }

          return a.role > b.role ? 1 : 0
        })
      }
      case 'desc': {
        return getDataSource().sort((a, b) => {
          if (a.role > b.role) {
            return -1
          }

          return a.role < b.role ? 1 : 0
        })
      }
      case 'none': {
        return getDataSource()
      }

      default:
        throw new Error('Invalid sortOrder param')
    }
  }, [sortOrder])

  return (
    <Table
      dataSource={sortedData}
      columns={columns}
      onChange={handleChangeTable}
    />
  )
}
