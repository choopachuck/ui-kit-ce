'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useMergedRefs, useClassList } from '@v-uik/hooks'
import { Header, Body as DefaultBody } from './components'
import { useColumns } from './hooks/useColumns'
import { useScroll } from './hooks/useScroll'
import { getComponent } from './utils'
import {
  TableProps,
  TableSize,
  ReservedDataSourceProps,
  TableBordered,
} from './interfaces'
import { TableDataProvider } from './context'

// Свойства, которые используются при определении стилей.
type TableStylesProps = Pick<
  TableProps<unknown>,
  'width' | 'height' | 'tableLayout'
>

type TableStylesPropsExtended = TableStylesProps & {
  hasFixedColumns: boolean
}

const getDynamicStyles = (props: TableStylesPropsExtended) => ({
  root: {
    width: props.width,
    height: props.height,
  },
  table: {
    tableLayout: props.hasFixedColumns ? undefined : props.tableLayout,
  },
})

const useStyles = createUseStyles((theme) => ({
  root: {
    overflow: 'auto',
    borderTopLeftRadius: theme.comp.table.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.table.shapeBorderRadiusTopRight,
  },

  table: {
    boxSizing: 'border-box',
    textAlign: 'left',
    width: '100%',
    '&$hasFixedColumns': {
      tableLayout: 'fixed',
    },
    borderCollapse: 'separate',
    borderSpacing: 0,
    // Позволяет растягивать содержимое ячеек по высоте.
    height: '1px',
    color: theme.comp.table.colorText,
  },

  borderedRows: {
    '& $bodyCell': {
      borderBottom: `1px solid ${theme.comp.table.colorBorder}`,
    },
  },

  borderedColumns: {
    '& $headCell': {
      borderRight: `1px solid ${theme.comp.table.colorBorder}`,
    },

    '& $bodyCell': {
      borderRight: `1px solid ${theme.comp.table.colorBorder}`,

      '&:first-child': {
        borderLeft: `1px solid ${theme.comp.table.colorBorder}`,
      },
    },
  },

  hasFixedColumns: {},

  headCell: {},

  bodyCell: {},
}))

export type TableComponent = <DataSource>(
  props: TableProps<DataSource> & React.RefAttributes<HTMLDivElement>
) => JSX.Element

export const Table = React.forwardRef(
  <DataSource extends ReservedDataSourceProps<DataSource>>(
    {
      classes,
      className,
      width = 'auto',
      height = 'auto',
      columns,
      dataSource = [],
      emptyData,
      onChange,
      setRowProps,
      size = TableSize.md,
      hoverable = false,
      bordered = TableBordered.rows,
      stripe = false,
      tableLayout = 'auto',
      components,
      fixedHeader,
      rowKey,
      ...rest
    }: TableProps<DataSource>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const innerRef = React.useRef<HTMLDivElement>(null)
    const mergedRef = useMergedRefs([innerRef, ref])

    const {
      scrollLeaveTop,
      scrollLeaveEndSide,
      scrollLeaveStartSide,
      onScroll,
    } = useScroll(innerRef)

    const {
      flattenColumns,
      expandableColumn,
      expandableTreeColumn,
      hasFixedColumns,
      columnsOffsets,
      lastStartFixedColumn,
      firstEndFixedColumn,
    } = useColumns(columns)

    const classesList = useStyles()
    const dynamicStyles = getDynamicStyles({
      tableLayout,
      width,
      height,
      hasFixedColumns,
    })
    const classesMap = useClassList(classesList, classes)

    const TableWrapper = getComponent<DataSource>(
      components,
      ['tableWrapper'],
      'div'
    )

    const Body = React.useMemo(() => {
      const Component = getComponent<DataSource>(
        components,
        ['body'],
        DefaultBody
      )
      const wrappersSet = new Set(['wrapper', 'row', 'cell'])

      // Для того чтобы отличить от объекта с врапперами
      if (Object.keys(Component).some((elem) => wrappersSet.has(elem))) {
        return DefaultBody
      }

      return Component
    }, [components])
    const TableComponent = getComponent<DataSource>(
      components,
      ['table'],
      'table'
    )

    // Для того, чтобы мемоизация Header была
    const headerClasses = React.useMemo(
      () => ({
        head: classes?.head,
        headRow: classes?.headRow,
        headCell: classesMap.headCell,
      }),
      [classes]
    )

    // Для того, чтобы мемоизация Body была
    const bodyClasses = React.useMemo(
      () => ({
        body: classes?.body,
        bodyRow: classes?.bodyRow,
        bodyCell: classesMap.bodyCell,
      }),
      [classes]
    )

    return (
      <TableDataProvider columns={columns}>
        <TableWrapper
          {...rest}
          ref={mergedRef}
          style={{ ...dynamicStyles.root, ...rest.style }}
          className={clsx(className, classesMap.root)}
          onScroll={onScroll}
        >
          <TableComponent
            ref={ref}
            style={dynamicStyles.table}
            className={clsx(classesMap.table, {
              [classesList.hasFixedColumns]: hasFixedColumns,
              [classesList.borderedRows]:
                bordered === TableBordered.rows ||
                bordered === TableBordered['rows-columns'],
              [classesList.borderedColumns]:
                bordered === TableBordered['rows-columns'],
            })}
          >
            <Header<DataSource>
              classes={headerClasses}
              columns={columns}
              size={size}
              components={components}
              columnsOffsets={columnsOffsets}
              fixedHeader={fixedHeader}
              firstEndFixedColumn={firstEndFixedColumn}
              lastStartFixedColumn={lastStartFixedColumn}
              scrollLeaveTop={scrollLeaveTop}
              scrollLeaveStartSide={scrollLeaveStartSide}
              scrollLeaveEndSide={scrollLeaveEndSide}
              onChange={onChange}
            />

            <Body
              classes={bodyClasses}
              dataSource={dataSource}
              columns={flattenColumns}
              size={size}
              components={components}
              setRowProps={setRowProps}
              emptyData={emptyData}
              stripe={stripe}
              hoverable={hoverable}
              expandableColumn={expandableColumn}
              expandableTreeColumn={expandableTreeColumn}
              hasFixedColumns={hasFixedColumns}
              columnsOffsets={columnsOffsets}
              firstEndFixedColumn={firstEndFixedColumn}
              lastStartFixedColumn={lastStartFixedColumn}
              scrollLeaveStartSide={scrollLeaveStartSide}
              scrollLeaveEndSide={scrollLeaveEndSide}
              rowKey={rowKey}
              onChange={onChange}
            />
          </TableComponent>
        </TableWrapper>
      </TableDataProvider>
    )
  }
) as TableComponent
