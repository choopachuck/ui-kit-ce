import * as React from 'react'
import { Pagination } from '@v-uik/base'

export const PaginationNearPagesCount: React.FC = () => {
  return <Pagination nearPageCount={2} totalPageCount={10} />
}
