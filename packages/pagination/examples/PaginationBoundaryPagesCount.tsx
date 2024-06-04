import * as React from 'react'
import { Pagination } from '@v-uik/base'

export const PaginationBoundaryPagesCount: React.FC = () => {
  return <Pagination boundaryPageCount={2} totalPageCount={10} />
}
