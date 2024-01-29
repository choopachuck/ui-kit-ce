'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import {
  TableSizeProp,
  TableEventType,
  ReservedDataSourceProps,
  TableColumnKind,
  ColumnProps,
} from '../interfaces'
import { ExpandButton } from './ExpandButton'
import { TreeExpandButton } from './TreeExpandButton'

export const useTableCellContentStyles = createUseStyles({
  bodyCellContent: {
    '&$sm': {
      padding: [10, 16],
    },

    '&$md': {
      padding: [14, 16],
    },

    '&$lg': {
      padding: [18, 16],
    },
  },

  sm: {},

  md: {},

  lg: {},

  treeCellContent: {
    '&$sm': {
      paddingLeft: 4,
    },

    '&$md': {
      paddingLeft: 4,
    },

    '&$lg': {
      paddingLeft: 4,
    },
  },
})

export interface TableCellContentProps<DataSource = unknown> {
  cell: ColumnProps<DataSource>
  row: DataSource
  cellIndex: number
  rowIndex: number
  onChange?: (params: TableEventType<DataSource>) => void
  size: TableSizeProp
  indentLevel: number
  hoverable?: boolean
}

export const TableCellContent = <
  DataSource extends ReservedDataSourceProps<DataSource>
>({
  cell,
  cellIndex,
  row,
  rowIndex,
  onChange,
  size,
  indentLevel,
  hoverable,
}: TableCellContentProps<DataSource>): JSX.Element => {
  const classesList = useTableCellContentStyles()

  const { kind, dataIndex, renderCellContent, isRowExpanded } = cell

  const isExpandCell = kind === TableColumnKind.expand
  const isTreeCell = kind === TableColumnKind.tree

  const className = clsx(classesList.bodyCellContent, classesList[size], {
    [classesList.treeCellContent]: isTreeCell,
  })

  const leadDataIndex = dataIndex as keyof DataSource

  if (renderCellContent) {
    return renderCellContent({
      cell: leadDataIndex ? row[leadDataIndex] : null,
      cellIndex,
      row,
      rowIndex,
      originClassName: className,
      indentLevel,
    }) as JSX.Element
  }

  if (isExpandCell) {
    return (
      <ExpandButton
        expanded={isRowExpanded?.({ row, rowIndex })}
        hoverable={!hoverable}
        onClick={(event) => {
          event.stopPropagation()
          onChange?.({ type: 'expand', row, rowIndex })
        }}
      />
    )
  }

  const text = (
    <div className={className}>{leadDataIndex ? row[leadDataIndex] : null}</div>
  )

  const rowHasChildren = !!row.children?.length

  if (isTreeCell) {
    return (
      <>
        <div
          style={{
            // 12 - отступ слева, 32 - ширина кнопки
            paddingLeft: (rowHasChildren ? 12 : 44) + indentLevel * 32,
          }}
        />

        {rowHasChildren && (
          <TreeExpandButton
            expanded={isRowExpanded?.({ row, rowIndex })}
            hoverable={!hoverable}
            onClick={(event) => {
              event.stopPropagation()
              onChange?.({ type: 'treeExpand', row, rowIndex })
            }}
          />
        )}

        {text}
      </>
    )
  }

  return text
}
