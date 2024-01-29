import * as React from 'react'
import { flatMapDeep } from '@v-uik/utils'
import {
  ColumnProps,
  TableColumnKind,
  ColumnsOffsets,
  ColumnWidth,
} from '../interfaces'
import { sumWidth } from '../utils'

export interface UseColumnsResult<DataSource> {
  flattenColumns: ColumnProps<DataSource>[]
  expandableColumn?: ColumnProps<DataSource>
  expandableTreeColumn?: ColumnProps<DataSource>
  columnsOffsets: ColumnsOffsets
  lastStartFixedColumn?: React.Key
  firstEndFixedColumn?: React.Key
  hasFixedColumns: boolean
}

const flatColumns = <DataSource>(
  columns: ColumnProps<DataSource>[]
): ColumnProps<DataSource>[] => {
  const getColumns = (
    column: ColumnProps<DataSource>
  ): ColumnProps<DataSource> | ColumnProps<DataSource>[] => {
    if (column.children && column.children.length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return column.children.map<ColumnProps<DataSource>>(getColumns)
    }

    return column
  }

  return flatMapDeep<ColumnProps<DataSource>, ColumnProps<DataSource>>(
    columns,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getColumns
  )
}

export const useColumns = <DataSource>(
  columns: ColumnProps<DataSource>[]
): UseColumnsResult<DataSource> => {
  return React.useMemo(() => {
    const isMultiRowsColumns = columns.some(
      (column) => column.children && column.children.length
    )

    const flattenColumns = flatColumns(columns)

    let expandableColumn: ColumnProps<DataSource> | undefined
    let expandableTreeColumn: ColumnProps<DataSource> | undefined
    let hasFixedColumns = false
    let currentStartOffset: ColumnWidth = 0
    let currentEndOffset: ColumnWidth = 0
    const columnsOffsets: { [key in React.Key]: ColumnWidth } = {}
    let lastStartFixedColumn: React.Key | undefined
    let firstEndFixedColumn: React.Key | undefined

    for (
      let i = 0, j = flattenColumns.length - 1;
      i < flattenColumns.length;
      i++, j--
    ) {
      const leftColumnWidth = flattenColumns[i].width
      const rightColumnWidth = flattenColumns[j].width

      if (
        !expandableColumn &&
        flattenColumns[i].kind === TableColumnKind.expand
      ) {
        expandableColumn = flattenColumns[i]
      }
      if (
        !expandableTreeColumn &&
        flattenColumns[i].kind === TableColumnKind.tree
      ) {
        expandableTreeColumn = flattenColumns[i]
      }

      if (flattenColumns[i].fixed === 'start') {
        hasFixedColumns = true
        columnsOffsets[flattenColumns[i].key] = currentStartOffset
        currentStartOffset = sumWidth<DataSource>(
          currentStartOffset,
          leftColumnWidth
        )
        lastStartFixedColumn = flattenColumns[i].key
      }
      if (flattenColumns[j].fixed === 'end') {
        hasFixedColumns = true
        columnsOffsets[flattenColumns[j].key] = currentEndOffset
        currentEndOffset = sumWidth<DataSource>(
          currentEndOffset,
          rightColumnWidth
        )
        firstEndFixedColumn = flattenColumns[j].key
      }
    }

    return {
      flattenColumns,
      expandableColumn,
      expandableTreeColumn,
      // temporary disable fixed columns when multiline header
      columnsOffsets: isMultiRowsColumns ? {} : columnsOffsets,
      lastStartFixedColumn: isMultiRowsColumns
        ? undefined
        : lastStartFixedColumn,
      firstEndFixedColumn: isMultiRowsColumns ? undefined : firstEndFixedColumn,
      hasFixedColumns: isMultiRowsColumns ? false : hasFixedColumns,
    }
  }, [columns])
}
