import * as React from 'react'
import { Pagination } from '@v-uik/base'

export const PaginationDefaultPage: React.FC = () => {
  return <Pagination totalPageCount={10} defaultPage={5} />
}
