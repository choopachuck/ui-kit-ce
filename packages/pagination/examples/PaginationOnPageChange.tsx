import * as React from 'react'
import { Pagination } from '@v-uik/base'

export const PaginationOnPageChange: React.FC = () => {
  const [pageNumber, setPageNumber] = React.useState(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gridRowGap: 8 }}>
      <div>Current page number: {pageNumber}</div>
      <Pagination
        totalPageCount={10}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
      />
    </div>
  )
}
