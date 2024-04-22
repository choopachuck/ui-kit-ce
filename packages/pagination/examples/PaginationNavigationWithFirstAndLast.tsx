import * as React from 'react'
import { Pagination } from '@v-uik/base'

export const PaginationNavigationWithFirstAndLast: React.FC = () => {
  return (
    <Pagination showNavigationFirst showNavigationLast totalPageCount={10} />
  )
}
