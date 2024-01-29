import * as React from 'react'
import {
  ColumnProps,
  RecordDataSource,
  Table,
  TablePagination,
  createUseStyles,
} from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string; soft: string }>

// mocked api
const api = {
  getData: (currentPage: number) => {
    const data = new Array(10).fill(null).map((_, index) => ({
      key: index,
      name: `Name (${currentPage})`,
      role:
        currentPage % 2 === 0
          ? `Developer ${currentPage}`
          : `Designer ${currentPage}`,
      soft:
        currentPage % 2 === 0
          ? `WebStorm, VsCode - ${currentPage}`
          : `Figma - ${currentPage}`,
    }))

    const hasNext = !(currentPage === 5)

    return [data, hasNext]
  },
}

const useStyles = createUseStyles({
  blur: {
    filter: 'blur(2.5px)',
  },
})

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

export const DynamicPaginateTable = (): JSX.Element => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [data, setData] = React.useState<DataSource[]>([])
  const [hasNext, setHasNext] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  const getData = React.useCallback((currentPage: number) => {
    const [data, hasNext] = api.getData(currentPage)

    setData(data as DataSource[])
    setHasNext(hasNext as boolean)
  }, [])

  // загрузка первой страницы
  React.useEffect(() => {
    getData(currentPage)
  }, [])

  // загрузка следующих страниц
  const handleChange = React.useCallback(
    (currentPage: number) => {
      setLoading(true)
      setCurrentPage(currentPage)

      setTimeout(() => {
        getData(currentPage)
        setLoading(false)
      }, 500)
    },
    [getData]
  )

  const classes = useStyles()

  const renderPagination = () => {
    return (
      <TablePagination
        currentPage={currentPage}
        pageSize={10}
        direction="end"
        itemsPerPageText="On page"
        paginationType="simple"
        pageText={(page) => `${page} page`}
        divider="top"
        hasNext={hasNext}
        onChange={handleChange}
      />
    )
  }

  return (
    <div>
      <Table
        classes={{ body: loading ? classes.blur : undefined }}
        dataSource={data}
        columns={columns}
      />
      {renderPagination()}
    </div>
  )
}
