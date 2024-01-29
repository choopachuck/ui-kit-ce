import * as React from 'react'
import { ColumnProps, SortOrderProp } from '../interfaces'

export type TableDataContextType = {
  columnsSortState: Record<string, SortOrderProp>
  setColumnSortState: (columnKey: string | number, order: SortOrderProp) => void
}

export type TableDataProviderProps<DataSource> = {
  children: React.ReactNode
  columns: ColumnProps<DataSource>[]
}
