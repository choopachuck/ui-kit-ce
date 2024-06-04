import * as React from 'react'
import { Pagination } from '@v-uik/base'

export const PaginationDisabled: React.FC = () => {
  return <Pagination disabled totalPageCount={10} />
}
