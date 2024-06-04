import * as React from 'react'
import { Pagination } from '@v-uik/base'

export const PaginationSizes: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gridRowGap: 16 }}>
      <Pagination totalPageCount={10} size="sm" />
      <Pagination totalPageCount={10} size="md" />
      <Pagination totalPageCount={10} size="lg" />
    </div>
  )
}
