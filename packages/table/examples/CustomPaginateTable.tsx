import * as React from 'react'
import {
  ColumnProps,
  RecordDataSource,
  Table,
  TablePagination,
  PickerProps,
  InputNumber,
  useThrottle,
} from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string; soft: string }>

const CustomPicker = ({ onChange, value }: PickerProps) => {
  const [pickerValue, setPickerValue] = React.useState<string | null>(value)

  React.useEffect(() => {
    setPickerValue(value)
  }, [value])

  const triggerChange = () => {
    if (!pickerValue || !Number(pickerValue)) {
      setPickerValue(value)

      return
    }
    onChange(pickerValue)
  }

  const onKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      triggerChange()
    }
  }

  return (
    <InputNumber
      fullWidth
      valueType="string"
      precision={0}
      value={pickerValue}
      onBlur={triggerChange}
      onKeyDown={onKeyDown}
      onChange={setPickerValue}
    />
  )
}

export const CustomPaginateTable = (): JSX.Element => {
  const [currentPage, setCurrentPage] = React.useState(1)

  const [itemsPerPage, setItemsPerPage] = React.useState(10)

  const handleChangePageSize = useThrottle((pages: number) => {
    setItemsPerPage(pages)
  }, 1500)

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      width: 140,
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
      width: 240,
    },
    {
      key: 'soft',
      dataIndex: 'soft',
      title: 'Soft',
    },
  ]

  const dataSource = React.useMemo((): DataSource[] => {
    const arr: DataSource[] = []
    for (let i = 0; i < 100; i++) {
      arr.push({
        key: i,
        name: `Name ${i}`,
        role: i % 2 === 0 ? `Developer ${i}` : `Designer ${i}`,
        soft: i % 2 === 0 ? `WebStorm, VsCode - ${i}` : `Figma - ${i}`,
      })
    }

    return arr
  }, [])

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage
    const lastPageIndex = firstPageIndex + itemsPerPage

    return dataSource.slice(firstPageIndex, lastPageIndex)
  }, [dataSource, currentPage, itemsPerPage])

  const renderPagination = () => {
    return (
      <TablePagination
        absoluteArrows
        components={{
          PageSizer: CustomPicker,
          PagePicker: CustomPicker,
        }}
        currentPage={currentPage}
        totalCount={dataSource.length}
        pageSize={itemsPerPage}
        direction="end"
        itemsPerPageText="On page"
        paginationType="advanced"
        pageSizesArray={[10, 25, 75, 100]}
        pageText={(page) => `${page} page`}
        totalPagesText={(totalCount) => `from ${totalCount} pages`}
        pageRangeText={(min, max) => `${min} from ${max} pages`}
        itemRangeText={(min, max, total) => `${min}–${max} from ${total} items`}
        divider="bottom"
        onChange={setCurrentPage}
        onPageSizeChange={handleChangePageSize}
      />
    )
  }

  return (
    <div>
      {renderPagination()}
      <Table dataSource={currentTableData} columns={columns} />
    </div>
  )
}
