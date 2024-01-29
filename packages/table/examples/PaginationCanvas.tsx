import * as React from 'react'
import { TablePagination } from '@v-uik/base'

export default () => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)

  return (
    <TablePagination
      currentPage={currentPage}
      totalCount={150}
      pageSize={pageSize}
      paginationType="advanced"
      onChange={setCurrentPage}
      onPageSizeChange={setPageSize}
    />
  )
}
