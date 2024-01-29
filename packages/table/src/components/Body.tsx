'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'

import { useClassList } from '@v-uik/hooks'
import { commonCellUseStyles } from '../styles'
import { getComponent, getRowKey } from '../utils'
import {
  TableColumnKind,
  ReservedDataSourceProps,
  TableSizeProp,
  BodyProps,
} from '../interfaces'
import { EmptyTable } from './EmptyTable'
import { TableCellContent } from './TableCellContent'
import { BodyRowExpandedContent } from './BodyRowExpandedContent'

export const useTableBodyStyles = createUseStyles((theme) => ({
  body: {},

  hoverable: {
    '& $bodyRow': {
      '&:hover': {
        backgroundColor: theme.comp.table.bodyRowColorBackgroundHover,
        '&$hasFixedColumns': {
          backgroundColor:
            theme.comp.table.bodyRowColorBackgroundHasFixedColumnsHover,
        },

        '& $bodyCellFixed': {
          backgroundColor: theme.comp.table.bodyCellFixedColorBackgroundHover,
        },
      },
    },
  },

  stripe: {
    backgroundColor: theme.comp.table.bodyRowColorBackgroundStripe,
    '&$hasFixedColumns': {
      backgroundColor:
        theme.comp.table.bodyRowColorBackgroundHasFixedColumnsStripe,
    },

    '& $bodyCellFixed': {
      backgroundColor: theme.comp.table.bodyCellFixedColorBackgroundStripe,
    },
  },

  bodyRow: {
    '&:last-child': {
      '& $bodyCell': {
        '&:first-child': {
          borderBottomLeftRadius: theme.comp.table.shapeBorderRadiusBottomLeft,
        },

        '&:last-child': {
          borderBottomRightRadius:
            theme.comp.table.shapeBorderRadiusBottomRight,
        },
      },
    },
  },

  bodyRowExpanded: {
    '& $bodyCell': {
      borderBottomWidth: 0,
    },
  },

  bodyCell: {
    height: '100%',
    padding: 0,
  },

  bodyTreeCell: {
    display: 'flex',
  },

  bodyCellFixed: {
    position: 'sticky',
    backgroundColor: theme.comp.table.bodyCellFixedColorBackground,
    /**
     *  zIndex ячеек body (fixed).
     *  должен быть больше, чем zIndex других элементов (прим. Checkbox), но меньше, чем обычные head-ячейки (для прокрутки)
     *  число выбрано следующим образом: headCellZIndex - 1
     */
    zIndex: 11,
  },

  bodyWrapperText: {
    fontFamily: theme.comp.table.bodyTypographyFontFamily,
    fontSize: theme.comp.table.bodyTypographyFontSize,
    lineHeight: theme.comp.table.bodyTypographyLineHeight,
    letterSpacing: theme.comp.table.bodyTypographyLetterSpacing,
    fontWeight: theme.comp.table.bodyTypographyFontWeight,
  },

  hasFixedColumns: {},

  bodyCellContentAlignLeft: {
    textAlign: 'left',
  },

  bodyCellContentAlignCenter: {
    textAlign: 'center',
  },

  bodyCellContentAlignRight: {
    textAlign: 'right',
  },
}))

const _Body = <DataSource extends ReservedDataSourceProps<DataSource>>({
  classes,
  dataSource,
  columns,
  onChange,
  size,
  components,
  setRowProps,
  emptyData,
  stripe,
  hoverable,
  expandableColumn,
  expandableTreeColumn,
  hasFixedColumns,
  columnsOffsets,
  lastStartFixedColumn,
  firstEndFixedColumn,
  scrollLeaveStartSide,
  scrollLeaveEndSide,
  rowKey,
}: BodyProps<DataSource>): JSX.Element => {
  const commonCellClassesList = commonCellUseStyles()
  const classesList = useTableBodyStyles()
  const classesMap = useClassList(classesList, classes)

  const className = clsx(classesList.bodyWrapperText, classesMap.body, {
    [classesMap.hoverable]: hoverable,
  })

  const BodyWrapperComponent = getComponent<DataSource>(
    components,
    ['body', 'wrapper'],
    'tbody'
  )
  const BodyRowComponent = getComponent<DataSource>(
    components,
    ['body', 'row'],
    'tr'
  )
  const BodyCellComponent = getComponent<DataSource>(
    components,
    ['body', 'cell'],
    'td'
  )

  let customRowIndex = -1

  const renderRow = (row: DataSource, index: number, indentLevel = 0) => {
    // для сохранения последовательности индексов вложенных строк в древовидной таблице
    const rowIndex = expandableTreeColumn ? ++customRowIndex : index
    const rowProps = setRowProps?.({ row, rowIndex })

    const isRowExpanded = expandableColumn?.isRowExpanded?.({
      row,
      rowIndex,
    })

    return (
      <React.Fragment key={getRowKey(row, rowKey, index)}>
        <BodyRowComponent
          {...rowProps}
          className={clsx(classesMap.bodyRow, rowProps?.className, {
            [classesMap.stripe]: stripe && index % 2 !== 0,
            [classesMap.bodyRowExpanded]: isRowExpanded,
            [classesMap.hasFixedColumns]: hasFixedColumns,
          })}
        >
          {columns.map((cell, cellIndex) => {
            const { key, kind, dataIndex, setCellProps, fixed, align } = cell

            const leadDataIndex = dataIndex as keyof DataSource

            const isTreeCell = kind === TableColumnKind.tree
            const isColumnFixed = fixed && columnsOffsets[key] !== undefined

            const cellProps = setCellProps?.({
              cell: leadDataIndex ? row[leadDataIndex] : null,
              cellIndex,
              row,
              rowIndex,
            })

            if (cellProps?.colSpan === 0 && cellProps?.rowSpan === 0) {
              return null
            }

            const cellStyles = isColumnFixed
              ? {
                  ...cellProps?.style,
                  [fixed === 'start' ? 'left' : 'right']: columnsOffsets[key],
                }
              : cellProps?.style

            // TODO: сделать полиморфик компонент Cell с пробросом ref через setCellProps
            return (
              <BodyCellComponent
                {...cellProps}
                key={key}
                style={cellStyles}
                className={clsx(cellProps?.className, classesMap.bodyCell, {
                  [classesMap.bodyTreeCell]: isTreeCell,
                  [classesMap.bodyCellFixed]: isColumnFixed,
                  [clsx(
                    commonCellClassesList.fixedSide,
                    commonCellClassesList.fixedStartLast
                  )]: lastStartFixedColumn === key && scrollLeaveStartSide,
                  [clsx(
                    commonCellClassesList.fixedSide,
                    commonCellClassesList.fixedEndFirst
                  )]: firstEndFixedColumn === key && scrollLeaveEndSide,
                  [classesMap.bodyCellContentAlignLeft]: align === 'left',
                  [classesMap.bodyCellContentAlignCenter]: align === 'center',
                  [classesMap.bodyCellContentAlignRight]: align === 'right',
                })}
              >
                <TableCellContent
                  cell={cell}
                  cellIndex={cellIndex}
                  row={row}
                  rowIndex={rowIndex}
                  size={size as TableSizeProp}
                  indentLevel={indentLevel}
                  hoverable={hoverable}
                  onChange={onChange}
                />
              </BodyCellComponent>
            )
          })}
        </BodyRowComponent>

        <BodyRowExpandedContent<DataSource>
          key={getRowKey(row, rowKey, index).toString() + 'expand'}
          row={row}
          className={classesMap.bodyCell}
          columnsLength={columns.length}
          renderExpandableContent={expandableColumn?.renderExpandableContent}
          rowIndex={rowIndex}
          isRowExpanded={isRowExpanded}
        />

        {expandableTreeColumn?.isRowExpanded?.({
          row,
          rowIndex,
        }) &&
          row.children?.map((childRow, index) =>
            renderRow(childRow, index, indentLevel + 1)
          )}
      </React.Fragment>
    )
  }

  return (
    <BodyWrapperComponent className={className}>
      {!dataSource.length && (
        <EmptyTable columnsLength={columns.length}>{emptyData}</EmptyTable>
      )}

      {!!dataSource.length &&
        dataSource.map((row, index) => renderRow(row, index))}
    </BodyWrapperComponent>
  )
}

export const Body = React.memo(_Body) as typeof _Body
