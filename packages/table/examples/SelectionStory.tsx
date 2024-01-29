import * as React from 'react'
import {
  Table,
  ColumnProps,
  RecordDataSource,
  createUseStyles,
  Checkbox,
} from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string; key: number }>

const dataSource: DataSource[] = [
  { name: 'Vasya', role: 'developer', key: 1 },
  { name: 'Slava', role: 'developer', key: 2 },
  { name: 'Anton', role: 'manager', key: 3 },
  { name: 'Artem', role: 'designer', key: 4 },
  { name: 'Fillip', role: 'designer', key: 5 },
]

const useRowStyles = createUseStyles((theme) => ({
  selectedRow: {
    background: theme.sys.color.backgroundBeta,
  },
}))

const RowComponent: React.FC<{
  className: string
  isSelected?: boolean
  onClick: () => void
  children: React.ReactNode
}> = ({ isSelected, className, onClick, ...props }) => {
  const styles = useRowStyles()

  return (
    <tr
      {...props}
      className={`${className} ${isSelected ? styles.selectedRow : ''}`}
      onClick={onClick}
    />
  )
}

export const SelectionStory = (): JSX.Element => {
  const [selection, setSelection] = React.useState<Record<number, boolean>>({})
  const [selectAllChecked, setSelectAllChecked] = React.useState(false)

  React.useEffect(() => {
    setSelectAllChecked(
      Object.values(selection).filter(Boolean).length === dataSource.length
    )
  }, [selection])

  const onRowSelect = (row: DataSource) => {
    setSelection((prev) => ({
      ...prev,
      [row.key]: !prev[row.key],
    }))
  }

  const onSelectAll = () => {
    if (selectAllChecked) {
      setSelection({})

      return
    }

    setSelection(
      dataSource.reduce((acc: Record<number, boolean>, row) => {
        acc[row.key] = true

        return acc
      }, {})
    )
  }

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'check',
      renderHeaderCellContent: () => {
        return (
          <Checkbox
            style={{ margin: '0 0.5rem' }}
            checked={selectAllChecked}
            onChange={onSelectAll}
          />
        )
      },
      renderCellContent: ({ row }) => {
        return (
          <Checkbox
            style={{ margin: '0 0.5rem' }}
            checked={selection[row.key]}
          />
        )
      },
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
      hoverable
      dataSource={dataSource}
      columns={columns}
      setRowProps={({ row }) => ({
        isSelected: selection[row.key],
        onClick: () => onRowSelect(row),
      })}
      components={{
        body: {
          row: RowComponent,
        },
      }}
    />
  )
}
