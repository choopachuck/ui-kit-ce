'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { commonCellUseStyles } from '../styles'
import { getComponent, parseHeaderRows } from '../utils'
import {
  TableHeadCellContent,
  TableHeadCellContentClasses,
} from './TableHeadCellContent'
import { useFixedHeader } from '../hooks/useFixedHeader'
import { UseColumnsResult } from '../hooks/useColumns'
import { UseScrollResult } from '../hooks/useScroll'
import {
  TableProps,
  TableColumnKind,
  ReservedDataSourceProps,
  TableSizeProp,
  SortTableEventType,
} from '../interfaces'
import { useTableDataContext } from '../context'

const useStyles = createUseStyles((theme) => ({
  head: {},

  headRow: {
    '&:first-child': {
      '& $headCell': {
        '&:first-child': {
          borderTopLeftRadius: theme.comp.table.shapeBorderRadiusTopLeft,
        },

        '&:last-child': {
          borderTopRightRadius: theme.comp.table.shapeBorderRadiusTopRight,
        },
      },
    },
  },

  headCell: {
    height: '100%',
    padding: 0,
    backgroundColor: theme.comp.table.headerColorBackground,
    borderBottom: `1px solid ${theme.comp.table.headerColorBorder}`,

    '&$headCellLast': {
      '&:last-child': {
        // to increase selector's weight
        borderRightWidth: 0,
      },
    },
  },

  headCellBoldBorder: {
    borderBottomWidth: 2,
  },

  headCellFixed: {
    /**
     *  zIndex ячеек head строки (fixed).
     *  должен быть больше, чем zIndex других элементов (прим. Checkbox), но меньше, чем обычные head-ячейки (для прокрутки)
     *  число выбрано следующим образом: headCellZIndex - 1
     */
    zIndex: 11,
    position: 'sticky',
  },

  headCellFixedTopShadow: {
    '&::after': {
      content: '""',
      position: 'absolute',
      height: 10,
      bottom: 0,
      left: 0,
      right: 0,
      transform: 'translate(0, 12px)',
      boxShadow: theme.comp.table.headerCellElevationShadowFixed,
    },
    /**
     *  zIndex тени ячеек. Аналогично headCellFixed
     */
    zIndex: 11,
  },

  headCellExpandable: {
    width: '56px',
  },
  headWrapperText: {
    fontFamily: theme.comp.table.headerTypographyFontFamily,
    fontSize: theme.comp.table.headerTypographyFontSize,
    lineHeight: theme.comp.table.headerTypographyLineHeight,
    letterSpacing: theme.comp.table.headerTypographyLetterSpacing,
    fontWeight: theme.comp.table.headerTypographyFontWeight,
  },

  headCellLast: {},
}))

type Classes = Partial<Record<'head' | 'headRow' | 'headCell', string>> &
  TableHeadCellContentClasses

type HeaderProps<DataSource = unknown> = Pick<
  TableProps<DataSource>,
  'columns' | 'components' | 'fixedHeader' | 'size' | 'onChange'
> &
  Pick<
    UseColumnsResult<DataSource>,
    'columnsOffsets' | 'lastStartFixedColumn' | 'firstEndFixedColumn'
  > &
  Omit<UseScrollResult, 'onScroll'> & {
    /**
     * JSS-классы для стилизации
     */
    classes?: Classes
  }

/**
 * Объект для маппинга внутренних значений сортировок в значения сортировок aria-sort
 */
const mapSortOrderToAriaSortValue: Record<
  SortTableEventType['sortOrder'],
  'ascending' | 'descending' | 'none'
> = {
  asc: 'ascending',
  desc: 'descending',
  none: 'none',
} as const

const _Header = <DataSource extends ReservedDataSourceProps<DataSource>>({
  classes,
  columns,
  onChange,
  size,
  components,
  fixedHeader,
  columnsOffsets,
  lastStartFixedColumn,
  firstEndFixedColumn,
  scrollLeaveTop,
  scrollLeaveStartSide,
  scrollLeaveEndSide,
}: HeaderProps<DataSource>): JSX.Element => {
  const headerRef = React.useRef<HTMLElement>()

  const commonCellClassesList = commonCellUseStyles()
  const classesList = useStyles()
  const classesMap = useClassList(classesList, classes)

  const className = clsx(classesList.headWrapperText, classesMap.head)
  const HeadWrapperComponent = getComponent<DataSource>(
    components,
    ['head', 'wrapper'],
    'thead'
  )
  const HeadRowComponent = getComponent<DataSource>(
    components,
    ['head', 'row'],
    'tr'
  )
  const HeadCellComponent = getComponent<DataSource>(
    components,
    ['head', 'cell'],
    'th'
  )

  const rows = React.useMemo(() => parseHeaderRows(columns), [columns])

  const headerRowsTopOffsets = useFixedHeader(headerRef, fixedHeader)

  const { columnsSortState } = useTableDataContext()

  return (
    <HeadWrapperComponent ref={headerRef} className={className}>
      {rows.map((row, rowIndex) => (
        <HeadRowComponent
          key={`head-row-${rowIndex}`}
          className={classesMap.headRow}
        >
          {row.map((headerColumn) => {
            const {
              column,
              colSpan = 1,
              rowSpan = 1,
              isLastColumn,
            } = headerColumn
            const { title, key, setHeaderCellProps, kind, fixed, width } =
              column
            const isRowExpandable = kind === TableColumnKind.expand
            const isColumnFixed = fixed && columnsOffsets[key] !== undefined
            const isLastHorizontalColumn = rowIndex + rowSpan === rows.length

            const headerCellProps = setHeaderCellProps?.({
              title,
              key,
            })

            if (
              headerCellProps?.colSpan === 0 &&
              headerCellProps?.rowSpan === 0
            ) {
              return null
            }

            const cellStyles =
              isColumnFixed || width || headerRowsTopOffsets
                ? {
                    ...headerCellProps?.style,
                    ...(width ? { width, minWidth: width } : undefined),
                    ...(isColumnFixed
                      ? {
                          [fixed === 'start' ? 'left' : 'right']:
                            columnsOffsets[key],
                          /**
                           *  zIndex ячеек head строки (не fixed).
                           *  должен быть больше, чем zIndex других элементов (прим. Checkbox)
                           *  число выбрано следующим образом: (checkboxZIndex + 1) * 10, чтобы индекс был больше любого другого ui элемента (предположительно)
                           */
                          zIndex: 12,
                        }
                      : undefined),
                    ...(headerRowsTopOffsets
                      ? { top: headerRowsTopOffsets[rowIndex] }
                      : undefined),
                  }
                : headerCellProps?.style

            const sortOrder = columnsSortState[key]
            const ariaSort = mapSortOrderToAriaSortValue[sortOrder]

            // TODO: сделать полиморфик компонент Cell с пробросом ref через setHeaderCellProps
            return (
              <HeadCellComponent
                {...headerCellProps}
                key={key}
                colSpan={colSpan > 1 ? colSpan : undefined}
                rowSpan={rowSpan > 1 ? rowSpan : undefined}
                style={cellStyles}
                aria-sort={ariaSort}
                className={clsx(
                  headerCellProps?.className,
                  classesMap.headCell,
                  {
                    [classesMap.headCellBoldBorder]: isLastHorizontalColumn,
                    [classesMap.headCellExpandable]: isRowExpandable,
                    [classesMap.headCellFixedTopShadow]:
                      isLastHorizontalColumn && fixedHeader && scrollLeaveTop,
                    [classesMap.headCellFixed]: fixedHeader || isColumnFixed,
                    [classesMap.headCellLast]: isLastColumn,
                    [clsx(commonCellClassesList.fixedStartLast)]:
                      lastStartFixedColumn === key && scrollLeaveStartSide,
                    [clsx(commonCellClassesList.fixedEndFirst)]:
                      firstEndFixedColumn === key && scrollLeaveEndSide,
                  }
                )}
              >
                <TableHeadCellContent
                  classes={classesMap}
                  column={column}
                  size={size as TableSizeProp}
                  components={components}
                  onChange={onChange}
                >
                  {title}
                </TableHeadCellContent>
              </HeadCellComponent>
            )
          })}
        </HeadRowComponent>
      ))}
    </HeadWrapperComponent>
  )
}

export const Header = React.memo(_Header) as typeof _Header
