import * as React from 'react'
import { Pagination, createUseStyles } from '@v-uik/base'

const PaginationGapGrid: React.FC = () => {
  const useStyles = createUseStyles({
    root: {
      gap: 16,
    },
  })

  return <Pagination totalPageCount={10} classes={useStyles()} />
}

const PaginationGapFlexbox: React.FC = () => {
  const useStyles = createUseStyles({
    root: {
      margin: [0, -4],
    },
    item: {
      margin: [0, 4],
    },
  })

  return <Pagination totalPageCount={10} classes={useStyles()} />
}

export const PaginationGap: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gridRowGap: 16 }}>
      <PaginationGapFlexbox />
      <PaginationGapGrid />
    </div>
  )
}
