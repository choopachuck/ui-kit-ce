import * as React from 'react'
import { Pagination } from '@v-uik/base'

export const PaginationNavigationWithoutPreviousAndNext: React.FC = () => {
  return (
    <Pagination hideNavigationPrevious hideNavigationNext totalPageCount={10} />
  )
}
