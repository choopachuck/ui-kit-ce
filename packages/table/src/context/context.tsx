'use client'

import * as React from 'react'
import { TableDataContextType, TableDataProviderProps } from './types'
import { SortOrderProp } from '../interfaces'

export const TableDataContext = React.createContext<TableDataContextType>({
  columnsSortState: {},
  setColumnSortState: () => null,
})

/**
 * Нормализация данных
 * @param columns
 */
function normalizeColumnsToColumnsSortState<DataSource>(
  columns: TableDataProviderProps<DataSource>['columns'],
  prevColumnsSortState?: TableDataContextType['columnsSortState']
): TableDataContextType['columnsSortState'] {
  return columns.reduce<TableDataContextType['columnsSortState']>(
    (accum, data) => {
      return {
        ...accum,
        [data.key]:
          data.sortOrder ?? prevColumnsSortState?.[data.key] ?? 'none',
      }
    },
    {}
  )
}

export function TableDataProvider<DataSource>({
  children,
  columns,
}: TableDataProviderProps<DataSource>): React.ReactElement {
  const [columnsSortState, setColumnsSortState] = React.useState<
    TableDataContextType['columnsSortState']
  >(normalizeColumnsToColumnsSortState(columns))

  React.useEffect(() => {
    setColumnsSortState((prev) =>
      normalizeColumnsToColumnsSortState(columns, prev)
    )
  }, [columns])

  const setColumnSortState = React.useCallback(
    (key: string | number, order: SortOrderProp) => {
      setColumnsSortState((prev) => ({ ...prev, [key]: order }))
    },
    [setColumnsSortState]
  )

  const data = React.useMemo(
    () => ({
      columnsSortState,
      setColumnSortState,
    }),
    [setColumnSortState, columnsSortState]
  )

  return (
    <TableDataContext.Provider value={data}>
      {children}
    </TableDataContext.Provider>
  )
}
