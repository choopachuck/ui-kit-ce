import * as React from 'react'
import {
  ColumnProps,
  TablePaginationDirectionType,
  PaginationType,
  RecordDataSource,
  Table,
  TablePagination,
  TablePaginationDirection,
  TablePaginationType,
  LabelControl,
  Checkbox,
  RadioGroup,
  Radio,
  Input,
} from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string; soft: string }>

export const PaginateTable = (): JSX.Element => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [absoluteArrows, setAbsoluteArrows] = React.useState(false)
  const [direction, setDirection] =
    React.useState<TablePaginationDirectionType>(TablePaginationDirection.end)
  const [itemsPerPageText, setItemsPerPageText] = React.useState(
    'элементов на странице'
  )
  const [position, setPosition] = React.useState('bottom')
  const [paginationType, setPaginationType] = React.useState<PaginationType>(
    TablePaginationType.simple
  )
  const [itemsPerPage, setItemsPerPage] = React.useState(10)

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

  const onChangeDirection = (value: string) =>
    setDirection(value as TablePaginationDirectionType)

  const onChangeItemsPerPageText = (value: string) => setItemsPerPageText(value)

  const onChangePaginationType = (value: string) =>
    setPaginationType(value as PaginationType)

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage
    const lastPageIndex = firstPageIndex + itemsPerPage

    return dataSource.slice(firstPageIndex, lastPageIndex)
  }, [dataSource, currentPage, itemsPerPage])

  const renderPagination = () => {
    return (
      <TablePagination
        currentPage={currentPage}
        totalCount={dataSource.length}
        pageSize={itemsPerPage}
        absoluteArrows={absoluteArrows}
        direction={direction}
        itemsPerPageText={itemsPerPageText}
        paginationType={paginationType}
        pageSizesArray={[10, 25, 75, 100]}
        pageText={(page) => `${page} page`}
        totalPagesText={(totalCount) => `from ${totalCount} pages`}
        pageRangeText={(min, max) => `${min} from ${max} pages`}
        itemRangeText={(min, max, total) => `${min}–${max} from ${total} items`}
        divider={position === 'top' ? 'bottom' : 'top'}
        onChange={setCurrentPage}
        onPageSizeChange={setItemsPerPage}
      />
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <div>
          <RadioGroup
            style={{ marginBottom: 20 }}
            label="Выравнивание"
            value={direction}
            onChange={onChangeDirection}
          >
            <LabelControl
              label="по левому краю"
              value="start"
              control={<Radio />}
            />
            <LabelControl
              label="по правому краю"
              value="end"
              control={<Radio />}
            />
          </RadioGroup>
        </div>
        <div style={{ marginBottom: 20 }}>
          <RadioGroup
            label="Расположение"
            value={position}
            onChange={setPosition}
          >
            <LabelControl
              label="над таблицей"
              value="top"
              control={<Radio />}
            />
            <LabelControl
              label="под таблицей"
              value="bottom"
              control={<Radio />}
            />
          </RadioGroup>
        </div>
        <div style={{ marginBottom: 20 }}>
          <RadioGroup
            label="Тип пагинации"
            value={paginationType}
            onChange={onChangePaginationType}
          >
            <LabelControl
              label="простая"
              value={TablePaginationType.simple}
              control={<Radio />}
            />
            <LabelControl
              label="продвинутая"
              value={TablePaginationType.advanced}
              control={<Radio />}
            />
          </RadioGroup>
        </div>
        <div style={{ marginBottom: 20, width: 330 }}>
          <Input
            fullWidth
            disabled={paginationType === TablePaginationType.simple}
            style={{ marginBottom: 10 }}
            value={itemsPerPageText}
            label="Введите текст рядом выбором размерности страницы"
            onChange={onChangeItemsPerPageText}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <LabelControl
            checked={absoluteArrows}
            control={<Checkbox />}
            label="Показывать абсолютные стрелки"
            onChange={() => setAbsoluteArrows(!absoluteArrows)}
          />
        </div>
      </div>
      {position === 'top' && renderPagination()}
      <Table dataSource={currentTableData} columns={columns} />
      {position === 'bottom' && renderPagination()}
    </div>
  )
}
